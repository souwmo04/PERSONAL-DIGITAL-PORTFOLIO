import { CopyButton } from "@/components/ui/CopyButton";

export function BibtexBlock({ bibtex }: { bibtex: string }) {
  return (
    <div className="border rule bg-paper-2/50">
      <div className="flex items-center justify-between border-b rule px-4 py-2.5">
        <span className="meta text-muted">BibTeX</span>
        <CopyButton value={bibtex} label="Copy citation" />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.72rem] leading-relaxed text-graphite">
        <code>{bibtex}</code>
      </pre>
    </div>
  );
}
