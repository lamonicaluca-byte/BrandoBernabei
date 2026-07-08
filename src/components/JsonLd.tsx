// ─── Generic wrapper ─────────────────────────────────────────────────────────
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── AutoDealer + Organization + Person ──────────────────────────────────────
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AutoDealer", "LocalBusiness", "Organization"],
        "@id": "https://www.bernabeiautomobili.com/#organization",
        "name": "Bernabei Automobili",
        "legalName": "Bernabei Automobili di Brando Bernabei",
        "url": "https://www.bernabeiautomobili.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.bernabeiautomobili.com/favicon.svg"
        },
        "foundingDate": "1946",
        "description": "Concessionaria di auto sportive e premium usate a Roma dal 1946. Il nonno fu il primo concessionario Ferrari del Centro-Sud Italia, arrivò secondo alla Mille Miglia dietro Nuvolari. Franco fu concessionario Maserati e De Tomaso, 3× campione italiano F3 con partecipazioni in F1. Brando è la terza generazione, attivo in Via Flaminia 318, Roma.",
        "vatID": "15074791003",
        "telephone": "+393395027983",
        "email": "info@bernabeiautomobili.it",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Flaminia, 318/a",
          "postalCode": "00196",
          "addressLocality": "Roma",
          "addressRegion": "RM",
          "addressCountry": "IT"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 41.9234,
          "longitude": 12.4767
        },
        "hasMap": "https://maps.app.goo.gl/EhJjdfo2syPRQTgKA",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "13:00"
          }
        ],
        "makesOffer": [
          "Porsche","Ferrari","BMW M","Mercedes-AMG","Lamborghini",
          "Maserati","Bentley","Aston Martin","McLaren","Pagani"
        ].map(brand => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "brand": { "@type": "Brand", "name": brand }
          }
        })),
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "94",
          "ratingCount": "94"
        },
        "sameAs": [
          "https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
        ],
        "founder": { "@id": "https://www.bernabeiautomobili.com/#brando" }
      },
      {
        "@type": "Person",
        "@id": "https://www.bernabeiautomobili.com/#brando",
        "name": "Brando Bernabei",
        "jobTitle": "Titolare",
        "worksFor": { "@id": "https://www.bernabeiautomobili.com/#organization" },
        "knowsLanguage": ["it","en","fr","de"],
        "telephone": "+393395027983",
        "email": "info@bernabeiautomobili.it"
      }
    ]
  }

  return <JsonLd schema={schema} />
}

// ─── BreadcrumbList ──────────────────────────────────────────────────────────
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  }
  return <JsonLd schema={schema} />
}

// ─── Car (Vehicle) ───────────────────────────────────────────────────────────
interface VehicleData {
  make: string
  model: string
  year: number
  km: number
  cv: number
  carburante: string
  cambio: string
  prezzo: number
  colore?: string
  cilindrata?: string
  slug: string
}

export function VehicleJsonLd({ vettura, lang }: { vettura: VehicleData; lang: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": `${vettura.make} ${vettura.model} ${vettura.year}`,
    "brand": { "@type": "Brand", "name": vettura.make },
    "model": vettura.model,
    "modelDate": vettura.year.toString(),
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "enginePower": {
        "@type": "QuantitativeValue",
        "value": vettura.cv,
        "unitCode": "BHP"
      },
      ...(vettura.cilindrata ? { "engineDisplacement": {
        "@type": "QuantitativeValue",
        "value": vettura.cilindrata
      }} : {})
    },
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": vettura.km,
      "unitCode": "KMT"
    },
    "fuelType": vettura.carburante,
    "vehicleTransmission": vettura.cambio,
    ...(vettura.colore ? { "color": vettura.colore } : {}),
    "offers": {
      "@type": "Offer",
      "price": vettura.prezzo,
      "priceCurrency": "EUR",
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock",
      "url": `https://www.bernabeiautomobili.com/${lang}/vetture/${vettura.slug}`,
      "seller": { "@id": "https://www.bernabeiautomobili.com/#organization" }
    }
  }
  return <JsonLd schema={schema} />
}

// ─── Reviews + AggregateRating ───────────────────────────────────────────────
export function RecensioniJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.bernabeiautomobili.com/#organization",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "94",
      "ratingCount": "94"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Adriano" },
        "reviewBody": "Ho acquistato a distanza, pagata anticipatamente e consegnata a domicilio a Bari. L'auto era meglio di quanto descritta. Oggi la fiducia è difficile da trovare, ma loro ne hanno da vendere."
      },
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Alessandra" },
        "reviewBody": "Prima di essere venditori di auto sono persone. Qualità rarissima in questo settore."
      },
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Giorgio" },
        "reviewBody": "Ho acquistato una Porsche 997 da Torino in totale serenità. Brando ha gestito ogni mia richiesta con video e perizia meccanica indipendente. Ne sono felicissimo."
      },
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Matteo Caroli" },
        "reviewBody": "Un appassionato di auto prima ancora di essere un venditore. Non il solito commerciante."
      },
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Prof. Dr. A.K." },
        "reviewBody": "Ein besonders vertrauenswürdiger Händler, ein junges Team der alten Schule, das die Leidenschaft spürt."
      }
    ]
  }
  return <JsonLd schema={schema} />
}

// ─── ItemList (catalogo vetture) ─────────────────────────────────────────────
interface ItemListVehicle {
  make: string
  model: string
  year: number
  prezzo: number
  slug: string
}

export function VetturesItemListJsonLd({ vetture, lang }: { vetture: ItemListVehicle[]; lang: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Catalogo Bernabei Automobili",
    "numberOfItems": vetture.length,
    "itemListElement": vetture.map((v, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `https://www.bernabeiautomobili.com/${lang}/vetture/${v.slug}`,
      "item": {
        "@type": "Car",
        "name": `${v.make} ${v.model} ${v.year}`,
        "brand": { "@type": "Brand", "name": v.make },
        "model": v.model,
        "offers": {
          "@type": "Offer",
          "price": v.prezzo,
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  }
  return <JsonLd schema={schema} />
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────
interface FAQItem {
  question: string
  answer: string
}

export function FAQPageJsonLd({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }
  return <JsonLd schema={schema} />
}
