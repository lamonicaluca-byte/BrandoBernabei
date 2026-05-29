// Inserito nel [lang]/layout.tsx — attivo su tutte le pagine
export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. AutoDealer + LocalBusiness + Organization
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
        "description": "Concessionaria di auto sportive e premium usate a Roma dal 1946. Tre generazioni di famiglia: il nonno fu il primo concessionario Ferrari del Centro-Sud Italia e arrivò secondo alla Mille Miglia. Franco fu concessionario Maserati e De Tomaso, 3× campione italiano F3 con partecipazioni in Formula 1. Brando è la terza generazione, attivo in Via Flaminia 318, Roma.",
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
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
          "Porsche", "Ferrari", "BMW M", "Mercedes-AMG",
          "Lamborghini", "Maserati", "Bentley", "Aston Martin",
          "McLaren", "Pagani"
        ].map(brand => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "brand": { "@type": "Brand", "name": brand }
          }
        })),
        "sameAs": [
          "https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
        ],
        // 2. AggregateRating
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "100",
          "ratingCount": "100"
        },
        // 3. Employee / founder
        "founder": {
          "@id": "https://www.bernabeiautomobili.com/#brando"
        }
      },

      // 4. Person — Brando Bernabei
      {
        "@type": "Person",
        "@id": "https://www.bernabeiautomobili.com/#brando",
        "name": "Brando Bernabei",
        "jobTitle": "Titolare",
        "worksFor": { "@id": "https://www.bernabeiautomobili.com/#organization" },
        "knowsLanguage": ["it", "en", "fr", "de"],
        "email": "info@bernabeiautomobili.it",
        "telephone": "+393395027983",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Flaminia, 318/a",
          "postalCode": "00196",
          "addressLocality": "Roma",
          "addressCountry": "IT"
        }
      },

      // 5. BreadcrumbList (home)
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.bernabeiautomobili.com/it" },
          { "@type": "ListItem", "position": 2, "name": "Vetture", "item": "https://www.bernabeiautomobili.com/it/vetture" },
          { "@type": "ListItem", "position": 3, "name": "Chi Siamo", "item": "https://www.bernabeiautomobili.com/it/chi-siamo" },
          { "@type": "ListItem", "position": 4, "name": "Servizi", "item": "https://www.bernabeiautomobili.com/it/servizi" },
          { "@type": "ListItem", "position": 5, "name": "Contatti", "item": "https://www.bernabeiautomobili.com/it/contatti" }
        ]
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Uso in [lang]/vetture/[slug]/page.tsx ───────────────────────────────────
// Importa e renderizza <VehicleJsonLd vettura={vettura} /> dentro il JSX della page
//
// import type { Vettura } from '@/data/vetture'
// export function VehicleJsonLd({ vettura }: { vettura: Vettura }) {
//   const schema = {
//     "@context": "https://schema.org",
//     "@type": "Vehicle",
//     "name": `${vettura.make} ${vettura.model} ${vettura.year}`,
//     "brand": { "@type": "Brand", "name": vettura.make },
//     "model": vettura.model,
//     "modelDate": vettura.year.toString(),
//     "vehicleEngine": {
//       "@type": "EngineSpecification",
//       "enginePower": { "@type": "QuantitativeValue", "value": vettura.cv, "unitCode": "BHP" }
//     },
//     "mileageFromOdometer": {
//       "@type": "QuantitativeValue", "value": vettura.km, "unitCode": "KMT"
//     },
//     "fuelType": vettura.carburante,
//     "vehicleTransmission": vettura.cambio,
//     "color": vettura.colore,
//     "offers": {
//       "@type": "Offer",
//       "price": vettura.prezzo,
//       "priceCurrency": "EUR",
//       "availability": "https://schema.org/InStock",
//       "seller": { "@id": "https://www.bernabeiautomobili.com/#organization" }
//     }
//   }
//   return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
// }
