import React, { useEffect, useState } from "react";
import SecondaryNav from "../components/SecondaryNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfilePicOption, updateProfilePic } from "../redux/userSlice";
import Loading from "./Loading";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "react-router";

const EditProfilePic = () => {
  const { user, options, loading } = useSelector((state) => state.user);
  const [src, setSrc] = useState(user.profilePic);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (options.length == 0) {
      dispatch(fetchProfilePicOption());
    }
  }, []);

  const handleOnClick = async () => {
    const res = await dispatch(updateProfilePic(src));
    if (updateProfilePic.fulfilled.match(res)) {
      navigate("/home");
    }
  };

  return (
    <div className="h-screen w-full bg-[#0B0F1A]">
      {loading && <Loading />}
      <SecondaryNav title={"Edit profile pic"} />
      <img
        src={src}
        alt="profile"
        className="h-50 w-50 rounded-full mx-auto mt-5"
      />
      <div className="flex flex-wrap w-full px-5 pt-7 justify-center gap-4">
        {options.map((url, idx) => (
          <div className="relative">
            <img
              src={url}
              key={idx}
              className="h-18 w-18 rounded-full"
              style={{ border: url == src ? "3px solid #00FEAE" : "none" }}
              onClick={() => setSrc(url)}
            />
            {url == src ? (
              <FaCheckCircle className="absolute -bottom-1 -right-1 h-6 w-6 text-[#00FEAE]" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-5 px-5">
        <Button
          label={"Save"}
          background="#00A571"
          onClick={handleOnClick}
          disabled={src == user.profilePic}
        />
      </div>
    </div>
  );
};

export default EditProfilePic;
