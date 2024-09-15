import {flashCardLetters, flashCardVowels, instructionsHTML} from './hebrew_data.js';

//Because this file is a module I must wait for window load to assign the elements and functions to them.
window.onload = function(){
  const menuBtn = document.getElementById("menuBtn");
  menuBtn.addEventListener("click", dropMenu);

  const instructBtn = document.getElementById("instructBtn");
  instructBtn.addEventListener('click', instructionsSel);

  const letterBtn = document.getElementById("letterBtn");
  letterBtn.addEventListener('click', lettersSel);

  const vowelBtn = document.getElementById("vowelBtn");
  vowelBtn.addEventListener('click', vowelsSel);

  const letterVowelBtn = document.getElementById("letterVowelBtn");
  letterVowelBtn.addEventListener('click', lettersVowelsSel);
  
  // Const of the Flashcard Elements
  const resetBtn = document.getElementById("resetBtn");
  const notifyText = document.getElementById("notifyText");
  const letterName = document.getElementById("letterName");
  const letterSymbol = document.getElementById("letterSymbol");
  const letterVowel = document.getElementById("letterVowel");
  const letterDiction = document.getElementById("letterDiction");
  const menuContentBtns = document.getElementById("menuContentBtns");
  const nextBtn = document.getElementById("nextBtn");
  const attemptsDisplay = document.getElementById("attemptsDisplay");
  const correctDisplay = document.getElementById("correctDisplay");
  const resultImage = document.getElementById("resultImage");
  const learningPageBody = document.getElementById("learningPageBody");
  const btnCountContainer = document.getElementById("btnCountContainer");
}

// Click iterator used to display notify message from array
let clickIter = 0;

// Global to use to maintain the same random number through out the letter or vowel iteration.
let randomIndex;
let randomIndexLetter;
let randomIndexVowel;

// This is to hold a temporary list of the cards that will get updated until 0 remaining pulls.
let listOfRemainingCards = [];

// Variable to keep track of menu state.
let menuState = "Instructions";

// Attempts and Result counter variables.
let attemptsCount = 0;
let correctCount = 0;

// Variables to Hold prior assigned function to reset and next buttons.
let priorResetBtnFunc;
let priorNextBtnFunc;

// Code to run reset function at page load up.
document.addEventListener("DOMContentLoaded", instructionsSel());

// This is to close the drop down menu by clicking anywhere but the dropdown menu itself. 
document.addEventListener('click', e => {
  if(!menuContentBtns.contains(e.target) && e.target !== menuBtn){
    menuContentBtns.classList.remove("menuDropDownVisible");
  } 
})

// The Selected Learning Game Functions area letterOnlyGame, vowelOnlyGame, and letterVowelsGame
function letterOnlyGame() {
  
  const notifyTextDisplay = ["What Letter is It?", "What Sound Does It Make?", "Where You Correct on All?"]

  letterVowelListAssign(flashCardLetters);
  
  if(clickIter === 0) {
    refreshDisplay();
    notifications(notifyTextDisplay, clickIter);
    randomIndex = getRandomIndex(listOfRemainingCards);
    letterSymbol.innerHTML = listOfRemainingCards[randomIndex].hLetterSymbol;
    clickIter++;
  } else if(clickIter === 1){
    notifications(notifyTextDisplay, clickIter);
    letterName.textContent = listOfRemainingCards[randomIndex].hLetterName;
    clickIter++;
  } else if(clickIter === 2){
    notifications(notifyTextDisplay, clickIter);
    letterDiction.textContent = listOfRemainingCards[randomIndex].hLetterDiction;
    resultsDisplayCounter(notifyTextDisplay.length);
    listOfRemainingCards.splice(randomIndex, 1);
    clickIter = 0;
  }
}

function vowelsOnlyGame() {
  // String Array used to guide the guessing game forward.
  const notifyTextDisplay = ["What Vowel Sound?", "Where You Correct?"]

  letterVowelListAssign(flashCardVowels);
  
  if(clickIter === 0) {
    refreshDisplay();
    notifyText.textContent = notifyTextDisplay[clickIter];
    randomIndex = getRandomIndex(listOfRemainingCards);
    letterSymbol.innerHTML = listOfRemainingCards[randomIndex].hVowel;
    clickIter++;
  } else if(clickIter === 1){
    notifications(notifyTextDisplay, clickIter);
    letterName.textContent = listOfRemainingCards[randomIndex].hVowelName;
    letterDiction.innerHTML = listOfRemainingCards[randomIndex].hVowelDiction;
    resultsDisplayCounter(notifyTextDisplay.length);
    listOfRemainingCards.splice(randomIndex, 1);
    clickIter = 0;
  }
}

function lettersVowelsGame() {
  // String Array used to guide the guessing game forward.
  const notifyTextDisplay = ["Sound it Out!", "Where You Correct?"]

  notifyText.textContent = notifyTextDisplay[clickIter];
  
  if(clickIter === 0) {
    refreshDisplay();
    notifyText.textContent = notifyTextDisplay[clickIter];
    randomIndexLetter = getRandomIndex(flashCardLetters);
    letterSymbol.innerHTML = flashCardLetters[randomIndexLetter].hLetterSymbol;
    randomIndexVowel = getRandomIndex(flashCardVowels);
    letterVowel.innerHTML = vowelReturnDisplay(randomIndexLetter, randomIndexVowel);
    clickIter++;
  } else if(clickIter === 1){
    notifications(notifyTextDisplay, clickIter);
    letterDiction.textContent = vowelReturnLetters(randomIndexLetter, randomIndexVowel);
    resultsDisplayCounter(notifyTextDisplay.length);
    clickIter = 0;
  }
}


function vowelReturnDisplay(letterIndex, vowelIndex) {
  if(!flashCardLetters[letterIndex].hLetterName.includes("Final")){
    return flashCardVowels[vowelIndex].hVowel;
  }else {
    return "";
  }
}

function vowelReturnLetters(letterIndex, vowelIndex){
  if(!flashCardLetters[letterIndex].hLetterName.includes("Final")){
    return flashCardLetters[letterIndex].hLetterDiction + "-" + flashCardVowels[vowelIndex].hVowelDiction;
  }else {
    return flashCardLetters[letterIndex].hLetterDiction;
  }
}
// This function copies const array to listofremaingcards array which will have elements taken out of it till reaching 0 length through out the games.
function letterVowelListAssign(gameChoice){
  if(listOfRemainingCards.length === 0) {
    listOfRemainingCards = [...gameChoice];
  }
}

function refreshDisplay(){
  notifyText.textContent = ""
  letterName.textContent = "";
  letterSymbol.innerHTML = "";
  letterVowel.innerHTML = "";
  letterDiction.textContent = "";
  menuBtn.textContent = menuState;
  displayCounter();
  if(resultImage.classList.contains("resultVisible")){
    resultImage.classList.remove("resultVisible");
  }
}

function reset(){
  menuBtn.textContent = menuState;
  clickIter = 0;
  attemptsCount = 0;
  correctCount = 0;
  refreshDisplay();
  setBtnsToPriorState();
  notifyText.textContent = "Click Next to Start!"
  listOfRemainingCards.splice(0);
}

 function notifications(arrayMessages, iterator){
  notifyText.textContent = arrayMessages[iterator];
 }

 function displayCounter(){
  attemptsDisplay.textContent = attemptsCount;
  correctDisplay.textContent = correctCount;
 }
 
 function resultsDisplayCounter(arrayLength){
  if(clickIter === (arrayLength - 1)){
    priorNextBtnFunc = nextBtn.onclick;
    priorResetBtnFunc = resetBtn.onclick;
    resetBtn.textContent = "No";
    nextBtn.textContent = "Yes";
    nextBtn.onclick = correctCounter;
    resetBtn.onclick = incorrectCounter;
  }
 }

 function imgResultDisplay(correctBool){
  if(correctBool){
    resultImage.src = "media/check_mark.svg";
    resultImage.alt = "check-mark";
  } else{
    resultImage.src = "media/x_mark.svg";
    resultImage.alt = "x-mark";
  }
  resultImage.classList.add("resultVisible");
 }
 function correctCounter(){
  attemptsCount++;
  correctCount++;
  imgResultDisplay(true);
  displayCounter();
  setBtnsToPriorState();
 }
 function incorrectCounter(){
  attemptsCount++;
  imgResultDisplay(false);
  displayCounter();
  setBtnsToPriorState();
 }

 function setBtnsToPriorState(){
  if(nextBtn.onclick === correctCounter && resetBtn.onclick === incorrectCounter){
    nextBtn.onclick = priorNextBtnFunc;
    nextBtn.textContent = "Next";
    resetBtn.onclick = priorResetBtnFunc;
    resetBtn.textContent = "Reset";
  }
 }

 function getRandomIndex(arrayList){
  return Math.floor(Math.random() * arrayList.length)
 }

 function dropMenu(){
  if(menuContentBtns.classList.contains("menuDropDownVisible")){
    menuContentBtns.classList.remove("menuDropDownVisible");
    menuBtn.textContent = menuState;
  } else {
    menuContentBtns.classList.add("menuDropDownVisible");
  }
 }

 function updateMenuBtnState(curState) {
  menuBtn.textContent = curState;
  if(menuContentBtns.classList.contains("menuDropDownVisible")){
    menuContentBtns.classList.remove("menuDropDownVisible");
    menuState = curState;
  }
 }

 
 function toggleBottomButtons(){
  if(btnCountContainer.style.display === ""){
    btnCountContainer.style.display = "none";
    letterName.style.display = "none";
    letterSymbol.style.display = "none";
    letterVowel.style.display = "none";
    letterDiction.style.display = "none";
    document.querySelector(".flashCard").insertAdjacentHTML('afterbegin', instructionsHTML); 
  }else if(btnCountContainer.style.display === "none" && menuState !== "Instructions"){
    btnCountContainer.style.display = "flex";
    letterName.style.display = "block";
    letterSymbol.style.display = "block";
    letterVowel.style.display = "block";
    letterDiction.style.display = "block";
    deleteFlashCard();
  }else if (btnCountContainer.style.display === "flex" && menuState === "Instructions"){
    btnCountContainer.style.display = "none";
    letterName.style.display = "none";
    letterSymbol.style.display = "none";
    letterVowel.style.display = "none";
    letterDiction.style.display = "none";
    document.querySelector(".flashCard").insertAdjacentHTML('afterbegin', instructionsHTML);
  }
 }

 function deleteFlashCard(){
  const flashCardContent = document.querySelector(".flashCard");
  flashCardContent.firstChild.remove();
 }

//  Drop Down Menu Selection Code to play different learning modes. 
 function lettersSel() {
  updateMenuBtnState("Letters");
  toggleBottomButtons();
   reset();
   resetBtn.onclick = reset;
   if(!(nextBtn.onclick === letterOnlyGame)){
     nextBtn.onclick = letterOnlyGame;
    letterOnlyGame();
  }
 }

 function vowelsSel(){
  updateMenuBtnState("Vowels");
  toggleBottomButtons();
  reset();
  resetBtn.onclick = reset;
  if(!(nextBtn.onclick === vowelsOnlyGame)){
    nextBtn.onclick = vowelsOnlyGame;
    vowelsOnlyGame();
  }
 }

 function lettersVowelsSel(){
  updateMenuBtnState("Letters & Vowels");
  toggleBottomButtons();
  reset();
  resetBtn.onclick = reset;
  if(!(nextBtn.onclick === lettersVowelsGame)){
    nextBtn.onclick = lettersVowelsGame;
    lettersVowelsGame();
  }
 }

 function instructionsSel(){
  // TODO:Make this!
  updateMenuBtnState("Instructions");
  toggleBottomButtons();
  reset();
  notifyText.textContent = "";
  
 }


