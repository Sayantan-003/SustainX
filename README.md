
# SustainX

A modern, full-stack web application for preventive maintenance management, featuring real-time dashboards, secure authentication, and robust analytics for industrial or facility operations.

---

## Features

- **Dashboard:** Visualize KPIs and maintenance status in real time
- **Authentication:** Secure login and protected routes
- **User Management:** Add, update, and manage users
- **Reports & Analytics:** Track maintenance schedules, completion, and trends
- **Responsive UI:** Clean, modern, and mobile-friendly design
- **API Integration:** Seamless frontend-backend communication
- **Environment Config:** Easy environment management for dev and prod

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Routing:** React Router DOM
- **HTTP:** Axios
- **Icons:** Lucide React
- **Authentication:** JWT (jsonwebtoken, jwt-decode)
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Security:** bcrypt, cookie-parser, CORS

---

## Getting Started

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd SustainX
```

### 2. Project Structure

```
SustainX/
├── Client/   # Frontend (React + Vite)
└── Server/   # Backend (Node.js + Express + MongoDB)
```

---

## Frontend Setup (Client)

1. **Navigate to the Client folder:**
	```sh
	cd Client
	```
2. **Install dependencies:**
	```sh
	npm install
	```
	If you encounter issues, install dependencies explicitly:
	```sh
	npm install react@^19.1.1 react-dom@^19.1.1 react-router-dom@^7.9.1 axios@^1.12.2 tailwindcss@^4.1.13 @tailwindcss/vite@^4.1.13 lucide-react@^0.544.0 jwt-decode@^4.0.0
	npm install -D vite@^7.1.7 @vitejs/plugin-react-swc@^4.1.0 eslint@^9.36.0 @eslint/js@^9.36.0 @types/react@^19.1.13 @types/react-dom@^19.1.9 eslint-plugin-react-hooks@^5.2.0 eslint-plugin-react-refresh@^0.4.20 globals@^16.4.0
	```
3. **Import Tailwind CSS:**
	Add the following to your main CSS file (e.g., `src/index.css` or `src/App.css`):
	```css
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	```
4. **Start the development server:**
	```sh
	npm run dev
	```
5. **Open your browser:**
	Visit [http://localhost:5173](http://localhost:5173)

---

## Backend Setup (Server)

1. **Navigate to the Server folder:**
	```sh
	cd Server
	```
2. **Install dependencies:**
	```sh
	npm install
	```
	If you encounter issues, install dependencies explicitly:
	```sh
	npm install express@^5.1.0 mongoose@^8.18.2 bcrypt@^6.0.0 body-parser@^2.2.0 cookie-parser@^1.4.7 cors@^2.8.5 dotenv@^17.2.2 dotenv-flow@^4.1.0 jsonwebtoken@^9.0.2 cross-env@^10.0.0 crypto@^1.0.1 nodemon@^3.1.10
	```
3. **Environment Variables:**
	- Configure `.env.development` and `.env.production` for your MongoDB URI and JWT secrets.
4. **Start the backend server:**
	```sh
	npm run dev
	```
5. **API runs at:**
	By default, [http://localhost:5000](http://localhost:5000) (check your `server.js` for the port)

---

## Project Structure (Detailed)

```
SustainX/
├── Client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── Pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── Server/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md
```

---

## Customization

- Update company info, contact details, and branding in the relevant components (e.g., `Footer.jsx`, `Dashboard.jsx`).
- Add or modify maintenance reports and analytics in the respective components.
- Adjust backend models and routes in `Server/models/` and `Server/routes/` as needed for your use case.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---


©MaintaincePro. All rights reserved.
