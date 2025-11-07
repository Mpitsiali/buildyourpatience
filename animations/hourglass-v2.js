/**
 * Hourglass V2 - Complete Redesign
 * Modern, elegant hourglass with smooth CSS animations
 */
class HourglassV2Animation extends BaseAnimation {
    constructor(canvas) {
        super(canvas);
        this.container = null;
        this.initialized = false;
        this.duration = 60; // Default duration in seconds
    }

    init() {
        super.init();

        // Remove any existing hourglass containers
        const existing = document.getElementById('hourglass-v2-container');
        if (existing) existing.remove();

        // Create new container
        this.container = document.createElement('div');
        this.container.id = 'hourglass-v2-container';
        this.container.className = 'hourglass-v2-wrapper';

        const animationContainer = document.querySelector('.animation-container');
        if (animationContainer) {
            animationContainer.appendChild(this.container);
        }

        // Build structure
        this.container.innerHTML = `
            <div class="hg-structure">
                <!-- Wooden stand top -->
                <div class="hg-stand-top">
                    <div class="wood-texture"></div>
                </div>

                <!-- Glass container -->
                <div class="hg-glass-container">
                    <!-- Top bulb -->
                    <div class="hg-bulb hg-bulb-top">
                        <div class="glass-wall glass-left"></div>
                        <div class="glass-wall glass-right"></div>
                        <div class="sand-pile sand-pile-top"></div>
                        <div class="glass-shine"></div>
                    </div>

                    <!-- Neck -->
                    <div class="hg-neck">
                        <div class="sand-flow">
                            <div class="sand-particle"></div>
                            <div class="sand-particle"></div>
                            <div class="sand-particle"></div>
                            <div class="sand-particle"></div>
                            <div class="sand-particle"></div>
                        </div>
                    </div>

                    <!-- Bottom bulb -->
                    <div class="hg-bulb hg-bulb-bottom">
                        <div class="glass-wall glass-left"></div>
                        <div class="glass-wall glass-right"></div>
                        <div class="sand-pile sand-pile-bottom"></div>
                        <div class="glass-shine"></div>
                    </div>
                </div>

                <!-- Wooden stand bottom -->
                <div class="hg-stand-bottom">
                    <div class="wood-texture"></div>
                </div>
            </div>
        `;

        this.injectStyles();
        this.initialized = true;
    }

    injectStyles() {
        if (document.getElementById('hourglass-v2-styles')) return;

        const style = document.createElement('style');
        style.id = 'hourglass-v2-styles';
        style.textContent = `
            .hourglass-v2-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .hg-structure {
                position: relative;
                width: 140px;
                height: 260px;
            }

            /* Wooden Stands */
            .hg-stand-top,
            .hg-stand-bottom {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 160px;
                height: 20px;
                background: linear-gradient(to bottom, #A0826D, #8B7355, #75614C);
                border-radius: 4px;
                box-shadow:
                    0 3px 8px rgba(0,0,0,0.3),
                    inset 0 1px 0 rgba(255,255,255,0.2),
                    inset 0 -1px 0 rgba(0,0,0,0.3);
            }

            .hg-stand-top {
                top: 0;
            }

            .hg-stand-bottom {
                bottom: 0;
            }

            .wood-texture {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(0,0,0,0.05) 2px,
                    rgba(0,0,0,0.05) 4px
                );
                border-radius: 4px;
            }

            /* Glass Container */
            .hg-glass-container {
                position: absolute;
                top: 25px;
                left: 50%;
                transform: translateX(-50%);
                width: 140px;
                height: 210px;
            }

            /* Bulbs */
            .hg-bulb {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 140px;
                height: 90px;
            }

            .hg-bulb-top {
                top: 0;
            }

            .hg-bulb-bottom {
                bottom: 0;
            }

            /* Glass walls */
            .glass-wall {
                position: absolute;
                top: 0;
                width: 3px;
                height: 100%;
                background: linear-gradient(to right,
                    rgba(180, 200, 220, 0.6),
                    rgba(220, 230, 240, 0.3),
                    rgba(180, 200, 220, 0.6)
                );
                box-shadow:
                    1px 0 3px rgba(255,255,255,0.5),
                    -1px 0 3px rgba(0,0,0,0.1);
            }

            .hg-bulb-top .glass-wall {
                clip-path: polygon(50% 100%, 0 0, 100% 0);
            }

            .hg-bulb-bottom .glass-wall {
                clip-path: polygon(0 100%, 100% 100%, 50% 0);
            }

            .glass-left {
                left: 10px;
            }

            .glass-right {
                right: 10px;
            }

            /* Glass shine effect */
            .glass-shine {
                position: absolute;
                left: 15px;
                width: 20px;
                height: 100%;
                background: linear-gradient(to right,
                    rgba(255, 255, 255, 0.4),
                    rgba(255, 255, 255, 0.1),
                    transparent
                );
                pointer-events: none;
            }

            .hg-bulb-top .glass-shine {
                clip-path: polygon(30% 100%, 0 0, 100% 0, 70% 100%);
            }

            .hg-bulb-bottom .glass-shine {
                clip-path: polygon(0 100%, 30% 0, 70% 0, 100% 100%);
            }

            /* Neck */
            .hg-neck {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 30px;
                background: linear-gradient(to right,
                    rgba(180, 200, 220, 0.4),
                    rgba(220, 230, 240, 0.2),
                    rgba(180, 200, 220, 0.4)
                );
                box-shadow:
                    inset 2px 0 4px rgba(255,255,255,0.3),
                    inset -2px 0 4px rgba(0,0,0,0.1);
            }

            /* Sand Piles */
            .sand-pile {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                background: radial-gradient(ellipse at center,
                    #F5DEB3 0%,
                    #E8C89F 30%,
                    #D4A574 60%,
                    #C19A6B 100%
                );
                box-shadow:
                    inset 0 -5px 15px rgba(0,0,0,0.2),
                    inset 0 5px 15px rgba(255,255,255,0.3),
                    0 5px 10px rgba(0,0,0,0.1);
            }

            .sand-pile-top {
                bottom: 5px;
                height: 70px;
                border-radius: 50% 50% 45% 45% / 20% 20% 80% 80%;
                transition: height 0.15s linear, opacity 0.15s linear;
            }

            .sand-pile-bottom {
                bottom: 5px;
                height: 0px;
                border-radius: 50% 50% 2% 2%;
                transition: height 0.15s linear, opacity 0.15s linear;
            }

            /* Sand Flow */
            .sand-flow {
                position: relative;
                width: 100%;
                height: 100%;
            }

            .sand-particle {
                position: absolute;
                left: 50%;
                width: 2px;
                height: 6px;
                background: linear-gradient(to bottom,
                    #F5DEB3,
                    #E8C89F,
                    #D4A574
                );
                border-radius: 1px;
                animation: flowParticle 1.2s linear infinite;
                animation-play-state: paused;
                opacity: 0;
                transition: opacity 0.2s;
            }

            .sand-particle:nth-child(1) { animation-delay: 0s; }
            .sand-particle:nth-child(2) { animation-delay: 0.24s; }
            .sand-particle:nth-child(3) { animation-delay: 0.48s; }
            .sand-particle:nth-child(4) { animation-delay: 0.72s; }
            .sand-particle:nth-child(5) { animation-delay: 0.96s; }

            @keyframes flowParticle {
                0% {
                    transform: translate(-50%, -5px);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, 35px);
                    opacity: 0;
                }
            }

            /* Animation stop state */
            .hourglass-v2-wrapper.stopped .sand-particle {
                animation-play-state: paused !important;
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }

    update(progress) {
        super.update(progress);
        if (!this.initialized) this.init();

        // Update sand levels based on actual progress
        if (this.container) {
            const sandTop = this.container.querySelector('.sand-pile-top');
            const sandBottom = this.container.querySelector('.sand-pile-bottom');

            if (sandTop && sandBottom) {
                // Top sand depletes from 70px to 0px
                const topHeight = 70 * (1 - progress);
                sandTop.style.height = `${topHeight}px`;
                sandTop.style.opacity = progress < 1 ? '1' : '0';

                // Bottom sand fills from 0px to 80px
                const bottomHeight = 80 * progress;
                sandBottom.style.height = `${bottomHeight}px`;
                sandBottom.style.opacity = progress > 0.05 ? '1' : '0';
            }

            // Control sand particle visibility based on progress
            const particles = this.container.querySelectorAll('.sand-particle');
            particles.forEach(particle => {
                if (progress >= 1) {
                    particle.style.opacity = '0';
                    particle.style.animationPlayState = 'paused';
                } else if (progress > 0) {
                    particle.style.animationPlayState = 'running';
                }
            });
        }
    }

    render() {
        if (!this.initialized) this.init();
        this.clearCanvas();
    }

    reset() {
        super.reset();
        if (this.container) {
            // Reset sand levels to initial state
            const sandTop = this.container.querySelector('.sand-pile-top');
            const sandBottom = this.container.querySelector('.sand-pile-bottom');

            if (sandTop) {
                sandTop.style.height = '70px';
                sandTop.style.opacity = '1';
            }

            if (sandBottom) {
                sandBottom.style.height = '0px';
                sandBottom.style.opacity = '0';
            }

            // Stop and hide particles
            this.stopAnimation();
        }
    }

    cleanup() {
        // Remove the hourglass container from DOM when switching animations
        if (this.container && this.container.parentElement) {
            this.container.remove();
        }
        this.container = null;
        this.initialized = false;
        super.cleanup();
    }

    setDuration(seconds) {
        // No longer needed but kept for compatibility
        this.duration = seconds;
    }

    startAnimation() {
        // Animation is now controlled through update() method
        // This is called for compatibility but actual control is progress-based
        if (this.container) {
            this.container.classList.remove('stopped');
        }
    }

    stopAnimation() {
        if (this.container) {
            this.container.classList.add('stopped');

            // Stop all sand particles
            const particles = this.container.querySelectorAll('.sand-particle');
            particles.forEach(particle => {
                particle.style.opacity = '0';
                particle.style.animationPlayState = 'paused';
            });
        }
    }
}
