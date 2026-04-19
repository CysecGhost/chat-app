export type Conversation = {
  _id: string;
  participants: string[];
  lastMessage: string;
  updatedAt: string;
};

export type Message = {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  updatedAt: string;
};
