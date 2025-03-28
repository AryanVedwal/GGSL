"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserCard({ user, onDelete }) {
  const router = useRouter();

  const handleEdit = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => router.push(`/users/edit/${user.id}`));
    } else {
      router.push(`/users/edit/${user.id}`);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-[1.02] hover:shadow-2xl border border-gray-200">
      <div className="relative h-40 w-full flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{`${user.first_name} ${user.last_name}`}</h3>
        <p className="text-gray-500 text-sm mb-4">{user.email}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span>Edit</span>
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
