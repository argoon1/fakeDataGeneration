export type GenerateDataForm = {
  region: string;
  errorCount: number;
  seed: number;
};
export type PersonData = {
  idx: number;
  id: string;
  fullName: string;
  address: string;
  phone: string;
};
type CityData = {
  cityName: string;
  streets: string[];
};
export type CountryData = {
  names: string[];
  surnames: string[];
  telephonePrefix: string;
  cities: CityData[];
};
export type CountriesData = {
  [key: string]: CountryData;
};
