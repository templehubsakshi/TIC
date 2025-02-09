let x = true; //turn X
let c = 0; 

const grids = document.querySelectorAll('.grid');
const turn = document.querySelector('.turn');
const aud1 = document.getElementById('click1');
const aud2 = document.getElementById('click2');
const win = document.getElementById('win');
const fail = document.getElementById('fail');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.height = 500;
canvas.width = 1000;

ctx.font = '70px arial';
ctx.strokeStyle = 'white';
ctx.strokeText('TIC TAC TOE',420,80);

// timer for player 1
function startTimer1(duration, display) {
    let timer = duration, seconds;
    timerInterval = setInterval(() => { 
        if (x){
            seconds = parseInt(timer % 60, 10);
            if (seconds>9){
                display.textContent = `00:${seconds}`;

            }
            else{
                display.textContent = `00:0${seconds}`;
            }

        }
        else{
            timer+=1;
        }
        if (--timer < 0) {
            fail.play();
            clearInterval(timerInterval);
            timer = 0;
            alert("Time UP!");
            location.reload(true);
        }
    }, 1000);
}

// timer for player 2
function startTimer2(duration, display) {
    let timer = duration, seconds;
    timerInterval = setInterval(() => { 
        if (x==false){
            seconds = parseInt(timer % 60, 10);
            if (seconds>9){
                display.textContent = `00:${seconds}`;

            }
            else{
                display.textContent = `00:0${seconds}`;
            }

        }
        else{
            timer+=1;
        }
        if (--timer < 0) {
            fail.play();
            clearInterval(timerInterval);
            timer = 0;
            alert("Time UP!");
            location.reload(true);
        }
    }, 1000);
}



document.addEventListener('DOMContentLoaded', () => {
    const display1 = document.querySelector('.timer1');
    startTimer1(30, display1);
    const display2 = document.querySelector('.timer2');
    startTimer2(30, display2);

})





grids.forEach(grid => {
    grid.addEventListener('click', () => {
        if (x) aud1.play()
        else aud2.play();
        if (grid.innerHTML != 'O' && grid.innerHTML != 'X') { // inserting X,O in the grid
            if (x) {
                grid.textContent = 'X';
                x = false;
                c++;
            }
            else {
                grid.textContent = 'O';
                x = true;
                c++;
            }
        }
        if (x) turn.textContent = 'TURN : X';
        else turn.textContent = 'TURN : O';

        function over(n){ // game end
            win.play();
            setTimeout(() => {
                alert(grids[n].innerHTML+' wins!');
                location.reload();
            }, 500);
        }
        
        // checking for win conditions
        if (grids[4].innerHTML == grids[0].innerHTML && grids[4].innerHTML!='' && grids[4].innerHTML == grids[8].innerHTML){
            over(4);
        }
        else if (grids[4].innerHTML == grids[2].innerHTML && grids[4].innerHTML!='' && grids[4].innerHTML == grids[6].innerHTML){
            over(4);
            
        }
        else if (grids[4].innerHTML == grids[3].innerHTML && grids[4].innerHTML!='' && grids[4].innerHTML == grids[5].innerHTML){
            over(4);
            
        }
        else if (grids[4].innerHTML == grids[1].innerHTML && grids[4].innerHTML!='' && grids[4].innerHTML == grids[7].innerHTML){
            over(4);
            
        }
        else if (grids[0].innerHTML == grids[1].innerHTML && grids[0].innerHTML!='' && grids[0].innerHTML == grids[2].innerHTML){
            over(0);
            
        }
        else if (grids[0].innerHTML == grids[3].innerHTML && grids[0].innerHTML!='' && grids[0].innerHTML == grids[6].innerHTML){
            over(0);
            
        }
        else if (grids[8].innerHTML == grids[7].innerHTML && grids[8].innerHTML!='' && grids[6].innerHTML == grids[8].innerHTML){
            over(8);
          
        }
        else if (grids[8].innerHTML == grids[5].innerHTML && grids[8].innerHTML!='' && grids[2].innerHTML == grids[8].innerHTML){
            over(8);
           
        }
        // checking fro draw condition
        else if (c==9){
            fail.play();
            setTimeout(() => {
                alert('Draw!');
            location.reload();
            }, 500);
            
        }
    
    })
});
