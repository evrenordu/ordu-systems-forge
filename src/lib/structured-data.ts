/**
 * Shared JSON-LD structured data for evrenordu.com.
 * Canonical host: https://www.evrenordu.com
 */

export const SITE_URL = "https://www.evrenordu.com";
export const SITE_NAME = "Evren Ordu";
export const OG_IMAGE_URL =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5a8fcedd-4bd9-4d04-b32f-2cb868142283";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Evren Ordu",
  alternateName: "The System Architect",
  url: `${SITE_URL}/`,
  image: OG_IMAGE_URL,
  email: "mailto:evren.ordu@gmail.com",
  jobTitle: "Entrepreneur · System Architect · AI & Digital Transformation",
  description:
    "Frankfurt-based entrepreneur and system architect building AI-supported business operating systems for multi-company operations.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frankfurt am Main",
    addressRegion: "Hesse",
    addressCountry: "DE",
  },
  nationality: { "@type": "Country", name: "Germany" },
  knowsLanguage: ["en", "de", "tr"],
  sameAs: ["https://www.linkedin.com/in/evrenordu/"],
  knowsAbout: [
    "Digital Transformation",
    "Enterprise Resource Planning",
    "Artificial Intelligence",
    "Operations Leadership",
    "Multi-site Operations",
    "Construction Technology",
    "International Business Development",
  ],
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Evren Ordu — The System Architect",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  description:
    "Personal brand and systems practice of Evren Ordu: AI-powered business operating systems, digital transformation, and multi-company operations leadership from Frankfurt am Main.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Frankfurt am Main",
    addressCountry: "DE",
  },
  founder: { "@id": `${SITE_URL}/#person` },
  sameAs: ["https://www.linkedin.com/in/evrenordu/"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "evren.ordu@gmail.com",
    contactType: "business inquiries",
  },
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description:
    "Official website of Evren Ordu — entrepreneur, system architect, and AI transformation leader.",
  inLanguage: ["en", "de", "tr"],
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const jsonLd = (data: Record<string, unknown>) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});
