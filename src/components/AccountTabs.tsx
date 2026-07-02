import { useState } from "react";
import type { Account } from "../types";

interface AccountTabsProps {
  accounts: Account[];
  activeAccountId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export default function AccountTabs({
  accounts,
  activeAccountId,
  onSelect,
  onAdd,
  onRename,
  onDelete,
}: AccountTabsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");

  function startEditing(account: Account) {
    setEditingId(account.id);
    setDraftName(account.name);
  }

  function commitEdit() {
    if (editingId && draftName.trim()) {
      onRename(editingId, draftName.trim());
    }
    setEditingId(null);
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-300 pb-3 dark:border-slate-700/60">
      {accounts.map((account) => {
        const isActive = account.id === activeAccountId;
        const isEditing = editingId === account.id;
        return (
          <div
            key={account.id}
            className={`group flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-slate-300/70 text-slate-900 dark:bg-slate-700/70 dark:text-white"
                : "text-slate-500 hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
            }`}
          >
            {isEditing ? (
              <input
                autoFocus
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitEdit();
                  if (e.key === "Escape") setEditingId(null);
                }}
                className="w-32 rounded border border-slate-400 bg-white px-1.5 py-0.5 text-sm text-slate-900 outline-none dark:border-slate-600/60 dark:bg-slate-950/60 dark:text-white"
              />
            ) : (
              <button onClick={() => onSelect(account.id)}>
                {account.name}
              </button>
            )}
            {isActive && !isEditing && (
              <button
                onClick={() => startEditing(account)}
                aria-label="Rename account"
                className="text-slate-500 opacity-0 transition group-hover:opacity-100 hover:text-slate-700 dark:hover:text-slate-200"
              >
                ✎
              </button>
            )}
            {accounts.length > 1 && !isEditing && (
              <button
                onClick={() => onDelete(account.id)}
                aria-label="Delete account"
                className="text-slate-500 opacity-0 transition group-hover:opacity-100 hover:text-red-400"
              >
                ×
              </button>
            )}
          </div>
        );
      })}
      <button
        onClick={onAdd}
        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
      >
        <span className="text-base leading-none">+</span> Add account
      </button>
    </div>
  );
}
