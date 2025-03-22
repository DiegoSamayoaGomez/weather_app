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
      : // Import the getLocation from getDataFunc (GetData,js) and
        // send the location (searchBar.value)  as a parameter
        getDataFunc().getLocation(searchBar.value);
    // Clear input
    searchBar.value = "";
  });
};

// When an error occurrs, show it in the screen
export const showError = function (messageError) {
  const errorContainer = document.querySelector(".errorContainer");
  // Show the error message received
  const errorMessage = elementGenerator("p", "errorMessage", messageError, "");
  errorContainer.appendChild(errorMessage);
};

// Return the temperature in Celsius
function convertToCelsius(temperatureFahrenheit) {
  // C = (F - 32) × 5/9
  return ((temperatureFahrenheit - 32) * (5 / 9)).toFixed(2);
}
// Once the function is called, show the current weather
export const showDataFunc = function showDataFunc(filteredData) {
  // First, convert all temperatures into Celsius (it´s easier for me)

  const mainTemperatureCelsius = convertToCelsius(
    filteredData.temperatureFahrenheit
  );
  const minTempCelsius = convertToCelsius(filteredData.minTemp);
  const maxTempCelsius = convertToCelsius(filteredData.maxTemp);

  // Clear any error message
  const errorContainer = document.querySelector(".errorContainer");
  errorContainer.textContent = "";

  // Toggle Temperature
  const toggleTemperatureType = document.querySelector(
    ".toggleTemperatureType"
  );
  // Clear any existing button to avoid duplication
  toggleTemperatureType.textContent = "";

  // Create a new button
  const toggleTemperatureButton = elementGenerator(
    "button",
    "celsiusBtn",
    "Celsius",
    ""
  );

  // Insert address
  const addressComplete = document.querySelector(".addressComplete");
  addressComplete.textContent = filteredData.completeAddres;

  // Insert temperature in Fahrenheit
  const mainTemperature = document.querySelector(".mainTemperature");
  mainTemperature.textContent = `${filteredData.temperatureFahrenheit}°F`; // THe button should change the temperatures

  // Description
  const descriptionTemperature = document.querySelector(
    ".descriptionTemperature"
  );
  descriptionTemperature.textContent = filteredData.description;

  // Max Temp
  const maxTemp = document.querySelector(".maxTemp");
  maxTemp.textContent = `${filteredData.maxTemp}°F`;

  // Min Temp
  const minTemp = document.querySelector(".minTemp");
  minTemp.textContent = `${filteredData.minTemp}°F`;

  // Date of today
  const todayDate = document.querySelector(".todayDate");
  todayDate.textContent = filteredData.todayDate;

  // Short address
  const address = document.querySelector(".address");
  address.textContent = filteredData.address;

  // Timezone
  const timeZone = document.querySelector(".timeZone");
  timeZone.textContent = filteredData.timeType;

  // Sunrise
  const sunriseHour = document.querySelector(".sunriseHour");
  sunriseHour.textContent = filteredData.sunrise;

  // Sunset
  const sunsetHour = document.querySelector(".sunsetHour");
  sunsetHour.textContent = filteredData.sunset;

  toggleTemperatureType.appendChild(toggleTemperatureButton);

  toggleTemperatureButton.addEventListener("click", (e) => {
    if (e.target.classList == "celsiusBtn") {
      toggleTemperatureButton.textContent = "Fahrenheit";
      toggleTemperatureButton.classList = "fahrenheitBtn";
      mainTemperature.textContent = `${mainTemperatureCelsius}°C`;
      maxTemp.textContent = `${maxTempCelsius}°C`;
      minTemp.textContent = `${minTempCelsius}°C`;
    } else {
      toggleTemperatureButton.textContent = "Celsius";
      toggleTemperatureButton.classList = "celsiusBtn";
      mainTemperature.textContent = `${filteredData.temperatureFahrenheit}°F`; // The button should change the temperatures
      maxTemp.textContent = `${filteredData.maxTemp}°F`;
      minTemp.textContent = `${filteredData.minTemp}°F`;
    }
  });

  console.log("Displaying filtrated data");
  console.log(filteredData);
};
