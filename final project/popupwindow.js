var id = 0

function newPopUp(){
  id = id + 1
  var w = 300
  var h = 300
  var l = Math.random()*(screen.width-w)
  var t = Math.random()*(screen.height-h)
  var properties = `width=${w},height=${h},left=${l},top=${t}`
//   window.open('person.html', id, properties)
// }
// document.addEventListener("click", newPopUp)
// to do: connect each city to it's own popup and correct event trigger
