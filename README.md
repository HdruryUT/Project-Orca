# Project Orca — Marathon Training App

A local React app for your October 11, 2026 marathon. Tabs: **Dashboard, Schedule, Eating,
Grocery, Race Day, Gear,** and **Paces & Strava**. It personalizes every workout's target
pace from a recent run — pulled from Strava or entered by hand — and includes a light/dark
theme and an at-a-glance dashboard.

---

## Run it locally

Requires [Node.js](https://nodejs.org) (LTS). Check with `node -v`; if missing, install the
LTS build and reopen your terminal.

From this folder (the one with `package.json`):

```bash
npm install      # first time only
npm run dev      # opens http://localhost:5173
```

In VS Code: `File → Open Folder…` → pick this folder → open the terminal (`` Ctrl+` ``) →
run the two commands. Edits hot-reload in the browser.

## Deploy (Vercel)

Push to GitHub, then in Vercel: **Add New → Project → import the repo**. It auto-detects
Vite (build `npm run build`, output `dist`). Deploy. Every future `git push` redeploys.

---

## Personalize paces

Open **Paces & Strava**:

- **Try with demo data** — instant sample paces.
- **Enter a recent run** — distance + time; predicts your marathon (Riegel) and derives
  easy / long / tempo / interval / goal-marathon paces.
- **Connect Strava** — paste an access token; the app uses your fittest recent run.

### Strava access token (personal use)

1. <https://www.strava.com/settings/api> → create an app (callback domain `localhost`).
2. Copy **Your Access Token** into the Paces tab.
3. Tokens expire after a few hours; regenerate when needed. Automatic refresh needs the
   small backend described below.

### Later: full one-click OAuth

A static site can't safely hold your Strava **client secret**, so auto-refreshing tokens
needs a tiny serverless endpoint. Only `src/services/strava.js` needs to change — point
`fetchActivities` at your backend and the rest of the app is unaffected. On Vercel this is
an `/api` function in the same project.

---

## Project structure

```
src/
├─ main.jsx
├─ App.jsx                tab shell, dark-mode toggle, countdown, pace state
├─ styles.css             ocean theme + dark mode (CSS variables)
├─ data/
│  ├─ plan.js             the 10-week schedule + phase colors
│  └─ nutrition.js        eating schedule (evening runner), grocery, race-day, gear
├─ utils/
│  ├─ paces.js            Riegel predictor + training-pace zones
│  └─ schedule.js         "where am I in the plan today" helper
├─ services/strava.js     Strava fetch + demo data
├─ hooks/useLocalStorage.js
└─ components/
   ├─ OrcaLogo.jsx        inline SVG orca mark
   ├─ DashboardTab.jsx    home: countdown, today, this week, progress, paces
   └─ …Tab.jsx            one file per tab
```

## Tweaking

- Workouts / distances / phase colors → `src/data/plan.js`
- Meals, grocery, race-day, gear → `src/data/nutrition.js`
- How paces are derived → `computeZones` in `src/utils/paces.js`
- Colors / theme → CSS variables at the top of `src/styles.css`

## Notes

- **Not medical advice.** Build mileage gradually, keep easy days easy, back off on sharp or
  worsening pain.
- The eating schedule assumes an evening (~6 PM) run — daytime meals are the fueling meals.
```
