const BASE_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`;
const dropdown = document.querySelectorAll(".dropdown select");
const amount = document.querySelector(".amount input");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".From select")
const toCurr = document.querySelector(".TO select");
const msg = document.querySelector(".msg");

for(let select of dropdown){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if(select.name === "From" && currCode === "USD"){
            newOption.selected = "selected";
        }else if (select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
};
const updateFlag = (element) => {
      let currCode = element.value;
      let countryCode = countryList[currCode];
      console.log(countryCode);
      let img = element.parentElement.querySelector("img");
       let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
      img.src = newSrc;
};
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})
const updateExchangeRate =  async () => {
    let amtval = amount.value;
    console.log(amtval);
    if(amtval < 1 || amtval === ""){
        amtval = 1;
        amount.value = 1;
    }
    let URl = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let promise = await fetch(URl);
    let data = await promise.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalamount = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
    
};
window.addEventListener("load",()=>{
    updateExchangeRate();
})
