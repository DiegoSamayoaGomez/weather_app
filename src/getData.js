//Take the location from displayData and form an URL with the api KEY as well
import { apiKey } from "./apiKey";
import { getRawData } from "./processData.js";
import { showError } from "./displayData.js";

export const getDataFunc = function getDataFunc() {
  const getApiKey = () => {
    return apiKey;
  };

  const getLocation = async (location) => {
    // Form the URL with location and the key
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${getApiKey()}&contentType=json`;

    try {
      // Fetch the data and store it
      const response = await fetch(url, { mode: "cors" });
      console.log("Fetching finished");
      // Check if there is an error (A message different from 20X)
      if (!response.ok) {
        throw new Error(`NOT OK ${response.status}`);
      }

      console.log("Not present errors");
      // Otherwise return the response a JSON
      const convertedResponse = await response.json();
      getRawData(convertedResponse);
      //return convertedResponse;
    } catch (error) {
      // If there is something wrong, send an error message as the return value
      console.log(`There is an error in GetData: ${error.message}`);
      showError("Something went wrong, try again...");
    }
  };
  return { getLocation };
};
