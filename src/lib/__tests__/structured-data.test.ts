import { describe, expect, it } from "vitest";
import {
  jsonLd,
  personSchema,
  organizationSchema,
  webSiteSchema,
  breadcrumbSchema,
  collectionPageSchema,
  SITE_URL,
} from "../structured-data";
import {
  validateJsonLdNode,
  validateJsonLdScript,
  validateCollectionPage,
  validateBreadcrumbList,
  validateItemList,
} from "../jsonld-validate";
import { translations } from "../i18n";

const portfolioEntries = translations.en.portfolio.projects.map((p) => ({
  name: p.tag,
  headline: p.title,
  description: p.summary,
}));

const portfolioCollection = collectionPageSchema({
  path: "/portfolio",
  name: translations.en.portfolio.meta.title,
  description: translations.en.portfolio.meta.description,
  listName: "AI Transformation Projects",
  entries: portfolioEntries,
});

describe("base JSON-LD nodes", () => {
  it.each([
    ["Person", personSchema],
    ["Organization", organizationSchema],
    ["WebSite", webSiteSchema],
  ])("%s is structurally valid", (_name, schema) => {
    expect(validateJsonLdNode(schema)).toEqual([]);
  });

  it("jsonLd() emits a valid application/ld+json script payload", () => {
    expect(validateJsonLdScript(jsonLd(personSchema))).toEqual([]);
  });
});

describe("portfolio CollectionPage / ItemList", () => {
  it("passes CollectionPage validation", () => {
    expect(validateCollectionPage(portfolioCollection)).toEqual([]);
  });

  it("emits one ListItem per project with sequential positions", () => {
    const list = portfolioCollection.mainEntity;
    expect(list.itemListElement).toHaveLength(portfolioEntries.length);
    expect(list.numberOfItems).toBe(portfolioEntries.length);
    expect(list.itemListElement.map((e) => e.position)).toEqual(
      portfolioEntries.map((_, i) => i + 1),
    );
    expect(validateItemList(list)).toEqual([]);
  });

  it("self-references the canonical portfolio URL", () => {
    expect(portfolioCollection.url).toBe(`${SITE_URL}/portfolio`);
    expect(portfolioCollection["@id"]).toBe(`${SITE_URL}/portfolio#webpage`);
  });

  it("serializes to JSON without loss", () => {
    expect(validateJsonLdScript(jsonLd(portfolioCollection))).toEqual([]);
  });

  it("keeps every locale's project list the same length", () => {
    const lengths = (["tr", "de", "en"] as const).map(
      (l) => translations[l].portfolio.projects.length,
    );
    expect(new Set(lengths).size).toBe(1);
  });
});

describe("breadcrumbs", () => {
  it("validates for a two-level trail", () => {
    const crumbs = breadcrumbSchema([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Portfolio", url: `${SITE_URL}/portfolio` },
    ]);
    expect(validateBreadcrumbList(crumbs)).toEqual([]);
  });
});

describe("validators reject malformed input", () => {
  it("flags a missing @context", () => {
    expect(validateJsonLdNode({ "@type": "Person" })).not.toEqual([]);
  });

  it("flags out-of-order ItemList positions", () => {
    const problems = validateItemList({
      "@type": "ItemList",
      itemListElement: [
        { "@type": "ListItem", position: 2, item: { "@type": "CreativeWork", name: "A" } },
      ],
    });
    expect(problems.some((p) => p.message.includes("position must be 1"))).toBe(true);
  });

  it("flags invalid JSON in a script payload", () => {
    expect(
      validateJsonLdScript({ type: "application/ld+json", children: "{oops" }),
    ).not.toEqual([]);
  });
});
