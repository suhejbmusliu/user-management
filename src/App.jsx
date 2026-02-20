import { Routes, Route } from "react-router-dom";
import { useUsers } from "./hooks/useUsers";
import Navbar from "./components/Navbar";
import UserListPage from "./pages/UserListPage";
import UserDetailPage from "./pages/UserDetailPage";

export default function App() {
  // All user state lives here — passed down as props.
  // In a larger app this would use React Context or Redux store.
  const { users, loading, error, addUser, updateUser, deleteUser } = useUsers();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userCount={users.length} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <UserListPage
                users={users}
                loading={loading}
                error={error}
                onAdd={addUser}
                onUpdate={updateUser}
                onDelete={deleteUser}
              />
            }
          />
          <Route
            path="/user/:id"
            element={<UserDetailPage users={users} />}
          />
        </Routes>
      </main>
    </div>
  );
}
