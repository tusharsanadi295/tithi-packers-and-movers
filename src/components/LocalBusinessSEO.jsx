import React from "react";
import { Helmet } from "react-helmet";

export default function LocalBusinessSEO() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "name": "Tithi Packers & Movers",
    "image": "https://tithipackers.com/logo.png",
    "@id": "https://tithipackers.com",
    "url": "https://tithipackers.com",
    "telephone": "+91-8160081145",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Surat",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "395XXX",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.1702,
      "longitude": 72.8311
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "areaServed": "Gujarat",
    "priceRange": "2999-18999",
    "sameAs": [
      "https://www.agarwalpackers.com/",
      "https://porter.in/packers-and-movers"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
