# Ecommerce App (MERN Stack)

A full-stack ecommerce application built using MongoDB, Express.js, React, and Node.js. The app allows users to browse products, manage cart items, place orders, and make payments.

---

## Features

* User registration and login
* Product listing and product details
* Add to cart and order management
* Payment integration (Stripe)
* REST API using Express.js
* MongoDB database integration

---

## Tech Stack

Frontend:

* React.js
* Redux
* CSS / Bootstrap
* Toast
  
  

Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)

Other:

* JWT for authentication
* Stripe for payments
* Mailtrap for email services

---

## Project Structure

```
ecommerce/
│
├── backend/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```
git clone https://github.com/rahulvvn10/ecommerce-app.git
cd ecommerce-app
```

Install backend dependencies:

```
cd backend
npm install
```

Install frontend dependencies:

```
cd ../frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## Running the Application

Start backend:

```
cd backend
npm run dev
```

Start frontend:

```
cd frontend
npm start
```

---

## API Endpoints (Sample)

* GET /api/products
* POST /api/users/login
* POST /api/orders
* POST /api/payment

---

## Notes

* Do not commit `.env` files
* Keep API keys secure
* Install dependencies using `npm install`

---

## Future Improvements

* Admin dashboard
* Order tracking

---
