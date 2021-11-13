const MIN_SHEETS = 1;

var num_sheets = 1;

// Add more music sheet when Add button is clicked.
document.getElementById("btn-add").onclick = function () {
    var container = document.getElementById("sheet-group");
    var section = document.getElementById("sheet1");
    var clone = section.cloneNode(true);
    num_sheets++;
    clone.id = `sheet${num_sheets}`;
    let note_grid = clone.querySelector(".note-grid");
    let children = note_grid.children;
    for (var i = 0; i < children.length; i++) {
        let note = children[i];
        note.id = note.id.slice(0, -1) + `${num_sheets-1}`; // Increment note ids.
        let note_children = note.children;
        for (var j = 0; j < note_children.length; j++) {
            note_children[j].hidden = true; // Clear all notes.
        }
    }
    container.appendChild(clone);

    if (num_sheets > MIN_SHEETS) {
        document.getElementById("btn-remove").hidden = false;
    }
}

// Delete music sheet when Remove button is clicked.
document.getElementById("btn-remove").onclick = function () {
    if (num_sheets > MIN_SHEETS) {
        document.getElementById(`sheet${num_sheets}`).remove();
        num_sheets--;

        if (num_sheets == MIN_SHEETS) {
            document.getElementById("btn-remove").hidden = true;
        }
    }
}

// Add a note to stave when a grid is clicked.
function addNote(id) {
    let grid = document.getElementById(id);
    let children = grid.children;
    for (var i = 0; i < children.length; i++) {
        children[i].hidden = !children[i].hidden;
    }
}
