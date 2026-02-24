"use client";

import { useMemo, useState } from "react";

type Item = {
  term: string;
  category: string;
  definition: string;
  tip?: string;
};

type Labels = {
  start: string;
  next: string;
  restart: string;

  // UI texts
  startHint: string;          // "{count} random questions…"
  resultTitle: string;        // "Result"
  resultText: string;         // "You answered {score} of {total} correctly."
  scoreLabel: string;         // "Score"
  promptTitle: string;        // "What does this describe?"
  notEnoughTitle: string;     // "Quiz"
  notEnoughText: string;      // "Not enough terms…"

  // Reveal
  reveal: string;             // "Solution" (label in solution box)
  revealButton: string;       // Button text "Show solution"

  // Badges
  correctBadge: string;       // "correct"
  wrongBadge: string;         // "wrong"
};

type Question = {
  prompt: string;
  correct: Item;
  options: Item[];
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleUnique<T>(arr: T[], n: number) {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

// Fallbacks (neutral, damit nicht aus Versehen DE angezeigt wird)
const DEFAULT_LABELS: Labels = {
  start: "Start",
  next: "Next",
  restart: "Restart",
  startHint: "{count} random questions — freshly shuffled every time.",
  resultTitle: "Result",
  resultText: "You answered {score} out of {total} correctly.",
  scoreLabel: "Score",
  promptTitle: "What does this describe?",
  notEnoughTitle: "Quiz",
  notEnoughText: "Not enough terms to start a quiz (min. 4).",
  reveal: "Solution",
  revealButton: "Show solution",
  correctBadge: "correct",
  wrongBadge: "wrong"
};

export default function Quiz({
  items,
  labels = DEFAULT_LABELS,
  questionCount = 20
}: {
  items: Item[];
  labels?: Labels;
  questionCount?: number;
}) {
  const [started, setStarted] = useState(false);
  const [seed, setSeed] = useState(0);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const questions: Question[] = useMemo(() => {
    if (!items || items.length < 4) return [];
    const pool = sampleUnique(items, questionCount);

    return pool.map((correct) => {
      const wrongPool = items.filter((i) => i.term !== correct.term);
      const wrong = sampleUnique(wrongPool, 3);

      return {
        prompt: correct.definition,
        correct,
        options: shuffle([correct, ...wrong])
      };
    });
  }, [items, questionCount, seed]);

  const current = questions[index];
  const finished = started && index >= questions.length;

  function start() {
    setStarted(true);
    setSeed((s) => s + 1);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setRevealed(false);
  }

  function restart() {
    setSeed((s) => s + 1);
    setStarted(true);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setRevealed(false);
  }

  function choose(term: string) {
    if (!current || answered) return;

    setSelected(term);
    setAnswered(true);

    if (term === current.correct.term) {
      setScore((s) => s + 1);
    }
  }

  function reveal() {
    if (!answered) return;
    setRevealed(true);
  }

  function next() {
    if (!current || !answered) return;

    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
    setRevealed(false);
  }

  // helpers for templating
  const startHintText = (labels.startHint || DEFAULT_LABELS.startHint)
  .replace("{count}", String(questionCount));

const resultText = (labels.resultText || DEFAULT_LABELS.resultText)
  .replace("{score}", String(score))
  .replace("{total}", String(questions.length));

  if (!items || items.length < 4) {
    return (
      <div className="glass rounded-3xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-zinc-100">{labels.notEnoughTitle}</h2>
        <p className="mt-2 text-sm text-zinc-400">{labels.notEnoughText}</p>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="glass rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-zinc-100">{labels.start}</h2>
        <p className="mt-2 text-sm text-zinc-400">{startHintText}</p>
        <button
          onClick={start}
          className="mt-6 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
        >
          {labels.start}
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="glass rounded-3xl p-6 sm:p-8 text-center">
        <div className="text-sm text-zinc-400">{labels.resultTitle}</div>
        <div className="mt-2 text-3xl font-black text-orange-400">
          {score}/{questions.length}
        </div>
        <p className="mt-2 text-sm text-zinc-300">{resultText}</p>

        <button
          onClick={restart}
          className="mt-6 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
        >
          {labels.restart}
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 space-y-5">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-zinc-400">
        <span>
          {index + 1}/{questions.length}
        </span>
        <span>
          {labels.scoreLabel}: <span className="text-zinc-200">{score}</span>
        </span>
      </div>

      {/* Prompt */}
      <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-4">
        <div className="text-xs uppercase tracking-wide text-zinc-500">
          {labels.promptTitle}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-200">
          {current.prompt}
        </p>
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {current.options.map((opt) => {
          const isCorrect = answered && opt.term === current.correct.term;
          const isSelected = answered && selected === opt.term;
          const isWrongSelected = isSelected && !isCorrect;

          const base =
            "rounded-2xl border px-4 py-3 text-left text-sm transition flex items-center justify-between gap-4";
          const idle =
            "border-zinc-800 bg-zinc-950/60 hover:border-orange-500/50 hover:bg-orange-500/10";
          const disabled = "cursor-default";

          const correctStyle =
            "border-emerald-400 bg-emerald-500/20 ring-2 ring-emerald-400/30";
          const wrongStyle =
            "border-red-400 bg-red-500/20 ring-2 ring-red-400/30";

          const cls = [
            base,
            answered ? disabled : idle,
            isCorrect ? correctStyle : "",
            isWrongSelected ? wrongStyle : ""
          ].join(" ");

          return (
            <button
              key={opt.term}
              onClick={() => choose(opt.term)}
              disabled={answered}
              className={cls}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {answered ? (
                    isCorrect ? (
                      <span className="text-emerald-300">✓</span>
                    ) : isWrongSelected ? (
                      <span className="text-red-300">✕</span>
                    ) : (
                      <span className="text-zinc-600">•</span>
                    )
                  ) : (
                    <span className="text-zinc-600">•</span>
                  )}

                  <span
                    className={[
                      "truncate font-medium",
                      isCorrect ? "text-emerald-100" : "",
                      isWrongSelected ? "text-red-100" : "text-zinc-100"
                    ].join(" ")}
                  >
                    {opt.term}
                  </span>
                </div>

                <div className="mt-1 text-xs text-zinc-500">{opt.category}</div>
              </div>

              {/* Right side badge */}
              {answered && isCorrect ? (
                <span className="shrink-0 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
                  {labels.correctBadge}
                </span>
              ) : answered && isWrongSelected ? (
                <span className="shrink-0 rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-200 ring-1 ring-red-400/30">
                  {labels.wrongBadge}
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-zinc-800/40 px-3 py-1 text-xs text-zinc-400 ring-1 ring-zinc-700/40">
                  {opt.category}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Reveal explanation */}
      {revealed ? (
        <div className="rounded-2xl bg-gradient-to-br from-orange-500/15 to-orange-500/5 p-4 ring-1 ring-orange-500/20">
          <div className="text-xs uppercase tracking-wide text-orange-200/80">
            {labels.reveal}
          </div>
          <p className="mt-2 text-sm text-orange-100">
            <span className="font-semibold">{current.correct.term}:</span>{" "}
            {current.correct.definition}
          </p>
          {current.correct.tip ? (
            <p className="mt-2 text-sm text-orange-200/90">
              <span className="font-semibold">Tipp:</span> {current.correct.tip}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={restart}
          className="rounded-2xl border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-orange-500/40"
        >
          {labels.restart}
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={reveal}
            disabled={!answered || revealed}
            className={[
              "rounded-2xl px-4 py-2 text-sm font-semibold transition",
              (!answered || revealed)
                ? "bg-zinc-800/40 text-zinc-500 cursor-not-allowed"
                : "bg-orange-500/15 text-orange-200 ring-1 ring-orange-500/30 hover:bg-orange-500/20"
            ].join(" ")}
          >
            {labels.revealButton}
          </button>

          <button
            onClick={next}
            disabled={!answered}
            className={[
              "rounded-2xl px-4 py-2 text-sm font-semibold transition",
              answered
                ? "bg-orange-500 text-zinc-950 hover:opacity-90"
                : "bg-zinc-800/40 text-zinc-500 cursor-not-allowed"
            ].join(" ")}
          >
            {labels.next}
          </button>
        </div>
      </div>
    </div>
  );
}