const addRowId = document.getElementById('addRow');
const workoutTable = document.getElementById('tableBody');

addRowId.addEventListener("click", function() {
    const newRow = workoutTable.insertRow(-1);
    
    for (let i = 0; i < 7; i++) {
        const newCell = newRow.insertCell(i);
        let newData = document.createElement("input");
        if (i < 2) {
            newData.type = "text";
        } else if (i < 6) {
            newData.type = "number";
        } else {
            newData.type = "date";
        }
        newCell.append(newData);
    }
});