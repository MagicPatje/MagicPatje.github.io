function getItem() {
  var item = localStorage.getItem('item-test');
  if (!item) {
    item = '' + Date.now() + '-' + Math.random();
    localStorage.setItem('item-test', item);
    console.log ("Item in if: " + item);
  }
  return item;
  console.log ("Return: " + item);
  document.getElementById('LS-item').innerHTML += item;
}
