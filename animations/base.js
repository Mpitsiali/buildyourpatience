/**
 * Base class for all animations
 * Provides common interface and utilities for animation implementations
 */
class BaseAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.progress = 0; // 0 to 1
        this.animationFrame = null;
        this.initialized = false;
    }

    /**
     * Initialize the animation (called once)
     * Override this method to set up initial state
     */
    init() {
        this.initialized = true;
    }

    /**
     * Update animation state based on progress
     * @param {number} progress - Value between 0 and 1
     */
    update(progress) {
        this.progress = Math.max(0, Math.min(1, progress));
    }

    /**
     * Render the current animation frame
     * Override this method with your animation logic
     */
    render() {
        throw new Error('render() must be implemented by subclass');
    }

    /**
     * Reset animation to initial state
     */
    reset() {
        this.progress = 0;
        this.initialized = false;
        this.clearCanvas();
    }

    /**
     * Cleanup animation resources (DOM elements, etc.)
     * Called when switching to a different animation
     */
    cleanup() {
        // Override in subclasses if cleanup is needed
        this.reset();
    }

    /**
     * Clear the entire canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Get canvas dimensions
     */
    getDimensions() {
        return {
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    /**
     * Utility: Generate random number between min and max
     */
    random(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Utility: Ease in-out function for smooth animations
     */
    easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    /**
     * Utility: Linear interpolation
     */
    lerp(start, end, t) {
        return start + (end - start) * t;
    }
}
