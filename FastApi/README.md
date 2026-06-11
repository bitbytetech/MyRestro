# 🍴 MyRestro API

A modern Restaurant Management System API built with **Python FastAPI**, **SQLModel**, and **PostgreSQL**.

---

## 🚀 Quick Start (For Beginners)

If you have **zero** experience with Python or Databases, don't worry! We use **Docker** to handle everything.

### 1. Install Docker
Download and install **Docker Desktop** for Mac: [Download here](https://www.docker.com/products/docker-desktop/).
*Docker creates a "virtual computer" on your Mac where the database and Python run perfectly without you needing to install them manually.*

### 2. Run the Project
Open your Terminal and run these three commands:

```bash
# 1. Go to the project folder
cd FastApi

# 2. Start the "virtual computer" (Containers)
docker-compose up -d --build

# 3. Create the Admin User (Only needed once)
docker-compose exec api python seed.py
```

### 3. Use the API
Open your browser to:
👉 **[http://localhost:8000/docs](http://localhost:8000/docs)**
*   This is the **Swagger UI**. You can test every feature (Login, Menu, Orders) by clicking "Try it out".
*   **Default Admin Login:** `admin@myrestro.com` / `admin123`

---

## 🛠 Project Structure

```text
FastApi/
├── app/
│   ├── api/          # URL Route definitions (The "Doors" to your app)
│   ├── core/         # Security and Configuration (The "Vault")
│   ├── db/           # Database connection logic
│   ├── models/       # Database table definitions (The "Data Structure")
│   ├── schemas/      # Data validation rules (The "Contract")
│   └── main.py       # Entry point of the application
├── Dockerfile        # Recipe for the Python environment
├── docker-compose.yml # Infrastructure manager
└── seed.py           # Initial data creator
```

---

## 📊 Database Management

### How to see your data tables:
Since the database is running inside Docker, you can use a tool like **DBeaver** or **TablePlus** to connect, or use the terminal:

```bash
# Connect to the database inside Docker
docker-compose exec db psql -U postgres -d myrestro
```

Once inside the database terminal, use these commands:
- `\dt` : List all tables.
- `SELECT * FROM "user";` : See all registered users.
- `\q` : Exit the database terminal.

---

## 📖 Learn More
For a deep dive into how the code works, see [ARCHITECTURE.md](./ARCHITECTURE.md).
