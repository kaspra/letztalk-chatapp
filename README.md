# Letztalk

Letztalk is a chat site built with React, Firebase, and Sass. It includes features such as authentication, adding friends, sending files and images, resetting passwords.

## Features

- **Authentication:** User sign-up, sign-in, and authentication using Firebase Auth.
- **Add Friend:** Users can add friends to their contact list.
- **Send Files and Images:** Users can share files and images in their chat.
- **Reset Password:** Users can reset their password via email.

## Technologies Used

- **React:** For building the user interface.
- **Firebase:** For authentication, real-time database, and storage.
- **Sass:** For styling the application.

## Getting Started

### Prerequisites

- Node.js
- Firebase project (set up in the Firebase Console)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/kaspra/letztalk-chatapp.git
   cd letztalk-chatapp
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:

   ```env
   VITE_REACT_APP_APIKEY = your_firebase_api_key
   VITE_REACT_APP_AUTHDOMAIN = your_firebase_auth_domain
   VITE_REACT_APP_PROJECTID = your_firebase_project_id
   VITE_REACT_APP_STORAGEBUCKET = your_firebase_storage_bucket
   VITE_REACT_APP_MESSAGINGSENDERID = your_firebase_messaging_sender_id
   VITE_REACT_APP_APPID = your_firebase_app_id
   ```

4. Run the development server:

   ```sh
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

### Authentication

1. Sign up for a new account or sign in to an existing account.
2. Verify your email if required.

### Adding Friends

- Search for users by their username or email.
- Send a friend request and wait for them to accept.

### Sending Files and Images

- Click the file attachment icon in the chat to upload and send files or images.

### Resetting Password

- Click the "Forgot Password" link on the sign-in page.
- Enter your email to receive a password reset link.

### Using Emojis

- Click the emoji icon in the chat input to open the emoji picker and add emojis to your messages.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
