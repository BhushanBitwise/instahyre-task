# Place Review REST API

## Overview
This project is a backend REST API built using **Node.js, Express, MongoDB, and Mongoose**.  
It allows authenticated users to register, add reviews for places, search places, and view detailed place information along with reviews.

The application is designed as a clean and modular backend service, intended to be consumed by a frontend application.

---

## Implementation Approach
The backend is implemented following REST principles and clean code practices.

Key implementation details:
- Users are registered using a **unique phone number**
- JWT-based authentication is used and **all routes are protected**
- Places are uniquely identified using **name and address**
- Reviews are linked to both users and places
- A user can submit **only one review per place**
- Search supports **partial name matching** and **minimum average rating**
- Exact name matches are prioritized over partial matches
- Place details include all reviews, with the logged-in user’s review shown first

---

## Technology Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Database Design
- **User** → name, phone (unique)
- **Place** → name, address (unique combination)
- **Review** → rating (1–5), text, user reference, place reference

---

## Running the Project

1. Install dependencies
``` bash
npm install
```

2. Create `.env` file
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/instahyre-task
JWT_SECRET=your_secret_key
```

3. Start the server
```bash
npm start
```

---

## Notes
- No public APIs are exposed
- Authentication is mandatory for all operations
- The codebase is structured for readability and maintainability
