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

  if (!members.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">No members found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">Team Members</h2>
      <ul className="space-y-2">
        {members.map((m) => (
          <li
            key={m._id}
            className="flex justify-between border-b pb-1 text-sm text-gray-700"
          >
            <span>{m.name}</span>
            <span className="text-gray-500">{m.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
