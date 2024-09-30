import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../../util/header";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputErrors from "../../util/InputErrors";
import { RootState, useAppDispatch } from "../../redux/store";
import { PostRegister } from "../../redux/slices/authReducer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
export interface IFormInput {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Register = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password not match");
      return;
    }
    await dispatch(PostRegister(data));
  };

  const { error, isLoading, registers } = useSelector(
    (item: RootState) => item.Auth
  );

  useEffect(() => {
    if (isLoading === false) {
      if (error?.response.data) {
        toast.error(error?.response.data);
      } else if (registers.status === 200) {
        toast.success("Done , Please wait");

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
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
          <h5 className="title-header mx-auto my-3">REGITER</h5>
          <p className="text-secondary">
            Enter your credentials to access your account
          </p>
        </header>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className="row">
            <Col sm="6" className="mt-3">
              <input
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className=" input-group-text text-start w-100"
                placeholder="First Name"
                type="text"
              />
              {errors?.firstName?.message ? (
                <InputErrors msg={errors?.firstName?.message}></InputErrors>
              ) : null}
            </Col>
            <Col sm="6" className="mt-3">
              <input
                {...register("lastName", { required: "Last name is required" })}
                className=" input-group-text text-start w-100 "
                placeholder="Last Name"
                type="text"
              />
              {errors?.lastName?.message ? (
                <InputErrors msg={errors?.lastName?.message}></InputErrors>
              ) : null}
            </Col>
            <Col sm="12">
              <input
                {...register("userName", { required: "UserName is required" })}
                className=" input-group-text text-start mt-3 w-100"
                placeholder="UserName"
                type="text"
              />
              {errors?.userName?.message ? (
                <InputErrors msg={errors?.userName?.message}></InputErrors>
              ) : null}
            </Col>
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
                type="password"
                {...register("password", {
                  required: "password is required",
                  minLength: 6,
                })}
                className=" input-group-text text-start mt-3 w-100"
                placeholder="Password"
              />
              {errors?.password?.message ? (
                <InputErrors msg={errors?.password?.message}></InputErrors>
              ) : null}
            </Col>
            <Col sm="12">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className=" input-group-text text-start mt-3 w-100"
                placeholder="Confirm Password"
              />
              {errors?.confirmPassword?.message ? (
                <InputErrors
                  msg={errors?.confirmPassword?.message}
                ></InputErrors>
              ) : null}
            </Col>

            <Col sm={12}>
              <Button
                type="submit"
                className={`w-100 bg-warning border-0 mt-3`}
              >
                register
              </Button>
            </Col>
            <p className=" text-secondary text-center">
              Do you have an account?
              <Link to={"/login"} className=" text-warning">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </section>
        <Toaster></Toaster>
      </main>
    </>
  );
};

export default Register;
