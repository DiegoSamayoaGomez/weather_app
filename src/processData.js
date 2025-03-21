import { showDataFunc } from "./displayData";

// Receive the return value of fetching API
export async function getRawData(rawData) {
  console.log("Getting RAW data");
  // Send the object of data when its avaible
  return filterRawData(await rawData);
}

// Receive the object of data
export function filterRawData(rawData) {
  console.log("Complete data");
  console.log(rawData);
  console.log("Filtering data");
  // Extract required data and ignore the rest
  // Create and object with the filtered data
  const filteredData = {
    completeAddres: rawData.resolvedAddress,
    temperatureFahrenheit: rawData.currentConditions.temp,
    description: rawData.description,
    maxTemp: rawData.days[0].tempmax,
    minTemp: rawData.days[0].tempmin,
    todayDate: rawData.days[0].datetime,
    address: rawData.address,
    timeType: rawData.timezone,
    sunrise: rawData.currentConditions.sunrise,
    sunset: rawData.currentConditions.sunset
  };
  // Send filtered data to the display to interpret it
  showDataFunc(filteredData);

  // This function is no longer a factory function
  //return { address, description };
}
