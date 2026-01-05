import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Test() {
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();
  const listRef = useRef(null);

  const scrollPos = useRef(0);

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get('https://dummyjson.com/users');
      return res.data.users;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = scrollPos.current;
    }
  }, []);

  if (isLoading) return <p className="text-center text-3xl mt-10">Loading users...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading users</p>;

  return (
    <div ref={listRef}>
      <h1 className="text-4xl text-center font-bold py-5 text-blue-500">{counter}</h1>

      <div className="flex gap-3 items-center justify-center py-3">
        <button
          className="border border-green-400 py-1 px-5 cursor-pointer hover:bg-green-200 transition-all duration-200 bg-white"
          onClick={() => setCounter(counter + 1)}
        >
          increment
        </button>
        <button
          className="border border-green-400 py-1 px-5 cursor-pointer hover:bg-green-200 transition-all duration-200 bg-white"
          onClick={() => setCounter(counter - 1)}
        >
          decrement
        </button>
      </div>

      <div className="flex justify-center">
        <button
          className="border border-red-400 py-1 px-5 cursor-pointer hover:bg-red-200 transition-all duration-200 bg-white"
          onClick={() => setCounter(0)}
        >
          reset
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mx-5">
        {users.map(user => (
          <div
            key={user.id}
            onClick={() => {
              scrollPos.current = listRef.current.scrollTop;
              navigate(`/users/user/${user.id}`);
            }}
            className="my-5 border py-3 px-5 cursor-pointer bg-white hover:shadow-lg transition-all duration-300 rounded-lg"
          >
            <h3 className="font-bold">First Name: {user.firstName}</h3>
            <h3 className="font-bold">Last Name: {user.lastName}</h3>
            <p className="text-sm">Email: {user.email}</p>
            <p className="text-sm">Age: {user.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Test;
