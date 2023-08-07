import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import { BsArrowLeft } from "react-icons/bs";
import Spinner from "../../components/Spinner";
import ScreenHeader from "../../components/ScreenHeader";
import { useAllCategoriesQuery } from "../../features/category/categoryService";

const CreateProduct = () => {
  const { data = [], isFetching } = useAllCategoriesQuery();
  console.log(data.categories, isFetching);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link
          to="/dashboard/products"
          className="btn-dark inline-flex items-center"
        >
          <BsArrowLeft className="mr-2" />
          Products List
        </Link>
      </ScreenHeader>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full xl:w-8/12 p-3">
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 p-3">
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                placeholder="Product Title..."
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <input
                type="number"
                name="price"
                id="price"
                className="form-control"
                placeholder="Product Price..."
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <input
                type="number"
                name="discount"
                id="discount"
                className="form-control"
                placeholder="Discount..."
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              <input
                type="number"
                name="stock"
                id="stock"
                className="form-control"
                placeholder="Stock..."
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              {!isFetching ? (
                data.categories.length > 0 && (
                  <select name="categories" id="categories" className="form-control">
                    <option value="">Choose Category...</option>
                    {data?.categories?.map(category => (
                        <option value={category.name} key={category._id} className="capitalize">{category.name}</option>
                    ))}
                  </select>
                )
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
        <div className="w-full xl:w-4/12 p-3">Colors and Images</div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
