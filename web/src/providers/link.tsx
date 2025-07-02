import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { api } from "../libs/axios";
import { LinkContext } from "../context/links";
import type { LinkFormData } from "../form/schemas/create-link";

interface LinkProviderProps {
  children: React.ReactNode;
}

export function LinkProvider({ children }: LinkProviderProps) {
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [isGeneratingCSV, setIsGeneratingCSV] = useState(false);

  const {
    data: links,
    isFetching: isLoadingLinks,
    refetch,
  } = useQuery({
    queryKey: ["links"],
    retry: 3,
    retryDelay: 1000,
    queryFn: async () => {
      const { data } = await api.get("/links");
      return data?.links || [];
    },
  });

  async function handleDeleteLink(shortLink: string) {
    try {
      await api.delete(`/links/${shortLink}`);
      refetch();
      toast.success("Link deletado com sucesso!");
    } catch (error) {
      console.error("Error deleting link:", error);
      toast.error("Erro ao deletar link");
    }
  }

  function handleCopyLink(shortLink: string) {
    navigator.clipboard
      .writeText(`http://localhost:5173/${shortLink}`)
      .then(() => {
        console.log("Link copied to clipboard:", shortLink);
        toast.success("Link copiado para a área de transferência!");
      })
      .catch(() => {
        toast.error("Erro ao copiar link");
      });
  }

  async function handleDownloadCSV() {
    setIsGeneratingCSV(true);
    try {
      const { data } = await api.post("/links/exports");
      const reportUrl = data?.reportUrl || "";

      const link = document.createElement("a");
      link.setAttribute("href", reportUrl);
      link.setAttribute("download", "brevly-links.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      toast.error("Erro ao baixar CSV");
    } finally {
      setIsGeneratingCSV(false);
    }
  }

  async function handleCreateLink(data: LinkFormData) {
    setIsCreatingLink(true);
    try {
      await api.post("/links", data);
      refetch();
      toast.success("Link criado com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError && error.status === 409) {
        toast.error(error.response?.data?.message || "Link já existe");
        return;
      }
      console.error("Error creating link:", error);
      toast.error("Erro ao criar link");
    } finally {
      setIsCreatingLink(false);
    }
  }

  async function visitLink(shortLink: string) {
    try {
      const { data } = await api.get(`/links/${shortLink}`);
      refetch();
      return data.originalLink;
    } catch (error) {
      if (error instanceof AxiosError && error.status === 404) {
        toast.error("Link não encontrado");
        return "404";
      }

      toast.error("Erro ao acessar o link");
      return "500";
    }
  }

  const contextValue = {
    links: links || [],
    isCreatingLink,
    isLoadingLinks,
    isGeneratingCSV,
    handleDeleteLink,
    handleCopyLink,
    handleDownloadCSV,
    handleCreateLink,
    visitLink,
  };

  return (
    <LinkContext.Provider value={contextValue}>{children}</LinkContext.Provider>
  );
}
