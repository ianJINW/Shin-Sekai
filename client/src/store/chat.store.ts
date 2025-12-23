interface Message {
  _id?: string
  text: string
  timestamp: string
  sender?: { _id: string; username: string; image?: string }
}
interface ChatState {
  messagesx: Message[]
  lastOpenedGroupId: string | null
  lastReadMessageId: string | null

  setMessages: (msg: Message[]) => void
  addMessage: (msg: Message) => void
  clearMessages: () => void

  setLastOpenedGoupId: (id: string | null) => void
  setLastReadMessageId: (id: string | null) => void
}

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useChatStore = create<ChatState>()(persist(set => ({
  messagesx: [],
  lastOpenedGroupId: null,
  lastReadMessageId: null,

  setMessages: (msg) => set({ messagesx: msg }),
  addMessage: msg => set(state => ({ messagesx: [...state.messagesx, msg] })),
  clearMessages: () => set({ messagesx: [] }),

  setLastOpenedGoupId: (id) => set({ lastOpenedGroupId: id }),
  setLastReadMessageId: id => set({ lastReadMessageId: id })
}), {
  name: 'chat-storagex',
  storage: createJSONStorage(() => localStorage),

  partialize: (state) => ({
    lastOpenedGroupId: state.lastOpenedGroupId,
    lastReadMessageId: state.lastReadMessageId,
  })
}))

export default useChatStore