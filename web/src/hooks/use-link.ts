import { useContext } from "react";
import { LinkContext } from "../context/links";

export function useLink() {
  const context = useContext(LinkContext);

  if (!context) {
    throw new Error("useLink must be used within a LinkProvider");
  }

  return context;
}