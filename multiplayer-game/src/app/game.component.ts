import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import * as BABYLON from 'babylonjs';
import { Client, Room } from 'colyseus.js';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  standalone: true,
  imports: [CommonModule], 
})
export class GameComponent implements OnInit {
  engine!: BABYLON.Engine;
  scene!: BABYLON.Scene;
  client!: Client;
  room!: Room;

  private shapes: { [id: string]: BABYLON.Mesh } = {}; // Store shapes by their ID

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createEngine();
      this.createScene();
      this.connectToServer();
    }
  }

  // Method to create the BabylonJS engine
  createEngine() {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(canvas, true);
  }

  // Method to create the BabylonJS scene with a camera
  // Method to create the BabylonJS scene with a camera
createScene() {
  this.scene = new BABYLON.Scene(this.engine);

  // Create the ground
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, this.scene);

  // Create a light source
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);
  light.intensity = 0.7; // Adjust intensity for better visibility

  // Create a camera and attach it to the canvas
  const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 10, -10), this.scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(document.getElementById('renderCanvas') as HTMLCanvasElement, true);

  // Start the render loop
  this.engine.runRenderLoop(() => {
    this.scene.render();
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    this.engine.resize();
  });

  // Create example shapes
  this.createShape('box1', new BABYLON.Vector3(1, 0.5, 1), 'box');
  this.createShape('sphere1', new BABYLON.Vector3(3, 0.5, 1), 'sphere');
  this.createShape('cylinder1', new BABYLON.Vector3(5, 1, 1), 'cylinder');
}

// Method to create a shape based on the type
createShape(id: string, position: BABYLON.Vector3, type: string) {
  let shape: BABYLON.Mesh;

  switch (type) {
      case 'box':
          shape = BABYLON.MeshBuilder.CreateBox(id, { size: 1 }, this.scene);
          break;
      case 'sphere':
          shape = BABYLON.MeshBuilder.CreateSphere(id, { diameter: 1 }, this.scene);
          break;
      case 'cylinder':
          shape = BABYLON.MeshBuilder.CreateCylinder(id, { diameter: 1, height: 2 }, this.scene);
          break;
      default:
          console.error('Unknown shape type:', type);
          return;
  }

  shape.position = position;

  // Assign a material to give color to the shape
  const material = new BABYLON.StandardMaterial(`${id}-material`, this.scene);
  material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random()); // Random color
  shape.material = material;

  this.shapes[id] = shape; // Store the shape in the dictionary
}


  // Asynchronously connect to the Colyseus server and join the game room
  async connectToServer() {
    this.client = new Client('ws://localhost:2567');

    try {
      // Await the join call and store the room instance
      this.room = await this.client.join('game_room');

      // Listen for messages from the server
      this.room.onMessage('shape_moved', (message: { id: string; shape: { position: number[] } }) => {
        this.updateShapePosition(message.id, message.shape);
      });

      // Create an initial shape and send its position to the server
      this.createShape('shape1', new BABYLON.Vector3(1, 0.5, 1), 'box'); // Example position
      this.room.send('move_shape', { id: 'shape1', position: [1, 0.5, 1] });
      
    } catch (error) {
      console.error('Failed to join the room:', error);
    }
  }

  // Update the position of the shape in the scene based on server message
  updateShapePosition(id: string, shape: { position: number[] }) {
    const shapeMesh = this.shapes[id];
    if (shapeMesh) {
      shapeMesh.position = new BABYLON.Vector3(shape.position[0], shape.position[1], shape.position[2]);
    } else {
      console.warn(`Shape with ID ${id} not found.`);
    }
  }
}
