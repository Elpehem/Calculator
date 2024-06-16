//Variables
numArray = [1,2,3,4,5,6,7,8,9,0]
operatorsArray = ["+","-","x","%","EXE","CLR"]

var stack = []
var currentInput =[]
var currentButtonClicked = ""
var number1;
var number2;
var operator;
const screen = document.querySelector(".screen")


//create the objects and html for all buttons
numberButtons = createButtons(numArray,"numberButtons","number");
operatorButtons = createButtons(operatorsArray,"operatorButtons","operator");
    
    
//following functions return width/height based on width/height of container and number of items to fit in width/height in the container 
function getWidth(container,numItems) {
    var objectWidth = getComputedStyle(container).width;
    objectWidth = Number(objectWidth.substring(0,objectWidth.length-2)) / numItems;
    return objectWidth;
}

function getHeight(container,numItems) {
    var objectHeight = getComputedStyle(container).height;
    objectHeight = Number(objectHeight.substring(0,objectHeight.length-2)) / numItems;
    return objectHeight;
}

//adds user input to calculation stack, then launches calculation once EXE is pressed
function addToStack(input){

    if(!isNaN(input)) {
        currentInput.push(input);
        screen.textContent = stack.join('') + currentInput.join('')
    }

    else if(operatorsArray.includes(input) && input != "EXE" && input != "CLR" && currentInput.length != 0 && !isNaN(currentInput[currentInput.length-1]) ){
        stack.push(Number(currentInput.join('')));
        currentInput = input;
        stack.push(currentInput);
        currentInput = [];
        screen.textContent = stack.join('');
    }

    else if(input == "EXE"){
        if(currentInput != "") {stack.push(Number(currentInput.join('')))} //if statement to avoid empty second term being interpreted as zero
        if(isCalculatable(stack)){ 
            currentInput = [];
            screen.textContent = calculate(stack)
            stack = [];
        }
        
    }

    else if(input =="CLR"){
        stack = []
        currentInput = []
        screen.textContent = ""
    }
        

  
    
}


function isCalculatable(array) {
    var evens = 0 
    var odds = 0
    for(i in array){
        if(i % 2 != 0 ){
            if(!operatorsArray.includes(array[i])){; return false   };
            odds += 1 ;
        }

        else {
            if(isNaN(array[i])){; return false }
            evens += 1 ; 
        }
    }
    if ( evens == odds + 1 ) { return true }
    
}

function calculate(array){
    var bufferArray = []
    iterations = (array.length - 1) / 2
    for(i = 0 ; i < iterations; i++){
       console.log(i);
       bufferArray[0] =  operations(array[0],array[2],array[1]);
       console.log(bufferArray);
       array.splice(0,3);
       console.log(array);
       bufferArray = bufferArray.concat(array);
       console.log(bufferArray);
       array = bufferArray;
       bufferArray = []
       console.log(i);
       
    }
    console.log("return")
    return array
}

function operations(n1,n2,operator){
    console.log("operations")
    if(operator == "+"){
        return n1 + n2
    }
    if(operator == "-"){
        return n1 - n2
    }
    if(operator == "x"){
        return n1 * n2
    }
    if(operator == "%"){
        return n1 / n2
    }
}




function createButtons(buttonArray, buttonsLocation, buttonClass) {
    buttonList =[];

    //create button class
    class calculatorButton {
        constructor(){
            this.id = "";
            this.text = "";
            this.location = buttonsLocation
            this.container = document.querySelector("#"+ buttonsLocation);
            this.margin = 2;
            this.function = buttonClass;
            
            if(buttonClass == "number"){
                this.width = getWidth(this.container,3) - this.margin * 2
                this.height = getHeight(this.container,4) - this.margin * 2 
            }
           
        }
        createHtmlButton(){
            const button = document.createElement("button");
            button.id = this.id
            button.className = "button " + buttonClass
            button.style.width = this.width + "px"
            button.style.height = this.height + "px"
            button.textContent = this.text ; 
            button.style.margin = this.margin + "px"
            button.addEventListener("click", this.ButtonClick)
            this.container.append(button)
            
            
            
        }

        ButtonClick(){
            currentButtonClicked = String(this.id)
            
            addToStack(currentButtonClicked);

            
        }
        

        
    }

   

    for(i = 0 ; i < buttonArray.length ; i++){
        buttonList[i] = new calculatorButton()
        buttonList[i].id = buttonArray[i];
        buttonList[i].text = buttonArray[i];
        if(i > buttonArray.length) { buttonList[i].id = 0 ; buttonList[i].text = 0}
        buttonList[i].createHtmlButton();
    }

    return buttonList

}