import asyncHandler from "../../common/utils/asyncHandler.js";
import voteService from "./vote.service.js";

export const castVote = asyncHandler(async (req, res) => {
  const vote = await voteService.castVote(
    req.user.id,
    req.params.id,
    req.body.destinationId
  );
  res.json({ success: true, data: vote });
});

export const withdrawVote = asyncHandler(async (req, res) => {
  await voteService.withdrawVote(req.user.id, req.params.id);
  res.status(204).send();
});

export const getVotes = asyncHandler(async (req, res) => {
  const data = await voteService.getVotes(req.user.id, req.params.id);
  res.json({ success: true, data });
});