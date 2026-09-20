import React, { useEffect, useRef } from 'react';

/**
 * AudioVisualizer Component
 * Renders a dynamic, animated audio frequency equalizer bar using HTML5 Canvas.
 */
export function AudioVisualizer({ isPlaying, barCount = 16, height = 24, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const bars = Array.from({ length: barCount }, () => ({
      height: Math.random() * height * 0.5 + 4,
      targetHeight: Math.random() * height,
      speed: 0.1 + Math.random() * 0.25,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bars.forEach((bar, i) => {
        if (isPlaying) {
          // Smoothly animate towards target height
          if (Math.abs(bar.height - bar.targetHeight) < 2) {
            bar.targetHeight = Math.random() * (height - 4) + 4;
          }
          bar.height += (bar.targetHeight - bar.height) * bar.speed;
        } else {
          // Smoothly decay to flat line when paused
          bar.height += (3 - bar.height) * 0.15;
        }

        const barWidth = (canvas.width / barCount) - 2;
        const x = i * (barWidth + 2);
        const y = canvas.height - bar.height;

        // Gradient color: Spotify Green (#1DB954) to Cyan (#06b6d4)
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#1DB954');
        gradient.addColorStop(1, '#06b6d4');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, bar.height, [2, 2, 0, 0]);
        } else {
          ctx.rect(x, y, barWidth, bar.height);
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, barCount, height]);

  return (
    <canvas
      ref={canvasRef}
      width={barCount * 6}
      height={height}
      className={`inline-block ${className}`}
      aria-hidden="true"
    />
  );
}
