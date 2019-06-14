function getItem() {
  var item = localStorage.getItem('item-test');
  if (!item) {
    item = '' + Date.now() + '-' + Math.random();
    localStorage.setItem('item-test', item);
  }
  return item;
}
