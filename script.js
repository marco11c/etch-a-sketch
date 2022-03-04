const container = document.querySelector('.grid-container');
const clearBtn = document.querySelector('.clear-grid-btn');
clearBtn.addEventListener('click', clearGrid);
makeGrid(120);
let allCells = document.getElementsByClassName('cell');
cells = Array.from(allCells);
for (i=0;i<cells.length;i++){
    // e.target vs this ?
    cells[i].addEventListener('mouseover', function(e){e.target.style.backgroundColor = 'black'});
}

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

function clearGrid() {
    for(i=0; i<cells.length; i++){
        cells[i].style.backgroundColor = 'white';
    }
}
