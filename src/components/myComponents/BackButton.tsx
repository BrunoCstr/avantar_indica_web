import { IoChevronBack } from "react-icons/io5";

interface BackButtonProps {
    onClick: () => void;
}

export function BackButton({onClick}: BackButtonProps) {
  return (
    <div className="border-[1px] items-center flex justify-center rounded-md w-7 h-7 cursor-pointer border-blue"
    onClick={onClick}
    >
      <IoChevronBack color="#29F3DF" size={22} className="justify-center items-center"/>
    </div>
  );
}
