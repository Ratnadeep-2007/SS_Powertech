/**
 * Vanilla JS version of BorderGlow component
 */

(function() {
  function parseHSL(hslStr) {
    const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
    if (!match) return { h: 40, s: 80, l: 80 };
    return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
  }

  function buildGlowVars(glowColor, intensity) {
    const { h, s, l } = parseHSL(glowColor);
    const base = `${h}deg ${s}% ${l}%`;
    const opacities = [100, 60, 50, 40, 30, 20, 10];
    const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
    const vars = {};
    for (let i = 0; i < opacities.length; i++) {
      vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
    }
    return vars;
  }

  const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
  const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
  const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

  function buildGradientVars(colors) {
    const vars = {};
    for (let i = 0; i < 7; i++) {
      const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
      vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
    }
    vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
    return vars;
  }

  function getCenterOfElement(el) {
    const rect = el.getBoundingClientRect();
    return [rect.width / 2, rect.height / 2];
  }

  function getEdgeProximity(el, x, y) {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }

  function getCursorAngle(el, x, y) {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }

  function initBorderGlow(card) {
    const config = {
      edgeSensitivity: card.dataset.edgeSensitivity || 30,
      glowColor: card.dataset.glowColor || '40 80 80',
      backgroundColor: card.dataset.backgroundColor || '#120F17',
      borderRadius: card.dataset.borderRadius || 28,
      glowRadius: card.dataset.glowRadius || 40,
      glowIntensity: card.dataset.glowIntensity || 1.0,
      coneSpread: card.dataset.coneSpread || 25,
      colors: card.dataset.colors ? card.dataset.colors.split(',') : ['#c084fc', '#f472b6', '#38bdf8'],
      fillOpacity: card.dataset.fillOpacity || 0.5
    };

    // Set static variables
    card.style.setProperty('--card-bg', config.backgroundColor);
    card.style.setProperty('--edge-sensitivity', config.edgeSensitivity);
    card.style.setProperty('--border-radius', `${config.borderRadius}px`);
    card.style.setProperty('--glow-padding', `${config.glowRadius}px`);
    card.style.setProperty('--cone-spread', config.coneSpread);
    card.style.setProperty('--fill-opacity', config.fillOpacity);

    const glowVars = buildGlowVars(config.glowColor, config.glowIntensity);
    for (const [key, value] of Object.entries(glowVars)) {
      card.style.setProperty(key, value);
    }

    const gradientVars = buildGradientVars(config.colors);
    for (const [key, value] of Object.entries(gradientVars)) {
      card.style.setProperty(key, value);
    }

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);

      card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3));
      card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.border-glow-card');
    cards.forEach(initBorderGlow);
  });

  // Re-export for dynamic use
  window.initBorderGlow = initBorderGlow;
})();
