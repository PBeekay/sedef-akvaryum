export interface CategoryInfo {
    name: string;
    description: {
        short: string;
        tips: string[];
    };
    seo: {
        title: string;
        description: string;
        keywords: string;
    };
}

export const categoryConfig: Record<string, CategoryInfo> = {
    fish: {
        name: 'Balıklar',
        description: {
            short: 'Renkli tropikal balıklardan dayanıklı japon balıklarına kadar geniş akvaryum balıkları koleksiyonumuz.',
            tips: ['Grup halinde yaşayan türler için en az 5-6 adet tercih edin', 'Su parametrelerine dikkat edin', 'Yeni balıkları karantinaya alın']
        },
        seo: {
            title: 'Akvaryum Balıkları | Sedef Akvaryum Eskişehir',
            description: 'Eskişehir\'de süs balığı satışı. Guppy, platy, betta, discus, tetra ve daha fazla akvaryum balığı çeşidi.',
            keywords: 'akvaryum balıkları, süs balığı, guppy, platy, betta, discus, tetra, eskişehir balık'
        }
    },
    shrimp: {
        name: 'Karidesler',
        description: {
            short: 'Neocaridina ve Caridina türleri ile akvaryumunuzu renklendirin. Bakımı kolay ve sağlıklı karides türleri.',
            tips: ['Stabil su parametreleri çok önemli', 'Yeterli saklanma yeri sağlayın', 'Kaliteli karides yemi kullanın']
        },
        seo: {
            title: 'Akvaryum Karidesleri - Neocaridina, Caridina | Sedef Akvaryum',
            description: 'Eskişehir\'de akvaryum karidesi satışı. Neocaridina, Caridina ve diğer akvaryum karidesi türleri.',
            keywords: 'akvaryum karidesleri, neocaridina, caridina, karides satışı, eskişehir karides'
        }
    },
    plants: {
        name: 'Bitkiler',
        description: {
            short: 'Akvaryumunuzda doğal canlı ekosistem oluşturacak canlı su altı bitkileri.',
            tips: ['Düzenli gübreleme yapın', 'Işık ihtiyacına dikkat edin', 'Kök yapısına uygun substrat kullanın']
        },
        seo: {
            title: 'Akvaryum Bitkileri | Sedef Akvaryum',
            description: 'Eskişehir\'de akvaryum bitkisi satışı. Tatlı su akvaryum bitkileri ve canlı akvaryum bitki çeşitleri.',
            keywords: 'akvaryum bitkileri, canlı bitkiler, tatlı su bitkileri, eskişehir akvaryum bitkisi'
        }
    },
    equipment: {
        name: 'Ekipmanlar',
        description: {
            short: 'Akvaryumunuz için gerekli profesyonel filtreler, ısıtıcılar, aydınlatma ve kurulum ürünleri.',
            tips: ['Tank boyutuna uygun filtre seçin', 'Yedek ekipman bulundurun', 'Düzenli bakım yapın']
        },
        seo: {
            title: 'Akvaryum Ekipmanları | Sedef Akvaryum',
            description: 'Akvaryum filtresi, akvaryum ışığı, akvaryum ısıtıcısı, hava pompası ve tüm akvaryum malzemeleri.',
            keywords: 'akvaryum ekipmanları, akvaryum filtresi, akvaryum ışığı, akvaryum ısıtıcısı'
        }
    },
    accessories: {
        name: 'Akvaryum Aksesuarı',
        description: {
            short: 'Balık ve karideslerinizin sağlığı için gerekli bakım ürünleri. Su testleri, ilaçlar ve sağlık malzemeleri.',
            tips: ['Düzenli su testleri yapın', 'Hastalık belirtilerini takip edin', 'Veteriner tavsiyesi alın']
        },
        seo: {
            title: 'Akvaryum Aksesuarları - Dekorasyon ve Aksesuar | Sedef Akvaryum',
            description: 'Eskişehir\'de akvaryum aksesuarları. Akvaryum dekorasyon, akvaryum süsleri, akvaryum taşları, kökleri ve tüm akvaryum aksesuar çeşitleri. Akvaryumunuzu güzelleştirin.',
            keywords: 'akvaryum aksesuarları, akvaryum dekorasyon, akvaryum süsleri, akvaryum taşları, akvaryum kökü, eskişehir akvaryum aksesuar, akvaryum malzemeleri'
        }
    },
    food: {
        name: 'Yemler',
        description: {
            short: 'Balık ve karidesleriniz için yüksek kaliteli besleyici yemler. Dengeli ve sağlıklı beslenme.',
            tips: ['Günde 2-3 kez az miktarda yem verin', 'Çeşitli yem türleri kullanın', 'Fazla yem vermeyin']
        },
        seo: {
            title: 'Akvaryum Yemleri | Sedef Akvaryum',
            description: 'Eskişehir\'de akvaryum yemi satışı. Balık yemi, karides yemi, toz yem ve tablet yem çeşitleri.',
            keywords: 'akvaryum yemleri, balık yemi, karides yemi, eskişehir akvaryum yemi'
        }
    }
};

// Helper to safely get category name
export const getCategoryName = (categoryId: string): string => {
    return categoryConfig[categoryId]?.name || 'Akvaryum Ürünü';
};
