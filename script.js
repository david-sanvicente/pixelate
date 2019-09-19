// Your code here
let isDrawing = false;
let boxColor = 'red';
// let boxColor;

const table = document.getElementById('table');

makeRow = () => {
  const newTr = document.createElement('tr');
  for (let i = 0; i < 20; i ++){
    const newTd = document.createElement('td');
    newTr.append(newTd);
  }
  table.append(newTr);
}

makeRow();
makeRow();
makeRow();

const button = document.getElementById('add-row');
button.addEventListener('click', makeRow);

function colorize (event) {
  isDrawing = true;
  let tableCell = event.target;

  if(tableCell.className.length || tableCell.tagName !== 'TD'){
    tableCell.className = '';
  } else {
    tableCell.className = boxColor;
  }
  // if(tableCell.className === ''){
  //   tableCell.className = 'green';
  // } else{
  //   tableCell.className = '';
  // }
}

table.addEventListener('mousedown', colorize);

table.addEventListener('mouseover', function(event){
  if(isDrawing){
    colorize(event);
    // colorize();
  }
})

// table.addEventListener('mouseup', isDrawing = false)

function changeColor(event){
  // console.log(event.target.value);
   boxColor = event.target.value;
}

const selector = document.getElementsByTagName("select")[0];
selector.addEventListener('change', changeColor);