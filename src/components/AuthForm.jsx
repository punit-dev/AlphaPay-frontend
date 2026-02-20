import React, { useEffect, useRef } from "react";

const AuthForm = ({
  children,
  formHandler = (e) => e.preventDefault(),
  id,
  setIsDisable,
}) => {
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.addEventListener("input", () => {
      const isValid = formRef.current.checkValidity();

      if (isValid) {
        setIsDisable(false);
      } else {
        setIsDisable(true);
      }
    });
  }, []);

  return (
    <div className="w-full h-auto min-h-60 max-h-110 bg-linear-140 from-blue-400 to-purple-400 rounded-2xl p-0.5 shrink-0 ">
      <form
        ref={formRef}
        id={id}
        className="h-auto min-h-60 max-h-109 w-full bg-black rounded-2xl px-6 py-5 overflow-y-auto font-urbanist"
        onSubmit={formHandler}>
        {children}
      </form>
    </div>
  );
};

export default AuthForm;
