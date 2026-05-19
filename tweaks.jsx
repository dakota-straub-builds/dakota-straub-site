// tweaks.jsx — Dakota Straub portfolio tweaks (graph-paper v2)
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#6d28d9", "#b91c1c", "#4a7c59"],
  "gridMajor": 0.085,
  "gridMinor": 0.045,
  "gridSize": 100,
  "paperTone": "warm",
  "headline": "Taking your brand from nothing to something.",
  "showSerif": true
}/*EDITMODE-END*/;

const paperTones = {
  warm:    { paper: "#f4ede0", paper2: "#ede4d2" },
  cool:    { paper: "#ecedea", paper2: "#e0e2dd" },
  bone:    { paper: "#f5f1e8", paper2: "#ebe6d7" },
  graph:   { paper: "#fafaf5", paper2: "#f0eee5" }
};

function applyTweaks(t) {
  const root = document.documentElement;

  // accent palette
  if (Array.isArray(t.accent) && t.accent.length >= 2) {
    root.style.setProperty('--purple', t.accent[0]);
    root.style.setProperty('--purple-soft', t.accent[0] + '14');
    root.style.setProperty('--purple-tint', t.accent[0] + '24');
    root.style.setProperty('--red', t.accent[1]);
    root.style.setProperty('--red-soft', t.accent[1] + '14');
    root.style.setProperty('--red-tint', t.accent[1] + '24');
    if (t.accent[2]) {
      root.style.setProperty('--sage', t.accent[2]);
      root.style.setProperty('--sage-soft', t.accent[2] + '18');
      root.style.setProperty('--sage-tint', t.accent[2] + '28');
    }
  }

  // grid intensity + size
  root.style.setProperty('--grid-major', `rgba(15, 15, 16, ${t.gridMajor})`);
  root.style.setProperty('--grid-minor', `rgba(15, 15, 16, ${t.gridMinor})`);
  const paper = document.querySelector('.paper');
  if (paper) {
    const major = t.gridSize;
    const minor = major / 5;
    paper.style.backgroundSize = `${major}px ${major}px, ${major}px ${major}px, ${minor}px ${minor}px, ${minor}px ${minor}px`;
  }

  // paper tone
  const tone = paperTones[t.paperTone] || paperTones.warm;
  root.style.setProperty('--paper', tone.paper);
  root.style.setProperty('--paper-2', tone.paper2);

  // headline rewrite
  const headlineEl = document.querySelector('.headline .headline-text');
  if (headlineEl && t.headline) {
    const parts = t.headline.split(/\s+/);
    if (parts.length >= 3) {
      const last = parts.pop().replace(/[.,!?]+$/, '');
      const punct = (t.headline.match(/[.,!?]+$/) || [''])[0];
      // emphasize "brand" or "nothing" if present, strike-through "nothing" if showSerif
      const lcParts = parts.map(p => p.toLowerCase());
      const html = parts.map((p, i) => {
        const lc = p.toLowerCase().replace(/[.,!?]+$/, '');
        if (lc === 'brand' || lc === 'idea' || lc === 'story') {
          return t.showSerif ? `<span class="serif-em">${p}</span>` : p;
        }
        if (lc === 'nothing') return `<span class="strike-out">${p}</span>`;
        return p;
      }).join(' ');
      const lastHtml = t.showSerif
        ? `<em class="grad">${last}${punct}</em>`
        : `<span style="color:var(--red)">${last}${punct}</span>`;
      headlineEl.innerHTML = html.replace(/(<br>|\n)/g, ' ') + ' ' + lastHtml;
    } else {
      headlineEl.textContent = t.headline;
    }
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent palette" />
      <TweakColor
        label="Brand colors"
        value={t.accent}
        options={[
          ["#6d28d9", "#b91c1c", "#4a7c59"],
          ["#7c3aed", "#dc2626", "#65a30d"],
          ["#5b21b6", "#991b1b", "#365314"],
          ["#9333ea", "#e11d48", "#0891b2"],
          ["#4338ca", "#c2410c", "#15803d"]
        ]}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakSection label="Graph paper" />
      <TweakSelect
        label="Paper tone"
        value={t.paperTone}
        options={['warm', 'cool', 'bone', 'graph']}
        onChange={(v) => setTweak('paperTone', v)}
      />
      <TweakSlider
        label="Major grid"
        value={t.gridMajor}
        min={0} max={0.2} step={0.005}
        onChange={(v) => setTweak('gridMajor', v)}
      />
      <TweakSlider
        label="Minor grid"
        value={t.gridMinor}
        min={0} max={0.12} step={0.005}
        onChange={(v) => setTweak('gridMinor', v)}
      />
      <TweakSlider
        label="Grid size (px)"
        value={t.gridSize}
        min={40} max={160} step={10}
        unit="px"
        onChange={(v) => setTweak('gridSize', v)}
      />

      <TweakSection label="Copy" />
      <TweakText
        label="Hero headline"
        value={t.headline}
        onChange={(v) => setTweak('headline', v)}
      />
      <TweakToggle
        label="Serif italics"
        value={t.showSerif}
        onChange={(v) => setTweak('showSerif', v)}
      />
    </TweaksPanel>
  );
}

const mount = document.createElement('div');
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(<App />);
applyTweaks(TWEAK_DEFAULTS);
