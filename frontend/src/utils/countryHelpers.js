import footballData from "@/utils/footballData.json";

export function getCountrySlug(countryName) {
  return countryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getFootballInfoMap() {
  return footballData.reduce((accumulator, item) => {
    accumulator[item.country.toLowerCase()] = item;
    return accumulator;
  }, {});
}

export function enrichCountries(countries) {
  const footballMap = getFootballInfoMap();

  return countries.map((country) => ({
    ...country,
    slug: getCountrySlug(country.name.common),
    footballInfo: footballMap[country.name.common.toLowerCase()] ?? null
  }));
}
