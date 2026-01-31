import React from "react";

const AuthForm = ({
  children,
  formHandler = (e) => e.preventDefault(),
  id,
}) => {
  return (
    <div className="w-full h-auto min-h-60 max-h-110 bg-linear-140 from-blue-400 to-purple-400 rounded-2xl p-0.5 shrink-0 ">
      <form
        id={id}
        className="h-auto min-h-60 max-h-109 w-full bg-black rounded-2xl px-6 py-5 overflow-y-auto"
        onSubmit={formHandler}>
        {children}
      </form>
    </div>
  );
};

export default AuthForm;
