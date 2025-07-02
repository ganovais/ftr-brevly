import { createContext } from "react";

import type { Link } from "../interfaces/link";
import type { LinkFormData } from "../form/schemas/create-link";

interface LinkContextValue {
  links: Link[];
  isLoadingLinks: boolean;
  isCreatingLink: boolean;
  isGeneratingCSV: boolean;
  handleDeleteLink: (shortLink: string) => Promise<void>;
  handleCopyLink: (shortLink: string) => void;
  handleDownloadCSV: () => Promise<void>;
  handleCreateLink: (data: LinkFormData) => Promise<void>;
  visitLink: (shortLink: string) => Promise<string | undefined>;
}

export const LinkContext = createContext<LinkContextValue | undefined>(
  undefined
);
