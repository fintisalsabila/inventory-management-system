# Inventory Management System
This project is an Inventory Management System that allows users to manage stock and generate daily reports. The system is built using Node.js, Express, and EJS for templating. It also uses MySQL for the database.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)

## Features
- Add, edit, and delete stock items.
- Generate and view daily reports.
- User-friendly interface with responsive design.

## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/inventory-management.git
    cd inventory-management
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Setup the database:**
    - Create a MySQL database.
    - Import the provided SQL schema located in `database/schema.sql` into your MySQL database.
4. **Configure the environment variables:**
    - Create a `.env` file in the root directory of the project.
    - Add the following environment variables:
    ```env
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    PORT=3003
    ```

## Usage
1. **Start the server:**
    ```bash
    npm start
    ```
    This will start the server at `http://localhost:3003`.
2. **Access the application:**
    - Open your web browser and navigate to `http://localhost:3003`.

## File Structure
    .
    ├── node_modules/          # Node.js modules
    ├── public/                # Public files (CSS, JS, images)
    ├── src/                   # Source files
    │   ├── routes/            # Express routes
    │   ├── views/             # EJS templates
    │   ├── app.js             # Main application file
    │   └── database.js        # Database connection file
    ├── .env                   # Environment variables
    ├── .gitignore             # Git ignore file
    ├── package.json           # Node.js dependencies and scripts
    └── README.md              # Project documentation
