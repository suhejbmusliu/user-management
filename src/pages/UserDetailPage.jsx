import { useParams, useNavigate } from "react-router-dom";

const getInitials = (name = "") =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

/**
 * Detail page for a single user.
 * Shows: contact info, address, company details.
 */
export default function UserDetailPage({ users }) {
  const { id }   = useParams();
  const navigate = useNavigate();
  const user     = users.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <div>
        <BackButton onClick={() => navigate(-1)} />
        <div className="flex flex-col items-center justify-center h-48 gap-2">
          <p className="text-4xl">👤</p>
          <p className="text-gray-600 font-medium">User not found</p>
        </div>
      </div>
    );
  }

  const address = user.address || {};
  const geo     = address.geo  || {};
  const company = user.company || {};

  return (
    <div className="max-w-2xl">
      <BackButton onClick={() => navigate(-1)} />

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 text-white flex items-center justify-center text-xl font-bold">
              {getInitials(user.name)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-blue-100 text-sm mt-0.5">{user.email}</p>
              {user.username && (
                <span className="inline-block mt-1 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                  @{user.username}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Contact */}
          <Section title="Contact">
            <DetailRow label="Phone" value={user.phone || "—"} />
            <DetailRow
              label="Website"
              value={
                user.website && user.website !== "—"
                  ? <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{user.website}</a>
                  : "—"
              }
            />
          </Section>

          {/* Company */}
          {company.name && (
            <Section title="Company">
              <DetailRow label="Name"    value={company.name        || "—"} />
              <DetailRow label="Tagline" value={company.catchPhrase || "—"} />
              <DetailRow label="Focus"   value={company.bs          || "—"} />
            </Section>
          )}

          {/* Address */}
          {(address.street || address.city) && (
            <Section title="Address">
              <DetailRow label="Street" value={`${address.street || ""} ${address.suite || ""}`.trim() || "—"} />
              <DetailRow label="City"   value={address.city    || "—"} />
              <DetailRow label="ZIP"    value={address.zipcode || "—"} />
              {geo.lat && (
                <DetailRow label="Coords" value={`${geo.lat}, ${geo.lng}`} />
              )}
            </Section>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-5"
    >
      ← Back to Users
    </button>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 pb-2 border-b border-gray-100">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-gray-400 w-16 flex-shrink-0">{label}</span>
      <span className="text-gray-700 break-words">{value}</span>
    </div>
  );
}
