import { useState } from "react";
import Input from "../components/Input";
import AuthForm from "../components/AuthForm";
import Button from "../components/Button";
import { motion } from "motion/react";

const Authentication = () => {
  const [translate, setTranslate] = useState("60%");
  const formHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);

    const allValues = Object.fromEntries(formData.entries());
    console.log(allValues);
  };
  return (
    <div className="pt-18 flex flex-col">
      <div className="bg-red-400 h-50 w-50 mx-auto"></div>
      <motion.div
        initial={{ translateX: "60%" }}
        animate={{ translateX: translate }}
        transition={{
          type: "tween",
        }}
        className="mt-10 flex items-center justify-center h-100 gap-15 ">
        {/**login form */}
        <AuthForm formHandler={formHandler}>
          <h2 className="text-white text-center text-2xl font-medium">
            Log in
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <Input
              label={"Username"}
              placeholder={"john123"}
              type={"text"}
              name={"username"}
            />
            <div>
              <Input
                label={"Password"}
                placeholder={"password"}
                type={"password"}
                name={"password"}
              />
              <p className="text-[#00afff] text-lg font-medium">
                forgot password?
              </p>
            </div>
            <Button label={"Log in"} />
            <p className="text-white">
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
        <AuthForm>
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
        <AuthForm>
          <h2 className="text-white text-center text-2xl font-medium">
            Create an account
          </h2>
          <p className="text-white mt-3">
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
              label={"Confirm password"}
              placeholder={"Confirm password"}
              type={"password"}
              name={"confirmPassword"}
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
        <AuthForm>
          <h2 className="text-white text-center text-2xl font-medium">
            Verify your email
          </h2>
          <div className="flex gap-4 flex-col">
            <p className="text-white mt-8">
              please enter 6 digit code sent to youremail@gmail.com
            </p>
            <Input type={"text"} />
            <Button label={"Verify"} />
          </div>
        </AuthForm>
      </motion.div>
    </div>
  );
};

export default Authentication;
