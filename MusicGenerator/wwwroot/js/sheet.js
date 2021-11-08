﻿const MAX_ROWS = 13; // maximum number of rows on stave where a note can be placed
const MAX_COLS = 12; // maximum number of columns on stave where a note can be placed
const MIN_SHEETS = 1;
const MUSIC_NOTE_AUDIO = [
    "la-hi", "sol-hi", "fa-hi", "mi-hi", "re-hi", "do-hi", "ti-low",
    "la-low", "sol-low", "fa-low", "mi-low", "re-low", "do-low"
];

var num_sheets = 1;
var col = 0; // current column on the stave that is being played
var stave_num = 0; // current stave being played
var first_note = true;
var last_note = false;

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


// Highlight stave when PLAY button is clicked.
document.getElementById("play").onclick = function () {
    music_ended = false;
    play();
}

function play() {
    bpm = 120.0;
    sec = 60.0 / bpm;
    interval_music = setInterval("play_music()", sec * 1000);
    interval_highlight = setInterval("move_highlight()", sec * 1000);
}

function move_highlight() {
    let stave = document.getElementById(`sheet${stave_num + 1}`);
    let highlight = stave.querySelector("#highlight");

    if (music_ended) {
        reset();
    } else {
        ++col;
        if (first_note) {
            if (stave_num > 0) {
                document.getElementById(`sheet${stave_num}`).querySelector("#highlight").hidden = true;
            }
            highlight.hidden = false;
            highlight.style.left = "100px";
            first_note = false;
        } else {
            let left_pixel = parseInt(highlight.style.left, 10);
            highlight.style.left = (left_pixel + 88) + "px";

            if (col === MAX_COLS) {
                if (stave_num + 1 === num_sheets) {
                    music_ended = true;
                } else {
                    first_note = true;
                    stave_num++;
                    col = 0;
                }
            }
        }
    }
}

function play_music() {
    if (!music_ended) {
        let stave = document.getElementById(`sheet${stave_num + 1}`);
        let note_grid = stave.querySelector(".note-grid");
        for (var row = 0; row < MAX_ROWS; row++) {
            console.log(`#r${row}-c${col}-${stave_num}`);
            let note = note_grid.querySelector(`#r${row}-c${col}-${stave_num}`);
            if (!note.firstChild.hidden) {
                let audio = document.getElementById(MUSIC_NOTE_AUDIO[row]);
                let audio_clone = audio.cloneNode();
                audio_clone.play();
            }
        }
    }
}

// Pause the music when PAUSE button is clicked.
document.getElementById("pause").onclick = function () {
    clear_interval();
}

// Stop the music when STOP button is clicked. Remove highlight and go back to beginning.
document.getElementById("stop").onclick = function () {
    reset();
}

function reset() {
    clear_interval();
    reset_stave();
    stave_num = 0;
}

function reset_stave() {
    let stave = document.getElementById(`sheet${stave_num + 1}`);
    let highlight = stave.querySelector("#highlight");
    highlight.style.left = "100px";
    highlight.hidden = true;
    first_note = true;
    col = 0;
}

function clear_interval() {
    clearInterval(interval_music);
    clearInterval(interval_highlight);
}
