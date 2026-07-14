import { useEffect, useMemo, useState } from "react";
import "./DeepWorkScoreboard.css";

const STORAGE_KEY = "deep-work-scoreboard-entries";
const INITIAL_ENTRIES = [
  { date: "2026-07-13", hours: 4 },
  { date: "2026-07-12", hours: 4 },
  { date: "2026-07-11", hours: 2 },
];

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readEntries() {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);

    if (storedValue !== null) {
      const savedEntries = JSON.parse(storedValue);
      const isValid =
        Array.isArray(savedEntries) &&
        savedEntries.every(
          (entry) =>
            /^\d{4}-\d{2}-\d{2}$/.test(entry?.date) &&
            Number.isInteger(entry?.hours) &&
            entry.hours >= 0 &&
            entry.hours <= 12,
        );

      if (isValid) return savedEntries;
    }
  } catch {
    // Fall through to the historical seed if saved data cannot be parsed.
  }

  const initialEntries = INITIAL_ENTRIES.map((entry) => ({ ...entry }));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEntries));
  } catch {
    // The scoreboard remains usable for this session if storage is unavailable.
  }

  return initialEntries;
}

function getStartOfWeek() {
  const date = new Date();
  const daysSinceMonday = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - daysSinceMonday);
  return getLocalDateKey(date);
}

function formatDate(dateKey, includeWeekday = true) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    ...(includeWeekday ? { weekday: "short" } : {}),
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function HourSquares({ hours }) {
  return (
    <div
      className="hour-squares"
      aria-label={`${hours} deep work ${hours === 1 ? "hour" : "hours"}`}
    >
      {hours === 0 ? <span className="no-hours">—</span> : null}
      {Array.from({ length: hours }, (_, index) => (
        <span className="hour-square" aria-hidden="true" key={index} />
      ))}
    </div>
  );
}

function DeepWorkScoreboard() {
  const today = getLocalDateKey();
  const [entries, setEntries] = useState(readEntries);
  const [draftHours, setDraftHours] = useState(
    () => entries.find((entry) => entry.date === today)?.hours ?? 0,
  );
  const [message, setMessage] = useState("");
  const [celebrationId, setCelebrationId] = useState(0);
  const [editingDate, setEditingDate] = useState(null);
  const [editHours, setEditHours] = useState("");

  useEffect(() => {
    document.title = "Deep Work Scoreboard";

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.name = "robots";
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = "noindex, nofollow";
  }, []);

  useEffect(() => {
    if (!celebrationId) return undefined;

    const timeout = window.setTimeout(() => setCelebrationId(0), 1400);
    return () => window.clearTimeout(timeout);
  }, [celebrationId]);

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries],
  );
  const wallHours = useMemo(
    () =>
      [...entries]
        .sort((a, b) => a.date.localeCompare(b.date))
        .flatMap((entry) =>
          Array.from({ length: entry.hours }, (_, index) => ({
            id: `${entry.date}-${index}`,
            date: entry.date,
          })),
        ),
    [entries],
  );
  const lifetimeTotal = entries.reduce(
    (total, entry) => total + entry.hours,
    0,
  );
  const startOfWeek = getStartOfWeek();
  const weekTotal = entries
    .filter((entry) => entry.date >= startOfWeek && entry.date <= today)
    .reduce((total, entry) => total + entry.hours, 0);

  function submitToday() {
    const nextEntries = [
      ...entries.filter((entry) => entry.date !== today),
      { date: today, hours: draftHours },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));
    setEntries(nextEntries);
    setMessage(`${draftHours} ${draftHours === 1 ? "hour" : "hours"} logged. The wall is up to date.`);
    setCelebrationId((id) => id + 1);
  }

  function handleHourClick(index) {
    setDraftHours(index < draftHours ? index : index + 1);
    setMessage("");
  }

  function startEditing(entry) {
    setEditingDate(entry.date);
    setEditHours(String(entry.hours));
  }

  function cancelEditing() {
    setEditingDate(null);
    setEditHours("");
  }

  function handleEditHoursChange(event) {
    const value = event.target.value;

    if (value === "" || (/^\d{1,2}$/.test(value) && Number(value) <= 12)) {
      setEditHours(value);
    }
  }

  function saveEditedEntry(event) {
    event.preventDefault();

    if (editHours === "") return;

    const hours = Number(editHours);
    const nextEntries = entries.map((entry) =>
      entry.date === editingDate ? { ...entry, hours } : entry,
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));
    setEntries(nextEntries);
    if (editingDate === today) setDraftHours(hours);
    cancelEditing();
  }

  return (
    <main className="scoreboard-page">
      {celebrationId ? (
        <div className="submission-celebration" aria-hidden="true" key={celebrationId}>
          <span>Deep work logged</span>
        </div>
      ) : null}
      <header className="scoreboard-intro">
        <p className="scoreboard-kicker">Deep Work Scoreboard</p>
        <p>
          This is a personal Deep Work scoreboard. Each filled square represents
          one honest hour of focused, distraction-free deep work. This page is
          unlisted and mainly for my own accountability.
        </p>
      </header>

      <section className="scoreboard-totals" aria-label="Deep work totals">
        <div className="lifetime-total">
          <span className="total-label">Lifetime</span>
          <strong>{lifetimeTotal}</strong>
          <span className="total-unit">{lifetimeTotal === 1 ? "hour" : "hours"}</span>
        </div>
        <div className="week-total">
          <span>This week</span>
          <strong>{weekTotal} of 12 hours</strong>
          <progress value={Math.min(weekTotal, 12)} max="12">
            {Math.min(weekTotal, 12)} of 12 hours
          </progress>
        </div>
      </section>

      <section className="scoreboard-entry" aria-labelledby="today-heading">
        <div className="entry-heading">
          <p className="section-label" id="today-heading">
            Today
          </p>
          <p className="entry-reminder">
            Be honest, count only real deep work, and round down.
          </p>
        </div>
        <div className="today-count" aria-live="polite">
          {draftHours} / 12 hours
        </div>
        <div className="check-in-grid" aria-label="Set today's deep work hours">
          {Array.from({ length: 12 }, (_, index) => {
            const isFilled = index < draftHours;
            const nextHours = isFilled ? index : index + 1;
            return (
              <button
                className={`check-in-box${isFilled ? " check-in-box--filled" : ""}`}
                type="button"
                aria-label={`Set today to ${nextHours} ${nextHours === 1 ? "hour" : "hours"}`}
                aria-pressed={isFilled}
                key={index}
                onClick={() => handleHourClick(index)}
              >
                <span aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <div className="submit-row">
          <p className="save-message" aria-live="polite">
            {message}
          </p>
          <button className="submit-hours" type="button" onClick={submitToday}>
            Submit {draftHours} {draftHours === 1 ? "hour" : "hours"}
          </button>
        </div>
      </section>

      <section className="accumulation-wall" aria-labelledby="wall-heading">
        <div className="wall-heading">
          <div>
            <p className="section-label" id="wall-heading">
              Lifetime wall
            </p>
            <p>One square for every honest hour.</p>
          </div>
          <span>
            {lifetimeTotal} {lifetimeTotal === 1 ? "square" : "squares"}
          </span>
        </div>
        {wallHours.length === 0 ? (
          <div className="empty-wall">Your first square starts here.</div>
        ) : (
          <div
            className="wall-grid"
            aria-label={`${lifetimeTotal} lifetime deep work hours`}
          >
            {wallHours.map((hour) => (
              <span
                className="wall-square"
                data-tooltip={formatDate(hour.date, false)}
                tabIndex={0}
                aria-label={`Deep work hour completed ${formatDate(hour.date, false)}`}
                key={hour.id}
              />
            ))}
          </div>
        )}
      </section>

      <section className="daily-log" aria-labelledby="daily-log-heading">
        <div className="log-heading">
          <p className="section-label" id="daily-log-heading">
            Daily log
          </p>
          <span>
            {sortedEntries.length} {sortedEntries.length === 1 ? "day" : "days"}
          </span>
        </div>
        {sortedEntries.length === 0 ? (
          <p className="empty-log">No hours logged yet.</p>
        ) : (
          <ol className="log-list">
            {sortedEntries.map((entry) => (
              <li className="log-row" key={entry.date}>
                <div className="log-date">
                  <time dateTime={entry.date}>{formatDate(entry.date)}</time>
                  {editingDate !== entry.date ? (
                    <button
                      className="edit-log-entry"
                      type="button"
                      onClick={() => startEditing(entry)}
                    >
                      Edit
                    </button>
                  ) : null}
                </div>
                {editingDate === entry.date ? (
                  <form className="log-edit-form" onSubmit={saveEditedEntry}>
                    <label>
                      <span className="visually-hidden">Hours for {formatDate(entry.date)}</span>
                      <input
                        type="number"
                        min="0"
                        max="12"
                        step="1"
                        inputMode="numeric"
                        value={editHours}
                        onChange={handleEditHoursChange}
                        autoFocus
                      />
                    </label>
                    <button className="save-log-edit" type="submit" disabled={editHours === ""}>
                      Save
                    </button>
                    <button className="cancel-log-edit" type="button" onClick={cancelEditing}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <HourSquares hours={entry.hours} />
                )}
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}

export default DeepWorkScoreboard;
