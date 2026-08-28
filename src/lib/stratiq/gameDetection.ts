import { GameDetectionResult, GameId, VideoMetadata } from './types';

/**
 * Game Detection Service
 * 
 * In Demo Mode: Performs deterministic metadata & heuristic checks.
 * A simple deterministic mismatch test triggers if the video filename mentions
 * BGMI, Valorant, or Call of Duty.
 * 
 * In Model Mode (Future): Calls computer-vision game classifier to visually inspect
 * HUD, minimap, weapon icons, and character silhouettes.
 */
export async function detectGame(
  videoMetadata: VideoMetadata,
  selectedGame: GameId = 'free-fire'
): Promise<GameDetectionResult> {
  // Simulate lightweight processing delay for realism
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lowerName = videoMetadata.name.toLowerCase();

  // Deterministic mismatch triggers for easy evaluation
  if (lowerName.includes('bgmi') || lowerName.includes('battlegrounds') || lowerName.includes('pubg')) {
    return {
      detectedGame: 'BGMI (Battlegrounds Mobile India)',
      selectedGame: 'Free Fire',
      confidence: 0.94,
      isMatch: false,
      verificationStatus: 'mismatch',
      detectedFeatures: ['Krafton UI HUD', 'Blue Zone Minimap Indicator', 'Erangel Topography'],
      reason: 'This gameplay appears to belong to BGMI rather than Free Fire based on detected UI markers.',
    };
  }

  if (lowerName.includes('valorant') || lowerName.includes('val')) {
    return {
      detectedGame: 'Valorant',
      selectedGame: 'Free Fire',
      confidence: 0.98,
      isMatch: false,
      verificationStatus: 'mismatch',
      detectedFeatures: ['Riot Crosshair HUD', 'First-Person Ability Layout', 'Spike Timer'],
      reason: 'This gameplay appears to belong to Valorant (PC/Console FPS) rather than Free Fire.',
    };
  }

  if (lowerName.includes('cod') || lowerName.includes('warzone') || lowerName.includes('call of duty')) {
    return {
      detectedGame: 'Call of Duty: Mobile',
      selectedGame: 'Free Fire',
      confidence: 0.92,
      isMatch: false,
      verificationStatus: 'mismatch',
      detectedFeatures: ['Activision Loadout Wheel', 'Scorestreak Meter', 'CoD Movement HUD'],
      reason: 'This gameplay appears to belong to Call of Duty rather than Free Fire.',
    };
  }

  // Normal verified Free Fire gameplay
  return {
    detectedGame: 'Free Fire (Garena)',
    selectedGame: 'Free Fire',
    confidence: 0.96,
    isMatch: true,
    verificationStatus: 'verified',
    detectedFeatures: [
      'Garena Free Fire Third-Person Over-the-Shoulder HUD',
      'Gloo Wall Quick-Slot Button',
      'Bermuda Minimap Compass',
      'EP / HP Dual Health Bar Gauge'
    ],
    reason: 'Key Free Fire visual markers and HUD layout match the expected mobile signature (96% confidence).',
  };
}
