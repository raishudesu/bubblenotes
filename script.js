const colorPicker = document.getElementById("colorPicker");
const colorPreview = document.getElementById("colorPreview");
const bubblesContainer = document.querySelector('.bubbles');
const bubbles = document.getElementsByClassName('bubble');

colorPicker.addEventListener("input", function() {
  const color = colorPicker.value;
  const negativeColor = getNegativeColor(color);
  
  colorPreview.style.backgroundColor = color;
  
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].style.backgroundColor = color;
    bubblesContainer.style.backgroundColor = negativeColor;
  }
});

function getNegativeColor(color) {
  // Extract RGB values
  const [r, g, b] = color.match(/\d+/g);
  
  // Calculate negative RGB values
  const negativeR = 255 - r;
  const negativeG = 255 - g;
  const negativeB = 255 - b;
  
  // Return negative color in RGB format
  return `rgb(${negativeR}, ${negativeG}, ${negativeB})`;
}


function getBgColor(){
  var divBgColor = document.getElementById('colorPreview').style.backgroundColor;
  if(divBgColor != ""){
    document.querySelector('.result').innerHTML = divBgColor;
    
  }
  else{
    divBgColor = "Pick a color!"
    document.querySelector('.result').innerHTML = divBgColor;
  }
};  

function resetColorPicker(){
  var defaultColor = '#ffffff';
  colorPicker.value = defaultColor;
  colorPreview.style.backgroundColor = defaultColor;  
  document.querySelector('.result').innerHTML = "";
}
