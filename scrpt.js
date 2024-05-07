var text = document.getElementById("text");
var date = document.getElementById("datePicker");
var btn = document.getElementById("btn");

var container = document.getElementById("TextContianer")
var firstcheckbox = document.getElementById("firstcheckbox")

var textElements = [];


function initializer() {

    var dataFromLocalStorage = localStorage.getItem("data")
    if (dataFromLocalStorage == null || dataFromLocalStorage == undefined) {
        //return works as break
        return;
    }//we don need else here because if it breaks it will jump to line 16

    // it converted the new json came from localStorage to an object and added to 
    //our array
    textElements = JSON.parse(dataFromLocalStorage)

    render()
}

//calling the method after it is ran
initializer()

function addText() {
    var textObject = {
        inputText: text.value,
        inputboxdate: date.value,
        status: false
    }

    textElements.push(textObject);
    text.value = "";
    var jsonarray = JSON.stringify(textElements)
    //converting array or object as array is an object too,  to string json , coz 
    //local storage accepted two string as parameters 
    //first step done here 
    localStorage.setItem("data", jsonarray)

    render();
}

// printing our method to HTML or UI 
function render() {
    var elements = "";
    // IF WE pass two parameters in the first parm obj the element will be add 
    //to the second variable , index will be added 
    textElements.forEach(function (obj, index) {
        //regualr expression using ? if true add it checked attrubute to the checkbtn if not
        //add only one empty string 
        var checkedbtn = obj.status ? "checked" : "";
        var underline = obj.status ? "underline" : "";
        elements += "<li class =" + underline + ">" + "<input " + checkedbtn
            + " onchange='checkoff(" + index + ")' type='checkbox'>" +
            obj.inputText + " " + obj.inputboxdate +
            "<button onclick='deleteText(" + index + ")'>Delete</button></li>";
    })
    container.innerHTML = "<ol>" + elements + "</ol>"
}


var backdrop = document.getElementById("backdrop");
function deleteText(index) {


    backdrop.style.visibility = "visible";

    var yesbutton = document.getElementById("yesbtn")
    //if we are passing a function that takes a parameter 
    // thats why we need to write function and then call our 
    //call the function inside
    yesbutton.addEventListener("click", function () {
        yestodelete(index)
        hidebackdrop()
        var deletemsg = document.getElementById("deletemsg")
        deletemsg.style.visibility = "visible"
        deletemsg.style.bottom = "10px"

        setTimeout(() => {
            deletemsg.style.bottom = "-100px"
            deletemsg.style.visibility = "hidden"
        }, 2000);

    })

}
function yestodelete(index) {
    textElements.splice(index, 1);
    var jsonarray = JSON.stringify(textElements)
    localStorage.setItem("data", jsonarray)

    render();

}

// 
btn.addEventListener("click", addText)


function checkoff(index) {
    //it takes one object from array and add it to element index
    var elementIndex = textElements[index]
    if (elementIndex.status) {

        elementIndex.status = false;

    } else {

        elementIndex.status = true;
    }
    // now we did our updTade and place it back to the array 
    textElements[index] = elementIndex

    var jsonarray = JSON.stringify(textElements)
    localStorage.setItem("data", jsonarray)
    render()


    console.log(index);
    console.log(textElements);
}

function hidebackdrop() {
    backdrop.style.visibility = "hidden";
}
