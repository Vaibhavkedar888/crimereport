# 🚀 Deployment Guide: Smart Crime Reporting System

This guide explains how to deploy the **Backend** (Spring Boot) and **Frontend** (React + Vite) for free on **Render**.

---

## 1. Prerequisites
- A **GitHub** repository with the project code (already set up).
- A **MongoDB Atlas** account (Free tier).
  - Create a cluster.
  - Create a Database User.
  - Whitelist all IP addresses (`0.0.0.0/0`) in Network Access.
  - Get your **Connection String** (e.g., `mongodb+srv://<user>:<password>@cluster0.mongodb.net/crime_db?retryWrites=true&w=majority`).

---

## 2. Deploy Backend (Render Web Service)
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Select your GitHub repository `crimereport`.
4. **Settings**:
   - **Name**: `smart-crime-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Docker` (or `Maven` if you prefer).
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/*.jar`
   - **Plan**: Free.
5. **Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A long random string (e.g., `94a08da1fecbb6e8b46990538c7b50b2a59ce0571dae21598f8045952e4f0ef1`).
   - `FRONTEND_URL`: The URL of your frontend (you will get this in the next step, e.g., `https://smart-crime-report.onrender.com`).
6. **Wait for Deployment**: Copy the backend URL (e.g., `https://smart-crime-backend.onrender.com`).

---

## 3. Deploy Frontend (Render Static Site)
1. Go to [Render Dashboard].
2. Click **New +** > **Static Site**.
3. Select the same repository `crimereport`.
4. **Settings**:
   - **Name**: `smart-crime-report`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. **Environment Variables**:
   - `VITE_API_URL`: Your Backend URL + `/api` (e.g., `https://smart-crime-backend.onrender.com/api`).
6. **Deployment**: Click Create Static Site.

---

## 4. Final Verification
1. Once both services are "Live", visit your Frontend URL.
2. Sign up as a new user.
3. Try filing a report with an image to ensure the end-to-end integration is working.

> [!WARNING]
> **Persistent Evidence**: On the free tier, files uploaded to the `uploads/` folder will be deleted every time the service restarts. For production use, consider integrating Cloudinary for media storage.
