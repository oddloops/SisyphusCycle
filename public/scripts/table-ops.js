// get the id of the table we want to modify
const workoutTable = document.getElementById("tableBody");

// get the id of the add row button (+)
const addRowId = document.getElementById("addRow");

// flag to prevent excess rows
let addRowClicked = false;

// add eventListener when the button is clicked to add a row
addRowId.addEventListener("click", () => {
    if (!addRowClicked) {
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
        // create a label
        const exerciseLabel = document.createElement('label');
        exerciseLabel.setAttribute('for', 'exerciseName');
        // create an input
        const exerciseInput = document.createElement('input');
        exerciseInput.type = "text";
        exerciseInput.id = "exerciseName";
        exerciseInput.name = "exerciseName";
        exerciseInput.placeholder = "Exercise Name";
        exerciseInput.setAttribute('required', true);

        // Add label and input
        exercise.appendChild(exerciseLabel);
        exercise.appendChild(exerciseInput);

        // create label for select
        const labelSelectBodypart = document.createElement("label");
        labelSelectBodypart.setAttribute('for', 'bodySelect');
        partWorked.appendChild(labelSelectBodypart);

        // create select dropdown for body parts, 7 in total
        const selectBodypart = document.createElement("select");
        selectBodypart.id = "bodySelect";
        selectBodypart.name = "bodySelect";
        selectBodypart.required = true;
        
        // initial state
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "Body Part";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectBodypart.appendChild(defaultOption);

        // Shoulders option
        const option1 = document.createElement("option");
        option1.value = "Shoulders";
        option1.text = "Shoulders";
        selectBodypart.appendChild(option1);
        
        // Chest option
        const option2 = document.createElement("option");
        option2.value = "Chest";
        option2.text = "Chest";
        selectBodypart.appendChild(option2);

        // Arms option
        const option3 = document.createElement("option");
        option3.value = "Arms";
        option3.text = "Arms";
        selectBodypart.appendChild(option3);

        // Abs option
        const option4 = document.createElement("option");
        option4.value = "Abs";
        option4.text = "Abs";
        selectBodypart.appendChild(option4);

        // Back option
        const option5 = document.createElement("option");
        option5.value = "Back";
        option5.text = "Back";
        selectBodypart.appendChild(option5);

        // Legs option
        const option6 = document.createElement("option");
        option6.value = "Legs";
        option6.text = "Legs";
        selectBodypart.appendChild(option6);

        partWorked.appendChild(selectBodypart);

        // allow input for weight (pounds)
        // create label
        const weightLbLabel = document.createElement("label");
        weightLbLabel.setAttribute('for', 'weightLbs');

        // create input
        const weightLbInput = document.createElement("input");
        weightLbInput.id = "weightLbs";
        weightLbInput.name = "weightLbs";
        weightLbInput.type = "number";
        weightLbInput.classList.add("lbs");
        weightLbInput.placeholder = "lbs Lifted";
        weightLbInput.min = 0;
        weightLbInput.required = true;

        weightPounds.appendChild(weightLbLabel);
        weightPounds.appendChild(weightLbInput);

        // allow input for weight (kilograms)
        // create label
        const weightKgLabel = document.createElement("label");
        weightKgLabel.setAttribute('for', 'weightKgs');

        // create Input
        const weightKgInput = document.createElement("input");
        weightKgInput.id = "weightKgs";
        weightKgInput.name = "weightKgs";
        weightKgInput.type = "number";
        weightKgInput.classList.add("kgs");
        weightKgInput.placeholder = "kgs Lifted";
        weightKgInput.min = 0;
        weightKgInput.required = true;

        weightKilograms.appendChild(weightKgLabel);
        weightKilograms.appendChild(weightKgInput);

        // allow input for rep count
        // create label
        const repsLabel = document.createElement("label");
        repsLabel.setAttribute('for', 'repNum');

        // create input
        const repsInput = document.createElement("input");
        repsInput.id = "repNum";
        repsInput.name = "repNum";
        repsInput.type = "number";
        repsInput.placeholder = "Rep Count";
        repsInput.min = 0;
        repsInput.required = true;
        
        repsAmount.appendChild(repsInput);
        repsAmount.appendChild(repsInput);

        // allow input for set count
        // create label
        const setsLabel = document.createElement("label");
        setsLabel.setAttribute('for', 'setNum');

        // create niput
        const setsInput = document.createElement("input");
        setsInput.id = "setNum";
        setsInput.name = "setNum";
        setsInput.type = "number";
        setsInput.placeholder = "Set Count";
        setsInput.min = 0;
        setsInput.required = true;
        sets.appendChild(setsLabel);
        sets.appendChild(setsInput);

        // allow input for data achieved
        const dateInput = document.createElement("input");
        dateInput.id = "dateAchieved";
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

        // set flag to prevent excess clicking
        addRowClicked = true;

        // focus onto the first cell of row (exercise name)
        exerciseInput.focus();
    }
});

// add event listener for each button to submit data/remove row
workoutTable.addEventListener('click', () => {
    const target = event.target;
    const row = target.parentNode.parentNode;

    // to submit row's cell data
    if  (target.name === "submitExercise") {
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
                    location.reload();
                    addRowClicked = false;
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

    // update the exercise
    if (target.name === "updateExercise") {
        const changedCells = row.querySelectorAll('.changed');
        // checks if at least 1 cell was changed
        if (changedCells.length > 0) {
            const cells = row.querySelectorAll('td');

            // dictionary of new exercise data
            const updatedData = {};

            // add in the exercise name 
            updatedData[cells[0].classList[0]] = cells[0].textContent;

            // uses the range of cells that can be changed
            const start = 2;
            const end = 6;
            for (let i = start; i <= end; i++) {
                const cell = cells[i];
                const dataType = cell.getAttribute("data-type");

                // get the name tof the column
                const name = cell.classList[1];

                // converts it to the proper type
                let value = (cell.value) ? cell.value : cell.textContent;
                if (dataType === 'number') {
                    value = parseInt(value);
                } else if (dataType === 'date') {
                    // format the date correctly to be put into the MySql
                    const formattedDate = new Date(value).toISOString().substring(0, 10);
                    value = formattedDate;
                }
                updatedData[name] = value;
            }    
            fetch('/update-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
            .then(response => {
                // check response from server
                if (response.ok) {
                    console.log("Data sent successfully");
                    alert("Updated exercise!");
                    location.reload();
                } else {
                    console.error("Error sending data");
                }
            })
            .then(data => {
                console.log('Data successfully updateed');
            })
            .catch(error => {
                console.error('Error: ', error);
            });
        } else {
            console.log('No cells changed, no need to do anything');
        }
    }

    // to delete row
    if (target.name === "delRow") {
        // check if the cells are not empty
        if (row.querySelectorAll('input').length === 0) {
            const checkDel = confirm("Delete row and exercise?");
            if (checkDel) {
                const exerciseName = row.cells[0].textContent;
                // send request to delete from database tables
                fetch(`/deleteRow`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {exercise_name: exerciseName}
                    )
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Deleted exercise");
                        location.reload();
                        return response;
                    } else {
                        console.error('Error deleting exercise');
                        throw new Error('Error deleting exercise');
                    }
                })
                .catch(error => {
                    console.error(`Error deleting row: ${error}`);
                });
            }
        } else {
            row.remove();
        }
    }

    // allow cells to be edited
    const cell = target.closest('td');
    if (cell && cell.classList.contains('edit')) {
        const original = target.dataset.original = cell.textContent;
        const originalValue = cell.value
        
         const inputExists = cell.querySelector('input');
         // checks whether an input was already created
        if (inputExists) {
            inputExists.focus();
        } else {
            // Clear the text of the cell
            cell.textContent = '';

            // Create input element and set its value to the original value
            const input = document.createElement('input');
            input.type = cell.dataset.type;
            input.name = cell.classList[1];
            if (input.type === 'number') {
                input.min = 0;
            } else if (input.type === 'date') {
                input.value = originalValue;
            }
            input.value = originalValue;

            // Append the input element to the cell
            cell.appendChild(input);

            // Focus on the input element
            input.focus();

            // Add a blur event listener to the input element to save the new value
            input.addEventListener('blur', () => {
                const value = input.value;
                if (value === '') {
                    cell.textContent = original;
                    cell.value = originalValue;
                } else {
                    if (input.type === 'number') {
                        const parent = cell.parentNode;
                        if (cell.classList.contains('weightLbs')) {
                            const kgsCell = parent.querySelector('.weightKgs');
                            kgsCell.textContent = (value / 2.2046).toFixed(0);
                            kgsCell.value = (value / 2.2046).toFixed(0);
                        } else if (cell.classList.contains('weightKgs')) {
                            const lbsCell = parent.querySelector('.weightLbs');
                            lbsCell.textContent = (value * 2.2046).toFixed(0);
                            lbsCell.value = (value * 2.2046).toFixed(0);
                        }
                        cell.textContent = value;
                        cell.value = value;
                    } else if (input.type === 'date') {
                        const formattedDate = new Date(value).toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                            timeZone: 'UTC'
                        });

                        cell.textContent = formattedDate;
                        cell.value = formattedDate;
                    }
                    // add a class to denote that the cell was changed
                    cell.classList.add('changed');
                }
                input.remove();
            }); 
        }
    }

    // to auto convert lb -> kg and vice versa
    const lbsInput = row.querySelector(".lbs");
    const kgsInput = row.querySelector(".kgs");

    if (lbsInput || kgsInput) {
        lbsInput.addEventListener('input', () => {
            kgsInput.textContent = (lbsInput.value / 2.2046).toFixed(0);
            kgsInput.value = (lbsInput.value / 2.2046).toFixed(0);
        });

        kgsInput.addEventListener('input', () => {
            kgsInput.textContent = (kgsInput.value * 2.2046).toFixed(0);
            lbsInput.value = (kgsInput.value * 2.2046).toFixed(0);
        });
    }
});