# Firebase Setup Guide

This portfolio website uses Firebase for backend functionality, specifically Firestore for storing contact form submissions.

## Setup Steps

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter your project name
4. Enable Google Analytics (optional)
5. Create project

### 2. Set up Firestore Database
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location close to your users
5. Click "Done"

### 3. Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web" icon to add a web app
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 4. Update Environment Variables
1. Open `.env.local` file in your project root
2. Replace the placeholder values with your actual Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-your_measurement_id
```

### 5. Set up Firestore Security Rules
In the Firestore Database, go to "Rules" and update them:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to contacts collection
    match /contacts/{document} {
      allow write: if true; // Allow anyone to submit contact forms
      allow read: if false; // Restrict reading (only for admin)
    }
  }
}
```

### 6. Optional: Set up Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build your app: `npm run build`
5. Deploy: `firebase deploy`

## Database Structure

The contact form creates documents in the `contacts` collection with this structure:

```javascript
{
  name: "John Smith",
  email: "john@example.com", 
  subject: "Project Inquiry",
  message: "I'd like to discuss a project...",
  timestamp: serverTimestamp(),
  status: "unread"
}
```

## Features

- **Contact Form**: Collects user inquiries and stores them in Firestore
- **Real-time**: Uses Firestore's real-time capabilities
- **Responsive**: Form validation and user feedback
- **Analytics**: Optional Google Analytics integration

## Security Notes

- Never commit your actual Firebase config to version control
- Keep `.env.local` in your `.gitignore`
- Use environment variables for sensitive data
- Set appropriate Firestore security rules for production

## Support

If you need help with Firebase setup, check out:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore/quickstart)
- [Next.js with Firebase](https://firebase.google.com/docs/web/setup)
