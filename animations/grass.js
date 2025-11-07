/**
 * Grass Growing Animation
 * Creates a field of grass that slowly grows from seeds to full blades
 * Features: Individual blade growth, color transitions, gentle swaying
 */
class GrassAnimation extends BaseAnimation {
    constructor(canvas) {
        super(canvas);
        this.grassBlades = [];
        this.bladeCount = 120; // Number of grass blades
        this.windOffset = 0;
        this.windSpeed = 0.02;
    }

    init() {
        super.init();
        const { width, height } = this.getDimensions();

        // Create grass blade objects with random properties
        for (let i = 0; i < this.bladeCount; i++) {
            this.grassBlades.push({
                x: this.random(0, width),
                baseHeight: this.random(60, 120), // Full grown height
                width: this.random(3, 6),
                curve: this.random(0.1, 0.3), // How much the blade curves
                swayOffset: this.random(0, Math.PI * 2), // Phase offset for sway
                swayAmount: this.random(0.5, 1.5), // How much it sways
                growthRate: this.random(0.8, 1.2), // Individual growth speed
                segments: 8 // Number of segments for smooth curve
            });
        }

        // Sort by x position for layering effect
        this.grassBlades.sort((a, b) => a.x - b.x);
    }

    render() {
        if (!this.initialized) {
            this.init();
        }

        this.clearCanvas();
        const { width, height } = this.getDimensions();

        // Draw soil/ground
        this.drawGround(width, height);

        // Animate wind
        this.windOffset += this.windSpeed;

        // Draw grass blades from back to front
        for (const blade of this.grassBlades) {
            this.drawGrassBlade(blade, height);
        }
    }

    drawGround(width, height) {
        const groundHeight = 40;
        const groundY = height - groundHeight;

        // Gradient for soil
        const gradient = this.ctx.createLinearGradient(0, groundY, 0, height);
        gradient.addColorStop(0, '#8B7355');
        gradient.addColorStop(1, '#6B5345');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, groundY, width, groundHeight);

        // Add some texture to the soil
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        for (let i = 0; i < 50; i++) {
            const x = this.random(0, width);
            const y = this.random(groundY, height);
            const size = this.random(1, 3);
            this.ctx.fillRect(x, y, size, size);
        }
    }

    drawGrassBlade(blade, canvasHeight) {
        // Calculate current height based on progress and individual growth rate
        const effectiveProgress = Math.min(1, this.progress * blade.growthRate);
        const currentHeight = blade.baseHeight * this.easeInOut(effectiveProgress);

        if (currentHeight < 1) return; // Don't draw if too small

        // Calculate color based on growth stage
        const color = this.getGrassColor(effectiveProgress);

        // Calculate sway
        const swayAngle = Math.sin(this.windOffset + blade.swayOffset) * blade.swayAmount * 0.05;
        const sway = swayAngle * currentHeight * 0.3;

        // Draw blade as a curved path
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = blade.width;
        this.ctx.lineCap = 'round';

        const groundY = canvasHeight - 40;
        const startX = blade.x;
        const startY = groundY;

        // Create curved blade using quadratic curves
        this.ctx.moveTo(startX, startY);

        // Draw blade in segments for smooth curve
        for (let i = 1; i <= blade.segments; i++) {
            const t = i / blade.segments;
            const segmentHeight = currentHeight * t;

            // Apply curve and sway
            const curveAmount = blade.curve * segmentHeight;
            const swayAmount = sway * t * t; // More sway at the tip

            const x = startX + curveAmount + swayAmount;
            const y = startY - segmentHeight;

            this.ctx.lineTo(x, y);
        }

        this.ctx.stroke();

        // Add a lighter highlight on one side for depth
        if (currentHeight > 20) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.lightenColor(color, 0.3);
            this.ctx.lineWidth = blade.width * 0.3;
            this.ctx.moveTo(startX + blade.width * 0.2, startY);

            for (let i = 1; i <= blade.segments; i++) {
                const t = i / blade.segments;
                const segmentHeight = currentHeight * t;
                const curveAmount = blade.curve * segmentHeight;
                const swayAmount = sway * t * t;

                const x = startX + curveAmount + swayAmount + blade.width * 0.2;
                const y = startY - segmentHeight;

                this.ctx.lineTo(x, y);
            }

            this.ctx.stroke();
        }
    }

    getGrassColor(progress) {
        // Transition from light yellow-green (new growth) to darker green (mature)
        const colors = [
            { r: 180, g: 220, b: 140 }, // Light yellow-green (0%)
            { r: 120, g: 190, b: 100 }, // Medium green (50%)
            { r: 80, g: 150, b: 70 }    // Dark green (100%)
        ];

        let color1, color2, localProgress;

        if (progress < 0.5) {
            color1 = colors[0];
            color2 = colors[1];
            localProgress = progress * 2;
        } else {
            color1 = colors[1];
            color2 = colors[2];
            localProgress = (progress - 0.5) * 2;
        }

        const r = Math.round(this.lerp(color1.r, color2.r, localProgress));
        const g = Math.round(this.lerp(color1.g, color2.g, localProgress));
        const b = Math.round(this.lerp(color1.b, color2.b, localProgress));

        return `rgb(${r}, ${g}, ${b})`;
    }

    lightenColor(rgbString, amount) {
        // Parse rgb string and lighten it
        const matches = rgbString.match(/\d+/g);
        if (!matches) return rgbString;

        const r = Math.min(255, parseInt(matches[0]) + amount * 100);
        const g = Math.min(255, parseInt(matches[1]) + amount * 100);
        const b = Math.min(255, parseInt(matches[2]) + amount * 100);

        return `rgb(${r}, ${g}, ${b})`;
    }

    reset() {
        super.reset();
        this.grassBlades = [];
        this.windOffset = 0;
    }

    setDuration(seconds) {
        // Not needed for grass but kept for compatibility
        this.duration = seconds;
    }

    startAnimation() {
        // Grass animation is always running via render loop
    }

    stopAnimation() {
        // Grass animation is always running via render loop
    }
}
