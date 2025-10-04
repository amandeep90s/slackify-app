/**
 * Custom color constants for the Slackify application
 * These colors maintain the app's branding and visual consistency
 */

export const BRAND_COLORS = {
  /** Primary brand color - Deep purple used for primary backgrounds and branding */
  PRIMARY: '#3f0e40',

  /** Sidebar background color - Slightly lighter purple for sidebar elements */
  SIDEBAR: '#5e2c5f',

  /** Light background color used in email templates and neutral sections */
  LIGHT_BACKGROUND: '#f5f5f5',
} as const;

/**
 * Semantic color mappings for specific use cases
 */
export const SEMANTIC_COLORS = {
  /** Brand primary color for headers, buttons, and primary elements */
  BRAND_PRIMARY: BRAND_COLORS.PRIMARY,

  /** Sidebar and navigation background */
  NAVIGATION_BG: BRAND_COLORS.SIDEBAR,

  /** Neutral background for cards, modals, and content sections */
  CONTENT_BG: BRAND_COLORS.LIGHT_BACKGROUND,
} as const;

/**
 * Tailwind CSS class utilities for the custom colors
 * Use these for consistent styling across components
 */
export const TAILWIND_COLORS = {
  /** Background utilities */
  BG: {
    PRIMARY: 'bg-[#3f0e40]',
    SIDEBAR: 'bg-[#5e2c5f]',
    LIGHT: 'bg-[#f5f5f5]',
  },

  /** Text color utilities */
  TEXT: {
    PRIMARY: 'text-[#3f0e40]',
    SIDEBAR: 'text-[#5e2c5f]',
  },

  /** Border color utilities */
  BORDER: {
    PRIMARY: 'border-[#3f0e40]',
    SIDEBAR: 'border-[#5e2c5f]',
  },
} as const;

/**
 * CSS custom property names for use with CSS variables
 */
export const CSS_VARIABLES = {
  PRIMARY_BACKGROUND: '--primary-background',
} as const;
