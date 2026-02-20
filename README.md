👥 User Management App

This project is a User Management Application built with React, Vite, React Router, and Tailwind CSS as part of an internship task.

The goal of this project was to build a clean, structured, and user-friendly interface for managing users while following good frontend development practices.

🚀 Features

View all users in a table

Search users by name or email

Sort users by name, email, or company

Add new users

Edit existing users

Delete users with confirmation modal

View detailed user page

Responsive design

🏗 Project Architecture

The project is structured in a modular way to keep the code clean and scalable.

src/
│
├── api/            → Handles user data logic
├── components/     → Reusable UI components
├── hooks/          → Custom React hooks
├── pages/          → Page-level components
├── store/          → State management logic
│
├── App.jsx
├── main.jsx
└── index.css
Folder Explanation

components/
Contains reusable UI components like:

UserTable

UserFormModal

ConfirmDeleteModal

EditGoToDetailsModal

Modal

pages/
Contains main pages:

UserListPage (main dashboard)

UserDetailPage (user details view)

api/
Handles user data operations.

store/
Manages user state logic separately from UI.

hooks/
Custom logic (like useUsers) to keep components clean.

🧠 Logic & Implementation Approach
1️⃣ Separation of Concerns

The UI, business logic, and data logic are separated into different folders.
This keeps the code organized and easy to maintain.

2️⃣ Page-Level State Management

The UserListPage handles:

Search state

Sorting state

Modal visibility

Add/Edit/Delete logic

The UserTable is responsible only for displaying data and triggering actions.

3️⃣ Reusable Modal System

Instead of using browser alerts (window.confirm), I created a reusable Modal component and built:

ConfirmDeleteModal

EditGoToDetailsModal

This improves user experience and makes the UI more professional.

4️⃣ Performance Optimization

Filtering and sorting logic is memoized using useMemo to avoid unnecessary recalculations.

5️⃣ Clean UX

New users are highlighted

Forms include validation

Clicking a row navigates to user details

Modals prevent accidental deletions

🛠 Technologies Used

React 18

Vite

React Router v6

Tailwind CSS

PostCSS

🎯 Purpose of This Project

This project demonstrates:

Clean component-based architecture

Proper state management

Reusable UI patterns

Structured folder organization

Attention to user experience

Real-world frontend development practices

It reflects not only functional implementation but also architectural thinking and code organization suitable for scalable applications.

LIVE DEMO: https://user-management-eight-rosy.vercel.app/

▶️ Run Locally
npm install
npm run dev

Build for production:

npm run build