# Project Orca — Marathon Training App

A local React app for your October 11, 2026 marathon. Six tabs: **Schedule, Eating,
Grocery, Race Day, Gear,** and **Paces & Strava**. It personalizes every workout's target
pace from a recent run — pulled from Strava or entered by hand.

---

## 1. Install Node.js (one time)

The app runs on [Node.js](https://nodejs.org). To check if you already have it, open a
terminal and run:

```bash
node -v
```

If you see a version like `v20.x` you're set. If it says "command not found," download the
**LTS** installer from <https://nodejs.org> and run it, then reopen your terminal.

## 2. Run the app

From this folder (the one containing `package.json`):

```bash
npm install      # first time only — downloads dependencies
npm run dev      # starts the app, opens http://localhost:5173
```

Leave that terminal running while you use the app. Stop it with `Ctrl+C`.

### Open it in VS Code

`File → Open Folder…` and pick this `marathon-app` folder. Open the built-in terminal
(`` Ctrl+` ``) and run the two commands above. Edit any file in `src/` and the browser
refreshes automatically.

---

## 3. Personalize your paces

Open the **Paces & Strava** tab. Three options:

- **Try with demo data** — instant sample paces so you can see how it works.
- **Enter a recent run manually** — a recent race or hard effort (distance + time). The app
  uses Riegel's model to predict your marathon and derive easy / long / tempo / interval /
  goal-marathon paces.
- **Connect Strava** — paste a Strava **access token** (below). The app finds your fittest
  run in the last 6 weeks and recalculates all paces from it.

Your data is stored only in this browser (localStorage). Nothing is sent anywhere except
directly to Strava's API when you connect.

### Getting a Strava access token (personal use)

1. Go to <https://www.strava.com/settings/api> and create an application (any name; set the
   Authorization Callback Domain to `localhost`).
2. That page shows **Your Access Token** — copy it and paste it into the app's Paces tab.
3. Tokens expire after a few hours; regenerate when needed (the app will tell you if it's
   expired). For always-on access you'll want the refresh-token flow — see below.

### Later: full one-click OAuth

A static front-end can't safely hold your Strava **client secret**, so automatic token
refresh needs a tiny backend (a serverless function or a small Node/Express endpoint) that
exchanges the auth code and refreshes tokens. The current app is structured so that only
`src/services/strava.js` needs to change — swap `fetchActivities` to call your backend and
the rest of the app is unaffected.

---

## Project structure

```
marathon-app/
├─ index.html
├─ package.json
├─ vite.config.js
└─ src/
   ├─ main.jsx            app entry
   ├─ App.jsx             tab shell + countdown + pace state
   ├─ styles.css
   ├─ data/
   │  ├─ plan.js          the 10-week schedule (edit workouts here)
   │  └─ nutrition.js     eating schedule, grocery, race-day, gear
   ├─ utils/paces.js      Riegel predictor + training-pace zones
   ├─ services/strava.js  Strava fetch + demo data
   ├─ hooks/useLocalStorage.js
   └─ components/         one file per tab
```

## Tweaking the plan

- Change a workout, distance, or add a week: edit `src/data/plan.js`.
- Change meals, grocery items, gear: edit `src/data/nutrition.js`.
- Adjust how paces are derived (e.g. easy-pace offset): edit `computeZones` in
  `src/utils/paces.js`.

## Notes

- **Not medical advice.** Build mileage gradually, keep easy days easy, and back off if you
  feel a sharp or worsening pain.
- 10 weeks off a solid base is enough to finish strong; it's tight for an aggressive time
  goal, so the plan prioritizes getting you to the line healthy.
```
