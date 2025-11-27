# How to Run StaffSense AI Locally (Windows 11 + VS Code)

Since you are on Windows 11, you might encounter an error like `'NODE_ENV' is not recognized` if you try to run the default command. This guide explains the correct way to run this frontend prototype.

## 1. Prerequisites
- **Node.js**: Download and install the "LTS" version from [nodejs.org](https://nodejs.org/).
- **VS Code**: Your code editor.

## 2. Setup Steps

### Step 1: Download & Open
1. Download the project files.
2. Extract them to a folder.
3. Open that folder in **VS Code**.

### Step 2: Install Dependencies
1. Open the Terminal in VS Code (`Ctrl` + `~`).
2. Type this command and press Enter:
   ```bash
   npm install
   ```

### Step 3: Run the Project (Important for Windows)
Because you are on Windows, do **NOT** run `npm run dev`. That command uses Linux-specific syntax that causes the `'NODE_ENV' is not recognized` error.

**Instead, run this command:**
```bash
npm run dev:client
```

This command starts the frontend directly using Vite, which works perfectly on Windows and skips the backend server (which isn't needed for this prototype).

1. You will see a message like:
   ```
   > Local: http://localhost:5000/
   ```
2. Hold `Ctrl` and click that link to open the app.

## 3. Troubleshooting
- **Error: "'npm' is not recognized..."**: You need to install Node.js. Restart VS Code after installing it.
- **Error: "vite is not recognized"**: Make sure `npm install` finished successfully.
- **Port 5000 is busy**: Vite will automatically try port 5001. Just look at the link in the terminal.

## 4. Why `dev:client`?
This version of StaffSense AI is a **High-Fidelity Prototype**. It runs entirely in the browser using mock data. The standard `dev` command tries to start a backend server which requires database credentials you don't have locally. `dev:client` is faster, lighter, and works out-of-the-box on Windows.
