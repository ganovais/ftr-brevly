import { Input } from "./input";

export function NewLinkForm() {
  return (
    <form className="flex flex-col gap-2">
      <Input
        label="Link"
        type="text"
        id="link"
        placeholder="https://example.com"
      />
      <button
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
