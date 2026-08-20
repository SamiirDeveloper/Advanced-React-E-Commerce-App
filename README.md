# 🛒 Adavanced React E-Commerce Store (FakeStore API)

## 📌 Overview

This project is a modern **React-based e-commerce application** that demonstrates advanced frontend concepts including **asynchronous data fetching, global state management, and persistent storage**.

The application uses the **FakeStoreAPI** to simulate a real-world shopping experience, allowing users to browse products, filter by category, add items to a cart, and complete a simulated checkout process.

---

## 🚀 Features

### 🛍️ Product Catalog

* Fetch and display products using **React Query**
* Display:

  * Product title
  * Price
  * Category
  * Description
  * Rating
  * Product image
* Responsive grid layout for all screen sizes
* Graceful image fallback using placeholder images if API images fail

---

### 🔽 Category Filtering

* Dynamic category dropdown (fetched from API)
* Filter products by selected category
* No hardcoded values — fully API-driven

---

### 🛒 Shopping Cart (Redux Toolkit)

* Add products to cart from the product listing page
* Remove products from the cart
* Automatically update product quantity
* Global state management using **Redux Toolkit**

---

### 💾 Persistent Storage

* Cart data is stored in **sessionStorage**
* Cart persists across page reloads and navigation
* Stored as an array of product objects

---

### 💰 Cart Calculations

* Total number of items in cart
* Total price calculation
* Real-time updates when cart changes

---

### ✅ Checkout Simulation

* Simulated checkout functionality
* Clears:

  * Redux cart state
  * sessionStorage
* Displays confirmation feedback to the user

---

## 🧠 Technologies Used

* **React**
* **TypeScript**
* **React Query (@tanstack/react-query)**
* **Redux Toolkit**
* **React Redux**
* **CSS (Custom + Responsive Design)**
* **Bootstrap 5
* **FakeStore API**

---

## 🌐 API Endpoints Used

* All Products:
  `https://fakestoreapi.com/products`

* Categories:
  `https://fakestoreapi.com/products/categories`

* Products by Category:
  `https://fakestoreapi.com/products/category/{category}`

---

## ⚠️ Image Handling Note

Some product images from the FakeStore API may return **404 errors**.
To ensure a consistent user experience, this project implements a fallback using:

```
https://via.placeholder.com/150
```

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/SamiirDeveloper/Advanced-React-E-Commerce-App
```

2. Navigate into the project:

```bash
cd Advanced-React-E-Commerce-App
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

---

## 📱 Responsive Design

* Fully responsive across:

  * Mobile 📱
  * Tablet 📲
  * Desktop 💻
  * Built using modern CSS techniques (Grid, Flexbox, Media Queries)
  * Bootstrap  5

---

## 🎥 Project Demo


---

## 📌 Key Learning Outcomes

* Managing server state with **React Query**
* Managing global state with **Redux Toolkit**
* Persisting data using **sessionStorage**
* Building scalable component architecture
* Creating responsive, production-ready UI

---

## 📄 License

This project is for educational purposes only.

---

## 👨‍💻 Author

Samir Mohamud
