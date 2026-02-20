import { useNavigate } from "react-router-dom";

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const getCompanyName = (company) =>
  typeof company === "object" ? company?.name || "—" : company || "—";

export default function UserTable({
  users,
  sortKey,
  sortDir,
  onSort,
  newUserIds,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  const SortIcon = ({ colKey }) => {
    if (sortKey !== colKey) return <span className="ml-1 text-gray-300">↕</span>;
    return <span className="ml-1 text-blue-600">{sortDir === 1 ? "↑" : "↓"}</span>;
  };

  const handleDeleteClick = (e, user) => {
    e.stopPropagation();
    onDelete?.(user);
  };

  const handleEditClick = (e, user) => {
    e.stopPropagation();
    onEdit?.(user); 
  };

  if (users.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400">
        <p className="mb-3 text-4xl">🔍</p>
        <p className="text-lg font-medium">No users found</p>
        <p className="mt-1 text-sm">Try adjusting your search query</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        {/* Head */}
        <thead className="border-b border-gray-200 bg-gray-50">
          <tr>
            {[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "company", label: "Company" },
            ].map(({ key, label }) => (
              <th
                key={key}
                onClick={() => onSort(key)}
                className="cursor-pointer select-none px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600"
              >
                {label}
                <SortIcon colKey={key} />
              </th>
            ))}

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-100 bg-white">
          {users.map((user) => (
            <tr
              key={user.id}
              className={`transition-colors hover:bg-blue-50 ${
                newUserIds.has(user.id) ? "bg-green-50" : ""
              }`}
            >
              {/* Name */}
              <td className="px-4 py-3">
                <div
                  className="group flex cursor-pointer items-center gap-3"
                  onClick={() => navigate(`/user/${user.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate(`/user/${user.id}`)}
                >
                  {/* Avatar */}
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    {getInitials(user.name)}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800 transition-colors group-hover:text-blue-600">
                      {user.name}
                    </p>

                    {newUserIds.has(user.id) && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="max-w-[200px] truncate px-4 py-3 text-gray-600">
                {user.email}
              </td>

              {/* Company */}
              <td className="px-4 py-3 text-gray-600">{getCompanyName(user.company)}</td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleEditClick(e, user)}
                    className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => handleDeleteClick(e, user)}
                    className="rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}