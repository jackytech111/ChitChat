# ChitChat

A full-stack real-time chat application built with the **MERN stack**.
ChitChat allows users to connect with friends, exchange messages instantly, and manage conversations in a modern chat interface.

The project focuses on building a **scalable backend architecture**, secure authentication with **JWT + refresh tokens**, and **real-time communication using Socket.io**.

---

## Live Demo

Frontend
https://chitchat-frontend-fawn.vercel.app

Backend API
https://chitchat-backend-nkun.onrender.com

API Documentation
`/api-docs`

---

## Features

**Authentication**

* User registration and login
* Secure password hashing with bcrypt
* JWT authentication
* Refresh token mechanism
* Protected API routes

**Messaging**

* Real-time messaging using Socket.io
* Private conversations
* Online user tracking
* Message history

**Friend System**

* Add friends
* Remove friends
* View friend list

**Media Support**

* Image uploads using Cloudinary

**Developer Experience**

* RESTful API design
* Swagger API documentation
* Environment-based configuration
* Modular project structure

---

## Tech Stack

### Frontend

* React
* Vite
* TailwindCSS
* Axios
* Zustand

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.io

### Infrastructure

* Vercel (Frontend deployment)
* Render (Backend deployment)
* Cloudinary (Image storage)

---

## Project Structure

```
chitchat
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── socket
│   │   ├── libs
│   │   └── swagger.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── store
│   │   ├── services
│   │   └── hooks
```

The backend follows a **layered architecture** separating routes, controllers, and data models to keep the codebase maintainable and scalable.

---

## Authentication Flow

1. User logs in with email and password
2. Server returns:

   * Access Token (short lifetime)
   * Refresh Token (stored in HTTP-only cookie)
3. When the access token expires, the client calls `/api/auth/refresh`
4. A new access token is issued without requiring the user to log in again

This approach improves both **security and user experience**.

---

## API Overview

Example endpoints:

```
POST /api/auth/signup
POST /api/auth/signin
POST /api/auth/refresh

GET /api/users
GET /api/friends

POST /api/messages
GET /api/conversations
```

Full API documentation is available via **Swagger UI**:

```
/api-docs
```

---

## Environment Variables

Create a `.env` file in the backend directory.

Example:

```
PORT=5001

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Running the Project Locally

### Clone the repository

```
git clone https://github.com/yourusername/chitchat.git
cd chitchat
```

### Install backend dependencies

```
cd backend
npm install
```

Start the backend server:

```
npm run dev
```

### Install frontend dependencies

```
cd ../frontend
npm install
```

Run the frontend:

```
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Future Improvements

Some features planned for future development:

* Group conversations
* Message reactions
* Message search
* File attachments
* Push notifications
* Typing indicators
* Read receipts

---

## Screenshots

(Add screenshots of the UI here)

Examples:

* Login page
* Chat interface
* Friend list

---

## Author

Jacky Nguyen

Full-stack developer interested in building scalable web applications with Node.js and modern JavaScript frameworks.

GitHub
https://github.com/yourusername
