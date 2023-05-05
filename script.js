const currentInput = document.querySelector("#currentInput");

const walletProgressBar = document.querySelector("#totalBar");
const goalWallet = document.querySelector("#goalWallet");
const currentTotalText = document.querySelector("#currentTotalText");

//********* WALLET HEADER
let currentBank = 0;

//currentInput Progress Bar
currentInput.addEventListener("change", (e) => {
  currentBank = parseInt(currentInput.value);
  console.log("Current Amount: " + currentBank);

  currentTotalText.innerHTML = "Monthly Income: $" + currentBank;
  walletProgressBar.max = currentBank;
  walletProgressBar.value = currentBank;

  currentInput.value = "";
});

//**********


//********* ADDING CARDS
const orderDiv = document.querySelector(".order");
const plusButton = document.querySelector("#plusButton");

let total = 0;

plusButton.addEventListener("click", (e) => {

  //random id generator
  let rand = Math.floor(Math.random() * 1000000);
  let id = "editCard" + rand;

  const inner = document.createElement('div');
  inner.innerHTML = ` 
  <div id="${id}" class="cardx" >

      <p class="subtitle is-family-monospace mt-2 mb-2">Category: </p>
        <input
          id="categoryInput"
          class="input is-family-monospace is-primary is-normal"
          type="text"
          placeholder="Please provide a budget category..."
        />

      <p class="subtitle is-family-monospace mt-2 mb-2">Budget: </p>
        <input
          id="budgetInput"
          class="input is-family-monospace is-primary is-normal"
          type="number"
          placeholder="List your budget..."
        />
    
      <button class ="submitButton button is-primary mt-5 is-family-monospace" id="submitButton${rand}" data-link="${id}">Submit</button>
      </div>
      ` ;
  orderDiv.append(inner);
  /* add submitbutton */

  let submitButton = document.querySelector(`#${id} #submitButton${rand}`);
  console.log(submitButton);

  
  submitButton.addEventListener("click", (e) => {
    let editCard = document.querySelector("#" + id);
    console.log(editCard);

    let categoryField = document.querySelector(`#${id} #categoryInput`);
    //document.querySelector(categoryField.value);
    let budgetField = document.querySelector(`#${id} #budgetInput`);
    editCard.innerHTML = `
      <p id="category" class="title is-size-3 is-family-monospace mt-1">${categoryField.value}:  </p>
      <p id="budget" class="subtitle is-family-monospace mt-1 mb-2"> Budget - $${budgetField.value} </p>
      <p id="remaining" class="subtitle is-family-monospace">Remaining Amount - $${budgetField.value}</p>

        <input
          id="investedAmount" data-link="${id}"
          class="input is-primary is-family-monospace is-normal"
          type="number"
          placeholder="Enter amount used..."
        />

      <button id="addButton" class="button is-primary mt-3 is-family-monospace mb-2" data-link="${id}">Add</button>`;

    //let running = true;
    //while(running){

      let remainTotal = parseInt(budgetField.value);
    
    let addButton = document.querySelector(`#${id} #addButton`);
    
    addButton.addEventListener("click", (e) => {
      let investedAmountField = document.querySelector(`#${id} #investedAmount`);
      
      const remainingField = document.querySelector(`#${id} #remaining`);

      remainTotal -= parseInt(investedAmountField.value);
      
      remainingField.innerHTML = `Remaining Amount - $${remainTotal}`;

      const invested = parseInt(investedAmountField.value);
      //console.log("Invested: " + invested);
      const budget = parseInt(budgetField.value);

      
      total += invested;
      console.log("Total: " + total);
      
      
      //update progress bar to reflect amount invested
      let changeAmount = currentBank - total;
      console.log("Current Amount: " + changeAmount);

      currentTotalText.innerHTML = "Monthly Income: $" + changeAmount;
      walletProgressBar.value = changeAmount;
      const card = document.querySelector("#" + id);

      

      //yellow (for now this is what I got)
      if (remainTotal === 0) {
        console.log("yellow");
        card.classList.remove("has-background-success");
        card.classList.add("has-background-warning");
        card.classList.remove("has-background-danger");

      }
      //green
      else if (remainTotal>0) {
        console.log("green");
        card.classList.add("has-background-success");
        card.classList.remove("has-background-warning");
        card.classList.remove("has-background-danger");

      }
      //red
      else if (remainTotal < 0) {
        alert("You've gone over your budget!");
        console.log("red");
        card.classList.remove("has-background-success");
        card.classList.remove("has-background-warning");
        card.classList.add("has-background-danger");

      }

      investedAmountField.value = "";

      
    });
    //}
  });
});


const categoryInput = document.querySelector("#categoryInput");
const budgetInput = document.querySelector("#budgetInput");
const category = document.getElementById("#category");
const budget = document.getElementById("#budget");
const submitButton = document.querySelector("#submitButton");
const editButton = document.querySelector("#editButton");
const amountInvested = document.querySelector("#amountInvested");


//*********
