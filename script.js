let defaultColor = '#000000';
const defaultSelectorColor = '#333333';
const activeSelectorColor = '#4c90ff';
let defaultSize = 64;
let eraserActive = false;
let penActive = true;
const colorPicker = document.querySelector('.color-picker');
const penSelector = document.querySelector('.pen-selector');
const eraserSelector = document.querySelector('.eraser-selector');
const resizeSlider = document.querySelector('.resize-slider');
const container = document.querySelector('.grid-container');
const clearBtn = document.querySelector('.clear-grid-btn');
const sliderValueDisplay = document.querySelector('.resize-slider-value-display');
const xMouseLabel = document.querySelector('.mouse-x-display-value');
const yMouseLabel = document.querySelector('.mouse-y-display-value');
colorPicker.addEventListener('change', () => {document.querySelector('.color-display-value').innerHTML = colorPicker.value});
resizeSlider.addEventListener('change', () => {sliderValueDisplay.innerHTML = `${resizeSlider.value}x${resizeSlider.value} Grid`});
document.querySelector('.color-display-value').innerHTML = colorPicker.value;
sliderValueDisplay.innerHTML = `${resizeSlider.value}x${resizeSlider.value} Grid`;
updateSelectors();
let gridSize = 0;
let mousePressed = false;
let activeColor = document.querySelector('.color-picker').value;
document.querySelector('.color-picker').onchange = function() {activeColor = document.querySelector('.color-picker').value};
resizeSlider.onchange = function() {makeGrid(resizeSlider.value)}
clearBtn.addEventListener('click', clearGrid);
eraserSelector.addEventListener('click', function(){eraserActive=true; penActive=false; updateSelectors();})
penSelector.addEventListener('click', function(){penActive=true; eraserActive=false; updateSelectors();})
let rowsArray = [];
let gridItems = [];
makeGrid(defaultSize);
let cells = document.getElementsByClassName('cell');
document.body.addEventListener('mouseup', function(){mousePressed = !mousePressed});
document.body.addEventListener('mousedown', function(){mousePressed = !mousePressed});

function makeGrid(dimensions){
    if(container.hasChildNodes){container.innerHTML = ''};
    if(rowsArray.length != 0){rowsArray = []};
    if(gridItems.length != 0){gridItems = []};
    for (r=0;r<dimensions;r++){
        let row = document.createElement('div');
        row.classList.add('row');
        //logs the row number - Y POSITION
        row.addEventListener('mouseover', function(e){yMouseLabel.innerHTML = `MouseY: ${rowsArray.indexOf(e.target.closest('.row'))+1}`});
        rowsArray[r] = row;
        gridItems[r] = [];
        for (i=0;i<dimensions;i++){
            let cell = document.createElement('div');
            cell.textContent = '';
            cell.classList.add('cell');
            cell.addEventListener('click', function (e){penActive ? e.target.style.backgroundColor = activeColor : e.target.style.backgroundColor = 'white'});
            cell.addEventListener('mousedown', function (e){penActive ? e.target.style.backgroundColor = activeColor : e.target.style.backgroundColor = 'white'});
            cell.addEventListener('mouseover', function(e){if (mousePressed){penActive ? e.target.style.backgroundColor = activeColor : e.target.style.backgroundColor = 'white';}})
            cell.addEventListener('mouseover', function(e){xMouseLabel.innerHTML = `MouseX: ${gridItems[rowsArray.indexOf(e.target.closest('.row'))].indexOf(e.target)+1}`})
            row.appendChild(cell);
            gridItems[r].push(cell);

        }
        container.appendChild(row)
    }
    
}

function updateSelectors(){
    penActive ? penSelector.style.backgroundColor = activeSelectorColor : penSelector.style.backgroundColor = defaultSelectorColor;
    eraserActive ? eraserSelector.style.backgroundColor = activeSelectorColor : eraserSelector.style.backgroundColor = defaultSelectorColor;
}
function findMouseCoordinates(hoveredElement){
    
}
function clearGrid() {
    for(i=0; i<cells.length; i++){
        cells[i].style.backgroundColor = 'white';
    }
}
