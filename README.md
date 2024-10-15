# Multiplayer Game with BabylonJS and Colyseus

## Overview
The Multiplayer Game is an interactive application that allows users to create and manipulate 2D shapes, extruding them into 3D objects in a shared environment. Built with Angular for the frontend and NodeJS with Colyseus for the backend, this project facilitates real-time interactions among players.

## Features
- **Shape Creation**: Users can create 2D shapes that can be extruded into 3D objects.
- **Real-Time Interaction**: Players can see other users' shapes and movements in real-time, providing a collaborative experience.
- **Dynamic Environment**: The game scene is scrollable, allowing players to navigate through the environment.
- **User Controls**: Intuitive controls for manipulating shapes, with a responsive interface.

## Thought Process

1. **Understanding the Problem**
   The main goal was to create a multiplayer game where users could create and interact with shapes in a shared 3D environment. I needed to integrate BabylonJS for rendering graphics and Colyseus for handling real-time communication between clients.

2. **Designing the Solution**
   I began by designing the game architecture, focusing on:
   - Setting up a BabylonJS scene with a camera and lights to create a visually appealing environment.
   - Implementing a Colyseus server to manage player connections and interactions.
   - Creating a structure to handle shape creation and manipulation.

3. **Backend**
   The backend is powered by NodeJS and Colyseus:
   - The server manages game rooms and player connections.
   - It listens for messages from clients to create or update shapes and broadcasts updates to all connected players.
   - This ensures all players see the same game state in real-time.

4. **Frontend (UI)**
   The Angular frontend provides a user-friendly interface:
   - Users can create shapes by clicking on the canvas and specifying dimensions.
   - Controls for moving and extruding shapes are provided.
   - The UI displays real-time updates of shapes created by other players.

5. **Real-Time Communication**
   Colyseus is used to manage real-time communication:
   - The client connects to the Colyseus server and joins a game room.
   - Upon shape creation or manipulation, messages are sent to the server, which then broadcasts updates to all connected clients.
   - This enables a seamless multiplayer experience.

6. **Challenges**
   - Synchronizing the game state across all clients while ensuring minimal latency.
   - Handling user inputs efficiently to maintain a responsive UI.
   - Debugging real-time interactions and ensuring all players see consistent updates.

## Project Structure
- **game.component.ts**: Contains the core logic for rendering shapes and managing user interactions.
- **game.component.html**: The UI for the game, allowing users to create and manipulate shapes.
- **server.js (NodeJS)**: Handles requests and manages player connections through the Colyseus framework.

## How to Run
### Frontend (Angular)
1. Navigate to the project directory.
2. Run `npm install` to install the dependencies.
3. Use `ng serve` to start the Angular development server.
4. Open the browser at [http://localhost:4200](http://localhost:4200) to view the app.

### Backend (NodeJS)
1. Navigate to the backend folder.
2. Run `npm install` to install the necessary packages.
3. Start the server using `node server.js`.
4. The game server will be available on the specified port (default: 2567).

## Conclusion
The Multiplayer Game provides an engaging platform for users to interact with shapes in a 3D space, utilizing the power of BabylonJS for rendering and Colyseus for real-time multiplayer functionality. Future enhancements could include additional shapes, improved user controls, and persistent game states.
