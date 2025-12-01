# 🌟 Employee Management System (EMS)

A modern **Full-Stack Web Application** for efficient employee management with **secure authentication** and **role-based access**.

---

## 🏆 Badges

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![JWT](https://img.shields.io/badge/Authentication-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Tech Stack Overview

| Layer | Tech Used | Description |
|------|-----------|-------------|
| 🎨 Frontend | React | UI with protected pages and Axios API calls |
| ⚙ Backend | Spring Boot | REST APIs, business logic, and validation |
| 🗄 Database | MySQL | Persistent storage via JPA repositories |
| 🔐 Security | JWT Token Auth | Role-based access for Admin & CEO |

---

## 🧩 System Architecture

![Architecture Diagram](https://via.placeholder.com/900x350?text=System+Architecture+Diagram)

🔹 React → Axios → Spring Boot → JPA → MySQL  
🔹 JWT is used for secure communication

---

## 📌 Features

| Feature | Description |
|--------|-------------|
| 🔐 JWT Auth | Secure user authentication |
| 🧑‍💼 Role-Based Access | Admin & CEO have different abilities |
| 📋 CRUD Operations | Manage employee details |
| 🗂 Data Persistence | Stored securely in MySQL |
| ⚡ Fast UI | Modern React-based interface |

---

## 👤 User Roles & Permissions

| Action | User | Admin | CEO |
|--------|------|------|-----|
| Login | ✔ | ✔ | ✔ |
| View employees | ❌ | ✔ (Own) | ✔ (All) |
| Add employees | ❌ | ✔ | ❌ |
| Update employees | ❌ | ✔ (Own) | ✔ (All) |
| Manage Admins | ❌ | ❌ | ✔ |

---

## 📡 REST API Endpoints

### 🔐 Authentication Controller

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register User/Admin/CEO |
| POST | `/auth/login` | Login & receive JWT |

---

### 🧑‍💼 Admin Endpoints

Base path: `/api/admin/employees`

| Method | Description |
|--------|-------------|
| GET | Get employees created by logged-in Admin |
| POST | Create employee |
| PUT | Update employee created by same Admin |
| DELETE | Delete employee using request param `id` |

---

### 👑 CEO Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ceo/all-employees` | View all employees across admins |
| GET | `/api/ceo/all-users` | View all admin users |
| POST | `/api/ceo/create-admin` | Create a new Admin |
| PUT | `/api/admin/update-admin` | Update Admin |
| DELETE | `/api/admin/employees` | Delete employee by `username` |

---

## 🔐 Security

All secured endpoints require:

```bash
Authorization: Bearer <JWT_TOKEN>
```




## ▶️ How to Run
### Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

Ensure MySQL is running & DB properties are configured correctly.

---
## 🚀 Future Enhancements

#### ✨ Swagger API Docs
#### ✨ Docker Deployment
#### ✨ Profile Management
#### ✨ Sorting & Pagination
#### ✨ Email Notifications
---

## 🤝 Contributing

Pull requests are welcome!
Open an issue for feature requests and improvements.

## 📜 License

This project is provided for educational & capstone usage.
