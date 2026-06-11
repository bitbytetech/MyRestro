# 📱 MyRestro Mobile Application

A professional cross-platform mobile app for your restaurant, built with **React Native (Expo)**, **TypeScript**, **Redux Toolkit**, and **React Navigation**.

---

## 🚀 How to Run

### 1. Prerequisite: Start the API
Ensure your FastAPI backend is running.
-   **Note**: On mobile, `localhost` won't work to reach your machine.
    -   **Android Emulator**: Uses `10.0.2.2`.
    -   **Physical Device**: You must use your computer's local IP (e.g., `192.168.1.5`).

### 2. Setup the Mobile App
Open a new terminal window:

```bash
# 1. Go to the mobile folder
cd mobile

# 2. Install dependencies
npm install

# 3. Start Expo
npx expo start
```

### 3. Open on your Device
-   **iOS/Android**: Download the **Expo Go** app from the App Store/Play Store and scan the QR code in your terminal.
-   **Simulators**: Press `i` for iOS simulator or `a` for Android emulator in the terminal.

---

## 🏗 Key Features Explained

### 1. Navigation (`React Navigation`)
We use a **Stack Navigator** to manage screens. It provides the native header and "Back" button experience.
-   Check `App.tsx` to see how the screens are wired up.

### 2. Global State (`Redux`)
Just like the web app, Redux manages the user's session.
-   We use `AsyncStorage` (mobile's version of LocalStorage) to persist the login token even after the app is closed.

### 3. API Communication (`Axios`)
-   Located in `src/services/api.ts`.
-   It automatically detects if you are on Android or iOS to use the correct network settings for local development.

---

## 🛠 Project Structure

```text
mobile/
├── src/
│   ├── components/  # Mobile-specific UI (Buttons, List Items)
│   ├── screens/     # Full screens (Home, Login)
│   ├── redux/       # Global state
│   ├── services/    # API configuration
│   └── App.tsx      # Navigation & Root Provider
```

---

## 🔐 Login
-   Test with: `admin@myrestro.com` / `admin123`.
