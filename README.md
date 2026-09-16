# EduManage - Full-Stack Student Management System

EduManage is a modern, full-stack web application designed to streamline the management of students and academic courses. This project demonstrates a robust, scalable architecture using industry-standard technologies for both the frontend and backend.

## 🚀 Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (React, App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom UI, Glassmorphism, Dark Mode)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

### Backend
- **Framework:** [Spring Boot](https://spring.io/projects/spring-boot) (Java)
- **Architecture:** RESTful API
- **Security:** Spring Security & JWT Authentication (Role-based access control)
- **Data Access:** Spring Data JPA / Hibernate

### Database
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)

---

## ✨ Key Features

- **Role-Based Access Control (RBAC):** Secure authentication and authorization for `ADMIN` and `STUDENT` roles.
- **Admin Dashboard:** Comprehensive overview with quick actions, system statistics, and management tools.
- **Student Management:** Full CRUD operations for student records.
- **Course Management:** Add, edit, and delete academic courses with advanced form validations.
- **Student Portal:** Dedicated view for students to manage their personal profile and view enrolled courses.
- **Premium UI/UX:** Stunning glassmorphism, fluid animations, responsive design, and system-wide Dark Mode.

---

## 📂 Project Structure

This repository is organized into two main directories:

- `/frontend` - Contains the Next.js application.
- `/backend` - Contains the Spring Boot application.

---

## 🛠️ Getting Started

To run this project locally, you will need to set up both the backend server and the frontend client.

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **Java** (JDK 17 or higher recommended)
- **Maven** (or Gradle, depending on the backend build tool)
- **Supabase Account** (for PostgreSQL database)

### 1. Database Setup (Supabase)
1. Create a new project on [Supabase](https://supabase.com/).
2. Obtain your PostgreSQL connection string from the Supabase dashboard (`Settings > Database`).

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Configure the database connection in `src/main/resources/application.properties` (or `application.yml`):
   ```properties
   spring.datasource.url=jdbc:postgresql://[YOUR_SUPABASE_DB_HOST]:5432/[DB_NAME]
   spring.datasource.username=[YOUR_DB_USER]
   spring.datasource.password=[YOUR_DB_PASSWORD]
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   *(The backend server will typically start on `http://localhost:8080`)*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the Environment Variables by creating a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is licensed under the MIT License.