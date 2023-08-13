import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Wrapper from "./Wrapper";
import { BsBox } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../app/reducers/globalReducer";
import toast, { Toaster } from "react-hot-toast";
import { useGetProductsQuery } from "../../features/product/productService";


const Products = () => {

  let {page} = useParams();
  if(!page) {
    page = 1;
  }

  const { data = [], isFetching } = useGetProductsQuery(page ? page : 1);
  console.log(data);

  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
    }

    return () => {
      dispatch(clearMessage());
    }
  }, []);

  return (
    <Wrapper>
      <Link
        to="/dashboard/create-product"
        className="btn-dark inline-flex items-center"
      >
        <BsBox className="mr-2" />
        Create Product
      </Link>
      <Toaster position="top-right" />
    </Wrapper>
  );
};

export default Products;
