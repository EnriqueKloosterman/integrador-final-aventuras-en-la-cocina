# Adventures in the Kitchen - Backend Application

Welcome to the backend application for **Adventures in the Kitchen**, a blog dedicated to the exquisite art of cooking. This application is built using [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.

## Features

- **User Authentication**: Secure user registration and login system.
- **Recipe  and Article Management**: Create, read, update, and delete (CRUD) operations for recipes and articles.
- **Comment System**: Users can comment on recipes and articles.
- **Profile Management**: Users can manage their profiles and view other users' profiles.
- **Interactive Community**: Facilitates interaction among users through comments and recipe sharing.
- **API Documentation**: Automatically generated API documentation using Swagger.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later) or [yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) or any other database supported by TypeORM

## Getting Started

Follow these steps to set up and run the application locally.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EnriqueKloosterman/integrador-final-aventuras-en-la-cocina.git
   cd integrador-final-aventuras-en-la-cocina
   ```

2. **Install the dependencies:**
  using npm:

  ```bash
  npm install
  ```

  using yarn:
  ```
  yarn install
  ```


## Configuration

1. **Envoriment variables:**
Create a `.env` file in the root directory ad add the following enviroment variables:
  ```env
  CLOUDINARY_NAME=your_cloudinary_cloud_name,
  CLOUDINARY_API_KEY=your_cloudinary_API_KEY,
  CLOUDINARY_API_SECRET=your_cloudinary_API_SECRET,
  JWT_SECRET=your_secret_key,
  DATABASE_HOST=localhost,
  DATABASE_PORT= 3306,
  DATABASE_USERNAME=your_database_user,
  DATABASE_PASSWORD=your_database_password,
  DATABASE_NAME=aventurascocina
  ```

## Running the Application

1. **Start the development server:**

  using npm
  ```bash
  npm run start:dev
  ```

   using yarn:
  ```
  yarn start:dev
  ```
  
  The server will start on the port `http://localhost:3030/api/v2`

  ### API Documentation

This application uses Swagger to automatically generate API documentation. Once the server is running, you can access the Swagger UI at `http://localhost:3030/api`.

**Using the Swagger UI:**

1. **Access the Swagger UI:**
   Open your browser and navigate to `http://localhost:3030/api`. You will see the interactive API documentation.

2. **Explore the API:**
   The Swagger UI provides a detailed overview of all available endpoints. You can interact with the API directly from the UI by sending requests and viewing responses.

3. **Test the Endpoints:**
   Use the "Try it out" button next to each endpoint to send requests and see the results. This is a great way to understand how the API works and to test different scenarios.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
