import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { GenerateDataForm, PersonData } from "../sharedDataTypes";
import { createRandomWithSeed } from "./randomNumberUtils";
import { countriesGenerationData } from "../data/countriesData";
import { CountryData } from "../sharedDataTypes";
const PERSON_DATA_KEYS_COUNT = 5;
const MAX_HOUSE_NUMBER = 150;
interface DataContextValue {
  submitFormHandle: (formData: GenerateDataForm) => void;
  fakePeopleData: PersonData[];
  updateData: () => void;
}
export const DataContext = createContext<DataContextValue>({
  submitFormHandle: () => {},
  fakePeopleData: [],
  updateData: () => {},
});
type DataProviderProps = {
  children: JSX.Element;
};

export function DataProvider({ children }: DataProviderProps) {
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [fakePeopleData, setFakePeopleData] = useState<PersonData[]>([]);
  const [dataGenerationInfo, setDataGenerationInfo] =
    useState<GenerateDataForm>({
      seed: 0,
      errorCount: 0,
      region: "",
    });
  const getRandomNumber = useCallback(
    createRandomWithSeed(dataGenerationInfo.seed),
    [
      dataGenerationInfo.region,
      dataGenerationInfo.errorCount,
      dataGenerationInfo.seed,
    ]
  );
  const getRandomNumberError = useCallback(
    createRandomWithSeed(dataGenerationInfo.seed),
    [
      dataGenerationInfo.region,
      dataGenerationInfo.errorCount,
      dataGenerationInfo.seed,
    ]
  );
  useEffect(() => {
    if (dataGenerationInfo.seed) {
      const data: PersonData[] = [];
      for (let i = 0; i < 20; i++) {
        data.push({ ...generatePerson(), idx: i + 1 + "" });
      }
      data.map((person, idx) => generateErrors(person, idx));
      setFakePeopleData(data);
    }
  }, [
    dataGenerationInfo.region,
    dataGenerationInfo.errorCount,
    dataGenerationInfo.seed,
  ]);
  function getRandomIdx(arrLength: number, randNumber: number) {
    return Math.floor(arrLength * randNumber);
  }

  /* ADD PERSON UTILS */
  function getFullName() {
    const { names, surnames } = countryData!;
    const firstName = names[getRandomIdx(names.length, getRandomNumber())];
    const middleName =
      dataGenerationInfo.region !== "Spain"
        ? ` ${names[getRandomIdx(names.length, getRandomNumber())]}`
        : "";
    const lastName = surnames[getRandomIdx(names.length, getRandomNumber())];
    return `${firstName} ${middleName} ${lastName}`;
  }
  function getAddress() {
    const { cities } = countryData!;
    const cityIdx = getRandomIdx(cities.length, getRandomNumber());
    const { cityName, streets } = cities[cityIdx];
    const street = streets[getRandomIdx(streets.length, getRandomNumber())];
    const houseNumber = Math.floor(getRandomNumber() * MAX_HOUSE_NUMBER);
    return `${dataGenerationInfo.region} ${cityName} ${street} ${houseNumber}`;
  }

  function getPhone() {
    const { telephonePrefix } = countryData!;
    return `${telephonePrefix} ${Array.from({ length: 9 }, () =>
      Math.floor(getRandomNumber() * 10)
    ).join("")}`;
  }

  function generatePerson(): Omit<PersonData, "idx"> {
    const randNumber = getRandomNumber();
    const id = randNumber.toString().slice(0, 12);
    const fullName = getFullName();
    const address = getAddress();
    const phone = getPhone();
    return { id, fullName, address, phone };
  }
  function submitFormHandle({ seed, region, errorCount }: GenerateDataForm) {
    setDataGenerationInfo({ seed, region, errorCount });
    setCountryData(countriesGenerationData[region]);
    setFakePeopleData([]);
  }
  function updateData() {
    const newDataEntries: PersonData[] = [];
    for (let i = 0; i < 10; i++) {
      newDataEntries.push({
        ...generatePerson(),
        idx: fakePeopleData.length + i + 1 + "",
      });
      newDataEntries.map((person) =>
        generateErrors(person, fakePeopleData.length + i)
      );
    }
    setFakePeopleData((prevData) => [...prevData, ...newDataEntries]);
  }

  /* ERROR UTILS */
  function getRandomPersonDataField(
    fieldIdx: number,
    personFields: (keyof PersonData)[]
  ): keyof PersonData {
    return personFields[fieldIdx];
  }
  function handleErrorAdding(personData: PersonData, personIdx: number) {
    const toModifyField = getRandomPersonDataField(
      Math.floor(getRandomNumber() * PERSON_DATA_KEYS_COUNT),
      ["idx", "address", "fullName", "id", "phone"]
    );
    const fieldData = personData[toModifyField];
    personData[toModifyField] = getRandomErrorFunction()(fieldData);
    setFakePeopleData((prevFakePeopleData) =>
      prevFakePeopleData.map((data, idx) => {
        if (idx === personIdx) return personData;
        return data;
      })
    );
  }
  function generateErrors(personData: PersonData, personIdx: number) {
    const { errorCount } = dataGenerationInfo;
    if (errorCount < 1) {
      if (errorCount > getRandomNumberError()) {
        handleErrorAdding(personData, personIdx);
      }
      return;
    }
    for (let i = 0; i < Math.floor(errorCount); i++) {
      handleErrorAdding(personData, personIdx);
    }
  }
  function getRandomErrorFunction() {
    const errorFunctions = [
      getSwappedCharactersString,
      getDeletedCharcterString,
      getAddChracterString,
    ];
    const length = errorFunctions.length;
    return errorFunctions[getRandomIdx(length, getRandomNumberError())];
  }
  function getSwappedCharactersString(data: string) {
    const swapIdx = getRandomIdx(data.length, getRandomNumberError());
    const swapIdx2 = data.length - 1 - swapIdx;
    const dataToSwap = data.split("");
    const temp = dataToSwap[swapIdx2];
    dataToSwap[swapIdx2] = data[swapIdx];
    dataToSwap[swapIdx] = temp;
    return dataToSwap.join("");
  }
  function getDeletedCharcterString(data: string) {
    const dataLength = data.length;
    const toDeleteIdx = getRandomIdx(dataLength, getRandomNumberError());
    return data.slice(0, toDeleteIdx - 1) + data.slice(toDeleteIdx);
  }
  function getAddChracterString(data: string) {
    const dataLength = data.length;
    const addAtIdx = getRandomIdx(dataLength, getRandomNumberError());
    return (
      data.slice(0, addAtIdx) +
      Math.floor(getRandomNumberError() * 26 + 10) +
      data.slice(addAtIdx)
    );
  }
  return (
    <DataContext.Provider
      value={{ submitFormHandle, fakePeopleData, updateData }}
    >
      {children}
    </DataContext.Provider>
  );
}
export default DataProvider;
export const useDataCtx = () => useContext(DataContext);

// 1) Index (1, 2, 3, ...)
// 2) Random identifier
// 3) Name + middle name + last name (in region format)
// 4) Address (in several possible formats, e.g. city+street+building+appartment or county+city+street+house)
// 5) Phone (again, it's great to have several formats, e.g. international or local ones)
