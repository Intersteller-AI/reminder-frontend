// eslint-disable-next-line no-unused-vars
// @ts-nocheck
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/reducers/user";
import Cookies from "js-cookie";
import { HOST } from "../server";
import axios from "axios";

const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(
      `${HOST}/api/users/register`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );

    // const res = await fetch(`${HOST}/api/users/register`, {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     password,
    //   }),
    // });

    // const data = await res.json();

    // Cookies.set("token", data.token, { expires: 7, secure: false });

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      Cookies.set("user", JSON.stringify(data?.user), { expires: 7 });
      dispatch(userActions.setUserInfo(data?.user));
      toast.success("Registered Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;

    mutate({ name, email, password });
  };

  const password = watch("password");

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="container mx-auto px-5 py-10">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="mb-8 text-center font-roboto text-2xl font-bold text-dark-hard">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-6 flex w-full flex-col">
            <label
              htmlFor="name"
              className="block font-semibold text-[#5a7184]"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                minLength: {
                  value: 1,
                  message: "Name length must be atleast one character",
                },
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
              placeholder="Enter name"
              className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                errors.name ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.name?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="mb-6 flex w-full flex-col">
            <label
              htmlFor="email"
              className="block font-semibold text-[#5a7184]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
              placeholder="Enter email"
              className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                errors.email ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.email?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="mb-6 flex w-full flex-col">
            <label
              htmlFor="password"
              className="block font-semibold text-[#5a7184]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password length must be atleast six characters",
                },
                required: {
                  value: true,
                  message: "password is required",
                },
              })}
              placeholder="Enter password"
              className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                errors.password ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.password?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="mb-6 flex w-full flex-col">
            <label
              htmlFor="confirmPassword"
              className="block font-semibold text-[#5a7184]"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "confirm password is required",
                },
                validate: (value) => {
                  if (value !== password) {
                    return "Password does not match";
                  }
                },
              })}
              placeholder="Enter confirm password"
              className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
              }`}
            />
            {errors.confirmPassword?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="mb-6 w-full rounded-lg bg-primary py-4 px-8 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            Register
          </button>
          <p className="text-sm font-semibold text-[#5a7184]">
            You have an account?{" "}
            <Link to="/login" className="text-primary">
              Login now
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
