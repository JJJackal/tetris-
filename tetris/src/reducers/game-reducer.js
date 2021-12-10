import { defaultState, 
         nextRotation,
         canMoveTo,
          addBlockToGrid,
          checkRows,
          randomShape      } from '../utils';


import {
    MOVE_RIGHT, MOVE_LEFT, MOVE_DOWN, ROTATE,
    PAUSE, RESUME, RESTART, GAME_OVER
  } from '../actions'
  
  const gameReducer = (state = defaultState(), action) => {
    const { shape, grid, x, y, rotation, nextShape, score, isRunning } = state;

    switch(action.type) {
      case ROTATE:
        const newRotation = nextRotation(shape, rotation);
        if (canMoveTo(shape, grid, x, y, newRotation)) {
          return { ...state, rotation: newRotation}
        }
  
        return state
  
      case MOVE_RIGHT:
        if (canMoveTo(shape,grid, x + 1, y, rotation)) {
          return { ...state, x: x+1};
        }
  
        return state
  
      case MOVE_LEFT:
        //subtract 1 from the x and check if this new position is possible by calling 'canMoveTo()'
        if (canMoveTo(shape,grid, x - 1, y, rotation)) {
          return { ...state, x: x-1};
        }
  
        return state
  
      case MOVE_DOWN:
        //get the next potential y position
        const maybeY = y +1;
        //check if the current block can move here 
        if (canMoveTo(shape, grid, x, maybeY, rotation)) {
          //if so, move the block
          return { ...state, y: maybeY};
        }
        //if not, place the block 
        const newGrid = addBlockToGrid(shape, grid, x, y, rotation);
        //reset some things to start a new shape/block
        const newState = defaultState();
        newState.grid = newGrid;
        newState.shape = nextShape;
        newState.nextShape = nextShape;
        newState.score = score;
        newState.isRunning = isRunning;
        
        if (!canMoveTo(nextShape, newGrid, 0, 4, 0)) {
          //game over
          console.log("game should be over...");
          newState.shape = 0;
          return { ...state, gameOver: true }
        }
        //update the scare based on if rows were completed or not
        newState.score = score + checkRows(newGrid);
        
        return state
  
      case RESUME:
  
        return state
  
      case PAUSE:
  
        return state
  
      case GAME_OVER:
  
        return state
  
      case RESTART:
  
        return state
  
      default:
        return state
    }
  }
  
  export default gameReducer