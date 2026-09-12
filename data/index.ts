import {
  World,
  Arrival,
  ConfigStep,
  BuildLayer,
  Match,
  Collection,
  Article,
  Compatibility,
} from "@/types";

export const WORLDS: World[] = [
  {
    id: "fish",
    tag: "Balıklar",
    headline: "Suyun İçindeki Yaşamı Keşfet.",
    body: "Tetra sürülerinden bettaların sakin duruşuna kadar, her tank kendi karakterini taşır.",
    items: ["Tetra", "Rasbora", "Betta", "Canlı Doğuranlar", "Cichlid", "Dip Balıkları"],
    cta: "Balıkları Keşfet",
    hue: "160 28% 14%",
    accent: "#6fa98c",
  },
  {
    id: "shrimp",
    tag: "Karidesler",
    headline: "Küçük Canlılar. Büyük Dünyalar.",
    body: "Nano bir tank, geniş bir ekosistem olabilir. Karidesler bunun en zarif kanıtı.",
    items: ["Neocaridina", "Caridina", "Amano"],
    cta: "Karidesleri Keşfet",
    hue: "9 32% 16%",
    accent: "#c9846f",
  },
  {
    id: "plants",
    tag: "Bitkiler",
    headline: "Doğayı Suyun Altına Taşı.",
    body: "Ön plandan arka plana, her kat kendi ışığını ve ritmini ister.",
    items: ["Foreground", "Midground", "Background", "Epiphytes", "Moss"],
    cta: "Bitkileri Keşfet",
    hue: "150 30% 13%",
    accent: "#8fb59a",
  },
  {
    id: "gear",
    tag: "Ekipman",
    headline: "Bir Ekosistemin Parçalarını Kur.",
    body: "Filtrasyon, ışık, ısı ve CO₂ — görünmeyen ama her şeyi mümkün kılan katman.",
    items: ["Filtrasyon", "Aydınlatma", "Isıtma", "CO₂", "Substrat", "Hava Motorları"],
    cta: "Ekipmanı Keşfet",
    hue: "200 14% 14%",
    accent: "#8f9fa0",
  },
  {
    id: "care",
    tag: "Sağlık ve Bakım",
    headline: "Suyun Dengesini ve Canlı Sağlığını Koru.",
    body: "Su düzenleyiciler, bakteri kültürleri, test kitleri ve bitki gübreleri — biyolojik dengenin temel güvencesi.",
    items: ["Su Düzenleyici", "Bakteri Kültürü", "Bitki Gübresi", "Su Test Kiti", "İlaç & Bakım", "Alg Önleyici"],
    cta: "Bakım Ürünlerini Keşfet",
    hue: "185 28% 14%",
    accent: "#5ea3a3",
  },
  {
    id: "food",
    tag: "Yem",
    headline: "Türlere Özel Zengin ve Doğal Beslenme.",
    body: "Pul, granül, tablet ve dondurulmuş yemler — canlılarınızın renklerini ve canlılığını ortaya çıkaran zengin besinler.",
    items: ["Pul Yem", "Granül Yem", "Dip Yemi", "Karides Yemi", "Spirulina", "Artemia"],
    cta: "Yemleri Keşfet",
    hue: "34 32% 16%",
    accent: "#d4a359",
  },
];

export const ARRIVALS: Arrival[] = [
  { name: "Blue Dream Shrimp", label: "Yeni Geldi", cat: "Karidesler", accent: "#c9846f" },
  { name: "Galaxy Rasbora", label: "Mevcut", cat: "Balıklar", accent: "#6fa98c" },
  { name: "Anubias Nana Petite", label: "Bitki", cat: "Bitkiler", accent: "#8fb59a" },
  { name: "Seachem Prime", label: "Mevcut", cat: "Sağlık ve Bakım", accent: "#5ea3a3" },
  { name: "Hikari Micro Pellets", label: "Yeni Geldi", cat: "Yem", accent: "#d4a359" },
  { name: "Eheim Classic Filtre", label: "Mevcut", cat: "Ekipman", accent: "#8f9fa0" },
  { name: "Crystal Red Shrimp", label: "Stok Sorunuz", cat: "Karidesler", accent: "#c9846f" },
  { name: "Cardinal Tetra", label: "Mevcut", cat: "Balıklar", accent: "#6fa98c" },
  { name: "Bucephalandra Kedagang", label: "Yeni Geldi", cat: "Bitkiler", accent: "#8fb59a" },
  { name: "Tropica Specialised", label: "Mevcut", cat: "Sağlık ve Bakım", accent: "#5ea3a3" },
  { name: "Dennerle Shrimp King", label: "Yeni Geldi", cat: "Yem", accent: "#d4a359" },
  { name: "Chihiros WRGB II LED", label: "Mevcut", cat: "Ekipman", accent: "#8f9fa0" },
];

export const CONFIG_STEPS: ConfigStep[] = [
  {
    q: "Akvaryumun kaç litre?",
    key: "volume",
    options: ["30 L", "60 L", "100 L", "200 L+"],
  },
  {
    q: "Nasıl bir dünya istiyorsun?",
    key: "style",
    options: ["Nature Aquarium", "Community", "Shrimp", "Betta", "Iwagumi", "Jungle"],
  },
  {
    q: "Deneyim seviyen?",
    key: "level",
    options: ["İlk Akvaryumum", "Deneyimliyim", "İleri Seviye"],
  },
];

export const BUILD_LAYERS: BuildLayer[] = [
  { n: "01", label: "Akvaryum" },
  { n: "02", label: "Filtrasyon" },
  { n: "03", label: "Aydınlatma" },
  { n: "04", label: "Substrat" },
  { n: "05", label: "Hardscape" },
  { n: "06", label: "Bitkiler" },
  { n: "07", label: "Canlılar" },
];

export const MATCHES: Match[] = [
  { name: "Cardinal Tetra", fit: 94 },
  { name: "Harlequin Rasbora", fit: 91 },
  { name: "Honey Gourami", fit: 83 },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "nature",
    name: "Nature",
    title: "NATURE 60",
    volume: "60L Akvaryum",
    hotspots: ["Dragon Stone", "Spider Wood", "Aquasoil", "Anubias", "Cryptocoryne", "LED Işık", "Filtre", "Canlılar"],
    accent: "#6fa98c",
  },
  {
    id: "iwagumi",
    name: "Iwagumi",
    title: "IWAGUMI 45",
    volume: "45L Akvaryum",
    hotspots: ["Seiryu Stone", "Aquasoil", "Dwarf Hairgrass", "CO₂", "LED Işık", "Filtre"],
    accent: "#8f9a8f",
  },
  {
    id: "jungle",
    name: "Jungle",
    title: "JUNGLE 90",
    volume: "90L Akvaryum",
    hotspots: ["Spider Wood", "Java Fern", "Vallisneria", "Moss", "Filtre", "Canlılar"],
    accent: "#4f7a5e",
  },
  {
    id: "shrimp",
    name: "Shrimp",
    title: "SHRIMP NANO 20",
    volume: "20L Akvaryum",
    hotspots: ["Aquasoil", "Moss", "Cholla Wood", "Sünger Filtre", "Karidesler"],
    accent: "#c9846f",
  },
  {
    id: "nano",
    name: "Nano",
    title: "NANO 15",
    volume: "15L Akvaryum",
    hotspots: ["Mini Aquasoil", "Anubias Petite", "Nano Filtre", "LED Işık"],
    accent: "#c9a165",
  },
  {
    id: "blackwater",
    name: "Blackwater",
    title: "BLACKWATER 60",
    volume: "60L Akvaryum",
    hotspots: ["Ketapang Yaprağı", "Spider Wood", "Aquasoil", "Dip Balıkları"],
    accent: "#6d5a45",
  },
];

export const ARTICLES: Article[] = [
  { title: "İlk Akvaryum Nasıl Kurulur?", tag: "Rehber" },
  { title: "60 Litre Akvaryuma Hangi Balıklar Uygun?", tag: "Canlılar" },
  { title: "Karides Akvaryumu Nasıl Kurulur?", tag: "Karides" },
  { title: "Bitkili Akvaryum İçin Işık Seçimi", tag: "Ekipman" },
  { title: "Filtre Nasıl Seçilir?", tag: "Ekipman" },
  { title: "Aquascaping'e Nasıl Başlanır?", tag: "Aquascaping" },
];

export const COMPAT: Compatibility[] = [
  { name: "Amano Karidesi", status: "uyumlu" },
  { name: "Neocaridina", status: "uyumlu" },
  { name: "Betta", status: "dikkat" },
  { name: "Cichlid", status: "onerilmez" },
];
