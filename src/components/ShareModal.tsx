import { useState } from "react";
import type { Account } from "../types";
import { buildBreedingShareText } from "../lib/shareText";

interface ShareModalProps {
  account: Account;
  onClose: () => void;
}

export default function ShareModal({ account, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const text = buildBreedingShareText(account);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-lg flex-col gap-4 rounded-xl bg-white p-5 shadow-xl dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Share breeding list
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
          >
            ×
          </button>
        </div>

        <textarea
          readOnly
          value={text}
          onFocus={(e) => e.target.select()}
          rows={Math.min(16, text.split("\n").length + 1)}
          className="w-full flex-1 resize-none rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-xs text-slate-800 outline-none dark:border-slate-700/60 dark:bg-slate-950/60 dark:text-slate-200"
        />

        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {copied ? "Copied!" : ""}
          </p>
          <button
            onClick={handleCopy}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
