import ApiError from "../../common/utils/apiError.js";
import voteRepository from "./vote.repository.js";
import recommendationService from "../recommendation/recommendation.service.js"
import { buildTally } from "./vote.tally.js";

const getGroupAndMember = async (groupId, userId) => {
  const group = await voteRepository.findGroup(groupId);
  if (!group) throw new ApiError("Group not found", 404);

  const member = await voteRepository.findMember(groupId, userId);
  if (!member) throw new ApiError("You are not a member of this group", 403);

  return { group, member };
};

const assertVotingOpen = (group) => {
  if (group.destinationId) {
    throw new ApiError(
      "Voting is closed: the group has already chosen a destination",
      409
    );
  }
};

// Scores are only available once every member has submitted preferences
const getRankingOrNull = async (groupId) => {
  try {
    return await recommendationService.computeRanking(groupId);
  } catch (err) {
    if (err.statusCode === 409) return null;
    throw err;
  }
};

const voteService = {
  async castVote(userId, groupId, destinationId) {
    const { group, member } = await getGroupAndMember(groupId, userId);
    assertVotingOpen(group);

    const { destinations, ranked } = await recommendationService.computeRanking(groupId);

    if (!destinations.some((d) => d.id === destinationId)) {
      throw new ApiError("Destination not found", 404);
    }
    if (!ranked.some((r) => r.destination.id === destinationId)) {
      throw new ApiError(
        "You can only vote for a destination that fits every member's limits",
        400
      );
    }

    return voteRepository.upsertVote(member.id, destinationId);
  },

  async withdrawVote(userId, groupId) {
    const { group, member } = await getGroupAndMember(groupId, userId);
    assertVotingOpen(group);

    const vote = await voteRepository.findVoteByMemberId(member.id);
    if (!vote) throw new ApiError("You have not voted yet", 404);

    await voteRepository.deleteVote(member.id);
  },

  async getVotes(userId, groupId) {
    const { group } = await getGroupAndMember(groupId, userId);

    const members = await voteRepository.findMembersWithVotes(groupId);
    const ranking = await getRankingOrNull(groupId);

    const scoreById = ranking
      ? new Map(ranking.ranked.map((r) => [r.destination.id, r.groupScore]))
      : null;

    const { tally, leading, tiedOnVotes } = buildTally(members, scoreById);

    const votedCount = members.filter((m) => m.vote).length;
    const mine = members.find((m) => m.user.id === userId);

    return {
      groupId,
      finalized: Boolean(group.destinationId),
      selectedDestinationId: group.destinationId,
      totalMembers: members.length,
      votedCount,
      allVoted: votedCount === members.length,
      myVoteDestinationId: mine?.vote?.destinationId ?? null,
      leading: leading
        ? {
            destination: leading.destination,
            votes: leading.votes,
            groupScore: leading.groupScore,
          }
        : null,
      tiedOnVotes,
      tally,
      notVoted: members
        .filter((m) => !m.vote)
        .map((m) => ({ userId: m.user.id, name: m.user.name })),
    };
  },
};

export default voteService;