import { defineTool } from "@lovable.dev/mcp-js";

const CONTACT = {
  email: "evren.ordu@gmail.com",
  linkedin: "https://www.linkedin.com/in/evrenordu/",
  whatsapp: "https://api.whatsapp.com/send?phone=4915251512114",
  website: "https://evrenordu.com",
  location: "Frankfurt, Germany",
};

export default defineTool({
  name: "get_contact",
  title: "Get contact details",
  description:
    "Return public contact channels for Evren Ordu: email, LinkedIn, WhatsApp, and website.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CONTACT, null, 2) }],
    structuredContent: CONTACT,
  }),
});
