import {
  DEFAULT_BLOCK_WEIGHTS,
  buildVocabulary,
  buildMemberVectors,
  buildDestinationVectors,
  weightedCosineSimilarity,
} from "../../algorithm/cosineSimilarity.js";
import { aggregateGroupScore } from "../../algorithm/leastMisery.js";

const DIFFICULTY_LEVEL = { EASY: 1, MODERATE: 2, HARD: 3 };

const round = (n, digits = 3) => Number(n.toFixed(digits));

// Stage 1: hard limits. A destination must be acceptable to EVERY member.
function findBreaches(members, destination) {
  const breaches = [];

  for (const m of members) {
    const p = m.preference;
    const who = { memberId: m.id, name: m.name };

    if (destination.estimatedBudget > p.budget) {
      breaches.push({ ...who, criterion: "budget", limit: p.budget, value: destination.estimatedBudget });
    }
    if (destination.durationDays > p.maxDurationDays) {
      breaches.push({ ...who, criterion: "duration", limit: p.maxDurationDays, value: destination.durationDays });
    }
    if (DIFFICULTY_LEVEL[destination.difficulty] > DIFFICULTY_LEVEL[p.difficulty]) {
      breaches.push({ ...who, criterion: "difficulty", limit: p.difficulty, value: destination.difficulty });
    }
  }

  return breaches;
}

/**
 * @param members       [{ id, name, preference }]
 * @param destinations  Destination rows
 * @param lambda        0 = pure average, 1 = pure least misery
 */
export function recommendDestinations({
  members,
  destinations,
  lambda = 0.5,
  weights = DEFAULT_BLOCK_WEIGHTS,
}) {
  if (members.length === 0) throw new Error("At least one member is required");

  const vocabulary = buildVocabulary(
    members.map((m) => m.preference),
    destinations
  );
  const memberVectors = members.map((m) => buildMemberVectors(m.preference, vocabulary));

  const ranked = [];
  const excluded = [];

  for (const destination of destinations) {
    const breaches = findBreaches(members, destination);
    if (breaches.length > 0) {
      excluded.push({
        destination: { id: destination.id, name: destination.name },
        breaches,
      });
      continue;
    }

    // Stage 2: cosine similarity for each member
    const destinationVectors = buildDestinationVectors(destination, vocabulary);
    const memberScores = members.map((m, i) => ({
      memberId: m.id,
      name: m.name,
      ...weightedCosineSimilarity(memberVectors[i], destinationVectors, weights),
    }));

    // Stage 3: least misery aggregation
    const { score, minimum, average, minimumIndex } = aggregateGroupScore(
      memberScores.map((s) => s.similarity),
      lambda
    );

    ranked.push({
      destination,
      groupScore: round(score),
      leastMisery: round(minimum),
      average: round(average),
      unhappiestMember: {
        memberId: memberScores[minimumIndex].memberId,
        name: memberScores[minimumIndex].name,
      },
      memberScores: memberScores.map((s) => ({
        memberId: s.memberId,
        name: s.name,
        similarity: round(s.similarity),
        breakdown: Object.fromEntries(
          Object.entries(s.breakdown).map(([k, v]) => [k, v === null ? null : round(v)])
        ),
      })),
    });
  }

  ranked.sort(
    (a, b) =>
      b.groupScore - a.groupScore ||
      b.leastMisery - a.leastMisery ||
      a.destination.name.localeCompare(b.destination.name)
  );

  return { ranked, excluded };
}