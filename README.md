# Roxiler Store Rating App

A Full Stack Store Rating Application built using React.js, Node.js, Express.js, and MySQL.

## Features

### Authentication & Authorization

* User Registration
* Login System
* JWT Authentication
* Role Based Access Control

### Roles

#### Admin

* Add New Users
* Add Stores
* View Users
* View Stores
* Dashboard Counts

#### User

* View Stores
* Search Stores
* Filter Stores By Rating
* Submit Rating
* Update Rating
* Change Password

#### Owner

* View Store Ratings
* View Average Rating
* Change Password

## Tech Stack

### Frontend

* React.js
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt

### Database

* MySQL

## Installation

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

Create a `.env` file inside backend folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=store_rating_db
JWT_SECRET=mysecretkey123
PORT=5000
```

## Author

Sakshi Kaple
