import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";
import HashLoader from "react-spinners/HashLoader";

function AllBlogs() {
  const [userData, setUserData] = useState([]);
  const [selectedUserData, setSelectedUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://blog-cards.up.railway.app/allblogs` ||
            `http://localhost:3000/allblogs`
        );
        // const response = await axios.get(`http://localhost:3000/allblogs`);
        const data = response.data.reverse();
        setIsLoading(false);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
      fetchData()
    
  }, []);

  const handleClick = (user) => {
    setSelectedUser(user);
    document.body.style.overflow = "hidden";
  };

  const closeDetails = () => {
    setSelectedUser(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="flex flex-col flex-wrap justify-center w-full bg-slate-900 items-center py-5 min-h-screen bg-gray-100">
      <div className="w-11/12 flex gap-5 justify-end items-center pb-4 border-b border-slate-600">
        <Link to="/login">
          <input
            type="button"
            value="Login"
            className="w-24 px-4 py-2 text-md font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 cursor-pointer focus:outline-none"
          />
        </Link>
        <Link to="/signup">
          <input
            type="button"
            value="Signup"
            className="w-24 px-4 py-2 text-md font-semibold text-white bg-green-500 rounded-md hover:bg-green-700 cursor-pointer focus:outline-none"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-y-5 lg:gap-y-6 mt-20 lg:mt-10 w-11/12">
        <h1 className="text-gray-200 md:text-6xl font-semibold text-4xl">
          Blog-cards
        </h1>
        <p className="text-slate-200 md:text-lg text-sm w-4/5 md:w-full text-center lg:text-left">
          Craft your unique digital cards and discover a world of creativity
          from others.
        </p>
      </div>
      <div className="flex flex-wrap justify-center w-full gap-10 py-6 min-h-screen">
        <div className="flex justify-center items-center h-[55vh]">
        {isLoading && (
          <HashLoader
            color="#36d7b7"
            size={100}
          />
        )}
        </div>
        {Array.isArray(userData) &&
          userData.map((user) => (
            <li key={user._id} onClick={() => handleClick(user)}>
              <div className="w-80 h-[380px] cursor-pointer overflow-hidden mx-4 bg-slate-200 hover:shadow-lg hover:shadow-white rounded-lg mt-6 transition duration-500 transform hover:scale-105">
                <img
                  className="w-full h-60 p-1 object-cover object-top-center rounded-t-lg"
                  src={`https://blog-cards.up.railway.app/images/${user.blogPic}`}
                  // src={`http://localhost:3000/images/${user.blogPic}`}
                  alt="User Profile"
                />
                <div className="px-4 py-1 h-36 overflow-hidden">
                  <p className="text-gray-800 font-semibold text-xl mb-2 normal-case truncate">
                    {user.title}
                  </p>
                  <p className="text-gray-700 mb-2 text-md overflow-hidden">
                    {user.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
      </div>
      {selectedUserData && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 flex justify-center items-center">
          <div className="relative flex flex-col xl:flex-row xl:justify-around bg-slate-100 rounded-lg p-3 sm:p-6 w-11/12 xl:w-3/4 h-4/5 xl:h-2/3 text-lg sm:text-lg gap-y-1 sm:gap-y-2 font-sans overflow-auto">
            <div className="w-full xl:w-1/2 flex flex-col items-start">
              {" "}
              <img
                className="w-full h-60 xl:pr-4 object-cover object-center rounded-lg"
                src={`https://blog-cards.up.railway.app/images/${selectedUserData.blogPic}`}
                // src={`http://localhost:3000/images/${selectedUserData.blogPic}`}
                alt="User Profile"
              />
              <p className="cursor-pointer text-xs mt-2 text-gray-500">
                Created: {selectedUserData.updatedAt.split("T")[0]}{" "}
              </p>
              <p className="mt-2 text-sm md:text-lg lg:text-xl font-thin">
                <b className="font-semibold text-gray-800">Author: </b>
                {selectedUserData.author.name}{" "}
              </p>
              <p className="cursor-pointer text-sm md:text-lg lg:text-xl font-medium">
                {selectedUserData.author.email}
              </p>
              <p className="cursor-pointer text-sm md:text-lg lg:text-xl font-medium">
                {selectedUserData.city}{" "}
              </p>
            </div>
            <div
              id="main"
              className="flex flex-col xl:w-1/2 text-gray-700 font-thin mt-4 mb-2 text-xl tracking-wide pr-2 xl:overflow-auto"
            >
              <p className="text-sm sm:text-lg md:text-xl mb-2 font-medium sm:font-normal tracking-wider">
                <b className="font-bold sm:font-semibold text-gray-800">
                  Title:{" "}
                </b>{" "}
                {selectedUserData.title}
              </p>
              <p className="text-sm sm:text-lg md:text-xl mb-2 font-medium sm:font-normal tracking-wider">
                <b className="font-bold sm:font-semibold text-gray-800">
                  Blog:{" "}
                </b>{" "}
                {selectedUserData.content}
              </p>
            </div>
          </div>
          <button
            className="absolute xl:bottom-10 bottom-6 sm:mt-4 w-40 mx-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeDetails}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default AllBlogs;
