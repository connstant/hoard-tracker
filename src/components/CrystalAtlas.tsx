import { useEffect, useMemo, useRef, useState, type CSSProperties, type FocusEvent, type MouseEvent } from "react";
import { GROUPS, GROUP_COLORS, LOCATIONS, type CrystalLocation } from "../data/crystalLocations";
import "./CrystalAtlas.css";
import liveArt from "../assets/atlas/live-art.jpg";
import liveGrid from "../assets/atlas/live-grid.jpg";
import fullArt from "../assets/atlas/full-art.jpg";
import fullGrid from "../assets/atlas/full-grid.jpg";

const LIVE_IMAGES = { art: liveArt, grid: liveGrid };
const FULL_IMAGES = { art: fullArt, grid: fullGrid };

type BgStyle = "art" | "grid";

interface AtlasProps {
  onBack: () => void;
}

function fmtCoord(n: number, e: number) {
  const ns = `${Math.abs(n)} ${n >= 0 ? "N" : "S"}`;
  const es = `${Math.abs(e)} ${e >= 0 ? "E" : "W"}`;
  return `${ns} / ${es}`;
}

export default function CrystalAtlas({ onBack }: AtlasProps) {
  const [activeTab, setActiveTab] = useState<"live" | "full">("live");
  const [bgLive, setBgLive] = useState<BgStyle>("art");
  const [bgFull, setBgFull] = useState<BgStyle>("art");
  const [pinned, setPinned] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [hoverLoc, setHoverLoc] = useState<CrystalLocation | null>(null);

  const tooltipRef = useRef<HTMLDivElement>(null);
  const detailsRefs = useRef(new Map<string, HTMLDetailsElement>());

  const grouped = useMemo(() => {
    const map = new Map<string, CrystalLocation[]>();
    for (const group of GROUPS) map.set(group, []);
    for (const loc of LOCATIONS) map.get(loc.group)?.push(loc);
    return map;
  }, []);

  const query = search.trim().toLowerCase();

  function matches(loc: CrystalLocation) {
    if (!query) return true;
    const hay = `${loc.name} ${loc.alias ?? ""} ${loc.group}`.toLowerCase();
    return hay.includes(query);
  }

  const shownCount = LOCATIONS.filter(matches).length;

  useEffect(() => {
    detailsRefs.current.forEach((el) => {
      el.open = true;
    });
  }, []);

  useEffect(() => {
    if (!query) return;
    for (const group of GROUPS) {
      const hasMatch = grouped.get(group)?.some(matches);
      if (hasMatch) {
        const el = detailsRefs.current.get(group);
        if (el) el.open = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function togglePin(id: number) {
    setPinned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function moveTooltip(clientX: number, clientY: number) {
    const el = tooltipRef.current;
    if (!el) return;
    const pad = 14;
    let x = clientX + pad;
    let y = clientY + pad;
    const tw = el.offsetWidth;
    const th = el.offsetHeight;
    if (x + tw > window.innerWidth - 8) x = clientX - tw - pad;
    if (y + th > window.innerHeight - 8) y = clientY - th - pad;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }

  function handleMarkerHover(e: MouseEvent, loc: CrystalLocation) {
    setHoverLoc(loc);
    moveTooltip(e.clientX, e.clientY);
  }

  function handleMarkerFocus(e: FocusEvent<HTMLButtonElement>, loc: CrystalLocation) {
    setHoverLoc(loc);
    const rect = e.currentTarget.getBoundingClientRect();
    moveTooltip(rect.left + rect.width / 2, rect.top);
  }

  return (
    <div className="crystal-atlas">
      <div className="shell">
        <header className="masthead">
          <div className="masthead-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
              <path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
              <path d="M12 7v6M9 11l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <h1>Elder Crystal Atlas</h1>
              <p className="masthead-sub">
                All 49 charted Elder Crystal locations across the Day of Dragons map,
                plotted from in-game coordinates.
              </p>
            </div>
          </div>
          <div className="masthead-side">
            <button className="back-btn" onClick={onBack}>
              ← Back to Dashboard
            </button>
            <div className="theme-note">
              Center (0,0) is the map's true center · units run ±800 N/S/E/W
            </div>
          </div>
        </header>

        <div className="tabs" role="tablist" aria-label="Atlas views">
          <button
            className="tab-btn"
            role="tab"
            id="tab-live"
            aria-selected={activeTab === "live"}
            aria-controls="panel-live"
            onClick={() => setActiveTab("live")}
          >
            Live Map
          </button>
          <button
            className="tab-btn"
            role="tab"
            id="tab-full"
            aria-selected={activeTab === "full"}
            aria-controls="panel-full"
            onClick={() => setActiveTab("full")}
          >
            Full Labels
          </button>
        </div>

        <section
          className="tabpanel"
          id="panel-live"
          role="tabpanel"
          aria-labelledby="tab-live"
          hidden={activeTab !== "live"}
        >
          <div className="toolbar">
            <div className="bg-toggle" role="group" aria-label="Background style">
              <button aria-pressed={bgLive === "art"} onClick={() => setBgLive("art")}>
                Terrain
              </button>
              <button aria-pressed={bgLive === "grid"} onClick={() => setBgLive("grid")}>
                Grid
              </button>
            </div>
            <div className="search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx={11} cy={11} r={7} />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search a location or alias…"
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="result-count">
              {query === "" ? `${LOCATIONS.length} locations` : `${shownCount} match${shownCount === 1 ? "" : "es"}`}
            </div>
          </div>

          <div className="live-grid">
            <div>
              <div className="map-frame">
                <img src={LIVE_IMAGES[bgLive]} alt="Day of Dragons map" />
                <div className="marker-layer">
                  {LOCATIONS.map((loc) => {
                    const [x, y] = loc[bgLive];
                    const isPinned = pinned.has(loc.id);
                    const isMatch = matches(loc);
                    const cls = [
                      "marker",
                      isPinned ? "pinned" : "",
                      query !== "" && !isMatch ? "dim" : "",
                      query !== "" && isMatch ? "hit" : "",
                    ]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <button
                        key={loc.id}
                        className={cls}
                        style={{ left: `${x}%`, top: `${y}%`, background: GROUP_COLORS[loc.group] }}
                        aria-label={loc.name + (loc.alias ? ` (${loc.alias})` : "")}
                        onMouseEnter={(e) => handleMarkerHover(e, loc)}
                        onMouseMove={(e) => moveTooltip(e.clientX, e.clientY)}
                        onMouseLeave={() => setHoverLoc(null)}
                        onFocus={(e) => handleMarkerFocus(e, loc)}
                        onBlur={() => setHoverLoc(null)}
                        onClick={() => togglePin(loc.id)}
                      />
                    );
                  })}
                  {[...pinned].map((id) => {
                    const loc = LOCATIONS[id];
                    const [x, y] = loc[bgLive];
                    return (
                      <div
                        key={id}
                        className="pin-label"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        {loc.name}
                        {loc.alias ? ` (${loc.alias})` : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="map-hint">
                Hover a dot for details · click a dot or a list entry to pin its label on
                the map · click again to unpin.
              </p>
            </div>
            <aside className="sidebar">
              {GROUPS.map((group) => {
                const locs = grouped.get(group) ?? [];
                const groupHasMatch = locs.some(matches);
                if (query !== "" && !groupHasMatch) return null;
                return (
                  <details
                    key={group}
                    className="group"
                    data-group={group}
                    ref={(el) => {
                      if (el) detailsRefs.current.set(group, el);
                    }}
                  >
                    <summary style={{ "--gcolor": GROUP_COLORS[group] } as CSSProperties}>
                      <span className="gdot" style={{ background: GROUP_COLORS[group] }} />
                      {group}
                      <span className="gcount">{locs.length}</span>
                    </summary>
                    <ul className="loc-list">
                      {locs.map((loc) => {
                        const isMatch = matches(loc);
                        const isPinned = pinned.has(loc.id);
                        return (
                          <li
                            key={loc.id}
                            className={[
                              "loc-row",
                              isPinned ? "active" : "",
                              query !== "" && !isMatch ? "filtered-out" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            tabIndex={0}
                            role="button"
                            aria-pressed={isPinned}
                            onClick={() => togglePin(loc.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                togglePin(loc.id);
                              }
                            }}
                          >
                            <span className="dot" style={{ background: GROUP_COLORS[group] }} />
                            <span className="loc-text">
                              <span className="loc-name">{loc.name}</span>
                              {loc.alias && <span className="alias">{loc.alias}</span>}
                            </span>
                            <span className="loc-coord">{fmtCoord(loc.n, loc.e)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                );
              })}
            </aside>
          </div>
        </section>

        <section
          className="tabpanel"
          id="panel-full"
          role="tabpanel"
          aria-labelledby="tab-full"
          hidden={activeTab !== "full"}
        >
          <div className="toolbar">
            <div className="bg-toggle" role="group" aria-label="Background style">
              <button aria-pressed={bgFull === "art"} onClick={() => setBgFull("art")}>
                Terrain
              </button>
              <button aria-pressed={bgFull === "grid"} onClick={() => setBgFull("grid")}>
                Grid
              </button>
            </div>
            <div className="result-count">
              Every location labeled directly on the map, with leader lines for tight
              clusters.
            </div>
          </div>
          <div className="full-frame">
            <img src={FULL_IMAGES[bgFull]} alt="Fully labeled Day of Dragons map" />
          </div>
        </section>

        <footer className="credit">
          Coordinates calibrated against the in-game grid overlay (columns A–M, rows
          0–12); a few source labels for Redwoods Pond/Deep Redwoods Pond and Arch Pond
          didn't line up with their listed grid cell — those are plotted by their raw
          N/E coordinates.
        </footer>
      </div>

      <div
        ref={tooltipRef}
        className={`crystal-atlas-tooltip${hoverLoc ? " show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {hoverLoc && (
          <>
            <div className="tt-name">{hoverLoc.name}</div>
            {hoverLoc.alias && <div className="tt-alias">{hoverLoc.alias}</div>}
            <div className="tt-coord">{fmtCoord(hoverLoc.n, hoverLoc.e)}</div>
            <div className="tt-group">{hoverLoc.group}</div>
          </>
        )}
      </div>
    </div>
  );
}
