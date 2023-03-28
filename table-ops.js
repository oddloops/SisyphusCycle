// get the id of the add row button (+)
const addRowId = document.getElementById("addRow");

// get the id of the table we want to modify
const workoutTable = document.getElementById("tableBody");

// add eventListener when the button is clicked to add a row
addRowId.addEventListener("click", function() {
    // adds a row to the bottom of the table
    const newRow = workoutTable.insertRow(-1);
    
    for (let i = 0; i < 7; i++) {
        const newCell = newRow.insertCell(i);
        let newData = document.createElement("input");
        if (i < 2) { // workout name and body part (text)
            newData.type = "text";
        } else if (i < 6) { // weights, reps, and sets (numbers)
            newData.type = "number";
            newData.required = true;
        } else { // data achieved (date)
            newData.type = "date";
        }
        newCell.append(newData); // add the data into their respective column
    }
});

// get the id for the delete row button (-)
const delRowId = document.getElementById("delRow");

// adds eventlistener to delete the bottommost row
delRowId.addEventListener("click", function() {
   workoutTable.deleteRow(-1);
});