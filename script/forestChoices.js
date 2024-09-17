const storyNode = {
    start: {
        text: "You find yourself in a thick forest.",
        question: "Where do you want to go?",
        choices: [
            { text: "Hut", next: "hut" },
            { text: "Continue Forward", next: "OutsideCity" },
            { text: "Deeper Forest", next: "startDeepForest" }
        ]
    },
    hut: {
        text: "You arrive at a small, abandoned hut.",
        question: "What do you want to do?",
        choices: [
            { text: "Enter the hut", next: "enterHut" },
            { text: "Look around", next: "lookAround" }
        ]
    },
};

let containerCount = 0;

function createStoryContainer(storyNodeKey) {
    const randomMarginLeft = Math.floor(Math.random() * 20) + 10;
    const randomWidth = Math.floor(Math.random() * 15) + 40;


    const container = document.createElement('div');
    container.classList.add('card', 'card-question', 'shadow', 'mt-5', 'p-2');
    container.id = "card" + containerCount;


    container.style.marginLeft = randomMarginLeft + "vh";
    container.style.width = randomWidth + "vh";
    container.style.transform = `translateX(${randomMarginLeft}vh)`;

    const questionTitle = document.createElement('h2');
    questionTitle.classList.add('text-center', 'text-light', 'mt-2');
    questionTitle.innerHTML = storyNode[storyNodeKey].question;
    container.appendChild(questionTitle);

    updateStoryLog(storyNode[storyNodeKey].text);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('row', 'text-center', 'mt-3');
    container.appendChild(buttonContainer);

    storyNode[storyNodeKey].choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.classList.add('btn', 'button', 'm-2');

        button.addEventListener('click', function () {
            disableButtons(container, button);
            createStoryContainer(choice.next);
        });

        const buttonCol = document.createElement('div');
        buttonCol.classList.add('col-4');
        buttonCol.appendChild(button);
        buttonContainer.appendChild(buttonCol);
    });

    document.getElementById('game').appendChild(container);

    if (containerCount > 0) {
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
                dropShadow: true
            }
        );
    }

    containerCount++;
}

function disableButtons(container, clickedButton) {
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button !== clickedButton) {
            button.classList.add('disabled');
        } else {
            button.classList.add('pressed');
        }
    });
}

function updateStoryLog(storyText) {
    const logContainer = document.getElementById('text-log', 'mt-4', 'text-light', 'shadow', 'overflow-auto', 'custom-scrollbar');
    const logEntry = document.createElement('p');
    logEntry.classList.add('story-log');
    logEntry.innerHTML = storyText;
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

function OldLogs(storyText){
    
}

createStoryContainer('start');
