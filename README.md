# Flipbox Builder App

A Vue 3 application for building flipbox cards featuring rich text input and live preview functionality. 

## Requirements

- Node.js 20.19.x, or Node.js 22.12 or later
- npm

## Install and run

```bash
npm install
npm run dev
```

Other available scripts:

```bash
npm run build    # production build
npm run preview  # preview the production build locally
```

## Project structure

```tree
src/
  App.vue                        # top-level layout (builder + preview) and persistence
  main.js
  style.css                      # Tailwind import and default styling
  components/
    FlipboxBuilder.vue           # front/back editing and reset control
    FlipboxPreview.vue           # flip interaction and dual view
    RichTextEditor.vue           # TipTap editor and formatting toolbar
  composables/
    usePersistence.js            # generic localStorage save/load helper
```

## Features
**Rich Text Editing** - Each side can be edited using a TipTap editor offering bold, italic, strikethrough, paragraphs, bulleted and numbered lists along with undo/redo actions. By hovering over each toolbar button users can view a corresponding keyboard shortcut in the tooltip along with a indicator setup using `aria`, 

**Live Preview** - The preview reflects content entered into the builder as it's typed.

**Flip Interaction** - The preview area shows one side of the card at a time allowing users to flip between then as desired by utilizing a dynamic button or by clicking the flipbox. A checkbox toggle is also provided so users can switch to view both sides at once.

**Persistence** - The contents of the flipbox is saved to `localStorage` meaning content is automatically restored on page load or if the user loses internet connection.

**Reset** - A reset button is provided allowing users to clear both sides of the flipbox on confirmation. 
