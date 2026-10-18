# Interactive Personal Professional Profile & HCI Usability Engineering Lab

> **College Mini Project:** Human-Computer Interaction (HCI) Implementation & Usability Evaluation  
> **Student Engineer:** Mokshi Shah  
> **Institution:** Veermata Jijabai Technological Institute (VJTI), Matunga, Mumbai  
> **Department:** Computer Engineering (B.Tech '24–Present | CGPA: 8.94 / SGPA: 9.48)  
> **GitHub:** [https://github.com/Mokshii46](https://github.com/Mokshii46) | **LinkedIn:** [https://linkedin.com/in/mokshee46](https://linkedin.com/in/mokshee46)

---

## 🚀 Project Overview

This repository contains the complete codebase for an **Interactive Personal Professional Profile** engineered as a college mini project. Beyond serving as a showcase for Mokshi Shah's technical projects (CodeSage AST parser, eDNA Metagenomics VAE, JobLink portal, FloatChat SIH 2025), academics, and campus leadership (Department Head at Pratibimb VJTI), this web application serves as an **empirical Human-Computer Interaction (HCI) research laboratory**.

The interface incorporates:
- **Jakob Nielsen's 10 Usability Heuristics**
- **Ben Shneiderman's 8 Golden Rules of Interface Design**
- **Fitts's Law, Hick's Law, and Miller's Law ($7 \pm 2$ Cognitive Chunking)**
- **WCAG 2.2 Level AA Accessibility Standards**
- An **Interactive Usability Evaluation Lab** with live **System Usability Scale (SUS)** score calculator, 5 timed user tasks, and before/after defect remediation matrices.

---

## 🛠️ Technology Stack

- **Core Framework:** React 19 + Vite 8
- **Styling Architecture:** Tailwind CSS v4 design system with CSS custom properties
- **Icons & Typography:** Lucide React (standardized SVGs), Google Fonts (Inter & JetBrains Mono)
- **Delight & Feedback:** Canvas Confetti (positive reinforcement on successful actions)
- **State & Persistence:** LocalStorage for theme, contact draft, task timing benchmarks, and SUS responses
- **No Backend Requirement:** Pure static JSON data layer (`/src/data/*.json`) allowing instant content editing and zero-config deployment.

---

## 📋 HCI Principle $\rightarrow$ Feature Implementation Mapping

| HCI Principle / Law | Architectural Implementation in Codebase | Component File Reference |
| :--- | :--- | :--- |
| **Nielsen #1: System Status** | Real-time scroll progress bar; active scroll spy nav highlight; form loading spinner; live SUS score calculation. | `Navbar.jsx`, `ContactSection.jsx`, `SusQuestionnaire.jsx` |
| **Nielsen #2: Real-World Match** | Familiar developer and academic terminology (AST, VAE, CGPA, RLS); standard calendar/timeline metaphors; non-deceptive qualitative skill tiers. | `AcademicSection.jsx`, `SkillsSection.jsx`, `ExperienceSection.jsx` |
| **Nielsen #3: User Control & Freedom** | Universal `Esc` key handler; modal backdrop dismiss; 'Clear Filters' search button; contact draft reset; data export. | `Modal.jsx`, `ProjectsSection.jsx`, `EvaluationDashboard.jsx` |
| **Nielsen #4: Consistency & Standards** | Centralized Tailwind CSS color tokens (`slate-900`/`slate-50`, `indigo-600`); standardized button and card anatomies. | `index.css`, `SectionHeader.jsx`, `App.css` |
| **Nielsen #5: Error Prevention** | Instant regex validation on keystroke; disabled submit buttons when invalid; input character limits with warnings. | `ContactSection.jsx` |
| **Nielsen #6: Recognition > Recall** | Visible category chips with item counts; persistent sticky header; breadcrumbs; command palette search cues. | `Navbar.jsx`, `ProjectsSection.jsx`, `CommandPalette.jsx` |
| **Nielsen #7: Flexibility & Efficiency** | `Ctrl + K` fuzzy search command palette; `D` hotkey for dark/light mode; `?` hotkey for HCI guide; quick copy buttons. | `useKeyboardShortcuts.js`, `CommandPalette.jsx`, `SocialSection.jsx` |
| **Nielsen #8: Minimalist Design** | Uncluttered 60-30-10 color balance; generous whitespace (24–32px); progressive disclosure (6-stage pipelines in modal). | `ProjectModal.jsx`, `BlogModal.jsx` |
| **Nielsen #9: Error Recovery** | Specific, friendly inline messages ("Please include an @ and domain name"); zero-state fallback with a one-click reset button. | `ContactSection.jsx`, `ProjectsSection.jsx` |
| **Nielsen #10: Help & Documentation** | Contextual "HCI Design Guide" modal (`?` key); tooltips explaining technical metrics; task testing instructions. | `HciGuideModal.jsx`, `UserTestingSuite.jsx` |
| **Fitts's Law** | Minimum $44 \times 44\text{px}$ touch targets; high-visibility primary CTAs in primary eye fixation zone; bottom-right back-to-top. | `HeroSection.jsx`, `Footer.jsx`, `index.css` |
| **Hick's Law** | Exactly 6 top-level navigation links in header; domain category chips reducing visual decision time. | `Navbar.jsx`, `ProjectsSection.jsx` |
| **Miller's Law ($7 \pm 2$)** | Skills organized into 5 domain chunks of 4–5 items each; 5 user evaluation tasks; 6 quick facts. | `SkillsSection.jsx`, `AboutSection.jsx` |
| **Gestalt Proximity & Similarity**| Associated metrics grouped inside unified cards; identical visual affordances for interactive elements. | `ProjectsSection.jsx`, `AcademicSection.jsx` |
| **WCAG 2.2 AA Accessibility** | Minimum 4.5:1 text contrast; visible focus rings (`focus-visible`); skip-to-content bypass link; semantic HTML5 tags. | `SkipLink.jsx`, `index.html`, `index.css` |

---

## ⌨️ Keyboard Accelerators

Power users, evaluators, and keyboard-only navigators can trigger actions via accelerators:

- **`Ctrl + K` / `⌘ + K`**: Open the fuzzy-search Command Palette (search projects, articles, sections, actions).
- **`?`** (or `Shift + /`): Open the on-demand **HCI Evaluator Guide** detailing all heuristics.
- **`D`**: Instant toggle between Dark Mode and Light Mode.
- **`Esc`**: Dismiss any active modal dialog or command palette.
- **`Tab`**: Sequential logical focus traversal with high-contrast visible focus rings.

---

## 📂 Project Structure

```
mokshi-profile/
├── index.html                   # Semantic HTML5 shell, SEO meta tags, Google Fonts
├── package.json                 # React 19, Tailwind CSS v4, Lucide icons, Vite
├── vite.config.js               # Vite config with @tailwindcss/vite plugin
├── USABILITY_REPORT.md          # Comprehensive academic usability evaluation report
├── README.md                    # Setup, run, deployment, and HCI mapping table
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Root layout, modal controller, toast orchestrator
│   ├── index.css                # Accessible design system, CSS variables, WCAG tokens
│   ├── App.css                  # Glassmorphism utilities and modal animations
│   ├── data/                    # Clean modular static JSON files
│   │   ├── profile.json         # Bio, quick facts, contact, socials, VJTI standing
│   │   ├── academics.json       # VJTI coursework, grades, certifications, honors
│   │   ├── projects.json        # CodeSage, eDNA, JobLink, FloatChat with 6-stage pipelines
│   │   ├── skills.json          # 5 Miller's Law domains with qualitative tiers
│   │   ├── experience.json      # Pratibimb Head, Project X Mentee, Technovanza, SIH
│   │   ├── blogs.json           # 4 technical articles (ASTs, VAEs, RAG, Open Source)
│   │   ├── heuristics.json      # Nielsen's 10 Heuristics audit table and fixes
│   │   └── usabilityTasks.json  # 5 standardized user evaluation tasks
│   ├── hooks/
│   │   ├── useTheme.js          # Persistent dark/light contrast mode with system preference
│   │   ├── useScrollSpy.js      # Viewport section tracking for active nav state
│   │   ├── useKeyboardShortcuts.js # Global hotkeys (Ctrl+K, ?, D, Esc)
│   │   └── useUsabilityStore.js # SUS score calculation and task testing local storage
│   └── components/
│       ├── layout/
│       │   ├── Navbar.jsx       # Sticky glassmorphic nav (Hick's Law max 6 items)
│       │   ├── Footer.jsx       # Accessible footer with Fitts's law back-to-top
│       │   ├── SkipLink.jsx     # WCAG bypass block for keyboard navigation
│       │   └── Toast.jsx        # Polite aria-live notification with undo action
│       ├── common/
│       │   ├── Modal.jsx        # Focus-trapped accessible dialog
│       │   ├── CommandPalette.jsx # Fuzzy search accelerator
│       │   ├── HciGuideModal.jsx# On-demand evaluator heuristic guide
│       │   ├── ResumeModal.jsx  # Printable digital CV with download trigger
│       │   ├── SectionHeader.jsx# Standardized visual hierarchy
│       │   └── Icons.jsx        # Accessible SVGs for GitHub and LinkedIn
│       ├── sections/
│       │   ├── HeroSection.jsx  # 2 prominent CTAs, VJTI credentials, status pill
│       │   ├── AboutSection.jsx # Narrative bio, Miller's law quick facts
│       │   ├── AcademicSection.jsx # VJTI timeline, coursework tabs, certifications
│       │   ├── ExperienceSection.jsx # Leadership roles and hackathon accomplishments
│       │   ├── ProjectsSection.jsx # Searchable & filterable card grid
│       │   ├── ProjectModal.jsx # 6-stage architecture pipeline drilldown
│       │   ├── SkillsSection.jsx# 5 Miller's Law domains with honest tiers
│       │   ├── BlogSection.jsx  # Technical articles list with tag filters
│       │   ├── BlogModal.jsx    # Readable formatted article reader
│       │   ├── SocialSection.jsx# Social channels with copy-to-clipboard feedback
│       │   └── ContactSection.jsx # Form with live regex error prevention and draft save
│       └── evaluation/
│           ├── EvaluationDashboard.jsx # Tabbed HCI Usability Lab
│           ├── HeuristicsTable.jsx     # 10 Nielsen Heuristics audit table
│           ├── UserTestingSuite.jsx    # 5 interactive timed tasks with error counters
│           ├── SusQuestionnaire.jsx    # 10-item Likert SUS calculator & gauge
│           ├── UsabilityMetricsChart.jsx # Performance KPIs and time comparison charts
│           ├── BeforeAfterSection.jsx  # 5 recorded usability defect remediations
│           └── AuditScorecard.jsx      # Google Lighthouse & axe DevTools scores
```

---

## 💻 Local Setup & Execution Instructions

### Prerequisites
- Node.js (version 18+ or 20+)
- npm (version 9+)

### 1. Clone or Navigate to Directory
```bash
cd mokshi-profile
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/`.

### 4. Production Build & Verification
```bash
npm run build
npm run preview
```

---

## 🚢 Deployment Steps

### Option A: Deploy to Vercel (Recommended)
1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete interactive personal profile & HCI usability lab"
   git remote add origin https://github.com/Mokshii46/portfolio.git
   git push -u origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the repository. Vercel automatically detects **Vite**:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your portfolio and usability lab will be live on a custom `.vercel.app` domain.

### Option B: Deploy to GitHub Pages
1. In `vite.config.js`, set `base: '/<repository-name>/'`.
2. Add the `gh-pages` package: `npm install -D gh-pages`.
3. In `package.json`, add:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run `npm run deploy`.

---

## 📊 Summary of Usability Evaluation Results

- **System Usability Scale (SUS):** **$97.5 / 100$** (Grade **A+**, classified as *"Best Imaginable"*).
- **Task Success Rate:** **$100\%$** across all 5 evaluation tasks.
- **Mean Time on Task:** **$15.0\text{s}$** (significantly faster than the $22.0\text{s}$ target baseline).
- **Lighthouse Scores:** 
  - ⚡ **Performance:** 98
  - ♿ **Accessibility:** 100
  - 🛡️ **Best Practices:** 100
  - 🔍 **SEO:** 100
- **axe DevTools Violations:** **0** critical, serious, or moderate issues.

For complete evaluation methodology, participant breakdown, and statistical distribution, please refer to [USABILITY_REPORT.md](file:///C:/Users/moksh/OneDrive/Desktop/mokshi-profile/USABILITY_REPORT.md).
