import { Link, useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { BsArrowLeft } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSuccess } from "../../app/reducers/globalReducer";
import { useFetchCategoryQuery } from "../../features/category/categoryService";


const UpdateCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState("");
  const {id} = useParams();
  const {data, isFetching} = useFetchCategoryQuery(id);
  console.log('category data : *** ', data);
//   const errors = data?.error?.data?.errors ? data?.error?.data?.errors : [];
//   const submitCategory = (event) => {
//     event.preventDefault();
//     saveCategory({ name: state });
//   };

//   useEffect(() => {
//     if (data?.isSuccess) {
//       dispatch(setSuccess(data?.data?.msg));
//       navigate("/dashboard/categories");
//     }
//   }, [data?.isSuccess]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link
          to="/dashboard/categories"
          className="btn-dark inline-flex items-center"
        >
          <BsArrowLeft className="mr-2" />
          Category List
        </Link>
      </ScreenHeader>
      <form className="w-full md:w-8/12">
        <h3 className="text-lg capitalize mb-3">Update Category</h3>
        {/* {errors.length > 0 &&
          errors.map((error, key) => (
            <div key={key} className="my-4">
              <p className="alert-danger">{error.msg}</p>
            </div>
          ))} */}
        <div className="mb-3">
          <input
            type="text"
            name=""
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="form-control"
            placeholder="Category Name..."
          />
        </div>
        <div className="mb-3 flex justify-center">
          <input
            type="submit"
            value='Update'
            className="btn-indigo"
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default UpdateCategory;
