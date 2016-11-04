//620070667

var gameOn = false;
var puzzlePiece;
var yVal = 0;
var xVal = 0;


//Main method of code so to speak, this function sets up and controls the flow of the code
window.onload = function(){
    var puzzleArea = document.getElementById("puzzlearea");
    puzzlePiece = puzzleArea.getElementsByTagName("div");
    var shuffleButton = document.getElementById("shufflebutton");
    shuffleButton.onclick = shuffle;
    setup(changePik());
    victory();
}

//This function organizes the tiles and sets element behaviors
function setup(imgFile){
    
    for (var i = 0; i < puzzlePiece.length; i++){
        puzzlePiece[i].className = "puzzlepiece";
        puzzlePiece[i].style.top = yVal + "px";
        puzzlePiece[i].style.left = xVal + "px";
        puzzlePiece[i].style.backgroundImage =  "url('./" + imgFile + "')";
        xVal = xVal + 100;
        if(xVal > 300){
            yVal = yVal + 100;
            xVal = 0;
        }
        puzzlePiece[i].style.backgroundPosition = "-" + puzzlePiece[i].style.left + " " + "-" + puzzlePiece[i].style.top;
        puzzlePiece[i].onmouseover = function(){
            if(validMove(this.style.left, this.style.top)){
                this.classList.add("movablepiece");
                this.style.cursor = "pointer";
            }
        }
        puzzlePiece[i].onmouseout = function(){
            this.classList.remove("movablepiece");
            this.style.cursor = "context-menu";
        }
        puzzlePiece[i].onmousedown = function(){
            if(validMove(this.style.left, this.style.top)){
                var aArray = move(this.style.left, this.style.top);
                this.style.left = aArray[0];
                this.style.top = aArray[1];
                victory();
            }
        }
    }
    yVal = 300;
    xVal = 300;
}

//This function randomly changes puzzle background picture
function changePik(){
    var pictureArray = ["pik1.png","pik2.png","pik3.jpg","pik4.png","pik5.jpg"];
    var randomNat1 = Math.floor(Math.random() * pictureArray.length);
    return pictureArray[randomNat1];
}

//This function checks if is possible for a tile is able to move
function validMove(xx, yy){
    var valid = false;
    var x = parseInt(xx);
    var y = parseInt(yy);
    if(x + 100 === xVal  && y === yVal){
        valid = true;   
    }
    else if(x - 100 === xVal && y === yVal){
        valid = true;
    }
    else if(y + 100 === yVal && x === xVal){
        valid = true;
    }
    else if (y - 100 === yVal && x === xVal){
        valid = true;
    }
    else {
        valid = false;
    }
    return valid;
}

//This function fascilitates the movement of the tiles
function move(xx, yy){
    var temp = xx;
    xx = xVal + "px";
    xVal = parseInt(temp);
    temp = yy;
    yy = yVal +"px";
    yVal = parseInt(temp);
    return [xx, yy];
}

//This function shuffles the tiles
function shuffle(){
    
    var i, j;
    var bArray = [];
    for(var i = 0; i < 100; i++){
        for(j = 0; j < puzzlePiece.length; j++){
            if(validMove(puzzlePiece[j].style.left, puzzlePiece[j].style.top)){
                bArray.push([puzzlePiece[j],j]);                
            }
        }
        if(bArray.length != 0){
            var randomNat2 = Math.floor(Math.random() * bArray.length);
            var aArray = move(bArray[randomNat2][0].style.left, bArray[randomNat2][0].style.top);
            bArray[randomNat2][0].style.left = aArray[0];
            bArray[randomNat2][0].style.top = aArray[1];
        }
        else{
            i--;
        }
        bArray = [];
    }
    gameOn = true;
}

//This function checks if the game has been won, that is puzzle pieces are in the correct order
function victory(){
    
    if(gameOn && 
        puzzlePiece[0].style.left === "0px" && puzzlePiece[0].style.top === "0px" &&
        puzzlePiece[1].style.left === "100px" && puzzlePiece[1].style.top === "0px" &&
        puzzlePiece[2].style.left === "200px" && puzzlePiece[2].style.top === "0px" &&
        puzzlePiece[3].style.left === "300px" && puzzlePiece[3].style.top === "0px" &&
        puzzlePiece[4].style.left === "0px" && puzzlePiece[4].style.top === "100px" &&
        puzzlePiece[5].style.left === "100px" && puzzlePiece[5].style.top === "100px" &&
        puzzlePiece[6].style.left === "200px" && puzzlePiece[6].style.top === "100px" &&
        puzzlePiece[7].style.left === "300px" && puzzlePiece[7].style.top === "100px" &&
        puzzlePiece[8].style.left === "0px" && puzzlePiece[8].style.top === "200px" &&
        puzzlePiece[9].style.left === "100px" && puzzlePiece[9].style.top === "200px" &&
        puzzlePiece[10].style.left === "200px" && puzzlePiece[10].style.top === "200px" &&
        puzzlePiece[11].style.left === "300px" && puzzlePiece[11].style.top === "200px" &&
        puzzlePiece[12].style.left === "0px" && puzzlePiece[12].style.top === "300px" &&
        puzzlePiece[13].style.left === "100px" && puzzlePiece[13].style.top === "300px" &&
        puzzlePiece[14].style.left === "200px" && puzzlePiece[14].style.top === "300px" 
      ){
        alert("Congratulations!!! You won!!!");
        gameOn = false;
    }
}
