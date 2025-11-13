"use client";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import toast from "react-hot-toast";

interface Member {
  _id: string;
  name: string;
  email: string;
}

export default function TeamMembers() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axiosClient.get("/team/members");
        setMembers(res.data);
      } catch {
        toast.error("Failed to fetch team members");
      }
    };
    fetchMembers();
  }, []);

  if (!members.length)
    return (
      <p className="text-sm text-black text-center py-4">
        No team members yet.
      </p>
    );

   return (
    <ul className="divide-y divide-gray-200">
      {members.map((m) => (
        <li
          key={m._id}
          className="flex justify-between items-center py-3 hover:bg-gray-50 transition rounded-md px-3"
        >
          <div>
            <p className="text-sm font-medium text-black">
              {m.name}
            </p>
            <p className="text-xs text-gray-500">
              {m.email}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
