const registerPopUp = document.getElementById("regPopup");
const logPopUp = document.getElementById("logPopup");
const bodyStyle = document.body.style;


// Open and Close Register PopUp
function openReg() {
  registerPopUp.classList.add("openPopUpContainer");
  bodyStyle.position = 'fixed';
  bodyStyle.top = `$(window.scrollY)px`;
}
function regClose() {
  registerPopUp.classList.remove("openPopUpContainer");
  bodyStyle.position = '';
  bodyStyle.top = ``;
}

// Open and Close Login PopUp
function openLogin() {
  logPopUp.classList.add("openPopUpContainer");
  bodyStyle.position = 'fixed';
  bodyStyle.top = `$(window.scrollY)px`;
}

function logPopClose() {
  logPopUp.classList.remove("openPopUpContainer");
  bodyStyle.position = '';
  bodyStyle.top = ``;
}

// Sign In TODO:Need to verify username and password
function signIn(){
  location.href = "study-hebrew.html";
}