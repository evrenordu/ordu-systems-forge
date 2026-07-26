import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const BIO = {
  name: "Evren Ordu",
  positioning: "The System Architect",
  headline: "I build operating systems for companies — and prove their impact in practice.",
  roles: [
    "Strategic Leader",
    "System Architect",
    "Digital Transformation Expert",
    "Entrepreneur",
  ],
  based_in: "Frankfurt, Germany",
  languages: ["Turkish", "German", "English"],
  summary:
    "Evren Ordu designs and ships end-to-end business operating systems that unify operations, data, and decision-making across multi-site organizations. He combines executive leadership, engineering discipline, and AI transformation to turn complex organizations into coherent, measurable systems.",
  website: "https://evrenordu.com",
};

export default defineTool({
  name: "get_bio",
  title: "Get Evren Ordu bio",
  description:
    "Return Evren Ordu's professional bio, positioning, roles, location, and languages.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(BIO, null, 2) }],
    structuredContent: BIO,
  }),
});

export { BIO };
