import { CopyIcon, DownloadIcon, Trash2Icon } from "lucide-react";

interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
}

interface LinksTableProps {
  links: Link[];
  onExport?: () => void;
  onCopy?: (shortUrl: string) => void;
  onDelete?: (id: string) => void;
}

export function LinksTable({
  links,
  onExport,
  onCopy,
  onDelete,
}: LinksTableProps) {
  const formatUrl = (url: string) => {
    if (url.length > 50) {
      return url.substring(0, 50) + "...";
    }
    return url;
  };

  if (links.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-600">Meus links</h2>
          <button
            disabled={true}
            onClick={onExport}
            className="bg-gray-200 rounded-sm p-2 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <DownloadIcon className="w-4 h-4" />
            Baixar CSV
          </button>
        </div>

        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm uppercase tracking-wide">
            AINDA NÃO EXISTEM LINKS CADASTRADOS
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-600">Meus links</h2>
        <button
          onClick={onExport}
          className="bg-gray-200 rounded-sm p-2 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <DownloadIcon className="w-4 h-4" />
          Baixar CSV
        </button>
      </div>

      <div className="">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between p-4 border-t border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-base font-medium">
                  brev.ly/{link.shortCode}
                </span>
              </div>
              <p className="text-sm text-gray-500" title={link.originalUrl}>
                {formatUrl(link.originalUrl)}
              </p>
            </div>
            <div className="mr-6">
              <span className="text-gray-500 text-sm">
                {link.clicks} acessos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onCopy?.(`http://localhost:5173/${link.shortCode}`)
                }
                className="bg-gray-200 rounded-sm p-2 text-gray-500 hover:text-gray-500 transition-colors"
                title="Copiar link"
              >
                <CopyIcon className="text-gray-600 size-4" />
              </button>
              <button
                onClick={() => onDelete?.(link.id)}
                className="bg-gray-200 rounded-sm p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="Deletar link"
              >
                <Trash2Icon className="text-gray-600 size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
