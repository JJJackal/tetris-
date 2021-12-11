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

  // Returns the next rotation for a shape
// rotation can't exceed the last index of the the rotations for the given shape.
export const nextRotation = (shape, rotation) => {
  return (rotation +1 ) % shapes[shape].length;
}

export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation];
  //loop through all rows and cols of the *shape*
  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      //look for a 1 here 
      if (currentShape[row][col] !== 0) {
        //x offset on grid
        const proposedX = col + x;
        //y offset on grid
        const proposedY = row + y;
        if (proposedY < 0 ) {
          continue
        }
        //get the row on the grid
        const possibleRow = grid[proposedY];
        //check if that row exists
        if (possibleRow) {
          //check if this column in the row is: undefined, or if its off the edges, or 0, or empty
          if (possibleRow[proposedX] === undefined || possibleRow[proposedX] !==0) {
            // undefined or not 0 and it's occupied we can't move here.
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }
  return true;
}

// Adds current shape to grid
export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  // At this point the game is not over
  let blockOffGrid = false
  const block = shapes[shape][rotation]
  const newGrid = [ ...grid ]
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        const yIndex = row + y
        // If the yIndex is less than 0 part of the block
        // is off the top of the screen and the game is over
        if (yIndex < 0) {
          blockOffGrid = true
        } else {
          newGrid[row + y][col + x] = shape
        }
      }
    }
  }
  // Return both the newGrid and the gameOver bool                                                
  return { grid: newGrid, gameOver: blockOffGrid }
}


//checks for completed rows and scores points
export const checkRows = (grid) => {
  //points increase for each row completed
  //i.e. 40 points for completing one row, 100 points for two rows
  const points = [0, 40, 100, 300, 1200];
  let completedRows = 0;
  for (let row = 0; row < grid.length; row++) {
    //no empty cells means it can't find a 0, so the row must be complete!
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1;
      //remove the row and add a new empty one at the top
      grid.splice(row,1);
      grid.unshift(Array(10).fill(0));
    }
  }
  return points[completedRows]
}