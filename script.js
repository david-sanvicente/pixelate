// default columns and rows
let rows = 13;
let rowLen = 25;

// target the select element of id="select"
let select = document.getElementById("select")
// all the colors!
const colors = ['red','orange','yellow','green','blue','indigo','violet']
// map through all colors
colors.map(color => {
    let option = document.createElement('option')
    option.value = color;
    option.text = color;
    select.appendChild(option);
});

// flag for mouseover listener
let isDrawing = false;

// instantiate table and button variables
const table = document.getElementById("table");
const addRow = document.getElementById("add-row");
const nuke = document.getElementById("nuke");
const clear = document.getElementById("clear");
const addColumnDiv = document.createElement('div');
const addColumnButton = document.createElement('button');
const removeRowButton = document.getElementById("remove-row");
const removeColumnButton = document.createElement('button');

// event listeners and onclicks
addRow.addEventListener('click', () => {makeRow(rowLen)});
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
nuke.addEventListener('click', paintAll);
clear.addEventListener('click', clearBoard);
addColumnDiv.appendChild(addColumnButton);
addColumnDiv.appendChild(removeColumnButton);
addColumnButton.textContent = '+';
removeColumnButton.textContent = '-';
addColumnButton.onclick = () => {addColumn()};
removeRowButton.onclick = () => {removeRow()};
removeColumnButton.onclick =() => {removeColumn()};

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

// adds a tr to the table
function makeRow(len){ 
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

// render default grid
renderGrid(rows, rowLen);

/* this isn't a great idea. pull out this button into it's own element styled besides the table */
// select first tr in table
const firstRow = document.getElementsByTagName('tr')[0];
// append button to end of firstRow
firstRow.appendChild(addColumnDiv);

