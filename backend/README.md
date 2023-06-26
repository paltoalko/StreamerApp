# Streamer Spotlight Backend

This is the backend application for the Streamer Spotlight application. It provides the necessary APIs for managing streamer submissions and voting.

## Prerequisites

- Node.js (v16.14.0 or higher)
- npm (Node Package Manager)

## Environment Variables & packages

The backend application uses environment variables for configuration.

- To change the environment variables, create a .env file in the root directory of the project.
- Open the .env file and modify the values of the environment variables as needed.

# Database configuration

MONGO_DB_CONNECTION_URL=<your_mongodb_uri>

# Installing packages

```bash
npm i
```

## Running Server

Make sure that your DB is running before starting.

To start server:

```bash
npm run start
```

## Running Tests

To run the tests for the backend, use the following command:

```bash
npm run test
```
