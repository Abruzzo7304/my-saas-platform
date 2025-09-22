export type ThemeVariables = Record<string, string>;

export interface ThemeDefinition {
  name: string;
  description: string;
  variables: ThemeVariables;
}

export type ThemeName = 'default' | 'pacific' | 'sunset';

export const themes: Record<ThemeName, ThemeDefinition> = {
  default: {
    name: 'Default',
    description: 'Balanced blue and purple palette used across the platform.',
    variables: {
      '--color-app-background': '#f5f5f5',
      '--color-surface': '#ffffff',
      '--color-surface-muted': '#f8fafc',
      '--color-text-primary': '#1f2937',
      '--color-text-muted': '#64748b',
      '--color-text-soft': '#94a3b8',
      '--color-text-inverse': '#ffffff',
      '--color-primary': '#6366f1',
      '--color-primary-dark': '#4338ca',
      '--color-info': '#3b82f6',
      '--color-success': '#10b981',
      '--color-warning': '#f59e0b',
      '--color-danger': '#ef4444',
      '--color-border-standard': 'rgba(99, 102, 241, 0.28)',
      '--color-border-standard-hover': 'rgba(99, 102, 241, 0.45)',
      '--color-border-urgent': 'rgba(251, 191, 36, 0.5)',
      '--color-border-urgent-hover': 'rgba(251, 191, 36, 0.7)',
      '--color-border-critical': 'rgba(248, 113, 113, 0.55)',
      '--color-border-critical-hover': 'rgba(248, 113, 113, 0.75)',
      '--shadow-row': '0 6px 18px rgba(15, 23, 42, 0.08)',
      '--shadow-row-hover': '0 12px 26px rgba(15, 23, 42, 0.12)',
      '--status-review-color': '#f59e0b',
      '--status-processing-color': '#3b82f6',
      '--status-committed-color': '#10b981',
      '--urgency-standard-bg': 'rgba(99, 102, 241, 0.18)',
      '--urgency-standard-color': '#4338ca',
      '--urgency-urgent-bg': 'rgba(251, 191, 36, 0.20)',
      '--urgency-urgent-color': '#b45309',
      '--urgency-critical-bg': 'rgba(248, 113, 113, 0.25)',
      '--urgency-critical-color': '#b91c1c',
      '--confidence-high-bg': 'linear-gradient(135deg, #34d399, #059669)',
      '--confidence-medium-bg': 'linear-gradient(135deg, #fbbf24, #d97706)',
      '--confidence-low-bg': 'linear-gradient(135deg, #f87171, #b91c1c)',
      '--color-chevron': '#9ca3af',
      '--color-chevron-hover': '#6366f1',
      '--fab-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      '--fab-shadow': '0 8px 20px rgba(0,0,0,0.3)',
      '--fab-shadow-hover': '0 12px 30px rgba(0,0,0,0.4)'
    }
  },
  pacific: {
    name: 'Pacific',
    description: 'Deep ocean blues with aqua highlights.',
    variables: {
      '--color-app-background': '#0f172a',
      '--color-surface': '#162647',
      '--color-surface-muted': '#1e2f57',
      '--color-text-primary': '#e2e8f0',
      '--color-text-muted': '#94a3b8',
      '--color-text-soft': '#cbd5f5',
      '--color-text-inverse': '#ffffff',
      '--color-primary': '#38bdf8',
      '--color-primary-dark': '#1d4ed8',
      '--color-info': '#0ea5e9',
      '--color-success': '#22d3ee',
      '--color-warning': '#fbbf24',
      '--color-danger': '#f472b6',
      '--color-border-standard': 'rgba(14, 165, 233, 0.35)',
      '--color-border-standard-hover': 'rgba(14, 165, 233, 0.55)',
      '--color-border-urgent': 'rgba(244, 114, 182, 0.5)',
      '--color-border-urgent-hover': 'rgba(244, 114, 182, 0.7)',
      '--color-border-critical': 'rgba(248, 113, 113, 0.55)',
      '--color-border-critical-hover': 'rgba(248, 113, 113, 0.75)',
      '--shadow-row': '0 14px 36px rgba(2, 6, 23, 0.45)',
      '--shadow-row-hover': '0 18px 42px rgba(2, 6, 23, 0.55)',
      '--status-review-color': '#38bdf8',
      '--status-processing-color': '#60a5fa',
      '--status-committed-color': '#4ade80',
      '--urgency-standard-bg': 'rgba(37, 99, 235, 0.25)',
      '--urgency-standard-color': '#60a5fa',
      '--urgency-urgent-bg': 'rgba(244, 114, 182, 0.3)',
      '--urgency-urgent-color': '#f472b6',
      '--urgency-critical-bg': 'rgba(248, 113, 113, 0.35)',
      '--urgency-critical-color': '#fb7185',
      '--confidence-high-bg': 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
      '--confidence-medium-bg': 'linear-gradient(135deg, #38bdf8, #2563eb)',
      '--confidence-low-bg': 'linear-gradient(135deg, #f472b6, #db2777)',
      '--color-chevron': '#a5b4fc',
      '--color-chevron-hover': '#c084fc',
      '--fab-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
      '--fab-shadow': '0 18px 40px rgba(15, 23, 42, 0.5)',
      '--fab-shadow-hover': '0 22px 48px rgba(15, 23, 42, 0.6)'
    }
  },
  sunset: {
    name: 'Sunset',
    description: 'Warm oranges and magentas inspired by late evening light.',
    variables: {
      '--color-app-background': 'linear-gradient(135deg, #ff7a18 0%, #af002d 100%)',
      '--color-surface': '#2c1a27',
      '--color-surface-muted': '#3a2233',
      '--color-text-primary': '#fde68a',
      '--color-text-muted': '#fbbf24',
      '--color-text-soft': '#fcd34d',
      '--color-text-inverse': '#1f0a13',
      '--color-primary': '#f97316',
      '--color-primary-dark': '#c2410c',
      '--color-info': '#fb7185',
      '--color-success': '#f59e0b',
      '--color-warning': '#facc15',
      '--color-danger': '#ef4444',
      '--color-border-standard': 'rgba(251, 146, 60, 0.45)',
      '--color-border-standard-hover': 'rgba(251, 146, 60, 0.65)',
      '--color-border-urgent': 'rgba(249, 115, 22, 0.5)',
      '--color-border-urgent-hover': 'rgba(249, 115, 22, 0.7)',
      '--color-border-critical': 'rgba(239, 68, 68, 0.6)',
      '--color-border-critical-hover': 'rgba(239, 68, 68, 0.8)',
      '--shadow-row': '0 12px 34px rgba(127, 29, 29, 0.35)',
      '--shadow-row-hover': '0 16px 40px rgba(127, 29, 29, 0.45)',
      '--status-review-color': '#fb923c',
      '--status-processing-color': '#f472b6',
      '--status-committed-color': '#facc15',
      '--urgency-standard-bg': 'rgba(249, 115, 22, 0.25)',
      '--urgency-standard-color': '#fb923c',
      '--urgency-urgent-bg': 'rgba(244, 114, 182, 0.3)',
      '--urgency-urgent-color': '#f472b6',
      '--urgency-critical-bg': 'rgba(239, 68, 68, 0.35)',
      '--urgency-critical-color': '#ef4444',
      '--confidence-high-bg': 'linear-gradient(135deg, #facc15, #f97316)',
      '--confidence-medium-bg': 'linear-gradient(135deg, #fb923c, #ea580c)',
      '--confidence-low-bg': 'linear-gradient(135deg, #ef4444, #b91c1c)',
      '--color-chevron': '#fcd34d',
      '--color-chevron-hover': '#f97316',
      '--fab-gradient': 'linear-gradient(135deg, #f97316 0%, #db2777 100%)',
      '--fab-shadow': '0 18px 40px rgba(127, 29, 29, 0.45)',
      '--fab-shadow-hover': '0 22px 52px rgba(127, 29, 29, 0.55)'
    }
  }
};

export const themeOptions = Object.entries(themes).map(([id, theme]) => ({
  id: id as ThemeName,
  name: theme.name,
  description: theme.description,
}));

export function applyThemeVariables(variables: ThemeVariables) {
  Object.entries(variables).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
