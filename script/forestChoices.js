const story = document.getElementById("storyLine");
const storyChoices = document.getElementById("choices");

const storyNode = {
    start: {
        text: "You find yourself in a thick forest. Where do you want to go?",
        choices: [
            { text: "Hut", next: "hut" },
            { text: "Continue Forward", next: "OutsideCity" },
            { text: "Deeper Forest", next: "startDeepForest" }
        ]
    },
    hut: {
        text: "You arrive at a small, abandoned hut. What do you want to do?",
        choices: [
            { text: "Enter the hut", next: "enterHut" },
            { text: "Look around", next: "lookAround" }
        ]
    }
};


function CreateButton() {
    const btn = document.createElement("button");
    btn.className = 'btn choices text-light';
    btn.innerHTML = 'Jag vill stoppa upp ett uppgrag';
    btn.onclick = function() {
        ChoicesBoxDuplicater();
        this.onclick = null;
    };

    const div = document.createElement("div");
    div.className = 'col-4 mb-3';
    div.appendChild(btn);

    let choicesDiv = document.getElementById("choices");
    choicesDiv.appendChild(div);
}

export {choicesDiv};
