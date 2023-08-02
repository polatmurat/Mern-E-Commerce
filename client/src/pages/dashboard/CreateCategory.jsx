import { Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { BsArrowLeft } from "react-icons/bs";

const CreateCategory = () => {
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
        <h3 className="text-lg capitalize mb-3">Create Category</h3>
        <div className="mb-3">
            <input type="text" name="" className="form-control" placeholder="Category Name..." />
        </div>
        <div className="mb-3 flex justify-center">
            <input type="submit" value="Create Category" className="btn-indigo" />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
