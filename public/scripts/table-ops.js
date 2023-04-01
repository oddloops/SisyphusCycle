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
    const weightPounds = newRow.insertCell(2);
    const weightKilograms = newRow.insertCell(3);
    const reps = newRow.insertCell(4);
    const sets = newRow.insertCell(5);
    const date = newRow.insertCell(6);

    // allow input for exercise name
    const exerciseInput = document.createElement("input");
    exerciseInput.type = "text";
    exerciseInput.placeholder = "exercise name";
    exercise.appendChild(exerciseInput);

    // create select dropdown for body parts, 7 in total
    const selectBodypart = document.createElement("select");
    
    // initial state
    const option1 = document.createElement("option");
    option1.value = "";
    option1.text = "-- bodypart worked --";
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

    // allow input for weight (pounds)
    const weightLbInput = document.createElement("input");
    weightLbInput.name = "weight_lbs";
    weightLbInput.type = "number";
    weightLbInput.placeholder = "lbs lifted";
    weightPounds.appendChild(weightLbInput);

    // allow input for weight (kilograms)
    const weightKgInput = document.createElement("input");
    weightKgInput.name = "weight_kgs";
    weightKgInput.type = "number";
    weightKgInput.placeholder = "kgs lifted";
    weightKilograms.appendChild(weightKgInput);

    // allow input for rep count
    const repsInput = document.createElement("input");
    repsInput.name = "reps";
    repsInput.type = "number";
    repsInput.placeholder = "rep count";
    reps.appendChild(repsInput);

    // allow input for set count
    const setsInput = document.createElement("input");
    setsInput.name = "sets";
    setsInput.type = "number";
    setsInput.placeholder = "set count";
    sets.appendChild(setsInput);

    // allow input for data achieved
    const dateInput = document.createElement("input");
    dateInput.name = "date_achieved";
    dateInput.type = "date";
    date.appendChild(dateInput);
});

// get the id for the delete row button (-)
const delRowId = document.getElementById("delRow");

// adds eventlistener to delete the bottommost row
delRowId.addEventListener("click", function() {
   workoutTable.deleteRow(-1);
});