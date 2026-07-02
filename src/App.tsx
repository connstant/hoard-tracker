import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import CrystalLegend from "./components/CrystalLegend";
import AccountTabs from "./components/AccountTabs";
import StatsBar from "./components/StatsBar";
import DragonGrid from "./components/DragonGrid";
import Footer from "./components/Footer";
import { SPECIES } from "./data/species";
import type { AppState, DragonRecord } from "./types";
import {
  emptyHoard,
  exportState,
  importState,
  loadState,
  saveState,
} from "./lib/storage";
import { applyTheme, loadTheme, saveTheme, type Theme } from "./lib/theme";

export default function App() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [theme, setTheme] = useState<Theme>(() => loadTheme());

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const activeAccount = useMemo(
    () =>
      state.accounts.find((a) => a.id === state.activeAccountId) ??
      state.accounts[0],
    [state]
  );

  function updateActiveAccount(dragons: typeof activeAccount.dragons) {
    setState((prev) => ({
      ...prev,
      accounts: prev.accounts.map((a) =>
        a.id === activeAccount.id ? { ...a, dragons } : a
      ),
    }));
  }

  function handleDragonChange(speciesId: string, patch: Partial<DragonRecord>) {
    updateActiveAccount({
      ...activeAccount.dragons,
      [speciesId]: { ...activeAccount.dragons[speciesId], ...patch },
    });
  }

  function handleAddAccount() {
    const id = crypto.randomUUID();
    setState((prev) => ({
      accounts: [
        ...prev.accounts,
        {
          id,
          name: `Account ${prev.accounts.length + 1}`,
          dragons: emptyHoard(),
        },
      ],
      activeAccountId: id,
    }));
  }

  function handleRenameAccount(id: string, name: string) {
    setState((prev) => ({
      ...prev,
      accounts: prev.accounts.map((a) => (a.id === id ? { ...a, name } : a)),
    }));
  }

  function handleDeleteAccount(id: string) {
    setState((prev) => {
      const accounts = prev.accounts.filter((a) => a.id !== id);
      const activeAccountId =
        prev.activeAccountId === id ? accounts[0].id : prev.activeAccountId;
      return { accounts, activeAccountId };
    });
  }

  async function handleImport(file: File) {
    try {
      const imported = await importState(file);
      setState(imported);
    } catch {
      alert("Couldn't read that file. Make sure it's a hoard export from this tracker.");
    }
  }

  const stats = useMemo(() => {
    const records = Object.entries(activeAccount.dragons);
    const owned = records.filter(([, r]) => r.owned).length;
    const fullyEldered = records.filter(([speciesId, r]) => {
      const species = SPECIES.find((s) => s.id === speciesId);
      return r.owned && species?.elders && r.eldering >= 100;
    }).length;
    const pure = records.filter(([, r]) => r.owned && r.status === "pure").length;
    const ultra = records.filter(([, r]) => r.owned && r.status === "ultra").length;
    return { owned, fullyEldered, pure, ultra };
  }, [activeAccount]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 transition-colors sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4">
        <Header
          theme={theme}
          onToggleTheme={() =>
            setTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          onExport={() => exportState(state)}
          onImport={handleImport}
        />
        <CrystalLegend />
        <AccountTabs
          accounts={state.accounts}
          activeAccountId={activeAccount.id}
          onSelect={(id) => setState((prev) => ({ ...prev, activeAccountId: id }))}
          onAdd={handleAddAccount}
          onRename={handleRenameAccount}
          onDelete={handleDeleteAccount}
        />
        <StatsBar
          owned={stats.owned}
          total={SPECIES.length}
          fullyEldered={stats.fullyEldered}
          pure={stats.pure}
          ultra={stats.ultra}
        />
        <DragonGrid dragons={activeAccount.dragons} onChange={handleDragonChange} />
        <Footer />
      </div>
    </div>
  );
}
