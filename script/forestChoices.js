

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


let i = 0;
function ChoicesBoxDuplicater() {
    const originalNode = document.getElementById("choiceDuplicater0");
    if (!originalNode) {
        console.error("Original node not found.");
        return;
    }
    disableAllButtons();
    const clone = originalNode.cloneNode(true);
    document.body.appendChild(clone);

    clone.id = "choiceDuplicater" + ++i;

    const randomMarginLeft = Math.floor(Math.random() * 90) + 20;

    clone.style.marginBottom = "10vh";
    clone.style.width = "55vh";
    clone.style.marginLeft = randomMarginLeft + "vh";

    clone.onclick = function() {
        ChoicesBoxDuplicater();
        this.onclick = null;
    }
    
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
    
    if (i > 0) {
        new LeaderLine(
            document.getElementById('choiceDuplicater' + (i - 1)),
            document.getElementById('choiceDuplicater' + i),
            {
                path: 'grid',
                startSocket: 'bottom',
                endSocket: 'top',
                color: '#327117',
                size: 4,
                outline: false,
                outlineSize: 0.02,
                outlineColor: '#000000FF',
                dropShadow: true
            }
        );
    }
}

function disableAllButtons() {
    // Get all the buttons with class 'choices' and disable them
    const buttons = document.querySelectorAll('#choiceDuplicater0 + #choices');
    buttons.forEach(button => {
        button.disabled = true; // Disable the button
    });
}


export function CreateButton() {
    const btn = document.createElement("button");
    btn.className = 'btn choices text-light';
    btn.innerHTML = 'Jag vill stoppa upp ett uppgrag';
    
    // Use addEventListener instead of onclick
    btn.addEventListener('click', function handleClick() {
        ChoicesBoxDuplicater();
        // Remove the event listener after the button is clicked once
        btn.removeEventListener('click', handleClick);
    });

    const div = document.createElement("div");
    div.className = 'col-4 mb-3';
    div.appendChild(btn);

    let choicesDiv = document.getElementById("choices");
    choicesDiv.appendChild(div);
}