import { type FC, type FormEvent, useState, type ChangeEvent } from "react";
import { usePostInfo } from "../lib/apiRequests";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";
import type { Member } from "../pages/group";

type GroupResponse = {
  _id?: string
  name: string
  description: string
  image: string
  members: Member[]
}

export interface GroupMember {
  user: string;
  role: "owner" | "admin" | "member";
  joinedAt?: string;
  _id?: string;
}

export interface Group {
  _id: string;
  name: string;
  description: string;
  image: string;
  members: GroupMember[];
  postsCount: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  message: string;
  group?: T;
  groups?: T[];
}


const Editor: FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const navigate = useNavigate()
  const { mutateAsync } = usePostInfo<{ group: GroupResponse; message?: string }>('api/v1/groups')
  const user = useAuthStore(s => s.user)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error("You must be logged in to create a group");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("user", user._id ?? "");

    if (imageFile) formData.append("image", imageFile);

    try {
      toast.loading("Creating group...");
      const result = await mutateAsync(formData as unknown as ApiResponse<Group>);
      toast.dismiss();
      toast.success("Group created!");

      // server returns { group, message }
      const group: GroupResponse = result?.group ?? (result as unknown as GroupResponse);
      const groupId = group?._id;

      if (groupId) {
        navigate(`/groups/${groupId}`);
      } else {
        toast.error("Group ID not found in response");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Error forming party");
      console.error(err);
    }
  };


  return (
    <main className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Input the group name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="The group description goes here"
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
            Image File
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-600"
            onChange={handleImageChange}
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="text-center">
            <p className="mb-2 text-sm font-medium text-gray-700">Image Preview</p>
            <img
              src={preview}
              alt="Preview"
              className="mx-auto w-40 h-40 object-cover rounded-md border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Save
        </button>
      </form>
    </main>
  );
};

export default Editor;
