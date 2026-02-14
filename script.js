// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Check required fields
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

// Set page title
document.title = config.pageTitle;

// Kiss counter: persist in sessionStorage (resets when tab/window is closed)
const KISS_COUNTER_KEY = 'valentineKissCount';

function getKissCount() {
    const raw = sessionStorage.getItem(KISS_COUNTER_KEY);
    return raw === null ? null : parseInt(raw, 10);
}

function setKissCount(value) {
    sessionStorage.setItem(KISS_COUNTER_KEY, String(value));
    updateKissCounterDisplay(value);
}

function updateKissCounterDisplay(value) {
    const el = document.getElementById('kissCounterDisplay');
    const valEl = document.getElementById('kissCounterValue');
    if (!el || !valEl) return;
    valEl.textContent = value;
    el.classList.remove('hidden');
}

function handleFirstQuestionClick(button) {
    const current = getKissCount();
    const next = current === null ? 1 : current * 2;
    setKissCount(next);
    const emoji = button.id === 'yesBtn1'
        ? (config.firstQuestionYesEmoji || '❤️')
        : (config.firstQuestionNoEmoji || '😢');
    burstFirstQuestionEmojis(emoji);
    moveButton(button);
}

function burstFirstQuestionEmojis(emoji) {
    const container = document.querySelector('.floating-elements');
    const endAt = Date.now() + USER_FLOATER_BURST_MS;
    let created = 0;
    const tick = () => {
        if (Date.now() >= endAt || created >= USER_FLOATER_MAX_TOTAL) return;
        const toCreate = Math.min(USER_FLOATER_BATCH_SIZE, USER_FLOATER_MAX_TOTAL - created);
        for (let i = 0; i < toCreate; i++) {
            const div = document.createElement('div');
            div.className = 'floating-first-q-emoji';
            div.textContent = emoji;
            setRandomPositionNoDelay(div);
            container.appendChild(div);
            created++;
        }
        if (created < USER_FLOATER_MAX_TOTAL) setTimeout(tick, USER_FLOATER_INTERVAL_MS);
    };
    tick();
}

// Third question "No": double kiss count and spawn floating "Wrong answer!" text
function handleThirdQuestionNoClick(button) {
    const current = getKissCount();
    const next = current === null ? 1 : current * 2;
    setKissCount(next);
    createFloatingWrongAnswers();
    moveButton(button);
}

function createFloatingWrongAnswers() {
    const container = document.querySelector('.floating-elements');
    const endAt = Date.now() + USER_FLOATER_BURST_MS;
    let created = 0;
    const tick = () => {
        if (Date.now() >= endAt || created >= USER_FLOATER_MAX_TOTAL) return;
        const toCreate = Math.min(USER_FLOATER_BATCH_SIZE, USER_FLOATER_MAX_TOTAL - created);
        for (let i = 0; i < toCreate; i++) {
            const div = document.createElement('div');
            div.className = 'floating-wrong-answer';
            div.textContent = 'Wrong answer!';
            setRandomPositionNoDelay(div);
            container.appendChild(div);
            created++;
        }
        if (created < USER_FLOATER_MAX_TOTAL) setTimeout(tick, USER_FLOATER_INTERVAL_MS);
    };
    tick();
}

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Validate configuration first
    validateConfig();

    // Restore kiss counter display if it was set previously
    const savedCount = getKissCount();
    if (savedCount !== null) {
        updateKissCounterDisplay(savedCount);
    }

    // Set texts from config
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, my love...`;
    
    // Set first question texts
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    // Set second question texts
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;
    
    // Set third question texts
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();
});

// Create floating pictures (you and your partner)
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    const pictures = config.floatingPictures || [];

    pictures.forEach(src => {
        // Add a few copies of each picture for a fuller background
        for (let i = 0; i < 4; i++) {
            const img = document.createElement('img');
            img.className = 'floating-picture';
            img.src = src;
            img.alt = '';
            img.loading = 'lazy';
            img.onerror = function () {
                this.style.display = 'none';
            };
            setRandomPosition(img);
            container.appendChild(img);
        }
    });
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Position and delay only (keeps CSS animation duration, e.g. for 3x-fast elements)
function setRandomPositionAndDelayOnly(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
}

// User-behavior floaters: random horizontal position, no delay (start from bottom immediately)
function setRandomPositionNoDelay(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = '0s';
}

const USER_FLOATER_BURST_MS = 3000;       // Spawn for 3 seconds only, then stop until trigger again
const USER_FLOATER_MAX_TOTAL = 100;        // Only 100 user-generated floaters per trigger
const USER_FLOATER_INTERVAL_MS = 30;       // Check every 30ms
const USER_FLOATER_BATCH_SIZE = 10;       // Create up to 10 per tick until we hit 100

// Function to show next question
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');
}

// Go to second question: remove first-question floating emojis, then show Q2
function goToSecondQuestion() {
    document.querySelectorAll('.floating-first-q-emoji').forEach(el => el.remove());
    showNextQuestion(2);
}

// When Next is clicked at normal/high, we show special text until user touches slider
let showingNextMessageLevel = null; // null | 'normal' | 'high'

// Second question Next: only proceed to Q3 if slider at extreme (>= 5000); else double kiss count
function handleSecondQuestionNext() {
    const value = parseInt(loveMeter.value, 10);
    if (value >= 5000) {
        showingNextMessageLevel = null;
        showNextQuestion(3);
    } else {
        const current = getKissCount();
        const next = current === null ? 1 : current * 2;
        setKissCount(next);
        extraLove.classList.remove('hidden');
        if (value >= 1000) {
            showingNextMessageLevel = 'high';
            extraLove.textContent = config.questions.second.nextAtHighText || "Almost there! Go to extreme! 🚀";
            extraLove.classList.remove('super-love');
        } else {
            // Normal (including when slider is still at 100% right after Q2 is shown)
            showingNextMessageLevel = 'normal';
            extraLove.textContent = config.questions.second.nextAtNormalText || "That's not enough! Slide higher! 💕";
            extraLove.classList.remove('super-love');
        }
        // Stay on Q2
    }
}

// Function to move the "No" button when clicked
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter functionality
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';
}

function updateLoveMessageFromValue(value) {
    if (value >= 5000) {
        extraLove.classList.add('super-love');
        extraLove.textContent = config.loveMessages.extreme;
    } else if (value > 1000) {
        extraLove.classList.remove('super-love');
        extraLove.textContent = config.loveMessages.high;
    } else if (value > 100) {
        extraLove.classList.remove('super-love');
        extraLove.textContent = config.loveMessages.normal;
    }
}

function onSliderInteraction() {
    const value = parseInt(loveMeter.value, 10);
    if (showingNextMessageLevel !== null) {
        showingNextMessageLevel = null;
        if (value > 100) {
            extraLove.classList.remove('hidden');
            updateLoveMessageFromValue(value);
        }
    }
}

loveMeter.addEventListener('input', () => {
    const value = parseInt(loveMeter.value, 10);
    loveValue.textContent = value;
    onSliderInteraction();

    if (value > 100) {
        extraLove.classList.remove('hidden');
        const overflowPercentage = (value - 100) / 9900;
        const extraWidth = overflowPercentage * window.innerWidth * 0.8;
        loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
        loveMeter.style.transition = 'width 0.3s';
        updateLoveMessageFromValue(value);
    } else {
        extraLove.classList.add('hidden');
        extraLove.classList.remove('super-love');
        loveMeter.style.width = '100%';
    }
});

loveMeter.addEventListener('touchstart', onSliderInteraction);
loveMeter.addEventListener('mousedown', onSliderInteraction);

// Initialize love meter
window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);

// Celebration function
function celebrate() {
    document.querySelectorAll('.floating-wrong-answer').forEach(el => el.remove());
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');

    const kissCount = getKissCount();
    const messageCount = kissCount !== null ? kissCount : 1;

    // Set celebration messages (custom message with kiss counter)
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent =
        `You now owe me ${messageCount} kisses on our next date.`;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    // Create heart explosion effect
    createHeartExplosion();
}

// Create heart explosion animation
function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

// Music Player Setup
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    // Only show controls if music is enabled in config
    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    // Set music source and volume
    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    function tryPlayMusic() {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicToggle.textContent = config.music.stopText;
            }).catch(() => {
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Try autoplay on load (many browsers allow it after user has interacted with the site)
    if (config.music.autoplay) {
        tryPlayMusic();
    }

    // Start music on first user interaction (click/touch) so it actually plays
    function startMusicOnFirstInteraction() {
        tryPlayMusic();
        document.body.removeEventListener('click', startMusicOnFirstInteraction);
        document.body.removeEventListener('touchstart', startMusicOnFirstInteraction);
    }
    document.body.addEventListener('click', startMusicOnFirstInteraction, { once: true });
    document.body.addEventListener('touchstart', startMusicOnFirstInteraction, { once: true });

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
} 