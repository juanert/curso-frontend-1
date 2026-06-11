import { IoMenu } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="grid grid-cols-3 py-4 px-8">
      <div>
        <IoMenu />
        <p>logo</p>
      </div>
      <div>
        <div>
          <input type="text" />
          <button></button>
        </div>
        <button></button>
      </div>
      <div></div>
    </nav>
  );
}

