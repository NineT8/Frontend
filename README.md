# 🧠 MindMapr

> An AI-powered journaling application that analyzes your mood and provides insights into your emotional well-being.



---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| 🌐 **Live Demo (Frontend)** | [mindmapr.vercel.app](https://frontend-pearl-one-81.vercel.app) |
| 🚀 **Live API (Backend)** | [mindmapr-api.onrender.com](https://backend-ftyd.onrender.com) |
| 📦 **Frontend Repository** | [github.com/NineT8/Frontend](https://github.com/NineT8/Frontend) |
| 📦 **Backend Repository** | [github.com/NineT8/Backend](https://github.com/NineT8/Backend) |

---

## ✨ Features

### 📝 Smart Journaling
- Create and manage daily journal entries
- Rich text support for expressive writing
- Tag and categorize your thoughts

### 🤖 AI-Powered Mood Analysis
- Automatic sentiment analysis of your entries
- Mood detection using AI/ML algorithms
- Personalized insights based on your writing patterns

### 📊 Analytics Dashboard
- **Mood Trends**: Visualize your emotional journey over time
- **Weekly Insights**: Get summarized reports of your mood patterns
- **Distribution Charts**: See the breakdown of your emotions

### 🔍 Powerful Organization
- Search through all your entries
- Sort by date, mood, or custom criteria
- Filter entries by mood, date range, or tags
- Pagination for easy navigation

### 🔐 Secure Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes and API endpoints

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React-17.0.2-61DAFB?logo=react) | UI Framework |
| ![React Router](https://img.shields.io/badge/React_Router-5.3.0-CA4245?logo=react-router) | Client-side Routing |
| ![Axios](https://img.shields.io/badge/Axios-0.21.1-5A29E4?logo=axios) | HTTP Client |
| ![Chart.js](https://img.shields.io/badge/Chart.js-3.6.0-FF6384?logo=chartdotjs) | Data Visualization |

### Backend
| Technology | Purpose |
|------------|---------|
| ![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express) | Web Framework |
| ![Prisma](https://img.shields.io/badge/Prisma-6.19.0-2D3748?logo=prisma) | ORM |
| ![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql) | Database |
| ![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?logo=jsonwebtokens) | Authentication |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL database



## 📁 Project Structure

```
mindmapr/
├── backend/
│   ├── index.js           # Main server file
│   ├── middleware.js      # Auth middleware
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── package.json
│
└── frontend/
    └── mindmapr-frontend/
        ├── src/
        │   ├── components/    # Reusable UI components
        │   ├── pages/         # Application pages
        │   ├── context/       # React Context (Auth)
        │   ├── styles/        # CSS styles
        │   ├── api.js         # API configuration
        │   └── App.js         # Main app component
        └── package.json
```

---

## 🗺️ API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Create a new account |
| POST | `/login` | Login and get JWT token |

### Journal Entries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/entries` | Get all entries (with pagination) |
| POST | `/api/entries` | Create a new entry |
| GET | `/api/entries/:id` | Get entry by ID |
| PUT | `/api/entries/:id` | Update an entry |
| DELETE | `/api/entries/:id` | Delete an entry |

### Insights
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/insights/weekly` | Get weekly mood insights |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ and ☕

⭐ Star this repo if you find it helpful!

</div>
