import axios from "axios";

const url = import.meta.env.VITE_API_BACKEND_URL as string;

interface Group {
    id: string;
    name: string;
    description: string;
    members: number;
    image?: string;
}


export const getGroups = async (): Promise<Group[]> => {
    const req = await axios.get<Group[]>(`${url}/groups`);
    return req.data;
};

export const getGroup = async (id: string): Promise<Group> => {
    const req = await axios.get<Group>(`${url}/groups/${id}`);
    return req.data;
};

export const createGroup = async (group: Group): Promise<Group> => {
    const req = await axios.post<Group>(`${url}/groups`, group);
    return req.data;
};

export const updateGroup = async (group: Group): Promise<Group> => {
    const req = await axios.put<Group>(`${url}/groups/${group.id}`, group);
    return req.data;
};

export const deleteGroup = async (id: string): Promise<void> => {
    await axios.delete(`${url}/groups/${id}`);
};

export const joinGroup = async (id: string): Promise<void> => {
    await axios.post(`${url}/groups/${id}/join`);
};

export const leaveGroup = async (id: string): Promise<void> => {
    await axios.post(`${url}/groups/${id}/leave`);
};

export const getGroupMembers = async (id: string): Promise<string[]> => {
    const req = await axios.get<string[]>(`${url}/groups/${id}/members`);
    return req.data;
};
