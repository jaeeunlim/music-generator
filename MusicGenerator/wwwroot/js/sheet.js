const MIN_SHEETS = 1;
var num_sheets = 1;

// Add more music sheet when Add button is clicked.
document.getElementById("btn-add").onclick = function () {
    var container = document.getElementById("sheet-group");
    var section = document.getElementById(`sheet1`);
    var clone = section.cloneNode(true);
    num_sheets++;
    clone.id = `sheet{$num_sheets}`;
    container.appendChild(clone);

    if (num_sheets > MIN_SHEETS) {
        document.getElementById("btn-remove").hidden = false;
    }
}

// Delete music sheet when Remove button is clicked.
document.getElementById("btn-remove").onclick = function () {
    if (num_sheets > MIN_SHEETS) {
        document.getElementById(`sheet{$num_sheets}`).remove();
        num_sheets--;

        if (num_sheets == MIN_SHEETS) {
            document.getElementById("btn-remove").hidden = true;
        }
    }
}