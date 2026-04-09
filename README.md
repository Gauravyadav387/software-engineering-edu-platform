# EduBridge - Educational Video Platform

EduBridge is a comprehensive full-stack web application designed for students to access subject-wise educational videos, teachers to upload lectures and track analytics, and administrators to manage the platform ecosystem. It is built as a Software Engineering course project.

## 🚀 Features

### For Students
* **Dynamic Course Catalog:** Browse available subjects easily, populated dynamically when new content is uploaded.
* **Video Playback:** Watch high-quality lecture videos linked directly through an integrated responsive video player. 
* **Search capabilities:** Search for specific topics or instructors.

### For Teachers
* **Content Upload:** Easily upload video files (.mp4, .mkv, etc.) and tag them with subjects and descriptions.
* **Dashboard & Analytics:** Track metrics and manage the content you own. Note: Teachers can strictly only manage/delete videos they have personally uploaded.

### For Administrators
* **User Management:** Oversee platform usage, evaluate existing users, and safely prune old/inappropriate user accounts.
* **Universal Access:** Delete inappropriate content globally across any subject or instructor.

## 💻 Tech Stack
* **Frontend:** React.js, Tailwind CSS, Axios, React Router v7
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (using Mongoose)
* **File Storage:** Local Server Storage (via Multer)
* **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## 🛠️ Setup & Installation

Follow these steps to run the application securely on your local environment.

### Prerequisites
* **Node.js** (v18.x or higher)
* **MongoDB Community Server** running locally (Port `27017`)
* **Git** installed on your machine

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd software-engineering-edu-platform
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Prepare the environment file. Create a `.env` in the `backend` folder:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/edubridge
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   BASE_URL=http://localhost:5000
   ```
4. Seed the initial Administrator Account (Required to explore Admin features):
   ```bash
   node seedAdmin.js
   ```
   *(This script securely provisions an admin account. If you wish to change the default admin credentials for your local environment, please edit the variables inside `seedAdmin.js` before executing.)*
5. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Open a **new terminal tab** and stay in the project root (`software-engineering-edu-platform`).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. The application will automatically launch at [http://localhost:3000](http://localhost:3000).

---

## 📁 Repository Structure
A highly modularized component hierarchy is maintained:
* `/backend/controllers/` - API implementation logic.
* `/backend/models/` - Mongoose database schemas.
* `/backend/routes/` - Express endpoint routing.
* `/backend/middleware/` - JWT user authorization handlers.
* `/backend/uploads/` - Locally stored original video files handled by Multer.
* `/src/pages/` - React frontend interfaces mapped to routes.
* `/tailwind.config.js` - Global aesthetic guidelines spanning UI framework rendering.
