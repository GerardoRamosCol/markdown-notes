# Planning Guide

A markdown-powered note-taking application with an integrated checkout flow for premium features.

**Experience Qualities**:
  - **Effortless**: Note creation and editing feels immediate with no friction between thought and capture
  - **Focused**: Clean interface that recedes to let content take center stage
  - **Trustworthy**: Clear, professional checkout experience that builds confidence

**Complexity Level**: Light Application (multiple features with basic state)
  - Combines note management with payment flow, using persistent storage and form validation

## Essential Features

### Note Creation
- **Functionality**: Create new notes with automatic saving
- **Purpose**: Capture thoughts immediately without manual save steps
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
- **Functionality**: Delete notes with confirmation, edit existing notes
- **Purpose**: Manage growing collection of notes safely
- **Trigger**: Click trash icon on note card
- **Progression**: Click trash → Confirmation dialog appears → Confirm deletion → Note removed from list
- **Success criteria**: Deletion requires confirmation, note is removed from persistent storage

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













  - Body (Note Content): Inter Regular/15px/relaxed line height (1.6)
  - Small (Timestamps, Meta): Inter Regular/12px/normal letter spacing
  - Price Display: Inter Semibold/32px/tight letter spacing

## Animations
Motion should be subtle and purposeful, guiding attention without demanding it - smooth fade-ins for new notes, gentle scale transforms for interactions, confident transitions in checkout flow

- **Purposeful Meaning**: Transitions communicate relationships (notes sliding in/out of view) and state changes (focus states with soft glows), checkout steps flow smoothly
- **Hierarchy of Movement**: 
  - Primary: Note selection transitions and checkout step changes (200-300ms)
  - Secondary: Hover states and focus indicators (150ms)
  - Tertiary: Subtle scale on button press (100ms)

## Component Selection
- **Components**: 
  - Button (primary actions like "New Note", "Checkout")
  - Input (search field, payment form fields)
  - Card (note list items, pricing cards)
  - AlertDialog (delete confirmation)
  - ScrollArea (note list container)
  - Separator (visual dividers)
  - Textarea (note content editor)
  - Badge (plan features, pricing highlights)
  - RadioGroup (plan selection)
- **Customizations**: 
  - Custom markdown preview using `marked` library
  - Split-pane layout for editor/preview
  - Pricing cards with feature lists and CTAs
  - Form validation with real-time feedback
- **States**: 
  - Buttons: Subtle shadow on hover, slight scale on press, muted when disabled, loading spinner during processing
  - Inputs: Soft border glow on focus, error states with red border, success with green checkmark
  - Cards: Gentle lift on hover, highlighted border when selected, selected state for pricing plans
- **Icon Selection**: 
  - Plus (new note)
  - MagnifyingGlass (search)
  - Trash (delete)
  - X (clear search, close dialogs)
  - NotePencil (edit indicator)
  - CreditCard (payment)
  - CheckCircle (success states)
  - Warning (error states)
- **Spacing**: 
  - Container padding: p-6
  - Card spacing: gap-4
  - Form field spacing: gap-4
  - Section gaps: gap-8 (checkout), gap-6 (notes)
- **Mobile**: 
  - Stack layout vertically (editor below list, checkout forms single column)
  - Full-width cards with larger touch targets (min 44px)
  - Simplified navigation for checkout flow
  - Sticky payment summary on mobile
