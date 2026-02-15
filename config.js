// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Devu",

    // The heading shown at the top of the page (e.g. "Devu, my love...")
    pageHeading: "Devu...",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Zhi En's Work 🤓",

    // Floating pictures that appear in the background (you and your partner)
    // Use local paths (e.g. "images/me.jpg") or free image URLs (Imgur, Cloudinary, imgbb).
    // Add your photos to the "images" folder and reference them here.
    floatingPictures: [
        "images/me.jpg",           // Your photo
        "images/girlfriend.jpg"    // Your girlfriend's photo
    ],
    // Fallback emojis for celebration explosion (when no pictures)
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        bears: ['🧸', '🐻']
    },

    // Emojis that float up (3x speed) when user clicks Yes vs No on the first question
    firstQuestionYesEmoji: "😶",
    firstQuestionNoEmoji: "😢",

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Do you like me?",                                    // First interaction
            yesBtn: "Yes",                                             // Text for "Yes" button
            noBtn: "No",                                               // Text for "No" button
            secretAnswer: "I don't like you, I love you! ❤️"           // Secret hover message
        },
        second: {
            text: "How much do you love me?",                          // For the love meter
            startText: "This much!",                                   // Text before the percentage
            nextBtn: "Next ❤️",                                        // Text for the next button
            nextAtNormalText: "Try again.",   // Shown when they click Next at normal level
            nextAtHighText: "Warmer..."         // Shown when they click Next at high level
        },
        third: {
            text: "Will you be my Valentine on 14th February 2026? 🌹", // The big question (before reveal)
            dropText: "and 15th ",                                       // Text that drops in after clicking Yes
            yesBtn: "Yes!",                                             // Text for "Yes" button
            noBtn: "No"                                                 // Text for "No" button
        }
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",  // Shows when they go past 5000%
        high: "Quite a bit",              // Shows when they go past 1000%
        normal: "Some"                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "You're my sun, my moon, my everything ❤️",
        message: "Now come get your gift, a big warm hug and a huge kiss!",
        emojis: "🎁💖🤗💝💋❤️💕"  // These will bounce around
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#ffafbd",      // Gradient start (try pastel colors for a soft look)
        backgroundEnd: "#ffc3a0",        // Gradient end (should complement backgroundStart)
        buttonBackground: "#ff6b6b",     // Button color (should stand out against the background)
        buttonHover: "#ff8787",          // Button hover color (slightly lighter than buttonBackground)
        textColor: "#ff4757"             // Text color (make sure it's readable!)
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    animations: {
        floatDuration: "15s",           // How long it takes hearts to float up (10-20s recommended)
        floatDistance: "50px",          // How far hearts move sideways (30-70px recommended)
        bounceSpeed: "0.5s",            // Speed of bouncing animations (0.3-0.7s recommended)
        heartExplosionSize: 1.5,        // Size of heart explosion effect (1.2-2.0 recommended)
        floaterBurstDuration: 1000,     // How long (ms) floating objects are created after a trigger action (e.g. clicking Yes/No)
        floaterBurstMax: 50,           // Max number of floating objects created per trigger action
        q3RevealPauseMs: 3250          // How long (ms) the amended Q3 + cat screen shows before celebration
    },

    // Background Music (Optional)
    // Add your own music URL after getting proper licenses
    music: {
        enabled: true,                     // Music feature is enabled
        autoplay: true,                    // Try to autoplay (note: some browsers may block this)
        musicUrl: "audio/Hey_There_Delilah.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.5,                       // Volume level (0.0 to 1.0)
        wrongOptionPauseMs: 0            // How long (ms) music pauses when a wrong option is clicked
    },

    // Sound effects and images for special moments
    // Place your audio files in an "audio" folder and your images in "images"
    soundEffects: {
        quackUrl: "audio/quack.mp3",               // Plays when a wrong option is clicked
        hahaUrl: "audio/haha.mp3",                 // Plays when Q3 "and 15th" is revealed
        celebrationUrl: "audio/i_love_you.m4a",   // Plays when the final celebration screen appears
        laughingCatImage: "images/laughing-cat.png" // Laughing cat shown during Q3 reveal
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG; 
