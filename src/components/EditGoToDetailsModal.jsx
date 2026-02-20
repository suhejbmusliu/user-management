import Modal from "./Modal";

export default function EditModal({ open, user, onClose, onGo }) {
  return (
    <Modal open={open} title="Saved changes" onClose={onClose} maxWidth="max-w-lg">
      <p className="text-sm text-gray-600">
        Changes saved for{" "}
        <span className="font-semibold text-gray-900">
          {user?.name || user?.email || "this user"}
        </span>
        . Do you want to open the details page to review?
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Not now
        </button>
        <button
          onClick={() => onGo?.(user)}
          className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          Go to details
        </button>
      </div>
    </Modal>
  );
}