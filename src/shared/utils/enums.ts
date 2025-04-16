export enum CityEnum {
  Tbilisi = 'Tbilisi',
  Batumi = 'Batumi',
  Kutaisi = 'Kutaisi',
  Chokhatauri = "Chokhatauri",
  Ozurgeti = "Ozurgeti"
}

export enum DistrictEnum {
  GLDANI_NADZALADEVI = "GLDANI_NADZALADEVI",
  MTATSMINDA = "MTATSMINDA",
  DIDUBE_CHUGHURETI = "DIDUBE_CHUGHURETI",
  OLD_TBILISI = "OLD_TBILISI",
  KRTSANISI= "KRTSANISI",
  VAKE = "VAKE",
  SABURTALO = "SABURTALO",
  ISANI_SAMGORI = "ISANI_SAMGORI",
}

export enum CategoryEnum {
  RESTAURANT = "RESTAURANT",
  BARS_NIGHTLIFE = "BARS_NIGHTLIFE",
  SPECIALITY_FOOD = "SPECIALITY_FOOD",
  FOOD_MARKET = "FOOD_MARKET",
  EVENT_PARTIES = "EVENT_PARTIES",
}

export enum AdditionalEnum {
  PET_FRIENDLY = "PET_FRIENDLY",
  VEGAN = "VEGAN",
}

export const subcategories = {
  [CategoryEnum.RESTAURANT]: ['BUFFET', 'DINING', 'CAFE', 'FAST_FOOD', "BAKERY"],
  [CategoryEnum.BARS_NIGHTLIFE]: ['WINE_BAR', 'NIGHT_CLUB', 'PUB', 'BAR'],
  [CategoryEnum.SPECIALITY_FOOD]: ['VEGETARIAN', 'SEAFOOD', 'ICE_CREAM', 'BAKERY'],
  [CategoryEnum.FOOD_MARKET]: ['GROCERY', 'BUTCHER', 'FARMER', 'FISH_MARKET'],
  [CategoryEnum.EVENT_PARTIES]: ['WEDDING', 'CONFERENCE', 'BIRTHDAY', 'BANQUET'],
};

export const eventTypes = {
  'WEDDING': ['CULTURAL', 'SEASONAL', 'MODERN', 'CLASSIC'],
  'BIRTHDAY': ['ADULT', 'TEEN', 'CHILDREN'],
  'BANQUET': ['CORPORATE', 'SEASONAL', 'THEMED', 'FORMAL_GALA'],
};

export type SubCategoryType = typeof CategoryEnum[keyof typeof CategoryEnum];
export type EventType = 'WEDDING' | 'BIRTHDAY' | 'BANQUET';
export type CityType = typeof CityEnum[keyof typeof CityEnum]

// export enum PeopleRangeEnum {
//   RANGE_1_2 = '1-2',
//   RANGE_3_8 = '3-8',
//   RANGE_9_15 = '9-15',
//   RANGE_16_30 = '16-30',
//   RANGE_31_PLUS = '31+',
// }

// export enum PriceRangeEnum {
//   RANGE_0_50 = '0-50',
//   RANGE_50_100 = '50-100',
//   RANGE_100_300 = '100-300',
//   RANGE_300_500 = '300-500',
//   RANGE_500_1000 = '500-1000',
//   RANGE_1000_PLUS = '1000+'
// }


export enum PeopleRangeEnum {
  RANGE_1_2 = "1-2",
  RANGE_3_8 = "3-8",
  RANGE_9_15 = '9-15',
  RANGE_16_30 = '16-30',
  RANGE_31_PLUS = '31+',
}


export enum PriceRangeEnum {
  RANGE_0_50 = "0-50",
  RANGE_50_100 = "50-100",
  RANGE_100_250 = "100-250",
  RANGE_250_500 = "250-500",
  RANGE_1000_PLUS = "1000+"
}