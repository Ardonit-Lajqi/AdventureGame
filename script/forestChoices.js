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

ctx = document.getElementById("c").getContext("2d");
ctx.beginPath();
canvas_arrow(ctx, 0, 0, react.x, react.y);
ctx.stroke();


function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}
