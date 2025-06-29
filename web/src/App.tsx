import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LinkForm } from "./components/link-form";
import { LinksTable } from "./components/links-table";
import { RedirectPage } from "./components/redirect-page";
import brevlyLogo from "./assets/brevly.svg";
import "./styles/global.css";

interface Link {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
}

function MainPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedLinks = localStorage.getItem("brevly-links");
    if (savedLinks) {
      try {
        const parsedLinks = JSON.parse(savedLinks).map(
          (link: Omit<Link, "createdAt"> & { createdAt: string }) => ({
            ...link,
            createdAt: new Date(link.createdAt),
          })
        );
        setLinks(parsedLinks);
      } catch (error) {
        console.error("Error loading links from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    const currentLinks = localStorage.getItem("brevly-links");

    if (!currentLinks || currentLinks === "[]") {
      localStorage.setItem("brevly-links", JSON.stringify([]));
    }

    if (!links || links.length === 0) return;
    localStorage.setItem("brevly-links", JSON.stringify(links));
  }, [links]);

  const handleCreateLink = async (data: {
    originalUrl: string;
    shortCode: string;
  }) => {
    setIsLoading(true);

    const existingLink = links.find(
      (link) => link.shortCode === data.shortCode
    );
    if (existingLink) {
      alert("Este código já está em uso. Escolha outro.");
      setIsLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newLink: Link = {
        id: Date.now().toString(),
        shortCode: data.shortCode,
        originalUrl: data.originalUrl,
        clicks: 0,
        createdAt: new Date(),
      };

      setLinks((prev) => [newLink, ...prev]);
    } catch (error) {
      console.error("Error creating link:", error);
      alert("Erro ao criar link. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = (shortUrl: string) => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        alert("Link copiado para a área de transferência!");
      })
      .catch(() => {
        alert("Erro ao copiar link");
      });
  };

  const handleDeleteLink = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este link?")) {
      setLinks((prev) => prev.filter((link) => link.id !== id));
    }
  };

  const handleExportCsv = () => {
    if (links.length === 0) {
      alert("Não há links para exportar");
      return;
    }

    const csvContent = [
      "Link Curto,Link Original,Acessos,Data de Criação",
      ...links.map(
        (link) =>
          `brev.ly/${link.shortCode},${link.originalUrl},${
            link.clicks
          },${link.createdAt.toLocaleDateString()}`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "brevly-links.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen py-0 lg:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <img src={brevlyLogo} className="my-8" alt="Brevly" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:space-x-4">
        <div className="col-span-1 lg:col-span-5 bg-gray-100 rounded-2xl shadow-sm border border-gray-100 p-8">
          <LinkForm onSubmit={handleCreateLink} isLoading={isLoading} />
        </div>

        <div className="col-span-1 lg:col-span-7 bg-gray-100 rounded-2xl shadow-sm border border-gray-100 p-8">
          <LinksTable
            links={links}
            onExport={handleExportCsv}
            onCopy={handleCopyLink}
            onDelete={handleDeleteLink}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:shortCode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
