// @ts-nocheck
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { TiPower } from "react-icons/ti";
import { HOST } from "../server";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../store/actions/user";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

const logoutSession = async () => {
  try {
    const res = await fetch(`${HOST}/api/users/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });

    const data = await res.json();

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => logoutSession(),
    onSuccess: (data) => {
      dispatch(logout);
      toast.success(data?.message);
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-4 drop-shadow-md">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-8 rounded-md" />
        <h1 className="text-xl font-semibold">
          <span className="text-green-500">Medicine</span> Reminder
        </h1>
      </div>
      <h1
        className="flex items-center gap-2 rounded-md border-2 border-neutral-400 px-2 py-1 font-semibold hover:cursor-pointer hover:bg-black/5"
        onClick={handleLogout}
      >
        Logout
        <TiPower size={20} />
      </h1>
    </div>
  );
};

export default Navbar;
