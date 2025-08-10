# API Documentation

## Base URL
```
http://localhost:4000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. User Authentication

#### Register User
- **URL**: `POST /user/register`
- **Description**: Register a new user account
- **Authentication**: Not required
- **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

#### Login User
- **URL**: `POST /user/login`
- **Description**: Authenticate existing user
- **Authentication**: Not required
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

#### Admin Login
- **URL**: `POST /user/admin`
- **Description**: Authenticate admin user
- **Authentication**: Not required
- **Request Body**:
```json
{
  "email": "admin@example.com",
  "password": "admin_password"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Admin login successful",
  "token": "jwt_token_here"
}
```

### 2. Product Management

#### Get All Products
- **URL**: `GET /product/list`
- **Description**: Retrieve all products
- **Authentication**: Not required
- **Response**:
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "image": ["image1.jpg", "image2.jpg"],
      "category": "Category",
      "subCategory": "Sub Category",
      "sizes": ["S", "M", "L"],
      "bestseller": true,
      "date": 1640995200000
    }
  ]
}
```

#### Get Single Product
- **URL**: `POST /product/single`
- **Description**: Get details of a specific product
- **Authentication**: Not required
- **Request Body**:
```json
{
  "id": 1
}
```
- **Response**:
```json
{
  "success": true,
  "product": {
    "id": 1,
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "image": ["image1.jpg", "image2.jpg"],
    "category": "Category",
    "subCategory": "Sub Category",
    "sizes": ["S", "M", "L"],
    "bestseller": true,
    "date": 1640995200000
  }
}
```

#### Add Product (Admin Only)
- **URL**: `POST /product/add`
- **Description**: Add a new product
- **Authentication**: Admin required
- **Request**: Multipart form data
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Category",
  "subCategory": "Sub Category",
  "sizes": ["S", "M", "L"],
  "bestseller": false,
  "image1": "file",
  "image2": "file",
  "image3": "file",
  "image4": "file"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Product added successfully"
}
```

#### Remove Product (Admin Only)
- **URL**: `POST /product/remove`
- **Description**: Remove a product
- **Authentication**: Admin required
- **Request Body**:
```json
{
  "id": 1
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Product removed successfully"
}
```

### 3. Cart Management

#### Add to Cart
- **URL**: `POST /cart/add`
- **Description**: Add item to user's cart
- **Authentication**: User required
- **Request Body**:
```json
{
  "itemId": 1,
  "size": "M",
  "quantity": 2
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Item added to cart"
}
```

#### Update Cart
- **URL**: `POST /cart/update`
- **Description**: Update cart items
- **Authentication**: User required
- **Request Body**:
```json
{
  "itemId": 1,
  "size": "M",
  "quantity": 3
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Cart updated successfully"
}
```

#### Get User Cart
- **URL**: `POST /cart/get`
- **Description**: Get user's cart items
- **Authentication**: User required
- **Request Body**: Empty or user ID
- **Response**:
```json
{
  "success": true,
  "cartData": {
    "1": {
      "M": 2,
      "L": 1
    }
  }
}
```

### 4. Order Management

#### Place Order
- **URL**: `POST /order/place`
- **Description**: Place a new order
- **Authentication**: User required
- **Request Body**:
```json
{
  "items": [
    {
      "id": 1,
      "name": "Product Name",
      "size": "M",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "amount": 199.98,
  "address": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "zipCode": "12345",
    "phone": "1234567890"
  },
  "paymentMethod": "COD"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Order placed successfully",
  "orderId": 123
}
```

#### Get User Orders
- **URL**: `POST /order/user`
- **Description**: Get orders for authenticated user
- **Authentication**: User required
- **Request Body**: Empty
- **Response**:
```json
{
  "success": true,
  "orders": [
    {
      "id": 123,
      "userId": 1,
      "items": [...],
      "amount": 199.98,
      "address": {...},
      "status": "Order Placed",
      "paymentMethod": "COD",
      "payment": false,
      "date": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get All Orders (Admin Only)
- **URL**: `POST /order/list`
- **Description**: Get all orders in the system
- **Authentication**: Admin required
- **Request Body**: Empty
- **Response**:
```json
{
  "success": true,
  "orders": [
    {
      "id": 123,
      "userId": 1,
      "items": [...],
      "amount": 199.98,
      "address": {...},
      "status": "Order Placed",
      "paymentMethod": "COD",
      "payment": false,
      "date": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Update Order Status (Admin Only)
- **URL**: `POST /order/status`
- **Description**: Update order status
- **Authentication**: Admin required
- **Request Body**:
```json
{
  "orderId": 123,
  "status": "Shipped"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Order status updated successfully"
}
```

### 5. Payment Integration

#### Stripe Payment
- **URL**: `POST /order/stripe`
- **Description**: Process payment via Stripe
- **Authentication**: User required
- **Request Body**:
```json
{
  "items": [...],
  "amount": 199.98,
  "address": {...},
  "paymentMethod": "Stripe"
}
```
- **Response**:
```json
{
  "success": true,
  "clientSecret": "pi_xxx_secret_xxx"
}
```

#### Razorpay Payment
- **URL**: `POST /order/razorpay`
- **Description**: Process payment via Razorpay
- **Authentication**: User required
- **Request Body**:
```json
{
  "items": [...],
  "amount": 199.98,
  "address": {...},
  "paymentMethod": "Razorpay"
}
```
- **Response**:
```json
{
  "success": true,
  "orderId": "order_xxx",
  "key": "rzp_test_xxx"
}
```

#### Verify Stripe Payment
- **URL**: `POST /order/verifyStripe`
- **Description**: Verify Stripe payment completion
- **Authentication**: Not required
- **Request Body**:
```json
{
  "paymentIntentId": "pi_xxx"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

#### Verify Razorpay Payment
- **URL**: `POST /order/verifyRazorpay`
- **Description**: Verify Razorpay payment completion
- **Authentication**: Not required
- **Request Body**:
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

## Error Responses

### Validation Error
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

### Authentication Error
```json
{
  "success": false,
  "message": "User not found"
}
```

### Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Status Codes

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS

The API supports CORS for cross-origin requests. All origins are allowed in development.

## File Upload

Product images are uploaded using multipart form data and stored in Cloudinary. Supported formats: JPG, PNG, GIF.

## Webhooks

Payment verification webhooks are supported for:
- Stripe payment completion
- Razorpay payment completion

## Testing Endpoints

### Test Database Connection
- **URL**: `GET /test-db`
- **Description**: Test database connectivity
- **Response**:
```json
{
  "success": true,
  "message": "Database connection working",
  "userCount": 10,
  "productCount": 50,
  "orderCount": 25
}
```

### Test Cart
- **URL**: `POST /test-cart`
- **Description**: Test cart functionality
- **Request Body**:
```json
{
  "userId": 1,
  "itemId": 1,
  "size": "M"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Cart test successful",
  "user": {
    "id": 1,
    "cartData": {...}
  }
}
```