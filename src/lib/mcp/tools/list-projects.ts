import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const PROJECTS = [
  {
    id: "bauerp",
    name: "BauERP",
    status: "Live",
    summary:
      "End-to-end ERP for construction and multi-site operations. Unifies projects, procurement, finance, HR, and field operations under one operating system.",
    highlights: [
      "7 module groups",
      "17 automated jobs",
      "15+ core entities",
    ],
    url: "https://evrenordu.com/bauerp",
  },
  {
    id: "aios",
    name: "AIOS",
    status: "In development",
    summary:
      "An AI-native operating layer that turns organizational data and workflows into intelligent, decision-ready systems.",
  },
  {
    id: "multi-site-transformation",
    name: "Multi-Site Transformation",
    status: "Delivered",
    summary:
      "Cross-country transformation program unifying operations, reporting, and governance across multiple sites into one measurable system.",
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation Programs",
    status: "Ongoing",
    summary:
      "Executive-led digital transformation for mid-market and enterprise companies: strategy, architecture, and execution.",
  },
  {
    id: "international-real-estate-marketing",
    name: "International Real Estate Marketing",
    status: "Delivered",
    summary:
      "Cross-border marketing and sales system for international real estate portfolios.",
  },
];

export default defineTool({
  name: "list_projects",
  title: "List projects and systems",
  description:
    "List the systems and projects Evren Ordu has built or is building, including BauERP, AIOS, and transformation programs.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PROJECTS, null, 2) }],
    structuredContent: { projects: PROJECTS },
  }),
});
