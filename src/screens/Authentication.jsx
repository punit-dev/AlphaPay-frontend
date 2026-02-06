import { useState } from "react";
import Input from "../components/Input";
import AuthForm from "../components/AuthForm";
import Button from "../components/Button";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser, verifyOtp } from "../redux/authSlice";
import { useNavigate } from "react-router";

const Authentication = () => {
  const [translate, setTranslate] = useState("60%");

  const dispatch = useDispatch();
  const { otp, loading, error, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const signupFormHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);

    const allValues = Object.fromEntries(formData.entries());
    dispatch(signupUser(allValues));
  };
  const loginFormHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);

    const allValues = Object.fromEntries(formData.entries());
    dispatch(loginUser(allValues)).then(({ payload }) => {
      if (payload?.token) {
        navigate("/");
      }
    });
  };
  const verifyFormHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);

    let allValues = Object.fromEntries(formData.entries());
    allValues = { ...allValues, email: user?.email };
    dispatch(verifyOtp(allValues)).then(({ payload }) => {
      if (payload?.message === "OTP Successfully verified") {
        navigate("/");
      }
    });
  };

  if (loading) return <h2 className="text-white text-center">loading...</h2>;
  return (
    <div className="pt-18 flex flex-col px-7">
      <div className="bg-red-400 h-50 w-50 mx-auto"></div>
      <motion.div
        initial={{ translateX: translate }}
        animate={{ translateX: translate }}
        transition={{
          type: "tween",
        }}
        className="mt-10 flex items-center justify-center h-100 gap-15 ">
        {/**login form */}
        <AuthForm id={"ap-login"} formHandler={loginFormHandler}>
          <h2 className="text-white text-center text-3xl font-medium">
            Log in
          </h2>
          <p className="text-red-400 text-center">{error && error?.message}</p>
          <div className="mt-5 flex flex-col gap-4">
            <Input
              label={"Email"}
              placeholder={"john@example.com"}
              type={"email"}
              name={"email"}
            />
            <div>
              <Input
                label={"Password"}
                placeholder={"password"}
                type={"password"}
                name={"password"}
              />
              <p className="text-[#00afff] text-md font-medium font-lexend">
                Forgot password?
              </p>
            </div>
            <Button label={"Log in"} />
            <p className="text-white font-lexend text-[15px]">
              Don't have any account?{" "}
              <span
                onClick={() => setTranslate("-60%")}
                className="text-[#0aff]">
                Sign up
              </span>
            </p>
          </div>
        </AuthForm>
        {/**Choose box */}
        <AuthForm id={"ap-choose"}>
          <p className="text-white text-center text-lg mt-5">
            Your wallet, now in your pocket
          </p>
          <div className="mt-8">
            <Button label={"Log in"} onClick={() => setTranslate("180%")} />
            <div className="flex items-center w-full my-3 gap-1">
              <div className="w-full h-0.5 bg-zinc-700 rounded-full"></div>
              <p className="text-zinc-400 text-sm">OR</p>
              <div className="w-full h-0.5 bg-zinc-700 rounded-full"></div>
            </div>
            <Button
              label={"Sign up"}
              background="transparent"
              border={"2px solid #A27EFF"}
              color={"#a27eff"}
              onClick={() => setTranslate("-60%")}
            />
          </div>
        </AuthForm>
        {/**Signup form */}
        <AuthForm id={"ap-signup"} formHandler={signupFormHandler}>
          <h2 className="text-white text-center text-2xl font-medium">
            Create an account
          </h2>
          <p className="text-white mt-3 font-lexend">
            Already have an account?{" "}
            <span onClick={() => setTranslate("180%")} className="text-[#0aff]">
              Login
            </span>
          </p>
          <div className="mt-5 flex flex-col gap-4">
            <Input
              label={"Full name"}
              placeholder={"John Smith"}
              type={"text"}
              name={"fullname"}
            />
            <Input
              label={"Phone Number"}
              placeholder={"123456789"}
              type={"text"}
              name={"phoneNumber"}
            />
            <Input label={"Date of birth"} type={"date"} name={"dateOfBirth"} />
            <Input
              label={"Username"}
              placeholder={"john123"}
              type={"text"}
              name={"username"}
            />
            <Input
              label={"Password"}
              placeholder={"Password"}
              type={"password"}
              name={"password"}
            />
            <Input
              label={"Email address"}
              placeholder={"john@example.com"}
              type={"email"}
              name={"email"}
            />
            <Button
              label={"Create account"}
              onClick={() => setTranslate("-180%")}
            />
          </div>
        </AuthForm>
        {/**Email verification form */}
        <AuthForm id={"ap-verification"} formHandler={verifyFormHandler}>
          <h2 className="text-white text-center text-2xl font-medium">
            Verify your email
          </h2>
          <p className="text-white">{otp}</p>
          <div className="flex gap-4 flex-col">
            <p className="text-white mt-8">
              please enter 6 digit code sent to {user?.email}
            </p>
            <Input type={"text"} name={"otp"} />
            <Button label={"Verify"} />
          </div>
        </AuthForm>
      </motion.div>
    </div>
  );
};

export default Authentication;
