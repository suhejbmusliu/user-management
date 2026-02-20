import { Link } from "react-router-dom";

export default function Navbar({ userCount }) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors no-underline"
        >
          UserManager
        </Link>

        {/* User count badge */}
        {userCount > 0 && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {userCount} users
          </span>
        )}
      </div>
    </nav>
  );
}
