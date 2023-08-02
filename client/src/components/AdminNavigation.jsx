import { Link } from "react-router-dom";
import {BsFilterLeft} from 'react-icons/bs';

const AdminNavigation = ({openSidebar}) => {
  return (
    <nav className="fixed left-0 sm:left-64 top-4 right-0">
      <div className="bg-palette3 w-full flex justify-between items-center p-4">
        <BsFilterLeft className="text-white text-3xl cursor-pointer sm:hidden block" onClick={openSidebar} />
        <Link
          to="/"
          className="py-2 px-4 bg-indigo-600 text-white rounded-md capitalize"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavigation;
