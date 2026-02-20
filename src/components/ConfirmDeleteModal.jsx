import Modal from "./Modal";

export default function ConfirmDeleteModal({ open, user, onClose, onConfirm, loading }) {
  return (
    <Modal open={open} title="Delete user?" onClose={onClose} maxWidth="max-w-lg">
      <p className="text-sm text-gray-600">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-gray-900">
          {user?.name || user?.email || "this user"}
        </span>
        ? This action can’t be undone.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm?.(user)}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
}