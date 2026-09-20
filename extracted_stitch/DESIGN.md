---
name: Life Archive
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#484550'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#797581'
  outline-variant: '#c9c4d2'
  surface-tint: '#61549d'
  primary: '#61549d'
  on-primary: '#ffffff'
  primary-container: '#a99bea'
  on-primary-container: '#3d2f77'
  inverse-primary: '#cabeff'
  secondary: '#6250ac'
  on-secondary: '#ffffff'
  secondary-container: '#ad9bfd'
  on-secondary-container: '#402d88'
  tertiary: '#5e5e67'
  on-tertiary: '#ffffff'
  tertiary-container: '#a5a4ae'
  on-tertiary-container: '#3a3a43'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#cabeff'
  on-primary-fixed: '#1c0956'
  on-primary-fixed-variant: '#493c83'
  secondary-fixed: '#e6deff'
  secondary-fixed-dim: '#cbbeff'
  on-secondary-fixed: '#1d0061'
  on-secondary-fixed-variant: '#4a3792'
  tertiary-fixed: '#e3e1ec'
  tertiary-fixed-dim: '#c7c5d0'
  on-tertiary-fixed: '#1a1b23'
  on-tertiary-fixed-variant: '#46464f'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Syne
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  body-lg:
    fontFamily: Space Mono
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Space Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Space Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-sm: 1rem
  margin-lg: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-xxl: 4rem
---

## Brand & Style

This design system establishes an avant-garde sonic cataloging atmosphere—a bridge between a quiet literary journal and a high-concept vinyl museum vault. It treats listening not as passive algorithmic consumption, but as tangible personal provenance.

The aesthetic philosophy balances sculptural, expressive display typography (`Syne`) with deliberate, archival monospace documentation (`Space Mono`). Surfaces evoke warm archival paper, unbleached linen catalog cards, and protective specimen sleeves. Visual interactions feel deliberate, physical, and preserved: delicate hairline borders frame sound journals, while soft violet resonances highlight critical sonic metadata and timestamps. The emotional resonance is focused, contemplative, quiet, and timeless.

## Colors

The palette grounds itself in gallery-grade warmth and physical archive stock rather than clinical digital white.

- **Background & Canvas (`#FAF9F6`)**: Natural unbleached gallery paper that softens optical glare during extended editorial reading.
- **Card & Surface (`#FFFFFF`)**: Pure sheet substrate resting gently against the tinted room canvas.
- **Primary Accent (`#A99BEA`)**: Muted sonic lavender, used sparingly for focal markers, needle drop indicators, active catalog states, and key callouts.
- **Secondary Accent (`#8C7AD9`)**: Deepened violet tone engineered for high-intent interactive states, focused links, and hovered controls.
- **Tertiary Accent (`#F3F1FC`)**: Gossamer lavender wash utilized for archival pill backdrops, track chips, selection bands, and badge fills.
- **Neutral Primary (`#191919`)**: Charcoal-black ink delivering decisive typographical contrast without clinical harshness.
- **Neutral Secondary (`#666360`)**: Weathered carbon pencil tone dedicated to metadata labels, catalog registries, and technical disc annotations.
- **Hairlines & Dividers (`#EBE8E3` / `#E5E2DC`)**: Barely-there structural rulings mimicking library ledger folios.

## Typography

The typographic hierarchy juxtaposes two diametric voices:

1. **The Sculptural Voice (`Syne`)**: Applied to titles, editorial section heads, and exhibition volume markers. Its wide geometry and unconventional curvatures evoke vinyl record sleeves, gallery posters, and avant-garde music monographs.
2. **The Archival Voice (`Space Mono`)**: Applied to running body passages, matrix etchings, RPM numbers, timestamps, and taxonomic data. It introduces mechanical discipline, transforming memory entries into preserved physical documents.

Keep body line heights open and generous (1.6x to 1.7x) to honor long-form reflective writing. Labels and metadata always employ uppercase styling paired with expanded tracking (`0.08em` to `0.12em`) to mirror archival accession stamps.

## Layout & Spacing

The layout is constructed as an asymmetrical editorial grid inspired by classical Japanese art books and European design catalogues.

- **Desktop (1024px and above)**: 12-column variable grid with `4rem` outer margin and `2rem` gutters. Wide margins isolate solitary track essays; essays alternate between centered columns (columns 3 through 10) and split arrangements (col 1–5 for archival media/groove graphics, col 6–12 for journal narrative).
- **Tablet (768px – 1023px)**: 8-column layout with `2rem` margins and `1.5rem` gutters. Sidebars fold into linear chapter sequences.
- **Mobile (below 768px)**: 4-column flow with `1rem` margins and `1rem` gutters. Text is set continuously to maintain intimate reading cadence without broken line breaks.

Vertical rhythm relies heavily on deliberate void spaces (`space-xl` and `space-xxl`) between listening entries to encourage slow, measured consumption rather than endless scrolling feeds.

## Elevation & Depth

Visual hierarchy does not rely on heavy drop shadows or floating 3D planes; depth remains planar, tactile, and close to the canvas.

- **Plinth & Substrate**: Cards and entry panels sit directly on the warm off-white canvas separated by crisp, 1px solid borders in `#EBE8E3`.
- **Archival Float (Ambient Shadow)**: When a journal record is engaged or hovered, depth is expressed through a soft, diffused ambient veil: `0 4px 20px -2px rgba(25, 25, 25, 0.04), 0 1px 3px 0 rgba(169, 155, 234, 0.08)`.
- **Structural Insets**: Inset groove details and audio waveform holders use sunken, micro-recessed borders (`inset 0 1px 2px rgba(25, 25, 25, 0.03)`) against light tinted backgrounds (`#FAF9F6`).
- **Hairline Rulings**: Spatial zones are demarcated by 1px rules tinted with `#E5E2DC` rather than tonal block fills.

## Shapes

The design system employs a soft, restrained corner radius (`0.25rem` baseline). 

- **Containers & Plates (`0.5rem` / `rounded-lg`)**: Editorial cards, album sleeve sleeves, and listening entry wrappers maintain slight softened corners that evoke heavy museum paper stocks cut with precision.
- **Interactive Elements (`0.25rem`)**: Action triggers, inputs, and search fields preserve tailored edges, rejecting overly rounded tech aesthetics in favor of bookish discipline.
- **Sonic Pills & Seals (`9999px`)**: Stamp badges, status tags, and audio playheads employ full pill encapsulation to visually reference phonographic labels, matrix wax run-outs, and museum accession tags.

## Components

### Buttons & Triggers
- **Primary Button**: Background `#191919`, text `#FAF9F6`, uppercase `Space Mono` (`label-sm`), `0.25rem` radius, padding `0.75rem 1.5rem`. Hover shifts subtle border glow to `#A99BEA` with smooth background shift to `#302E2C`.
- **Secondary Button**: Background `#FFFFFF`, border `1px solid #EBE8E3`, text `#191919`. Hover state adopts `#F3F1FC` fill and `#8C7AD9` border outline.
- **Ghost / Action Trigger**: No background, minimal 1px underline in `#A99BEA`, padding `0.5rem 0`, monospace letterspaced label.

### Archival Cards & Journal Sleeves
- **Listening Card**: Solid `#FFFFFF` surface, framed in `1px solid #EBE8E3`, with `1.5rem` internal padding. Top edge features an accession stamp header (`CATALOG NO. // DATE // PRESSING`). Hover elevates with the archival ambient shadow and renders a delicate `1px solid #A99BEA` outline.
- **Media Sleeve**: Square aspect ratio asset container with a subtle simulated 1px inner rim mimicking a heavy paper LP gatefold jacket.

### Chips, Tags & Badges
- **Catalog Badge**: Capsule pill shape (`rounded-full`), background `#F3F1FC`, text `#191919`, border `1px solid rgba(169, 155, 234, 0.4)`. Applied to genres, acoustic moods, audio formats (e.g., `33⅓ RPM`, `FLAC // 24-BIT`).
- **Timestamp Marker**: Monospace bracket notation (`[02:41]`) tinted with `#666360` with primary lavender hover tint.

### Form Inputs & Search Fields
- **Text & Reflection Input**: Base field framed with `1px solid #E5E2DC`, background `#FFFFFF`, text `#191919`. Active focus triggers border `#8C7AD9` with zero thick outline halos, preserving stark editorial precision. Placeholder text rendered in muted `#666360`.

### Track Lists & Audio Ledger
- **Ledger Item**: Strip-down row bordered by a bottom `1px solid #EBE8E3` ruling. Track index in `Space Mono` (`body-sm`), track title in `Syne` (`headline-sm`), duration and notes pinned to right margin in `#666360`. On hover, the row illuminates in a faint `#F3F1FC` background tint.

### Specialized Sonic Components
- **Waveform Ribbon**: Thin visual needle groove spanning card bottoms; unplayed segments in `#E5E2DC`, elapsed sound in `#A99BEA`.
- **Needle-Drop Annotation**: Inline callout module within journal text featuring a vertical 2px `#A99BEA` stroke on the left edge, holding specific lyrical reflections tied to exact time offsets.