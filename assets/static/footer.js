//this string will be undefined when we have the correct text in the right places
let text = "This text is a demonstration of how the textTyper fucntion will work to create a type like display of the game text. " +
"In order to temporarily stop the text, move the mouse into the textbox, moving it out again will continue the textflow. " +
"The textTyper function can be placed as an onload event on image loading or similar. " +
"The setTextValues should be set as onclick on items that are supposed to display text to the textbox";
let textToAdd = "";
let index = 0;
let timer;

//This function adds the text to the textbox
function addText(){
    if(index < text.length){
        let destination = document.getElementById('text-box-main');
        textToAdd += text[index];
        destination.innerHTML = textToAdd;
        index++;
    }
}
//This is the function that is repeatedly called to add text one letter at the time
function textTyper(){
    if(timer === undefined){
        timer = setInterval(addText, 100);
    }
}
//stopping the textTyper by clearing the interval
function stopType(){
    clearInterval(timer);
    timer = undefined; //this is to make sure that you can't click the image to add multiple textTypers
}

//This is the function used to revert the textTyper back to "start" to be able to type a new text
function setTextValues(textToSet){
    index = 0;
    textToAdd = "";
    text = textToSet;
}