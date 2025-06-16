# Evenzy

![Evenzy Logo](https://evenzy-1ce13.web.app/logo.png)

## 🌟 Overview

Evenzy is a modern event discovery and management platform designed to help users find, track, and attend local events. The application provides a seamless experience for browsing upcoming events, viewing event details, and managing your event calendar.

## 🔗 Live Demo

[Visit Evenzy](https://evenzy-1ce13.web.app)

## ✨ Key Features

- **Event Discovery**: Browse through a curated list of local events
- **Event Calendar**: View all upcoming events in an interactive calendar format
- **User Authentication**: Secure login, signup, and password recovery
- **Personalized Profiles**: Manage your profile and track events you're interested in
- **Responsive Design**: Enjoy a seamless experience on all devices
- **Real-time Updates**: Get notified about event changes and updates

## 🚀 Technologies Used

### Frontend

- React 19
- React Router v7
- Tailwind CSS v4
- DaisyUI
- Framer Motion for animations
- Swiper for carousel effects
- React Hot Toast for notifications
- React Icons

### Backend & Services

- Firebase Authentication
- Firebase Firestore (for data storage)
- Firebase Hosting

## 📋 Pages & Routes

| Route              | Description                          | Access  |
| ------------------ | ------------------------------------ | ------- |
| `/`                | Home page showcasing featured events | Public  |
| `/events`          | Browse all available events          | Public  |
| `/events/:id`      | Detailed view of a specific event    | Private |
| `/events-calendar` | Calendar view of all events          | Private |
| `/login`           | User login                           | Public  |
| `/signup`          | New user registration                | Public  |
| `/forgot-password` | Password recovery                    | Public  |
| `/profile`         | User profile management              | Private |

## 🔧 Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/programming-hero-web-course1/b11a9-react-authentication-maamspy.git
cd evenzy
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:

```bash
npm run dev
```

## 📦 Build for Production

```bash
npm run build
```

## 📱 Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
evenzy/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── provider/    # Context providers
│   │   │   ├── AuthProvider.jsx
│   │   │   └── PrivateRoute.jsx
│   │   └── EventDetails.jsx
│   ├── pages/           # Application pages
│   │   ├── Home.jsx
│   │   ├── Events.jsx
│   │   ├── EventCalendar.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── ErrorPage.jsx
│   ├── App.css          # Global CSS
│   └── index.css        # Additional styling
├── .eslintrc.js         # ESLint configuration
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## 📄 Dependencies

```json
"dependencies": {
  "@tailwindcss/vite": "^4.1.6",
  "firebase": "^11.7.1",
  "framer-motion": "^12.10.5",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-hot-toast": "^2.5.2",
  "react-icons": "^5.5.0",
  "react-router": "^7.6.0",
  "swiper": "^11.2.6",
  "tailwindcss": "^4.1.6"
}
```

## 🧰 Dev Dependencies

```json
"devDependencies": {
  "@eslint/js": "^9.25.0",
  "@types/react": "^19.1.2",
  "@types/react-dom": "^19.1.2",
  "@vitejs/plugin-react": "^4.4.1",
  "daisyui": "^5.0.35",
  "eslint": "^9.25.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.19",
  "globals": "^16.0.0",
  "vite": "^6.3.5"
}
```

## 👥 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📝 License

This project is licensed under the MIT License.
