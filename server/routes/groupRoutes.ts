import { Router } from "express";
import {
  createGroup,
  getGroups,
  getGroupMembers,
  joinGroup,
  promoteUser,
  demoteUser, 
  leaveGroup,
  transferOwnership,
  getGroupMember,
  updateGroup
} from "../controllers/groupController";

const router = Router();

router.route("/").get(getGroups).post(createGroup);

router.route("/:groupId/members").get(getGroupMembers);

router.route("/:groupId/join").post(joinGroup);

router.route("/:groupId/promote").put(promoteUser);

router.route("/:groupId/demote").put(demoteUser);

router.route("/:groupId/leave").post(leaveGroup);

router.route("/:groupId/transfer").put(transferOwnership);

router.route("/:groupId/member/:userId").get(getGroupMember);

router.route("/:groupId").put(updateGroup);

export default router;
