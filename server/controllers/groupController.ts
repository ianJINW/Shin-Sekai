import { Request, Response } from "express";
import Group from "../models/groupModel";
import { Message } from "../models/groupModel";
import { cloudinary } from "../middleware/multer";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { logger } from "../utils/logger";

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find();

    res.json({ groups, message: "すごいすごい" });
  } catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
};

export const getGroupMembers = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  try {
    const members = await Group.findById(groupId).populate(
      "members.user",
      "name email"
    );
    if (!members) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.json({ members, message: "すごいすごい" });
  } catch (error) {
    logger.warn({ err: error }, 'Failed to fetch group members');

    res.status(500).json({ message: "ばかばか" });
  }
};

export const getGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId).populate('members.user', 'username image')
    logger.debug({ groupId, group }, 'Fetched group details');

    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    // include recent messages when fetching a group — limit to most recent 200 to avoid large payloads
    const messages = await Message.find({ group: groupId })
      .populate('sender', 'username image')
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    // return in chronological order (oldest first)
    messages.reverse();

    res.json({ group, messages, message: "すごいすごい" });
  } catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { name, description, image, user } = req.body;
  if (!user) {
    res.status(400).json({ message: "ばかばか" });
    return;
  }
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    const member = group.members.find(
      (member) => member.user.toString() === user
    );
    if (!member) {
      res.status(403).json({ message: "ばかばか" });
      return;
    }

    if (member.role !== "owner") {
      res.status(403).json({ message: "ばかばか" });
      return;
    }

    group.name = name;
    group.description = description;
    group.image = image;

    await group.save();

    res.json({ group, message: "すごいすごい" });
  } catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
};

export const getGroupMember = async (req: Request, res: Response) => {
  const { groupId, userId } = req.params;
  try {
    const group = await Group.findById(groupId).populate('members.user', 'username _id email');
    if (!group) { /* 404 */ }

    const member = group?.members.find(m => m.user && m.user._id?.toString() === userId);

    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }
    res.json({ member, message: "すごいすごい" });
  } catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
};

export const createGroup = async (req: Request, res: Response) => {
  let image = "";
  if (req.file) {
    const file = req.file;

    logger.debug({ hasFile: true, fileName: (req.file as any)?.originalname }, 'Received group image upload');

    try {
      image = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { upload_preset: "art-gallery" },
          (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
            if (result && (result.secure_url || result.url)) {
              resolve(result.secure_url ?? result.url);
            } else {
              reject(error ?? new Error("No upload result"));
            }
          }
        );
        stream.end(file.buffer);
      });
    } catch (error) {
      logger.error({ err: error }, 'Image upload failed');
      res.status(500).json({ message: "Image upload failed", error });
      return;
    }
  }

  const { name, description } = req.body;
  // Multer parses fields as strings; sanitize the user field
  let user = typeof req.body.user === "string" ? req.body.user.trim() : String(req.body.user ?? "").trim();

  logger.debug({ body: req.body }, 'Create group request body');

  if (!user || user === "undefined") {
    res.status(400).json({ message: "User is required" });
    return;
  }

  try {
    const group = new Group({
      name,
      description,
      image,
      members: [{ user, role: "owner" }],
    });

    await group.save();
    logger.info({ groupId: group._id }, 'Group created');

    res.json({ group, message: "すごいすごい" });
  } catch (error) {
    logger.error({ err: error }, 'Failed to create group');
    res.status(500).json({ message: "ばかばか" });
  }
};

export const joinGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { userId } = req.body; 

  if (!userId || !groupId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const group = await Group.findById(groupId).populate("members.user", "username");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user already in group
    const isMember = group.members.some(m => m.user.toString() === userId);
    if (isMember) {
      return res.status(400).json({ message: "User already a member" });
    }

    // Add member
    group.members.push({
      user: userId,
      role: "member",
      joinedAt: new Date(),
    });

    await group.save();

    return res.status(200).json({
      message: "Joined group successfully",
      group,
    });
  } catch (error) {
    logger.error({ err: error }, 'Failed to join group');
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const promoteUser = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { user, adminId } = req.body;
  logger.debug({ body: req.body }, 'Promote user request');
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    //check if the user is an admin or owner

    const requestingUser = group.members.find(
      (m) => m.user.toString() === adminId
    );
    if (
      !requestingUser ||
      (requestingUser.role !== "admin" && requestingUser.role !== "owner")
    ) {
      res.status(403).json({ message: "ばかばか" });
      return;
    }

    //find the user to promote
    const member = group.members.find(
      (member) => member.user.toString() === user
    );
    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    //check if the user is already an admin
    if (member.role === "admin") {
      res.status(403).json({ message: "ばかばか" });
      return;
    }

    member.role = "admin";
    await group.save();
    res.json({ group, message: "すごい" });
  } catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
};

export const demoteUser = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { user, adminId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    const requestingUser = group.members.find(
      (m) => m.user.toString() === adminId
    );
    if (
      !requestingUser ||
      (requestingUser.role !== "admin" && requestingUser.role !== "owner")
    ) {
      res.status(403).json({ message: "is not admin or owner" });
      return;
    }

    const member = group.members.find(
      (member) => member.user.toString() === user
    );
    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    //check if user is member and not admin
    if (member.role === "member") {
      res.status(403).json({ message: "is a member" });
      return;
    }

    member.role = "member";
    await group.save();
    res.json({ group, message: "User demoted successfully" });
  } catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
};

export const leaveGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  // accept either { user } or { userId } from client
  const userId = req.body.userId ?? req.body.user;

  if (!userId) {
    return res.status(400).json({ message: 'Missing userId' });
  }

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    const member = group.members.find(
      (member) => member.user.toString() === userId
    );
    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    //check if the user is the owner
    if (member.role === "owner") {
      res.status(403).json({ message: "owner must transfer ownership" });
      return;
    }

    const index = group.members.findIndex(
      (member) => member.user.toString() === userId
    );
    group.members.splice(index, 1);

    await group.save();
    res.json({ group, message: "すごいすごい" });
  } catch (error) {
    logger.error({ err: error, groupId, userId }, 'Failed to leave group');
    res.status(500).json({ message: "ばかばか" });
  }
};

export const transferOwnership = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { user, newOwner } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    //check if the user is the member
    const member = group.members.find(
      (member) => member.user.toString() === user
    );
    if (!member) {
      res.status(404).json({ message: "Member not found" });
      return;
    }

    //check if the user is the owner
    if (member.role !== "owner") {
      res.status(403).json({ message: "is owner" });
      return;
    }

    //check if new owner is a admin
    const newOwnerMember = group.members.find(
      (member) => member.user.toString() === newOwner
    );
    if (!newOwnerMember) {
      res.status(404).json({ message: "New owner not found" });
      return;
    }

    member.role = "admin";
    newOwnerMember.role = "owner";
    await group.save();
    res.json({ group, message: "すごい" });
  } catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { user } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    const isOwner = group.members.find(
      (member) => member.user === user && member.role === "owner"
    );
    if (!isOwner) {
      res.status(403).json({ message: "ばかばか" });
      return;
    }

    await group.deleteOne();
    res.json({ message: "すごいすごい" });
  } catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
};
