# Drug Prevention Management System (DPMS)

## Overview
The Drug Prevention Management System (DPMS) is a full-stack web application designed to manage drug prevention cases, reports, and user roles. It provides dashboards for different user roles such as Admin, Police Officer, Court, Rehab Centre, and Drug Prevention Authority.

## Features
- User authentication and role-based access control
- Case management (create, view, edit, delete)
- Report management (create, view, edit, delete)
- User management (create, view, edit, delete)
- Dashboards for different user roles

## Tech Stack
### Frontend
- React (with Vite)
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- ESLint for code linting
- Jest for testing

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB)
- JWT for authentication
- dotenv for environment variables
- CORS for cross-origin requests

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd DPMS
   ```

2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd ../backend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=8003
   MongoDBURL=your_mongodb_connection_string
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage
- Register a new user or log in with existing credentials.
- Navigate through the dashboards based on your user role.
- Manage cases, reports, and users as per your role's permissions.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License. 