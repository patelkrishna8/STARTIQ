import { DeviceProfile, SensitivitySettings, HUDControlItem, OptimizationStyle } from './types';

export const DEFAULT_IQOO_DEVICE: DeviceProfile = {
  deviceModel: 'iQOO 15',
  chipset: 'Snapdragon 8 Elite + Supercomputing Chip Q2',
  displayResolution: '3200 x 1440 (2K 144Hz AMOLED)',
  screenSize: '6.78 inches',
  touchSamplingRate: '300Hz standard / 1200Hz Instant Touch',
  gamingPerformanceProfile: 'Monster Mode / Ultra Frame Interpolation',
  standardDPI: 440,
  recommendedDPI: 480,
};

export const SENSITIVITY_PROFILES: Record<OptimizationStyle, SensitivitySettings> = {
  Headshot: {
    general: 92,
    redDot: 88,
    scope2x: 80,
    scope4x: 72,
    sniper: 55,
    freeLook: 70,
    optimizationStyle: 'Headshot',
    recommendedDPI: 480,
    rationale:
      'Optimized for fast upward swipe drag-headshots on the iQOO 15 144Hz panel. Higher general sensitivity reduces required thumb travel during vertical drag-shots with ARs and SMGs.',
  },
  Balanced: {
    general: 85,
    redDot: 82,
    scope2x: 75,
    scope4x: 68,
    sniper: 50,
    freeLook: 65,
    optimizationStyle: 'Balanced',
    recommendedDPI: 450,
    rationale:
      'Balanced profile balancing mid-range micro-adjustments with fast 180° camera turns for standard ranked play.',
  },
  Rush: {
    general: 96,
    redDot: 92,
    scope2x: 84,
    scope4x: 76,
    sniper: 58,
    freeLook: 75,
    optimizationStyle: 'Rush',
    recommendedDPI: 500,
    rationale:
      'Maximum responsiveness for close-quarters Shotgun/MP40 rushers on 1200Hz instant touch sampling. Allows rapid camera flicks and instantaneous Gloo Wall placement.',
  },
};

export const DEFAULT_HUD_RECOMMENDATIONS: HUDControlItem[] = [
  {
    id: 'hud-fire-btn',
    label: 'Right Fire Button',
    currentSize: 40,
    recommendedSize: 52,
    currentPosition: 'Bottom Right (X: 85%, Y: 82%)',
    recommendedPosition: 'Bottom Right (X: 83%, Y: 78%) - Elevated 15px',
    notes:
      'Increasing button scale from 40% to 52% and raising position slightly aligns with the natural thumb arc on a 6.78" screen, reducing missed drag-tap inputs during intense gunfights.',
  },
  {
    id: 'hud-gloo-wall',
    label: 'Gloo Wall Quick-Slot',
    currentSize: 45,
    recommendedSize: 58,
    currentPosition: 'Left Mid-Lower (X: 18%, Y: 65%)',
    recommendedPosition: 'Left Lower (X: 20%, Y: 60%) - Enlarged',
    notes:
      'Enlarging Gloo Wall slot allows near-instant reflex tapping with left thumb while right thumb angles the crosshair toward the ground.',
  },
  {
    id: 'hud-joystick',
    label: 'Movement Joystick',
    currentSize: 85,
    recommendedSize: 65,
    currentPosition: 'Bottom Left (X: 12%, Y: 78%)',
    recommendedPosition: 'Bottom Left (X: 12%, Y: 80%) - Reduced scale',
    notes:
      'Smaller joystick circle reduces the physical thumb distance required to trigger full sprint lock, improving sudden evasive zigzag agility.',
  },
  {
    id: 'hud-scope',
    label: 'Quick Scope Button',
    currentSize: 42,
    recommendedSize: 48,
    currentPosition: 'Upper Right (X: 88%, Y: 45%)',
    recommendedPosition: 'Upper Right (X: 86%, Y: 42%) - Index/Thumb Reach',
    notes:
      'Slight repositioning prevents accidental fire button overlap while allowing instantaneous 2x/4x scope-in peeks.',
  },
];

export function getSensitivityForStyle(style: OptimizationStyle): SensitivitySettings {
  return SENSITIVITY_PROFILES[style] || SENSITIVITY_PROFILES.Headshot;
}
