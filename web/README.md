# 🌐 MyRestro Web Application

A professional React web application for managing your restaurant, built with **React**, **TypeScript**, **Redux Toolkit**, and **React Router**.

---

## 🚀 How to Run

### 1. Prerequisite: Start the API
Before running the web app, make sure your FastAPI backend is running (either via Docker or Locally).
-   API URL: `http://localhost:8000`

### 2. Setup the Web App
Open a new terminal window:

```bash
# 1. Go to the web folder
cd web

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```
Your app will open at: **[http://localhost:3000](http://localhost:3000)**

---

## 🏗 Key Features Explained

### 1. Routing (`React Router`)
We use `react-router-dom` to handle pages without refreshing the browser.
-   `/`: The Customer Menu page.
-   `/login`: Authentication page.
-   `/admin`: Protected area for the owner to manage food items.

### 2. State Management (`Redux Toolkit`)
Think of Redux as a **Global Shared Memory** for your app.
-   **Why?** When a user logs in, we need to remember their "Token" on every page.
-   **Where?** Check `src/redux/authSlice.ts`. It stores the user's login status and role.

### 3. API Communication (`Axios`)
All communication with the Python API is handled in `src/services/api.ts`.
-   It automatically adds the **Bearer Token** to every request after you log in, so you don't have to manually attach it every time.

### 4. Styling (`Vanilla CSS`)
We use CSS Variables in `src/styles/global.css` for a consistent theme (Red and Navy Blue).

---

## 🛠 Project Structure

```text
web/
├── src/
│   ├── components/  # Reusable UI elements (Buttons, Cards)
│   ├── pages/       # Full page views (Home, Login, Admin)
│   ├── redux/       # Global state (Store, Slices)
│   ├── services/    # API connection (Axios)
│   ├── styles/      # CSS files
│   └── App.tsx      # Main Layout & Routes
```

---

## 🔐 Authentication Tip
-   To test the **Admin** features, log in with: `admin@myrestro.com` / `admin123`.
-   The app checks if the email contains "admin" to show the Admin link in the navigation (for this MVP).
