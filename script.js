const colorPicker = document.getElementById("colorPicker");
const colorPreview = document.getElementById("colorPreview");

colorPicker.addEventListener("input", function() {
  const color = colorPicker.value;
  colorPreview.style.backgroundColor = color;
});

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
