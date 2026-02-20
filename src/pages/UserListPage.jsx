import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import UserTable from "../components/UserTable";
import UserFormModal from "../components/UserFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import EditGoToDetailsModal from "../components/EditGoToDetailsModal";

/**
 * Main user list page.
 * Handles: search, sort, add / edit / delete modals.
 */
export default function UserListPage({ users, loading, error, onAdd, onUpdate, onDelete }) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState(1); // 1 = asc, -1 = desc

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [newUserIds, setNewUserIds] = useState(new Set());

  // ✅ NEW: delete modal state
  const [deleteUser, setDeleteUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ✅ NEW: after-edit “go to details” modal
  const [savedUser, setSavedUser] = useState(null);

  // ─── Filter + Sort (memoized for performance) ────────────────────────────────
  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return users
      .filter((user) => {
        if (!query) return true;
        return user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
      })
      .sort((a, b) => {
        const aVal =
          sortKey === "company"
            ? (a.company?.name || a.company || "").toLowerCase()
            : (a[sortKey] || "").toLowerCase();

        const bVal =
          sortKey === "company"
            ? (b.company?.name || b.company || "").toLowerCase()
            : (b[sortKey] || "").toLowerCase();

        if (aVal < bVal) return -sortDir;
        if (aVal > bVal) return sortDir;
        return 0;
      });
  }, [users, search, sortKey, sortDir]);

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleSort = (key) => {
    if (sortKey === key) setSortDir((prev) => prev * -1);
    else {
      setSortKey(key);
      setSortDir(1);
    }
  };

  const handleAddSubmit = (formData) => {
    const newUser = onAdd(formData);
    setNewUserIds((prev) => new Set([...prev, newUser.id]));
    setShowAddModal(false);
  };

  const handleEditSubmit = (formData) => {
    const updated = {
      ...editingUser,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      company:
        typeof editingUser.company === "object"
          ? { ...editingUser.company, name: formData.company }
          : formData.company,
    };

    onUpdate(updated);

    // ✅ close edit modal
    setEditingUser(null);

    // ✅ open “go to details?” modal
    setSavedUser(updated);
  };

  const editInitialData = editingUser
    ? {
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone || "",
        website: editingUser.website || "",
        company: editingUser.company?.name || editingUser.company || "",
      }
    : null;

  // ✅ Open delete confirm modal
  const openDeleteModal = (user) => setDeleteUser(user);

  // ✅ Confirm delete
  const confirmDelete = async (user) => {
    try {
      setDeleting(true);

      // your onDelete currently expects ID (from previous setup)
      await onDelete(user.id);

      setDeleteUser(null);
    } finally {
      setDeleting(false);
    }
  };

  // ✅ After edit -> go to details
  const goToDetailsAfterSave = (user) => {
    setSavedUser(null);
    navigate(`/user/${user.id}`);
  };

  // ─── Loading State ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        <p className="text-sm text-gray-500">Loading users...</p>
      </div>
    );
  }

  // ─── Error State ──────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2">
        <p className="text-4xl">⚠️</p>
        <p className="font-medium text-red-600">{error}</p>
        <p className="text-sm text-gray-400">Check your network and try refreshing.</p>
      </div>
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Modals */}
      {showAddModal && (
        <UserFormModal
          initialData={null}
          onSubmit={handleAddSubmit}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingUser && (
        <UserFormModal
          initialData={editInitialData}
          onSubmit={handleEditSubmit}
          onClose={() => setEditingUser(null)}
        />
      )}

      {/* ✅ Delete modal */}
      <ConfirmDeleteModal
        open={!!deleteUser}
        user={deleteUser}
        loading={deleting}
        onClose={() => setDeleteUser(null)}
        onConfirm={confirmDelete}
      />

      {/* ✅ After-edit modal */}
      <EditGoToDetailsModal
        open={!!savedUser}
        user={savedUser}
        onClose={() => setSavedUser(null)}
        onGo={goToDetailsAfterSave}
      />

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <p className="mt-1 text-sm text-gray-500">Manage and search your user directory</p>
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            🔍
          </span>
          <input
            type="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Sort select */}
        <select
          value={sortKey}
          onChange={(e) => {
            setSortKey(e.target.value);
            setSortDir(1);
          }}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
        >
          <option value="name">Sort: Name</option>
          <option value="email">Sort: Email</option>
          <option value="company">Sort: Company</option>
        </select>

        {/* Add button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          + Add User
        </button>
      </div>

      {/* Results count */}
      <p className="mb-3 text-xs text-gray-400">
        Showing <span className="font-semibold text-gray-600">{filteredUsers.length}</span> of{" "}
        <span className="font-semibold text-gray-600">{users.length}</span> users
      </p>

      {/* Table */}
      <UserTable
        users={filteredUsers}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
        newUserIds={newUserIds}
        onEdit={(user) => setEditingUser(user)}
        onDelete={openDeleteModal}  // ✅ IMPORTANT: pass modal opener, not onDelete
      />
    </div>
  );
}