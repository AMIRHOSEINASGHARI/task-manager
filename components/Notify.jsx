import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notify = (status, text) => {
  const options = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "light",
  };
  if (status === "success") {
    toast.success(text, options);
  } else if (status === "failed") {
    toast.error(text, options);
  } else if (status === "warning") {
    toast.warn(text, options);
  }
};

export default Notify;
