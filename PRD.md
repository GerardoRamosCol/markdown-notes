# Planning Guide

**Experience Qualities**:

**Experience Qualities**:
  - The app manages note creation, editing, deletion, and search with persistent state but
## Essential Features
### Note Creation

- **Progression**: Click button → Empty note appears with focus on title → U


## Essential Features

### Note Creation
- **Purpose**: Quickly find specific notes as the collectio
- **Progression**: User types search term → List filt

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
  - Body (Note Content): Inter Regular/15px/relaxed line height (1
  - Search Input: Inter Regular/14px/normal letter spacing
## Animations

- **Hierarchy of Movement**: 


- **Components**: 
  - Input (search field with icon)
  - Dialog (delete confirmation)
  - Separator (visual dividers)
- **Customizations**: 

- **States**: 
  - Inputs: Soft border glow on focus, clear icon appears when text present

  - MagnifyingGlas
  - X (clear search)

  - Card spacing: gap-3
  - Section gaps: gap-6
  - Stack layout vertically (editor below list)
  - Hide preview by default, show tog













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
