import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import { BsBox } from "react-icons/bs";

const Products = () => {
  return (
    <Wrapper>
      <Link
        to="/dashboard/create-product"
        className="btn-dark inline-flex items-center"
      >
        <BsBox className="mr-2" />
        Create Product
      </Link>
    </Wrapper>
  );
};

export default Products;
