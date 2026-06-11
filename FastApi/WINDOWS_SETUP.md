# 🪟 Windows Local Setup (Without Docker)

This guide is for users who want to run **MyRestro** directly on Windows without using Docker.

---

## 1. Install Python
1.  Go to [python.org](https://www.python.org/downloads/windows/).
2.  Download the **latest Python 3.11+ installer**.
3.  **IMPORTANT**: During installation, check the box that says **"Add Python to PATH"**.
4.  Open **Command Prompt** (cmd) and type `python --version` to verify.

## 2. Install PostgreSQL
1.  Download the installer from [EnterpriseDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
2.  Run the installer. During the setup:
    -   Set the password for the `postgres` user (e.g., `postgres`).
    -   Keep the default port `5432`.
3.  After installation, open **pgAdmin 4** (installed with PostgreSQL).
4.  Create a new database named **`myrestro`**:
    -   Right-click "Databases" -> Create -> Database...
    -   Name it `myrestro` and save.

## 3. Project Setup
Open **Command Prompt** or **PowerShell** in the project folder:

```powershell
# 1. Navigate to the project
cd MyRestro\FastApi

# 2. Create a Virtual Environment (keeps your project clean)
python -m venv venv

# 3. Activate the Virtual Environment
# For Command Prompt:
venv\Scripts\activate
# For PowerShell:
.\venv\Scripts\activate

# 4. Install the required libraries
pip install -r requirements.txt
```

## 4. Configure Environment Variables
You need to tell Python how to find your local database. 
1. Open the `.env` file in the `FastApi` folder.
2. Update the `DATABASE_URL` to point to your local machine (`localhost`) instead of the Docker name (`db`):

```env
# Change from:
# DATABASE_URL=postgresql://postgres:postgres@db:5432/myrestro
# To:
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/myrestro
```

## 5. Run the Application
With your virtual environment activated:

```powershell
# 1. Start the API
uvicorn app.main:app --reload

# 2. In a NEW terminal (activate venv again), create the Admin user
python seed.py
```

## 6. Access the API
Go to: **[http://localhost:8000/docs](http://localhost:8000/docs)**

---

## 🛠 Troubleshooting (Common Windows Issues)

### "Scripts cannot be loaded because running scripts is disabled on this system"
If you get this error in PowerShell while activating `venv`, run this command as Administrator:
`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### "psycopg2" Error during installation
If `pip install` fails on `psycopg2`, try installing the binary version:
`pip install psycopg2-binary`
