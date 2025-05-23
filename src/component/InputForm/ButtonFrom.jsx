import { memo } from "react";

const ButtonFrom = ({ onClick, text, textColor, bgColor, px, IcAfter, magrin, fullWidth, manage }) => {
  return (
    <button
      type="button"
      className={`
      py-2 ${textColor} ${bgColor} ${px} ${magrin} ${fullWidth && "w-full"} 
      outline-none rounded-md hover:underline flex items-center justify-center gap-1 xs:w-full md:text-xs ${manage ? 'md:w-fit' : "md:w-fit"}`}
      onClick={onClick}
    >
      <span>{text}</span>
      {IcAfter && <IcAfter />}
    </button>
  )
};

export default memo(ButtonFrom);
