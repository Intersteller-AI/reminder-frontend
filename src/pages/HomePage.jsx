// @ts-nocheck
import { useEffect } from "react";
import toast from "react-hot-toast";
import Tasks from "../components/Tasks/Tasks";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";


export default function Home() {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      toast.error("Please Login to continue! 😠");
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <div className="relative h-screen w-full">
      <Navbar/>
      <Tasks />
    </div>
  );
}
