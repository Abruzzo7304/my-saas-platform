import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { themes, ThemeName } from '../theme/themes';

const COLOR_OVERRIDE_KEYS: Array<{ token: string; label: string; helper?: string }> = [
  { token: '--color-primary', label: 'Primary Accent', helper: 'Buttons and highlights' },
  { token: '--color-app-background', label: 'Application Background', helper: 'Page background colour' },
  { token: '--color-surface', label: 'Surface', helper: 'Cards and panels' },
];

const ThemeConfigurator: React.FC = () => {
  const { availableThemes, themeName, overrides, setTheme, updateOverride, resetOverrides } = useTheme();

  const activeTheme = useMemo(() => themes[themeName], [themeName]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as ThemeName);
  };

  const handleColorChange = (token: string, value: string) => {
    updateOverride(token, value);
  };

  const renderColorInput = (token: string, label: string, helper?: string) => {
    const currentValue = overrides[token] ?? activeTheme.variables[token] ?? '#ffffff';
    const isGradient = currentValue.includes('gradient');

    if (isGradient) {
      return (
        <div key={token} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontWeight: 600 }}>{label}</label>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            This value uses a gradient. Override with a solid colour using the custom input below.
          </span>
          <input
            type="text"
            value={currentValue}
            onChange={(event) => handleColorChange(token, event.target.value)}
            style={inputStyle}
            placeholder="Enter CSS colour e.g. #123456 or rgba(...)"
          />
          {helper && <span style={helperStyle}>{helper}</span>}
        </div>
      );
    }

    return (
      <div key={token} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label style={{ fontWeight: 600 }}>{label}</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="color"
            value={currentValue.startsWith('#') ? currentValue : '#ffffff'}
            onChange={(event) => handleColorChange(token, event.target.value)}
            style={{ width: '48px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          />
          <input
            type="text"
            value={currentValue}
            onChange={(event) => handleColorChange(token, event.target.value)}
            style={inputStyle}
          />
        </div>
        {helper && <span style={helperStyle}>{helper}</span>}
      </div>
    );
  };

  return (
    <section style={containerStyle}>
      <header style={headerStyle}>
        <div>
          <h2 style={{ margin: 0 }}>Theme settings</h2>
          <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
            Choose a base theme and override key colours to match client branding.
          </p>
        </div>
        <button type="button" onClick={resetOverrides} style={resetButtonStyle}>
          Reset overrides
        </button>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="theme-select" style={{ fontWeight: 600 }}>Base theme</label>
          <select
            id="theme-select"
            value={themeName}
            onChange={handleThemeChange}
            style={selectStyle}
          >
            {availableThemes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <span style={helperStyle}>{activeTheme.description}</span>
        </div>

        <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {COLOR_OVERRIDE_KEYS.map(({ token, label, helper }) => renderColorInput(token, label, helper))}
        </div>
      </div>
    </section>
  );
};

const containerStyle: React.CSSProperties = {
  border: '1px solid var(--color-border-standard)',
  borderRadius: '12px',
  padding: '1.75rem',
  background: 'var(--color-surface)',
  boxShadow: 'var(--shadow-row)',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  marginBottom: '1.5rem',
};

const selectStyle: React.CSSProperties = {
  padding: '0.6rem 0.8rem',
  borderRadius: '8px',
  border: '1px solid var(--color-border-standard)',
  fontSize: '1rem',
  background: 'var(--color-surface-muted)',
  color: 'var(--color-text-primary)',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: '0.55rem 0.75rem',
  borderRadius: '8px',
  border: '1px solid var(--color-border-standard)',
  background: 'var(--color-surface)',
  color: 'var(--color-text-primary)',
  fontSize: '0.95rem',
};

const resetButtonStyle: React.CSSProperties = {
  border: '1px solid var(--color-border-standard)',
  background: 'var(--color-surface-muted)',
  color: 'var(--color-text-primary)',
  padding: '0.45rem 0.9rem',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 600,
};

const helperStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  color: 'var(--color-text-muted)',
};

export default ThemeConfigurator;
