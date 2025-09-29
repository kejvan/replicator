// Blue Theme Color Palette
// Based on atom-blue.json theme

// Theme Metadata
const themeMetadata = {
  name: 'Replicant Blue',
  fileName: 'replicant-blue.json',
  uiTheme: 'vs-dark'
};

// UI Colors - Used for VS Code interface elements
const uiColors = {
  // Base colors
  background: '#1a2e48',           // main background
  backgroundLighter: '#1f3654',    // slightly lighter variant
  backgroundDarker: '#152938',     // side areas
  foreground: '#abb2bf',           // main foreground
  foregroundMuted: '#7a8ba3',      // syntax gutter color
  foregroundDimmed: '#5a6f84',     // comments color variant

  // Accent and interaction colors
  accent: '#4a7bc8',               // cursor color
  accentMuted: '#3a5f99',          // badge background
  border: '#254159',               // border colors

  // Selection and highlighting
  selection: '#2d4a66',            // selection background
  selectionHighlight: '#3a5573',   // word highlight background
  currentLine: '#254159',          // line highlight background

  // Status colors using original hues
  highlight: '#e5c07b',            // hue-6-2 (orange 2) - kept for UI elements
  searchHighlight: '#5a8fdb',      // search-specific highlight (lighter blue)
  warning: '#e5c07b',              // hue-6-2 (orange 2)  
  error: '#e06c75',                // hue-5 (red 1)
  success: '#98c379',              // hue-4 (green)
  info: '#61afef',                 // hue-2 (blue)

  // Chart colors (UI elements, not syntax)
  chartRed: '#e06c75',             // hue-5 (red 1)
  chartBlue: '#61afef',            // hue-2 (blue)
  chartYellow: '#e5c07b',          // hue-6-2 (orange 2)
  chartOrange: '#d19a66',          // hue-6 (orange 1)
  chartGreen: '#98c379',           // hue-4 (green)
  chartPurple: '#c678dd',          // hue-3 (purple)
  chartCyan: '#56b6c2'             // hue-1 (cyan)
};

// Syntax Colors - Used exclusively for code syntax highlighting
// Based on original Atom One Dark syntax theme color definitions
const syntaxColors = {
  // Base syntax colors
  comment: '#5a6f84',              // same as uiColors.foregroundDimmed
  punctuation: '#abb2bf',          // same as uiColors.foreground

  // Hue-based syntax colors
  cyan: '#56b6c2',                 // hue-1 - hsl(187, 47%, 55%)
  blue: '#61afef',                 // hue-2 - hsl(207, 82%, 66%)
  purple: '#c678dd',               // hue-3 - hsl(286, 60%, 67%)
  green: '#98c379',                // hue-4 - hsl(95, 38%, 62%)
  red1: '#e06c75',                 // hue-5 - hsl(355, 65%, 65%)
  red2: '#be5046',                 // hue-5-2 - hsl(5, 48%, 51%)
  orange1: '#d19a66',              // hue-6 - hsl(29, 54%, 61%)
  orange2: '#e5c07b',              // hue-6-2 - hsl(39, 67%, 69%)

  // Semantic assignments following original Atom One Dark
  string: '#98c379',               // hue-4 (green)
  number: '#d19a66',               // hue-6 (orange 1)
  keyword: '#c678dd',              // hue-3 (purple)
  function: '#61afef',             // hue-2 (blue)
  variable: '#e06c75',             // hue-5 (red 1)
  type: '#e5c07b',                 // hue-6-2 (orange 2)
  constant: '#d19a66',             // hue-6 (orange 1)
  property: '#e06c75',             // hue-5 (red 1)
  operator: '#c678dd',             // hue-3 (purple)
  tag: '#e06c75',                  // hue-5 (red 1)
  attribute: '#d19a66',            // hue-6 (orange 1)
  className: '#e5c07b',            // hue-6-2 (orange 2)
  namespace: '#c678dd',            // hue-3 (purple)
  support: '#56b6c2',              // hue-1 (cyan)
  escape: '#56b6c2'                // hue-1 (cyan)
};

module.exports = {
  themeMetadata,
  uiColors,
  syntaxColors
};