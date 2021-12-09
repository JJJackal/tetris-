import React from 'react';

//represents a grid square with a single color

export default function GridSquare(props) {
    const classes = `grid-square color-${props.color}`
    return <div className={classes} />
}