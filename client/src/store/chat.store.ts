interface Message {
  _id?: string
  text: string
  timestamp: string
  sender?: { _id: string; username?: string; image?: string }
}
interface ChatState {
  messages: Message[]
  lastOpenedGroupId: string | null
  lastReadMessageId: string | null

  setMessages: (msg: Message[]) => void
  addMessage: (msg: Message) => void
  clearMessages: () => void

  setLastOpenedGroupId: (id: string | null) => void
  setLastReadMessageId: (id: string | null) => void
}

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useChatStore = create<ChatState>()(persist(set => ({
  messages: [],
  lastOpenedGroupId: null,
  lastReadMessageId: null,

  setMessages: (msg) => set({ messages: msg }),
  addMessage: msg => set(state => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),

  setLastOpenedGroupId: (id) => set({ lastOpenedGroupId: id }),
  setLastReadMessageId: id => set({ lastReadMessageId: id })
}), {
  name: 'chat-storage',
  storage: createJSONStorage(() => localStorage),

  partialize: (state) => ({
    lastOpenedGroupId: state.lastOpenedGroupId,
    lastReadMessageId: state.lastReadMessageId,
  })
}))

export default useChatStore