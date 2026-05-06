# BookVerse 📚

A modern full-stack online bookstore platform built with the MERN Stack.

BookVerse focuses on:

- Clean reading-focused UI
- Book discovery experience
- JWT authentication
- Shopping cart & checkout
- Reviews & ratings
- Admin dashboard
- Scalable catalog system

---

# ✨ Features

## 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing
- Protected Routes
- Role-Based Authorization

---

## 📖 Book Features

### Users Can:

- Browse books
- Search by title or author
- Filter books
- View detailed book info
- Add books to cart
- Submit reviews & ratings

### Admin Can:

- Add books
- Update books
- Delete books
- Manage catalog

---

## 🛒 Cart & Checkout

- Add to cart
- Remove from cart
- Update quantity
- Shipping information
- Order creation

---

## ⭐ Reviews & Ratings

- Add reviews
- Edit reviews
- Book rating system
- Review moderation

---

## 📊 User Dashboard

- Order history
- Reading history
- Reading progress tracking

---

## 🛠 Admin Dashboard

- Total books overview
- Active users
- Order management
- Review management
- Book management

---

# 🧱 Tech Stack

## Frontend

- Next.js
- React.js
- Tailwind CSS
- Zustand
- Axios
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod

---

# 📂 Folder Structure

```bash
bookverse/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── store/
│   │
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

# ⚙️ Installation

# 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/bookverse.git
cd bookverse
```

---

# 2️⃣ Backend Setup

```bash
cd backend
npm install
```

## Create `.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bookverse
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

## Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

## Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🔐 API Endpoints

# Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

# Books

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/books` | Get All Books |
| GET | `/api/books/:id` | Get Book Details |
| POST | `/api/books` | Add Book (Admin) |
| PUT | `/api/books/:id` | Update Book |
| DELETE | `/api/books/:id` | Delete Book |

---

# Reviews

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reviews` | Add Review |
| GET | `/api/reviews/:bookId` | Get Reviews |

---

# Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create Order |
| GET | `/api/orders/user` | User Orders |
| GET | `/api/orders` | All Orders (Admin) |

---

# 🗄 Database Models

## User

```js
{
  name,
  email,
  password,
  role,
  readingHistory,
  createdAt
}
```

---

## Book

```js
{
  title,
  author,
  genre,
  price,
  rating,
  stock,
  coverImage,
  description
}
```

---

## Review

```js
{
  userId,
  bookId,
  rating,
  comment,
  createdAt
}
```

---

## Order

```js
{
  userId,
  items,
  totalPrice,
  status,
  shippingAddress,
  createdAt
}
```

---

# 🎨 UI/UX Philosophy

BookVerse follows a minimal and elegant design:

- Clean white layout
- Serif typography
- Reading-first experience
- Minimal distractions
- Smooth browsing

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Role-Based Authorization
- Input Validation

---

# 🚀 Future Improvements

- Stripe / SSLCommerz Integration
- Cloudinary Image Upload
- Wishlist System
- Dark Mode
- AI Recommendations
- Email Verification
- OAuth Login

---

# 📸 Screenshots

## Home Page

- Hero Banner
- Featured Books
- Trending Books

## Dashboard

- Order History
- Reading Progress
- Reviews

## Admin Panel

- Books CRUD
- Orders Management
- User Management

---

# 🤝 Contributing

Contributions are welcome.

## Steps

1. Fork the repository
2. Create your branch
3. Commit changes
4. Push changes
5. Open Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Hm Jayed

- MERN Stack Developer
- Passionate about clean UI & scalable apps

---

# ⭐ Support

If you like this project:

- Give it a ⭐ on GitHub
- Share with others
- Fork the repository

---

# 🔥 BookVerse

> “A modern home for readers, stories, and discovery.”
