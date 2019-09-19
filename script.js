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
