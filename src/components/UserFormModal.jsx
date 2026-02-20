import { useState } from "react";

const EMPTY_FORM = { name: "", email: "", phone: "", website: "", company: "" };

const FIELDS = [
  { key: "name",    label: "Full Name",    type: "text",  required: true,  placeholder: "John Doe" },
  { key: "email",   label: "Email",        type: "email", required: true,  placeholder: "john@example.com" },
  { key: "phone",   label: "Phone",        type: "text",  required: false, placeholder: "+1-555-0100" },
  { key: "website", label: "Website",      type: "text",  required: false, placeholder: "example.com" },
  { key: "company", label: "Company Name", type: "text",  required: false, placeholder: "Acme Corp" },
];

export default function UserFormModal({ initialData, onSubmit, onClose }) {
  const [form, setForm] = useState(initialData ?? EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const isEditMode = Boolean(initialData);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      newErrors.email = "Please enter a valid email address.";
    return newErrors;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // ✅ Parent decides what happens after submit (close / show another modal / navigate)
    onSubmit(form);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md animate-fade-in rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl leading-none text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="mb-6 text-xl font-bold text-gray-800">
          {isEditMode ? "Edit User" : "Add New User"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {FIELDS.map(({ key, label, type, required, placeholder }) => (
            <div className="mb-4" key={key}>
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor={key}>
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
              </label>

              <input
                id={key}
                type={type}
                value={form[key] || ""}
                onChange={handleChange(key)}
                placeholder={placeholder}
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors
                  ${
                    errors[key]
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-gray-300 bg-white focus:border-blue-500"
                  }`}
              />

              {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
            </div>
          ))}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {isEditMode ? "Save Changes" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}