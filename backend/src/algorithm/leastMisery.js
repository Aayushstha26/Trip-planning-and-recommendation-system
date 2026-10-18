
// @param scores

export function aggregateGroupScore(scores, lambda = 0.5) {
  if (!Array.isArray(scores) || scores.length === 0) {
    throw new Error("At least one score is required");
  }
  if (lambda < 0 || lambda > 1) {
    throw new RangeError("lambda must be between 0 and 1");
  }

  const minimum = Math.min(...scores);
  const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;

  return {
    score: (1 - lambda) * average + lambda * minimum,
    minimum,
    average,
    minimumIndex: scores.indexOf(minimum),
  };
}