/**
 * Candle Melting Animation
 * A relaxing candle that melts down as time progresses
 */
class CandleAnimation extends BaseAnimation {
    constructor(canvas) {
        super(canvas);
        this.container = null;
        this.initialized = false;
    }

    init() {
        super.init();

        // Remove any existing candle containers
        const existing = document.getElementById('candle-container');
        if (existing) existing.remove();

        // Create new container
        this.container = document.createElement('div');
        this.container.id = 'candle-container';
        this.container.className = 'candle-wrapper';

        const animationContainer = document.querySelector('.animation-container');
        if (animationContainer) {
            animationContainer.appendChild(this.container);
        }

        // Build structure
        this.container.innerHTML = `
            <div class="candle-structure">
                <!-- Flame -->
                <div class="flame-container">
                    <div class="flame">
                        <div class="flame-inner"></div>
                    </div>
                </div>

                <!-- Candle body -->
                <div class="candle-body">
                    <div class="candle-top">
                        <div class="wick"></div>
                    </div>
                    <div class="candle-shine"></div>
                    <div class="candle-texture"></div>
                </div>

                <!-- Wax drips -->
                <div class="wax-drips">
                    <div class="drip drip-1"></div>
                    <div class="drip drip-2"></div>
                    <div class="drip drip-3"></div>
                </div>

                <!-- Melted wax pool -->
                <div class="wax-pool"></div>

                <!-- Candle holder -->
                <div class="candle-holder">
                    <div class="holder-top"></div>
                    <div class="holder-base"></div>
                </div>
            </div>
        `;

        this.injectStyles();
        this.initialized = true;
    }

    injectStyles() {
        if (document.getElementById('candle-styles')) return;

        const style = document.createElement('style');
        style.id = 'candle-styles';
        style.textContent = `
            .candle-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .candle-structure {
                position: relative;
                width: 80px;
                height: 280px;
            }

            /* Flame */
            .flame-container {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 215px;
                z-index: 10;
                transition: bottom 0.15s linear;
            }

            .wick {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: -12px;
                width: 2px;
                height: 16px;
                background: linear-gradient(to bottom,
                    #2c2c2c 0%,
                    #1a1a1a 75%,
                    rgba(26, 26, 26, 0.5) 100%
                );
                border-radius: 1px 1px 0 0;
                z-index: 10;
            }

            .flame {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: -30px;
                width: 20px;
                height: 35px;
                background: radial-gradient(ellipse at center bottom,
                    #FFF5E1 0%,
                    #FFE4B5 20%,
                    #FFD700 40%,
                    #FFA500 60%,
                    #FF8C00 80%,
                    transparent 100%
                );
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                filter: blur(1px);
                animation: flicker 2s ease-in-out infinite;
                opacity: 1;
                transition: opacity 0.3s;
            }

            .flame-inner {
                position: absolute;
                top: 4px;
                left: 50%;
                transform: translateX(-50%);
                width: 10px;
                height: 20px;
                background: radial-gradient(ellipse at center,
                    #FFF9E8 0%,
                    #FFEB99 30%,
                    #FFD700 60%,
                    transparent 100%
                );
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                filter: blur(1px);
            }

            @keyframes flicker {
                0%, 100% {
                    transform: translateX(-50%) scale(1, 1);
                    opacity: 1;
                }
                25% {
                    transform: translateX(-50%) scale(0.95, 1.05);
                    opacity: 0.95;
                }
                50% {
                    transform: translateX(-50%) scale(1.02, 0.98);
                    opacity: 1;
                }
                75% {
                    transform: translateX(-50%) scale(0.98, 1.02);
                    opacity: 0.97;
                }
            }

            /* Candle body */
            .candle-body {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 35px;
                width: 60px;
                height: 180px;
                background: linear-gradient(to right,
                    #E8DCC8 0%,
                    #F5EFE0 20%,
                    #FFF8E7 50%,
                    #F5EFE0 80%,
                    #E8DCC8 100%
                );
                border-radius: 4px 4px 4px 4px;
                box-shadow:
                    inset -3px 0 8px rgba(0,0,0,0.1),
                    inset 3px 0 8px rgba(255,255,255,0.3),
                    0 5px 15px rgba(0,0,0,0.2);
                transition: height 0.15s linear;
                overflow: visible;
            }

            .candle-top {
                position: absolute;
                top: -3px;
                left: 50%;
                transform: translateX(-50%);
                width: 62px;
                height: 12px;
                background: radial-gradient(ellipse at center,
                    #F5EFE0 0%,
                    #E8DCC8 60%,
                    #D4C4AC 100%
                );
                border-radius: 50%;
                box-shadow:
                    inset 0 2px 4px rgba(0,0,0,0.15),
                    inset 0 -1px 2px rgba(255,255,255,0.2),
                    0 1px 3px rgba(0,0,0,0.1);
                z-index: 2;
            }

            .candle-top::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 8px;
                height: 8px;
                background: radial-gradient(circle,
                    rgba(180, 140, 100, 0.3) 0%,
                    transparent 70%
                );
                border-radius: 50%;
            }

            .candle-shine {
                position: absolute;
                left: 8px;
                top: 0;
                width: 15px;
                height: 100%;
                background: linear-gradient(to right,
                    rgba(255, 255, 255, 0.4),
                    transparent
                );
                border-radius: 8px 0 0 4px;
            }

            .candle-texture {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: repeating-linear-gradient(
                    to bottom,
                    transparent 0px,
                    transparent 3px,
                    rgba(0,0,0,0.02) 3px,
                    rgba(0,0,0,0.02) 4px
                );
                border-radius: 8px 8px 4px 4px;
            }

            /* Wax drips */
            .wax-drips {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 60px;
                z-index: 5;
                transition: bottom 0.15s linear;
            }

            .drip {
                position: absolute;
                width: 6px;
                height: 0px;
                background: linear-gradient(to bottom,
                    rgba(245, 239, 224, 0) 0%,
                    #F5EFE0 15%,
                    #E8DCC8 100%
                );
                border-radius: 0 0 50% 50%;
                opacity: 0;
                transition: height 0.8s ease-out, opacity 0.5s ease-out;
                box-shadow: inset 1px 0 2px rgba(255,255,255,0.4);
            }

            .drip-1 {
                left: 12px;
                top: -2px;
                animation: dripFlow1 3s ease-in-out infinite;
                animation-play-state: paused;
            }

            .drip-2 {
                left: 27px;
                top: -3px;
                animation: dripFlow2 3.5s ease-in-out infinite;
                animation-play-state: paused;
            }

            .drip-3 {
                right: 12px;
                top: -1px;
                animation: dripFlow3 4s ease-in-out infinite;
                animation-play-state: paused;
            }

            @keyframes dripFlow1 {
                0%, 100% { height: 12px; }
                50% { height: 16px; }
            }

            @keyframes dripFlow2 {
                0%, 100% { height: 15px; }
                50% { height: 20px; }
            }

            @keyframes dripFlow3 {
                0%, 100% { height: 10px; }
                50% { height: 14px; }
            }

            /* Wax pool */
            .wax-pool {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 30px;
                width: 70px;
                height: 0px;
                background: radial-gradient(ellipse at center,
                    #F5EFE0 0%,
                    #E8DCC8 50%,
                    #D4C4AC 100%
                );
                border-radius: 50%;
                box-shadow:
                    inset 0 2px 4px rgba(0,0,0,0.1),
                    0 2px 6px rgba(0,0,0,0.15);
                transition: height 0.15s linear, width 0.15s linear;
            }

            /* Candle holder */
            .candle-holder {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 0;
                width: 90px;
            }

            .holder-top {
                width: 100%;
                height: 8px;
                background: linear-gradient(to bottom,
                    #B8860B,
                    #DAA520,
                    #B8860B
                );
                border-radius: 4px 4px 0 0;
                box-shadow:
                    0 2px 4px rgba(0,0,0,0.3),
                    inset 0 1px 0 rgba(255,255,255,0.3);
            }

            .holder-base {
                width: 100%;
                height: 22px;
                background: linear-gradient(to bottom,
                    #DAA520 0%,
                    #B8860B 50%,
                    #8B6914 100%
                );
                border-radius: 0 0 4px 4px;
                box-shadow:
                    0 3px 8px rgba(0,0,0,0.3),
                    inset 0 1px 0 rgba(255,255,255,0.2),
                    inset 0 -2px 4px rgba(0,0,0,0.2);
            }

            /* When candle is stopped/complete */
            .candle-wrapper.stopped .flame,
            .candle-wrapper.stopped .flame-inner {
                animation: flameOut 0.5s forwards;
            }

            @keyframes flameOut {
                0% {
                    opacity: 1;
                    transform: translateX(-50%) scale(1, 1);
                }
                100% {
                    opacity: 0;
                    transform: translateX(-50%) scale(0.5, 0.2);
                }
            }
        `;
        document.head.appendChild(style);
    }

    update(progress) {
        super.update(progress);
        if (!this.initialized) this.init();

        if (this.container) {
            const candleBody = this.container.querySelector('.candle-body');
            const flameContainer = this.container.querySelector('.flame-container');
            const waxDrips = this.container.querySelector('.wax-drips');
            const waxPool = this.container.querySelector('.wax-pool');
            const flame = this.container.querySelector('.flame');

            if (candleBody && flameContainer && waxDrips && waxPool) {
                // Candle melts from 180px to 20px
                const minHeight = 20;
                const maxHeight = 180;
                const candleHeight = maxHeight - (maxHeight - minHeight) * progress;
                candleBody.style.height = `${candleHeight}px`;

                // Position flame and drips at top of candle (using bottom positioning)
                const flameBottom = 35 + candleHeight;
                flameContainer.style.bottom = `${flameBottom}px`;
                waxDrips.style.bottom = `${35 + candleHeight}px`;

                // Show wax drips progressively with animations
                const drips = this.container.querySelectorAll('.drip');
                if (progress > 0.2) {
                    drips[0].style.opacity = '0.9';
                    drips[0].style.animationPlayState = 'running';
                } else {
                    drips[0].style.opacity = '0';
                    drips[0].style.animationPlayState = 'paused';
                }
                if (progress > 0.4) {
                    drips[1].style.opacity = '0.9';
                    drips[1].style.animationPlayState = 'running';
                } else {
                    drips[1].style.opacity = '0';
                    drips[1].style.animationPlayState = 'paused';
                }
                if (progress > 0.6) {
                    drips[2].style.opacity = '0.9';
                    drips[2].style.animationPlayState = 'running';
                } else {
                    drips[2].style.opacity = '0';
                    drips[2].style.animationPlayState = 'paused';
                }

                // Wax pool grows as candle melts
                const poolHeight = 8 * progress;
                const poolWidth = 70 + (30 * progress); // Grows from 70px to 100px
                waxPool.style.height = `${poolHeight}px`;
                waxPool.style.width = `${poolWidth}px`;

                // Fade out flame when complete
                if (progress >= 1) {
                    flame.style.opacity = '0';
                } else {
                    flame.style.opacity = '1';
                }
            }
        }
    }

    render() {
        if (!this.initialized) this.init();
        this.clearCanvas();
    }

    reset() {
        super.reset();
        if (this.container) {
            const candleBody = this.container.querySelector('.candle-body');
            const flameContainer = this.container.querySelector('.flame-container');
            const waxDrips = this.container.querySelector('.wax-drips');
            const waxPool = this.container.querySelector('.wax-pool');
            const flame = this.container.querySelector('.flame');
            const drips = this.container.querySelectorAll('.drip');

            if (candleBody) {
                candleBody.style.height = '180px';
            }

            if (flameContainer) {
                flameContainer.style.bottom = '215px';
            }

            if (waxDrips) {
                waxDrips.style.bottom = '215px';
            }

            if (waxPool) {
                waxPool.style.height = '0px';
                waxPool.style.width = '70px';
            }

            if (flame) {
                flame.style.opacity = '1';
            }

            drips.forEach(drip => {
                drip.style.opacity = '0';
                drip.style.animationPlayState = 'paused';
            });

            this.container.classList.remove('stopped');
        }
    }

    cleanup() {
        if (this.container && this.container.parentElement) {
            this.container.remove();
        }
        this.container = null;
        this.initialized = false;
        super.cleanup();
    }

    setDuration(seconds) {
        // Not needed for candle but kept for compatibility
        this.duration = seconds;
    }

    startAnimation() {
        if (this.container) {
            this.container.classList.remove('stopped');
        }
    }

    stopAnimation() {
        if (this.container) {
            this.container.classList.add('stopped');
        }
    }
}
