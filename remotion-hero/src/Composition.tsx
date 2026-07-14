import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig, Sequence } from 'remotion';
import React from 'react';
import imagesData from './images.json';

const DURATION_PER_SLIDE = 150; // 5 seconds at 30fps
const TRANSITION_DURATION = 30; // 1 second crossfade

export const MyComposition = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const slides = imagesData.slice(0, 6); // Take first 6 images

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {slides.map((item: any, index: number) => {
        const startFrame = index * (DURATION_PER_SLIDE - TRANSITION_DURATION);
        const endFrame = startFrame + DURATION_PER_SLIDE;

        // Opacity transition
        const opacity = interpolate(
          frame,
          [
            startFrame,
            startFrame + TRANSITION_DURATION,
            endFrame - TRANSITION_DURATION,
            endFrame,
          ],
          [index === 0 ? 1 : 0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        // Ken burns effect
        const scale = interpolate(
          frame,
          [startFrame, endFrame],
          [1, 1.15],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={DURATION_PER_SLIDE}
          >
            <AbsoluteFill
              style={{
                opacity,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Img
                src={item.url}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${scale})`,
                }}
              />
              
              {/* Luxury Vignette and Overlays */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)',
              }} />
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
              }} />

            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
