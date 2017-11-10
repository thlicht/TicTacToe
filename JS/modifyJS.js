var $ = function(id)
{
    return document.getElementById(id);
}
//get a random integer to use to determine a random cell for the computer to place a piece in
function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1)) + min; //inclusive of both floor and celing values
}

var winner = false;
//check the column the most current piece was placed on, for a win
function checkColumns(column)
{
    var b = $("board");
    
    if(b.rows[0].cells[column].className == "applyX" && b.rows[1].cells[column].className == "applyX" && b.rows[2].cells[column].className == "applyX")
    {
        return true;
    }
    else if (b.rows[0].cells[column].className == "applyO" && b.rows[1].cells[column].className == "applyO" && b.rows[2].cells[column].className == "applyO")
    {
        return true;
    }
    else
    {
        return false;
    }
}

//check the row the most current piece was placed on, for a win
function checkRows(row)
{
    var b = $("board");
    if(b.rows[row].cells[0].className == "applyX" && b.rows[row].cells[1].className == "applyX" && b.rows[row].cells[2].className == "applyX")
    {
        return true;
    }
    else if (b.rows[row].cells[0].className == "applyO" && b.rows[row].cells[1].className == "applyO" && b.rows[row].cells[2].className == "applyO")
    {
        return true;
    }
    else
    {
        return false;
    }
}

//check the diagonals for a win
function checkDiagonal()
{
    var b = $("board");
    if(b.rows[0].cells[0].className == "applyX" && b.rows[1].cells[1].className == "applyX" && b.rows[2].cells[2].className == "applyX")
    {
        return true;
    }
    else if (b.rows[0].cells[0].className == "applyX" && b.rows[1].cells[1].className == "applyX" && b.rows[2].cells[2].className == "applyX")
    {
        return true;
    }
    else if(b.rows[0].cells[0].className == "applyO" && b.rows[1].cells[1].className == "applyO" && b.rows[2].cells[2].className == "applyO")
    {
        return true;
    }
    else if (b.rows[0].cells[2].className == "applyO" && b.rows[1].cells[1].className == "applyO" && b.rows[2].cells[0].className == "applyO")
    {
        return true;
    }
    else
    {
        return false;
    }
}

//check if placed piece has triggered a win condition
var turnNums;
function checkForWin(square)
{
    turnNums;
    if(checkColumns(square.cellIndex)||checkRows(square.parentNode.rowIndex) || checkDiagonal())
    {
        alert("Win");
        winner = true;
        clearInterval(interval);
        var b = $("board");
        for(var i = 0; i < b.rows.length; i++)
        {
            for (var k = 0; k < b.rows[i].cells.length; k++)
            {
                b.rows[i].cells[k].removeEventListener("click", playComputer);
            }
        }
    }

    if(turnNums == 9)
    {
        alert("Cats Game");
    }
}

//setup the board for clicks to place the to-be-played piece
function setupforPlayer()
{
    var b = $("board");
    for (var r=0; r < b.rows.length ;r++)
    {
        for(var c=0; c < b.rows[r].cells.length; c++)
        {
            b.rows[r].cells[c].onclick = function () 
            {
                change(this);
                checkForWin(this);
            }
        }
    }
}

//run inital setup on window load
window.onload = function() 
{
    clearGame();
    turnCount = 0;
    $("Computer").checked = false;
    $("Human").checked = false;
    var b = $("board");
    
}
var currentPiece = "-";
var interval;
function startGame()
{
    clock();
    interval = setInterval(clock, 1000);
    var turn = getRandomInt(0,1);
    if($("Human").checked)
    {
        setupTwoPlayer();
        $("Turn").innerHTML = "Current Player Piece: " + currentPiece;
    }
    else if ($("Computer").checked)
    {
        currentPiece = "X";
        setupforPlayer();
        setupComputer();
        if(turn)
        {
            playComputer();
        }
        $("Turn").innerHTML = "Player Piece: X";
    }

}

var minutes = 0;
var hours = 0;
var seconds = 0;
var repeater;
function clock()
{
    var clock = $("clock");
    if(seconds == 60)
    {
        seconds = 0;
        minutes++;
    }

    if(minutes == 60)
    {
        minutes = 0;
        hours++;
    }

    if(seconds <= 9)
    {
        if(minutes <= 9)
        {
            if(hours <= 9)
            {
                clock.innerHTML = "0" + hours + ":0" + minutes + ":0"  + seconds++;
            }
            else
            {
                clock.innerHTML = hours + ":0" + minutes + ":0"  + seconds++;
            }
        }
        else
        {
            clock.innerHTML = hours + ":" + minutes + ":0"  + seconds++;
        }

    }
    else
    {
        if(minutes <= 9)
        {
            if(hours <= 9)
            {
                clock.innerHTML = "0" + hours + ":0" + minutes + ":"  + seconds++;
            }
            else
            {
                clock.innerHTML = hours + ":0" + minutes + ":"  + seconds++;
            }
        }
        else
        {
            clock.innerHTML = hours + ":" + minutes + ":"  + seconds++;
        }
    }
    
}

//what the computer will do when it is its turns to play
function playComputer()
{
    var b = $("board");
    var rRow = getRandomInt(0,2);
    var rCol = getRandomInt(0,2);

    while(true)
    {
        if(!b.rows[rRow].cells[rCol].hasAttribute("class"))
        {
            b.rows[rRow].cells[rCol].setAttribute("class", "applyO");
            b.rows[rRow].cells[rCol].removeEventListener("click", playComputer);
            checkForWin(b.rows[rRow].cells[rCol]);
            $("Turn").innerHTML = "Player Piece: X";
            currentPiece = "X";
            return;
        }
        else
        {
            rRow = getRandomInt(0,2);
            rCol = getRandomInt(0,2);
        }
    }
    
}

function setupTwoPlayer()
{
    var selector = getRandomInt(0,1);

    if(selector)
    {
        currentPiece = "X";
        setupforPlayer();
    }
    else
    {
        currentPiece = "O";
        setupforPlayer();
    }
}
//setup the game to play against the computer
function setupComputer()
{
    var computer = $("Computer");
    if(computer.checked)
    {
        var b = $("board");
        for (var r=0; r < b.rows.length ;r++)
        {
            for(var c=0; c < b.rows[r].cells.length; c++)
            {
               b.rows[r].cells[c].addEventListener("click", playComputer);
            }
        }
    }
}
//clear the gameboard
function clearGame() 
{
    var b = $("board");
    $("Computer").checked = false;
    $("Human").checked = false;

    for (var r=0; r < b.rows.length ;r++)
    {
        for(var c=0; c < b.rows[r].cells.length; c++)
        {
            b.rows[r].cells[c].removeAttribute("class")
        }
    }
    clearInterval(interval);
}

//check which radio buttons are currently selected, and swap if needed

function checkPiece()
{

    if(currentPiece == "X")
    {
        return "x";
    }
    else if (currentPiece == "O")
    {
        return "o";
    }

}

//change the class attribute of the input tableCell to the display the proper piece
function change(tableCell)
{
    var selected = checkPiece();
    if(winner)
    {
        return;
    }
    else{
        if(selected == "x")
        {
            if(tableCell.hasAttribute("class"))
            {
                tableCell.removeEventListener("click", playComputer);
                return;
            }
            else{
                tableCell.setAttribute("class", "applyX");
            }
            currentPiece = "O";
            $("Turn").innerHTML = "Current Player Piece: O";
        }
        else if (selected == "o")
        {
            if(tableCell.hasAttribute("class"))
            {
                tableCell.removeEventListener("click",playComputer);
                return;
            }
            else{
                tableCell.setAttribute("class", "applyO");
            }
            currentPiece = "X";
            $("Turn").innerHTML = "Current Player Piece: X";
        }
    
    }
    
    
}

