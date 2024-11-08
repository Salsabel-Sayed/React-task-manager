# Task Management Project

This is a full-stack task management application that consists of both backend and frontend. The backend API allows users to manage their tasks and accounts, while the frontend provides a user interface to interact with the system. Users can register, log in, manage tasks, and track completed tasks.

## Backend Overview

The backend is built using Node.js and provides RESTful APIs for user and task management. Key features of the backend include:

- **User Management**: CRUD operations for creating, reading, updating, and deleting users.
- **Task Management**: Users can create, read, update, and delete tasks.
- **Task Completion**: Users can mark tasks as completed or set them back to incomplete.
- **Validation**: Input validation is applied to user registration and task creation via Joi.
- **Authentication**: The login endpoint returns a JWT token for authenticated users, which is required for task management.

### Postman Documentation
You can view the Postman API documentation for the backend [here](https://documenter.getpostman.com/view/29072087/2sAY519LjA).

## Frontend Overview

The frontend is built using React and provides a dashboard for users to manage their tasks. It integrates with the backend via API calls to manage tasks and user sessions. Key features of the frontend include:

- **User Registration and Login**:
  - If it's the user's first time, they are redirected to the **register** page.
  - After a successful registration, users are navigated to the **login** page.
  - Upon successful login, users are redirected to the **home** page, which displays their tasks.

- **Task Dashboard**:
  - Users can view all tasks on the home page.
  - Tasks can be marked as **completed** or reverted back to **incomplete**.
  - Tasks can be **updated** (via a modal) or **deleted**.
  - There is also an option to **delete all tasks**.
  - If no tasks are available, a message is displayed indicating that no tasks are present.
  - Completed tasks are managed separately and can be toggled between completed and incomplete.

- **Routing**:
  - The frontend handles routing with React Router, providing links for login, register, logout, adding tasks, viewing completed tasks, and managing tasks.
  - Protected routes are used for task management, requiring users to be logged in.

### User Flow
1. **First-time User**: 
   - The user is redirected to the **register** page.
   - After successful registration, they are redirected to the **login** page.
   - After logging in, the user is taken to the **home** page, where their tasks are displayed.

2. **Logged-in User**:
   - The user can view all tasks, mark tasks as completed, or set them back to incomplete.
   - The user can update task details or delete individual tasks.
   - There's also a button to delete all tasks at once.

3. **Log Out**:
   - Users can log out, which removes the authentication token from local storage and redirects them to the login page.

## Installation and Setup

To get the project running locally, follow these steps:

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager-backend.git
