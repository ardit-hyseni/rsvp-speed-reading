# Speed Reading (RSVP)

A small, focused **Rapid Serial Visual Presentation (RSVP)** app. Paste text, pick a speed, and read one word at a time in a fixed position so your eyes don’t need to scan across lines.

RSVP (Rapid Serial Visual Presentation) shows information quickly—one item at a time—in the same spot on the screen. The content moves, not your eyes.

## Features

- **Paste & play**: paste any text and start an RSVP session
- **Speed control**: adjust **WPM** with a slider
- **Reading focus**: optional **pivot letter** highlight (center letter in red)
- **Customization**: font family, font size, and font color
- **Progress**: progress bar + word counter

## Tech stack

- React + TypeScript + Vite
- Tailwind (base setup) + custom CSS for the UI
- shadcn/ui (Slider)
- Motion (animated gradient title)

## Getting started

Prerequisites: a recent Node.js version (Node 18+ recommended).

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## How it works (quick overview)

- Your text is split into words.
- A timer advances the current word based on the selected WPM.
- Optionally, the “pivot” letter (roughly the center of the word) is highlighted to help maintain focus.

## Project structure (high level)

- `src/App.tsx`: main RSVP UI + playback logic
- `src/GradientText.tsx`: animated gradient title component

## Credits

- `GradientText` is adapted from a “GradientText” pattern (see source comment in `src/GradientText.tsx`).
