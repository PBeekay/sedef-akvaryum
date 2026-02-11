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
        name: 'Süs Balığı',
        description: {
            short: 'Renkli tropikal balıklardan dayanıklı japon balıklarına kadar geniş koleksiyonumuz. Yeni başlayanlar ve deneyimli akvaryumcular için ideal.',
            tips: ['Grup halinde yaşayan türler için en az 5-6 adet alın', 'Su parametrelerine dikkat edin', 'Yeni balıkları karantinaya alın']
        },
        seo: {
            title: 'Süs Balığı - Akvaryum Balıkları | Sedef Akvaryum Eskişehir',
            description: 'Eskişehir\'de süs balığı satışı. Guppy, platy, betta, discus, tetra ve daha fazla akvaryum balığı çeşidi. Akvaryum balığı fiyatları ve bakım bilgileri. Kaliteli süs balıkları için akvaryum mağazamızı ziyaret edin.',
            keywords: 'akvaryum balığı, süs balığı, akvaryum balıkları, guppy, platy, betta, discus, tetra, eskişehir balık, akvaryum balığı satışı, akvaryum balığı fiyatları'
        }
    },
    shrimp: {
        name: 'Akvaryum Karidesi',
        description: {
            short: 'Neocaridina türleri ile akvaryumunuzu renklendirin. Hem güzel hem de tankınızı temiz tutan bu dostlar bakımı kolay türlerdir.',
            tips: ['Stabil su parametreleri çok önemli', 'Yeterli saklanma yeri sağlayın', 'Kaliteli karides yemi kullanın']
        },
        seo: {
            title: 'Akvaryum Karidesi - Neocaridina, Caridina | Sedef Akvaryum',
            description: 'Eskişehir\'de akvaryum karidesi satışı. Neocaridina, Caridina ve diğer akvaryum karidesı türleri. Akvaryum karides bakımı ve fiyatları. Sağlıklı akvaryum karideslerini mağazamızdan temin edin.',
            keywords: 'akvaryum karidesi, neocaridina, caridina, akvaryum karides, karides satışı, eskişehir karides, akvaryum karides bakımı, akvaryum karides fiyatları'
        }
    },
    plants: {
        name: 'Akvaryum Bitkisi',
        description: {
            short: 'Akvaryumunuzda doğal bir görünüm sağlayacak bitki türleri. Düşük ışıkta bile gelişen dayanıklı bitkiler.',
            tips: ['Düzenli gübreleme yapın', 'Işık ihtiyacına dikkat edin', 'Kök yapısına uygun substrat kullanın']
        },
        seo: {
            title: 'Akvaryum Bitkisi - Akvaryum Bitkileri | Sedef Akvaryum',
            description: 'Eskişehir\'de akvaryum bitkisi satışı. Tatlı su akvaryum bitkileri, bitki bakımı ve akvaryum bitki fiyatları. Akvaryumunuz için kaliteli bitkiler ve akvaryum bitki gübresi.',
            keywords: 'akvaryum bitkisi, akvaryum bitkileri, akvaryum bitki satışı, tatlı su bitkileri, eskişehir akvaryum bitkisi, akvaryum bitki bakımı, akvaryum bitki gübresi'
        }
    },
    equipment: {
        name: 'Akvaryum Ekipmanı',
        description: {
            short: 'Akvaryumunuz için gerekli tüm ekipmanlar. Filtreler, ısıtıcılar, aydınlatma ve daha fazlası.',
            tips: ['Tank boyutuna uygun filtre seçin', 'Yedek ekipman bulundurun', 'Düzenli bakım yapın']
        },
        seo: {
            title: 'Akvaryum Ekipmanları - Akvaryum Filtresi, Işık | Sedef Akvaryum',
            description: 'Eskişehir\'de akvaryum ekipmanları. Akvaryum filtresi, akvaryum ışığı, akvaryum ısıtıcısı, hava pompası ve tüm akvaryum malzemeleri. Akvaryum kurulumu için gerekli ekipmanlar.',
            keywords: 'akvaryum ekipmanları, akvaryum filtresi, akvaryum ışığı, akvaryum ısıtıcısı, akvaryum pompası, eskişehir akvaryum ekipman, akvaryum kurulumu, akvaryum malzemeleri'
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
        name: 'Akvaryum Yemi',
        description: {
            short: 'Balık ve karidesleriniz için yüksek kaliteli yemler. Dengeli beslenme için özel formüller.',
            tips: ['Günde 2-3 kez az miktarda yem verin', 'Çeşitli yem türleri kullanın', 'Fazla yem vermeyin']
        },
        seo: {
            title: 'Akvaryum Yemi - Balık Yemi, Karides Yemi | Sedef Akvaryum',
            description: 'Eskişehir\'de akvaryum yemi satışı. Balık yemi, karides yemi, toz yem ve tablet yem çeşitleri. Kaliteli akvaryum yemleri ile sağlıklı beslenme. Akvaryum yem fiyatları.',
            keywords: 'akvaryum yemi, balık yemi, karides yemi, akvaryum yem satışı, toz yem, tablet yem, eskişehir akvaryum yemi, akvaryum yem fiyatları'
        }
    }
};

// Helper to safely get category name
export const getCategoryName = (categoryId: string): string => {
    return categoryConfig[categoryId]?.name || 'Akvaryum Ürünü';
};
