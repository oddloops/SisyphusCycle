// get the id of the table we want to modify
const workoutTable = document.getElementById("tableBody");

// get the id of the add row button (+)
const addRowId = document.getElementById("addRow");

// add eventListener when the button is clicked to add a row
addRowId.addEventListener("click", () => {

    // adds a row to the bottom of the table
    const newRow = workoutTable.insertRow(-1);
    
    // Create 7 cells for the row
    const exercise = newRow.insertCell(0);
    const partWorked = newRow.insertCell(1);
    const weightPounds = newRow.insertCell(2);
    const weightKilograms = newRow.insertCell(3);
    const repsAmount = newRow.insertCell(4);
    const sets = newRow.insertCell(5);
    const date = newRow.insertCell(6);
    const buttons = newRow.insertCell(7);

    // allow input for exercise name
    const exerciseInput = document.createElement("input");
    exerciseInput.type = "text";
    exerciseInput.name = "exerciseName";
    exerciseInput.placeholder = "exercise name";
    exerciseInput.required = true;
    exercise.appendChild(exerciseInput);

    // create label for select
    const labelSelectBodypart = document.createElement("label");
    labelSelectBodypart.setAttribute('for', 'bodySelect');
    labelSelectBodypart.textContent = "body part: ";
    partWorked.appendChild(labelSelectBodypart);

    // create select dropdown for body parts, 7 in total
    const selectBodypart = document.createElement("select");
    selectBodypart.name = "bodySelect";
    selectBodypart.required = true;
    
    // initial state
    const option1 = document.createElement("option");
    option1.value = "";
    option1.text = "";
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
    weightLbInput.name = "weightLbs";
    weightLbInput.type = "number";
    weightLbInput.placeholder = "lbs lifted";
    weightLbInput.min = 0;
    weightLbInput.required = true;
    weightPounds.appendChild(weightLbInput);

    // allow input for weight (kilograms)
    const weightKgInput = document.createElement("input");
    weightKgInput.name = "weightKgs";
    weightKgInput.type = "number";
    weightKgInput.placeholder = "kgs lifted";
    weightKgInput.min = 0;
    weightKgInput.required = true;
    weightKilograms.appendChild(weightKgInput);

    // allow input for rep count
    const repsInput = document.createElement("input");
    repsInput.name = "repNum";
    repsInput.type = "number";
    repsInput.placeholder = "rep count";
    repsInput.min = 0;
    repsInput.required = true;
    repsAmount.appendChild(repsInput);

    // allow input for set count
    const setsInput = document.createElement("input");
    setsInput.name = "setNum";
    setsInput.type = "number";
    setsInput.placeholder = "set count";
    setsInput.min = 0;
    setsInput.required = true;
    sets.appendChild(setsInput);

    // allow input for data achieved
    const dateInput = document.createElement("input");
    dateInput.name = "dateAchieved";
    dateInput.type = "date";
    dateInput.required = true;
    date.appendChild(dateInput);

    // Create the submit and delete button cell
    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.name = "submitExercise";
    submitButton.textContent = "✓";
    buttons.appendChild(submitButton);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.name = "delRow";
    deleteButton.textContent = "✗";
    buttons.appendChild(deleteButton);
});

// add event listener for each button to submit data/remove row
workoutTable.addEventListener('click', () => {
    const target = event.target;
    const row = target.parentNode.parentNode;
    // to submit row's cell data
    if  (target.name === "submitExercise") {
        const cells = row.cells;
        const inputs = row.querySelectorAll('input, select');
        const data = {};
        let inputsFilled = true;

        // get all the inputted data
        inputs.forEach(input => {
            // check for empty inputs
            if (!input.value) {
                alert(`Fill in missing field: ${input.name}`);
                inputsFilled = false;
                return;
            }
            data[input.name] = input.value;
        });

        // Send data to server if all inputs are filled
        if (inputsFilled) {
            fetch('/exercise-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                // check response from server
                if (response.ok) {
                    console.log("Data sent successfully");
                } else {
                    console.error("Error sending data");
                }
            })
            .then(data => {
                console.log('Data successfully submitted');
            })
            .catch(error => {
                console.error('Error: ', error);
            });
        }
    }

    // to delete row
    if (target.name === "delRow") {
        row.remove();
    }
});
