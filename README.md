# Sweet Shop Management System

A modern, full-featured sweet shop inventory management system built with JavaScript, Node.js, and Express. Includes a beautiful web UI, robust backend, and comprehensive test suite.

---

## 🚀 Deployment

The project is live at: ([Sweet Shop App](https://sweet-shop-vnma.onrender.com/))

---

## 🔗 Project Video and Test Report

[Drive Link](https://drive.google.com/drive/folders/1FhaN8OicRdUEPCdo_z3f5IWDdWe9PpO_)

---

## 🚀 Features

- **Modern Web UI**: Responsive, visually appealing, and easy to use (no Bootstrap, pure CSS)
- **Add, Delete, Purchase, Restock Sweets**: Manage sweets inventory with unique numeric IDs
- **Delete/Purchase/Restock by ID**: All operations can be performed using sweet IDs for accuracy
- **Search & Sort**: Search sweets by name, type, or price range; sort by name or price
- **Inventory Management**: Track quantity, get low stock alerts, and restock easily
- **Type Management**: Choose from preset types or add custom types for sweets
- **Robust Error Handling**: User-friendly alerts for invalid actions
- **Fully Tested**: Jest test suite covers all core and edge features

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

### 2. Clone the Repository
```sh
# If you haven't already, clone your project
# git clone <your-repo-url>
cd sweet-shop
```

### 3. Install Dependencies
```sh
npm install
```

### 4. Run Tests (Optional, but recommended)
```sh
npm test
```

### 5. Start the Server
```sh
npm start
```

### 6. Open the App
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖥️ Usage Guide

- **Add Sweet**: Fill the form and click 'Add'.
- **Delete by ID**: Enter the sweet's ID and click 'Delete by ID'.
- **Purchase Sweet**: Select a sweet from the dropdown, enter quantity, and click 'Purchase'.
- **Restock Sweet**: Enter name or ID, quantity, and click 'Restock'.
- **Search**: Use the dropdown to search by name, type, or price range.
- **Low Stock**: Click 'Show Low Stock' to see sweets with low quantity.

All actions update the sweets table in real time.

---

## 📦 Project Structure

- `index.js` - Express server and API endpoints
- `sweetShop.js` - Core logic for sweet shop management
- `public/index.html` - Frontend UI (HTML, CSS, JS)
- `tests/sweetShop.test.js` - Jest test suite
- `.gitignore` - Ignores node_modules

---


## 🧪 Testing

- All core features are covered by Jest tests in `tests/sweetShop.test.js`.
- Run tests with:
  ```sh
  npm test
  ```

---

## 📝 Troubleshooting

- **Port in use?** Change the port in `index.js` if 3000 is busy.
- **UI not updating?** Refresh the browser or check the server logs for errors.
- **Node not found?** Ensure Node.js is installed and in your PATH.

---

## 🤝 Contributing

1. Fork the repo and create a new branch for your feature or bugfix.
2. Write clear, tested code and update/add tests as needed.
3. Submit a pull request with a clear description.

---



