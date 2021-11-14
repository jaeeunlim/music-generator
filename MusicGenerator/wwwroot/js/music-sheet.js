const MAX_NOTES = 12;
var num_sheets = 1;

function display_music(stave_list) {
    for (var i = 0; i < stave_list.length; i++) {
        let stave = stave_list[i];
        let row = stave.note.noteRow;
        let col = stave.staveIndex;

        // add a new stave if current stave is full
        if (Math.floor(col / MAX_NOTES) + 1 > num_sheets) {
            add_stave();
        }

        let id = `r${row}-c${col % MAX_NOTES}-${num_sheets-1}`;
        showNote(id);
    }
}

function add_stave() {
    var container = document.getElementById("sheet-group");
    var section = document.getElementById("sheet1");
    var clone = section.cloneNode(true);
    num_sheets++;
    clone.id = `sheet${num_sheets}`;
    let note_grid = clone.querySelector(".note-grid");
    let children = note_grid.children;
    for (var i = 0; i < children.length; i++) {
        let note = children[i];
        note.id = note.id.slice(0, -1) + `${num_sheets - 1}`; // Increment note ids.
        let note_children = note.children;
        for (var j = 0; j < note_children.length; j++) {
            note_children[j].hidden = true; // Clear all notes.
        }
    }
    container.appendChild(clone);
}

function showNote(id) {
    let grid = document.getElementById(id);
    let children = grid.children;
    for (var i = 0; i < children.length; i++) {
        children[i].hidden = !children[i].hidden;
    }
}
