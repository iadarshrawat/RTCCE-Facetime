
# Real-Time Code Editor with Video Calling

This project is a real-time collaborative code editor with built-in video calling functionality. It allows multiple users to work on the same code simultaneously while communicating via video. The editor supports most popular programming languages, with a built-in compiler for real-time code execution.


## Features

- **Real-Time Collaboration**: Edit code simultaneously with others.
- **Video Calling**: Built-in video chat using WebRTC.
- **Multi-Language Support**: Compile and run code in various programming languages.
- **Syntax Highlighting**: CodeMirror integration for an enhanced coding experience.
- **Live Updates**: Changes made by any user are reflected in real-time for all participants.
- **User-Friendly UI**: A seamless and intuitive interface.

## Tech Stack

- **Frontend**: React.js, CodeMirror
- **Backend**: Node.js, Express.js
- **Real-Time Communication**: Socket.IO
- **Video Calling**: WebRTC
- **Compiler**: Custom API to compile and execute code

## Project Structure
```

### `/client`
Contains the React.js code for the front-end, including:
- UI components
- Hooks for WebRTC and Socket.IO
- Integration with the code editor (CodeMirror)

### `/server`
Contains the Node.js server code, including:
- WebSocket connections (Socket.IO)
- WebRTC signaling
- Compiler service for multiple languages

## Clone Repository

To get started with the project, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/real-time-code-editor.git
```

Navigate into the project directory:

```bash
cd real-time-code-editor
```

## Post-Clone Steps

After cloning the repository, follow these steps to set up the project:

1. **Install Dependencies**:
   Navigate to both the `client` and `server` directories to install required dependencies:
   - For the client:
     ```bash
     cd client
     npm install
     ```
   - For the server:
     ```bash
     cd ../server
     npm install
     ```

2. **Environment Variables**:
   Set up your `.env` file in the `server` directory. Include the following variables (update with your actual values):
   ```env
   PORT=5000
   COMPILER_API_KEY=your-compiler-api-key
   ```

3. **Run the Application**:
   - Start the backend server:
     ```bash
     npm start
     ```
   - Start the client:
     ```bash
     cd ../client
     npm start
     ```

4. **Access the Application**:
   Open your browser and go to `http://localhost:3000` to use the real-time code editor.

## Usage

1. **Open the application** and share the room ID with collaborators.
2. **Join the room** to start editing and video calling.
3. **Select a language** and use the built-in compiler to run code in real time.

## Supported Languages

The editor supports compiling and running code in:
- Python
- JavaScript
- C++
- Java
- Go
- Ruby
- And more...

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any feature, bug fix, or documentation update.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or suggestions:
- **Email**: your.email@example.com
- **GitHub**: [your-username](https://github.com/your-username)
