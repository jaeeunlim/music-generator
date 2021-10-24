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

// Play the notes when PLAY button is clicked.
function snare() {
    document.getElementById("snare").play();

    let highlight = document.getElementById("highlight");
    var left_pixel = parseInt(highlight.style.left, 10);
    highlight.style.left = (left_pixel + 50) + "px";
}

function hi_hat() {
    document.getElementById("hi-hat").play();
}

function play() {
    bpm = 25.0;
    sec = 60.0 / bpm;
    interval_snare = setInterval("snare()", sec * 1000);
    bpm = 100.0;
    sec = 60.0 / bpm;
    interval_hi_hat = setInterval("hi_hat()", sec * 1000);
}

// Stop the music when STOP button is clicked.
function stop() {
    clearInterval(interval_snare);
    clearInterval(interval_hi_hat);
}

// Add snare drum note when Snare Drum button is clicked.
function add_snare() {
    let stave = document.getElementById(`sheet${num_sheets}`);
    let div = document.createElement("div");
    let note = "♩\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
    let text = document.createTextNode(note.repeat(3));
    div.appendChild(text);
    div.className = "snare";
    stave.appendChild(div);
}

// Add hi-hat note when Hi-Hat Cymbal button is clicked.
function add_hi_hat() {
    let stave = document.getElementById(`sheet${num_sheets}`);
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let note = "𝄀\xa0\xa0\xa0\xa0\xa0\xa0";
    let head = "x\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
    let text1 = document.createTextNode(note.repeat(12));
    let text2 = document.createTextNode(head.repeat(12));
    div1.appendChild(text1);
    div2.appendChild(text2);
    div1.className = "hi-hat";
    div2.className = "hi-hat-head";
    stave.appendChild(div1);
    stave.appendChild(div2);
}