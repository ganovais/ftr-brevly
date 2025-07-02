import { z } from "zod";

export const linkSchema = z.object({
  originalLink: z.string().url("Por favor, insira uma URL válida"),
  shortLink: z
    .string()
    .min(1, "O código encurtado é obrigatório")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Apenas letras, números, hífens e underscores são permitidos"
    ),
});

export type LinkFormData = z.infer<typeof linkSchema>;
