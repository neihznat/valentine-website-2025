// Update CSS variables from configuration
function applyTheme() {
    const config = window.VALENTINE_CONFIG;
    const root = document.documentElement;

    // Apply colors
    root.style.setProperty('--background-color-1', config.colors.backgroundStart);
    root.style.setProperty('--background-color-2', config.colors.backgroundEnd);
    root.style.setProperty('--button-color', config.colors.buttonBackground);
    root.style.setProperty('--button-hover', config.colors.buttonHover);
    root.style.setProperty('--text-color', config.colors.textColor);

    // Apply animation settings (3x faster = duration / 3 for "Wrong answer!" and Q1 emojis)
    const floatDuration = config.animations.floatDuration || '15s';
    root.style.setProperty('--float-duration', floatDuration);
    const match = floatDuration.match(/^([\d.]+)(s|ms)$/);
    const fastDuration = match ? (parseFloat(match[1]) / 3) + (match[2] || 's') : '5s';
    root.style.setProperty('--float-duration-fast', fastDuration);
    root.style.setProperty('--float-distance', config.animations.floatDistance);
    root.style.setProperty('--bounce-speed', config.animations.bounceSpeed);
    root.style.setProperty('--heart-explosion-size', config.animations.heartExplosionSize);
}

// Apply theme when the page loads
window.addEventListener('DOMContentLoaded', applyTheme); 