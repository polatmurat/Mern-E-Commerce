import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { BsPlusLg } from "react-icons/bs";

const Categories = () => {
  return (
    <Wrapper>
        <ScreenHeader>
            <Link to="/dashboard/create-category" className="btn-dark inline-flex items-center"><BsPlusLg className="mr-2"/>Add Categories</Link>
        </ScreenHeader>
        
        Destina Polat</Wrapper>
  );
};

export default Categories;
