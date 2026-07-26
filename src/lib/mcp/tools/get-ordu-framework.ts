import { defineTool } from "@lovable.dev/mcp-js";

const FRAMEWORK = {
  name: "The ORDU Framework",
  pillars: [
    { letter: "O", title: "Observe", description: "Map the real system: people, data, workflows, incentives, and constraints as they actually operate." },
    { letter: "R", title: "Reframe", description: "Redefine the problem in system terms. Remove noise, expose leverage points, and align around a single operating model." },
    { letter: "D", title: "Design", description: "Design the target system end-to-end — processes, data, interfaces, automation, and governance — as one coherent architecture." },
    { letter: "U", title: "Unify", description: "Unify teams, tools, and data around the new operating system so execution becomes measurable and repeatable." },
  ],
  outcome: {
    label: "The Outcome: SCALE",
    description: "The result of ORDU applied consistently: organizations that scale with clarity, speed, and control.",
  },
};

export default defineTool({
  name: "get_ordu_framework",
  title: "Get the ORDU Framework",
  description:
    "Return the ORDU Framework (Observe, Reframe, Design, Unify) and its outcome (SCALE) — Evren Ordu's signature method.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(FRAMEWORK, null, 2) }],
    structuredContent: FRAMEWORK,
  }),
});
