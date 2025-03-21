import { getDataFunc } from "./getData.js";

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

// This should be the form wich asks for a location, once triggered it will run the rest of the application
export const askData = function () {
  //const location = prompt("Gimme a location", "Guatemala");
  const location = "Barillas";
  getDataFunc().getLocation(location);

  // Select form
  const searchBarForm = document.getElementById("searchBarForm");
  console.log("Submitted");

  searchBarForm.addEventListener("submit", (e) => {
    // Stop form from sending data to a server
    e.preventDefault();
    const searchBar = document.getElementById("searchBar");
    // Prevent from sending empty data to the api request
    searchBar.value == ""
      ? showError("Enter a valid location")
      : console.log(searchBar.value);
    // Clear input
    searchBar.value = "";
  });
};

// Once the function is called, show the current weather
export const showDataFunc = function showDataFunc(filteredData) {
  console.log("Displaying filtrated data");
  console.log(filteredData);
};
