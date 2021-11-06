const MIN_SHEETS = 1;
var num_sheets = 1;

// Add more music sheet when Add button is clicked.
document.getElementById("btn-add").onclick = function () {
    var container = document.getElementById("sheet-group");
    var section = document.getElementById("sheet1");
    var clone = section.cloneNode(true);
    num_sheets++;
    clone.id = `sheet${num_sheets}`;
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


// Highlight stave when PLAY button is clicked.
document.getElementById("play").onclick = function () {
    bpm = 60.0;
    sec = 60.0 / bpm;
    interval_music = setInterval("play_music()", sec * 1000);
    interval_highlight = setInterval("move_highlight()", sec * 1000);

    // Show highlight to visualize which note is being played.
    document.getElementById("highlight").hidden = false;
}

function move_highlight() {
    let highlight = document.getElementById("highlight");
    if (highlight.style.left === "") {
        highlight.style.left = "100px";
    } else {
        let left_pixel = parseInt(highlight.style.left, 10);
        highlight.style.left = (left_pixel + 88) + "px";
    }
}

function play_music() {
    // TODO: play the notes
}

// Pause the music when PAUSE button is clicked.
document.getElementById("pause").onclick = function () {
    clearInterval(interval_music);
    clearInterval(interval_highlight);
}

// Stop the music when STOP button is clicked. Remove highlight and go back to beginning.
document.getElementById("stop").onclick = function () {
    clearInterval(interval_music);
    clearInterval(interval_highlight);
    let highlight = document.getElementById("highlight");
    highlight.style.left = "";
    highlight.hidden = true;
}
