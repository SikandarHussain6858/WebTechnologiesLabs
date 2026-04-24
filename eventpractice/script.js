let btn1 = document.querySelector("#btn1");
let mode = "light";

btn1.addEventListener("click", modehandler);

function modehandler() {
    console.log("button clicked");.
    if (mode === "light") {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        document.body.innerHTML = "fuck you";
        mode = "dark";
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        mode = "light";
    }
}
