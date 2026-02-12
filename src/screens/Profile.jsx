import React from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import Loading from "./Loading";
import ErrorScreen from "./ErrorScreen";
import SecondaryNav from "../components/SecondaryNav";

const Profile = () => {
  const { loading, user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (loading) return <Loading />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <div className="h-screen w-full bg-[#0B0F1A]">
      <SecondaryNav />

      <div className="flex justify-center items-center mt-5 px-5 py-3 gap-5">
        <div className="font-urbanist font-semibold text-right w-full">
          <h3 className="text-xl text-[#B0B8C3]">{user.fullname}</h3>
          <p className="text-xl text-white">{user.upiId}</p>
        </div>
        <img
          src={user.profilePic}
          alt="profile"
          className="h-22.5 w-22.5 rounded-full"
        />
      </div>

      <div className="px-5 mt-10">
        <Button label={"Logout"} onClick={() => dispatch(logoutUser())} />
      </div>
    </div>
  );
};

export default Profile;
