import { KeyMoment, VideoMetadata } from './types';

/**
 * Event Extraction Service
 * 
 * Extracts structured key moments from Free Fire gameplay with situation types,
 * severity, impact ratings, and decision scores (0-100).
 */
export function extractKeyMoments(videoMetadata?: VideoMetadata): KeyMoment[] {
  return [
    {
      id: 'moment-1',
      timestamp: '06:42',
      seconds: 402,
      title: 'Pochinok Perimeter Encounter',
      situation: 'Enemy spotted 45m ahead near stone fence while player was rotating across open field.',
      situationType: 'Open Field',
      playerAction: 'Engaged immediately while standing in open ground without deploying Gloo Wall or reaching stone cover.',
      outcome: 'eliminated',
      importance: 'High',
      impact: 'High',
      decisionScore: 42,
      category: 'positioning',
      tags: ['No Cover', 'Open Field', 'Direct Engagement'],
    },
    {
      id: 'moment-2',
      timestamp: '04:18',
      seconds: 258,
      title: 'Two-Story House Stairway Contest',
      situation: 'Opponent holding high-ground angle on second floor of wooden compound.',
      situationType: 'Chokepoint',
      playerAction: 'Attempted straight sprint up narrow staircase with shotgun drawn without pre-cooking flash/grenade.',
      outcome: 'survived',
      importance: 'Medium',
      impact: 'Medium',
      decisionScore: 58,
      category: 'combat',
      tags: ['Chokepoint', 'CQB Rush', 'Low HP Escape'],
    },
    {
      id: 'moment-3',
      timestamp: '02:50',
      seconds: 170,
      title: 'Safe Zone Edge Rotation',
      situation: 'Zone 3 shrinking toward Clock Tower with enemy squad firing from elevated ridge.',
      situationType: 'Zone Rotation',
      playerAction: 'Executed zigzag sprint utilizing natural ridge dips to break line of sight, then deployed Gloo Wall.',
      outcome: 'disengaged',
      importance: 'Medium',
      impact: 'Medium',
      decisionScore: 86,
      category: 'movement',
      tags: ['Zone Rotation', 'Line of Sight', 'Smart Disengage'],
    },
    {
      id: 'moment-4',
      timestamp: '08:15',
      seconds: 495,
      title: 'Supply Drop Contest at Late Circle',
      situation: 'Airdrop landed in riverbed; sound cues indicated 2 separate players nearby.',
      situationType: 'Airdrop Contest',
      playerAction: 'Rushed drop immediately without scanning ridge treelines or waiting for third-party fight.',
      outcome: 'eliminated',
      importance: 'High',
      impact: 'High',
      decisionScore: 45,
      category: 'decisionMaking',
      tags: ['Third-Party Risk', 'Loot Greed', 'Patience Deficit'],
    },
  ];
}
