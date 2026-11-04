
export function buildTally(members, scoreById = null) {
  const byDestination = new Map();

  for (const m of members) {
    if (!m.vote) continue;

    const { destination } = m.vote;
    if (!byDestination.has(destination.id)) {
      byDestination.set(destination.id, { destination, votes: 0, voters: [] });
    }

    const entry = byDestination.get(destination.id);
    entry.votes += 1;
    entry.voters.push({ userId: m.user.id, name: m.user.name });
  }

  const tally = [...byDestination.values()]
    .map((entry) => ({
      ...entry,
      groupScore: scoreById?.get(entry.destination.id) ?? null,
      eligible: scoreById ? scoreById.has(entry.destination.id) : null,
    }))
    .sort(
      (a, b) =>
        b.votes - a.votes ||
        (b.groupScore ?? -1) - (a.groupScore ?? -1) ||
        a.destination.name.localeCompare(b.destination.name)
    );

  const contenders = tally.filter((t) => t.eligible !== false);

  return {
    tally,
    leading: contenders[0] ?? null,
    tiedOnVotes: contenders.length > 1 && contenders[0].votes === contenders[1].votes,
  };
}