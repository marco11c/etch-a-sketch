const container = document.querySelector('.grid-container');
const clearBtn = document.querySelector('.clear-grid-btn');
let gridSize = 0;
clearBtn.addEventListener('click', clearGrid);
makeGrid(50);
let cells = document.getElementsByClassName('cell');
addListenersToCells();
function makeGrid(dimensions){
    for (r=0;r<dimensions;r++){
        let row = document.createElement('div');
        row.classList.add('row');
        for (i=0;i<dimensions;i++){
            let cell = document.createElement('div');
            cell.textContent = '';
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        container.appendChild(row)

    }
}

function addListenersToCells(){
    for (i=0;i<cells.length;i++){
        // e.target vs this ?
        cells[i].addEventListener('mouseover', function(e){e.target.style.backgroundColor = 'black';});
    }
}

function clearGrid() {
    for(i=0; i<cells.length; i++){
        cells[i].style.backgroundColor = 'white';
    }
    // add code to prevent user from inputting strings/empty/0. set default to 64x64
    gridSize = parseInt(prompt("Enter sketchpad dimensions"));
    container.innerHTML = '';
    makeGrid(gridSize);
    addListenersToCells();
   
}
