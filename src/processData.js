import { showDataFunc } from "./displayData";

export async function getRawData(rawData) {
  console.log("Getting RAW data");
  return filterRawData(await rawData);
}

export function filterRawData(rawData) {
  console.log("Complete data");
  console.log(rawData);
  console.log("Filtering data");
  const filteredData = {
    completeAddres: rawData.resolvedAddress,
    temperatureCelsius: rawData.currentConditions.temp,
    description: rawData.description,
    maxTemp: rawData.days[0].tempmax,
    minTemp: rawData.days[0].tempmin,
    todayDate: rawData.days[0].datetime,
    address: rawData.address,
    timeType: rawData.timezone,
    sunrise: rawData.currentConditions.sunrise,
    sunset: rawData.currentConditions.sunset
  };
  showDataFunc(filteredData);

  //return { address, description };
}
