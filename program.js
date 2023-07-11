const read_file = document.getElementById("file");
const output_text = document.getElementById("output_text");
const input_text = document.getElementById("input_text");

function readFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        output_text.value = reader.result;
    };
    reader.readAsText(file);
}

function keyEvent() {
    const inputText = input_text.value;
    const outputText = output_text.value;

    if (inputText === outputText) {
        output_text.value = "PERFECT!";
        input_text.value = "";
        setTimeout(() => {
            readFileFromInput(); // 3秒後に選択したファイルの内容を再表示する
        }, 3000);
    }
}

function readFileFromInput() {
    const file = read_file.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        output_text.value = reader.result;
    };
    reader.readAsText(file);
}

input_text.oninput = keyEvent;
