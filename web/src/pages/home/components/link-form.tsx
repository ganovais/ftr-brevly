import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../../components/ui/input";
import {
  linkSchema,
  type LinkFormData,
} from "../../../form/schemas/create-link";
import { useLink } from "../../../hooks/use-link";

export function LinkForm() {
  const { handleCreateLink } = useLink();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  });

  const handleFormSubmit = async (data: LinkFormData) => {
    try {
      await handleCreateLink(data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-600 mb-6">Novo link</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <Input
            label="LINK ORIGINAL"
            placeholder="www.exemplo.com.br"
            error={errors.originalLink?.message}
            {...register("originalLink")}
          />
        </div>

        <div>
          <Input
            label="LINK ENCURTADO"
            prefix="brev.ly/"
            error={errors.shortLink?.message}
            {...register("shortLink")}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-base hover:bg-blue-dark text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2"
        >
          {isSubmitting ? "Salvando..." : "Salvar link"}
        </button>
      </form>
    </div>
  );
}
