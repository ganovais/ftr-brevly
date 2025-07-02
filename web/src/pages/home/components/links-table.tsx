import { useMemo } from "react";
import { CopyIcon, DownloadIcon, LinkIcon, Trash2Icon } from "lucide-react";

import { useLink } from "../../../hooks/use-link";

export function LinksTable() {
  const frontURL = import.meta.env.VITE_FRONTEND_URL;
  const {
    links,
    isLoadingLinks,
    isCreatingLink,
    isGeneratingCSV,
    handleDownloadCSV,
    handleCopyLink,
    handleDeleteLink,
  } = useLink();

  const formatUrl = (url: string) => {
    if (url.length > 50) {
      return url.substring(0, 50) + "...";
    }
    return url;
  };

  const downloadCSVDisabled = useMemo(() => {
    return !links.length || isLoadingLinks || isCreatingLink || isGeneratingCSV;
  }, [links.length, isLoadingLinks, isCreatingLink, isGeneratingCSV]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-600">Meus links</h2>
        <button
          disabled={downloadCSVDisabled}
          onClick={handleDownloadCSV}
          className="cursor-pointer bg-gray-200 rounded-sm p-2 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <DownloadIcon className="w-4 h-4" />
          {isGeneratingCSV ? "Baixando" : "Baixar CSV"}
        </button>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        {isLoadingLinks && (
          <div className="w-full flex items-center justify-center py-8">
            <span className="text-gray-500">Carregando links...</span>
          </div>
        )}
        {!isLoadingLinks &&
          links.length > 0 &&
          links.map((link) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-4 border-t border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <a
                    target="_blank"
                    href={`${frontURL}/${link.shortLink}`}
                    className="text-blue-base font-medium"
                  >
                    brev.ly/{link.shortLink}
                  </a>
                </div>
                <p className="text-sm text-gray-500" title={link.originalLink}>
                  {formatUrl(link.originalLink)}
                </p>
              </div>
              <div className="mr-6">
                <span className="text-gray-500 text-sm">
                  {link.accessCount} acessos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(link.shortLink)}
                  className="cursor-pointer bg-gray-200 rounded-sm p-2 text-gray-500 hover:text-gray-500 transition-colors"
                  title="Copiar link"
                >
                  <CopyIcon className="text-gray-600 size-4" />
                </button>
                <button
                  onClick={() => handleDeleteLink(link.shortLink)}
                  className="cursor-pointer bg-gray-200 rounded-sm p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Deletar link"
                >
                  <Trash2Icon className="text-gray-600 size-4" />
                </button>
              </div>
            </div>
          ))}
        {!isLoadingLinks && links.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-8">
            <LinkIcon className="size-8 text-gray-400 mb-2" />
            <span className="text-gray-500">
              Ainda não existem links cadastrados
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
