/**
 * CSS-based Hourglass Animation
 * Uses pure CSS animations for smooth, elegant sand flow
 * Much more performant than particle system
 */
class HourglassCSSAnimation extends BaseAnimation {
    constructor(canvas) {
        super(canvas);
        this.container = null;
        this.initialized = false;
    }

    init() {
        super.init();

        // Remove any existing CSS hourglass container
        const existingContainer = document.getElementById('hourglass-css-container');
        if (existingContainer) {
            existingContainer.remove();
        }

        // Create container for CSS hourglass
        this.container = document.createElement('div');
        this.container.id = 'hourglass-css-container';
        this.container.className = 'hourglass-css-wrapper';

        // Insert into animation container
        const animationContainer = document.querySelector('.animation-container');
        if (animationContainer) {
            animationContainer.appendChild(this.container);
        } else {
            console.error('Animation container not found');
            return;
        }

        // Build hourglass HTML structure
        this.container.innerHTML = `
            <div class="hourglass-frame">
                <div class="glass-outline"></div>
                <div class="hourglass-top">
                    <div class="sand-top"></div>
                    <div class="glass-top"></div>
                </div>
                <div class="hourglass-bottom">
                    <div class="sand-drip"></div>
                    <div class="sand-stream"></div>
                    <div class="sand-bottom"></div>
                    <div class="glass-bottom"></div>
                </div>
            </div>
        `;

        // Add CSS styles
        this.injectStyles();

        this.initialized = true;
    }

    injectStyles() {
        // Check if styles already exist
        if (document.getElementById('hourglass-css-styles')) return;

        const style = document.createElement('style');
        style.id = 'hourglass-css-styles';
        style.textContent = `
            .hourglass-css-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: transparent;
            }

            .hourglass-frame {
                position: relative;
                width: 120px;
                height: 200px;
                border-top: 12px solid #8B7355;
                border-bottom: 12px solid #8B7355;
                background: transparent;
            }

            .hourglass-frame .glass-outline {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-left: 3px solid rgba(150, 150, 150, 0.5);
                border-right: 3px solid rgba(150, 150, 150, 0.5);
                clip-path: polygon(0 0, 45% 50%, 0 100%, 0 0, 100% 0, 55% 50%, 100% 100%, 0 100%);
                pointer-events: none;
                z-index: 10;
            }

            .hourglass-frame::before {
                content: '';
                position: absolute;
                top: -12px;
                left: -15px;
                right: -15px;
                height: 12px;
                background: linear-gradient(to right, #6B5345, #8B7355, #6B5345);
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }

            .hourglass-frame::after {
                content: '';
                position: absolute;
                bottom: -12px;
                left: -15px;
                right: -15px;
                height: 12px;
                background: linear-gradient(to right, #6B5345, #8B7355, #6B5345);
                box-shadow: 0 -2px 4px rgba(0,0,0,0.2);
            }

            .hourglass-top {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 110px;
                height: 100px;
                clip-path: polygon(45% 100%, 55% 100%, 100% 0, 0 0);
            }

            .sand-top {
                position: absolute;
                width: 110px;
                height: 80px;
                bottom: 0;
                background: linear-gradient(to bottom, #E8C89F 0%, #D4A574 50%, #C19A6B 100%);
                box-shadow: inset -5px -5px 15px rgba(0,0,0,0.2), inset 5px 5px 15px rgba(255,255,255,0.2);
                animation: lowerTopSand var(--duration, 60s) linear forwards;
                animation-play-state: var(--play-state, paused);
            }

            @keyframes lowerTopSand {
                0% {
                    transform: none;
                    height: 80px;
                }
                100% {
                    transform: translateY(80px);
                    height: 0px;
                }
            }

            .glass-top {
                position: absolute;
                top: -5px;
                left: -10px;
                width: 130px;
                height: 110px;
                background: linear-gradient(135deg,
                    rgba(255, 255, 255, 0.3) 0%,
                    transparent 30%,
                    transparent 70%,
                    rgba(0, 0, 0, 0.05) 100%
                );
                pointer-events: none;
            }

            .hourglass-bottom {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 100px;
                width: 110px;
                height: 100px;
                clip-path: polygon(45% 0, 55% 0, 100% 100%, 0 100%);
            }

            .sand-drip {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 7px solid transparent;
                border-right: 7px solid transparent;
                border-top: 10px solid #E8C89F;
                filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3));
                animation: fadeDrip var(--duration, 60s) linear infinite;
                animation-play-state: var(--play-state, paused);
                z-index: 5;
            }

            @keyframes fadeDrip {
                0%, 95% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                }
            }

            .sand-stream {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 3px;
                height: 90px;
                background: repeating-linear-gradient(
                    to bottom,
                    #E8C89F 0px,
                    #D4A574 3px,
                    #C19A6B 6px,
                    transparent 6px,
                    transparent 9px
                );
                filter: drop-shadow(0 0 2px rgba(212, 165, 116, 0.5));
                animation: streamSand var(--duration, 60s) linear infinite;
                animation-play-state: var(--play-state, paused);
                z-index: 5;
            }

            @keyframes streamSand {
                0% {
                    transform: translate(-50%, -90px);
                    opacity: 1;
                }
                95% {
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, 10px);
                    opacity: 0;
                }
            }

            .sand-bottom {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 110px;
                height: 0px;
                bottom: 0;
                background: linear-gradient(to top, #C19A6B 0%, #D4A574 50%, #E8C89F 100%);
                box-shadow: inset -5px -5px 15px rgba(0,0,0,0.2), inset 5px 5px 15px rgba(255,255,255,0.2);
                border-radius: 50% 50% 0 0;
                animation: raiseBottomSand var(--duration, 60s) linear forwards;
                animation-play-state: var(--play-state, paused);
            }

            @keyframes raiseBottomSand {
                0% {
                    transform: translateX(-50%);
                    height: 0px;
                    border-radius: 0;
                }
                100% {
                    transform: translateX(-50%);
                    height: 90px;
                    border-radius: 50% 50% 0 0;
                }
            }

            .glass-bottom {
                position: absolute;
                top: -5px;
                left: -10px;
                width: 130px;
                height: 110px;
                background: linear-gradient(135deg,
                    rgba(255, 255, 255, 0.3) 0%,
                    transparent 30%,
                    transparent 70%,
                    rgba(0, 0, 0, 0.05) 100%
                );
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    update(progress) {
        super.update(progress);

        if (!this.initialized) {
            this.init();
        }

        // Update CSS custom properties for animation timing
        if (this.container) {
            this.container.style.setProperty('--progress', progress);
        }
    }

    render() {
        if (!this.initialized) {
            this.init();
        }

        // CSS handles all rendering, just clear canvas
        this.clearCanvas();
    }

    reset() {
        super.reset();

        if (this.container) {
            // Reset animations by removing and re-adding elements
            const frame = this.container.querySelector('.hourglass-frame');
            if (frame) {
                const parent = frame.parentElement;
                const clone = frame.cloneNode(true);
                parent.removeChild(frame);
                parent.appendChild(clone);
            }
        }
    }

    // Start/stop animations
    startAnimation() {
        if (this.container) {
            this.container.style.setProperty('--play-state', 'running');
        }
    }

    stopAnimation() {
        if (this.container) {
            this.container.style.setProperty('--play-state', 'paused');
        }
    }
}
