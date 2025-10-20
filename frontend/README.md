# 🎓 eLabTracker Frontend

This is the **frontend** of the eLabTracker system — a web application designed for Computer Science & Engineering departments to manage **virtual lab records** efficiently.  
It provides separate dashboards for **faculty** and **students**, enabling secure submission, grading, and management of lab experiments.

---

## 🖥️ Tech Stack

- **React.js (Vite)** — Fast and modern frontend framework.
- **React Router** — For client-side routing between pages.
- **Plain CSS** — Custom-styled responsive UI without Tailwind or external CSS frameworks.
- **Axios** — For communicating with backend APIs.
- **JWT Authentication** — To securely verify and manage user sessions.

---

## 📂 Folder Structure

```bash
frontend/
│
├── public/ # Static assets
│ └── vite.svg
│
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── Navbar.jsx # Top navigation bar with Logout
│ │ └── ProtectedRoute.jsx# Wrapper to protect faculty/student pages
│ │
│ ├── pages/ # Page components
│ │ ├── Home.jsx # Home page with info and login/register buttons
│ │ ├── Login.jsx # Login form for faculty/student
│ │ ├── Register.jsx # Registration form
│ │ ├── FacultyDashboard.jsx # Faculty dashboard to review submissions
│ │ ├── StudentDashboard.jsx # Student dashboard for uploading experiments
│ │ ├── Submissions.jsx # Faculty page for reviewing uploaded PDFs
│ │ └── NotFound.jsx # 404 fallback page
│ │
│ ├── utils/ # Helper functions
│ │ ├── api.js # Axios base instance and auth headers
│ │ ├── openProtectedFile.js # Opens student-submitted PDFs securely
│ │ └── auth.js # Token storage and verification
│ │
│ ├── App.jsx # Root component defining routes
│ ├── main.jsx # Entry point
│ ├── App.css # Global styles
│ └── index.css # Reset and base styling
│
├── .gitignore # Frontend gitignore files
├── README.md # Frontend README
├── index.html # Only HTML file
├── vite.config.js
├── package-lock.json
└── package.json

```
---

## 🚀 Features

✅ **Role-Based Authentication**  
- Faculty and Student roles handled dynamically after login.  
- JWT tokens stored securely in localStorage.

✅ **File Uploads (PDFs)**  
- Students can upload lab record PDFs.  
- Faculty can review, grade, approve, or comment on each submission.

✅ **Protected Routes**  
- Faculty dashboard and submission pages are accessible only to authenticated faculty.

✅ **Dynamic Navbar**  
- Displays logout option and links only when user is authenticated.  
- Hidden automatically on login/register pages.

✅ **Responsive UI**  
- Clean and accessible layout using plain CSS.

---

## ⚙️ Setup Instructions

### 1. Navigate to frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
Add your backend API URL:

VITE_API_URL=http://localhost:5000/api
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

## 🔗 Backend Connection

This frontend connects to the eLabTracker Backend (Node.js + Express + MongoDB).

Ensure backend is running before using the frontend:
```bash
cd ../backend
npm start
```

## 🧠 Key Components Overview

**Component	Purpose**
- **Navbar.jsx**	Displays navigation links and Logout button. Automatically hidden on Login/Register pages.
- **ProtectedRoute.jsx**	Restricts access to faculty/student dashboards unless logged in.
- **openProtectedFile.js**	Allows faculty to open/view student PDFs securely using backend route.
- **FacultyDashboard.jsx**	Shows all student submissions with grading and comments.
- **StudentDashboard.jsx**	Enables uploading experiment PDFs with titles and descriptions.

## 🧑‍💻 Author

Developed by Pratheeksha Pai, eLabTracker Head
A Virtual Lab Record Management System for Computer Science & Engineering departments.
