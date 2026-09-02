/**
 * Runtime-agnostic validators for the JSON-LD blocks the site emits.
 * Used by the automated tests and safe to import anywhere.
 */

export interface JsonLdProblem {
  path: string;
  message: string;
}

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function typeOf(node: Record<string, unknown>): string[] {
  const t = node["@type"];
  if (typeof t === "string") return [t];
  if (Array.isArray(t)) return t.filter((x): x is string => typeof x === "string");
  return [];
}

/** Base structural rules that every top-level JSON-LD node must satisfy. */
export function validateJsonLdNode(node: unknown, path = "$"): JsonLdProblem[] {
  const problems: JsonLdProblem[] = [];
  if (!isObject(node)) {
    return [{ path, message: "JSON-LD node must be a plain object" }];
  }
  if (node["@context"] !== "https://schema.org") {
    problems.push({ path, message: '@context must be "https://schema.org"' });
  }
  if (typeOf(node).length === 0) {
    problems.push({ path, message: "@type is missing or not a string/array of strings" });
  }
  // JSON must survive a serialization round-trip (no undefined / cycles / NaN).
  try {
    const serialized = JSON.stringify(node);
    if (serialized === undefined) throw new Error("not serializable");
    JSON.parse(serialized);
    if (/:\s*(undefined|NaN)/.test(serialized)) {
      problems.push({ path, message: "serialized JSON-LD contains undefined/NaN" });
    }
  } catch {
    problems.push({ path, message: "node is not JSON-serializable" });
  }
  return problems;
}

/** Rules specific to CollectionPage nodes that carry an ItemList mainEntity. */
export function validateCollectionPage(node: unknown, path = "$"): JsonLdProblem[] {
  const problems = validateJsonLdNode(node, path);
  if (!isObject(node)) return problems;

  if (!typeOf(node).includes("CollectionPage")) {
    problems.push({ path, message: "@type must include CollectionPage" });
  }
  for (const key of ["url", "name", "description"]) {
    if (typeof node[key] !== "string" || !(node[key] as string).trim()) {
      problems.push({ path, message: `${key} must be a non-empty string` });
    }
  }
  if (typeof node["url"] === "string" && !/^https:\/\//.test(node["url"] as string)) {
    problems.push({ path, message: "url must be an absolute https URL" });
  }
  problems.push(...validateItemList(node["mainEntity"], `${path}.mainEntity`));
  return problems;
}

/** Rules for an ItemList: ordered positions starting at 1, each item typed and named. */
export function validateItemList(list: unknown, path = "$"): JsonLdProblem[] {
  const problems: JsonLdProblem[] = [];
  if (!isObject(list)) {
    return [{ path, message: "ItemList must be an object" }];
  }
  if (!typeOf(list).includes("ItemList")) {
    problems.push({ path, message: "@type must be ItemList" });
  }
  const elements = list["itemListElement"];
  if (!Array.isArray(elements) || elements.length === 0) {
    return [...problems, { path, message: "itemListElement must be a non-empty array" }];
  }
  elements.forEach((el, index) => {
    const at = `${path}.itemListElement[${index}]`;
    if (!isObject(el)) {
      problems.push({ path: at, message: "list entry must be an object" });
      return;
    }
    if (!typeOf(el).includes("ListItem")) {
      problems.push({ path: at, message: "@type must be ListItem" });
    }
    if (el["position"] !== index + 1) {
      problems.push({ path: at, message: `position must be ${index + 1}, got ${String(el["position"])}` });
    }
    const item = el["item"];
    if (!isObject(item)) {
      problems.push({ path: `${at}.item`, message: "item must be an object" });
      return;
    }
    if (typeOf(item).length === 0) {
      problems.push({ path: `${at}.item`, message: "item @type is required" });
    }
    if (typeof item["name"] !== "string" || !(item["name"] as string).trim()) {
      problems.push({ path: `${at}.item`, message: "item name must be a non-empty string" });
    }
  });
  return problems;
}

/** Rules for a BreadcrumbList produced by breadcrumbSchema(). */
export function validateBreadcrumbList(node: unknown, path = "$"): JsonLdProblem[] {
  const problems = validateJsonLdNode(node, path);
  if (!isObject(node)) return problems;
  if (!typeOf(node).includes("BreadcrumbList")) {
    problems.push({ path, message: "@type must be BreadcrumbList" });
  }
  const elements = node["itemListElement"];
  if (!Array.isArray(elements) || elements.length === 0) {
    return [...problems, { path, message: "itemListElement must be a non-empty array" }];
  }
  elements.forEach((el, index) => {
    const at = `${path}.itemListElement[${index}]`;
    if (!isObject(el)) return problems.push({ path: at, message: "entry must be an object" });
    if (el["position"] !== index + 1) {
      problems.push({ path: at, message: `position must be ${index + 1}` });
    }
    if (typeof el["item"] !== "string" || !/^https:\/\//.test(el["item"] as string)) {
      problems.push({ path: at, message: "item must be an absolute https URL" });
    }
  });
  return problems;
}

/** Validates the `{ type, children }` shape produced by jsonLd(). */
export function validateJsonLdScript(script: unknown, path = "$"): JsonLdProblem[] {
  if (!isObject(script)) return [{ path, message: "script must be an object" }];
  const problems: JsonLdProblem[] = [];
  if (script["type"] !== "application/ld+json") {
    problems.push({ path, message: 'script type must be "application/ld+json"' });
  }
  if (typeof script["children"] !== "string") {
    return [...problems, { path, message: "script children must be a JSON string" }];
  }
  try {
    problems.push(...validateJsonLdNode(JSON.parse(script["children"] as string), `${path}.children`));
  } catch {
    problems.push({ path, message: "script children is not valid JSON" });
  }
  return problems;
}
