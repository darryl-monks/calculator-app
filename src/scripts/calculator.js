((document) => {
  const calculatorDisplay = document.getElementById("calculator-screen");
  const calculatorButtons = document.querySelectorAll(".calculator__button");

  let previousInput = null;
  let currentInput = null;
  let operation = null;
  let previousAction = null;

  for (const button of calculatorButtons) {
    button.addEventListener("click", () => {
      const { action, value } = button.dataset;

      if (action === "number") {
        addNumberToDisplay(value);
      } else if (action === "decimal") {
        addDecimalPointToDisplay();
      } else if (action === "operator") {
        runOperation(value);
      } else if (action === "equals") {
        runEqualsOperation();
      } else if (action === "delete") {
        deleteLastNumberFromDisplay();
      } else if (action === "reset") {
        resetCalculator();
      }

      previousAction = action;
    });
  }

  function addNumberToDisplay(value) {
    if (calculatorDisplay.value === "0" || previousAction === "operator") {
      calculatorDisplay.value = value;
    } else {
      calculatorDisplay.value += value;
    }
  }

  function addDecimalPointToDisplay() {
    if (calculatorDisplay.value.indexOf(".") === -1) {
      calculatorDisplay.value += ".";
    }
  }

  function runOperation(operator) {
    if (previousInput !== null && previousAction === "number") {
      currentInput = calculatorDisplay.value;
      previousInput = calculate(previousInput, operation, currentInput);
      calculatorDisplay.value = previousInput;
    } else {
      previousInput = calculatorDisplay.value;
    }

    operation = operator;
  }

  function runEqualsOperation() {
    currentInput = previousAction === "equals" ? currentInput : calculatorDisplay.value;
    previousInput = calculate(previousInput, operation, currentInput);

    calculatorDisplay.value = previousInput === undefined ? 0 : previousInput;
  }

  function deleteLastNumberFromDisplay() {
    let updatedDisplayValue = calculatorDisplay.value.slice(0, -1);

    if (updatedDisplayValue === "") {
      updatedDisplayValue = 0;
    }

    calculatorDisplay.value = updatedDisplayValue;
  }

  function resetCalculator() {
    previousInput = null;
    currentInput = null;
    operation = null;
    calculatorDisplay.value = 0;
  }

  function add(numberOne, numberTwo) {
    return parseFloat(numberOne) + parseFloat(numberTwo);
  }

  function subtract(numberOne, numberTwo) {
    return parseFloat(numberOne) - parseFloat(numberTwo);
  }

  function multiply(numberOne, numberTwo) {
    return parseFloat(numberOne) * parseFloat(numberTwo);
  }

  function divide(numberOne, numberTwo) {
    return parseFloat(numberOne) / parseFloat(numberTwo);
  }

  function calculate(numberOne, operator, numberTwo) {
    if (operator === "+") {
      return add(numberOne, numberTwo);
    }

    if (operator === "-") {
      return subtract(numberOne, numberTwo);
    }

    if (operator === "x") {
      return multiply(numberOne, numberTwo);
    }

    if (operator === "/") {
      return divide(numberOne, numberTwo);
    }
  }
})(document);
