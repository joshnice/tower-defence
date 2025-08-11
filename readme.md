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


How do we get a single unit across multiple pixels on the canvas 
- Drawing grid vs game grid? 
- I think the best soultion is getting a unit to be drawn across multiple grids? 
    - For example ghoul could be 2x2 
        - When this is the case though where is the unit positioned on the grid. I think we go with the top right and then draw from there... maybe we can use the center but what about 2x2, the center would not have a grid position?? 
        - Lets also think how a 5 x 2 would work?
        - The game grid needs to know at all the positions the unit it for attacking other units etc.
        - hmmmmmmm
        - So do we go back to the 

        - Unit id can exist in multiple cells in the grid system
        - Then an array of units is kept which is cycled through for a redraw?