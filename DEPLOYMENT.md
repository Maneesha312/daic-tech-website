# Deployment Guide

This guide will help you deploy the DAIC Tech Solutions application to production using Vercel (frontend) and Render (backend).

## Prerequisites

- GitHub account with your project pushed to a repository
- Vercel account (free)
- Render account (free tier available)

---

## Step 1: Deploy Backend to Render

### 1.1 Prepare Backend

1. Push your code to GitHub
2. Ensure `server/.env.example` exists with the required variables

### 1.2 Deploy to Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the web service:
   - **Name**: `daic-tech-backend` (or your preferred name)
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free (or paid for better performance)

5. Add Environment Variables:
   - `PORT`: `5001`
   - `JWT_SECRET`: Generate a secure random string (use: `openssl rand -base64 32`)
   - `DATABASE_URL`: `sqlite:./database.sqlite` (for SQLite, file-based)
   
   **Note**: For production, consider using PostgreSQL instead of SQLite:
   - Create a PostgreSQL database in Render
   - Use the provided DATABASE_URL
   - You'll need to modify the backend code to use pg instead of better-sqlite3

6. Click **Deploy Web Service**

7. After deployment, copy the backend URL (e.g., `https://daic-tech-backend.onrender.com`)

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Prepare Frontend

1. Ensure `.env.example` exists in the root directory
2. The `.env` file should NOT be committed to Git (it's in .gitignore)

### 2.2 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root of project)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://daic-tech-backend.onrender.com`)

6. Click **Deploy**

7. After deployment, copy the frontend URL (e.g., `https://daic-tech.vercel.app`)

---

## Step 3: Update Environment Variables

### For Vercel (Frontend)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add/update:
   - `VITE_API_URL`: Your Render backend URL
4. Redeploy the project to apply changes

### For Render (Backend)

1. Go to your Render service dashboard
2. Navigate to **Environment**
3. Add/update:
   - `JWT_SECRET`: Your secure secret key
   - `DATABASE_URL`: Your database connection string
4. The service will automatically restart

---

## Step 4: File Uploads (Important)

Since Render's file system is ephemeral, uploaded files (resumes) will be lost when the service restarts. For production, consider:

1. **Cloud Storage**: Use AWS S3, Cloudinary, or similar services
2. **Render Disk**: Add a persistent disk to your Render service (paid feature)

### Quick Fix for Free Tier:

For now, the current setup with local file storage will work, but files will be lost on redeploy. This is acceptable for testing.

---

## Step 5: Database Considerations

### Current Setup (SQLite)

The backend uses SQLite with `better-sqlite3`. This works for development and small-scale production but has limitations:
- File-based database
- Not ideal for concurrent writes
- Ephemeral on Render (data lost on redeploy unless using persistent disk)

### Recommended: PostgreSQL

For production, switch to PostgreSQL:

1. Create a PostgreSQL database in Render (free tier available)
2. Install `pg` package:
   ```bash
   cd server
   npm install pg
   ```
3. Modify `server.js` to use PostgreSQL instead of SQLite
4. Update `DATABASE_URL` environment variable with Render's PostgreSQL URL

---

## Step 6: Testing

1. Visit your Vercel frontend URL
2. Test contact form submission
3. Test job application submission
4. Test admin login at `/admin/login`
5. Verify admin dashboard functionality

---

## Troubleshooting

### CORS Errors

If you encounter CORS errors:
1. Ensure the backend's CORS configuration allows your Vercel domain
2. Update the CORS origin in `server.js`:
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
   ```

### API Connection Issues

1. Verify `VITE_API_URL` is set correctly in Vercel
2. Check Render backend logs for errors
3. Ensure backend is running and accessible

### Build Failures

1. Check Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Verify build command is correct

---

## URLs After Deployment

- **Frontend**: Your Vercel URL (e.g., `https://daic-tech.vercel.app`)
- **Backend**: Your Render URL (e.g., `https://daic-tech-backend.onrender.com`)
- **Admin Dashboard**: `https://daic-tech.vercel.app/admin/login`

---

## Default Admin Credentials

- Email: `admin@daictech.com`
- Password: `admin123`

**Important**: Change these credentials in production by:
1. Logging into the admin dashboard
2. Updating the admin user directly in the database
3. Or creating a new admin user via a script

---

## Next Steps

1. Set up a custom domain (optional)
2. Configure SSL (automatic on Vercel/Render)
3. Set up monitoring and error tracking (e.g., Sentry)
4. Implement proper file storage (S3/Cloudinary)
5. Switch to PostgreSQL for production database
6. Add rate limiting to API endpoints
7. Implement proper logging

---

## Support

For issues:
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
- GitHub Issues: Check your repository issues
