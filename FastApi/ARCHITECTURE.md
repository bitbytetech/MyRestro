# 🏗 Project Architecture

This document explains the technical design of MyRestro for developers who want to understand the "Why" behind the "How".

## 1. The Technology Stack
- **FastAPI**: A high-performance web framework for building APIs with Python. It uses "Type Hints" to automatically generate documentation and validate data.
- **SQLModel**: A library that bridges the gap between Python code and Database tables. It combines **SQLAlchemy** (for database power) and **Pydantic** (for data validation).
- **PostgreSQL**: A professional-grade relational database.
- **Docker**: Ensures the app runs the same on your Mac, a Windows PC, or a Cloud Server.

## 2. Layered Design
We follow a "Separation of Concerns" pattern:

### 📥 The Entry (Main)
`app/main.py` is the conductor. It starts the server, connects to the database, and wires up all the different modules.

### 🚪 The API Layer (`app/api/`)
This layer defines the URLs (Endpoints). It doesn't do "heavy lifting"; it just receives requests and sends back responses.
- `auth.py`: Handles login/registration.
- `menu.py`: Admin-only food management.
- `orders.py`: Customer ordering logic.

### 📝 The Schema Layer (`app/schemas/`)
Before data reaches the database, it is validated here. If a user sends a price as "Free" instead of a number, this layer catches the error automatically.

### 🗄 The Model Layer (`app/models/`)
This is the "Source of Truth" for your data. Every Python class here represents a physical table in PostgreSQL.
- **Relationships**: We use `Relationship` tags to link items. For example, an `Order` "belongs to" a `User`, and has "many" `OrderItems`.

### 🛡 The Core Layer (`app/core/`)
Handles sensitive operations:
- **JWT (JSON Web Tokens)**: When you log in, the app gives you a "Digital Passport" (Token). You send this token with every future request so the app knows who you are.
- **Bcrypt**: We never save plain passwords. We "hash" them so even if the database is stolen, passwords remain safe.

## 3. Workflow Example: Placing an Order
1. **User** sends a list of Item IDs to `/api/v1/orders/`.
2. **FastAPI** validates the list using `OrderCreate` schema.
3. **Security Dependency** (`deps.py`) verifies the User's JWT token.
4. **Endpoint Logic** (`orders.py`) queries the `FoodVariant` table to get current prices.
5. **Database** creates a new row in the `Order` table and multiple rows in `OrderItem`.
6. **FastAPI** returns the new Order ID to the User.
