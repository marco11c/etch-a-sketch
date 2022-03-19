let defaultColor = '#000000';
const defaultSelectorColor = '#333333';
const activeSelectorColor = '#4c90ff';
let defaultSize = 48;
let randomColor;
let eraserActive = false;
let penActive = true;
const colorPicker = document.querySelector('.color-picker');
const penSelector = document.querySelector('.pen-selector');
const eraserSelector = document.querySelector('.eraser-selector');
const resizeSlider = document.querySelector('.resize-slider');
const container = document.querySelector('.grid-container');
const clearBtn = document.querySelector('.clear-grid-btn');
const colorValueLabel = document.querySelector('.color-display-value');
const sliderValueDisplay = document.querySelector('.resize-slider-value-display');
const xMouseLabel = document.querySelector('.mouse-x-display-value');
const yMouseLabel = document.querySelector('.mouse-y-display-value');
const xLabel = document.querySelector('.x-label');
const yLabel = document.querySelector('.y-label');
const recentColorsPallete = document.querySelector('.recent-colors-pallete');
const gridOption = document.querySelector('#toggle-grid');
const rainbowPenOption = document.querySelector('#toggle-rainbow-pen');
const canvasGridLabel = document.querySelector('.canvas-grid-label');
colorPicker.addEventListener('change', () => {colorValueLabel.innerHTML = colorPicker.value; updateRecentColors();});
resizeSlider.addEventListener('change', () => {sliderValueDisplay.innerHTML = `${resizeSlider.value}x${resizeSlider.value} Grid`; canvasGridLabel.textContent = `Grid: ${resizeSlider.value}x${resizeSlider.value}`;});
document.querySelector('.color-display-value').innerHTML = colorPicker.value;
sliderValueDisplay.innerHTML = `${resizeSlider.value}x${resizeSlider.value} Grid`;
updateSelectors();
let gridSize = 0;
let mousePressed = false;
let activeColor = document.querySelector('.color-picker').value;
colorPicker.addEventListener('change',function() {activeColor = document.querySelector('.color-picker').value})
resizeSlider.onchange = function() {makeGrid(resizeSlider.value)}
clearBtn.addEventListener('click', clearGrid);
eraserSelector.addEventListener('click', function(){eraserActive=true; penActive=false; updateSelectors();})
penSelector.addEventListener('click', function(){penActive=true; eraserActive=false; updateSelectors();})
let rowsArray = [];
let gridItems = [];
let recentColors = [];
makeGrid(defaultSize);
canvasGridLabel.textContent = `Grid: ${resizeSlider.value}x${resizeSlider.value}`;
let cells = document.getElementsByClassName('cell');
document.body.addEventListener('mouseup', function(){mousePressed = !mousePressed});
document.body.addEventListener('mousedown', function(){mousePressed = !mousePressed});
gridOption.addEventListener('change', () => {gridOption.checked ? toggleGrid('1px solid rgb(210,210,210)') : toggleGrid('none');})

function makeGrid(dimensions){
    if(container.hasChildNodes){container.innerHTML = ''};
    if(rowsArray.length != 0){rowsArray = []};
    if(gridItems.length != 0){gridItems = []};
    for (r=0;r<dimensions;r++){
        let row = document.createElement('div');
        row.classList.add('row');
        //logs the row number - Y POSITION
        row.addEventListener('mouseover', function(e){yMouseLabel.innerHTML = `MouseY: ${rowsArray.indexOf(e.target.closest('.row'))+1}`; yLabel.textContent = `Y: ${rowsArray.indexOf(e.target.closest('.row'))+1}`});
        rowsArray[r] = row;
        gridItems[r] = [];
        for (i=0;i<dimensions;i++){
            let cell = document.createElement('div');
            cell.textContent = '';
            cell.classList.add('cell');
            // cell.addEventListener('click', function (e){penActive ? e.target.style.backgroundColor = colorPicker.value : e.target.style.backgroundColor = 'white'});
            // cell.addEventListener('mousedown', function (e){penActive ? e.target.style.backgroundColor = colorPicker.value : e.target.style.backgroundColor = 'white'});
            // cell.addEventListener('mouseover', function(e){if (mousePressed){penActive ? e.target.style.backgroundColor = colorPicker.value : e.target.style.backgroundColor = 'white';}})
            cell.addEventListener('click', draw);
            cell.addEventListener('mousedown', draw);
            cell.addEventListener('mouseover', (e)=>{if (mousePressed){
                    draw(e);
                }
            });
            cell.addEventListener('mouseover', function(e){xMouseLabel.innerHTML = `MouseX: ${gridItems[rowsArray.indexOf(e.target.closest('.row'))].indexOf(e.target)+1}`; xLabel.textContent = `X: ${gridItems[rowsArray.indexOf(e.target.closest('.row'))].indexOf(e.target)+1}`; })
            if (gridOption.checked){
                cell.style.borderTop = '1px solid rgb(210,210,210)';
                cell.style.borderLeft = '1px solid rgb(210,210,210)';
            }
            row.appendChild(cell);
            gridItems[r].push(cell);

        }
        container.appendChild(row)
    }
}
function updateRecentColors(){
    let tile = document.createElement('div');
    tile.textContent = '';
    tile.style.backgroundColor = colorPicker.value;
    tile.classList.add('color-tiles');
    tile.addEventListener('click', function(e){colorPicker.value = convertToHex(e.target.style.backgroundColor); useTileColor(e);} )
    tile.title = `HEX: ${convertToHex(tile.style.backgroundColor)}\nRGB: ${tile.style.backgroundColor}`;
    recentColorsPallete.insertBefore(tile, recentColorsPallete.firstChild)
    if (recentColors.length>=42){recentColorsPallete.removeChild(recentColorsPallete.lastChild); recentColors.shift()}
    recentColors.push(tile);
}
// switchValue is either 'none' OR '1px solid black' in string type
function toggleGrid(switchValue){
    for (i=0; i<cells.length; i++){
        cells[i].style.borderTop = switchValue;
        cells[i].style.borderLeft = switchValue;
    }
}
function drawInRainbow(e){
    let r = Math.floor(Math.random()*255)+1;
    let g = Math.floor(Math.random()*255)+1;
    let b = Math.floor(Math.random()*255)+1;
    randomColor = `rgb(${r},${g},${b})`;
    e.target.style.backgroundColor = randomColor;
}

function draw(e){
    //chekck what tool is active(true) - pen, eraser, rainbowPen?
    switch(true){
        case (rainbowPenOption.checked&&penActive):
            drawInRainbow(e);
        break;
        case penActive:
            e.target.style.backgroundColor = colorPicker.value;
            break;
        case eraserActive:
            e.target.style.backgroundColor = 'white';
            break;
    }
}
function convertToHex(str){
    var raw = str.match(/(\d+)/g);
    var hexr = parseInt(raw[0]).toString(16);
    var hexg = parseInt(raw[1]).toString(16);
    var hexb = parseInt(raw[2]).toString(16);
        hexr = hexr.length == 1 ? '0' + hexr: hexr;
        hexg = hexg.length == 1 ? '0' + hexg: hexg;
        hexb = hexb.length == 1 ? '0' + hexb: hexb;
    var hex = '#' + hexr + hexg + hexb;
    return hex;
  }
function updateSelectors(){
    penActive ? penSelector.style.backgroundColor = activeSelectorColor : penSelector.style.backgroundColor = defaultSelectorColor;
    eraserActive ? eraserSelector.style.backgroundColor = activeSelectorColor : eraserSelector.style.backgroundColor = defaultSelectorColor;
}
function useTileColor(targetTile){
    colorPicker.value = convertToHex(targetTile.target.style.backgroundColor);
    colorValueLabel.innerHTML = convertToHex(targetTile.target.style.backgroundColor);
    activeColor = targetTile.target.style.backgroundColor;
}
function clearGrid() {
    for(i=0; i<cells.length; i++){
        cells[i].style.backgroundColor = 'white';
    }
}