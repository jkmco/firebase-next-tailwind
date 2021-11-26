import { RiLoader3Line } from "react-icons/ri";

export default function Loader({ show }) {
  return show ? (
    <div className="text-xl">
      <RiLoader3Line className="animate-spin" />
    </div>
  ) : null;
}
