export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  benefits: string[];
  ingredients: string[];
  imageUrl: string;
}

export class PetWipes implements Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly features: string[],
    public readonly benefits: string[],
    public readonly ingredients: string[],
    public readonly imageUrl: string
  ) {}
} 