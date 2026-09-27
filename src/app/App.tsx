import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  FileText,
  Check,
  AlertTriangle,
  Loader2,
  Pencil,
  RotateCcw,
  Plus,
  Eye,
  Code2,
  Columns2,
  ChevronDown,
  Calendar,
  Tag,
  User,
  BookOpen,
  Hash,
} from "lucide-react";

// ── TYPES ──────────────────────────────────────────────────────────────────

interface ContentFile {
  id: string;
  name: string;
  savedContent: string;
  savedAt: string | null;
}

type SaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";
type ViewMode = "split" | "editor" | "preview";

interface EditorState {
  files: ContentFile[];
  activeFileId: string;
  draft: string;
  saveStatus: SaveStatus;
  errors: string[];
  viewMode: ViewMode;
}

type Action =
  | { type: "SELECT_FILE"; id: string }
  | { type: "UPDATE_DRAFT"; content: string }
  | { type: "BEGIN_SAVE"; fileId: string }
  | { type: "SAVE_SUCCESS"; fileId: string; savedDraft: string }
  | { type: "SAVE_ERROR"; fileId: string }
  | { type: "RESET_DRAFT" }
  | { type: "SET_ERRORS"; errors: string[] }
  | { type: "SET_VIEW_MODE"; mode: ViewMode }
  | { type: "NEW_FILE" };

interface EditorCtx {
  state: EditorState;
  dispatch: React.Dispatch<Action>;
}

// ── SAMPLE CONTENT ─────────────────────────────────────────────────────────

const DANCEFLOOR = `---
type: journal-entry
title: "The Dancefloor Returns"
slug: the-dancefloor-returns
author: "Ash Shaw"
date: 2026-09-20
tags: [music, dancing, berlin, identity]
subtitle: "It was always the music that brought me back."
series: "Berlin Chronicles"
---

There is a moment — and every dancer knows it — when the first drop hits and the floor beneath you stops being a floor. It becomes a medium. A transmission surface. Something between you and the sound that has no name in English, though the Germans came close with **Gemeinschaft**: a community of the felt rather than the spoken.

I had not danced properly in four months. Not since the knee thing in April, which was not dramatic enough to call an injury but persistent enough to make me cautious. Four months of watching from the bar, nursing a drink, telling myself I was being sensible.

*Sensible.* Christ. I hate that word more than almost any other.

---

The venue was a warehouse on the eastern edge of Neukolln that had been a cold-storage facility before reunification, then a squat, then briefly a co-working space for a startup that did not survive 2022. Now it was this: a dark room with a sound system that cost more than most apartments and a crowd that understood instinctively what the room was for.

I was there because Marcus had a residency. Marcus, who I met in 2019 at the worst festival I have ever attended, who plays records like he is having a quiet conversation with the room rather than performing for it. I always dance better to Marcus because he never seems to want anything from me.

The knee held. More than held — it disappeared, the way good physical movement makes the body forget itself and become pure action.

---

Afterward we sat outside on upturned crates and drank water from plastic cups and did not talk much. The city made its usual 4am sounds: distant trams, a fox somewhere, the low hum of everything keeping itself alive.

Marcus said something I keep returning to. He said: *people come to the dancefloor to remember something they knew before language*. I think he is right about that. I think the thing they are trying to remember is that they are continuous.

The dancefloor gives you that. For a few hours, at whatever cost, you are not your thoughts about yourself. You are just the sound, moving.`;

const BERLIN = `---
type: journal-entry
title: "Berlin Morning Light"
slug: berlin-morning-light
author: "Ash Shaw"
date: 2026-08-14
tags: [berlin, creativity, writing, morning]
subtitle: "The city has a particular quality of light in August."
series: "Berlin Chronicles"
---

The window faces north-east, which means direct sun only in the early hours, and only in summer. In August it hits the opposite wall at about 5:45 and makes a rectangle that moves across the plaster over forty minutes like a slow clock, orange-gold, going warm white as the angle shifts. I have watched this process perhaps two hundred times and it still seems worth watching.

This is what I mean when I tell people Berlin changed me. Not the clubs, not the scene, not the politics or the history, though all of those matter. It was this: learning to pay attention to things that move slowly.

---

The writing goes better in the mornings here than it ever did in London. In London I had a flat with good light and a good desk and I wrote almost nothing for three years. In Berlin I have a kitchen table that wobbles and I write before I am properly awake and the wobble does not matter because I am not thinking about the table.

The difference is not the table. The difference is that in London I was surrounded by evidence of who I had decided to be — the books I wanted to have read, the furniture chosen to signal a kind of person — and all of it made writing feel like performance. Here I have almost nothing, and nothing has no opinion about what I produce.

There is a lesson in that which I am still unpacking.

---

By seven the light has fully arrived and is just light, not the spectacular light, and I make coffee and open whatever I was working on and see if the night left me anything usable. Usually it did. This is the other thing no one tells you about creative work: the subconscious is a slower writer but a better one, and it does most of its best work between midnight and 5am, and if you show up early enough you can collect what it left on the table.

The city outside is not yet awake, not fully. A bakery two blocks down starts its delivery van and it clatters over the cobblestones and the sound is exactly what cobblestones are for. Somewhere a dog is being walked by someone who also could not sleep. The canal is green and still.

Some mornings this is all I need. To have been present for the rectangle of light and the cobblestones and the green water. To have not wasted it.`;

const TODAY = new Date().toISOString().slice(0, 10);

const NEW_TEMPLATE =
  `---\ntype: journal-entry\ntitle: ""\nslug: untitled-${TODAY}\nauthor: "Ash Shaw"\ndate: ${TODAY}\ntags: []\n---\n\nStart writing here.`;

const INITIAL_FILES: ContentFile[] = [
  { id: "dancefloor", name: "2026-09-the-dancefloor-returns.md", savedContent: DANCEFLOOR, savedAt: "2026-09-27T18:00:00Z" },
  { id: "berlin", name: "2026-08-berlin-morning-light.md", savedContent: BERLIN, savedAt: "2026-09-27T16:30:00Z" },
];

// ── MARKDOWN UTILITIES ──────────────────────────────────────────────────────

function esc(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInline(raw: string): string {
  return esc(raw)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function renderMarkdown(raw: string): string {
  const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
  if (!body) return '<p class="md-empty">No content yet — start writing above.</p>';

  const lines = body.split("\n");
  const out: string[] = [];
  let inUL = false;
  let inOL = false;
  let inBQ = false;

  const flushList = () => {
    if (inUL) { out.push("</ul>"); inUL = false; }
    if (inOL) { out.push("</ol>"); inOL = false; }
  };
  const flushBQ = () => {
    if (inBQ) { out.push("</blockquote>"); inBQ = false; }
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    const hm = line.match(/^(#{1,4}) (.+)$/);
    if (hm) {
      flushList(); flushBQ();
      const lvl = hm[1].length;
      out.push(`<h${lvl}>${renderInline(hm[2])}</h${lvl}>`);
      i++; continue;
    }

    if (/^-{3,}$/.test(line.trim())) {
      flushList(); flushBQ();
      out.push("<hr>");
      i++; continue;
    }

    if (line.startsWith("> ")) {
      flushList();
      if (!inBQ) { out.push("<blockquote>"); inBQ = true; }
      out.push(`<p>${renderInline(line.slice(2))}</p>`);
      i++; continue;
    }

    if (/^[-*] /.test(line)) {
      flushBQ();
      if (!inUL) { flushList(); out.push("<ul>"); inUL = true; }
      out.push(`<li>${renderInline(line.replace(/^[-*] /, ""))}</li>`);
      i++; continue;
    }

    if (/^\d+\. /.test(line)) {
      flushBQ();
      if (!inOL) { flushList(); out.push("<ol>"); inOL = true; }
      out.push(`<li>${renderInline(line.replace(/^\d+\. /, ""))}</li>`);
      i++; continue;
    }

    if (!line.trim()) {
      flushList(); flushBQ();
      i++; continue;
    }

    flushList(); flushBQ();
    const ps: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      if (!l.trim()) break;
      if (/^#{1,4} /.test(l) || /^-{3,}$/.test(l.trim()) || /^[-*] /.test(l) || /^\d+\. /.test(l) || l.startsWith("> ")) break;
      ps.push(l);
      i++;
    }
    if (ps.length) out.push(`<p>${renderInline(ps.join(" "))}</p>`);
  }

  flushList(); flushBQ();
  return out.join("\n");
}

function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const key = line.slice(0, colon).trim();
    let val = line.slice(colon + 1).trim();
    if ((val[0] === '"' && val[val.length - 1] === '"') || (val[0] === "'" && val[val.length - 1] === "'")) {
      val = val.slice(1, -1);
    }
    if (val.startsWith("[") && val.endsWith("]")) {
      result[key] = val.slice(1, -1).split(",").map(s => s.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
      continue;
    }
    if (val === "true") { result[key] = true; continue; }
    if (val === "false") { result[key] = false; continue; }
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) { result[key] = val; continue; }
    const n = Number(val);
    if (val && !isNaN(n)) { result[key] = n; continue; }
    result[key] = val;
  }
  return result;
}

function validateContent(raw: string): string[] {
  const errs: string[] = [];
  if (!/^---\n[\s\S]*?\n---/.test(raw)) return ["Missing frontmatter block (file must begin with ---)"];
  const fm = parseFrontmatter(raw);
  if (fm.type !== "journal-entry") errs.push('type must be "journal-entry"');
  if (!fm.title) errs.push("title is required");
  else if (typeof fm.title === "string" && fm.title.trim() === "") errs.push("title cannot be empty");
  else if (typeof fm.title === "string" && fm.title.length > 120) errs.push("title exceeds 120 characters");
  if (!fm.slug) errs.push("slug is required");
  else if (typeof fm.slug === "string" && !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(fm.slug)) errs.push("slug must be lowercase kebab-case (e.g. my-entry)");
  if (!fm.author) errs.push("author is required");
  if (!fm.date) errs.push("date is required");
  else if (typeof fm.date === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(fm.date)) errs.push("date must be YYYY-MM-DD format");
  if (!fm.tags) errs.push("tags array is required");
  else if (!Array.isArray(fm.tags)) errs.push("tags must be an inline array: [tag1, tag2]");
  else if ((fm.tags as unknown[]).length === 0) errs.push("at least one tag is required");
  else if ((fm.tags as unknown[]).length > 10) errs.push("maximum 10 tags allowed");
  const bodyText = raw.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
  if (!bodyText) errs.push("body content is empty");
  return errs;
}

function wc(text: string): number {
  return text.replace(/^---\n[\s\S]*?\n---\n?/, "").trim().split(/\s+/).filter(Boolean).length;
}

function readTime(words: number): string {
  const m = Math.ceil(words / 200);
  return m === 1 ? "1 min" : `${m} min`;
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ── REDUCER ────────────────────────────────────────────────────────────────

const INITIAL_STATE: EditorState = {
  files: INITIAL_FILES,
  activeFileId: "dancefloor",
  draft: DANCEFLOOR,
  saveStatus: "saved",
  errors: [],
  viewMode: "split",
};

function reducer(state: EditorState, action: Action): EditorState {
  switch (action.type) {
    case "SELECT_FILE": {
      const f = state.files.find(f => f.id === action.id);
      if (!f || f.id === state.activeFileId) return state;
      return { ...state, activeFileId: action.id, draft: f.savedContent, saveStatus: "idle", errors: [] };
    }
    case "UPDATE_DRAFT":
      return { ...state, draft: action.content, saveStatus: "dirty" };
    case "BEGIN_SAVE":
      return state.activeFileId === action.fileId ? { ...state, saveStatus: "saving" } : state;
    case "SAVE_SUCCESS": {
      const isActive = state.activeFileId === action.fileId;
      return {
        ...state,
        saveStatus: isActive ? "saved" : state.saveStatus,
        files: state.files.map(f =>
          f.id === action.fileId
            ? { ...f, savedContent: action.savedDraft, savedAt: new Date().toISOString() }
            : f
        ),
      };
    }
    case "SAVE_ERROR":
      return state.activeFileId === action.fileId ? { ...state, saveStatus: "error" } : state;
    case "RESET_DRAFT": {
      const f = state.files.find(f => f.id === state.activeFileId);
      return f ? { ...state, draft: f.savedContent, saveStatus: "idle", errors: [] } : state;
    }
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.mode };
    case "NEW_FILE": {
      const id = `new-${Date.now()}`;
      const nf: ContentFile = { id, name: `${TODAY}-untitled.md`, savedContent: NEW_TEMPLATE, savedAt: null };
      return { ...state, files: [...state.files, nf], activeFileId: id, draft: NEW_TEMPLATE, saveStatus: "idle", errors: [] };
    }
    default: return state;
  }
}

// ── CONTEXT ────────────────────────────────────────────────────────────────

const EditorContext = createContext<EditorCtx | null>(null);

function useEditor(): EditorCtx {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be within EditorProvider");
  return ctx;
}

// ── AUTOSAVE HOOK ──────────────────────────────────────────────────────────

function useAutosave(state: EditorState, dispatch: React.Dispatch<Action>) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draftRef = useRef(state.draft);
  const fileIdRef = useRef(state.activeFileId);
  const saveIdRef = useRef(0);
  draftRef.current = state.draft;
  fileIdRef.current = state.activeFileId;

  useEffect(() => {
    if (state.saveStatus !== "dirty") return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const fileId = fileIdRef.current;
      const draft = draftRef.current;
      const errors = validateContent(draft);
      dispatch({ type: "SET_ERRORS", errors });
      if (errors.length === 0) {
        const sid = ++saveIdRef.current;
        dispatch({ type: "BEGIN_SAVE", fileId });
        setTimeout(() => {
          if (saveIdRef.current === sid) dispatch({ type: "SAVE_SUCCESS", fileId, savedDraft: draft });
        }, 380);
      } else {
        dispatch({ type: "SAVE_ERROR", fileId });
      }
    }, 1500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [state.draft, dispatch]);
}

// ── SAVE INDICATOR ─────────────────────────────────────────────────────────

const STATUS_CFG = {
  idle: { cls: "text-muted-foreground", label: "No changes", Icon: null, spin: false },
  dirty: { cls: "text-amber-400/80", label: "Unsaved", Icon: Pencil, spin: false },
  saving: { cls: "text-sky-400", label: "Saving…", Icon: Loader2, spin: true },
  saved: { cls: "text-emerald-400/90", label: "Saved", Icon: Check, spin: false },
  error: { cls: "text-red-400", label: "Errors found", Icon: AlertTriangle, spin: false },
} as const;

function SaveIndicator({ status }: { status: SaveStatus }) {
  const { cls, label, Icon, spin } = STATUS_CFG[status];
  return (
    <div className={`flex items-center gap-1.5 font-mono text-[11px] ${cls}`}>
      {Icon && <Icon size={11} className={spin ? "animate-spin" : ""} strokeWidth={1.75} />}
      <span>{label}</span>
    </div>
  );
}

// ── FILE TREE ──────────────────────────────────────────────────────────────

function FileTree() {
  const { state, dispatch } = useEditor();
  const activeFile = state.files.find(f => f.id === state.activeFileId);
  const fm = useMemo(() => (activeFile ? parseFrontmatter(activeFile.savedContent) : {}), [activeFile?.savedContent]);

  return (
    <aside className="flex flex-col border-r border-border" style={{ width: 224, minWidth: 224, background: "var(--card)" }}>
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border flex-shrink-0">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">content/</span>
        <button
          onClick={() => dispatch({ type: "NEW_FILE" })}
          className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground hover:text-amber-400 transition-colors"
          title="New file"
        >
          <Plus size={10} strokeWidth={2} />
          New
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-0.5 min-h-0">
        {state.files.map(file => {
          const active = file.id === state.activeFileId;
          const dirty = active && (state.saveStatus === "dirty" || state.saveStatus === "error");
          return (
            <button
              key={file.id}
              onClick={() => dispatch({ type: "SELECT_FILE", id: file.id })}
              className={[
                "w-full flex items-center gap-2 px-3 py-2 text-left transition-all duration-100 border-l-[2px]",
                active
                  ? "bg-white/[0.04] border-amber-400/60 text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground/80 hover:bg-white/[0.02]",
              ].join(" ")}
            >
              <FileText size={10} strokeWidth={1.5} className="flex-shrink-0 opacity-50" />
              <span className="font-mono text-[11px] truncate flex-1 leading-tight">
                {file.name.replace(/^\d{4}-\d{2}-/, "")}
              </span>
              {dirty && <span className="w-[6px] h-[6px] rounded-full bg-amber-400 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {activeFile && (
        <div className="border-t border-border px-3 py-3 space-y-2.5 flex-shrink-0">
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground mb-1">Metadata</div>

          {fm.title && (
            <div className="flex gap-2 items-start">
              <BookOpen size={9} className="text-amber-400/50 mt-[2px] flex-shrink-0" strokeWidth={1.5} />
              <span className="font-mono text-[10px] text-foreground/70 break-words leading-[1.4]">{String(fm.title)}</span>
            </div>
          )}
          {fm.date && (
            <div className="flex gap-2 items-center">
              <Calendar size={9} className="text-amber-400/50 flex-shrink-0" strokeWidth={1.5} />
              <span className="font-mono text-[10px] text-muted-foreground">{String(fm.date)}</span>
            </div>
          )}
          {fm.author && (
            <div className="flex gap-2 items-center">
              <User size={9} className="text-amber-400/50 flex-shrink-0" strokeWidth={1.5} />
              <span className="font-mono text-[10px] text-muted-foreground truncate">{String(fm.author)}</span>
            </div>
          )}
          {fm.series && (
            <div className="flex gap-2 items-center">
              <Hash size={9} className="text-amber-400/50 flex-shrink-0" strokeWidth={1.5} />
              <span className="font-mono text-[10px] text-muted-foreground truncate">{String(fm.series)}</span>
            </div>
          )}
          {Array.isArray(fm.tags) && (fm.tags as string[]).length > 0 && (
            <div className="flex gap-1.5 items-start">
              <Tag size={9} className="text-amber-400/50 mt-[2px] flex-shrink-0" strokeWidth={1.5} />
              <div className="flex flex-wrap gap-1">
                {(fm.tags as string[]).map(t => (
                  <span
                    key={t}
                    className="font-mono text-[9px] px-1.5 py-0.5 rounded-[2px]"
                    style={{ background: "rgba(200,144,42,0.12)", color: "rgba(200,144,42,0.75)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          {activeFile.savedAt && (
            <div className="font-mono text-[9px] text-muted-foreground/40 pt-0.5">
              saved {fmtTime(activeFile.savedAt)}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

// ── EDITOR PANE ────────────────────────────────────────────────────────────

const LINE_H = 22;
const EDITOR_PT = 16;
const EDITOR_PX = 14;

function EditorPane() {
  const { state, dispatch } = useEditor();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const lineCount = useMemo(() => state.draft.split("\n").length, [state.draft]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: "UPDATE_DRAFT", content: e.target.value });
    },
    [dispatch]
  );

  const syncScroll = useCallback(() => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.style.transform = `translateY(-${textareaRef.current.scrollTop}px)`;
    }
  }, []);

  useEffect(() => {
    syncScroll();
  }, [state.activeFileId, syncScroll]);

  return (
    <div className="flex h-full overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Gutter */}
      <div
        className="relative overflow-hidden flex-shrink-0 border-r border-border"
        style={{ width: 42, background: "rgba(13,13,15,0.6)" }}
      >
        <div
          ref={gutterRef}
          className="absolute top-0 left-0 right-0"
          style={{ paddingTop: EDITOR_PT }}
        >
          {Array.from({ length: lineCount }, (_, idx) => (
            <div
              key={idx}
              className="font-mono select-none text-right pr-2.5"
              style={{
                height: LINE_H,
                lineHeight: `${LINE_H}px`,
                fontSize: 10,
                color: "rgba(78,78,90,0.6)",
              }}
            >
              {idx + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={state.draft}
        onChange={handleChange}
        onScroll={syncScroll}
        spellCheck={false}
        className="flex-1 resize-none outline-none font-mono overflow-y-auto"
        placeholder="Start writing…"
        style={{
          background: "transparent",
          color: "var(--foreground)",
          fontSize: 12.5,
          lineHeight: `${LINE_H}px`,
          paddingTop: EDITOR_PT,
          paddingBottom: 40,
          paddingLeft: EDITOR_PX,
          paddingRight: 24,
          tabSize: 2,
          caretColor: "rgba(200,144,42,0.9)",
        }}
      />
    </div>
  );
}

// ── PREVIEW PANE ───────────────────────────────────────────────────────────

const PROSE = [
  "[&_h1]:text-xl [&_h1]:font-semibold [&_h1]:mb-4 [&_h1]:leading-snug",
  "[&_h2]:text-base [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:tracking-tight",
  "[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-5",
  "[&_p]:text-[13px] [&_p]:leading-[1.85] [&_p]:mb-4",
  "[&_p]:text-foreground/80",
  "[&_strong]:font-semibold [&_strong]:text-foreground",
  "[&_em]:italic",
  "[&_code]:font-mono [&_code]:text-[11px] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-[2px]",
  "[&_code]:bg-white/[0.05] [&_code]:text-amber-300/80",
  "[&_hr]:my-7 [&_hr]:border-white/[0.08]",
  "[&_blockquote]:border-l-2 [&_blockquote]:border-amber-400/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4",
  "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4",
  "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4",
  "[&_li]:text-[13px] [&_li]:leading-relaxed [&_li]:mb-1 [&_li]:text-foreground/80",
  "[&_a]:text-amber-400 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-amber-400/40",
  "[&_.md-empty]:text-muted-foreground [&_.md-empty]:text-sm [&_.md-empty]:italic",
].join(" ");

function PreviewPane() {
  const { state } = useEditor();
  const fm = useMemo(() => parseFrontmatter(state.draft), [state.draft]);
  const html = useMemo(() => renderMarkdown(state.draft), [state.draft]);
  const words = useMemo(() => wc(state.draft), [state.draft]);

  return (
    <div className="flex flex-col h-full overflow-hidden border-l border-border">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border flex-shrink-0" style={{ background: "rgba(13,13,15,0.5)" }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Preview</span>
        <span className="font-mono text-[10px] text-muted-foreground/40">
          {words.toLocaleString()} words &middot; {readTime(words)} read
        </span>
      </div>

      {(fm.title || fm.subtitle) && (
        <div className="px-6 py-5 border-b border-border flex-shrink-0" style={{ background: "rgba(200,144,42,0.03)" }}>
          {fm.title && (
            <h1 className="text-[15px] font-semibold text-foreground leading-snug mb-1.5">
              {String(fm.title)}
            </h1>
          )}
          {fm.subtitle && (
            <p className="font-mono text-[11px] text-muted-foreground italic leading-relaxed">
              {String(fm.subtitle)}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {fm.author && <span className="font-mono text-[10px] text-muted-foreground/60">{String(fm.author)}</span>}
            {fm.date && <span className="font-mono text-[10px] text-muted-foreground/40">{String(fm.date)}</span>}
          </div>
          {Array.isArray(fm.tags) && (fm.tags as string[]).length > 0 && (
            <div className="flex gap-1 mt-2.5 flex-wrap">
              {(fm.tags as string[]).map(t => (
                <span
                  key={t}
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded-[2px]"
                  style={{ background: "rgba(200,144,42,0.1)", color: "rgba(200,144,42,0.65)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div
        className={`flex-1 overflow-y-auto px-6 py-6 ${PROSE}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

// ── STATUS BAR ─────────────────────────────────────────────────────────────

function StatusBar() {
  const { state } = useEditor();
  const [expanded, setExpanded] = useState(false);
  const words = useMemo(() => wc(state.draft), [state.draft]);
  const lines = state.draft.split("\n").length;
  const chars = state.draft.length;
  const hasErr = state.errors.length > 0;

  return (
    <div className="flex-shrink-0 border-t border-border" style={{ background: "rgba(13,13,15,0.7)" }}>
      {hasErr && expanded && (
        <div className="border-b border-red-950/60 px-4 py-2 space-y-1.5" style={{ background: "rgba(100,20,20,0.18)" }}>
          {state.errors.map((err, i) => (
            <div key={i} className="flex items-start gap-2">
              <AlertTriangle size={10} className="text-red-400/70 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <span className="font-mono text-[10px] text-red-300/70">{err}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between px-4 h-7">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-muted-foreground/50">
            {words.toLocaleString()} words
          </span>
          <span className="text-muted-foreground/20 text-[10px]">&middot;</span>
          <span className="font-mono text-[10px] text-muted-foreground/40">
            {readTime(words)}
          </span>
          <span className="text-muted-foreground/20 text-[10px]">&middot;</span>
          <span className="font-mono text-[10px] text-muted-foreground/30">
            {lines}L &middot; {chars.toLocaleString()}C
          </span>
        </div>

        <div className="flex items-center gap-3">
          {hasErr && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="flex items-center gap-1 font-mono text-[10px] text-red-400/70 hover:text-red-400 transition-colors"
            >
              <AlertTriangle size={9} strokeWidth={1.5} />
              {state.errors.length} error{state.errors.length !== 1 ? "s" : ""}
              <ChevronDown
                size={9}
                strokeWidth={1.5}
                style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 150ms" }}
              />
            </button>
          )}
          <span className="font-mono text-[10px] text-muted-foreground/30">
            {state.files.find(f => f.id === state.activeFileId)?.name ?? ""}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── TOOLBAR ────────────────────────────────────────────────────────────────

function Toolbar() {
  const { state, dispatch } = useEditor();
  const activeFile = state.files.find(f => f.id === state.activeFileId);
  const canReset = state.saveStatus === "dirty" || state.saveStatus === "error";

  const views: { mode: ViewMode; Icon: React.ElementType; label: string }[] = [
    { mode: "editor", Icon: Code2, label: "Editor only" },
    { mode: "split", Icon: Columns2, label: "Split view" },
    { mode: "preview", Icon: Eye, label: "Preview only" },
  ];

  return (
    <header
      className="flex-shrink-0 flex items-center justify-between px-4 border-b border-border"
      style={{ height: 44, background: "rgba(13,13,15,0.8)" }}
    >
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-xs font-medium select-none" style={{ color: "rgba(200,144,42,0.85)" }}>
          content.md
        </span>
        <span className="text-muted-foreground/20 text-xs">/</span>
        <span className="font-mono text-[11px] text-muted-foreground/60 truncate max-w-52">
          {activeFile?.name ?? ""}
        </span>
      </div>

      <SaveIndicator status={state.saveStatus} />

      <div className="flex items-center gap-2.5">
        {canReset && (
          <button
            onClick={() => dispatch({ type: "RESET_DRAFT" })}
            className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            title="Discard changes and restore last saved version"
          >
            <RotateCcw size={11} strokeWidth={1.5} />
            Reset
          </button>
        )}

        <div
          className="flex items-center overflow-hidden"
          style={{ border: "1px solid var(--border)", borderRadius: 3 }}
        >
          {views.map(({ mode, Icon, label }) => (
            <button
              key={mode}
              onClick={() => dispatch({ type: "SET_VIEW_MODE", mode })}
              title={label}
              className="flex items-center justify-center transition-colors"
              style={{
                width: 30,
                height: 26,
                background: state.viewMode === mode ? "rgba(200,144,42,0.14)" : "transparent",
                color: state.viewMode === mode ? "rgba(200,144,42,0.9)" : "var(--muted-foreground)",
              }}
            >
              <Icon size={11} strokeWidth={1.75} />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────

function EditorLayout() {
  const { state } = useEditor();
  const showEditor = state.viewMode === "editor" || state.viewMode === "split";
  const showPreview = state.viewMode === "preview" || state.viewMode === "split";

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans dark">
      <Toolbar />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <FileTree />
        {showEditor && (
          <div className="flex-1 min-w-0 overflow-hidden">
            <EditorPane />
          </div>
        )}
        {showPreview && (
          <div className="flex-1 min-w-0 overflow-hidden">
            <PreviewPane />
          </div>
        )}
      </div>
      <StatusBar />
    </div>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  useAutosave(state, dispatch);
  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      <EditorLayout />
    </EditorContext.Provider>
  );
}
