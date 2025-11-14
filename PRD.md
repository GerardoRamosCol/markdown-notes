# Planning Guide

A minimalist note-taking application that enables users to quickly capture, organize, and find their thoughts with markdown formatting support.

**Experience Qualities**:
1. **Effortless** - Creating and editing notes should feel instantaneous and friction-free
2. **Focused** - A distraction-free interface that keeps attention on content, not controls
3. **Responsive** - Fast search and seamless transitions that respect the user's flow state

**Complexity Level**: Light Application (multiple features with basic state)
  - The app manages note creation, editing, deletion, and search with persistent state but doesn't require accounts or complex backend functionality

## Essential Features

### Note Creation
- **Functionality**: Create new notes with markdown content
- **Purpose**: Capture ideas quickly without friction
- **Trigger**: Click "New Note" button
- **Progression**: Click button → Empty note appears with focus on title → User types title and content → Auto-saved to storage
- **Success criteria**: New note appears in list immediately, focus is automatically set to title field

### Markdown Editor
- **Functionality**: Write notes using markdown syntax with live preview
- **Purpose**: Enable rich text formatting without complex WYSIWYG editors
- **Trigger**: Type in note content area
- **Progression**: User types markdown → Content auto-saves → Preview updates in real-time
- **Success criteria**: Markdown renders correctly, content persists between sessions

### Search Functionality
- **Functionality**: Filter notes by title and content in real-time
- **Purpose**: Quickly find specific notes as the collection grows
- **Trigger**: Type in search input
- **Progression**: User types search term → List filters instantly → Matching notes highlighted → Clear search to show all notes
- **Success criteria**: Search matches titles and content, results appear within 100ms

### Note Management
- **Functionality**: Edit existing notes and delete unwanted notes
- **Purpose**: Maintain an organized collection of relevant notes
- **Trigger**: Click note to edit, click delete icon to remove
- **Progression**: Click note → Note content loads in editor → Make changes → Auto-saved | Click delete → Confirmation dialog → Note removed from list
- **Success criteria**: Changes persist, deletions are confirmed before executing

## Edge Case Handling
- **Empty states**: Show helpful message with action prompt when no notes exist
- **Empty search results**: Display "No notes found" message with option to clear search
- **Long note titles**: Truncate with ellipsis in list view to maintain layout
- **Rapid typing**: Debounce search and auto-save to prevent performance issues
- **Markdown errors**: Gracefully handle invalid markdown without breaking the preview

## Design Direction
The design should feel calm, elegant, and purposeful - like a well-crafted journal. It should embrace generous whitespace and subtle interactions that don't interrupt the creative flow. A minimal interface that fades into the background, letting the content take center stage.

## Color Selection
Analogous cool palette with muted, sophisticated tones that create a serene writing environment

- **Primary Color**: Deep slate blue (oklch(0.35 0.05 250)) - Communicates focus and intellectual depth
- **Secondary Colors**: Soft gray-blue (oklch(0.85 0.02 250)) for backgrounds, maintaining visual harmony
- **Accent Color**: Bright teal (oklch(0.65 0.15 200)) for interactive elements and subtle highlights
- **Foreground/Background Pairings**:
  - Background (Light Slate oklch(0.98 0.01 250)): Dark Slate text (oklch(0.25 0.04 250)) - Ratio 14.2:1 ✓
  - Card (White oklch(1 0 0)): Dark Slate text (oklch(0.25 0.04 250)) - Ratio 15.8:1 ✓
  - Primary (Deep Slate oklch(0.35 0.05 250)): White text (oklch(1 0 0)) - Ratio 10.5:1 ✓
  - Secondary (Light Blue-Gray oklch(0.85 0.02 250)): Dark Slate text (oklch(0.25 0.04 250)) - Ratio 11.2:1 ✓
  - Accent (Bright Teal oklch(0.65 0.15 200)): White text (oklch(1 0 0)) - Ratio 5.8:1 ✓
  - Muted (Pale Blue oklch(0.92 0.01 250)): Medium Slate text (oklch(0.50 0.03 250)) - Ratio 6.1:1 ✓

## Font Selection
Clean, modern sans-serif with excellent readability for extended writing sessions - Inter for its precise letterforms and extensive weight range

- **Typographic Hierarchy**:
  - H1 (App Title): Inter SemiBold/20px/tight letter spacing
  - H2 (Note Title): Inter Medium/18px/normal letter spacing  
  - Body (Note Content): Inter Regular/15px/relaxed line height (1.6)
  - Small (Timestamps, Meta): Inter Regular/13px/normal letter spacing
  - Search Input: Inter Regular/14px/normal letter spacing

## Animations
Motion should be subtle and purposeful, guiding attention without demanding it - smooth fade-ins for new notes, gentle scale transforms for interactions

- **Purposeful Meaning**: Transitions communicate relationships (notes sliding in/out of view) and state changes (focus states with soft glows)
- **Hierarchy of Movement**: 
  - Primary: Note selection transitions and search filtering (200-300ms)
  - Secondary: Hover states and focus indicators (150ms)
  - Tertiary: Subtle scale on button press (100ms)

## Component Selection
- **Components**: 
  - Button (primary actions like "New Note")
  - Input (search field with icon)
  - Card (note list items with hover states)
  - Dialog (delete confirmation)
  - ScrollArea (note list container)
  - Separator (visual dividers)
  - Textarea (note content editor)
- **Customizations**: 
  - Custom markdown preview component using `marked` library
  - Split-pane layout with resizable divider for editor/preview
  - Custom note list item with truncated title and timestamp
- **States**: 
  - Buttons: Subtle shadow on hover, slight scale on press, muted when disabled
  - Inputs: Soft border glow on focus, clear icon appears when text present
  - Cards: Gentle lift on hover, highlighted border when selected
- **Icon Selection**: 
  - Plus (new note)
  - MagnifyingGlass (search)
  - Trash (delete)
  - X (clear search)
  - NotePencil (edit state indicator)
- **Spacing**: 
  - Container padding: p-6
  - Card spacing: gap-3
  - Input padding: px-4 py-2
  - Section gaps: gap-6
- **Mobile**: 
  - Stack layout vertically (editor below list)
  - Full-width cards with larger touch targets (min 44px)
  - Hide preview by default, show toggle button
  - Collapsible search bar to save space
