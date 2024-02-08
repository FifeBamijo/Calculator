let operator = "";
let previousValue = "";
let currentValue = "";

document.addEventListener("DOMContentLoaded", function () {
  //Store all components on HTML on JS
  let clearBtn = document.querySelector(".clear-btn");
  let equal = document.querySelector(".equal");
  let decimal = document.querySelector(".decimal");

  let numbers = document.querySelectorAll(".number");
  let operators = document.querySelectorAll(".operator");

  let previousNum = document.querySelector(".previous");
  let currentNum = document.querySelector(".current");

  numbers.forEach((number) =>
    number.addEventListener("click", function (e) {
      handleNumber(e.target.textContent);
      currentNum.textContent = currentValue;
    })
  );

  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      handleOperator(e.target.textContent);
      previousNum.textContent = previousValue + " " + operator;
      currentNum.textContent = currentValue;
    })
  );

  clearBtn.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousNum.textContent = currentValue;
    currentNum.textContent = currentValue;
  });

  equal.addEventListener("click", function () {
    if (currentValue != "" && previousValue != "") {
      calculate();
      previousNum.textContent = "";
      if (previousValue.length <= 5) {
        currentNum.textContent = previousValue;
      } else {
        currentNum.textContent = previousValue.slice(0, 5) + "...";
      }
    }
  });

  decimal.addEventListener("click", function () {
    addDecimal();
  });
});

function handleNumber(num) {
  if (currentValue.length <= 5) {
    currentValue += num;
  }
}

function handleOperator(op) {
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "x") {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }
  previousValue = roundNum(previousValue);
  previousValue = previousValue.toString();
  currentValue = currentValue.toString();
}

function roundNum(num) {
  return Math.round(num * 1000) / 1000;
}

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}
