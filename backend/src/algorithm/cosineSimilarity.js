const DIFFICULTY_LEVEL = { EASY: 1, MODERATE: 2, HARD: 3 };

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

// Must sum to 1
export const DEFAULT_BLOCK_WEIGHTS = {
  interests: 0.6,
  difficulty: 0.25,
  season: 0.15,
};

export function cosineSimilarity(a, b) {
  if (a.length !== b.length) throw new Error("Vectors must have the same length");

  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}


const multiHot = (items, vocabulary) => {
  const set = new Set(items);
  return vocabulary.map((term) => (set.has(term) ? 1 : 0));
};

const thermometer = (level) => [1, 2, 3].map((l) => (l <= level ? 1 : 0));

export function buildVocabulary(preferences, destinations) {
  const terms = new Set();
  preferences.forEach((p) => p.interests.forEach((i) => terms.add(i)));
  destinations.forEach((d) => d.tags.forEach((t) => terms.add(t)));
  return [...terms].sort();
}

export function buildMemberVectors(preference, vocabulary) {
  return {
    interests: multiHot(preference.interests, vocabulary),
    difficulty: thermometer(DIFFICULTY_LEVEL[preference.difficulty]),
    season: preference.preferredSeason
      ? multiHot([preference.preferredSeason], MONTHS)
      : null,
  };
}

export function buildDestinationVectors(destination, vocabulary) {
  return {
    interests: multiHot(destination.tags, vocabulary),
    difficulty: thermometer(DIFFICULTY_LEVEL[destination.difficulty]),
    season:
      destination.bestSeasons.length > 0
        ? multiHot(destination.bestSeasons, MONTHS)
        : null, 
  };
}
export function weightedCosineSimilarity(
  memberVectors,
  destinationVectors,
  weights = DEFAULT_BLOCK_WEIGHTS
) {
  let weighted = 0;
  let totalWeight = 0;
  const breakdown = {};

  for (const block of Object.keys(weights)) {
    const m = memberVectors[block];
    const d = destinationVectors[block];

    if (!m || !d) {
      breakdown[block] = null; // skipped
      continue;
    }

    const similarity = cosineSimilarity(m, d);
    breakdown[block] = similarity;
    weighted += weights[block] * similarity;
    totalWeight += weights[block];
  }

  return {
    similarity: totalWeight === 0 ? 0 : weighted / totalWeight,
    breakdown,
  };
}