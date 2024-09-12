/*const story = document.getElementById("storyLine");
const storyChoices = document.getElementById("choices");

const storyNode = {
    text: "You find yourself in a thick forest", text: "Where do you want to go?" ={
        choices:{
            text: "Hut", next: "hut",
            text: "Continue Forward", next: "OutsideCity",
            text: "Deeper Forest", next: "startDeepForest"
        }
    },

    text: "" ={

    }
}


function ChoicesBox(){

}
*/

let i = 0;

function ChoicesBoxDuplicater() {
    const node = document.getElementById("choiceDuplicater");
    const clone = node.cloneNode(true); // Clone the #demo div and its contents
    document.body.appendChild(clone);   // Append the clone to the body
    clone.id = "choiceDuplicater" + ++i;

    const randomMarginLeft = Math.floor(Math.random() * 90) + 20;

    clone.style.marginBottom = "10vh";
    clone.style.width = "55vh";
    clone.style.marginLeft = randomMarginLeft +"vh";

    const react = choiceDuplicater.getBoundingClientRect();

    console.log(react.x, react.y);
}
