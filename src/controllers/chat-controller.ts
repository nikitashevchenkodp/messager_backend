import express, { Request, Response } from 'express';
import Chat from '../schemas/Chat';
import User from '../schemas/User';
import Message from '../schemas/Message';

class ChatsController {
  async addChat(req: Request, res: Response) {
    try {
      const members = req.body.members;
      const newChat = await Chat.create({ members });

      const chatMembers = await User.find({ _id: { $in: members } });
      const users = await Promise.all(
        chatMembers.map(async (member) => {
          const newUserChats = [...member.chats, newChat._id];
          return await User.findByIdAndUpdate(member._id, { chats: newUserChats }, { new: true });
        })
      );
      return res.status(200).json({ newChat, users });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getAllChats(req: Request, res: Response) {
    try {
      const currentUserId = req.headers.authorization;
      const currentUser = await User.findById(currentUserId);
      console.log(currentUser);

      if (!currentUser) {
        throw new Error('not such user');
      }
      //find all user chats
      const records = await Chat.find({ _id: { $in: currentUser.chats } });

      const result = await Promise.all(
        records.map(async (chat) => {
          const lastMessage = await Message.findById(chat.lastMessage);
          const { _id, members } = chat;
          return { _id, members, lastMessage };
        })
      );

      return res.status(200).json(result);
    } catch (error) {}
  }
}

export const chatsController = new ChatsController();
