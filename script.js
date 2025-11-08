let count = 0;
let targetCount = 500; // Default to medium
let isRunning = false;
let timeoutId = null;
let startTime = null;
let elapsedInterval = null;

const counter = document.getElementById('counter');
const progressBar = document.getElementById('progressBar');
const message = document.getElementById('message');
const elapsedTime = document.getElementById('elapsedTime');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const customInput = document.getElementById('customCount');
const customBtn = document.getElementById('customBtn');
const presetBtns = document.querySelectorAll('.preset-btn[data-target]');
const animationBtns = document.querySelectorAll('.animation-btn[data-animation]');
const themeToggle = document.getElementById('themeToggle');

// Initialize animation manager after DOM is loaded
let animationManager;

function initializeAnimation() {
    try {
        animationManager = new AnimationManager('animationCanvas');
        animationManager.registerAnimation('grass', GrassAnimation);
        animationManager.registerAnimation('hourglass-v2', HourglassV2Animation);
        animationManager.registerAnimation('candle', CandleAnimation);

        // Set default animation based on active button
        const activeAnimBtn = document.querySelector('.animation-btn.active');
        const defaultAnimation = activeAnimBtn ? activeAnimBtn.dataset.animation : 'hourglass-v2';
        animationManager.setAnimation(defaultAnimation);

        // Start with 0 progress
        animationManager.update(0, 1);
        animationManager.startAnimationLoop();
    } catch (error) {
        console.error('Failed to initialize animation:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnimation);
} else {
    initializeAnimation();
}

// Preset button handlers
presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isRunning) return;

        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        targetCount = parseInt(btn.dataset.target);
        customInput.value = '';
        updateMessage(`${btn.dataset.difficulty} mode selected`);
    });
});

// Custom count handler
customBtn.addEventListener('click', () => {
    if (isRunning) return;

    const value = parseInt(customInput.value);
    if (value && value > 0 && value <= 99999) {
        targetCount = value;
        presetBtns.forEach(b => b.classList.remove('active'));
        updateMessage(`Custom count set to ${value}`);
    } else {
        updateMessage('Enter a valid number (1-99999)');
    }
});

// Animation selector handlers
animationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isRunning) return;

        animationBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const animationType = btn.dataset.animation;
        if (animationManager) {
            animationManager.setAnimation(animationType);
            animationManager.update(count, targetCount);
        }

        updateMessage(`${animationType.toUpperCase()} animation selected`);
    });
});

// Start button handler
startBtn.addEventListener('click', () => {
    if (isRunning) return;

    isRunning = true;
    startBtn.disabled = true;
    startTime = Date.now();

    // Calculate expected duration based on count and average delay
    const avgDelay = 150; // Average of 100-300ms random delay
    const expectedDuration = (targetCount * avgDelay) / 1000; // in seconds

    // Update elapsed time every 100ms
    elapsedInterval = setInterval(updateElapsedTime, 100);

    // Start CSS animations with calculated duration
    if (animationManager && animationManager.currentAnimation && animationManager.currentAnimation.startAnimation) {
        animationManager.currentAnimation.setDuration(expectedDuration);
        animationManager.currentAnimation.startAnimation();
    }

    updateMessage('Building patience<span class="dot">.</span><span class="dot" style="animation-delay: 0.3s;">.</span><span class="dot" style="animation-delay: 0.6s;">.</span>');
    incrementCounter();
});

// Reset button handler
resetBtn.addEventListener('click', () => {
    resetCounter();
});

function incrementCounter() {
    if (!isRunning) return;

    if (count < targetCount) {
        count++;
        counter.textContent = count;
        progressBar.style.width = (count / targetCount * 100) + '%';

        // Update animation progress
        if (animationManager) {
            animationManager.update(count, targetCount);
        }

        const delay = Math.random() * 200 + 100;
        timeoutId = setTimeout(incrementCounter, delay);
    } else {
        // Finished!
        updateMessage('Complete! Resetting in 3 seconds...');
        setTimeout(() => {
            resetCounter();
            updateMessage('Ready to build your patience?');
        }, 3000);
    }
}

function resetCounter() {
    isRunning = false;
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    if (elapsedInterval) {
        clearInterval(elapsedInterval);
        elapsedInterval = null;
    }
    count = 0;
    startTime = null;
    counter.textContent = count;
    elapsedTime.textContent = '00:00';
    progressBar.style.width = '0%';
    startBtn.disabled = false;

    // Stop CSS animations if using CSS hourglass
    if (animationManager && animationManager.currentAnimation && animationManager.currentAnimation.stopAnimation) {
        animationManager.currentAnimation.stopAnimation();
    }

    // Reset animation
    if (animationManager) {
        animationManager.reset();
    }

    updateMessage('Reset complete. Ready when you are.');
}

function updateElapsedTime() {
    if (!startTime) return;

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    elapsedTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateMessage(text) {
    message.innerHTML = text;
}

// Theme toggle functionality
function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️ LIGHT';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '☀️ LIGHT';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '🌙 DARK';
        localStorage.setItem('theme', 'light');
    }
});

// Initialize theme on page load
initializeTheme();
