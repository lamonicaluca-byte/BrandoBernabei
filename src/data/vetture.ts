export type BadgeKey = "featured" | "warranty" | "tradeIn" | "available" | "certified";
export type FuelKey = "petrol";
export type GearboxKey = "pdk" | "automatic" | "f1DualClutch";

export interface Vettura {
  slug: string;
  make: string;
  model: string;
  year: number;
  km: number;
  cv: number;
  cambio: GearboxKey;
  carburante: FuelKey;
  prezzo: number;
  badge: BadgeKey;
  descrizione?: string;
  featured: boolean;
  image?: string;
  colore?: string;
  potenza?: string;
  cilindrata?: string;
  trasmissione?: string;
  note?: string;
  disponibile?: boolean;
}

export const vetture: Vettura[] = [
  {
    slug: "porsche-911-carrera-s-2021",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2021,
    km: 18000,
    cv: 450,
    cambio: "pdk",
    carburante: "petrol",
    prezzo: 139900,
    badge: "featured",
    descrizione:
      "Veicolo selezionato personalmente. Certificata Porsche Approved, mantenimento scrupoloso, service documentato dal primo km.",
    featured: true,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
    colore: "GT Silver Metallic",
    cilindrata: "2981 cc",
    trasmissione: "Trazione posteriore",
    note: "Pacchetti Sport Chrono, PDLS+, interni in pelle nera. Una 911 esemplare, difficile trovarne una più onesta.",
  },
  {
    slug: "bmw-m4-competition-2020",
    make: "BMW",
    model: "M4 Competition",
    year: 2020,
    km: 31000,
    cv: 510,
    cambio: "automatic",
    carburante: "petrol",
    prezzo: 79500,
    badge: "warranty",
    featured: false,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    colore: "Sao Paulo Yellow",
    cilindrata: "2993 cc",
    trasmissione: "Trazione posteriore",
    descrizione:
      "Uno dei colori più ricercati per la M4. Mantenuta da primo proprietario, tagliandi BMW, pneumatici recenti.",
    note: "Sedili carbon, M Driver's Package, cerchi forgiati. Condizioni eccellenti.",
  },
  {
    slug: "maserati-levante-trofeo-2019",
    make: "Maserati",
    model: "Levante Trofeo",
    year: 2019,
    km: 44000,
    cv: 580,
    cambio: "automatic",
    carburante: "petrol",
    prezzo: 68900,
    badge: "tradeIn",
    featured: false,
    disponibile: false,
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=80",
    colore: "Nero Ribelle",
    cilindrata: "3799 cc",
    trasmissione: "Trazione integrale Q4",
    descrizione:
      "Il top di gamma Levante, motore Ferrari V8 biturbo. Storico completo, assistenza Maserati autorizzata.",
    note: "Pack Nero, tetto panoramico, impianto audio Bowers & Wilkins. Il SUV sportivo italiano per eccellenza.",
  },
  {
    slug: "mercedes-amg-gt-63s-2022",
    make: "Mercedes-AMG",
    model: "GT 63 S",
    year: 2022,
    km: 12000,
    cv: 639,
    cambio: "automatic",
    carburante: "petrol",
    prezzo: 189000,
    badge: "available",
    featured: false,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    colore: "Obsidian Black",
    cilindrata: "3982 cc",
    trasmissione: "AMG Performance 4MATIC+",
    descrizione:
      "La Gran Turismo quattro porte definitiva. Km bassissimi, sempre tenuta in garage climatizzato.",
    note: "AMG Night Package II, AMG Ride Control+, Burmester 3D. Vettura in condizioni di consegna.",
  },
  {
    slug: "audi-rs6-avant-2021",
    make: "Audi",
    model: "RS6 Avant",
    year: 2021,
    km: 27000,
    cv: 600,
    cambio: "automatic",
    carburante: "petrol",
    prezzo: 109900,
    badge: "available",
    featured: false,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
    colore: "Nardo Grey",
    cilindrata: "3996 cc",
    trasmissione: "Quattro",
    descrizione:
      "Il colore più ricercato per la RS6. Primo proprietario, service Audi completo, pneumatici summer nuovi.",
    note: "Pack Dynamic Plus, cerchi RS 22\", head-up display, tetto panoramico. La wagon dei sogni.",
  },
  {
    slug: "ferrari-california-t-2016",
    make: "Ferrari",
    model: "California T",
    year: 2016,
    km: 22000,
    cv: 560,
    cambio: "f1DualClutch",
    carburante: "petrol",
    prezzo: 149900,
    badge: "certified",
    featured: false,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    colore: "Rosso Corsa",
    cilindrata: "3855 cc",
    trasmissione: "Trazione posteriore",
    descrizione:
      "Gran Turismo cabriolet con il carattere Ferrari. Carrozzeria perfetta, interni bicolore Cuoio/Nero.",
    note: "Ferrari Approved, tagliandi Ferrari autorizzata, sistema hi-fi premium. Storico documentato al km.",
  },
  {
    slug: "lamborghini-urus-2021",
    make: "Lamborghini",
    model: "Urus",
    year: 2021,
    km: 19000,
    cv: 650,
    cambio: "automatic",
    carburante: "petrol",
    prezzo: 239000,
    badge: "featured",
    featured: false,
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
    colore: "Giallo Auge",
    cilindrata: "3996 cc",
    trasmissione: "AWD",
    descrizione:
      "Super SUV Lamborghini in uno dei colori più iconici. Primo proprietario, ogni optional disponibile.",
    note: "Pack Akrapovic, cerchi Taigete 23\", sedili quattro posti. Una presenza scenica ineguagliabile.",
  },
  {
    slug: "bentley-continental-gt-2020",
    make: "Bentley",
    model: "Continental GT",
    year: 2020,
    km: 35000,
    cv: 635,
    cambio: "automatic",
    carburante: "petrol",
    prezzo: 179000,
    badge: "warranty",
    featured: false,
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80",
    colore: "Midnight Emerald",
    cilindrata: "5950 cc",
    trasmissione: "AWD",
    descrizione:
      "La Gran Turismo per definizione. W12 biturbo, interni in pregiato cuoio Linen con pannelli in legno di noce.",
    note: "City specification, Touring specification, Audio system Naim. La raffinatezza britannica in forma pura.",
  },
];

export function getVetturaBySlug(slug: string): Vettura | undefined {
  return vetture.find((v) => v.slug === slug);
}

export function getFeaturedVetture(): Vettura[] {
  return vetture.filter((v) => v.featured);
}

export function getEvidenzaVetture(): Vettura[] {
  const featured = vetture.filter((v) => v.featured);
  const rest = vetture.filter((v) => !v.featured).slice(0, 2);
  return [...featured, ...rest].slice(0, 3);
}
