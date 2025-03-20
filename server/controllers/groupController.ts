import { Request, Response } from "express";
import Group from "../models/groupModel";

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find();
    res.json({ groups, message: "すごいすごい" });
  } catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
};


export const createGroup = async (req: Request, res: Response) => {
  const { name, description, image, user } = req.body;
  if (!user) {
    res.status(400).json({ message: "ばかばか" });
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
    res.json({ group, message: "すごいすごい" });
  } catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
};

export const joinGroup = async (req: Request, res: Response) => {
  const {groupId} = req.params;
  const { user } = req.body;
  if (!user) {
    res.status(400).json({ message: "ばかばか" });
    return;
  }

  if (!groupId) {
    res.status(400).json({ message: "ばかばか" });
    return;
  }
  try{
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    const isMember = group.members.find((member) => member.user === user);
    if (isMember) {
      res.status(400).json({ message: "ばかばか" });
      return;
    }
    group?.members.push({ user, role: "member" });
    await group?.save();
    res.json({ group, message: "すごいすごい" });
  }
  catch (error) {
    res.status(500).json({ message: "ばかばか" });
  }
}
