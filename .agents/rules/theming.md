# Theming Rule - Use CSS Theme Variables Everywhere

## Core Rule
Always use CSS theme variables for all colors, backgrounds, borders, and shadows.
Do not use hardcoded Tailwind color classes like bg-slate-50, text-slate-900.
Do not use shadcn UI components (Card, Button, Input) for page-level styling.
Use native HTML elements with inline style props that reference theme variables.

## Reference Pages
frontend/src/pages/auth/login/Login.jsx
frontend/src/pages/auth/signUp/SignUp.jsx

## Theme Variables
Page background:   backgroundColor: var(--theme-bg)
Page text:         color: var(--theme-text-main)
Muted text/labels: color: var(--theme-text-muted)
Card background:   backgroundColor: var(--theme-surface-solid)
Card border:       borderColor: var(--theme-border)
Card shadow:       boxShadow: var(--theme-card-shadow)
Input background:  backgroundColor: var(--theme-elevated)
Input border:      borderColor: var(--theme-border-subtle)
Primary color:     backgroundColor: var(--theme-primary)
Primary text:      color: var(--theme-primary-text)
Glow/accent:       radial-gradient(circle, var(--theme-glow) 0%, transparent 70%)

## Page Wrapper Required
Every page outer div must have backgroundColor var(--theme-bg) and color var(--theme-text-main).
Include the ambient glow element using var(--theme-glow) as a background radial-gradient.