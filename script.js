let rows = 4;
let rowLen = 20;

// instantiate button variables
const addRow = document.getElementById("add-row");
const table = document.getElementById("table");
const nuke = document.getElementById("nuke");
const clear = document.getElementById("clear");

// flag for mouseover listener
let isDrawing = false;

// event listeners for buttons
addRow.addEventListener('click', () => {makeRow(rowLen)});
nuke.addEventListener('click', paintAll);
table.addEventListener('mousedown', colorize);
table.addEventListener('mouseover', function(event){
    // checks for isDrawing flag before running method on mouseover
    if(isDrawing){
        colorize(event);
    }
});
table.addEventListener('mouseup', function(){
    // set flag back to false on mouse up to stop painting
    isDrawing = false
})
clear.addEventListener('click', clearBoard);

// action methods for event listeners
function makeRow(len){ // adds a tr to the table
    // create a tr element
    const tr = document.createElement('tr');

    // create td elements len times
    for(let i = 0; i < len; i++){
        let td = document.createElement('td');
        tr.appendChild(td);
    }
    // append tr to table
    table.appendChild(tr);
    rows++;
}

// adds the clear class to all td elements
function clearBoard(){ 
    // select all td elements
    const allTd = Array.from(document.getElementsByTagName('td'));

    // map through and add clear class to all elements
    allTd.map(td => {td.className = "clear"});
}

// adds selected color class to all td elements
function paintAll(){
    // select user's chosen color
    let color = document.getElementsByTagName('select')[0].value;

    // select all td elements
    const allTd = Array.from(document.getElementsByTagName('td'));

    // map array and add color class to all elements
    allTd.map(td => {td.className = color}); // this works. is it performant?
}

// colorize function: adds color classes
function colorize(event){
    // set isDrawing flag to true to enable drag painting
    isDrawing = true;

    // select user's chosen color
    let color = document.getElementsByTagName('select')[0].value;

    // if the target is of the appropriate element
    if(event.target.tagName == "TD"){
        // change the target's className to the selected color
        event.target.className = color;
    }
}

// generates board num1 x num2
function renderGrid(num1, num2){
    // number of rows = num1 times (outter loop)
    for(let i = 0; i < num1; i++){
        // create a tr element
        const tr = document.createElement('tr');

        // inner loop, length of each row
        for(let j = 0; j < num2; j++){
            // create a td element
            const td = document.createElement('td');
            // append 'td' element to 'tr' parent
            tr.appendChild(td);
        }
        // append tr to table
        table.appendChild(tr);
    }
}

// render default grid
renderGrid(rows, rowLen);

// Add/Remove Columns
// create div for "+/-" column buttons
const addColumnDiv = document.createElement('div');
// create '+' button
const addColumnButton = document.createElement('button');
addColumnButton.textContent = '+';
addColumnButton.onclick = () => {addColumn()};
// create '-' button
const removeColumnButton = document.createElement('button');
removeColumnButton.textContent = '-';
removeColumnButton.onclick =() => {removeColumn()};

function addColumn(){
    // add a td to every tr
    // collect all tr
    let allTr = Array.from(document.getElementsByTagName('tr'));
    // iterate through
    allTr.map(tr => {
        tr.insertCell(0);
    });
    rowLen++;
}

function removeColumn(){

    if(rowLen > 1){
      // remove the last td from every tr
      // collect all tr
      let allTr = Array.from(document.getElementsByTagName('tr'));
      // iterate through tr
      allTr.map(tr => {
          tr.deleteCell(0);
      });
        rowLen--;
    } else if(rowLen == 1){
      alert("You can't make the board any shorter!");
    }
}

// append buttons to addColumnDiv
addColumnDiv.appendChild(addColumnButton);
addColumnDiv.appendChild(removeColumnButton);
// select first tr in table
const firstRow = document.getElementsByTagName('tr')[0];
// append button to end of firstRow
firstRow.appendChild(addColumnDiv);

// select remove row button
const removeRowButton = document.getElementById("remove-row");
// add event listener
removeRowButton.onclick = () => {removeRow()};
// write method
function removeRow(){
  if(rows > 1){
    // collect all tr
    const allTr = Array.from(document.getElementsByTagName('tr'));
    // select last row
    const row = allTr[allTr.length - 1];
    // remove last node from its parent
    row.parentNode.removeChild(row);
    rows--;
  } else {
    alert("You can't make the board any shorter!");
  }
}