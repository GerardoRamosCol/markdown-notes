# Planning Guide

**Experience Qualities**:


  - Combines note management with payment flow, using persistent storage and form validation
## Essential Features
### Note Creation

- **Progression**: Click button → Empty note appears with focus on title → U


- **Trigger**: Type i

### Search Functi
- **Purpose**: Quickly find specific notes as the collectio
- **Progression**: User types search term → List filters instantly → 

- **Functionality**: Delete notes with confirmation, edit existing notes
- **Trigger**: Click trash icon on note card
- **Progression**: Click trash → Confirmation dialog appears → Confirm deletion → Note removed from list
- **Success criteria**: Deletion requires confirmation, note is removed from persistent storage

### Checkout Flow
- **Functionality**: Select a premium plan and proceed to payment
- **Purpose**: Upgrade to premium features with secure payment processing
- **Trigger**: Click "Upgrade to Premium" or access checkout page
- **Progression**: View plans → Select plan → Enter payment details → Process payment → Redirect to success
- **Success criteria**: Form validation works, error handling is clear, success state confirms completion

- **Purpose**: Quickly find specific notes as the collection grows
- **Trigger**: Type in search inputeturns no results
- **Search Clearing**: Easy way to clear search and return to full list
- **Unsaved Changes**: Auto-save prevents data loss

- **Form Validation
## Design Direction

Analogous color scheme (blue-violet range) c
- **Primary Color**: oklch(0.35 0.05 250) - Deep blue-violet communicating trust and stability
- **Accent Color**: oklch(0.65 0.15 200) - Vibrant cyan for calls-to-action and interactive ele

### Checkout Flow
- **Functionality**: Select a premium plan and proceed to payment
- **Purpose**: Upgrade to premium features with secure payment processing
- **Trigger**: Click "Upgrade to Premium" or access checkout page
- **Progression**: View plans → Select plan → Enter payment details → Process payment → Redirect to success
- **Success criteria**: Form validation works, error handling is clear, success state confirms completion

## Edge Case Handling
- **Empty States**: Show helpful prompts when no notes exist or search returns no results
- **Search Clearing**: Easy way to clear search and return to full list
- **Unsaved Changes**: Auto-save prevents data loss
- **Payment Errors**: Clear error messages with retry options
- **Form Validation**: Real-time feedback on required fields and format requirements

## Design Direction
The design should feel modern and professional with a calm, focused atmosphere that doesn't distract from content creation, while the checkout experience should feel secure and trustworthy with clear visual hierarchy.

## Color Selection
Analogous color scheme (blue-violet range) creating a cohesive, calming environment with subtle color variations

- **Primary Color**: oklch(0.35 0.05 250) - Deep blue-violet communicating trust and stability
- **Secondary Colors**: oklch(0.85 0.02 250) - Light blue-grey for supporting elements, oklch(0.92 0.01 250) for muted backgrounds
- **Accent Color**: oklch(0.65 0.15 200) - Vibrant cyan for calls-to-action and interactive elements
- **Foreground/Background Pairings**:
  - Background (Light Blue-Grey oklch(0.98 0.01 250)): Dark Text (oklch(0.25 0.04 250)) - Ratio 13.8:1 ✓
  - Card (White oklch(1 0 0)): Dark Text (oklch(0.25 0.04 250)) - Ratio 15.2:1 ✓
  - Primary (Deep Blue-Violet oklch(0.35 0.05 250)): White Text (oklch(1 0 0)) - Ratio 9.1:1 ✓
  - Accent (Cyan oklch(0.65 0.15 200)): White Text (oklch(1 0 0)) - Ratio 4.8:1 ✓

## Font Selection
Inter provides excellent readability at all sizes with its balanced proportions and open apertures, perfect for both content editing and form interfaces.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Semibold/18px/tight letter spacing
  - H2 (Section Headers): Inter Medium/14px/normal letter spacing
  - Tertiary: Subtle scale on button press (100ms)






  - AlertDialog (delete confirmation)
list container)




  - Body (Note Content): Inter Regular/15px/relaxed line height (1.6)
  - Small (Timestamps, Meta): Inter Regular/13px/normal letter spacing
  - Search Input: Inter Regular/14px/normal letter spacing

## Animationsdation with real-time feedback
Motion should be subtle and purposeful, guiding attention without demanding it - smooth fade-ins for new notes, gentle scale transforms for interactions
ng
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
- **Mobile**: 
  - Stack layout vertically (editor below list, checkout forms single column)
  - Full-width cards with larger touch targets (min 44px)
  - Simplified navigation for checkout flow
  - Sticky payment summary on mobile
