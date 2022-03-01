const container = document.querySelector('.grid-container');
makeGrid(80);
let cells = document.getElementsByClassName('cell');
cells = Array.from(cells);

for (i=0;i<cells.length;i++){
    // e.target vs this ?
    cells[i].addEventListener('mouseover', function(){this.style.backgroundColor = 'black'});
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

function draw(color){

}
