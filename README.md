# Personal Website

A modern personal portfolio website built with Vue.js 3 and Firebase, featuring real-time chat functionality via Telegram integration.

## 🏗️ Architecture

This project consists of two main components:

- **Frontend** (`/frontend`): Vue 3 application with Vuetify UI framework
- **Cloud Functions** (`/chatFunction`): Firebase Cloud Functions for Telegram webhook handling

## 🚀 Features

- 📱 Responsive personal portfolio interface
- 💬 Real-time chat integration with Telegram
- 🔥 Firebase Firestore for message storage
- 📊 Data visualization with vue-google-charts
- 🎨 Modern UI with Vuetify 3
- ☁️ Deployed on Azure Static Web Apps

## 🛠️ Tech Stack

### Frontend
- **Framework**: Vue.js 3
- **UI Library**: Vuetify 3
- **State Management**: Vuex
- **Routing**: Vue Router
- **Charts**: Vue Google Charts
- **Build Tool**: Vue CLI
- **Database**: Firebase Firestore & Realtime Database

### Backend
- **Platform**: Firebase Cloud Functions
- **Runtime**: Node.js 20
- **Integration**: Telegram Bot API

## 📋 Prerequisites

- Node.js 20 or higher
- npm or yarn
- Firebase account
- Telegram Bot (get token from [@BotFather](https://t.me/botfather))
- Azure account (for deployment)

## 🔧 Setup

### 1. Clone the repository

```bash
git clone https://github.com/TakoCheung/PersonalSite.git
cd PersonalSite
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your Firebase and Telegram credentials
```

### 3. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database and Realtime Database
3. Enable Firebase Storage
4. Copy your Firebase configuration to `frontend/.env`

### 4. Cloud Functions Setup

```bash
cd ../chatFunction/functions
npm install

# Login to Firebase
firebase login

# Deploy functions
npm run deploy
```

### 5. Telegram Bot Setup

1. Create a bot via [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Add the token to `frontend/.env` as `VUE_APP_SECRET`
4. Set up webhook to point to your Firebase Cloud Function

## 🏃 Running Locally

### Frontend Development Server

```bash
cd frontend
npm run serve
```

The app will be available at `http://localhost:8080`

### Firebase Functions Emulator

```bash
cd chatFunction/functions
npm run serve
```

## 🏗️ Building for Production

```bash
cd frontend
npm run build
```

The production-ready files will be in the `frontend/dist` directory.

## 🚀 Deployment

### Azure Static Web Apps

The project is configured for automatic deployment to Azure Static Web Apps via GitHub Actions.

**Required GitHub Secrets:**
- `AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_DUNE_08FF5920F`
- `BOT_TOKEN`
- `VUE_APP_FIREBASE_API_KEY`
- `VUE_APP_FIREBASE_AUTH_DOMAIN`
- `VUE_APP_FIREBASE_PROJECT_ID`
- `VUE_APP_FIREBASE_STORAGE_BUCKET`
- `VUE_APP_FIREBASE_MESSAGING_SENDER_ID`
- `VUE_APP_FIREBASE_APP_ID`
- `VUE_APP_FIREBASE_MEASUREMENT_ID`

### Firebase Functions

```bash
cd chatFunction/functions
npm run deploy
```

## 📁 Project Structure

```
PersonalSite/
├── frontend/                 # Vue.js frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable Vue components
│   │   ├── views/           # Page components
│   │   ├── database/        # Firebase configuration
│   │   ├── router/          # Vue Router configuration
│   │   ├── utils/           # Helper functions
│   │   └── plugins/         # Vue plugins (Vuetify)
│   ├── .env.example         # Environment variables template
│   └── package.json
├── chatFunction/            # Firebase Cloud Functions
│   └── functions/
│       ├── index.js         # Cloud Function entry point
│       └── package.json
├── .github/
│   └── workflows/           # CI/CD configuration
└── README.md
```

## 🔒 Security

### Firebase Security Rules

Ensure you have properly configured Firebase Security Rules:

**Firestore Rules Example:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read: if true;
      allow write: if false; // Only Cloud Functions can write
    }
  }
}
```

**Storage Rules Example:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Environment Variables

Never commit `.env` files to version control. Use `.env.example` as a template.

## 🧪 Testing

```bash
cd frontend
npm run lint
```

## 📝 Available Scripts

### Frontend

- `npm run serve` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint and fix files
- `npm run reset` - Clean install (removes dist, node_modules, package-lock.json)

### Cloud Functions

- `npm run serve` - Start Firebase emulators
- `npm run deploy` - Deploy to Firebase
- `npm run logs` - View function logs
- `npm run lint` - Lint code

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👤 Author

**Tako Cheung**

- GitHub: [@TakoCheung](https://github.com/TakoCheung)

## 🙏 Acknowledgments

- Vue.js team for the excellent framework
- Firebase team for the backend services
- Vuetify team for the beautiful UI components
- All open-source contributors

---

⭐️ If you find this project useful, please consider giving it a star!
