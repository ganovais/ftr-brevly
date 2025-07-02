import { LinkForm } from "./components/link-form";
import { LinksTable } from "./components/links-table";

import brevlyLogo from "../../assets/brevly.svg";

export function HomePage() {
  return (
    <div className="min-h-screen py-0 lg:py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <img src={brevlyLogo} className="my-8" alt="Brevly" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:space-x-4 pb-32">
        <div className="col-span-1 lg:col-span-5">
          <LinkForm />
        </div>

        <div className="col-span-1 lg:col-span-7">
          <LinksTable />
        </div>
      </div>
    </div>
  );
}
