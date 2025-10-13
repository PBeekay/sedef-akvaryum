export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  images?: string[]; // Multiple images for gallery
  inStock: boolean;
  featured?: boolean;
  new?: boolean;
  // Balık ve Karides özellikleri için ek alanlar
  colors?: string[];
  species?: string;
  color?: string;
  socialBehavior?: string;
  waterParameters?: {
    temperature: string;
    pH: string;
    hardness: string;
  };
  size?: string;
  difficulty?: string;
  breeding?: string;
  diet?: string;
  lifespan?: string;
  tankSize?: string;
  // Yeni eklenen alanlar (Balıklar için)
  quickInfo?: {
    size: string;
    temperament: string;
    careLevel: string;
  };
  careInfo?: {
    diet: string;
    family: string;
    origin: string;
    aquariumSize: string;
    lifespan: string;
  };
  // Bitki özellikleri için ek alanlar
  lightRequirement?: string;
  co2Requirement?: string;
  growthRate?: string;
  placement?: string;
}
