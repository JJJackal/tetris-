import { gridDefault } from "../actions"

export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  
  // Define block shapes and their rotations as arrays.
export const shapes = [
    // none
    [[[0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]]],
  
    // I
    [[[0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]]],
  
    // T
    [[[0,0,0,0],
      [1,1,1,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [1,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],
  
    // L
    [[[0,0,0,0],
      [1,1,1,0],
      [1,0,0,0],
      [0,0,0,0]],
  
     [[1,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,0,1,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,0,0],
      [0,1,1,0],
      [0,0,0,0]]],
  
    // J
    [[[1,0,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],
  
     [[0,1,1,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,0,0,0],
      [1,1,1,0],
      [0,0,1,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,0,0],
      [1,1,0,0],
      [0,0,0,0]]],
  
    // Z
    [[[0,0,0,0],
      [1,1,0,0],
      [0,1,1,0],
      [0,0,0,0]],
  
     [[0,0,1,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],
  
    // S
    [[[0,0,0,0],
      [0,1,1,0],
      [1,1,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,1,0],
      [0,0,1,0],
      [0,0,0,0]]],
  
    // O
    [[[0,1,1,0],
      [0,1,1,0],
      [0,0,0,0],
      [0,0,0,0]]]
  ]
  
  // Random Shape
  export const randomShape = () => {
    return random(1, shapes.length - 1)
  }

  //return the default state for the game

  export const defaultState = () => {
      return {
          //create an empty grid
          grid: gridDefault(),
          //get a new random shape
          shape: randomShape(),
          //set rotation of the shape to 0 
          rotation:0,
          //set the x position of the shape to 5 and the y to -4, which puts the shape in the center top 
          x:5,
          y:-4,
          //set the index of teh next shape to a new random shape
          nextShape: randomShape(),
          //tell the game that its currently running
          isRunning: true,
          //set the score to 0
          score: 0,
          //set the default speed
          speed: 1000,
          //game isn't over yet
          gameOver: false

      }
  }