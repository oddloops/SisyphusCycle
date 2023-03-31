// get the id of the add row button (+)
const addRowId = document.getElementById("addRow");

// get the id of the table we want to modify
const workoutTable = document.getElementById("tableBody");

// add eventListener when the button is clicked to add a row
addRowId.addEventListener("click", function() {
    // adds a row to the bottom of the table
    const newRow = workoutTable.insertRow(-1);
    
    // Create 7 cells for the row
    const exercise = newRow.insertCell(0);
    const partWorked = newRow.insertCell(1);

    // allow input for exercise name
    const exercise_input = document.createElement("input");
    exercise_input.type = "text";
    exercise.appendChild(exercise_input);

    // create select dropdown for body parts, 7 in total
    const selectBodypart = document.createElement("select");
    
    // initial state
    const option1 = document.createElement("option");
    option1.value = "";
    option1.text = "-- Select bodypart worked --";
    selectBodypart.appendChild(option1);

    // Shoulders option
    const option2 = document.createElement("option");
    option2.value = "Shoulders";
    option2.text = "Shoulders";
    selectBodypart.appendChild(option2);
    
    // Chest option
    const option3 = document.createElement("option");
    option3.value = "Chest";
    option3.text = "Chest";
    selectBodypart.appendChild(option3);

    // Arms option
    const option4 = document.createElement("option");
    option4.value = "Arms";
    option4.text = "Arms";
    selectBodypart.appendChild(option4);

    // Abs option
    const option5 = document.createElement("option");
    option5.value = "Abs";
    option5.text = "Abs";
    selectBodypart.appendChild(option5);

    // Back option
    const option6 = document.createElement("option");
    option6.value = "Back";
    option6.text = "Back";
    selectBodypart.appendChild(option6);

    // Legs option
    const option7 = document.createElement("option");
    option7.value = "Legs";
    option7.text = "Legs";
    selectBodypart.appendChild(option7);

    partWorked.appendChild(selectBodypart);

    // Create remaining cells 5 / 7
    for (let i = 2; i < 7; i++) {
        const newCell = newRow.insertCell(i);
        let newData = document.createElement("input");
        if (i < 6) { // weights, reps, and sets (numbers)
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