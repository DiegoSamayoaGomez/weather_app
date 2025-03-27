import { getDataFunc } from "./getData.js";
import sunImg from "./img/sunset.png";
import moonImg from "./img/night.png";
import clouds from "./img/clouds.png";
import search from "./img/search.png";
import toggle from "./img/switch.png";
import calendar from "./img/calendar.png";
import map from "./img/country.png";
import time from "./img/timezone.png";
import "./styles.css";
import "./modern-normalize.css";

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

/* Add cloud icon next to the title*/
const titleContainer = document.querySelector(".titleContainer");
const imgTitle = elementGenerator("img", "", "", "");
imgTitle.src = clouds;
titleContainer.appendChild(imgTitle);

// Add search icon to the search button
const submitSearch = document.getElementById("submitSearch");
const searchIcon = elementGenerator("img", "", "", "");
searchIcon.src = search;
submitSearch.prepend(searchIcon); // Use prepend to show the icon before the "Search text"

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

  const switchIcon = elementGenerator("img", "", "", "");
  switchIcon.src = toggle;

  toggleTemperatureButton.prepend(switchIcon);

  // Append button to toggle temperature formats
  toggleTemperatureType.appendChild(toggleTemperatureButton);

  // Insert address
  const addressComplete = document.querySelector(".addressComplete");
  addressComplete.textContent = filteredData.completeAddres;

  // Insert temperature in Fahrenheit
  const mainTemperature = document.querySelector(".mainTemperature");
  mainTemperature.textContent = `${filteredData.temperatureFahrenheit}°F`;

  // Select left container and, based on the temperature in celsius
  // add a class name to later add an specific design to it
  const weatherInfoGroupLeft = document.querySelector(".weatherInfoGroupLeft");
  if (mainTemperatureCelsius < 0) {
    weatherInfoGroupLeft.classList = "weatherInfoGroupLeft freezing";
  } else if (mainTemperatureCelsius >= 0 && mainTemperatureCelsius < 10) {
    weatherInfoGroupLeft.classList = "weatherInfoGroupLeft cold";
  } else if (mainTemperatureCelsius >= 10 && mainTemperatureCelsius < 15) {
    weatherInfoGroupLeft.classList = "weatherInfoGroupLeft cool";
  } else if (mainTemperatureCelsius >= 15 && mainTemperatureCelsius < 30) {
    weatherInfoGroupLeft.classList = "weatherInfoGroupLeft warm";
  } else if (mainTemperatureCelsius >= 30) {
    weatherInfoGroupLeft.classList = "weatherInfoGroupLeft hot";
  } else {
    weatherInfoGroupLeft.classList.add("weatherInfoGroupLeft");
  }

  // Select the right container and add a second class which will be used to set
  // the background color
  const weatherInfoGroupRight = document.querySelector(
    ".weatherInfoGroupRight"
  );
  weatherInfoGroupRight.classList = "weatherInfoGroupRight weatherRightBack";

  // Description
  const descriptionTemperature = document.querySelector(
    ".descriptionTemperature"
  );
  descriptionTemperature.textContent = filteredData.description;

  // Max Temp
  const maxTemp = document.querySelector(".maxTemp");
  maxTemp.textContent = `MAX: ${filteredData.maxTemp}°F`;

  // Min Temp
  const minTemp = document.querySelector(".minTemp");
  minTemp.textContent = `MIN: ${filteredData.minTemp}°F`;

  // Add icons and text to the right container
  const todayDateGroup = document.querySelector(".todayDateGroup");
  // Prevent duplication
  todayDateGroup.textContent = "";

  // Date of today
  // Add calendar icon
  const calendarIcon = elementGenerator("img", "", "", "");
  calendarIcon.src = calendar;
  // Add it to the start of the container
  todayDateGroup.prepend(calendarIcon);

  const todayDate = elementGenerator(
    "p",
    "todayDate",
    filteredData.todayDate,
    ""
  );

  todayDateGroup.appendChild(todayDate);

  // Add icon and address
  const addressGroupTwo = document.querySelector(".addressGroupTwo");
  // Prevent duplication
  addressGroupTwo.textContent = "";

  const mapIcon = elementGenerator("img", "", "", "");
  mapIcon.src = map;

  addressGroupTwo.prepend(mapIcon);

  // Short address
  const address = elementGenerator("p", "address", filteredData.address, "");
  addressGroupTwo.appendChild(address);

  // ADd icon and timezone icon
  const timeZoneGroup = document.querySelector(".timeZoneGroup");
  //Prevent duplication
  timeZoneGroup.textContent = "";

  const timezoneIcon = elementGenerator("img", "", "", "");
  timezoneIcon.src = time;

  timeZoneGroup.prepend(timezoneIcon);
  // Timezone

  const timeZone = elementGenerator("p", "timeZone", filteredData.timeType, "");
  timeZoneGroup.appendChild(timeZone);

  // Sunrise
  const sunriseInfoGroup = elementGenerator("div", "sunriseInfoGroup", "", "");

  // Create a title, icon and hour of the sunrise
  const sunrise = elementGenerator("p", "sunrise", "Sunrise", "");

  const sunriseIcon = elementGenerator("img", "sunriseIcon", "", "");

  sunriseIcon.src = sunImg; // Use imported image

  const sunriseHour = elementGenerator(
    "p",
    "sunriseHour",
    filteredData.sunrise, // Insert the sunrise hour as text content
    ""
  );

  // Append title, icon and hour of the sunrise
  sunriseInfoGroup.appendChild(sunrise);
  sunriseInfoGroup.appendChild(sunriseHour);
  // Add icon in the outside
  const additionalInfoGroupLeft = document.querySelector(
    ".additionalInfoGroupLeft"
  );

  // Create new className to hold the colors
  additionalInfoGroupLeft.classList = "additionalInfoGroupLeft sunriseColors";
  additionalInfoGroupLeft.textContent = "";
  additionalInfoGroupLeft.appendChild(sunriseInfoGroup);
  additionalInfoGroupLeft.appendChild(sunriseIcon);

  // Sunset
  //const sunsetInfoGroup = document.querySelector(".sunsetInfoGroup");
  const sunsetInfoGroup = elementGenerator("div", "sunsetInfoGroup", "", "");

  // Create a title, icon and hour of the sunset
  const sunset = elementGenerator("p", "sunset", " Sunset", "");

  const sunsetIcon = elementGenerator("img", "sunsetIcon", "", "");
  sunsetIcon.src = moonImg; // Use imported image

  const sunsetHour = elementGenerator(
    "p",
    "sunsetHour",
    filteredData.sunset, // Insert the sunset hour as text content
    ""
  );

  // Append title, icon and hour of the sunset
  sunsetInfoGroup.appendChild(sunset);
  sunsetInfoGroup.appendChild(sunsetHour);
  const additionalInfoGroupRight = document.querySelector(
    ".additionalInfoGroupRight"
  );

  // Create new className to hold the colors
  additionalInfoGroupRight.classList = "additionalInfoGroupRight sunsetColors";
  additionalInfoGroupRight.textContent = "";
  additionalInfoGroupRight.appendChild(sunsetInfoGroup);
  additionalInfoGroupRight.appendChild(sunsetIcon);
  /*
  First the temperature is shown in Fahrenheit by default
  It will show the button to change to celsius
  If the button is pressed, the class name changes to fahreneit
  and changes the main temperature, min and max as well
  When the button is pressed again, it does the same but with fahrenheit
  */
  toggleTemperatureButton.addEventListener("click", (e) => {
    if (e.target.classList == "celsiusBtn") {
      toggleTemperatureButton.textContent = "Fahrenheit";
      toggleTemperatureButton.classList = "fahrenheitBtn";
      mainTemperature.textContent = `${mainTemperatureCelsius}°C`;
      maxTemp.textContent = `MAX: ${maxTempCelsius}°C`;
      minTemp.textContent = `MIN: ${minTempCelsius}°C`;
      toggleTemperatureButton.prepend(switchIcon);
    } else {
      toggleTemperatureButton.textContent = "Celsius";
      toggleTemperatureButton.classList = "celsiusBtn";
      mainTemperature.textContent = `${filteredData.temperatureFahrenheit}°F`;
      maxTemp.textContent = `MAX: ${filteredData.maxTemp}°F`;
      minTemp.textContent = `MIN: ${filteredData.minTemp}°F`;
      toggleTemperatureButton.prepend(switchIcon);
    }
  });

  console.log("Displaying filtrated data");
  console.log(filteredData);
};
