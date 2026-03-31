# 🏥 Elder Management System 

A full-stack web application for managing elder care records.  
Built using **React, Node.js (Express), and PostgreSQL**.

---

## 🚀 Features

- ➕ Add elder records
- 📄 View all elders
- ✏️ Update elder details
- ❌ Delete records
- 🔄 REST API integration
- 🎨 Simple UI

---

## 🧱 Tech Stack

### Frontend
- React JS
- Axios
- CSS

### Backend
- Node.js
- Express.js
- PostgreSQL

---

## 📁 Project Structure

```

elders-api/
server.js
.env

elders-frontend/
src/
App.js
components/

````

---

## 🗄️ Database Setup

Create database and table:

```sql
CREATE DATABASE caresync;

\c caresync;

CREATE TABLE elders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  condition VARCHAR(100)
);
````

---

## ⚙️ Backend Setup

### Install dependencies

```bash
npm install
```

### Run server

```bash
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

## 🌐 API Endpoints

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | /api/elders     | Get all elders   |
| GET    | /api/elders/:id | Get single elder |
| POST   | /api/elders     | Add new elder    |
| PUT    | /api/elders/:id | Update elder     |
| PATCH  | /api/elders/:id | Partial update   |
| DELETE | /api/elders/:id | Delete elder     |

---

## 💻 Frontend Setup

### Install dependencies

```bash
npm install
```

### Start React app

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔄 How It Works

```
React UI → Express API → PostgreSQL → Response → UI Update
```

---

## 👨‍💻 Author

Developed as a learning full-stack project for CRUD + REST API practice.

---

## 📌 Note

Make sure backend and database are running before starting frontend.

````

# 💡 DONE ✔

Now project is: ✔ Professional

