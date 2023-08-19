import { BsHandbag, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full h-[70px] flex items-center shadow-md fixed top-0 right-0 left-0">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src="./logo.jpg"
              className="h-[70px] w-[130px] rounded-md object-cover"
              alt="logo"
            />
          </Link>
          <ul className="flex items-center">
            <li className="nav__item cursor-pointer">
              <BsSearch size={22} />
            </li>
            <li className="nav__item text-black">
              <Link to="/login" className="nav__link">
                Sign In
              </Link>
            </li>
            <li className="nav__item relative">
              <Link to="/cart">
                <BsHandbag size={20} />
                <span className="nav__circle">10</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
