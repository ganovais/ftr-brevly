import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { useLink } from "../../hooks/use-link";
import notFoundImage from "../../assets/404.svg";
import iconBrevly from "../../assets/icon.svg";

export function RedirectPage() {
  const { visitLink } = useLink();
  const { shortCode } = useParams<{ shortCode: string }>();

  const { data: originalLink, isFetching } = useQuery({
    queryKey: ["redirect", shortCode],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!shortCode,
    queryFn: async () => {
      if (!shortCode) {
        throw new Error("Short code is required");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return visitLink(shortCode);
    },
  });

  useEffect(() => {
    if (isFetching) return;
    if (originalLink && originalLink !== "404") {
      window.location.href = originalLink;
    }
  }, [isFetching, originalLink]);

  const notFound = originalLink === "404";

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-2xl w-full">
          <img className="size-40" src={notFoundImage} alt="Not Found" />
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Link não encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{" "}
            <a href="/" className="text-blue-600 hover:underline">
              brev.ly
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-2xl w-full">
        <img
          src={iconBrevly}
          alt="Brevly Icon"
          className="size-16 object-contain"
        />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          Redirecionando...
        </h2>
        <p className="text-gray-600 mb-4">
          O link será aberto automaticamente em alguns instantes.
        </p>
        <p className="text-sm text-gray-500">
          Não foi redirecionado?{" "}
          <a
            href={originalLink}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  );
}
