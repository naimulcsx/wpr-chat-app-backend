# wpr-chat-app-backend

This is the backend for the WPR Chat App, built with Node.js and Express.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone git@github.com:naimulcsx/wpr-chat-app-backend.git 
    ```
2. Navigate to the project directory:
    ```sh
    cd wpr-chat-app-backend
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1. Create a [.env.development](http://_vscodecontentref_/1) file in the root directory with the following content:
    ```env
    SECRET_KEY=your_secret_key
    PORT=3000
    SALT_ROUNDS=10
    ```
2. Start the development server:
    ```sh
    npm run dev
    ```

### API Endpoints

- **Register User**
    - URL: `/register`
    - Method: `POST`
    - Body: `{ "username": "your_username", "password": "your_password" }`
    - Response: `{ "message": "User created successfully!" }`

- **Login User**
    - URL: `/login`
    - Method: `POST`
    - Body: `{ "username": "your_username", "password": "your_password" }`
    - Response: `{ "message": "User logged in successfully!", "token": "your_jwt_token" }`

- **Get User Profile**
    - URL: `/profile`
    - Method: `GET`
    - Headers: Bearer`{ "Authorization": " your_jwt_token" }`
    - Response: `{ "message": "Welcome your_username!" }`

### License

This project is licensed under the MIT License.
