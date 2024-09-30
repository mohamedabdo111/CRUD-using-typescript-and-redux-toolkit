import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../../util/header";
import { Button, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputErrors from "../../util/InputErrors";
import { RootState, useAppDispatch } from "../../redux/store";
import { PostAuth } from "../../redux/slices/authReducer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CookieServices from "../../services/cookieService";
export interface IFormInputLogin {
  email: string;
  password: string;
  data: {};
}
const Login = () => {
  const dispatch = useAppDispatch();
  const [isPress, setIsPress] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputLogin>();
  const onSubmit: SubmitHandler<IFormInputLogin> = async (data) => {
    setIsPress(true);
    await dispatch(PostAuth(data));
    setIsPress(false);
  };

  const { error, isLoading, login } = useSelector(
    (item: RootState) => item.Auth
  );

  useEffect(() => {
    if (isLoading === false) {
      if (error?.response?.status === 400) {
        toast.error(error?.response?.data);
      } else {
        CookieServices.set("UserData", login);

        window.location.href = "/";
      }
    }
  }, [isLoading]);
  return (
    <>
      <Header></Header>
      <main className=" signin mx-auto mt-5 rounded-4 shadow p-4 position-relative">
        <header className="text-center ">
          <h3 className=" border-start border-5 border-warning mx-auto px-3 title-header">
            CRUD
          </h3>
          <h5 className="title-header mx-auto my-3">LOGIN</h5>
          <p className="text-secondary">
            Enter your credentials to access your account
          </p>
        </header>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <Col sm="12">
              <input
                {...register("email", { required: "Email is required" })}
                className=" input-group-text text-start mt-3 w-100"
                placeholder="Email"
                type="email"
              />
              {errors?.email?.message ? (
                <InputErrors msg={errors?.email?.message}></InputErrors>
              ) : null}
            </Col>
            <Col sm="12">
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className=" input-group-text text-start mt-3 w-100"
                placeholder="Password"
              />

              {errors?.password?.message ? (
                <InputErrors msg={errors.password.message}></InputErrors>
              ) : null}
            </Col>
            <Col sm={12}>
              <Button
                type="submit"
                className={`w-100 bg-warning border-0 p-2 mt-3 ${
                  isPress && isLoading ? "disabled" : null
                } `}
              >
                {isPress ? (
                  isLoading ? (
                    <>
                      <Spinner animation="border" role="status" size="sm" />{" "}
                      Loading
                    </>
                  ) : (
                    "Login"
                  )
                ) : (
                  "Login"
                )}
              </Button>
            </Col>

            <p className=" text-secondary text-center mt-2">
              Don't have an account
              <Link to={"/register"} className=" text-warning">
                Register
              </Link>
            </p>
          </form>
        </section>
      </main>
      <Toaster></Toaster>
    </>
  );
};

export default Login;
