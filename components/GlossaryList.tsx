"use client";

import {useMemo, useState} from "react";

type Item = {
  term: string;
  category: string;
  definition: string;
  tip?: string;
};

export default function GlossaryList({
  items,
  labels
}: {
  items: Item[];
  labels: {search: string; filter: string; all: string};
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(labels.all);

  const categories = useMemo(() => {
    const set = new Set(items.map(i => i.category));
    return [labels.all, ...Array.from(set).sort()];
  }, [items, labels.all]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return items
      .filter(i => (cat === labels.all ? true : i.category === cat))
      .filter(i => {
        if (!qq) return true;
        return (
          i.term.toLowerCase().includes(qq) ||
          i.definition.toLowerCase().includes(qq) ||
          (i.tip ?? "").toLowerCase().includes(qq)
        );
      });
  }, [items, q, cat, labels.all]);

  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={labels.search}
              className="w-full rounded-2xl bg-zinc-900/60 px-5 py-3 pr-28 text-sm outline-none ring-1 ring-zinc-800 focus:ring-2 focus:ring-orange-500/50"
            />
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 chip">
              {filtered.length}/{items.length}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="rounded-2xl bg-zinc-900/60 px-4 py-3 text-sm outline-none ring-1 ring-zinc-800 focus:ring-2 focus:ring-orange-500/50"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              className="rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:border-orange-500/50"
              onClick={() => {
                setQ("");
                setCat(labels.all);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-3xl p-8 text-zinc-300">
          <div className="text-lg font-semibold">Keine Treffer</div>
          <p className="mt-2 text-sm text-zinc-400">
            Probiere einen anderen Suchbegriff oder setze den Kategorie-Filter zurück.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((i) => (
            <article
              key={i.term}
              className="group rounded-3xl border border-zinc-800/70 bg-zinc-950/70 p-6 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:border-orange-500/40 hover:shadow-orange-500/10"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold tracking-tight text-zinc-100">
                  {i.term}
                </h3>
                <span className="chip">{i.category}</span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-zinc-200">
                {i.definition}
              </p>

              {i.tip ? (
                <div className="mt-4 rounded-2xl bg-gradient-to-br from-orange-500/15 to-orange-500/5 p-4 ring-1 ring-orange-500/20">
                  <p className="text-sm text-orange-200">
                    <span className="font-semibold">Tipp:</span> {i.tip}
                  </p>
                </div>
              ) : null}

              <div className="mt-5 flex items-center justify-end text-xs text-zinc-500 opacity-60">
                ₿
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}