# StratIQ — AI Gaming Coach

> **"Turn Every Match Into a Lesson."**  
> *AI-Assisted Post-Match Gameplay Decision Analysis for Competitive Gamers.*

---

## 1. Project Overview & Problem Statement

Competitive mobile gamers spend hundreds of hours playing matches but struggle to isolate exactly why they lost key engagements. Existing tools are either **generic statistics trackers** (K/D ratios, damage totals) or **overly theoretical**.

**StratIQ** solves this by providing **post-match tactical decision analysis**:
- Ingests gameplay footage via **Upload Gameplay** or **Capture Session**.
- Verifies the game signature (currently **Free Fire**).
- Pinpoints critical decision-making moments (combat timing, cover utilization, zone rotations).
- Explains **why the decision mattered** using careful, non-exaggerated probabilistic language.
- Generates **"What If?" counterfactual alternative actions** to show how different tactical choices could have altered exposure.
- Synthesizes recurring mistakes into actionable **Next Match Goals**.
- Tracks **multi-match behavioral improvements** over time (e.g., reducing open-field exposure errors from 8 down to 4).

---

## 2. Core Philosophy & Language Integrity

StratIQ is **not** an esports prediction engine or a generic statistical dashboard. It avoids exaggerated claims:
- ❌ Guaranteed skill improvement
- ❌ 100% accurate computer vision prediction
- ❌ Bullet-level outcome guarantees
- ❌ Real-time overlay cheats / background mobile screen tapping

Instead, StratIQ uses grounded, context-aware phrasing:
- *“Possible alternative”*
- *“Appears to”*
- *“May have”*
- *“Based on the available gameplay context”*
- *“Suggested tactical action”*

---

## 3. Product Architecture

StratIQ is designed with a clean, modular service layer in `src/lib/stratiq/`:

```
src/lib/stratiq/
├── types.ts              # Core domain models (Sessions, Moments, DecisionAnalysis, WhatIfAction, etc.)
├── gameDetection.ts      # Game verification engine with mismatch detection (Free Fire vs BGMI/Valorant/CoD)
├── videoProcessing.ts    # Metadata extraction, video validation (<=100MB), thumbnail creation, capture detection
├── eventExtraction.ts    # Timeline parser extracting encounters, rotations, and combat exchanges
├── decisionAnalysis.ts   # Contextual reasoning engine (Situation, Decision, Outcome, Why it mattered)
├── whatIfAnalysis.ts     # Counterfactual action synthesizer (Original -> Alternative -> Expected difference)
├── coaching.ts           # Training plan generator & Next Match Goal synthesizer
├── playerHistory.ts      # Historical match store (5 seeded demo matches), mistake trend calculator, profile generator
├── modelProvider.ts      # Provider abstraction (DemoProvider vs AIProvider)
├── supabaseClient.ts     # Supabase client setup with guest demo offline fallback
└── dbSchema.sql          # PostgreSQL schema with 14 tables and Row Level Security (RLS)
```

---

## 4. Supported Games & Roadmap

| Game | Status in MVP | Notes |
|---|---|---|
| **Free Fire (Garena)** | **Active (Supported)** | Full 6-stage post-match decision analysis, Gloo Wall & cover metrics, What-If counterfactuals. |
| **BGMI** | *Coming Soon (Disabled)* | Krafton HUD detection & Erangel rotation modeling planned for Multi-Game Phase. |
| **Valorant** | *Coming Soon (Disabled)* | PC first-person crosshair & utility trade analysis planned. |
| **Call of Duty: Mobile** | *Coming Soon (Disabled)* | Slide-cancel and CQB pacing diagnostics planned. |

---

## 5. End-to-End User Flow

1. **Home (`/`)**: Overview of StratIQ methodology, Free Fire active badge, Coming Soon games, Demo Mode explanation.
2. **Select Game (`/analyze`)**: Choose Free Fire (other games disabled).
3. **Choose Input Method (`/analyze/input`)**:
   - **Upload Gameplay**: File picker supporting MP4/WebM up to 100 MB, metadata inspector, and pre-seeded sample clips for one-click testing.
   - **Capture Session**: Uses browser `getDisplayMedia` and `MediaRecorder` with feature detection and graceful mobile fallback.
4. **Game Verification (`/analyze/verify`)**:
   - Confirms Free Fire HUD and visual markers (96% confidence).
   - **Deterministic Mismatch Test**: Uploading non-Free Fire gameplay (e.g. `bgmi_erangel_hotdrop_session.mp4`) triggers a Game Mismatch warning and blocks progression.
5. **Staged Analysis (`/analyze/processing`)**: 6-stage telemetry progress (Sampling, Event Extraction, Key Moments, Decision Analysis, Recommendations).
6. **Match Dashboard (`/matches/:id`)**:
   - Overall Score (e.g. 74/100)
   - Category Scores (Combat, Positioning, Movement, Decision Making)
   - Next Match Goal & Training Plan
   - Key Moments Timeline
7. **Key Moment & "What If?" (`/matches/:id/moments/:momentId`)**:
   - 4-part breakdown (Situation → Player Decision → Outcome → Why It Mattered)
   - **"What If?" Counterfactual Action Box** (Original Decision → Possible Alternative → Expected Difference)
   - **"Was this analysis useful?"** Feedback collector (Helpful / Not accurate)
8. **Progress Tracking (`/progress`)**:
   - Seeded 5-match mistake reduction trend (`8 → 7 → 6 → 5 → 4` open field errors).
   - Multi-match category score progression.
9. **Personalized Decision Profile (`/profile`)**:
   - Player career statistics, strongest area (Movement: 78), recurring weakness (Positioning), and guest session reset tools.
10. **About & Technology (`/about`)**:
    - Phone-first workflow (`PLAY → CAPTURE → ANALYZE → REVIEW → COACH → TRACK`).
    - iQOO device optimization, local frame sampling, and hybrid AI architecture.

---

## 6. Demo Mode vs Model Mode

- **DEMO MODE (Active by default)**: Deterministic evaluation engine returning pre-validated analysis data for reliable, zero-dependency hackathon testing. Clearly identified across the app with `DEMO MODE` badges.
- **MODEL MODE (Future / API Key)**: Connects to a vision-language model pipeline when `VITE_AI_API_KEY` is configured in the environment.

---

## 7. Database & Security (`dbSchema.sql`)

Includes 14 relational tables with owner-scoped Row Level Security (RLS) policies:
1. `users`
2. `games`
3. `gameplay_sessions`
4. `gameplay_videos`
5. `game_verifications`
6. `key_moments`
7. `decision_analyses`
8. `alternative_actions`
9. `match_analyses`
10. `mistakes`
11. `player_profiles`
12. `training_plans`
13. `improvement_metrics`
14. `analysis_feedback`

---

## 8. Current MVP Limitations

- **Computer Vision**: Deterministic demo heuristics are used in the MVP; real-time on-device computer-vision model weights are planned for future hardware integration.
- **Real-Time Coaching**: StratIQ is strictly a **post-match** analysis system, not a real-time in-game cheat or overlay.
- **Single Game Scope**: The first MVP focuses solely on **Free Fire** to demonstrate depth of tactical modeling before expanding to BGMI and Valorant.
- **Outcome Predictions**: What-If recommendations are counterfactual heuristics, not deterministic simulations of exact damage or bullet physics.

---

## 9. Getting Started

### Installation
```bash
cd stratiq
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run preview
```
