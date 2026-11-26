import { CopyButton } from "@/components/ui/CopyButton";

export function BibtexBlock({ bibtex }: { bibtex: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-black/40">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="eyebrow text-faint">BibTeX</span>
        <CopyButton value={bibtex} label="Copy citation" />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.72rem] leading-relaxed text-dim">
        <code>{bibtex}</code>
      </pre>
    </div>
  );
}
