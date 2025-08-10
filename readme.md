How can we move a unit across the board?

What should handle it? 
Should the board hanle it or the unit itself?


Unit decides where it want to move to (for example will tell the board what cell it want to move to)
Tells the board then figures out where it needs to be drawn.

Board
    Cell
Unit
    MovementFn


Collesion Detection? 



Board has all the positions of the units on it
    Board actually has to draw nothing on the canvas
    Drawing of the units on the canvas is down to the unit class itself
        Can use a canvas positioning class to choose where to draw it/ maybe it can just use the board? 

Render function will call each asset which will draw itself on the canvas