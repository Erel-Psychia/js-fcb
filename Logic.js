//Back-end board
let board;
//Player score
let score=0;
//Number of rows and columns
let rows=4, columns=4;
//Player victory checkers
let is2048Exist=false;
let is4096Exist=false;
let is8192Exist=false;

//Start the game
function setGame()
{
//Store the element which identifies as board
let store=document.getElementById("board");
//Fill the back-end board with numbers
board=[[32, 8, 4, 0], [4, 128, 64, 256], [8, 32, 16, 2], [16, 2, 256, 1024]];
//Start the first loop counter
for(let r=0; r<rows; r++)
{
//Start the second loop counter
for(let c=0; c<columns; c++)
{
//Create a tile for the front-end board, using the div element
let tile=document.createElement("div");
//Set the tile's identifier based on it's current position
tile.id=r.toString()+"-"+c.toString();
//Update a tile, using the value of the back-end board
updateTile(tile, board[r][c]);
//Add the new tile to the front-end board
store.append(tile);
}
}
//Automatically add the first 2 tiles
setTwo();
setTwo();
}

//Update the color of a tile based on it's value
function updateTile(tile, num)
{
//Erase the contents of the tile
tile.innerText="";
tile.classList.value="";
//Ensure that the tile is specified correctly
tile.classList.add("tile");
//If the tile's number is greater than 0, add the number
if(num>0)
{
tile.innerText=num.toString();
//The number can only reach 8192
if(num<8192)
tile.classList.add("x"+num.toString());
else
tile.classList.add("x8192");
}
}

//Start the game when the page fully loads
window.onload=function()
{
setGame(true);
}

//React to key presses
function handleSlide(e)
{
//Log the pressed key for error monitoring purposes
console.log(e.code);
if(e.code == "ArrowLeft")
slideLeft();
else if(e.code == "ArrowRight")
slideRight();
else if(e.code == "ArrowUp")
slideUp();
else if(e.code == "ArrowDown")
slideDown();
//The slide function is responsible for checking for victory and other game conditions, this is done to avoid a reaction to other keys being pressed
}

//Add a listener for key presses
document.addEventListener("keydown", handleSlide);

//Move tiles left
function slideLeft()
{
//Start the first loop
for(let r=0; r<rows; r++)
{
//Slide the tiles on the current row
board[r]=slide(board[r]);
//Start the second loop
for(let c=0; c<columns; c++)
{
//Update tiles
let tile = document.getElementById(r.toString() + "-" + c.toString());
updateTile(tile, board[r][c]);
}
}
}

//Move tiles right
function slideRight()
{
//Start the first loop
for(let r=0; r<rows; r++)
{
//Slide the tiles on the current row
board[r]=slide(board[r].reverse());
board[r].reverse();
//Start the second loop
for(let c=0; c<columns; c++)
{
//Update tiles
let tile = document.getElementById(r.toString() + "-" + c.toString());
updateTile(tile, board[r][c]);
}
}
}

//Move tiles up
function slideUp()
{
//Start the first loop
for(let c=0; c<columns; c++)
{
//Obtain the tiles in the column
let col=[board[0][c], board[1][c], board[2][c], board[3][c]];
//Slide the tiles on the column
col=slide(col, true);
//Start the second loop
for(let r=0; r<rows; r++)
{
//Update tiles
board[r][c]=col[r];
let tile = document.getElementById(r.toString() + "-" + c.toString());
updateTile(tile, board[r][c]);
}
}
}

//Move tiles down
function slideDown()
{
//Start the first loop
for(let c=0; c<columns; c++)
{
//Obtain the tiles in the column
let col=[board[0][c], board[1][c], board[2][c], board[3][c]];
//Slide the tiles on the column
col=slide(col.reverse());
col.reverse();
//Start the second loop
for(let r=0; r<rows; r++)
{
//Update tiles
board[r][c]=col[r];
let tile = document.getElementById(r.toString() + "-" + c.toString());
updateTile(tile, board[r][c]);
}
}
}

//Slide all numbers in a row, with an optional value specifying if the slide should be done in reverse
function slide(tile)
{
//[ 2, 0, 2, 2] -> [2, 2, 2]
tile=filterZero(tile);
//Start a loop
for(let i=0; i < tile.length-1; i++)
{
if(tile[i]==tile[i+1]) // true 
{
tile[i]*=2; //[4, 2, 2]
tile[i+1]=0; // [4, 0, 2]
}
}
tile=filterZero(tile); // [4, 2]
//Start another loop
while(tile.length < columns)
{
tile.push(0); // [4, 2, 0, 0]
}
//Increment the score
score++;
//Then assign it to the score displayed on the top
updateScore();
//Automatically check for victory conditons
checkWin();
//Automatically check for possible game continuation
if(hasLost()==true)
{
//If the game is over, display a message to notify the player, reset the board, and do nothing else
alert("Game over...");
restartGame();
return;
}
//Otherwise, automatically add a tile in the board
setTwo();
return row;
}

//Update the score displayed on the top
function updateScore()
{
document.getElementById("score").innerHtml=score;
}
//Check if there is an empty tile on the board
function hasEmptyTile()
{
//Start the first loop
for(let r=0; r<rows; r++)
{
//Start the second loop
for(let c=0; c<columns; c++)
{
//If there is an empty tile, return true
if(board[r][c]==0)
return true;
}
}
//Otherwise, return false
return false;
}

//Create a value on the chosen tile
function setTwo()
{
if(hasEmptyTile()==false)
return;
let found=false;
while(found==false)
{
let r=Math.floor(Math.random()*rows);
let c=Math.floor(Math.random()*columns);
if(board[r][c]==0)
{
board[r][c]=2;
let tile=document.getElementById(r.toString()+"-"+c.toString());
updateTile(tile, board[r][c]);
found=true;
}
}
}

//Check if the game is already won
function checkWin()
{
//Start the first loop
for(let r=0; r<rows; r++)
{
//Start the second loop
for(let c=0; c<columns; c++)
{
if(board[r][c]==2048&&is2048Exist==false)
{
alert("You Win! You got the 2048!");
is2048Exist=true;
}
else if(board[r][c]==4096&&is4096Exist==false)
{
alert("Wow! You are unstoppable at 4096!");
is4096Exist==true;
}
else if(board[r][c]==8192&&is8192Exist==false)
{
alert("Victory! You have reached 8192! You are incredibly awesome!");
is8192Exist=true;
}
}
}
}

//Check if the game is over
function hasLost()
{
//Start the first loop
for(let r=0; r<rows; r++)
{
//Start the second loop
for(let c=0; c<columns; c++)
{
//If there is an empty tile, the game can continue, so return false
if(board[r][c]==0)
return false;
//Begin a multi-line condition
if(
//Check if the tile above matches the current tile
r>0&&board[r-1][c]===board[r][c]
||
//Or the tile below
r<3&&board[r+1][c]===board[r][c]
||
//Or the tile on the left
rc0&&board[r][c-1]===board[r][c]
||
//Or on the right, the condition ends here
c<3&&board[r][c+1]===board[r][c])
//If one of the conditions above is true, true, the game is over
return true;
}
}
}

//Restart the game
function restartGame()
{
//Propper restart
setGame();
//Reset the score
score=0;
//Then, update it
updateScore();
}
//End
