# Brain Dump 2.0 - Product Requirements Document

**Document Version:** 2.0  
**Status:** Ready for Development  
**Target:** Awwwards Site of the Day 🏆

---

## 1. EXECUTIVE SUMMARY

### The Transformation

| Aspect | Brain Dump 1.0 (Current) | Brain Dump 2.0 (Rebuild) |
|--------|--------------------------|--------------------------|
| **Design** | Functional prototype | Awwwards SOTD contender |
| **Aesthetic** | Quirky blob characters | Cinematic, immersive, theatrical |
| **Animations** | Basic CSS keyframes | GSAP ScrollTrigger, kinetic typography |
| **Interactions** | Standard hover states | Custom cursor, magnetic buttons, parallax |
| **Navigation** | Single page static | Scroll-driven narrative journey |
| **Performance** | Acceptable | Lighthouse 90+, LCP &lt;2.5s |
| **Output Quality** | High (5-agent processing) | **Unchanged** — core AI remains identical |

### Awwwards Target Scores

| Criterion | Target Score | Strategy |
|-----------|--------------|----------|
| Design (40%) | 8.5+/10 | Custom aesthetic, kinetic typography, asymmetrical grids |
| Usability (30%) | 8.0+/10 | Scroll-driven UX, intuitive interactions, mobile excellence |
| Creativity (20%) | 9.0+/10 | Unique agent personalities, theatrical reveals, custom cursor |
| Content (10%) | 8.0+/10 | Punchy copy, narrative storytelling, brand voice |

---

## 2. VISION & DESIGN PHILOSOPHY

### Brand Personality
- **Voice:** Playful genius. A brilliant friend who makes complex things feel simple and fun.
- **Tone:** Whimsical but intelligent, Chaotic but purposeful, Experimental but accessible, Quirky but premium
- **Design Metaphor:** "A laboratory of friendly AI creatures who collaborate to decode your messy brain."

### Four Design Pillars
1. **THEATRICAL PROCESSING** - Agents perform, not just process
2. **SCROLL-DRIVEN STORYTELLING** - Narrative unfolds: Hook → Input → Show → Reveal → Delight
3. **CONTROLLED CHAOS** - Asymmetrical but intentional
4. **SENSORY IMMERSION** - Every interaction has visual, motion, and spatial feedback

---

## 3. CORE FUNCTIONALITY (PRESERVED - NO CHANGES)

The 5-agent sequential processing system remains identical:
- Listie (Listener) → Linky (Connector) → Wordy (Translator) → Sparky (Challenger) → Blendy (Synthesizer)
- API endpoint: POST /api/process (unchanged)
- Processing time: ~7-8 seconds
- LLM: Groq SDK (llama-3.3-70b-versatile)

---

## 4. DESIGN SYSTEM SPECIFICATION

### 4.1 Color Palette

**Background Colors:**
- `--bg-deep`: #0D0D1A
- `--bg-surface`: #1A1A2E
- `--bg-elevated`: #252540

**Agent Colors:**
| Agent | Primary | Highlight | Shadow |
|-------|---------|-----------|--------|
| Listie | #FF3366 | #FF6B8A | #CC1144 |
| Linky | #00E5B8 | #4DEBB8 | #00A080 |
| Wordy | #FFD426 | #FFE566 | #D4A800 |
| Sparky | #FF6B2C | #FF8F5A | #D44D10 |
| Blendy | #7B5CFF | #9F85FF | #5A3DD4 |

**Neutrals:**
- `--text-primary`: #FFFFFF
- `--text-secondary`: #B8B8D0
- `--text-muted`: #6B6B8A

### 4.2 Typography

**Font Stack:**
```css
--font-display: 'Bowlby One', cursive;
--font-body: 'Space Grotesk', sans-serif;
```

**Type Scale:**
- Hero: clamp(4rem, 15vw, 10rem)
- H1: clamp(2.5rem, 8vw, 5rem)
- Body: 1.125rem

### 4.3 Spacing (8px base)
- space-1: 8px → space-10: 128px

### 4.4 Shadows
```css
--shadow-quirky-sm: 4px 4px 0 rgba(0,0,0,0.2);
--shadow-quirky-md: 8px 8px 0 rgba(0,0,0,0.2);
--shadow-quirky-lg: 12px 12px 0 rgba(0,0,0,0.2);
```

### 4.5 Animation Tokens
```css
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-theatrical: 1200ms;
```

---

## 5. PAGE ARCHITECTURE

### Single-Page Scroll Journey (5 Sections)

1. **HERO (100vh)** - Kinetic logo, tagline, floating agents, scroll CTA
2. **INPUT STAGE (100vh)** - Asymmetrical input card, peeking agents, magnetic button
3. **PROCESSING THEATER (100vh)** - Full-screen takeover, theatrical agent entrances
4. **RESULT REVEAL (100vh)** - Dramatic card entrance, kinetic typography, celebration
5. **FOOTER** - How it works, agent introductions

### State Machine
IDLE → READY → PROCESSING (5 sub-states) → REVEALING → COMPLETE → IDLE

---

## 6. ANIMATION SPECIFICATIONS

### 6.1 Hero Animations
- Logo: Letters stagger in (50ms each), random rotation (-5deg to 5deg)
- Tagline: Slides up with fade
- Agents: Float in with parallax
- Scroll indicator: Pulse animation

### 6.2 Processing Theater (7-8s total)
Each agent phase (~1.5s):
1. Enter with unique animation (bounce/spring/drop/glide)
2. Grow to center stage (scale 1.5)
3. Show speech bubble with catchphrase
4. Perform working animation
5. Shrink, move to complete position
6. Show checkmark celebration

### 6.3 Result Reveal
- Card: Enter from bottom with scale bounce
- Interpretation: Word-by-word kinetic animation
- Key points: Stagger in (150ms each)
- Agents: Synchronized celebration dance
- Confetti burst

### 6.4 Custom Cursor
States: Default (20px circle) → Hover (40px, magnetic) → Agent (morphs to blob) → Input (I-beam) → Processing (spinning dots)

### 6.5 Parallax Speeds
- Background blobs: 0.3
- Agent previews: 0.6
- Floating particles: 0.8

---

## 7. AGENT CHARACTER DESIGN

### Character Anatomy
- Organic morphing body (SVG/CSS)
- Expressive eyes (circles with tracking pupils)
- Morphing mouth
- Name label badge

### Individual Personalities

**LISTIE (Hot Pink #FF3366)**
- Shape: Taller, ear-shaped
- Eyes: Large, attentive
- Catchphrase: "I hear something good!"
- Active: Bounces, eyes scan

**LINKY (Cyan #00E5B8)**
- Shape: Wider, network-like
- Eyes: Focused
- Catchphrase: "Ooh, these connect!"
- Active: Lines emit from body

**WORDY (Yellow #FFD426)**
- Shape: Round, dictionary-like
- Eyes: Wise, squinted
- Catchphrase: "Let me rephrase that..."
- Active: Letters float around

**SPARKY (Orange #FF6B2C)**
- Shape: Angular, spiky
- Eyes: Skeptical, one brow raised
- Catchphrase: "But what if...?"
- Active: Question marks pop

**BLENDY (Purple #7B5CFF)**
- Shape: Largest, galaxy-like swirls
- Eyes: Calm, wise
- Catchphrase: "Aha! I see it now!"
- Active: Absorbs outputs visually

### Animation States
idle, anticipating, working, complete, celebrating, sleeping

---

## 8. COMPONENT SPECIFICATIONS

### 8.1 Hero Section
- Kinetic typography logo with offset shadow
- Tagline fade-in
- 5 floating agent previews (parallax)
- Animated gradient blob background

### 8.2 Input Section
- Asymmetrical card (offset 10%, rotation 2deg)
- Quirky offset shadow (12px 12px 0)
- Agents peeking from edges
- Magnetic "Dump It!" button

### 8.3 Processing Theater
- Progress: Agent relay race visualization (not boring bar)
- Active agent: Center, enlarged (1.5x), with speech bubble
- Completed agents: Smaller, positioned at top with checkmarks

### 8.4 Result Card
- Max-width: 640px
- Shadow: lg + glow (Blendy purple)
- Key points: Color-coded borders (agent colors)
- Actions: "YES! NAILED IT" (green) / "TRY AGAIN" (outline)

---

## 9. MICRO-INTERACTIONS PLAYBOOK

### Buttons
- Hover: scale(1.05), translate(-2px, -2px), shadow grows
- Active: scale(0.98), translate(2px, 2px), shadow shrinks
- Magnetic effect: Follows cursor within 100px radius

### Inputs
- Focus: Gradient border glow (Listie → Blendy)
- Typing: Agents lean in slightly

### Agents
- Hover: scale(1.15), rotate(-5deg), label appears
- Eyes: Track cursor position
- Processing: Bounce animation, blob morph, blinking

### Success
- Confetti burst (50 particles in agent colors)
- Agent celebration dance (synchronized wave)

---

## 10. PERFORMANCE & ACCESSIBILITY

### Performance Targets
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- LCP: &lt; 2.5s
- CLS: &lt; 0.1
- Bundle (JS): &lt; 200KB gzipped

### Optimization
- Animate only transform/opacity (GPU-accelerated)
- Lazy load animations with IntersectionObserver
- Throttle scroll events with requestAnimationFrame

### Accessibility (WCAG AA)
- Color contrast: 4.5:1 minimum
- Focus indicators: Custom visible rings
- Keyboard navigation: Full support
- Screen reader: Semantic HTML, ARIA live regions
- Reduced motion: Respect prefers-reduced-motion
- Touch targets: 48px minimum

---

## 11. TECHNICAL IMPLEMENTATION

### Tech Stack
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: CSS Modules + CSS Variables
- Animation: GSAP + ScrollTrigger
- State: React hooks
- AI: Groq SDK (unchanged)

### File Structure
```
brain-dump-2.0/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── api/process/route.ts (UNCHANGED)
├── components/
│   ├── Hero/
│   ├── InputSection/
│   ├── ProcessingTheater/
│   ├── ResultCard/
│   ├── Agent/
│   ├── Cursor/
│   └── Background/
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useReducedMotion.ts
│   └── useMagneticEffect.ts
├── lib/
│   ├── animations.ts
│   └── constants.ts
└── styles/
    └── tokens.css
```

---

## 12. SUCCESS METRICS

### Awwwards Alignment
| Criterion | Weight | Target | Strategy |
|-----------|--------|--------|----------|
| Design | 40% | 8.5+ | Custom aesthetic, kinetic type |
| Usability | 30% | 8.0+ | Scroll-driven, mobile excellence |
| Creativity | 20% | 9.0+ | Unique agents, theatrical reveals |
| Content | 10% | 8.0+ | Punchy copy, brand voice |

### Technical Metrics
- Lighthouse: 90+ all categories
- Animation: 60fps consistent
- LCP: &lt; 2.5s
- Bundle: &lt; 200KB

---

## 13. PHASED ROLLOUT

### Phase 1: Foundation (Week 1-2)
- Design tokens
- Base components
- Agent component with states
- Custom cursor

### Phase 2: Hero & Input (Week 2-3)
- Hero with kinetic logo
- Scroll animations
- Input section with magnetic button
- Agent peeking behavior

### Phase 3: Processing Theater (Week 3-4)
- Full-screen takeover
- Agent choreography
- Progress visualization
- API integration sync

### Phase 4: Result Reveal (Week 4-5)
- Card entrance animation
- Kinetic typography
- Agent celebration
- Action buttons

### Phase 5: Polish (Week 5-6)
- Performance optimization
- Accessibility audit
- Mobile optimization
- Cross-browser testing

### Phase 6: Launch (Week 6-7)
- Production deployment
- Awwwards submission

---

## 14. APPENDICES

### A. Copy & Content
- Hero: "BRAIN DUMP" / "Think messy. We make magic."
- Input placeholder: "Just start typing... your idea doesn't need to make sense yet. That's our job!"
- Button: "DUMP IT!"
- Result header: "Here's what we heard..."
- Validation: "Did we get it right?"

### B. Agent SVG Template
```svg
<svg viewBox="0 0 100 100">
  <defs>
    <linearGradient id="agent-gradient">
      <stop offset="0%" style="stop-color:var(--agent-highlight)"/>
      <stop offset="100%" style="stop-color:var(--agent-shadow)"/>
    </linearGradient>
  </defs>
  <path class="blob-path" fill="url(#agent-gradient)" d="..."/>
</svg>
```

### C. Responsive Breakpoints
- Mobile: default (--agent-size: 70px)
- Tablet 768px+: (--agent-size: 90px)
- Desktop 1024px+: (--agent-size: 110px)
- Large 1440px+: (--agent-size: 130px)

---

**Document Version:** 2.0  
**Status:** Ready for Development  
**Target:** Awwwards Site of the Day 🏆
