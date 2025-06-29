import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./input";

const linkSchema = z.object({
  originalUrl: z.string().url("Por favor, insira uma URL válida"),
  shortCode: z
    .string()
    .min(1, "O código encurtado é obrigatório")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Apenas letras, números, hífens e underscores são permitidos"
    ),
});

type LinkFormData = z.infer<typeof linkSchema>;

interface LinkFormProps {
  onSubmit: (data: LinkFormData) => Promise<void>;
  isLoading?: boolean;
}

export function LinkForm({ onSubmit, isLoading = false }: LinkFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  });

  const handleFormSubmit = async (data: LinkFormData) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-600 mb-6">Novo link</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <Input
            label="LINK ORIGINAL"
            placeholder="www.exemplo.com.br"
            error={errors.originalUrl?.message}
            {...register("originalUrl")}
          />
        </div>

        <div>
          <Input
            label="LINK ENCURTADO"
            prefix="brev.ly/"
            error={errors.shortCode?.message}
            {...register("shortCode")}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-base hover:bg-blue-dark text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2"
        >
          {isLoading ? "Salvando..." : "Salvar link"}
        </button>
      </form>
    </div>
  );
}
