// Common types
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}

// Cocktails types
export interface Cocktail {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  imageUrl?: string;
  rating?: number;
}

export interface CocktailsListResponse {
  items: Cocktail[];
  total: number;
  skip: number;
  take: number;
}

// Ingredient types
export enum UofMType {
  None = 'none',
  Ounces = 'ounces',
  Dashes = 'dashes',
  Tablespoon = 'tablespoon',
  TopOff = 'topoff',
  Item = 'item',
  Teaspoon = 'teaspoon',
  ToTaste = 'toTaste',
  Barspoon = 'barspoon',
  Cups = 'cups',
  Splash = 'splash',
  Discretion = 'discretion'
}

export enum IngredientRequirementType {
  None = 'none',
  Optional = 'optional',
  Required = 'required'
}

export enum PreparationType {
  None = 'none',
  Chilled = 'chilled',
  FreshlySqueezed = 'freshlySqueezed',
  PeeledAndJuiced = 'peeledAndJuiced',
  FreshlyGrated = 'freshlyGrated',
  Quartered = 'quartered',
  FreshPressed = 'freshPressed'
}

export enum IngredientType {
  Herb = 'herb',
  Fruit = 'fruit',
  Juice = 'juice',
  Bitters = 'bitters',
  Syrup = 'syrup',
  Protein = 'protein',
  Flowers = 'flowers',
  Sauce = 'sauce',
  Vegetable = 'vegetable',
  Dilution = 'dilution',
  Beer = 'beer',
  Spirit = 'spirit',
  Liqueur = 'liqueur',
  Wine = 'wine',
  Champagne = 'champagne'
}

export enum IngredientApplication {
  Base = 'base',
  Garnishment = 'garnishment'
}

export interface Ingredient {
  name: string;
  uoM: UofMType;
  requirement: IngredientRequirementType;
  display: string;
  units: number;
  preparation: PreparationType;
  suggestions?: string;
  types: IngredientType[];
  applications: IngredientApplication[];
}

export interface InstructionStep {
  display: string;
  order: number;
}

// Account types
export interface AccountAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AccountProfile {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  displayName: string;
  primaryAddress: AccountAddress;
}

// Legal types
export interface LegalDocument {
  document: string;
  format: 'text' | 'html';
} 