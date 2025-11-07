/**
 * Animation Manager
 * Handles switching between different animations and managing their lifecycle
 */
class AnimationManager {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas element with id "${canvasId}" not found`);
        }

        this.currentAnimation = null;
        this.animations = new Map();
        this.isAnimating = false;
        this.lastProgress = 0;

        // Set canvas size after DOM is ready
        setTimeout(() => this.resizeCanvas(), 0);

        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Register an animation type
     * @param {string} name - Animation identifier
     * @param {Class} AnimationClass - Animation class (extends BaseAnimation)
     */
    registerAnimation(name, AnimationClass) {
        this.animations.set(name, AnimationClass);
    }

    /**
     * Switch to a different animation
     * @param {string} name - Animation identifier
     */
    setAnimation(name) {
        if (!this.animations.has(name)) {
            console.error(`Animation "${name}" not registered`);
            return;
        }

        // Clean up current animation (removes DOM elements, etc.)
        if (this.currentAnimation) {
            this.currentAnimation.cleanup();
        }

        // Create new animation instance
        const AnimationClass = this.animations.get(name);
        this.currentAnimation = new AnimationClass(this.canvas);
        this.currentAnimation.update(this.lastProgress);
        this.currentAnimation.render();
    }

    /**
     * Update animation progress
     * @param {number} count - Current count
     * @param {number} targetCount - Target count
     */
    update(count, targetCount) {
        if (!this.currentAnimation) return;

        const progress = targetCount > 0 ? count / targetCount : 0;
        this.lastProgress = progress;

        this.currentAnimation.update(progress);
        this.render();
    }

    /**
     * Render current frame
     */
    render() {
        if (!this.currentAnimation) return;
        this.currentAnimation.render();
    }

    /**
     * Start continuous animation loop (for animations that need constant updates)
     */
    startAnimationLoop() {
        if (this.isAnimating) return;

        this.isAnimating = true;
        const animate = () => {
            if (!this.isAnimating) return;

            this.render();
            requestAnimationFrame(animate);
        };

        animate();
    }

    /**
     * Stop continuous animation loop
     */
    stopAnimationLoop() {
        this.isAnimating = false;
    }

    /**
     * Reset current animation
     */
    reset() {
        if (this.currentAnimation) {
            this.currentAnimation.reset();
            this.currentAnimation.render();
        }
        this.lastProgress = 0;
    }

    /**
     * Resize canvas to match display size
     */
    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        // Set internal canvas size to match display size (with fallback)
        this.canvas.width = rect.width || 600;
        this.canvas.height = rect.height || 300;

        // Re-render current animation with new size
        if (this.currentAnimation) {
            this.currentAnimation.reset();
            this.currentAnimation.update(this.lastProgress);
            this.currentAnimation.render();
        }
    }

    /**
     * Get list of registered animation names
     */
    getAvailableAnimations() {
        return Array.from(this.animations.keys());
    }
}
