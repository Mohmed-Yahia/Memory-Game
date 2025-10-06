 
 
 //slect the start game button
document.querySelector(".control-buttons span").onclick = function () {
 
    // prompt window to ask for name
   let yourName = prompt("Whats Your Name?");
   //console.log(yourName); 
  // if name is empty
   if (yourName == null || yourName == "") {
  // set name to unknown
   document.querySelector(".name span").innerHTML = "Unknown";
   //name is not empty
   }else {
   //set name to your name
   document.querySelector(".name span").innerHTML = yourName;

   }
   //remove splash screen
   document.querySelector(".control-buttons").remove();
    
};


let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);
// console.log(blocks);

// create range of keys
let orderRange = [...Array(blocks.length).keys()];
  shuffle(orderRange)
//console.log(orderRange);

// add order css property to game blocks 
blocks.forEach((block, index) => {
    // console.log(index);
    block.style.order = orderRange[index];

    //add click event 
    block.addEventListener("click", function () {
      // trigger the flip block function 
      flipBlock(block);

     
    });
});

// filp block function 
function flipBlock(selectedBlock) {
  // add class to flipped
  selectedBlock.classList.add(("is-flipped"));
  
  //collect all fipped cards
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

  // if there is two selected blocks 
  if (allFlippedBlocks.length === 2) {
   // console.log("two is selected");

   // stop clicking function
     stopClicking();

  // check matched block function
  checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }

  
};

//stop clicking function 
function stopClicking() {
  // add class no clicking on main container 
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    // remove class no clicking after duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
};

//matched block function
function checkMatchedBlocks(fristBlock, secondBlock) {

  let triesElement  = document.querySelector(".tries span");

   if (fristBlock.dataset.technology === secondBlock.dataset.technology) {

    fristBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    fristBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

   document.getElementById("success").play();

   }else {

     triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

   setTimeout(() => {
    fristBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
  },duration)

  document.getElementById("fail").play();


   }

};

//shuffle function 
function shuffle(array) {
  // setting vars 
  let current = array.length,
      temp,
      random;
   
   while (current > 0 ) {
    // get random number 
    random = Math.floor(Math.random() * current);

    // decreasse length by one
    current--;
  // save current element in stash 
    temp = array[current];
    //console.log(temp)

    // current element = random element 
    array[current] = array[random];

 // random element = get element from stash 
    array[random] = temp;
    } 
    return array;  
};
var seconds   = 90,
    countDiv  = document.getElementById("countdown"),
    secondPass,
    countDown = setInterval(function () {
 
        secondPass(); 

    }, 1000);
     console.log(seconds)

    function secondPass() {
   
     var minutes = Math.floor(seconds / 60),
         remSeconds = seconds % 60;

      countDiv.innerHTML = minutes + ":" + remSeconds; 
         
       if (seconds > 0) {
        seconds--;
       }else{
        clearInterval(countDown);
        countDiv.innerHTML = 'Game Over';
        
       };

    };
