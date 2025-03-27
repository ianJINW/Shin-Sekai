
import { useEffect, useState } from "react";
import image from "../../assets/47698 (1).png";
import data from "./data.json";
import { Link } from "react-router-dom";
import { useGroupStore } from "../../stores/group.store";

 interface GroupGetails {
   name: string;
   description: string;
   members: number;
 }
const Groups = () => {
  const {fetchGroups} = useGroupStore((state) => ({
    fetchGroups: state.fetchGroups,
  }));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchGroups()
  }, [ fetchGroups]);
  return (
    <div className="w-[95%] mx-auto p-6 bg-white shadow-lg rounded-xl border">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search groups..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          {/* Table Header */}
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Group Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Members</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((group, index) => (
              <tr
                key={group.name}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="py-3 px-4 flex">
                  <Link to={`/groups/${group.id}`}>
                    <img src={image} alt="group" className="w-10 h-10 mr-2" />
                    {group.name}
                  </Link>
                </td>

                <td className="py-3 px-4">{group.description}</td>
                <td className="py-3 px-4">{group.members}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Groups;
