// Inserisci <JsonLd /> nel [lang]/layout.tsx — si carica su tutte le pagine
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
        "logo": "https://www.bernabeiautomobili.com/favicon.svg",
        "foundingDate": "1946",
        "description": "Concessionaria di auto sportive e premium usate a Roma. Dal 1946, tre generazioni di appassionati selezionano ogni vettura con cura.",
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
        "sameAs": [
          "https://www.autoscout24.it/concessionari/bernabei-automobili-di-brando-bernabei"
        ],
        // 2. AggregateRating
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "94",
          "ratingCount": "94"
        }
      },
      // 3. BreadcrumbList
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

// Esempio schema Vehicle — da inserire in [lang]/vetture/[slug]/page.tsx
// per ogni scheda vettura individuale:
//
// function VehicleJsonLd({ vettura }: { vettura: Vettura }) {
//   const schema = {
//     "@context": "https://schema.org",
//     "@type": "Vehicle",
//     "name": `${vettura.make} ${vettura.model} ${vettura.year}`,
//     "brand": { "@type": "Brand", "name": vettura.make },
//     "modelDate": vettura.year.toString(),
//     "mileageFromOdometer": {
//       "@type": "QuantitativeValue",
//       "value": vettura.km,
//       "unitCode": "KMT"
//     },
//     "fuelType": vettura.carburante,
//     "vehicleTransmission": vettura.cambio,
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
