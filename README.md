# Streamer Management Application

This project is a Streamer Management Application that allows users to view, submit, and interact with streamers on different platforms.

## Table of Contents

- [Installation](#installation)
- [Backend](#Backend)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:

```bash
npm i
```

4. Configure the backend API endpoint in the `apiService.ts` file. Make sure that your DB and backend server is running.
5. Start the development server by running the following command:

```bash
npm start
```

## Backend

To run the backend server for this application, please follow these steps:

1. Go to backend folder.
2. Install the required dependencies by running npm install.
3. Configure the necessary environment variables (database connection, API keys, etc.).
4. Start the backend server by running npm start.
5. Make sure the backend server is running and accessible at the specified API endpoint in the apiService.ts file of this project.

## Running Tests

To run the tests for this project, follow these steps:

1. Make sure you have all the project dependencies installed by running `npm install` in the project directory.
2. Open a terminal or command prompt.
3. Run the following command to execute the tests (in frontend folder or in backend):

   ```bash
   npm test
   ```

## Usage

- Access the application by visiting `http://localhost:3000` in your web browser.
- The home page displays a list of streamers and their details.
- Users can upvote or downvote streamers by clicking on the respective icons.
- To view more information about a streamer, click on the "More Info" button.
- Users can also submit a new streamer using the Streamer Submission Form.

## Contributing

Contributions are welcome! Here's how you can contribute to the project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Commit your changes and push to your forked repository.
5. Submit a pull request with a clear description of your changes.

Please follow the existing coding style and conventions. Make sure to run the tests before submitting your changes.

## License

This project is licensed under the [MIT License](LICENSE).
