import { z } from "zod";

// Status options
export const StatusOptions: string[] = ["current", "finish"];

// Project schema definition
export const projectSchema = z.object({
  name: z.string().min(3, "Precisa de no mínimo 3 caracteres"),
  description: z
    .string()
    .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  answerable: z
    .string()
    .min(3, "O responsável deve ter no mínimo 3 caracteres"),
  color: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
    message: "A cor deve estar no formato hexadecimal (#RRGGBB ou #RGB).",
  }),
  status: z.enum(["current", "finish"]).default("current"),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de início inválida",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de termino inválida",
  }),
  frontend: z.array(z.string()),
  backend: z.array(z.string()),
  database: z.array(z.string()),
  tests: z.array(z.string()).optional(),
  linkDeploy: z.string().optional(),
  linkRepository: z.string().optional(),
});

export type formData = z.infer<typeof projectSchema>;
