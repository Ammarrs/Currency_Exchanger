// https://v6.exchangerate-api.com/v6/8a7cacb4d0315c9c750aa659/latest/USD
// https://flagsapi.com/{countryname}/shiny/32.png
import { countries } from "./countries.js";

let convertBtn = document.querySelector(".btn");
let swapBtn = document.querySelector(".swap-btn");
let fromAmountInp = document.querySelector(".from-amount-input");
let toAmountInp = document.querySelector(".to-amount-input");
let fromAmountSelect = document.querySelector(".from-amount-select");
let toAmountSelect = document.querySelector(".to-amount-select");

swapBtn.addEventListener("click", () => {
  let temp = fromAmountSelect.value;
  fromAmountSelect.value = toAmountSelect.value;
  toAmountSelect.value = temp;
  console.log("swapped");
});

async function getCurrencyData(code) {
  let result = await fetch(
    `https://v6.exchangerate-api.com/v6/8a7cacb4d0315c9c750aa659/latest/${code}`,
  );
  let data = await result.json();
  //   console.log(data);
  return data.conversion_rates;
}

async function getFlagData(code) {
    let result = await fetch(`https://flagsapi.com/${code}/shiny/32.png`);
    let data = await result.json();
    console.log(data);
    
    return data;
}

async function calcConversion() {
  let fromAmountSelectCode = fromAmountSelect.value;
  let toAmountSelectCode = toAmountSelect.value;
  let conversions = await getCurrencyData(fromAmountSelectCode);
    // console.log(conversions);
  let fromAmount = Number(fromAmountInp.value);
  if(fromAmount === 0) {
    fromAmount = 1;
  }
  let conversionRate = conversions[toAmountSelectCode];
  let toAmount = fromAmount * conversionRate;
  toAmountInp.value = toAmount.toFixed(2);
  console.log(fromAmount, fromAmountSelectCode, toAmountSelectCode, conversionRate, toAmount);
}

convertBtn.addEventListener("click", calcConversion);
fromAmountInp.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        calcConversion();
    }
})

let options = Object.entries(countries)
  .map(([key, value]) => {
    // let flagCode = key.slice(0, 2);
    // console.log(flagCode);
    // let flagUrl = getFlagData(flagCode);
    return `<option value=${key}>${key} - ${value}</option>`;
  })
  .join("");

fromAmountSelect.innerHTML = options;
toAmountSelect.innerHTML = options;
