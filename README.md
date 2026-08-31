# StartIQ — AI Gaming Coach

> **"Turn Every Match Into a Lesson."**  
> *AI-Assisted Post-Match Gameplay Decision Analysis for Competitive Gamers.*

---

## 1. Project Overview

Competitive mobile gamers spend hundreds of hours grinding matches but struggle to isolate exactly why they lost key gunfights. Existing tools are either **generic statistics dashboards** (K/D ratios, damage totals) or **overly theoretical**.

**StartIQ** transforms post-match analysis into an actionable, personalized coaching experience:
- Ingests gameplay footage via **Upload Gameplay** (MP4/WebM <=100MB) or **Capture Session** (`getDisplayMedia` + `MediaRecorder`).
- **Verifies the game signature** (currently Free Fire) with deterministic mismatch detection.
- Pinpoints critical decision-making moments (combat timing, cover utilization, zone rotations).
- Explains **why the decision mattered** using structured, non-exaggerated probabilistic language.
- Generates **"What If?" counterfactual alternative actions** with estimated survival improvement percentages and risk factors.
- Remembers cross-match history in a **Recurring Mistakes** tracker (e.g. Over-aggressive pushes in 7/12 matches).
- Provides **AI-Powered Personalized Settings** tailored to high-refresh gaming devices (e.g. **iQOO 15** with 480 DPI and Headshot/Rush sensitivity presets).
- Displays a visual **Current HUD vs Recommended iQOO HUD** comparison mockup.
- Features an **Interactive AI Coach Chat** panel for grounded tactical inquiries.
- Tracks multi-match progress with **"Am I Actually Improving?" Before vs After** matrices.

---

## 2. Complete User Workflow

```
Play Match (iQOO Handset)
   ↓
Upload / Capture Session
   ↓
Game Verification (Free Fire HUD Checked)
   ↓
Gameplay Processing (6-Stage Telemetry Pipeline)
   ↓
Key Moments Extracted (0-100 Decision Scores)
   ↓
Decision Analysis (Situation → Action → Why It Mattered → Consequence)
   ↓
"What If?" Counterfactuals (Original Score vs Alternative Score & Survival %)
   ↓
Personalized AI Coach & Settings (iQOO 15 Profile, 480 DPI, Sensitivity, HUD)
   ↓
Recurring Mistakes Memory (Cross-Match Flaw Tracking)
   ↓
Progress Tracking (Before vs After Performance Matrices)
```

---

## 3. Product Architecture

StartIQ is organized with a clean, modular service layer in `src/lib/stratiq/`:

```
src/lib/stratiq/
├── types.ts              # Domain interfaces (Moments, DecisionAnalysis, WhatIfAction, DeviceProfile, etc.)
├── gameDetection.ts      # Game verification engine with mismatch detection (Free Fire vs BGMI/Valorant/CoD)
├── videoProcessing.ts    # Metadata extraction, video validation (<=100MB), thumbnail creation, capture detection
├── eventExtraction.ts    # Timeline parser extracting encounters, rotations, and combat exchanges
├── decisionAnalysis.ts   # Contextual reasoning engine (Situation, Decision, Outcome, Why it mattered)
├── whatIfAnalysis.ts     # Counterfactual action synthesizer (Original -> Alternative -> Expected difference)
├── settingsEngine.ts     # Device-aware iQOO 15 profile, 480 DPI recommendation, sensitivity generator, HUD coordinates
├── coachService.ts       # Recurring mistake catalog, drill synthesizer, and interactive AI Coach Q&A engine
├── coaching.ts           # Training plan generator & Next Match Goal synthesizer
├── playerHistory.ts      # 5 seeded historical matches, mistake trend calculator, player profile metrics
├── modelProvider.ts      # Provider abstraction (DemoProvider vs AIProvider)
├── supabaseClient.ts     # Supabase client setup with guest demo offline fallback
└── dbSchema.sql          # PostgreSQL schema with 14 tables and Row Level Security (RLS)
```

---

## 4. Key Upgraded Features

### A. Dashboard Overview
- **Player Overview**: Active student (`Vortex_FF`), overall performance (`74/100`), matches analyzed (`5`), improvement gain (`+28%`), current streak (`3 matches`), most common flaw (`Over-aggressive pushes`).
- **8-Category Metric Matrix**: Aim (76), Movement (78), Positioning (61), Decision Making (72), Combat (68), Survival (82), Reaction (75), and Overall Performance (74).
- **Recent Matches Feed**: Match date, kills, placement (#2), mistakes detected, key moments, improvement change (+6%).

### B. AI Coach & Settings Hub (`/coach`)
- **Personalized Coaching**: 5-pillar guidance (What you are doing wrong, Why it happens, What you should practice, What settings may help, Focus for next match).
- **Device-Aware Settings (iQOO 15)**:
  - Detected device specifications (6.78" 144Hz 2K AMOLED, 1200Hz instant touch, Snapdragon 8 Elite).
  - Recommended **480 DPI** with manual application instructions for Android Developer Options.
  - Interactive **Sensitivity Generator** with style presets (*Headshot*, *Balanced*, *Rush*).
  - **HUD Comparison Mockup**: Visual side-by-side comparison of Current HUD vs Recommended iQOO HUD (Fire button: 52%, Gloo Wall: 58%, Joystick: 65%).
- **Recurring Mistakes Tracker**:
  - Over-aggressive pushes (7/12 matches, 58%, Improving -40%).
  - Open field exposure (5/10 matches, 50%, Improving 8 → 4 errors).
  - Delayed rotations (4/12 matches, 33%, Stable).
  - Staircase rushes without utility (4/12 matches, 33%, Improving).
- **Interactive AI Coach Chat**: Context-aware Q&A panel answering tactical questions (*"Why did I lose my last fight at Pochinok?"*, *"What is my biggest recurring tactical weakness?"*, etc.).

### C. Key Moment & "What If?" Counterfactuals (`/matches/:id/moments/:momentId`)
- Explicit **0-100 Decision Scores** (e.g. Original: 42/100 vs Alternative: 88/100).
- **Survival Improvement Percentage** (e.g. +65% Est. Survival).
- 4-part breakdown: *What happened? → What did player decide? → Why was it risky? → Consequence*.
- Feedback collector (*Helpful* / *Not accurate*).

### D. Progress Tracking (`/progress`)
- **"Am I Actually Improving?" Before vs After matrix**:
  - Decision Making: 62 → 78 (+16)
  - Positioning & Cover: 55 → 71 (+16)
  - Combat Trades: 68 → 76 (+8)
  - Aim & Drag Headshot: 65 → 76 (+11)
  - Survival & Zone Timing: 70 → 82 (+12)
  - Movement Agility: 65 → 78 (+13)
- Multi-match mistake reduction graph (8 → 7 → 6 → 5 → 4 errors, a 50% drop).

---

## 5. Safety, Anti-Cheat & Fair Play Compliance

StartIQ is strictly an **analysis, recommendation, and coaching system**:
- ❌ Does NOT modify Free Fire game files.
- ❌ Does NOT inject code into the Free Fire process.
- ❌ Does NOT automate gameplay or screen tapping.
- ❌ Does NOT automatically modify device or system DPI.
- ❌ Does NOT provide real-time in-game overlay cheats.

All sensitivity, DPI, and HUD adjustments are **recommendations that the player manually applies** in game settings.

---

## 6. Getting Started

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
