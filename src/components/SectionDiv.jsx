const SectionDiv = ({ label, icons }) => {
  return (
    <div className="relative mt-11">
      <div className="bg-linear-90 from-[#00AFFF] to-[#A27EFF] w-fit px-0.5 pt-0.5 rounded-t-lg">
        <div className="py-1 px-4 text-white bg-[#202224] rounded-t-lg">
          <p className="text-center text-xl font-urbanist font-medium">
            {label}
          </p>
        </div>
      </div>
      <div className="min-h-30 w-full bg-[#202224] bg-linear-90 from-[#00AFFF] to-[#A27EFF] p-0.5 rounded-b-lg rounded-tr-lg font-lexend">
        <div className="min-h-30 w-full bg-[#202224] rounded-b-lg rounded-tr-lg p-1.5">
          <div className="min-h-30 w-full bg-black rounded-lg flex flex-wrap gap-7.25 px-3 py-4 items-center">
            {icons}
          </div>
        </div>
      </div>
      <div className="absolute bg-[#202224] h-1 w-42.5 top-[37.5px] left-0.5"></div>
    </div>
  );
};

export default SectionDiv;
