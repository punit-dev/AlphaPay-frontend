import React from "react";

const SecondarySectionDiv = ({
  label,
  children,
  border = false,
  background = true,
  onClick,
}) => {
  return (
    <div className="relative mt-11">
      <div
        className={`bg-linear-90 w-fit ${border ? "from-[#00AFFF] to-[#A27EFF] px-0.5 pt-0.5" : "bg-transparent"} rounded-t-lg`}>
        <div className="py-1 px-4 text-white bg-[#202224] rounded-t-lg">
          <p className="text-center text-xl font-medium">{label}</p>
        </div>
      </div>
      <div
        className={`min-h-30 w-full border-2 border-b-transparent border-x-transparent ${border ? "border-t-[#00AFFF]" : "border-t-[#202224]"} border-t-[#00AFFF] p-0.5`}>
        <div
          className={`mt-3 ${background ? "bg-[#0B0F1A]" : "bg-transparent"} min-h-30 w-full rounded-lg px-2 py-2 flex flex-col gap-2`}>
          {background ? (
            <button
              onClick={onClick}
              className={"text-[#5AC8FA] text-right text-sm"}>
              See all
            </button>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

export default SecondarySectionDiv;
