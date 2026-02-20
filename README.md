npm run build

# 👥 User Management App

A modern, clean, and user-friendly web application for managing users. Built with React, Vite, React Router, and Tailwind CSS.

## 🚀 Features

- View all users in a table
- Search users by name or email
- Sort users by name, email, or company
- Add, edit, and delete users (with confirmation modals)
- View detailed user pages
- Responsive design
- Highlight new users
- Form validation

## 🏗️ Project Structure

```
src/
  api/           # Handles user data logic
  components/    # Reusable UI components (UserTable, UserFormModal, ConfirmDeleteModal, EditGoToDetailsModal, Modal)
  hooks/         # Custom React hooks (e.g., useUsers)
  pages/         # Page-level components (UserListPage, UserDetailPage)
  store/         # State management logic
  App.jsx        # Main app component
  main.jsx       # Entry point
  index.css      # Tailwind CSS
```

## 🧠 Implementation Highlights

- **Separation of Concerns:** UI, business logic, and data logic are separated for maintainability.
- **Page-Level State Management:** UserListPage manages search, sorting, modals, and CRUD logic. UserTable is display-only.
- **Reusable Modal System:** Custom Modal, ConfirmDeleteModal, and EditGoToDetailsModal for a professional UX.
- **Performance:** Filtering and sorting are memoized with `useMemo`.
- **Clean UX:** New users highlighted, forms validated, row click navigates to details, modals prevent accidental deletions.

## 🛠️ Tech Stack

- React 18
- Vite
- React Router v6
- Tailwind CSS

## 🌐 Live Demo

[View Live App](https://user-management-eight-rosy.vercel.app/)

## ▶️ Getting Started

1. **Clone the repository:**
	```sh
	git clone https://github.com/suhejbmusliu/user-management.git
	cd user-management
	```
2. **Install dependencies:**
	```sh
	npm install
	# or
	yarn install
	```
3. **Run the app locally:**
	```sh
	npm run dev
	# or
	yarn dev
	```
	The app will be available at http://localhost:5173

4. **Build for production:**
	```sh
	npm run build
	# or
	yarn build
	```

