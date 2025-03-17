export enum CityEnum {
  Tbilisi = 'Tbilisi',
  Batumi = 'Batumi',
  Kutaisi = 'Kutaisi',
}

export enum DistrictEnum {
  GLDANI_NADZALADEVI = 'Gldani Nadzaladevi',
  MTATSMINDA = 'Mtatsminda',
  DIDUBE_CHUGHURETI = 'Didube Chughureti',
  OLD_TBILISI = 'Old Tbilisi',
  KRTSANISI= "Krtsanisi",
  VAKE = 'Vake',
  SABURTALO = 'Saburtalo',
  ISANI_SAMGORI = 'Isani Samgori',
}

export enum CategoryEnum {
  RESTAURANT = 'Restaurant',
  BARS_AND_NIGHTLIFE = 'Bars and Nightlife',
  SPECIALITY_FOOD = 'Speciality Food',
  FOOD_MARKET = 'Food Market',
  EVENT_AND_PARTIES = 'Event and Parties',
}

export const subcategories = {
  [CategoryEnum.RESTAURANT]: ['Buffet', 'Dining', 'Cafe', 'fast food'],
  [CategoryEnum.BARS_AND_NIGHTLIFE]: ['Wine bar', 'Night Club', 'Pub', 'Bar'],
  [CategoryEnum.SPECIALITY_FOOD]: ['Vegetarian', 'Seafood', 'Ice cream', 'Bakery'],
  [CategoryEnum.FOOD_MARKET]: ['Grocery', 'Butcher', 'Farmer', 'Fish market'],
  [CategoryEnum.EVENT_AND_PARTIES]: ['Wedding', 'Conference', 'Birthday', 'Banquet'],
};

export const eventTypes = {
  'Wedding': ['Cultural', 'Seasonal', 'Modern', 'Classic'],
  'Birthday': ['Adult', 'Teen', 'Children'],
  'Banquet': ['Corporate', 'Seasonal', 'Themed', 'Formal Gala'],
};

export type SubCategoryType = typeof CategoryEnum[keyof typeof CategoryEnum];
export type EventType = 'Wedding' | 'Birthday' | 'Banquet';

export enum PeopleRangeEnum {
  RANGE_1_2 = '1-2',
  RANGE_3_8 = '3-8',
  RANGE_9_15 = '9-15',
  RANGE_16_30 = '16-30',
  RANGE_31_PLUS = '31+',
}

export enum PriceRangeEnum {
  RANGE_0_50 = '0-50',
  RANGE_50_100 = '50-100',
  RANGE_100_300 = '100-300',
  RANGE_300_500 = '300-500',
  RANGE_500_1000 = '500-1000',
  RANGE_1000_PLUS = '1000+'
}
