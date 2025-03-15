import { showDataFunc } from "./displayData";

export async function getRawData(object) {
  console.log("Getting RAW data");
  return filterRawData(await object);
}

export function filterRawData(object) {
  console.log("Filtering data");
  //console.log(object);
  const address = object.address;
  const description = object.description;
  showDataFunc(address, description);

  //return { address, description };
}
