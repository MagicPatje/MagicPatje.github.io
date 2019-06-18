function getItem() {
  var item = localStorage.getItem('item-test');
  if (!item) {
    item = '' + Date.now() + '-' + Math.random();
    localStorage.setItem('item-test', item);
    console.log ("Item in if: " + item);
  }
  //return item;
  console.log ("Return: " + item);
  document.getElementById('LS-item').innerHTML = item;
}

function removeItem(){
  localStorage.removeItem("item-test"); 
  document.getElementById('LS-item').innerHTML = "";
}
var timeStamp = "17-6-2019";
document.getElementById('Time').innerHTML = timeStamp;
