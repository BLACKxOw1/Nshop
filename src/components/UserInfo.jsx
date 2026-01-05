import { useParams, useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

function UserInfo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const users = queryClient.getQueryData(['users'])
  const user = users?.find(u => u.id === Number(id))

  if (!user) {
    return <p className="text-center mt-10 text-2xl">User not found</p>
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-100">
        <img
          src={user.image}
          alt={user.firstName}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold text-center">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-center text-gray-500">{user.email}</p>

        <div className="mt-4 space-y-2">
          <p><b>Age:</b> {user.age}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Gender:</b> {user.gender}</p>
          <p><b>Address:</b> {user.address.city}</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  )
}

export default UserInfo
