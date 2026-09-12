export interface World {
  id: string;
  tag: string;
  headline: string;
  body: string;
  items: string[];
  cta: string;
  hue: string;
  accent: string;
}

export interface Arrival {
  name: string;
  label: string;
  cat: string;
  accent: string;
}

export interface ConfigStep {
  q: string;
  key: string;
  options: string[];
}

export interface BuildLayer {
  n: string;
  label: string;
}

export interface Match {
  name: string;
  fit: number;
}

export interface Collection {
  id: string;
  name: string;
  title: string;
  volume: string;
  hotspots: string[];
  accent: string;
}

export interface Article {
  title: string;
  tag: string;
}

export interface Compatibility {
  name: string;
  status: "uyumlu" | "dikkat" | "onerilmez";
}
