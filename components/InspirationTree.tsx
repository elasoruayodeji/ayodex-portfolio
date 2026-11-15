"use client";

import { useId, useState } from "react";
import {
  branches,
  totalEntries,
  type BranchId,
  type InfluenceEntry,
} from "@/lib/inspiration";

type Selected = { branch: BranchId; entryId: string | null };

function findEntry(selected: Selected | null) {
  if (!selected) return null;
  const branch = branches.find((b) => b.id === selected.branch);
  if (!branch || !selected.entryId) return null;
  return branch.entries.find((e) => e.id === selected.entryId) ?? null;
}

function DetailPanel({
  entry,
  branchLabel,
  emptyHint,
}: {
  entry: InfluenceEntry | null;
  branchLabel: string;
  emptyHint: string;
}) {
  return (
    <div className="border-t border-line pt-5">
      <p className="eyebrow">{entry ? "Selected influence" : branchLabel}</p>
      {entry ? (
        <>
          <h3 className="title mt-2 text-[1.25rem]">{entry.name}</h3>
          <p className="mt-0.5 text-[0.8rem] uppercase tracking-[0.1em] text-muted-soft">
            {entry.role}
          </p>
          <p className="mt-4 max-w-[44ch] text-[0.925rem] leading-relaxed text-ink-soft">
            {entry.note}
          </p>
          {entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-4 inline-block text-[0.85rem] font-medium"
            >
              {entry.link.replace(/^https?:\/\//, "")}
              <span aria-hidden="true" className="ml-1">
                ↗
              </span>
            </a>
          ) : null}
        </>
      ) : (
        <p className="mt-3 max-w-[42ch] text-[0.9rem] leading-relaxed text-muted">
          {emptyHint}
        </p>
      )}
    </div>
  );
}

export function InspirationTree() {
  const uid = useId();
  const [selected, setSelected] = useState<Selected | null>(null);
  const [openBranch, setOpenBranch] = useState<BranchId | null>(null);

  const activeEntry = findEntry(selected);
  const activeBranch =
    branches.find((b) => b.id === selected?.branch) ?? branches[0];

  const emptyHint =
    totalEntries === 0
      ? "This branch is empty on purpose. Real influences will be added here with a name, what they do, and one honest sentence about why they matter."
      : "Select an entry on the left to read why it is here.";

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* ---------- tree (desktop) ---------- */}
      <div className="hidden lg:col-span-7 lg:block">
        <ol className="relative">
          {/* root */}
          <li className="relative pl-0">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="brand-mark h-9 w-9 text-[0.72rem]">
                AY
              </span>
              <div>
                <p className="brand-word text-[1.05rem]">AYODEX Labs</p>
                <p className="text-[0.75rem] text-muted">
                  Root — the practice these influences shaped
                </p>
              </div>
            </div>
            <span
              aria-hidden="true"
              className="absolute left-[1.08rem] top-11 h-8 w-px bg-line-strong"
            />
          </li>

          {branches.map((branch, branchIndex) => {
            const isLast = branchIndex === branches.length - 1;
            const isOpen = openBranch === branch.id;
            return (
              <li key={branch.id} className="relative pl-12">
                {/* trunk continuation */}
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.08rem] top-0 bottom-0 w-px bg-line-strong"
                  />
                ) : null}
                {/* branch connector */}
                <span
                  aria-hidden="true"
                  className="absolute left-[1.08rem] top-5 h-px w-7 bg-line-strong"
                />

                <button
                  type="button"
                  onClick={() => setOpenBranch(isOpen ? null : branch.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-${branch.id}`}
                  className="group flex w-full items-center justify-between gap-4 border-b border-line py-3.5 text-left"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-[family-name:var(--font-serif)] text-[1.25rem] leading-none">
                      {branch.label}
                    </span>
                    <span className="text-[0.7rem] tabular-nums text-muted-soft">
                      {branch.entries.length}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[0.8rem] text-muted transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>

                <div id={`${uid}-${branch.id}`} hidden={!isOpen}>
                  <p className="mt-3 max-w-[46ch] text-[0.85rem] leading-relaxed text-muted">
                    {branch.description}
                  </p>

                  {branch.entries.length > 0 ? (
                    <ul className="mt-3">
                      {branch.entries.map((entry) => {
                        const active =
                          selected?.branch === branch.id &&
                          selected.entryId === entry.id;
                        return (
                          <li key={entry.id} className="relative pl-7">
                            <span
                              aria-hidden="true"
                              className="absolute left-[0.42rem] top-0 bottom-0 w-px bg-line"
                            />
                            <span
                              aria-hidden="true"
                              className="absolute left-[0.28rem] top-[0.95rem] h-[5px] w-[5px] rounded-full"
                              style={{
                                background: active
                                  ? "var(--forest)"
                                  : "var(--line-strong)",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setSelected({ branch: branch.id, entryId: entry.id })
                              }
                              aria-pressed={active}
                              className="w-full py-2 text-left"
                            >
                              <span
                                className="text-[0.9rem] font-medium"
                                style={{ color: active ? "var(--forest)" : undefined }}
                              >
                                {entry.name}
                              </span>
                              <span className="ml-2 text-[0.75rem] text-muted-soft">
                                {entry.role}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="mt-3 border-l border-dashed border-line-strong pl-4 text-[0.8rem] leading-relaxed text-muted-soft">
                      No entries yet — this branch is waiting for real content,
                      not placeholders.
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ---------- mobile rail ---------- */}
      <div className="lg:hidden">
        <ol className="relative border-l border-line pl-6">
          <li className="relative -ml-6 mb-6 pl-6">
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 h-2 w-2 rounded-full bg-forest"
              style={{ transform: "translateX(-4.5px)" }}
            />
            <p className="brand-word text-[1rem]">AYODEX Labs</p>
            <p className="text-[0.75rem] text-muted">
              Root — influences below shaped this practice
            </p>
          </li>

          {branches.map((branch) => {
            const isOpen = openBranch === branch.id;
            return (
              <li key={branch.id} className="relative pb-2 pl-1">
                <span
                  aria-hidden="true"
                  className="absolute -left-6 top-4 h-px w-4 bg-line-strong"
                />
                <button
                  type="button"
                  onClick={() => setOpenBranch(isOpen ? null : branch.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-m-${branch.id}`}
                  className="flex w-full items-center justify-between gap-4 border-b border-line py-3 text-left"
                >
                  <span className="flex items-baseline gap-2">
                    <span className="font-[family-name:var(--font-serif)] text-[1.15rem] leading-none">
                      {branch.label}
                    </span>
                    <span className="text-[0.7rem] text-muted-soft">
                      {branch.entries.length}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[0.8rem] text-muted transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>

                <div id={`${uid}-m-${branch.id}`} hidden={!isOpen}>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">
                    {branch.description}
                  </p>
                  {branch.entries.length > 0 ? (
                    <ul className="mt-2">
                      {branch.entries.map((entry) => {
                        const active =
                          selected?.branch === branch.id &&
                          selected.entryId === entry.id;
                        return (
                          <li key={entry.id}>
                            <button
                              type="button"
                              onClick={() =>
                                setSelected({ branch: branch.id, entryId: entry.id })
                              }
                              aria-pressed={active}
                              className="flex w-full items-center justify-between gap-3 border-b border-line-soft py-2.5 text-left"
                            >
                              <span>
                                <span className="block text-[0.9rem] font-medium">
                                  {entry.name}
                                </span>
                                <span className="block text-[0.75rem] text-muted-soft">
                                  {entry.role}
                                </span>
                              </span>
                              <span aria-hidden="true" className="text-[0.8rem]">
                                {active ? "−" : "+"}
                              </span>
                            </button>
                            {active ? (
                              <div className="border-b border-line-soft py-3">
                                <p className="text-[0.875rem] leading-relaxed text-ink-soft">
                                  {entry.note}
                                </p>
                                {entry.link ? (
                                  <a
                                    href={entry.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-underline mt-2 inline-block text-[0.8rem]"
                                  >
                                    {entry.link.replace(/^https?:\/\//, "")}
                                    <span aria-hidden="true" className="ml-1">
                                      ↗
                                    </span>
                                  </a>
                                ) : null}
                              </div>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="mt-2 border-l border-dashed border-line-strong pl-3 text-[0.8rem] leading-relaxed text-muted-soft">
                      No entries yet — waiting for real content.
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ---------- detail (desktop) ---------- */}
      <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block">
        <div className="sticky top-28">
          <div className="border border-line p-6">
            <DetailPanel
              entry={activeEntry}
              branchLabel={activeBranch.label}
              emptyHint={emptyHint}
            />
            <div className="mt-6 border-t border-line pt-4">
              <p className="text-[0.75rem] leading-relaxed text-muted-soft">
                Selections are local to this page. Nothing is tracked, and no
                relationship is claimed beyond the note I wrote.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------- mobile detail fallback ---------- */}
      {activeEntry ? (
        <div className="lg:hidden">
          <DetailPanel
            entry={activeEntry}
            branchLabel={activeBranch.label}
            emptyHint={emptyHint}
          />
        </div>
      ) : null}
    </div>
  );
}
