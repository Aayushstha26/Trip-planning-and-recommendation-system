import asyncHandler from "../../common/utils/asyncHandler.js";
import groupService from "./group.service.js";

export const createGroup = asyncHandler(async (req, res) => {
  const group = await groupService.createGroup(req.user.id, req.body);
  res.status(201).json({ success: true, data: group });
});

export const getMyGroups = asyncHandler(async (req, res) => {
  const groups = await groupService.getMyGroups(req.user.id);
  res.json({ success: true, data: groups });
});

export const getGroupById = asyncHandler(async (req, res) => {
  const group = await groupService.getGroupById(req.user.id, req.params.id);
  res.json({ success: true, data: group });
});

export const updateGroup = asyncHandler(async (req, res) => {
  const group = await groupService.updateGroup(req.user.id, req.params.id, req.body);
  res.json({ success: true, data: group });
});

export const selectDestination = asyncHandler(async (req, res) => {
  const group = await groupService.selectDestination(
    req.user.id,
    req.params.id,
    req.body.destinationId
  );
  res.json({ success: true, data: group });
});

export const deleteGroup = asyncHandler(async (req, res) => {
  await groupService.deleteGroup(req.user.id, req.params.id);
  res.status(204).send({
    success: true,
    message: "Group has been successfully deleted",
  });
});

export const joinGroup = asyncHandler(async (req, res) => {
  const group = await groupService.joinGroup(req.user.id, req.body.inviteCode);
  res.json({ success: true, data: group });
});

export const leaveGroup = asyncHandler(async (req, res) => {
  await groupService.leaveGroup(req.user.id, req.params.id);
  res.status(204).send({
    success: true,
    message: "You have successfully left the group",
  });
});

export const removeMember = asyncHandler(async (req, res) => {
  await groupService.removeMember(req.user.id, req.params.id, req.params.userId);
  res.status(204).send({
    success: true,
    message: "Member has been successfully removed from the group",
  });
});