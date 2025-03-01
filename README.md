# Job Portal App (MERN Stack)

## Overview
The **Job Portal App** is a full-stack web application built using the **MERN stack** (MongoDB, Express, React, Node.js). It features **Clerk authentication** and **MongoDB integration**, allowing users to browse job listings, apply for positions, and manage their applications. The application is styled with **TailwindCSS** and is deployed using **Vercel**.

## Features
- **User Authentication** with Clerk
- **Browse and Search Jobs**
- **Apply for Jobs**
- **Post Job Listings** (for recruiters)
- **Rich Text Editing** for Job Descriptions
- **Notifications & Alerts** with React Toastify
- **File Uploads** for Resume Submission
- **Secure API Communication** with JWT
- **Performance Monitoring** with Sentry
- **Media Management** via Cloudinary

---
## Client-Side (Frontend)

### 1. Vite (Project Setup)
- **Installation:**
  ```sh
  npm create vite@latest
  ```
- **Usage:**
  - Vite is a fast build tool for modern web applications, optimized for React.

### 2. React (General)
- **Installation:**
  ```sh
  npm install
  ```
- **Usage:**
  - React is used to create dynamic UI components with a virtual DOM.

### 3. Start Dev Server (Vite)
- **Run the development server:**
  ```sh
  npm run dev
  ```

### 4. React Router DOM (Routing)
- **Installation:**
  ```sh
  npm install react-router-dom
  ```
- **Usage:**
  - Enables client-side routing and navigation.

### 5. React Toastify (Notifications)
- **Installation:**
  ```sh
  npm install react-toastify
  ```
- **Usage:**
  - Displays customizable toast notifications.

### 6. Quill (Rich Text Editor)
- **Installation:**
  ```sh
  npm install quill
  ```
- **Usage:**
  - Enables rich text formatting in job descriptions.

### 7. K-Convertor
- **Installation:**
  ```sh
  npm install k-convertor
  ```
- **Usage:**
  - Converts between different formats (e.g., data transformation).

### 8. Moment.js (Date Management)
- **Installation:**
  ```sh
  npm install moment
  ```
- **Usage:**
  - Helps with date formatting and parsing.

### 9. React Quill (Quill Integration in React)
- **Installation:**
  ```sh
  npm i react-quill
  ```
- **Usage:**
  - Integrates Quill editor seamlessly with React components.

---
## Server-Side (Backend)

### 1. Express (Web Framework)
- **Installation:**
  ```sh
  npm i express
  ```
- **Usage:**
  - A minimal web application framework for handling API requests.

### 2. JWT (Authentication & Security)
- **Installation:**
  ```sh
  npm i jsonwebtoken
  ```
- **Usage:**
  - Secure authentication and token-based authorization.

### 3. Bcrypt (Password Hashing)
- **Installation:**
  ```sh
  npm i bcrypt
  ```
- **Usage:**
  - Hashes user passwords for secure storage.

### 4. Mongoose (MongoDB ORM)
- **Installation:**
  ```sh
  npm i mongoose
  ```
- **Usage:**
  - Defines and manages MongoDB schemas and models.

### 5. Nodemon (Auto-Restart for Development)
- **Installation:**
  ```sh
  npm i nodemon
  ```
- **Usage:**
  - Auto-restarts the server during development when changes are detected.

### 6. Svix (Webhooks)
- **Installation:**
  ```sh
  npm i svix@1.42.0
  ```
- **Usage:**
  - Secure webhook management for real-time updates.

### 7. CORS (Cross-Origin Resource Sharing)
- **Installation:**
  ```sh
  npm i cors
  ```
- **Usage:**
  - Enables cross-origin requests to interact with the API.

### 8. Multer (File Uploads)
- **Installation:**
  ```sh
  npm i multer
  ```
- **Usage:**
  - Handles file uploads for resumes and job-related documents.

### 9. Dotenv (Environment Variable Configuration)
- **Installation:**
  ```sh
  npm i dotenv
  ```
- **Usage:**
  - Loads environment variables from the **.env** file into **process.env**.

### 10. Cloudinary (Cloud Storage & Media Service)
- **Installation:**
  ```sh
  npm i cloudinary
  ```
- **Usage:**
  - Stores images and videos securely on the cloud.

### 11. Sentry Profiling (Performance Monitoring)
- **Installation:**
  ```sh
  npm install @sentry/profiling-node --save
  ```
- **Usage:**
  - Monitors application performance and response times.

### 12. Clerk for Express (Authentication Middleware)
- **Installation:**
  ```sh
  npm install @clerk/express
  ```
- **Usage:**
  - Handles authentication seamlessly.

### 13. Axios (HTTP Requests)
- **Installation:**
  ```sh
  npm i axios
  ```
- **Usage:**
  - Fetches data from APIs efficiently.

---
## Deployment
The frontend and backend is deployed using **Vercel**.


---
## Environment Variables (.env)
Ensure you have the following environment variables set up:
```env

# for server side :

JWT_SECRET=

#MongoDB setup
MONGODB_URI=
#Cloudinary Setup
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=

#Clerk setup
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=


# for client side :
VITE_CLERK_PUBLISHABLE_KEY=
VITE_BACKEND_URL=http://localhost:5000
```

