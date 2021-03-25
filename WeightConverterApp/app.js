document.getElementById("output").style.visibility = "hidden";
let input = document.getElementById("weightInput");
let unitSelector = document.getElementById("unitSelector");

const calculateWeights = (weight, unit) => {
  switch (unit) {
    case "pound":
      setValues(weight * 453.592, weight * 0.453592, weight * 16, weight);
      break;
    case "gram":
      setValues(weight, weight * 0.001, weight * 0.035274, weight * 0.002205);
      break;
    case "kg":
      setValues(weight * 1000, weight, weight * 35.274, weight * 2.205);
      break;
    case "oz":
      setValues(weight * 28.3495, weight * 0.0283495, weight, weight * 0.0625);
      break;
    default:
      setValues(weight * 453.592, weight * 0.453592, weight * 16, weight);
      break;
  }
};

const setValues = (w1, w2, w3, w4) => {
  document.getElementById("gramsOutput").textContent = w1;
  document.getElementById("kgsOutput").textContent = w2;
  document.getElementById("ozsOutput").textContent = w3;
  document.getElementById("poundsOutput").textContent = w4;
};

input.addEventListener("input", (e) => {
  let weight = e.target.value;
  let unit = unitSelector.value;

  if (weight == 0) {
    document.getElementById("output").style.visibility = "hidden";
  } else if (weight < 0) {
    let div = document.createElement("div");
    div.className = "alert alert-danger mt-2";
    let alertText = document.createTextNode("Weight can't be less than 0!");
    div.appendChild(alertText);
    document.querySelector("form").insertBefore(div, unitSelector);
    input.value = 0;
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  } else {
    document.getElementById("output").style.visibility = "visible";
    calculateWeights(weight, unit);
  }
});

unitSelector.addEventListener("change", (e) => {
  let unit = e.target.value;
  let weight = input.value;

  calculateWeights(weight, unit);
});
