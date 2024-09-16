

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

/*let i = 0;
function ChoicesBoxDuplicater() {

    const originalNode = document.getElementById("choiceDuplicater0");
    if (!originalNode) {
        console.error("Original node not found.");
        return;
    }
    const clone = originalNode.cloneNode(true);
    document.body.appendChild(clone);

    clone.id = "choiceDuplicater" + ++i;

    const randomMarginLeft = Math.floor(Math.random() * 90) + 20;

    clone.style.marginBottom = "10vh";
    clone.style.width = "55vh";
    clone.style.marginLeft = randomMarginLeft + "vh";
    clone.disabled = false;

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
    let b = document.getElementById('choiceDuplicater' + (i - 1))
    disableAllButtons(b);
}
*/

let containerCount = 0;

        // Create a new container with buttons
        function createContainer() {
            containerCount++;
            const randomMarginLeft = Math.floor(Math.random() * 20) + 10;
            // Create container div
            const container = document.getElementById('game');
            container.classList.add('container');

            const card = document.createElement('div');
            card.classList.add('card', 'card-question', 'shadow', 'mt-5', 'p-2');
            card.id = "card" + containerCount;
            card.style.marginLeft = randomMarginLeft + "vh";


            const whatToDo = document.createElement('h1');
            whatToDo.classList.add('text-center', 'text-light', 'mt-2');
            whatToDo.innerHTML = "What To Do?"

            const cardBottom = document.createElement('div');
            cardBottom.classList.add('row', 'text-center', 'mt-3');
            cardBottom.id = "cardBottom";


            // Create 6 buttons, each inside its own div
            for (let i = 1; i <= 6; i++) {
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('button-container');
                buttonContainer.classList.add('col-4');

                const button = document.createElement('button');
                button.textContent = `Option ${i} - Container ${containerCount}`;
                button.classList.add('button');
                button.classList.add('btn')
                button.onclick = function () {
                    disableButtons(container, button);
                    // After button click, create the next container with new options
                    createContainer();
                };

                buttonContainer.appendChild(button);
                container.appendChild(buttonContainer);
                container.appendChild(card);
                card.appendChild(whatToDo);
                card.appendChild(cardBottom);
                cardBottom.appendChild(buttonContainer)
                new LeaderLine(
                    document.getElementById('card' + (containerCount - 1)),
                    document.getElementById('card' + containerCount),
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

            // Add the container to the game div
            document.getElementById('game').appendChild(container);
        }

        // Disable all buttons except the clicked one
        function disableButtons(container, clickedButton) {
            const buttons = container.querySelectorAll('.button');
            buttons.forEach(button => {
                if (button !== clickedButton && !button.classList.contains('pressed')) {
                    button.classList.add('disabled');
                    button.disabled = true;
                } 
                else {
                    if(!button.classList.contains('pressed')) {
                        button.classList.add('pressed');
                    }
                    button.onclick = true;
                }

            });
        }

        createContainer();

        /*
let u = 0;
export function CreateButton() {
    const btn = document.createElement("button");
    btn.className = 'btn choices text-light';
    btn.innerHTML = 'Jag vill stoppa upp ett uppgrag';
    btn.id = "btn" + ++u;
    
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
}*/