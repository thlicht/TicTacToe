var $ = function(id)
{
    return document.getElementById(id);
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min)) + min;
}

var winner = false;

function checkColumns(column)
{
    var b = $("board");
    
    if(b.rows[0].cells[column].hasAttribute("class", "applyX") && b.rows[1].cells[column].hasAttribute("class", "applyX") && b.rows[2].cells[column].hasAttribute("class", "applyX"))
    {
        return true;
    }
    else if (b.rows[0].cells[column].hasAttribute("class", "applyO") && b.rows[1].cells[column].hasAttribute("class", "applyO") && b.rows[2].cells[column].hasAttribute("class", "applyO"))
    {
        return true;
    }
    else{
        return false;
    }
}

function checkRows(row)
{
    var b = $("board");
    if(b.rows[row].cells[0].hasAttribute("class", "applyX") && b.rows[row].cells[1].hasAttribute("class", "applyX") && b.rows[row].cells[2].hasAttribute("class", "applyX"))
    {
        return true;
    }
    else if (b.rows[row].cells[0].hasAttribute("class", "applyO") && b.rows[row].cells[1].hasAttribute("class", "applyO") && b.rows[row].cells[2].hasAttribute("class", "applyO"))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function checkDiagonal(row,column)
{
    var b = $("board");
    if(b.rows[0].cells[0].hasAttribute("class", "applyX") && b.rows[1].cells[1].hasAttribute("class", "applyX") && b.rows[2].cells[2].hasAttribute("class", "applyX"))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function checkForWin(square)
{
    if(checkColumns(square.cellIndex)||checkRows(square.parentNode.rowIndex))
    {
        alert("Win");
        winner = true;
    }
}

function setupforX()
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

function setO ()
{
    var b = $("board");
    for (var r=0; r < b.rows.length ;r++)
    {
        for(var c=0; c < b.rows[r].cells.length; c++)
        {
            b.rows[r].cells[c].onclick = function () 
            {
                var ro = c;
                var co = c;
                change(this);
                checkForWin(this);
            }
        }
    }
}


window.onload = function() 
{
    clearGame;
    turnCount = 0;
    $("Select_X").checked = false;
    $("Select_O").checked = false;
    $("Computer").checked = false;
    $("Human").checked = false;
    var b = $("board");

    

    $("Switch").onclick = switchPiece;
    $("Clear").onclick = clearGame;
}


function switchPiece()
{
    var b = $("board");
    var x = $("Select_X");
    var y = $("Select_O");

    if(x.checked)
    {
        x.checked = false;
        y.checked = true;
    }
    else
    {
        y.checked = false;
        x.checked = true;
    }

    for (var r=0; r < b.rows.length ;r++)
    {
        for(var c=0; c < b.rows[r].cells.length; c++)
        {
            b.rows[r].cells[c].onclick = function () {change(this);}
        }
    }
   
}

function playComputer()
{
    var b = $("board");
    var num = getRandomInt(1,9);
    var count=0;
    for (var r=0; r < b.rows.length ;r++)
    {
        for(var c=0; c < b.rows[r].cells.length; c++)
        {
            if(!b.rows[r].cells[c].hasAttribute("class"))
            {
                if(num >count)
                {
                    count++;
                }
                else
                {
                    if(winner)
                    {
                        b.rows[r].cells[c].removeEventListener("click",playComputer);
                        return;
                    }
                    else{
                        b.rows[r].cells[c].setAttribute("class", "applyO");
                        $("Select_O").checked = false;
                        $("Select_X").checked = true;
                        checkForWin(b.rows[r].cells[c]);
                        return;
                    }
                }
                
            }
            else
            {
                count++;
            }    
        }
    }
}

function setupComputer()
{
    var computer = $("Computer");
    $("Select_X").click();
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

function clearGame()
{
    var b = $("board");
    $("Select_X").checked = false;
    $("Select_O").checked = false;
    $("Select_X").disabled = false;
    $("Select_O").disabled = false;

    for (var r=0; r < b.rows.length ;r++)
    {
        for(var c=0; c < b.rows[r].cells.length; c++)
        {
            b.rows[r].cells[c].removeAttribute("class")
        }
    }
}

function checkSelector()
{
    var x = $("Select_X");
    var y = $("Select_O");
    var p1 = $("Computer");
    var p2 = $("Human");

    if(x.checked)
    {
        y.disabled = true;
        return "x";
    }
    else if (y.checked)
    {
        x.disabled = true;
        return "o";
    }

    if(p1.checked)
    {
        computerPiece = "o";
        Player1Piece = "x";
    }
    else if (p2.checked)
    {
        Player1Piece = "x";
        Player2Piece = "o";
    }
}

function change(tableCell)
{
    var selected = checkSelector();
    if(winner)
    {
        return;
    }
    else{
        if(selected == "x")
        {
            if(tableCell.hasAttribute("class"))
            {
                return;
            }
            else{
                tableCell.setAttribute("class", "applyX");
            }
            $("Select_X").checked = false;
            $("Select_O").checked = true;
        }
        else if (selected == "o")
        {
            if(tableCell.hasAttribute("class"))
            {
                return;
            }
            else{
                tableCell.setAttribute("class", "applyO");
            }
            $("Select_O").checked = false;
            $("Select_X").checked = true;
        }
    
    }
    
    
}

