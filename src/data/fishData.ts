import { Product } from '../types/Product';

export const fishData: Product[] = [
  // Tropical Fish
  {
    id: 'fish-tropical-1',
    name: 'Neon Tetra',
    category: 'fish',
    price: 8.99,
    description: 'Parlak mavi ve kırmızı renkli Neon Tetra, topluluk tankları için mükemmel. Barışçıl doğası ve güzel renkleriyle popüler.',
    shortDescription: 'Parlak mavi ve kırmızı renkli Neon Tetra.',
    image: 'https://images.unsplash.com/photo-1737688670910-084f54254e73?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    inStock: true,
    featured: true,
    species: 'Paracheirodon innesi',
    color: 'Mavi-Kırmızı',
    socialBehavior: 'Barışçıl, grup halinde yaşar',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.0-7.5',
      hardness: '1-10 dGH'
    },
    size: '3-4 cm',
    difficulty: 'Kolay',
    breeding: 'Orta zorlukta',
    diet: 'Omnivor',
    lifespan: '3-5 yıl',
    tankSize: 'Minimum 40L'
  },
  {
    id: 'fish-tropical-2',
    name: 'Guppy',
    category: 'fish',
    price: 6.99,
    description: 'Renkli ve canlı Guppy, yeni başlayanlar için ideal. Hızlı üreme ve dayanıklı yapısıyla bilinir.',
    shortDescription: 'Renkli ve canlı Guppy, yeni başlayanlar için ideal.',
    image: 'https://images.unsplash.com/photo-1706479980962-23942d2f4d56?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    inStock: true,
    new: true,
    species: 'Poecilia reticulata',
    color: 'Çok Renkli',
    socialBehavior: 'Barışçıl, aktif',
    waterParameters: {
      temperature: '22-28°C',
      pH: '7.0-8.0',
      hardness: '10-20 dGH'
    },
    size: '3-6 cm',
    difficulty: 'Çok Kolay',
    breeding: 'Çok Kolay',
    diet: 'Omnivor',
    lifespan: '2-3 yıl',
    tankSize: 'Minimum 30L'
  },
  {
    id: 'fish-tropical-3',
    name: 'Platy',
    category: 'fish',
    price: 7.99,
    description: 'Dayanıklı ve renkli Platy, topluluk tankları için mükemmel. Barışçıl doğası ve kolay bakımıyla popüler.',
    shortDescription: 'Dayanıklı ve renkli Platy, topluluk tankları için mükemmel.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuhS03Mu9OcduqSgOAL5s3MdsBB9JY-DjX9qs_NW6yJWkkmLmF_4u5NT71jEk1Jv0Coek&usqp=CAU',
    inStock: true,
    species: 'Xiphophorus maculatus',
    color: 'Turuncu, Kırmızı, Sarı',
    socialBehavior: 'Barışçıl, sosyal',
    waterParameters: {
      temperature: '20-26°C',
      pH: '7.0-8.0',
      hardness: '10-20 dGH'
    },
    size: '4-6 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay',
    diet: 'Omnivor',
    lifespan: '3-4 yıl',
    tankSize: 'Minimum 40L'
  },
  {
    id: 'fish-tropical-4',
    name: 'Swordtail',
    category: 'fish',
    price: 9.99,
    description: 'Kılıç şeklinde kuyruğu olan Swordtail, etkileyici görünümü ve barışçıl doğasıyla dikkat çeker.',
    shortDescription: 'Kılıç şeklinde kuyruğu olan Swordtail.',
    image: 'https://azgardens.com/wp-content/uploads/2017/06/Red-Velvet-Swordtail-Fish-in-a-Freshwater-Aquarium.jpg',
    inStock: true,
    species: 'Xiphophorus hellerii',
    color: 'Kırmızı, Turuncu, Yeşil',
    socialBehavior: 'Barışçıl, aktif',
    waterParameters: {
      temperature: '22-28°C',
      pH: '7.0-8.0',
      hardness: '10-20 dGH'
    },
    size: '8-12 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay',
    diet: 'Omnivor',
    lifespan: '3-5 yıl',
    tankSize: 'Minimum 60L'
  },
  {
    id: 'fish-tropical-5',
    name: 'Molly',
    category: 'fish',
    price: 8.99,
    description: 'Dayanıklı Molly, tuzlu su toleransı ve güzel renkleriyle bilinir. Yeni başlayanlar için mükemmel.',
    shortDescription: 'Dayanıklı Molly, tuzlu su toleransı ile bilinir.',
    image: 'https://www.shutterstock.com/image-photo/selective-focus-black-molly-poecilia-600nw-2317388601.jpg',
    inStock: true,
    species: 'Poecilia sphenops',
    color: 'Siyah, Beyaz, Sarı',
    socialBehavior: 'Barışçıl, grup halinde yaşar',
    waterParameters: {
      temperature: '22-28°C',
      pH: '7.0-8.0',
      hardness: '10-25 dGH'
    },
    size: '5-8 cm',
    difficulty: 'Kolay',
    breeding: 'Kolay',
    diet: 'Omnivor',
    lifespan: '3-5 yıl',
    tankSize: 'Minimum 50L'
  },
  {
    id: 'fish-tropical-6',
    name: 'Zebra Danio',
    category: 'fish',
    price: 5.99,
    description: 'Zebra çizgili Danio, aktif ve dayanıklı yapısıyla bilinir. Soğuk su toleransı vardır.',
    shortDescription: 'Zebra çizgili Danio, aktif ve dayanıklı yapısıyla bilinir.',
    image: 'https://cdn.britannica.com/96/219196-050-9DD604F0/Zebra-Fish-Danio-Zebrafish.jpg',
    inStock: true,
    species: 'Danio rerio',
    color: 'Mavi-Beyaz Çizgili',
    socialBehavior: 'Barışçıl, grup halinde yaşar',
    waterParameters: {
      temperature: '18-26°C',
      pH: '6.5-7.5',
      hardness: '5-15 dGH'
    },
    size: '4-5 cm',
    difficulty: 'Çok Kolay',
    breeding: 'Orta zorlukta',
    diet: 'Omnivor',
    lifespan: '3-5 yıl',
    tankSize: 'Minimum 40L'
  },
  {
    id: 'fish-tropical-7',
    name: 'Harlequin Rasbora',
    category: 'fish',
    price: 7.99,
    description: 'Güzel renkli Harlequin Rasbora, barışçıl doğası ve grup halinde yaşama özelliğiyle bilinir.',
    shortDescription: 'Güzel renkli Harlequin Rasbora, barışçıl doğası ile bilinir.',
    image: 'https://cdn.balikturleri.com/wp-content/uploads/2023/08/Harlequin-Rasbora1-1.jpg',
    inStock: true,
    species: 'Trigonostigma heteromorpha',
    color: 'Turuncu-Siyah',
    socialBehavior: 'Barışçıl, grup halinde yaşar',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.0-7.5',
      hardness: '1-10 dGH'
    },
    size: '4-5 cm',
    difficulty: 'Kolay',
    breeding: 'Zor',
    diet: 'Omnivor',
    lifespan: '4-6 yıl',
    tankSize: 'Minimum 50L'
  },
  {
    id: 'fish-tropical-8',
    name: 'Cherry Barb',
    category: 'fish',
    price: 6.99,
    description: 'Kırmızı renkli Cherry Barb, barışçıl doğası ve güzel görünümüyle topluluk tankları için ideal.',
    shortDescription: 'Kırmızı renkli Cherry Barb, barışçıl doğası ile ideal.',
    image: 'https://www.liveaquaria.com/images/categories/large/lg_89754_Cherry_Barb.jpg',
    inStock: true,
    species: 'Puntius titteya',
    color: 'Kırmızı',
    socialBehavior: 'Barışçıl, grup halinde yaşar',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.5-7.5',
      hardness: '5-15 dGH'
    },
    size: '4-5 cm',
    difficulty: 'Kolay',
    breeding: 'Orta zorlukta',
    diet: 'Omnivor',
    lifespan: '4-6 yıl',
    tankSize: 'Minimum 50L'
  },
  {
    id: 'fish-tropical-9',
    name: 'White Cloud Mountain Minnow',
    category: 'fish',
    price: 4.99,
    description: 'Soğuk su toleransı olan White Cloud, dayanıklı yapısı ve güzel renkleriyle bilinir.',
    shortDescription: 'Soğuk su toleransı olan White Cloud, dayanıklı yapısı ile bilinir.',
    image: 'https://coburgaquarium.com.au/cdn/shop/products/whitecloudfish.jpg?v=1671682307',
    inStock: true,
    species: 'Tanichthys albonubes',
    color: 'Gümüş-Kırmızı',
    socialBehavior: 'Barışçıl, grup halinde yaşar',
    waterParameters: {
      temperature: '16-24°C',
      pH: '6.5-7.5',
      hardness: '5-15 dGH'
    },
    size: '3-4 cm',
    difficulty: 'Çok Kolay',
    breeding: 'Kolay',
    diet: 'Omnivor',
    lifespan: '3-5 yıl',
    tankSize: 'Minimum 30L'
  },
  {
    id: 'fish-tropical-10',
    name: 'Cardinal Tetra',
    category: 'fish',
    price: 12.99,
    description: 'Neon Tetranın büyük kuzeni Cardinal Tetra, daha büyük boyutu ve canlı renkleriyle dikkat çeker.',
    shortDescription: 'Neon Tetranın büyük kuzeni Cardinal Tetra.',
    image: 'https://cdn.balikturleri.com/wp-content/uploads/2023/08/Cardinal-Tetra3.jpg',
    inStock: true,
    featured: true,
    species: 'Paracheirodon axelrodi',
    color: 'Mavi-Kırmızı',
    socialBehavior: 'Barışçıl, grup halinde yaşar',
    waterParameters: {
      temperature: '23-27°C',
      pH: '5.5-7.0',
      hardness: '1-8 dGH'
    },
    size: '4-5 cm',
    difficulty: 'Orta',
    breeding: 'Zor',
    diet: 'Omnivor',
    lifespan: '4-6 yıl',
    tankSize: 'Minimum 60L'
  },
  {
    id: 'fish-tropical-11',
    name: 'Rummy Nose Tetra',
    category: 'fish',
    price: 9.99,
    description: 'Kırmızı burunlu Rummy Nose Tetra, hassas su parametreleri ve güzel görünümüyle bilinir.',
    shortDescription: 'Kırmızı burunlu Rummy Nose Tetra, hassas su parametreleri ile bilinir.',
    image: 'https://cdn.balikturleri.com/wp-content/uploads/2023/08/Rummy-Nose-Tetra-1.jpg',
    inStock: true,
    species: 'Hemigrammus rhodostomus',
    color: 'Gümüş-Kırmızı Burun',
    socialBehavior: 'Barışçıl, grup halinde yaşar',
    waterParameters: {
      temperature: '24-28°C',
      pH: '6.0-7.0',
      hardness: '1-8 dGH'
    },
    size: '4-5 cm',
    difficulty: 'Orta',
    breeding: 'Zor',
    diet: 'Omnivor',
    lifespan: '4-6 yıl',
    tankSize: 'Minimum 60L'
  },
  {
    id: 'fish-tropical-12',
    name: 'Black Phantom Tetra',
    category: 'fish',
    price: 8.99,
    description: 'Siyah renkli Black Phantom Tetra, zarif görünümü ve barışçıl doğasıyla dikkat çeker.',
    shortDescription: 'Siyah renkli Black Phantom Tetra, zarif görünümü ile dikkat çeker.',
    image: 'https://cdn.balikturleri.com/wp-content/uploads/2023/09/Black-Phantom-Tetra1-1.jpg',
    inStock: true,
    species: 'Hyphessobrycon megalopterus',
    color: 'Siyah-Gümüş',
    socialBehavior: 'Barışçıl, grup halinde yaşar',
    waterParameters: {
      temperature: '22-26°C',
      pH: '6.0-7.5',
      hardness: '1-15 dGH'
    },
    size: '4-5 cm',
    difficulty: 'Kolay',
    breeding: 'Orta zorlukta',
    diet: 'Omnivor',
    lifespan: '4-6 yıl',
    tankSize: 'Minimum 50L'
  }
];

export const getFishByCategory = (category: string): Product[] => {
  return fishData.filter(fish => fish.category === category);
};

export const getFeaturedFish = (): Product[] => {
  return fishData.filter(fish => fish.featured);
};

export const getNewFish = (): Product[] => {
  return fishData.filter(fish => fish.new);
};
