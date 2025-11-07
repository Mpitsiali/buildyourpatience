/**
 * Hourglass Animation
 * A classic sand timer with realistic falling sand particles
 * Sand gradually falls from top chamber to bottom chamber
 */
class HourglassAnimation extends BaseAnimation {
    constructor(canvas) {
        super(canvas);
        this.sandParticles = [];
        this.maxParticles = 300;
        this.particleSpawnRate = 0;
        this.frameCount = 0;
    }

    init() {
        super.init();
        const { width, height } = this.getDimensions();

        // Hourglass dimensions (centered)
        this.centerX = width / 2;
        this.centerY = height / 2;
        this.glassWidth = Math.min(width * 0.4, 120);
        this.glassHeight = Math.min(height * 0.7, 200);
        this.neckWidth = 12;

        // Chamber positions
        this.topChamberY = this.centerY - this.glassHeight / 2;
        this.bottomChamberY = this.centerY + this.glassHeight / 2;
        this.neckY = this.centerY;

        console.log('Hourglass initialized');
    }

    update(progress) {
        super.update(progress);

        // Calculate how much sand should have fallen
        // More progress = more sand at bottom, less at top
        this.particleSpawnRate = progress;
    }

    render() {
        if (!this.initialized) {
            this.init();
        }

        this.clearCanvas();
        const { width, height } = this.getDimensions();

        // Draw background
        this.ctx.fillStyle = '#f5f5f0';
        this.ctx.fillRect(0, 0, width, height);

        // Draw hourglass frame
        this.drawHourglassFrame();

        // Update and draw sand particles
        this.updateSandParticles();
        this.drawSandPiles();
        this.drawSandParticles();

        // Spawn new particles if needed
        this.spawnSandParticles();

        this.frameCount++;
    }

    drawHourglassFrame() {
        const hw = this.glassWidth / 2;
        const hh = this.glassHeight / 2;
        const frameHeight = 12;
        const frameExtend = 15;

        // Draw wooden frame first (behind glass)
        this.drawWoodenFrames(hw, frameHeight, frameExtend);

        // Draw glass with transparency and highlights
        this.drawGlassBody(hw);

        // Draw glass shine/reflections
        this.drawGlassReflections(hw);
    }

    drawWoodenFrames(hw, frameHeight, frameExtend) {
        // Top frame - with 3D effect
        const topFrameY = this.topChamberY - frameHeight;

        // Main frame body
        const frameGradient = this.ctx.createLinearGradient(
            this.centerX - hw - frameExtend,
            topFrameY,
            this.centerX + hw + frameExtend,
            topFrameY + frameHeight
        );
        frameGradient.addColorStop(0, '#6B5345');
        frameGradient.addColorStop(0.5, '#8B7355');
        frameGradient.addColorStop(1, '#6B5345');

        // Top frame
        this.ctx.fillStyle = frameGradient;
        this.ctx.fillRect(
            this.centerX - hw - frameExtend,
            topFrameY,
            this.glassWidth + frameExtend * 2,
            frameHeight
        );

        // Top frame edge highlight
        this.ctx.fillStyle = '#9D8466';
        this.ctx.fillRect(
            this.centerX - hw - frameExtend,
            topFrameY,
            this.glassWidth + frameExtend * 2,
            2
        );

        // Bottom frame
        this.ctx.fillStyle = frameGradient;
        this.ctx.fillRect(
            this.centerX - hw - frameExtend,
            this.bottomChamberY,
            this.glassWidth + frameExtend * 2,
            frameHeight
        );

        // Bottom frame shadow
        this.ctx.fillStyle = '#5A4335';
        this.ctx.fillRect(
            this.centerX - hw - frameExtend,
            this.bottomChamberY,
            this.glassWidth + frameExtend * 2,
            2
        );

        // Wood grain texture
        this.ctx.strokeStyle = 'rgba(90, 67, 53, 0.3)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            const y1 = topFrameY + 3 + i * 3;
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX - hw - frameExtend + 5, y1);
            this.ctx.lineTo(this.centerX + hw + frameExtend - 5, y1);
            this.ctx.stroke();

            const y2 = this.bottomChamberY + 3 + i * 3;
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX - hw - frameExtend + 5, y2);
            this.ctx.lineTo(this.centerX + hw + frameExtend - 5, y2);
            this.ctx.stroke();
        }
    }

    drawGlassBody(hw) {
        // Glass with slight transparency and gradient
        this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.6)';
        this.ctx.lineWidth = 2.5;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // Outer glass outline
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - hw, this.topChamberY);
        this.ctx.lineTo(this.centerX - hw, this.neckY - 20);
        this.ctx.lineTo(this.centerX - this.neckWidth / 2, this.neckY);
        this.ctx.lineTo(this.centerX - hw, this.neckY + 20);
        this.ctx.lineTo(this.centerX - hw, this.bottomChamberY);
        this.ctx.lineTo(this.centerX + hw, this.bottomChamberY);
        this.ctx.lineTo(this.centerX + hw, this.neckY + 20);
        this.ctx.lineTo(this.centerX + this.neckWidth / 2, this.neckY);
        this.ctx.lineTo(this.centerX + hw, this.neckY - 20);
        this.ctx.lineTo(this.centerX + hw, this.topChamberY);
        this.ctx.lineTo(this.centerX - hw, this.topChamberY);
        this.ctx.stroke();

        // Inner shadow edges for depth
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - hw + 3, this.topChamberY + 2);
        this.ctx.lineTo(this.centerX - hw + 3, this.neckY - 20);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - hw + 3, this.neckY + 20);
        this.ctx.lineTo(this.centerX - hw + 3, this.bottomChamberY - 2);
        this.ctx.stroke();
    }

    drawGlassReflections(hw) {
        // Left side highlight (light reflection)
        const reflectionGradient = this.ctx.createLinearGradient(
            this.centerX - hw + 5,
            this.topChamberY,
            this.centerX - hw + 15,
            this.topChamberY
        );
        reflectionGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        reflectionGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.ctx.strokeStyle = reflectionGradient;
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';

        // Top chamber reflection
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - hw + 8, this.topChamberY + 15);
        this.ctx.lineTo(this.centerX - hw + 8, this.neckY - 35);
        this.ctx.stroke();

        // Bottom chamber reflection
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - hw + 8, this.neckY + 35);
        this.ctx.lineTo(this.centerX - hw + 8, this.bottomChamberY - 15);
        this.ctx.stroke();

        // Subtle right side shadow
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX + hw - 5, this.topChamberY + 15);
        this.ctx.lineTo(this.centerX + hw - 5, this.neckY - 25);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX + hw - 5, this.neckY + 25);
        this.ctx.lineTo(this.centerX + hw - 5, this.bottomChamberY - 15);
        this.ctx.stroke();
    }

    spawnSandParticles() {
        // Only spawn if we haven't reached full progress
        if (this.progress >= 1) return;

        // Spawn rate increases with progress (sand falls faster as time goes on)
        const spawnChance = 0.3 + this.progress * 0.5;

        if (Math.random() < spawnChance && this.sandParticles.length < this.maxParticles) {
            // Spawn from center top (neck of hourglass)
            // Add some horizontal velocity for natural spread
            const angle = this.random(-Math.PI / 8, Math.PI / 8); // ±22.5 degrees
            const speed = this.random(0.5, 1.5);

            this.sandParticles.push({
                x: this.centerX + this.random(-this.neckWidth / 4, this.neckWidth / 4),
                y: this.neckY,
                vx: Math.sin(angle) * speed,
                vy: Math.cos(angle) * speed + 0.5,
                prevX: this.centerX,
                prevY: this.neckY,
                size: this.random(1.8, 3),
                color: this.getSandColor(),
                alpha: 1,
                rotation: this.random(0, Math.PI * 2),
                rotationSpeed: this.random(-0.1, 0.1),
                falling: true,
                settled: false
            });
        }
    }

    updateSandParticles() {
        for (let i = this.sandParticles.length - 1; i >= 0; i--) {
            const particle = this.sandParticles[i];

            if (!particle.settled) {
                // Store previous position for motion trail
                particle.prevX = particle.x;
                particle.prevY = particle.y;

                // Apply gravity
                particle.vy += 0.15;

                // Add slight air resistance to horizontal movement
                particle.vx *= 0.99;

                // Update rotation
                particle.rotation += particle.rotationSpeed;

                particle.x += particle.vx;
                particle.y += particle.vy;

                // Calculate boundaries based on position in hourglass
                const hw = this.glassWidth / 2;
                const neckHalfWidth = this.neckWidth / 2;

                // Determine which section particle is in and apply appropriate boundaries
                let maxDistFromCenter;

                if (particle.y < this.neckY - 20) {
                    // Top chamber - tapered boundaries
                    const topProportion = (particle.y - this.topChamberY) / (this.neckY - 20 - this.topChamberY);
                    maxDistFromCenter = this.lerp(hw - 8, neckHalfWidth, topProportion);
                } else if (particle.y > this.neckY + 20) {
                    // Bottom chamber - tapered boundaries
                    const bottomProportion = (particle.y - (this.neckY + 20)) / (this.bottomChamberY - (this.neckY + 20));
                    maxDistFromCenter = this.lerp(neckHalfWidth, hw - 8, bottomProportion);
                } else {
                    // Neck area
                    maxDistFromCenter = neckHalfWidth;
                }

                // Check and enforce side boundaries
                const distFromCenter = particle.x - this.centerX;

                if (Math.abs(distFromCenter) > maxDistFromCenter) {
                    // Bounce off wall
                    particle.x = this.centerX + (distFromCenter > 0 ? maxDistFromCenter : -maxDistFromCenter);
                    particle.vx *= -0.4; // Reduce bounce
                }

                // Check if particle hit bottom or another particle
                const bottomY = this.bottomChamberY - 10;
                const pileHeight = this.getBottomPileHeight(particle.x);

                if (particle.y >= bottomY - pileHeight) {
                    particle.settled = true;
                    particle.y = bottomY - pileHeight;
                    particle.vy = 0;
                    particle.vx = 0;
                }
            }
        }
    }

    getBottomPileHeight(x) {
        // Calculate pile height at this x position
        let height = 0;
        const tolerance = 3;

        for (const particle of this.sandParticles) {
            if (particle.settled && Math.abs(particle.x - x) < tolerance) {
                const particleTop = this.bottomChamberY - particle.y;
                if (particleTop > height) {
                    height = particleTop;
                }
            }
        }

        return height;
    }

    drawSandParticles() {
        for (const particle of this.sandParticles) {
            if (!particle.settled) {
                // Draw motion trail for falling particles
                if (particle.prevX && particle.prevY) {
                    const dx = particle.x - particle.prevX;
                    const dy = particle.y - particle.prevY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance > 0.5) {
                        // Motion blur trail
                        this.ctx.strokeStyle = particle.color.replace('rgb', 'rgba').replace(')', ', 0.3)');
                        this.ctx.lineWidth = particle.size * 0.8;
                        this.ctx.lineCap = 'round';
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.prevX, particle.prevY);
                        this.ctx.lineTo(particle.x, particle.y);
                        this.ctx.stroke();
                    }
                }

                // Draw main particle with gradient for depth
                const gradient = this.ctx.createRadialGradient(
                    particle.x - particle.size * 0.3,
                    particle.y - particle.size * 0.3,
                    0,
                    particle.x,
                    particle.y,
                    particle.size
                );

                // Lighter top-left (light source)
                const baseColor = particle.color;
                const lightColor = this.lightenSandColor(baseColor, 0.3);
                const darkColor = this.darkenSandColor(baseColor, 0.2);

                gradient.addColorStop(0, lightColor);
                gradient.addColorStop(0.6, baseColor);
                gradient.addColorStop(1, darkColor);

                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();

                // Add subtle highlight
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                this.ctx.beginPath();
                this.ctx.arc(
                    particle.x - particle.size * 0.4,
                    particle.y - particle.size * 0.4,
                    particle.size * 0.3,
                    0,
                    Math.PI * 2
                );
                this.ctx.fill();
            }
        }
    }

    lightenSandColor(colorHex, amount) {
        // Convert hex to RGB
        let r, g, b;

        if (colorHex.startsWith('#')) {
            const hex = colorHex.slice(1);
            r = parseInt(hex.slice(0, 2), 16);
            g = parseInt(hex.slice(2, 4), 16);
            b = parseInt(hex.slice(4, 6), 16);
        } else {
            // Already in rgb format
            const matches = colorHex.match(/\d+/g);
            if (!matches || matches.length < 3) return colorHex;
            r = parseInt(matches[0]);
            g = parseInt(matches[1]);
            b = parseInt(matches[2]);
        }

        r = Math.min(255, Math.round(r + amount * 100));
        g = Math.min(255, Math.round(g + amount * 100));
        b = Math.min(255, Math.round(b + amount * 100));

        return `rgb(${r}, ${g}, ${b})`;
    }

    darkenSandColor(colorHex, amount) {
        // Convert hex to RGB
        let r, g, b;

        if (colorHex.startsWith('#')) {
            const hex = colorHex.slice(1);
            r = parseInt(hex.slice(0, 2), 16);
            g = parseInt(hex.slice(2, 4), 16);
            b = parseInt(hex.slice(4, 6), 16);
        } else {
            // Already in rgb format
            const matches = colorHex.match(/\d+/g);
            if (!matches || matches.length < 3) return colorHex;
            r = parseInt(matches[0]);
            g = parseInt(matches[1]);
            b = parseInt(matches[2]);
        }

        r = Math.max(0, Math.round(r - amount * 100));
        g = Math.max(0, Math.round(g - amount * 100));
        b = Math.max(0, Math.round(b - amount * 100));

        return `rgb(${r}, ${g}, ${b})`;
    }

    drawSandPiles() {
        // Draw settled sand as a pile shape for better visual
        const bottomY = this.bottomChamberY - 10;
        const hw = this.glassWidth / 2;

        // Top pile (remaining sand)
        const topSandHeight = (1 - this.progress) * (this.glassHeight / 2 - 30);
        if (topSandHeight > 5) {
            // Main sand body with gradient
            const gradient = this.ctx.createLinearGradient(
                this.centerX - 20,
                this.topChamberY + 10,
                this.centerX + 20,
                this.topChamberY + 10 + topSandHeight
            );
            gradient.addColorStop(0, '#C19A6B');
            gradient.addColorStop(0.3, '#D4A574');
            gradient.addColorStop(0.7, '#D4A574');
            gradient.addColorStop(1, '#B8956A');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX - hw + 10, this.topChamberY + 10);
            this.ctx.lineTo(this.centerX - hw + 10, this.topChamberY + 10 + topSandHeight - 15);
            this.ctx.quadraticCurveTo(
                this.centerX,
                this.topChamberY + 10 + topSandHeight,
                this.centerX + hw - 10,
                this.topChamberY + 10 + topSandHeight - 15
            );
            this.ctx.lineTo(this.centerX + hw - 10, this.topChamberY + 10);
            this.ctx.closePath();
            this.ctx.fill();

            // Add shadow on right side
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX + 5, this.topChamberY + 10);
            this.ctx.lineTo(this.centerX + hw - 10, this.topChamberY + 10);
            this.ctx.lineTo(this.centerX + hw - 10, this.topChamberY + 10 + topSandHeight - 15);
            this.ctx.quadraticCurveTo(
                this.centerX,
                this.topChamberY + 10 + topSandHeight,
                this.centerX + 5,
                this.topChamberY + 10 + topSandHeight - 10
            );
            this.ctx.closePath();
            this.ctx.fill();

            // Highlight on left side
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX - hw + 10, this.topChamberY + 10);
            this.ctx.lineTo(this.centerX - 5, this.topChamberY + 10);
            this.ctx.lineTo(this.centerX - 5, this.topChamberY + 10 + topSandHeight - 10);
            this.ctx.quadraticCurveTo(
                this.centerX,
                this.topChamberY + 10 + topSandHeight,
                this.centerX - hw + 10,
                this.topChamberY + 10 + topSandHeight - 15
            );
            this.ctx.closePath();
            this.ctx.fill();

            // Funnel effect near neck with gradient
            const funnelGradient = this.ctx.createRadialGradient(
                this.centerX - 2, this.neckY - 5, 0,
                this.centerX, this.neckY - 5, this.neckWidth / 2 + 2
            );
            funnelGradient.addColorStop(0, '#D4A574');
            funnelGradient.addColorStop(1, '#B8956A');

            this.ctx.fillStyle = funnelGradient;
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.neckY - 5, this.neckWidth / 2 + 2, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Bottom pile (accumulated sand)
        const bottomSandHeight = this.progress * (this.glassHeight / 2 - 30);
        if (bottomSandHeight > 2) {
            // Main sand mound with gradient
            const gradient = this.ctx.createLinearGradient(
                this.centerX - 20,
                bottomY - bottomSandHeight,
                this.centerX + 20,
                bottomY
            );
            gradient.addColorStop(0, '#C19A6B');
            gradient.addColorStop(0.3, '#D4A574');
            gradient.addColorStop(0.7, '#D4A574');
            gradient.addColorStop(1, '#B8956A');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX - hw + 10, bottomY);
            this.ctx.lineTo(this.centerX - hw + 10, bottomY - bottomSandHeight + 15);
            this.ctx.quadraticCurveTo(
                this.centerX,
                bottomY - bottomSandHeight,
                this.centerX + hw - 10,
                bottomY - bottomSandHeight + 15
            );
            this.ctx.lineTo(this.centerX + hw - 10, bottomY);
            this.ctx.closePath();
            this.ctx.fill();

            // Shadow on right side
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX + 5, bottomY);
            this.ctx.lineTo(this.centerX + hw - 10, bottomY);
            this.ctx.lineTo(this.centerX + hw - 10, bottomY - bottomSandHeight + 15);
            this.ctx.quadraticCurveTo(
                this.centerX,
                bottomY - bottomSandHeight,
                this.centerX + 5,
                bottomY - bottomSandHeight + 10
            );
            this.ctx.closePath();
            this.ctx.fill();

            // Highlight on left side
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX - hw + 10, bottomY);
            this.ctx.lineTo(this.centerX - 5, bottomY);
            this.ctx.lineTo(this.centerX - 5, bottomY - bottomSandHeight + 10);
            this.ctx.quadraticCurveTo(
                this.centerX,
                bottomY - bottomSandHeight,
                this.centerX - hw + 10,
                bottomY - bottomSandHeight + 15
            );
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    getSandColor() {
        // Varied sand colors for realism
        const colors = [
            '#D4A574',
            '#C19A6B',
            '#B8956A',
            '#C4A777'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    reset() {
        super.reset();
        this.sandParticles = [];
        this.frameCount = 0;
    }
}
