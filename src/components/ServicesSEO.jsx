import { Helmet } from "react-helmet";

export default function ServicesSEO() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Tithi Packers & Movers",
      "areaServed": "Surat, Gujarat",
    },
    "serviceType": [
      "Packers and Movers",
      "Packing and Unpacking Services",
      "AC Relocation",
      "Tempo Services",
      "Furniture Dismantling",
      "Cleaning Services"
    ]
  };

  return (
    <Helmet>
      <title>Packers & Movers Services in Surat | Tithi Packers & Movers</title>
      <meta
        name="description"
        content="Professional packers and movers in Surat providing packing, moving, unpacking, AC relocation, tempo services and furniture handling."
      />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
