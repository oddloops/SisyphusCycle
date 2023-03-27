function addRow() {
    let table = document.getElementById("workoutRecord");
    let row = table.insertRow(0);
    let column = table.insertCell(0);
    column.innerHTML = "Hello";
}