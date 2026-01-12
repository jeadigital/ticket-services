# DeeTick - Frontend

A premium, responsive React web application for the Ticket Services microservices architecture. Built with **React (Vite)** and **Vanilla CSS** with a modern design system.

## 🚀 Features

-   **Premium UI/UX**: Glassmorphism effects, dark mode aesthetic, and smooth transitions.
-   **Authentication**: Secure Login and Registration interacting with `auth-service`.
-   **Dashboard**: Persistent sidebar navigation with real-time stats overview.
-   **Ticket Management**:
    -   Create new support tickets with priorities and categories.
    -   View list of your tickets filtering by status (Open, Pending, Closed).
-   **Support Center**: Interactive FAQ and Help section.
-   **User Settings**: View profile information and security settings.

## 🛠️ Prerequisites

-   **Node.js**: v18.17.1+ (Compatible with Vite 5.x)
-   **npm**: (v9+ recommended)
-   **Backend Services**: Ensure `auth-service` and `ticket-service` are running via the API Gateway on `http://localhost:8080`.

## 📦 Installation

1.  Navigate to the client directory:
    ```bash
    cd client
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    npm install --legacy-peer-deps
    ```

## 💻 Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

The artifacts will be generated in the `dist/` directory, ready to be served by any static file server (Nginx, Apache, or S3).

## 📂 Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components (DashboardLayout, etc.)
│   ├── pages/          # Full page components (Landing, Login, Dashboard, etc.)
│   ├── utils/          # Helper functions (api.js for HTTP requests)
│   ├── App.jsx         # Main routing configuration
│   ├── index.css       # Global styles and CSS variables
│   └── main.jsx        # Entry point
└── vite.config.js      # Vite configuration
```

## 🎨 Styling

The project uses a **CSS Variable** based design system located in `src/index.css`.
Key variables include:
-   `--brand-primary`: Main theme color (Indigo)
-   `--bg-primary`: Dark background color (Slate 950)
-   `--text-primary`: Main text color (Slate 50)

You can easily theme the entire application by modifying these variables.
