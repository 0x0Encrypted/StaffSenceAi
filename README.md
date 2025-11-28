# StaffSense AI — AI Face Detection for Employee Attendance

**Developed By Team StaffSense**
- Ayush Pandey (220BTCCSE135)
- Suparshva Jain (220BTCCSE154)

## Problem Statement
Traditional attendance systems (manual registers, RFID cards, biometrics) are prone to proxy attendance, lost cards, or hygiene concerns. StaffSense AI solves this by using contactless, fast, and secure AI-based face detection to mark attendance automatically.

## About StaffSense AI
StaffSense AI is a modern, lightweight web application designed to manage employee attendance using facial detection. It features a comprehensive admin dashboard, live attendance kiosk, and detailed analytics.

## Screenshot

![WebApp Screenshot](https://github.com/0x0Encrypted/StaffSenceAi/blob/62c0b38154a140c11c408cc9d2060f04bdcd1137/Screenshorts/Screenshot%20(83).png)

![App Screenshot](https://github.com/0x0Encrypted/StaffSenceAi/blob/34f3e28574e54b454be906b3bd48411e88e4238c/Screenshorts/Screenshot%20(84).png)

## Features
- **AI Face Detection:** Contactless attendance marking using camera feed.
- **Employee Management:** Register, update, and delete employees.
- **Live Attendance Kiosk:** Dedicated interface for real-time check-ins.
- **Admin Dashboard:** Overview of total employees and daily stats.
- **Attendance Logs:** Searchable and exportable history of attendance.
- **Analytics:** Visual charts for weekly trends and daily distribution.
- **Secure Admin Access:** Password-protected administrative area.

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Shadcn/UI
- **Routing:** Wouter
- **State Management:** React Context (Mock Data for Prototype)
- **Charts:** Recharts
- **Camera:** React Webcam
## Screenshot
![Employeess-Dataset Screenshot](https://github.com/0x0Encrypted/StaffSenceAi/blob/7cdc128a68c67d8ff03fe37223db2932e36d1bdf/Screenshorts/Screenshot%20(85).png)
![Employee-Registration Screenshot](https://github.com/0x0Encrypted/StaffSenceAi/blob/7cdc128a68c67d8ff03fe37223db2932e36d1bdf/Screenshorts/Screenshot%20(86).png)

## Installation Steps
1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open the application in your browser.

## How Face Detection Works (Prototype Note)
In this prototype version, the face detection is simulated for demonstration purposes.
1. The system captures a video feed using the webcam.
2. In a real-world deployment, OpenCV (Haar Cascades) would analyze frames for faces.
3. Detected faces would be compared against the stored dataset.
4. Upon a match, the attendance is marked in the database.
## Screenshot
![Face-Detection Screenshot](https://github.com/0x0Encrypted/StaffSenceAi/blob/e28b6cdc3fb0c560d6adce236e5d715a0a0b931d/Screenshorts/Screenshot%20(103).png)

## Developer Info
**Team StaffSense**
- Ayush Pandey (220BTCCSE135)
- Suparshva Jain (220BTCCSE154)
