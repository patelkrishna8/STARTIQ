import { RecurringMistakeDetail, ChatMessage, CategoryKey } from './types';

export const RECURRING_MISTAKES_CATALOG: RecurringMistakeDetail[] = [
  {
    id: 'mistake-aggro-push',
    title: 'Over-Aggressive Open Pushes',
    category: 'combat',
    description:
      'Initiating direct forward pushes against entrenched defenders without throwing utility or waiting for team angle crossfire.',
    occurrences: 7,
    matchCount: 12,
    matchPercentage: 58,
    severity: 'High',
    trend: 'improving',
    trendLabel: 'Improving (Down 40% over last 4 matches)',
    recommendedImprovement: 'Wait 3 seconds behind cover to assess opponent reload sound cues before pushing.',
    recommendedDrill: 'Clash Squad: Force a 1-throwable requirement before any indoor breach.',
  },
  {
    id: 'mistake-open-exposure',
    title: 'Open Field Exposure Before Firing',
    category: 'positioning',
    description:
      'Opening fire while standing completely stationary or exposed in open meadows rather than securing adjacent hard cover or placing a Gloo Wall.',
    occurrences: 5,
    matchCount: 10,
    matchPercentage: 50,
    severity: 'High',
    trend: 'improving',
    trendLabel: 'Improving (8 → 4 errors across matches)',
    recommendedImprovement: 'Establish line-of-sight protection before pulling the trigger.',
    recommendedDrill: 'Custom Room 1v1: Restrict shooting solely to peeking from behind cover/trees.',
  },
  {
    id: 'mistake-late-rotation',
    title: 'Delayed Safe Zone Rotations',
    category: 'movement',
    description:
      'Looting in outer circle until safe-zone timer hits zero, forcing hasty sprint lines into awaiting gatekeepers.',
    occurrences: 4,
    matchCount: 12,
    matchPercentage: 33,
    severity: 'Medium',
    trend: 'stable',
    trendLabel: 'Stable (Occurs primarily in Zone 3 transitions)',
    recommendedImprovement: 'Begin rotating 25 seconds before the circle starts shrinking.',
    recommendedDrill: 'Map Navigation: Practice terrain contouring through riverbeds and depressions.',
  },
  {
    id: 'mistake-chokepoint-no-utility',
    title: 'Staircase Rushes Without Utility',
    category: 'decisionMaking',
    description:
      'Entering narrow two-story staircases with shotgun drawn without pre-cooking flashbangs or grenades.',
    occurrences: 4,
    matchCount: 12,
    matchPercentage: 33,
    severity: 'Medium',
    trend: 'improving',
    trendLabel: 'Improving (Utility usage increased to 60%)',
    recommendedImprovement: 'Bank grenades off the upper doorframe to displace the camper first.',
    recommendedDrill: 'Training Grounds: Practice grenade trajectory bounces into second-floor windows.',
  },
];

export const PRESET_COACH_QUESTIONS = [
  'Why did I lose my last fight at Pochinok?',
  'What is my biggest recurring tactical weakness?',
  'How can I improve my positioning in late circles?',
  'What should I focus on in my next Free Fire match?',
  'Why did you recommend 480 DPI and 92 General Sensitivity for my iQOO 15?',
];

export function getCoachResponse(query: string): ChatMessage {
  const lower = query.toLowerCase();
  const id = `msg-${Date.now()}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (lower.includes('pochinok') || lower.includes('last fight') || lower.includes('why did i lose')) {
    return {
      id,
      sender: 'coach',
      text:
        'In Match #05 at timestamp 06:42 (Pochinok Perimeter), you spotted an opponent 45m away and engaged immediately from open ground without placing a Gloo Wall or shifting 3 meters left to the stone fence. The enemy had a clear, unobstructed line of sight and eliminated you in 1.4 seconds. Taking 1 second to deploy cover before opening fire would have provided a safe reset angle.',
      timestamp,
      suggestedAction: 'View Match #05 Moment 1 Analysis',
      relatedCategory: 'positioning',
    };
  }

  if (lower.includes('weakness') || lower.includes('biggest flaw') || lower.includes('doing wrong')) {
    return {
      id,
      sender: 'coach',
      text:
        'Your biggest recurring pattern is Open Field Exposure (detected in 50% of your matches). You frequently start shooting the instant you spot an enemy, even if you are out in the open. While your movement and rotation scores are high (78/100), entering gunfights without cover makes duels a pure 50/50 gamble.',
      timestamp,
      suggestedAction: 'Review Recurring Mistakes Matrix',
      relatedCategory: 'positioning',
    };
  }

  if (lower.includes('positioning') || lower.includes('cover') || lower.includes('late circles')) {
    return {
      id,
      sender: 'coach',
      text:
        'To master Free Fire positioning: 1) Always identify a "retreat anchor" (rock, wall, vehicle) before scanning for enemies. 2) In late circles, navigate through low-elevation terrain contours rather than cresting open hilltops. 3) Pre-equip your Gloo Wall so your thumb is ready to flick-deploy the moment you take incoming fire.',
      timestamp,
      suggestedAction: 'Practice Gloo Wall Micro-Cover Drill',
      relatedCategory: 'positioning',
    };
  }

  if (lower.includes('next match') || lower.includes('focus') || lower.includes('goal')) {
    return {
      id,
      sender: 'coach',
      text:
        'Your Next Match Goal: "Prioritize cover or instant Gloo Wall placement before initiating any gunfight." Before pulling the trigger on an enemy, ask yourself: "If my first 5 shots miss, where is my cover?" If none exists, reposition first.',
      timestamp,
      suggestedAction: 'Set as Active Next-Match Goal',
      relatedCategory: 'decisionMaking',
    };
  }

  if (lower.includes('sensitivity') || lower.includes('dpi') || lower.includes('iqoo') || lower.includes('settings')) {
    return {
      id,
      sender: 'coach',
      text:
        'For your iQOO 15 (6.78" 144Hz AMOLED with 1200Hz instant touch), we recommend 480 DPI and General Sensitivity 92 (Headshot style). On high-resolution 2K displays, default 440 DPI requires a longer physical vertical swipe for drag-headshots. Setting 480 DPI and 92 General gives a crisp, short-travel drag arc that snaps crosshairs directly to the head box.',
      timestamp,
      suggestedAction: 'Inspect iQOO Gaming Profile',
      relatedCategory: 'combat',
    };
  }

  // General intelligent fallback
  return {
    id,
    sender: 'coach',
    text:
      'Based on your 5 analyzed matches, your mechanical movement is strong (78/100), but your combat entry positioning (61/100) holds back your rank progression. Focus on pre-aiming corners, carrying 3+ Gloo Walls into top-10 circles, and utilizing your iQOO 15 recommended 480 DPI sensitivity.',
    timestamp,
    suggestedAction: 'Explore Coaching Recommendations',
    relatedCategory: 'decisionMaking',
  };
}
