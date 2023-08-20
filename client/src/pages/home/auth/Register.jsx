import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/home/Header";
import Nav from "../../../components/home/Nav";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useUserRegisterMutation } from "../../../features/auth/authService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../../app/reducers/authReducer";
import { setSuccess } from "../../../app/reducers/globalReducer";
import { useForm } from "../../../hooks/Form";
import { ShowError } from "../../../utils/ShowError";

const Register = () => {
  const [errors, setErrors] = useState([]);

  // const [state, setState] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  const { state, onChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [registerUser, response] = useUserRegisterMutation();
  console.log(response);

  // const onChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(state);
  };

  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response?.error?.data]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("user-token", response?.data?.token);
      dispatch(setUserToken(response?.data?.token));
      dispatch(setSuccess(response?.data?.msg));
      navigate("/user");
    }
  }, [response.isSuccess]);

  const showErrors = (name) => {
    const exist = errors.find((err) => err.path === name);
    if (exist) {
      return exist.msg;
    } else {
      return false;
    }
  };

  return (
    <>
      <Nav />
      <div className="mt-[70px] pb-[80px]">
        <Header>Sign Up</Header>
        <div className="flex flex-wrap justify-center">
          <motion.div
            initial={{ opacity: 0, x: "100vw" }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full sm:w-10/12 md:w-8/12 lg:6/12 xl:w-5/12 p-6"
          >
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-lg -mt-12 border border-gray-200 p-10"
            >
              <h1 className="heading mb-5">Sign Up</h1>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`form-input ${
                    ShowError(errors, "name")
                      ? "border-rose-600"
                      : "border-gray-300"
                  }`}
                  placeholder="Name..."
                  value={state.name}
                  onChange={onChange}
                />
                {showErrors("name") && (
                  <span className="error">{ShowError(errors, "name")}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`form-input ${
                    ShowError(errors, "email")
                      ? "border-rose-600"
                      : "border-gray-300"
                  }`}
                  placeholder="E-mail..."
                  value={state.email}
                  onChange={onChange}
                />
                {ShowError(errors, "email") && (
                  <span className="error">{ShowError(errors, "email")}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`form-input ${
                    ShowError(errors, "password")
                      ? "border-rose-600"
                      : "border-gray-300"
                  }`}
                  placeholder="Password..."
                  value={state.password}
                  onChange={onChange}
                />
                {ShowError(errors, "password") && (
                  <span className="error">{ShowError(errors, "password")}</span>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="submit"
                  value={response.isLoading ? "Loading..." : "Sign Up"}
                  disabled={response.isLoading ? true : false}
                  className="btn btn-indigo w-full"
                />
              </div>
              <div>
                <p>
                  Already have an account ?{" "}
                  <span className="font-medium text-base text-black capitalize">
                    <Link to="/login">Login</Link>
                  </span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
