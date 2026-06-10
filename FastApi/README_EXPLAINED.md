# MyRestro: Python FastAPI Project Guide

Welcome to your first Python project! This document explains how the application is built, why the files are organized this way, and how the "magic" happens behind the scenes.

## 1. The Big Picture (Architecture)
This project uses a **Layered Architecture**. Instead of putting all code in one file, we split it based on "responsibility":
- **Models**: The structure of your Database tables.
- **Schemas**: The structure of the Data coming in/out of the API (Validation).
- **CRUD/Endpoints**: The "Brain" or logic of the application.
- **Core**: Global settings like passwords and secret keys.

---

## 2. File System Breakdown

### 📂 Root Directory
- **`docker-compose.yml`**: Think of this as a "Remote Control" for your infrastructure. It tells your computer to start a PostgreSQL database and your Python app simultaneously inside isolated "containers".
- **`Dockerfile`**: A recipe for your Python environment. It installs Python, your libraries, and copies your code so it runs the same on any machine.
- **`requirements.txt`**: A shopping list of Python libraries (FastAPI, SQLModel, etc.) that the project needs to work.
- **`.env`**: A "Safe" for sensitive information (Passwords, Secret Keys). **Never** share this file publicly.
- **`seed.py`**: A helper script to create your first "Admin" user so you can log in immediately.

### 📂 `app/` (The Source Code)
- **`main.py`**: The entry point. It initializes the API, connects the database, and includes all the "Routes" (URLs).
- **`api/`**: Contains the URL definitions.
    - `deps.py`: Short for "Dependencies". It handles security (checking if a user is logged in before letting them see a page).
    - `api_v1/api.py`: A "Map" that joins all different routes (auth, menu, orders) into one big API.
- **`core/`**: 
    - `config.py`: Reads your `.env` file and makes those settings available to the code.
    - `security.py`: Logic for hashing passwords and creating Login Tokens (JWT).
- **`db/`**:
    - `database.py`: Handles the actual connection to the PostgreSQL database.
- **`models/`**:
    - `models.py`: Defines how your data looks in the Database (Table names, Columns like `id`, `name`, `price`).
- **`schemas/`**:
    - `schemas.py`: Defines how data should look when a user sends it to you. For example, when registering, it ensures the `email` is a valid email format.

---

## 3. How the Data Flows

When a user wants to "Place an Order":
1.  **Request**: The User sends a JSON package to the `/orders` URL.
2.  **Validation (Schemas)**: FastAPI checks if the JSON has all required fields (item ID, quantity).
3.  **Security (Deps)**: The app checks the "Token" in the header to see *who* is ordering.
4.  **Logic (Endpoints)**: The code calculates the total price by looking up the food price in the database.
5.  **Database (Models)**: The order is saved into the PostgreSQL table.
6.  **Response**: The user gets a "Success" message back with their Order ID.

---

## 4. Key Python Concepts Used

1.  **Type Hinting**: You'll see things like `name: str`. This tells Python that "name" must be a String. It helps prevent bugs.
2.  **Decorators**: The lines starting with `@app.post("/")`. These tell FastAPI: "When someone visits this URL, run the function below it."
3.  **Asynchronous Code**: You might see `async def`. This allows the server to handle thousands of users at once without waiting for one to finish before starting the next.
4.  **Pydantic**: A library that FastAPI uses to automatically turn your Python code into JSON (and vice versa) for the web.

---

## 5. Helpful Tips for Beginners
- **Swagger UI**: Visit `http://localhost:8000/docs`. This is your best friend. It lets you test every single "button" (endpoint) in your API without writing any frontend code.
- **Indentation**: In Python, spaces matter! If code is inside a function, it **must** be indented.
- **Errors**: If something breaks, check the terminal where you ran `docker-compose`. Python errors usually tell you exactly which line failed.
