// Your code here

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
  let tableCell = event.target;

  if(tableCell.className.length){
    tableCell.className = '';
  } else {
    tableCell.className = 'green';
  }
  // if(tableCell.className === ''){
  //   tableCell.className = 'green';
  // } else{
  //   tableCell.className = '';
  // }
}

table.addEventListener('click', colorize);

