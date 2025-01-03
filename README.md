# MERN Stack Social Media App
## Project Name：SocialAura

## Project Overview

This is a full-stack social media application built using the MERN stack. The project includes the following features:

- User authentication (login and registration).
- Users can create posts and like others' posts.
- Responsive design with support for dark mode.
- File upload functionality (e.g., profile pictures or images).

## Tech Stack

### Frontend:

- **React**: For building the user interface.
- **Material-UI**: A modern, responsive component library.
- **Redux Toolkit**: For global state management.
- **Redux Persist**: For state persistence.
- **React Router**: For routing management.
- **Formik & Yup**: For form handling and validation.

### Backend:

- **Node.js**: Runtime environment.
- **Express.js**: For building APIs.
- **Mongoose**: For connecting to and interacting with the MongoDB database.
- **JsonWebToken**: For user authentication.
- **Multer & GridFS**: For handling file uploads.

### Database:

- **MongoDB**: For data storage.

### Tools & Others:

- **dotenv**: For managing environment variables.
- **VS Code**: Development environment.
- **Google Fonts**: Fonts used in the UI design.

## File Structure

The project is divided into frontend and backend sections. Below is the directory structure:

### Frontend (`client`)

```
client/
├── public/
├── src/
│   ├── components/       # Common components (e.g., FlexBetween, Friend)
│   ├── scenes/           # Pages and business logic (e.g., homepage, login page)
│   ├── state/            # Redux global state management
│   ├── App.js            # Main application entry point
│   ├── index.js          # ReactDOM rendering entry point
├── .gitignore
├── package.json
```

### Backend (`server`)

```
server/
├── controllers/          # Business logic (e.g., users, posts)
├── middleware/           # Middleware (e.g., authentication)
├── models/               # Database models (e.g., user, post)
├── routes/               # API routes
├── public/assets         # Static files
├── .env                  # Environment variable configuration
├── index.js              # Server entry point
├── package.json
```

## Features

- Full user authentication system.
- Users can create, view, and like posts.
- File upload and storage support.
- Dark mode and responsive design for an enhanced user experience.

## Project Demo

> Add screenshots or GIFs demonstrating the project features here.

## How to Run

### Prerequisites:

- Install [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/).

### Steps:

1. Clone the project:

   ```bash
   git clone https://github.com/your-repository
   cd your-project-directory
   ```

2. Install dependencies:

   ```bash
   # Frontend
   cd client
   npm install
   
   # Backend
   cd ../server
   npm install
   ```

3. Set up the `.env` file:
   Create a `.env` file in the `server` folder and add the required environment variables:

   ```env
   MONGO_URL=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   PORT=5000
   ```

4. Run the project:

   ```bash
   # Start the backend
   cd server
   npm start
   
   # Start the frontend
   cd ../client
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the app.

## API Documentation

### User Authentication

- **Login**

  - URL: `/api/auth/login`

  - Method: POST

  - Request Body:

    ```json
    {
      "email": "example@example.com",
      "password": "yourpassword"
    }
    ```

  - Response:

    ```json
    {
      "token": "JWT_TOKEN",
      "user": { "id": "123", "name": "John Doe" }
    }
    ```

## Contribution Guidelines

We welcome contributions! Here’s how you can contribute:

1. Fork this repository.
2. Create a branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).