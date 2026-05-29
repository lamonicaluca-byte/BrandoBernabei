"use client"

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
// Inserisci <OrganizationJsonLd /> in app/[lang]/layout.tsx
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
          "reviewCount": "100",
          "ratingCount": "100"
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
// Inserisci <BreadcrumbJsonLd items={[...]} /> in ogni page.tsx
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

// ─── Vehicle ─────────────────────────────────────────────────────────────────
// Inserisci <VehicleJsonLd vettura={vettura} /> in [lang]/vetture/[slug]/page.tsx
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
    "@type": "Vehicle",
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
      "availability": "https://schema.org/InStock",
      "url": `https://www.bernabeiautomobili.com/${lang}/vetture/${vettura.slug}`,
      "seller": { "@id": "https://www.bernabeiautomobili.com/#organization" }
    }
  }
  return <JsonLd schema={schema} />
}
