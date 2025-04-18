
import { create } from "zustand";
import { getGroups } from "../services/groupServices";


interface Group {
    id: string;
    name: string;
    description: string;
    members: number;
}

interface GroupState {
    groups: Group[];
    setGroups: (groups: Group[]) => void;
    addGroup: (group: Group) => void;
    removeGroup: (id: string) => void;
    fetchGroups: () => Promise<void>;
}


export const useGroupStore = create<GroupState>((set) => ({
    groups: [],
    setGroups: (groups) => set({ groups }),
    addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
    removeGroup: (id) => set((state) => ({ groups: state.groups.filter((group) => group.id !== id) })),

    fetchGroups: async () => {
        const groups = await getGroups();
        set({ groups });
    },


}));








