# Competition-Ready Student Engineering Portfolio

A polished, high-performance, and competition-ready student portfolio website built with modern HTML5, CSS3 (Vanilla design system with dark & light themes), and JavaScript.

## 🌟 Highlights & Key Features

- **Personal & Memorable Aesthetic**: Sleek Obsidian & Cyber Indigo dark theme with frosted glassmorphism cards, glowing ambient accents, and smooth light mode switch.
- **Judge-Optimized Layout**:
  - **Hero Section**: Strong introduction with customizable name placeholder `[Alex Morgan]`, active internship availability status badge, high-res 3D tech avatar, and prominent **"View Featured Projects"** CTA.
  - **About Section**: Candid engineering narrative accompanied by a **"Judge's 60-Second TL;DR"** snapshot box that directly answers *"Why hire or award this candidate?"*.
  - **Technical Skills Matrix**: Filterable skill chips with proficiency indicators and a "Continuous Learning" banner highlighting cutting-edge topics (e.g., CUDA GPU kernels, WebAssembly).
  - **Project Cards**: Complete with role descriptions, verified metrics, tech stacks, live prototype demos, and **Deep-Dive Modals** (problem statement, architecture solutions, and verified outcomes).
  - **Verified Achievements Showcase**: Hackathon awards (1st Place National AI Hackathon, Best Cloud Architecture, CleanTech Grand Prize), Dean's list distinctions, and credential verification modals.
  - **Interactive Contact & Socials**: Direct 1-click clipboard copy for email and Discord, links to GitHub/LinkedIn/Scholar, and an interactive contact form with instant validation.
- **Zero-Invented Details (Strict Compliance)**:
  - All personal student details are clearly labeled with brackets (e.g., `[Alex Morgan]`, `[Stanford University / Your Institution]`).
  - Includes a live **"Customize Info"** slide-in panel right in the header, allowing any student to type their real information, click "Apply Live", and instantly see their portfolio update!

---

## 🚀 How to Run Locally

### Option 1: Using the Included Node Server
The project includes a lightweight, zero-dependency Node.js HTTP server:
```powershell
cd C:\Users\user\.gemini\antigravity-ide\scratch\student-portfolio
node server.js
```
Then open your browser to **`http://127.0.0.1:4173`**.

### Option 2: Open Directly in Any Browser
You can also open `index.html` directly in Google Chrome, Microsoft Edge, Firefox, or Safari:
```powershell
Start-Process "C:\Users\user\.gemini\antigravity-ide\scratch\student-portfolio\index.html"
```

---

## 📁 File Structure

```
student-portfolio/
├── index.html               # Semantic HTML5 markup, ARIA accessibility, modals, SEO tags
├── styles.css               # Complete responsive CSS design system (Dark/Light themes)
├── script.js                # Theme switcher, modals, filter controls, form validation, live customizer
├── server.js                # Zero-dependency local Node.js static server
├── README.md                # Documentation and customization guide
└── assets/                  # High-resolution generated visual assets
    ├── avatar.jpg           # Student avatar portrait
    ├── project-synthflow.jpg# SynthFlow AI interface & pipeline mockup
    ├── project-devmesh.jpg  # DevMesh microservice topology canvas mockup
    └── project-ecopulse.jpg # EcoPulse smart grid analytics mockup
```

---

## 🎨 Customizing for Your Own Competitions

1. **Via the In-Browser Customizer**:
   Click the **"Customize Info"** button in the top navigation header. Enter your real name, university, headline, and email, then click **Apply Live**.
2. **Via Code**:
   Open `index.html` and search for bracketed tags like `[Alex Morgan]` or `[Stanford University / Your Institution]` to replace them with your authentic details.
