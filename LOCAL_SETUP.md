# How to Run StaffSense AI Locally (Windows 11 + VS Code)

Since this version of StaffSense AI is built as a High-Fidelity React Prototype, it runs using **Node.js**. Follow these steps to run it on your Windows machine.

## 1. Prerequisites
Before you start, make sure you have these installed:
- **Node.js**: Download and install "LTS" version from [nodejs.org](https://nodejs.org/).
- **VS Code**: Your code editor.

## 2. Setup Steps

### Step 1: Download the Code
1. Download the project files from Replit (or use Git if you cloned the repo).
2. Extract the folder to a location on your computer (e.g., `C:\Users\YourName\Projects\staffsense`).

### Step 2: Open in VS Code
1. Open **VS Code**.
2. Go to **File** > **Open Folder**.
3. Select the `staffsense` folder you just extracted.

### Step 3: Install Dependencies
1. Open the Terminal in VS Code:
   - Press `Ctrl` + `~` (tilde) or go to **Terminal** > **New Terminal**.
2. Type the following command and press Enter:
   ```bash
   npm install
   ```
   *(This will download all the necessary libraries like React, Tailwind, etc. It might take a minute.)*

### Step 4: Run the Project
1. Once installation is complete, type:
   ```bash
   npm run dev
   ```
2. You will see a message like:
   ```
   > Local: http://localhost:5000/
   ```
3. Hold `Ctrl` and click that link, or open your browser (Chrome/Edge) and type `http://localhost:5000`.

## 3. Troubleshooting
- **"npm is not recognized"**: This means Node.js wasn't installed correctly. Restart VS Code or your computer after installing Node.js.
- **Port already in use**: If port 5000 is busy, Vite will automatically try another one (like 5001). Check the terminal output.

## 4. Note on Backend
This version is the **Frontend Prototype** with simulated AI logic for demonstration purposes. It is designed to be lightweight and run without setting up Python or complex database servers locally.
