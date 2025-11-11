/**
 * AI Service - Ürün bilgilerini otomatik doldurmak için
 * Google Gemini API kullanır (ücretsiz tier)
 */

interface ProductInfo {
  description?: string;
  shortDescription?: string;
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
  socialBehavior?: string;
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
  colors?: string[];
  species?: string;
}

/**
 * Google Gemini API ile ürün bilgilerini çıkarır
 */
export const generateProductInfoWithAI = async (
  productName: string,
  category: string
): Promise<ProductInfo> => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key bulunamadı. Lütfen REACT_APP_GEMINI_API_KEY environment variable\'ını ayarlayın.');
  }

  const prompt = `Sen bir akvaryum uzmanısın. "${productName}" adlı ${category} kategorisindeki ürün için detaylı bilgiler ver.

Lütfen aşağıdaki formatta JSON döndür (sadece JSON, başka metin yok):
{
  "description": "Ürünün detaylı açıklaması (2-3 cümle, Türkçe)",
  "shortDescription": "Kısa açıklama (1 cümle, Türkçe)",
  "waterParameters": {
    "temperature": "24-28°C",
    "pH": "6.5-7.5",
    "hardness": "5-12 dGH"
  },
  "size": "Ortalama boyut (örn: 4-6 cm)",
  "difficulty": "Kolay/Orta/Zor",
  "breeding": "Üreme bilgisi (kısa)",
  "diet": "Beslenme bilgisi",
  "lifespan": "Yaşam süresi (örn: 3-5 yıl)",
  "tankSize": "Minimum akvaryum boyutu (örn: 75L)",
  "socialBehavior": "Sosyal davranış (kısa)",
  "quickInfo": {
    "size": "4-6 cm",
    "temperament": "Barışçıl",
    "careLevel": "Kolay"
  },
  "careInfo": {
    "diet": "Omnivor",
    "family": "Aile bilgisi",
    "origin": "Köken bilgisi",
    "aquariumSize": "75L",
    "lifespan": "3-5 yıl"
  },
  "colors": ["Renk1", "Renk2"],
  "species": "Tür bilgisi"
}

Eğer bir bilgiyi bilmiyorsan, o alanı boş string ("") olarak bırak. Sadece JSON döndür, başka hiçbir metin ekleme.`;

  try {
    // Gemini API endpoint (güncel versiyon)
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API hatası: ${response.status} - ${errorData.error?.message || 'Bilinmeyen hata'}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Gemini API\'den yanıt alınamadı');
    }

    // JSON'ı çıkar (eğer başka metin varsa)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON yanıt bulunamadı');
    }

    const productInfo: ProductInfo = JSON.parse(jsonMatch[0]);
    return productInfo;
  } catch (error: any) {
    console.error('AI servis hatası:', error);
    throw new Error(`AI servisi hatası: ${error.message}`);
  }
};

/**
 * Veritabanındaki benzer ürünleri bulur
 */
export const findSimilarProduct = (
  productName: string,
  category: string,
  existingProducts: any[]
): ProductInfo | null => {
  const normalizedName = productName.toLowerCase().trim();
  
  // Kategoriye göre filtrele
  const categoryProducts = existingProducts.filter(p => p.category === category);
  
  if (categoryProducts.length === 0) {
    return null;
  }

  // İsim benzerliğine göre ara
  const similarProduct = categoryProducts.find(product => {
    const productNameLower = product.name?.toLowerCase() || '';
    
    // Tam eşleşme veya kısmi eşleşme
    if (productNameLower.includes(normalizedName) || normalizedName.includes(productNameLower)) {
      return true;
    }
    
    // Kelime bazlı eşleşme
    const nameWords = normalizedName.split(/\s+/);
    const productWords = productNameLower.split(/\s+/);
    const commonWords = nameWords.filter(word => 
      productWords.some((pWord: string) => pWord.includes(word) || word.includes(pWord))
    );
    
    // En az 2 kelime eşleşiyorsa benzer kabul et
    return commonWords.length >= 2;
  });

  if (!similarProduct) {
    return null;
  }

  // Benzer ürünün bilgilerini döndür
  return {
    description: similarProduct.description,
    shortDescription: similarProduct.shortDescription,
    waterParameters: similarProduct.waterParameters,
    size: similarProduct.size,
    difficulty: similarProduct.difficulty,
    breeding: similarProduct.breeding,
    diet: similarProduct.diet,
    lifespan: similarProduct.lifespan,
    tankSize: similarProduct.tankSize,
    socialBehavior: similarProduct.socialBehavior,
    quickInfo: similarProduct.quickInfo,
    careInfo: similarProduct.careInfo,
    colors: similarProduct.colors,
    species: similarProduct.species,
  };
};

