import { PersonData } from "../../sharedDataTypes";
export function getCsvFromFakeData(data: PersonData[]) {
  if (!data[0])
    return [
      ["generate your seed first", "bb"],
      ["ccc", "ddd"],
    ];
  const csvHeaders = Object.keys(data[0]);
  console.log([
    csvHeaders,
    ...data.map((fakePerson) => Object.values(fakePerson)),
  ]);

  return [csvHeaders, ...data.map((fakePerson) => Object.values(fakePerson))];
}
