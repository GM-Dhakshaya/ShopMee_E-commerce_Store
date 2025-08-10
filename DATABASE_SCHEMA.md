# Database Schema Documentation

## Overview

The e-commerce platform uses PostgreSQL as the primary database with Sequelize ORM for data modeling and management. The database consists of three main tables: Users, Products, and Orders.

## Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│      Users      │         │     Products    │         │      Orders     │
├─────────────────┤         ├─────────────────┤         ├─────────────────┤
│ PK: id          │         │ PK: id          │         │ PK: id          │
│ name            │         │ name            │         │ FK: userId      │
│ email           │         │ description     │         │ items           │
│ password        │         │ price           │         │ amount          │
│ cartData        │         │ image           │         │ address         │
└─────────────────┘         │ category        │         │ status          │
         │                  │ subCategory      │         │ paymentMethod   │
         │                  │ sizes            │         │ payment         │
         │                  │ bestseller       │         │ date            │
         │                  │ date             │         └─────────────────┘
         │                  └─────────────────┘                   │
         │                                                         │
         └─────────────────────────────────────────────────────────┘
                              (1:N Relationship)
```

## Table Structures

### 1. Users Table

**Table Name**: `Users`

| Column    | Data Type    | Constraints           | Description                    |
|-----------|--------------|----------------------|--------------------------------|
| id        | INTEGER      | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier        |
| name      | VARCHAR      | NOT NULL             | User's full name              |
| email     | VARCHAR      | NOT NULL, UNIQUE     | User's email address          |
| password  | VARCHAR      | NOT NULL             | Hashed password               |
| cartData  | JSON         | DEFAULT {}           | User's shopping cart data     |

**Indexes**:
- Primary Key: `id`
- Unique Index: `email`

**Sample Data**:
```sql
INSERT INTO "Users" (id, name, email, password, "cartData") VALUES
(1, 'John Doe', 'john@example.com', '$2b$10$...', '{}'),
(2, 'Jane Smith', 'jane@example.com', '$2b$10$...', '{"1": {"M": 2}}');
```

### 2. Products Table

**Table Name**: `Products`

| Column      | Data Type    | Constraints           | Description                    |
|-------------|--------------|----------------------|--------------------------------|
| id          | INTEGER      | PRIMARY KEY, AUTO_INCREMENT | Unique product identifier     |
| name        | VARCHAR      | NOT NULL             | Product name                  |
| description | VARCHAR      | NOT NULL             | Product description           |
| price       | FLOAT        | NOT NULL             | Product price                 |
| image       | VARCHAR[]    | NOT NULL             | Array of image URLs           |
| category    | VARCHAR      | NOT NULL             | Product category              |
| subCategory | VARCHAR      | NOT NULL             | Product sub-category          |
| sizes       | VARCHAR[]    | NOT NULL             | Available sizes               |
| bestseller  | BOOLEAN      | DEFAULT false        | Best seller flag              |
| date        | BIGINT       | NOT NULL             | Creation timestamp            |

**Indexes**:
- Primary Key: `id`
- Index: `category` (for filtering)
- Index: `bestseller` (for featured products)

**Sample Data**:
```sql
INSERT INTO "Products" (id, name, description, price, image, category, "subCategory", sizes, bestseller, date) VALUES
(1, 'Classic T-Shirt', 'Comfortable cotton t-shirt', 29.99, 
 '["https://res.cloudinary.com/xxx/image1.jpg", "https://res.cloudinary.com/xxx/image2.jpg"]', 
 'Clothing', 'T-Shirts', '["S", "M", "L", "XL"]', true, 1640995200000);
```

### 3. Orders Table

**Table Name**: `Orders`

| Column        | Data Type    | Constraints           | Description                    |
|---------------|--------------|----------------------|--------------------------------|
| id            | INTEGER      | PRIMARY KEY, AUTO_INCREMENT | Unique order identifier       |
| userId        | INTEGER      | NOT NULL, FOREIGN KEY | Reference to Users table      |
| items         | JSON         | NOT NULL             | Order items with details      |
| amount        | DECIMAL(10,2)| NOT NULL             | Total order amount            |
| address       | JSON         | NOT NULL             | Shipping address              |
| status        | VARCHAR      | NOT NULL, DEFAULT 'Order Placed' | Order status                |
| paymentMethod | VARCHAR      | NOT NULL             | Payment method used           |
| payment       | BOOLEAN      | NOT NULL, DEFAULT false | Payment status               |
| date          | TIMESTAMP    | NOT NULL, DEFAULT NOW | Order creation date           |
| createdAt     | TIMESTAMP    | DEFAULT NOW          | Record creation timestamp     |
| updatedAt     | TIMESTAMP    | DEFAULT NOW          | Record update timestamp       |

**Indexes**:
- Primary Key: `id`
- Foreign Key: `userId` → `Users.id`
- Index: `status` (for filtering)
- Index: `date` (for sorting)

**Sample Data**:
```sql
INSERT INTO "Orders" (id, "userId", items, amount, address, status, "paymentMethod", payment, date) VALUES
(1, 1, '[{"id": 1, "name": "Classic T-Shirt", "size": "M", "quantity": 2, "price": 29.99}]', 
 59.98, '{"street": "123 Main St", "city": "New York", "state": "NY", "zipCode": "10001", "phone": "1234567890"}', 
 'Order Placed', 'COD', false, '2024-01-01 10:00:00');
```

## Relationships

### 1. Users → Orders (One-to-Many)
- One user can have multiple orders
- Each order belongs to exactly one user
- Foreign key: `Orders.userId` references `Users.id`

### 2. Users → Cart (One-to-One)
- Each user has one cart
- Cart data is stored as JSON in the `Users.cartData` field
- Structure: `{"productId": {"size": quantity}}`

## Data Types and Constraints

### JSON Fields

#### Users.cartData
```json
{
  "1": {
    "M": 2,
    "L": 1
  },
  "5": {
    "S": 1
  }
}
```

#### Orders.items
```json
[
  {
    "id": 1,
    "name": "Classic T-Shirt",
    "size": "M",
    "quantity": 2,
    "price": 29.99
  }
]
```

#### Orders.address
```json
{
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "phone": "1234567890"
}
```

### Array Fields

#### Products.image
```sql
["image1.jpg", "image2.jpg", "image3.jpg"]
```

#### Products.sizes
```sql
["S", "M", "L", "XL"]
```

## Constraints and Validation

### User Constraints
- Email must be unique across all users
- Password must be hashed using bcrypt
- Name cannot be null or empty

### Product Constraints
- Price must be positive
- Image array cannot be empty
- Category and subCategory are required
- Sizes array cannot be empty

### Order Constraints
- User must exist before creating order
- Amount must be positive
- Status must be one of predefined values
- Address must contain required fields

## Status Values

### Order Status
- `Order Placed` - Initial status
- `Processing` - Order being prepared
- `Shipped` - Order shipped
- `Delivered` - Order delivered
- `Cancelled` - Order cancelled

### Payment Methods
- `COD` - Cash on Delivery
- `Stripe` - Credit/Debit card via Stripe
- `Razorpay` - UPI/Net banking via Razorpay

## Indexes and Performance

### Primary Indexes
- All tables have auto-incrementing primary keys
- Foreign key relationships are indexed

### Secondary Indexes
- `Users.email` - For fast login lookups
- `Products.category` - For category filtering
- `Products.bestseller` - For featured products
- `Orders.status` - For status filtering
- `Orders.date` - For date-based queries

## Database Configuration

### Connection Settings
```javascript
// config/postgredb.js
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
```

### Environment Variables
```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
```

## Migration and Seeding

### Database Sync
```javascript
// Sync all models with database
sequelize.sync({ force: false });
```

### Sample Data Population
```javascript
// Example: Create sample products
const sampleProducts = [
  {
    name: "Classic T-Shirt",
    description: "Comfortable cotton t-shirt",
    price: 29.99,
    image: ["image1.jpg", "image2.jpg"],
    category: "Clothing",
    subCategory: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    date: Date.now()
  }
];
```

## Backup and Recovery

### Backup Strategy
- Regular automated backups
- Point-in-time recovery capability
- Transaction log backups

### Recovery Procedures
1. Restore from latest backup
2. Apply transaction logs
3. Verify data integrity
4. Update application if needed

## Security Considerations

### Data Protection
- Passwords are hashed using bcrypt
- Sensitive data is encrypted
- Database access is restricted

### Access Control
- Database user has minimal required privileges
- Connection strings are secured
- Environment variables are protected

## Monitoring and Maintenance

### Performance Monitoring
- Query performance tracking
- Index usage monitoring
- Connection pool monitoring

### Maintenance Tasks
- Regular index optimization
- Statistics updates
- Vacuum operations
- Log rotation

## Troubleshooting

### Common Issues
1. **Connection Timeout**: Check network connectivity
2. **Authentication Error**: Verify credentials
3. **Constraint Violation**: Check data integrity
4. **Performance Issues**: Review indexes and queries

### Debug Queries
```sql
-- Check table sizes
SELECT schemaname, tablename, attname, n_distinct, correlation 
FROM pg_stats 
WHERE tablename IN ('Users', 'Products', 'Orders');

-- Check foreign key constraints
SELECT tc.table_name, kcu.column_name, 
       ccu.table_name AS foreign_table_name,
       ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE constraint_type = 'FOREIGN KEY';
``` 