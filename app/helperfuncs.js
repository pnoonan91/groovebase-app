//Visibility control for divs initially hidden
export function toggleView(element) {
  var node = document.getElementById(element)

  if(!node.style.display){
    node.style.display = "block";
  }
  else if(node.style.display === "none"){
    node.style.display = "block";
  } else{
    node.style.display = "none";
  }

}
