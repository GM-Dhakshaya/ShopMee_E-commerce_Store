# ShopMee - E-Commerce Platform

A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. The application consists of three main components: a customer-facing frontend, an admin dashboard, and a RESTful API backend.



## DEMO
[**▶ Run Demo**](https://ecommerce-frontend-781927518855.us-central1.run.app/)



## 🚀 Features

### Customer Features
- **User Authentication**: Register, login, and secure session management
- **Product Browsing**: Browse products by category with search functionality
- **Shopping Cart**: Add, remove, and update items in cart
- **Order Management**: Place orders with multiple payment options
- **Payment Integration**: Stripe and Razorpay payment gateways
- **Order Tracking**: View order history and status
- **Responsive Design**: Mobile-first responsive UI

### Admin Features
- **Product Management**: Add, edit, and remove products
- **Order Management**: View and update order status
- **Image Upload**: Cloudinary integration for product images
- **Dashboard Analytics**: Monitor sales and orders

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **File Upload**: Multer middleware for image handling
- **Database**: PostgreSQL with Sequelize ORM
- **Payment Processing**: Multiple payment gateway support
- **Cloud Storage**: Cloudinary for image storage

## 🏗️ Architecture

```
ecommers_project/
├── frontend/          # Customer-facing React application
├── admin/            # Admin dashboard React application
├── backend/          # Node.js/Express API server
└── shopmee/          # Additional project files
```

## 🛠️ Tech Stack

### Frontend (Customer)
- **React 19** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Frontend (Admin)
- **React 19** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Multer** - File upload
- **Cloudinary** - Image storage
- **Razorpay/Stripe** - Payment gateways
- **bcrypt** - Password hashing

## 🤖 AI Tools Used

| Area | Tool Used | Purpose |
|------|-----------|---------|
| API Testing | **Postman** + AI Assistant | Designed and executed API test suites, generated automated test cases, simulated mock API responses, and validated request/response payloads for all endpoints |
| Content/UX Writing | **ChatGPT** | Crafted concise microcopy for UI elements, wrote README documentation, structured user journey flows, and ensured consistent tone and clarity across the project |
| Debugging & Code Assistance | **ChatGPT** | Diagnosed backend and deployment issues (e.g., Cloud Run startup failures, Cloud SQL connection errors), recommended configuration fixes, and optimized Express route logic |

## 📋 Prerequisites

- Node.js (>= 18.0.0)
- PostgreSQL database
- Cloudinary account
- Razorpay/Stripe account (for payments)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecommers_project
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=4000
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

Start the backend server:
```bash
npm run server
```

### 3. Frontend Setup (Customer)
```bash
cd frontend
npm install
npm run dev
```

### 4. Admin Dashboard Setup
```bash
cd admin
npm install
npm run dev
```

## 📁 Project Structure

### Backend Structure
```
backend/
├── config/
│   ├── cloudinary.js      # Cloudinary configuration
│   └── postgredb.js       # Database configuration
├── controllers/
│   ├── cartController.js   # Cart operations
│   ├── orderControler.js  # Order management
│   ├── productController.js # Product operations
│   └── userController.js   # User authentication
├── middleware/
│   ├── adminAuth.js       # Admin authentication
│   ├── auth.js           # User authentication
│   └── multer.js         # File upload
├── models/
│   ├── orderModel.js      # Order schema
│   ├── productModel.js    # Product schema
│   └── userModel.js       # User schema
├── routes/
│   ├── cartRout.js        # Cart routes
│   ├── orderRout.js       # Order routes
│   ├── productRoute.js    # Product routes
│   └── userRoute.js       # User routes
└── server.js              # Main server file
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── context/          # React context
│   ├── assets/           # Static assets
│   └── utils/            # Utility functions
```

## 🔧 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Products
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add new product (admin)
- `POST /api/product/remove` - Remove product (admin)
- `POST /api/product/single` - Get single product

### Cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart
- `POST /api/cart/get` - Get user cart

### Orders
- `POST /api/order/place` - Place order
- `POST /api/order/user` - Get user orders
- `POST /api/order/list` - Get all orders (admin)
- `POST /api/order/status` - Update order status (admin)
- `POST /api/order/stripe` - Stripe payment
- `POST /api/order/razorpay` - Razorpay payment

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (String, Hashed)
- `cartData` (JSON)

### Products Table
- `id` (Primary Key)
- `name` (String)
- `description` (String)
- `price` (Float)
- `image` (Array of Strings)
- `category` (String)
- `subCategory` (String)
- `sizes` (Array of Strings)
- `bestseller` (Boolean)
- `date` (BigInt)

### Orders Table
- `id` (Primary Key)
- `userId` (Foreign Key)
- `items` (JSON)
- `amount` (Decimal)
- `address` (JSON)
- `status` (String)
- `paymentMethod` (String)
- `payment` (Boolean)
- `date` (Date)

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation
- CORS enabled
- Environment variable configuration
- Admin role-based access control

## 💳 Payment Integration

The application supports multiple payment gateways:

### Stripe
- Credit/Debit card payments
- Webhook verification
- Secure payment processing

### Razorpay
- UPI payments
- Net banking
- Credit/Debit cards
- Digital wallets


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- PostgreSQL for the reliable database
- All contributors and supporters 
