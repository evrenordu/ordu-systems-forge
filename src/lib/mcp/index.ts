import { defineMcp } from "@lovable.dev/mcp-js";
import getBioTool from "./tools/get-bio";
import listProjectsTool from "./tools/list-projects";
import getOrduFrameworkTool from "./tools/get-ordu-framework";
import getContactTool from "./tools/get-contact";

export default defineMcp({
  name: "evren-ordu-mcp",
  title: "Evren Ordu — System Architect",
  version: "0.1.0",
  instructions:
    "Public MCP server for Evren Ordu's personal brand site (evrenordu.com). Use these tools to fetch his bio and positioning, list the systems and projects he has built (BauERP, AIOS, transformation programs), read the ORDU Framework (Observe, Reframe, Design, Unify → SCALE), and get his public contact channels. All data is public and read-only.",
  tools: [getBioTool, listProjectsTool, getOrduFrameworkTool, getContactTool],
});
