# Store Rating App

A Full Stack Store Rating Application built using React.js, Node.js, Express.js, MySQL, and JWT Authentication.

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Role Based Access Control

### User Roles

#### Admin
- Add Users
- Add Stores
- View Dashboard Statistics
- View All Users
- View All Stores
- View Total Ratings

#### Normal User
- Register Account
- Login
- View Stores
- Search Stores
- Submit Rating (1-5)
- Update Rating
- Update Password

#### Store Owner
- Login
- View Store Ratings
- View Average Rating
- View Users Who Rated Store
- Update Password

## Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js

### Database
- MySQL

## Project Structure

```
Ratingstore_appproject
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Sakshikaple636/roxiler-store-rating-app.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create `.env` file inside backend folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_db

JWT_SECRET=your_secret_key
```

## Demo Credentials

### Admin
Email: admin@gmail.com  
Password: Admin@123

### Store Owner
Email: owner@gmail.com  
Password: Owner@123

### Normal User
Email: sakshiuser@gmail.com  
Password: User@123


## API Features

### Auth APIs

- Register User
- Login User

### User APIs

- Get Stores
- Search Stores
- Submit Rating
- Update Rating
- Update Password

### Admin APIs

- Dashboard Statistics
- Add User
- Add Store
- List Users
- List Stores

### Owner APIs

- View Store Ratings
- View Average Rating

## Form Validations

### Name
- Minimum 20 characters
- Maximum 60 characters

### Password
- 8-16 characters
- At least one uppercase letter
- At least one special character

### Email
- Standard Email Validation

### Address
- Maximum 400 characters

## Screenshots

### Login Page
(Add Screenshot)

### Register Page
(Add Screenshot)

### Admin Dashboard
(Add Screenshot)

### User Dashboard
(Add Screenshot)

### Owner Dashboard
(Add Screenshot)

## Author

Sakshi Kaple
