# Design Guidelines: Embiggen Your Eyes - NASA Image Exploration Portal

## Design Approach
**Reference-Based Space Theme**: Drawing inspiration from NASA's official websites, SpaceX, and modern space exploration platforms, combined with dark-mode-first design patterns from Linear and Notion. The design celebrates cosmic exploration while maintaining professional utility for image analysis.

## Core Design Principles
1. **Cosmic Immersion**: Deep space backgrounds with subtle star fields and nebula gradients
2. **Data-First Hierarchy**: NASA imagery takes center stage with minimal UI interference
3. **Precision Tools**: Clean, technical interface elements for scientific exploration
4. **Atmospheric Depth**: Layered depth through blur effects and translucent overlays

## Color Palette

### Dark Mode (Primary)
- **Background Deep Space**: #0b0c10 (primary background)
- **Surface Elevation**: #1f2833 (cards, panels, elevated surfaces)
- **Accent Cyan**: #66fcf1 (primary actions, links, active states)
- **Accent Blue**: 220 80% 60% (secondary actions, highlights)
- **Text Primary**: 210 20% 95% (main content)
- **Text Secondary**: 210 15% 70% (supporting text)
- **Border Subtle**: 220 20% 25% (dividers, borders)

### Light Mode
- **Background**: 210 25% 98% (clean white-blue)
- **Surface**: 210 20% 95% (subtle elevation)
- **Accent Cyan**: 180 85% 45% (darker version of #66fcf1)
- **Accent Blue**: 220 80% 50%
- **Text Primary**: #0b0c10
- **Text Secondary**: 220 20% 40%

## Typography

**Font Stack**: 
- **Primary**: 'Inter' (UI elements, body text) - clean, modern, technical
- **Display**: 'Space Grotesk' (headings, hero text) - geometric, space-age feel

**Scale**:
- Hero Display: text-7xl (72px) font-bold tracking-tight
- Page Titles: text-4xl (36px) font-bold
- Section Headers: text-2xl (24px) font-semibold
- Body Large: text-lg (18px) font-normal
- Body: text-base (16px) font-normal
- Captions: text-sm (14px) font-medium

## Layout System

**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 (focus on even spacing for cosmic precision)

**Grid System**:
- Container: max-w-7xl mx-auto
- Section Padding: py-20 desktop, py-12 mobile
- Card Spacing: gap-6 for grids
- Component Internal: p-6 for cards, p-4 for compact elements

## Component Library

### Navigation
- **Sticky Header**: Backdrop blur with subtle border-b, h-16
- **Logo**: Cyan accent color with small star icon
- **Nav Links**: Hover state with cyan underline animation
- **Profile Dropdown**: Glass-morphic with blur-lg backdrop

### Hero Section (Homepage)
- **Full-viewport hero** (h-screen) with deep space background image
- **Animated starfield** using CSS particles (very subtle, non-distracting)
- **Large typography**: Space Grotesk display font with cyan gradient text effect
- **CTA Buttons**: Primary (bg-cyan-500) and Secondary (variant outline with backdrop-blur-md)
- **Scroll indicator**: Subtle animated chevron at bottom

### Cards & Surfaces
- **Glass-morphic panels**: bg-surface/80 backdrop-blur-lg border border-subtle
- **Saved View Cards**: Aspect-video thumbnail, title, timestamp, zoom level indicator
- **Hover Effects**: Scale-105 transform with cyan border glow

### Explorer Page
- **Full-screen layout**: OpenSeadragon viewer takes 80% height
- **Floating toolbar**: Bottom-fixed, glass-morphic panel with tools (save, download, annotate)
- **Annotation UI**: Cyan drawing tools, semi-transparent overlays for notes
- **Sidebar panel**: Collapsible left panel for saved annotations/bookmarks (w-80 when open)

### Forms & Inputs
- **Consistent styling**: bg-surface border border-subtle focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
- **Profile Photo Upload**: Circular avatar (96px) with hover overlay for change
- **Password Fields**: Show/hide toggle with eye icon
- **Submit Buttons**: Full-width bg-cyan-500 hover:bg-cyan-600 with loading spinner states

### Authentication Pages
- **Centered card layout**: max-w-md mx-auto with glass-morphic card
- **Social login**: Google button with icon and "Sign in with Google" text
- **Divider**: "or continue with email" centered text divider
- **Background**: Subtle animated gradient mesh in space colors

### My Saves Page
- **Masonry grid**: 2-column tablet, 3-column desktop (gap-6)
- **Empty state**: Illustration of telescope with "Start exploring to save views" message
- **Filter bar**: Tags for date, zoom level, planet/moon type

### About Page
- **Two-column layout**: Content left, NASA data visualization/image right
- **Timeline-style**: Project milestones with icon markers
- **Credit section**: NASA API attribution with logo

## Animations (Minimal & Purposeful)

- **Page transitions**: Subtle fade-in (300ms) only
- **Button interactions**: Scale-95 on active, built-in Tailwind transitions
- **Modal overlays**: Fade + scale entrance (200ms)
- **Toast notifications**: Slide-in from top-right (250ms)
- **NO** parallax, NO scroll-triggered animations, NO auto-playing carousels

## Images

**Hero Image**: Deep space nebula or planet surface panorama (full-bleed, 1920x1080 min)
**About Page**: Collage of NASA planetary images or rover photography
**Empty States**: Custom illustrations of telescopes, spacecraft, planetary bodies
**Profile Defaults**: Abstract geometric space-themed avatars

## Responsive Breakpoints

- **Mobile**: Single column, stacked navigation (hamburger menu)
- **Tablet (md:)**: 2-column grids, horizontal navigation
- **Desktop (lg:)**: Full layout with sidebars, 3-column grids

## Accessibility & Dark Mode

- **Dark mode default** with light mode toggle in navbar
- **Focus states**: Visible cyan ring on all interactive elements
- **ARIA labels**: All icon buttons properly labeled
- **Color contrast**: WCAG AA compliant (4.5:1 minimum)
- **Keyboard navigation**: Full support including modal traps

## Toast Notifications

- **Position**: top-right fixed
- **Style**: Glass-morphic with status color border (cyan success, red error)
- **Duration**: 3-4 seconds auto-dismiss with manual close button
- **Animation**: Slide + fade entrance/exit