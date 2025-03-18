import { getDataFunc } from "./getData.js";

// This should be the form wich asks for a location, once triggered it will run the rest of the application
export const askData = function () {
  const location = prompt("Gimme a location", "Guatemala");
  getDataFunc().getLocation(location);
};

export const showError = function (messageError) {
  const testDisplay = document.createElement("p");
  testDisplay.textContent = messageError;
  document.body.appendChild(testDisplay);
};

// Create a function which creates elements

function elementGenerator(
  typeElement,
  classNameElement = "",
  textElement = "",
  idElement = ""
) {
  const newElement = document.createElement(typeElement);
  if (classNameElement) newElement.classList.add(classNameElement);
  if (textElement) newElement.textContent = textElement;
  if (idElement) newElement.id = idElement;

  return newElement;
}

export const showDataFunc = async function showDataFunc(filteredData) {
  console.log("Displaying filtrated data");
  console.log(filteredData);

  const testElement = elementGenerator(
    "p",
    "testClass",
    filteredData.description,
    "testID"
  );
  document.body.appendChild(testElement);
};
