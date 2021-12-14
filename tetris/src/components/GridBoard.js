import React, { useEffect, useRef } from 'react';
import GridSquare from './GridSquare';
import { useSelector, useDispatch } from 'react-redux';
import { shapes } from '../utils';
import { moveDown } from '../actions';



export default function GridBoard(props){
    const requestRef = useRef();
    const lastUpdateTimeRef = useRef(0);
    const progressTimeRef = useRef(0);
    const dispatch = useDispatch()

        

    const game = useSelector((state) => state.game);
    const { grid, shape, rotation, x, y, isRunning, speed } = game;
   
    const block = shapes[shape][rotation];
    const blockColor = shape;
    //map rows
    const gridSquares = grid.map((rowArray, row) => {
        
        //map columns
        return rowArray.map((square, col) => {
            //find the block x and y on the shape grid by subtracting the x and y from the col and the row
            //we get the position of the upper left corner of the block array as if it was superimposed over the main grid
            const blockX = col - x;
            const blockY = row - y; 
            let color = square;
            //map current falling block to grid
            //for any squares that fall on the grid we need to look at the block array and see if there is a 1. in this case we use the block color.
            if (blockX >= 0 && blockX < block.length && blockY >= 0 && blockY < block.length) {
                color = block[blockY][blockX] === 0 ? color : blockColor;
            }
            //generate a unique key for every block
            const k = row * grid[0].length + col;
            //generate a grid square



            return <GridSquare
                    key={k}
                    color={color} 
                    />
            
        })
    })

    
    const update = time => {
        requestRef.current = requestAnimationFrame(update);
        if (!isRunning) {
            return;
        }
        if (!lastUpdateTimeRef.current) {
            lastUpdateTimeRef.current = time;
        }
        const deltaTime = time -lastUpdateTimeRef.current;
        progressTimeRef.current += deltaTime;
        if (progressTimeRef.current > speed) {
            dispatch(moveDown());
            progressTimeRef.current = 0;
        }
        lastUpdateTimeRef.current = time;
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(update)
        return () => cancelAnimationFrame(requestRef.current)}, [isRunning]);
    
  

    return (
        <div className='grid-board'>
            {gridSquares}
        </div>
    )
}