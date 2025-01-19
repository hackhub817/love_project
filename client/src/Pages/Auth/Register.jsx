import { useState, Fragment, useEffect } from "react";
import { IoLogoFacebook } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, sendOtp } from "../api/Api";

import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { toast } from "sonner";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SocialLoginButton = () => (
  <Fragment>
    <button className="flex items-center justify-center w-full px-6 py-3 mt-4 text-white bg-blue-600 rounded">
      <IoLogoFacebook className="mr-2 text-white " />
      <span className="text-center">Continue with Facebook</span>
    </button>
    <button className="flex items-center justify-center w-full px-6 py-3 mt-4 text-white bg-red-500 rounded">
      <FaGoogle className="mr-2 text-white " />
      <span className="text-center">Continue with Google</span>
    </button>
  </Fragment>
);

const SignUpForm = () => {
  const [loaderActive, setLoaderActive] = useState(false);
  const [timer, setTimer] = useState(60);
  const [showResendButton, setShowResendButton] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResendButton(true); // Show resend button when timer hits 0
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup timer
  }, [timer]);

  // Parse the URL and extract the referral code

  const [phone, setPhone] = useState("");
  const [isLoadingResendOtp, setIsLoadingResendOtp] = useState(false);
  const [registerData, setRegisterData] = useState({
    userEmail: "",
    fullName: "",
    userPassword: "",
    confirmPassword: "",
    phoneNumber: "",
    userName: "",
    otp: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  }

  const handleEyeClick = () => {
    setEye(!eye);
  };

  const register = async (e) => {
    e.preventDefault();
    setLoaderActive(true);
    setRegisterData({
      ...registerData,
      phoneNumber: phone,
    });

    const {
      userEmail,
      userPassword,
      fullName,
      confirmPassword,
      phoneNumber,
      userName,
    } = registerData;
    if (
      !userEmail ||
      !userPassword ||
      !fullName ||
      !confirmPassword ||
      !userName
    ) {
      setLoaderActive(false);
      return toast.error("Please fill all the fields!");
    }

    if (phoneNumber) {
      if (
        !phoneNumber.match(
          /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?[\d-.\s]{7,14}$/
        )
      ) {
        setLoaderActive(false);
        return toast.error("Phone number is invalid!");
      }
    }

    if (!userEmail.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
      setLoaderActive(false);
      return toast.error("Email is Invalid!");
    }

    if (userPassword.length < 8) {
      setLoaderActive(false);
      return toast.error("Password must contain Minimum eight characters!");
    }

    if (userPassword !== confirmPassword) {
      setLoaderActive(false);
      return toast.error("Password and confirm password must be same!");
    }
    if (isOtp) {
      try {
        const response = await registerUser(registerData); // Call the API
        console.log(response);

        if (response?.success) {
          // Store token and user data
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));

          setLoaderActive(false);
          navigate("/dashboard");
          setRegisterData({
            userEmail: "",
            userPassword: "",
            fullName: "",
          });
        } else {
          setLoaderActive(false);
          // Handle the case where response.success is false
          console.error(
            "Registration failed:",
            response?.message || "Unknown error."
          );
          toast.error(
            response?.message || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        // Catch any errors thrown during the API call
        setLoaderActive(false);

        if (error.response) {
          // The server responded with an error status
          console.error("API Error:", error.response.data);
          toast.error(
            error.response.data.message ||
              "An error occurred during registration."
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Network Error:", error.request);
          toast.error(
            "Unable to connect to the server. Please check your network connection."
          );
        } else {
          // Something unexpected happened
          console.error("Unexpected Error:", error.message);
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    } else {
      const response = await sendOtp(registerData);
      console.log(response);
      setIsOtp(true);
      setTimer(60); // Start countdown at 60 seconds
      setShowResendButton(false);
      if (response?.status) {
        setLoaderActive(false);
        console.log("OTP Send Successfully");
        toast.success("OTP Send Successfully");
      } else {
        setLoaderActive(false);
      }
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    setRegisterData({
      ...registerData,
      phoneNumber: phone,
    });
    setIsLoadingResendOtp(true);
    const { userEmail } = registerData;
    if (!userEmail) {
      setLoaderActive(false);
      setIsLoadingResendOtp(false);
      return toast.error("Email is Required!!");
    }

    if (!userEmail.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
      setLoaderActive(false);
      setIsLoadingResendOtp(false);
      return toast.error("Email is Invalid!");
    }
    const response = await resendOtp({
      userEmail: registerData.userEmail,
    });

    if (response?.success) {
      setLoaderActive(false);
      setIsLoadingResendOtp(false);
      toast.success("Resent otp is done !!");
    } else {
      setLoaderActive(false);
      setIsLoadingResendOtp(false);
    }
  };

  return (
    <form noValidate onSubmit={register}>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mx-2 mb-6">
            <label
              htmlFor="fullName"
              className="mb-1 text-[0.85rem]  font-semibold"
            >
              Full Name
            </label>
            <input
              type="text"
              className="px-4 leading-10 rounded-md bg-blue-50 focus:outline-none focus:border focus:border-blue-600 "
              id="fullName"
              placeholder="Your Full Name"
              name="fullName"
              onChange={handleUserInput}
              value={registerData?.fullName}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mx-2 mb-6">
            <label
              htmlFor="userName"
              className="mb-1 text-[0.85rem]  font-semibold"
            >
              userName
            </label>
            <input
              type="text"
              className="px-4 leading-10 rounded-md bg-blue-50 focus:outline-none focus:border focus:border-blue-600 "
              id="userName"
              placeholder="Please Enter unique user name"
              name="userName"
              onChange={handleUserInput}
              value={registerData?.userName}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mx-2 mb-6">
            <label
              htmlFor="userEmail"
              className="mb-1 text-[0.85rem]  font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              className="px-4 leading-10 rounded-md bg-blue-50 focus:outline-none focus:border focus:border-blue-600 "
              id="userEmail"
              placeholder="Your email..."
              name="userEmail"
              onChange={handleUserInput}
              value={registerData?.userEmail}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col mx-2 mb-6">
            <label
              htmlFor="phone"
              className="mb-1 text-[0.85rem]  font-semibold"
            >
              Phone Number
            </label>
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={setPhone}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              containerClass="mb-4 w-full"
              inputClass="focus:outline-none focus:border-blue-700 border-gray-300 text-gray-800 rounded-md w-full py-2 px-3"
              buttonClass="bg-gray-200 focus:outline-none focus:border focus:border-blue-600 rounded-l-md"
              dropdownClass="custom-dropdown bg-white shadow-lg"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="relative flex flex-col mx-2 mb-6 overflow-hidden">
            <label
              htmlFor="userPassword"
              className="mb-1 text-[0.85rem]  font-semibold"
            >
              Password
            </label>
            <input
              type={`${eye ? "password" : "text"}`}
              className="px-4 leading-10 rounded-md bg-blue-50 focus:outline-none focus:border focus:border-blue-600 "
              id="userPassword"
              placeholder="Password"
              name="userPassword"
              onChange={handleUserInput}
              value={registerData?.userPassword}
            />
            <div
              className="absolute bottom-0 right-0 p-[0.64rem] bg-transparent cursor-pointer text-[1.2rem] rounded-r-lg"
              onClick={handleEyeClick}
            >
              {eye ? <VscEyeClosed /> : <VscEye />}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col mx-2 mb-6">
            <label
              htmlFor="confirmPassword"
              className="mb-1 text-[0.85rem]  font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="px-4 leading-10 rounded-md bg-blue-50 focus:outline-none focus:border focus:border-blue-600 "
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleUserInput}
              value={registerData?.confirmPassword}
            />
          </div>
        </div>
        {/* <div className="w-full ">
          <div className="flex flex-col mx-2 mb-6">
            <label
              htmlFor="referralCode"
              className="mb-1 text-[0.85rem]  font-semibold"
            >
              Refer code
            </label>
            <input
              type="text"
              className="px-4 leading-10 rounded-md bg-blue-50 focus:outline-none focus:border focus:border-blue-600 "
              id="referralCode"
              placeholder="Refer code"
              name="referralCode"
              onChange={handleUserInput}
              value={registerData?.referralCode}
            />
          </div>
        </div> */}
        {isOtp && (
          <>
            <div className="w-full lg:w-1/2">
              <div className="relative flex flex-col mx-2 mb-6 overflow-hidden">
                <label
                  htmlFor="otp"
                  className="mb-1 text-[0.85rem]  font-semibold"
                >
                  Otp
                </label>
                <input
                  type="text"
                  className="px-4 leading-10 rounded-md bg-blue-50 focus:outline-none focus:border focus:border-blue-600 "
                  id="otp"
                  placeholder="Please Enter OTP"
                  name="otp"
                  onChange={handleUserInput}
                  value={registerData?.otp}
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2  px-10 py-2 text-gray-300 text-center">
              {showResendButton ? (
                <button
                  onClick={resendOtp}
                  className="bg-blue-600 flex items-center gap-3 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Resend OTP
                  {isLoadingResendOtp && (
                    <div className="ml-4 ease-in-out mt-1 size-[1.2rem] border-[2.4px] border-y-[#57575769] animate-spin rounded-full bottom-0"></div>
                  )}
                </button>
              ) : (
                <span>
                  Resend OTP in{" "}
                  <span className="font-bold text-blue-500">
                    {`${Math.floor(timer / 60)}:${(timer % 60)
                      .toString()
                      .padStart(2, "0")}`}
                  </span>
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <button className="w-full flex items-center justify-center gap-4 px-6 py-[0.6rem] text-white bg-indigo-900 rounded">
        {isOtp ? "Register Now" : "Send OTP"}
        {loaderActive && (
          <div className="ml-4 ease-in-out mt-1 size-[1.2rem] border-[2.4px] border-y-[#57575769] animate-spin rounded-full bottom-0"></div>
        )}
      </button>

      <div className="relative">
        <hr className="my-6 border-gray-400 md:my-12" />
        <span className="absolute px-2 -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 ">
          Or
        </span>
      </div>

      <SocialLoginButton />
    </form>
  );
};

const Register = () => {
  return (
    <>
      <section className="bg-gradient-to-r pt-10 flex relative overflow-hidden items-center justify-center from-[#281996] via-[#140A64] to-[#281996] font-poppins min-h-[100vh]">
        <div className="absolute bg-[#082ec4] blur-3xl  rounded-full w-[30vw] h-[50vh] top-[-6rem] left-[-1rem]"></div>
        <div className="absolute bg-[#082ec4d4] blur-3xl rounded-full w-[30vw] h-[50vh] bottom-[-6rem] right-0"></div>
        <div className="container relative px-4 mx-auto mt-10">
          <div className="grid h-full grid-cols-6 gap-6">
            <div className="col-span-6 md:col-span-2 lg:col-span-3">
              <div
                className="bg-cover bg-center bg-no-repeat min-h-[150px] rounded-md hidden md:block w-full md:w-[200%] lg:w-[150%] h-full"
                style={{
                  backgroundImage:
                    "url(https://www.referbiz.in/assets/Employees-511dd0dc.jpg)",
                }}
              ></div>
            </div>
            <div className="col-span-6 py-6 md:col-span-4 lg:col-span-3">
              <div className="flex items-center justify-center w-full h-full">
                <div className="p-4 py-6 bg-white rounded-lg shadow-xl md:p-8">
                  <h2 className="mb-3 text-2xl font-bold text-indigo-900 ">
                    Welcome to Love Bird
                  </h2>
                  <div className="flex items-center mb-5">
                    <p className="mb-0 mr-2 opacity-50">
                      Already have an account?
                    </p>
                    <Link href="/login">Sign In</Link>
                  </div>

                  <SignUpForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
