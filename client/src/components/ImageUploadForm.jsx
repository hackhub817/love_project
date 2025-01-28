import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProposeDay } from "./days/Propose";
import { HugDay } from "./days/Hug";
import { Kiss } from "./days/Kiss";
import { Valintine } from "./days/Valinetine";
import Promise from "./days/Promise";
import { Teddy } from "./days/Teddy";
import { ChocolateDay } from "./days/Chocolate";
import { Rose } from "./days/Rose";
import {
  uploadImages,
  createDayData,
  makePayment,
  getKey,
  verify,
} from "../Pages/api/Api";
import axios from "axios";

const ImageUploadForm = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [messages, setMessages] = useState({
    needToTellSomething: "",
    secretPromise: "",
    secretMessage: "",
    specialMessage: "",
  });
  const [key, setKey] = useState("");
  const [isRemoveCoupon, setIsRemovedCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(null);
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [passcode, setPasscode] = useState("");
  const [gender, setGender] = useState("");
  const [partnerName, setPartnerName] = useState("");

  const [dayMessages, setDayMessages] = useState({
    Rose: [],
    Propose: [],
    Chocolate: [],
    Teddy: [],
    Promise: [],
    Hug: [],
    Kiss: [],
    Valentine: [],
  });

  const [daySelections, setDaySelections] = useState({
    Rose: [],
    Propose: [],
    Chocolate: [],
    Teddy: [],
    Promise: [],
    Hug: [],
    Kiss: [],
    Valentine: [],
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isAllDaysComplete, setIsAllDaysComplete] = useState(false);
  const [totalAmount, setTotalAmount] = useState(312); // Initial amount
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length !== 12) {
      toast.error("Please select exactly 12 images");
      return;
    }
    setImages(files);

    // Create local URLs for preview
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(urls);
  };

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_order_id: "",
    razorpay_signature: "",
  };

  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 30) {
      setMessages((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePartnerNameChange = (e) => {
    if (e.target.value.length <= 8) {
      setPartnerName(e.target.value);
    }
  };

  const handleDayMessageChange = (day, value) => {
    setDayMessages((prev) => ({
      ...prev,
      [day]: Array.isArray(value) ? value : [value],
    }));
  };

  const handlePreview = () => {
    if (images.length !== 12) {
      toast.error("Please upload 12 images first");
      return;
    }
    setPreviewMode(true);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setErrorMessage("Please enter a coupon code.");
      return;
    }
    console.log(couponCode);
    try {
      const response = await axios.post(
        "https://api.bobbuilder.shop/api/coupon/apply-coupon",
        {
          code: couponCode,
        }
      );
      console.log(response);
      if (response.status == 200) {
        setTotalAmount(response.data.discountedAmount);
        setDiscountedAmount(response.data.discountedAmount);
        setIsCouponValid(true);
        setCouponCode(couponCode);
        setIsRemovedCoupon(true);
        setErrorMessage("");
      } else {
        setIsCouponValid(false);
        setCouponCode("");
        setErrorMessage(response.data.message || "Invalid coupon code.");
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      setIsCouponValid(false);

      setErrorMessage("An error occurred while validating the coupon.");
    }
  };
  const handleRemoveCoupon = async () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code to remove");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.bobbuilder.shop/api/coupon/removeCoupon",
        {
          code: couponCode,
          originalAmount: totalAmount,
        }
      );

      // Extract the updated amount and message
      const { updatedAmount, restoredDiscount, message } = response.data;
      console.log(response.data);

      // Update the state with the new amount and clear the coupon code
      if (response.status == 200) {
        setDiscountedAmount(updatedAmount);
        setIsRemovedCoupon(false);
        setIsCouponValid(false);
        setCouponCode(""); // Reset coupon field
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleBuyNow = async () => {
    const { key: razorpayKey } = await getKey();
    const payData = await makePayment(couponCode);

    const options = {
      key: razorpayKey,
      amount: payData?.amount,
      currency: "INR",
      name: "LoveBirds",
      description: "Valentine's Week Special Package",
      order_id: payData?.order?.id,
      handler: async function (res) {
        const paymentDetails = {
          razorpay_payment_id: res.razorpay_payment_id,
          razorpay_order_id: res.razorpay_order_id,
          razorpay_signature: res.razorpay_signature,
        };

        const response = await verify(paymentDetails);
        if (response?.success) {
          toast.success("Payment Successful!");
          setIsPaymentComplete(true);
        } else {
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: "piyush ",
        email: "hello@gmail.com",
        contact: "8174075872",
      },
      theme: {
        color: "#FF69B4",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const handleDayImageSelection = (day, selectedImages) => {
    if (selectedImages.length > 6) {
      toast.error(`You can only select up to 6 images for ${day}`);
      return;
    }
    setDaySelections((prev) => ({
      ...prev,
      [day]: selectedImages,
    }));

    // Check completion immediately after selection
    const allDaysComplete = Object.values({
      ...daySelections,
      [day]: selectedImages,
    }).every((selections) => selections.length === 6);

    setIsAllDaysComplete(allDaysComplete);
    if (allDaysComplete) {
      toast.success("All days are complete! You can proceed with payment.");
    }
  };

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      console.log("Starting submission process...");

      // Validation phase
      console.log("Starting validation...");
      for (const day in daySelections) {
        if (daySelections[day].length === 0) {
          toast.error(`Please select images for ${day}`);
          setIsSubmitting(false);
          return;
        }
        // if (!dayMessages[day] || dayMessages[day].length === 0) {
        //   toast.error(`Please add at least one message for ${day}`);
        //   setIsSubmitting(false);
        //   return;
        // }
      }
      console.log("Validation completed successfully");

      // Image upload phase
      console.log("Preparing to upload images...");
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      console.log("Uploading images to cloudinary...");
      const uploadResponse = await uploadImages(formData);
      if (!uploadResponse.success) {
        throw new Error("Failed to upload images");
      }
      console.log("Images uploaded successfully");

      const imageUrls = uploadResponse.imageUrls;

      // Create URL mapping
      console.log("Creating URL mapping...");
      const urlMapping = {};
      previewImages.forEach((previewUrl, index) => {
        urlMapping[previewUrl] = imageUrls[index];
      });

      // Create day data sequentially
      console.log("Starting day data creation...");
      const days = Object.keys(daySelections);

      // Using sequential async/await instead of Promise.all
      for (const day of days) {
        try {
          console.log(`Creating data for ${day}...`);
          const cloudinaryUrls = daySelections[day].map(
            (previewUrl) => urlMapping[previewUrl]
          );

          const dayData = {
            day,
            images: cloudinaryUrls,
            messages: dayMessages[day],
            ...messages,
          };

          // Use createDayData instead of submitTeddyDayData
          await createDayData(dayData);
          console.log(`Successfully created data for ${day}`);
        } catch (error) {
          console.error(`Error creating data for ${day}:`, error);
          throw new Error(`Failed to create data for ${day}: ${error.message}`);
        }
      }

      // Cleanup phase
      console.log("Starting cleanup...");
      previewImages.forEach(URL.revokeObjectURL);
      console.log("Cleanup completed");

      toast.success("Successfully created all day data!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error(error.message || "Error creating day data");
    } finally {
      console.log("Submission process completed");
      setIsSubmitting(false);
    }
  };

  const renderDayPreview = () => {
    if (!selectedDay) return null;

    const previewProps = {
      isPreview: true,
      previewImages: daySelections[selectedDay],
      messages: dayMessages[selectedDay],
      ...messages,
    };

    switch (selectedDay) {
      case "Rose":
        return <Rose {...previewProps} />;
      case "Propose":
        return <ProposeDay {...previewProps} />;
      case "Hug":
        return <HugDay {...previewProps} />;
      case "Kiss":
        return <Kiss {...previewProps} />;
      case "Valentine":
        return <Valintine {...previewProps} />;
      case "Promise":
        return <Promise {...previewProps} />;
      case "Teddy":
        return <Teddy {...previewProps} />;
      case "Chocolate":
        return <ChocolateDay {...previewProps} />;
      default:
        return null;
    }
  };

  // Add this effect to update total amount when coupon is applied
  useEffect(() => {
    if (discountedAmount) {
      setTotalAmount(discountedAmount);
    } else {
      setTotalAmount(312);
    }
  }, [discountedAmount]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {!previewMode ? (
        // Upload Form
        <div className="space-y-2">
          <div className="font-semibold text-gray-600 text-center md:text-2xl text-lg uppercase">
            Please Fill the form wisely{" "}
          </div>
          <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md space-y-6">
            {/* Passcode Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload 12 Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="mt-2 text-sm text-red-500">
                For a better experience, please upload square-shaped images.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={handlePasscodeChange}
                className="mt-2 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="mt-2 text-sm text-red-500">
                To make you private data protected
              </p>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Whom You Are Gifting
              </label>
              <select
                value={gender}
                onChange={handleGenderChange}
                className="mt-2 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Partner Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Partner's First Name (Max 8 Characters)
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={handlePartnerNameChange}
                className="mt-2 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="text-sm text-gray-500 mt-1">
                {partnerName.length}/8 characters
              </div>
            </div>

            {/* Global Message Fields */}
            {Object.keys(messages).map((key) => (
              <div key={key}>
                <label className="block text-base  font-semibold text-gray-700">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <textarea
                  name={key}
                  value={messages[key]}
                  onChange={handleMessageChange}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {messages[key]?.length || 0}/30 characters
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handlePreview}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Preview
          </button>
        </div>
      ) : (
        <div className="space-y-4 max-w-7xl mx-auto">
          {/* Desktop/Tablet Layout - Hidden on Mobile */}
          <div className="hidden sm:block">
            <div className="flex lg:flex-row sm:flex-row flex-col gap-4">
              <div className="space-y-4 flex-1">
                {Object.keys(daySelections).map((day) => (
                  <div key={day} className="border p-4 lg:w-96 sm:w-72 rounded">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">{day}</h3>
                      <button
                        onClick={() => setSelectedDay(day)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Preview Page
                      </button>
                    </div>

                    {/* Day-specific message input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Day Message
                      </label>
                      {/* <textarea
                        value={dayMessages[day]?.[0] || ""}
                        onChange={(e) =>
                          handleDayMessageChange(day, e.target.value)
                        }
                        className="w-full rounded-md border-gray-300 shadow-sm"
                        rows={2}
                      /> */}
                    </div>

                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2">
                      {previewImages.map((url, idx) => (
                        <div
                          key={idx}
                          className={`cursor-pointer border-2 p-1 ${
                            daySelections[day].includes(url)
                              ? "border-blue-500"
                              : "border-gray-200"
                          }`}
                          onClick={() => {
                            const newSelection = daySelections[day].includes(
                              url
                            )
                              ? daySelections[day].filter((i) => i !== url)
                              : [...daySelections[day], url];
                            handleDayImageSelection(day, newSelection);
                          }}
                        >
                          <img
                            src={url}
                            alt=""
                            className="w-full h-16 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Selected: {daySelections[day].length}/6 images
                    </p>
                  </div>
                ))}
              </div>

              {selectedDay && (
                <div className="w-full">
                  <div className="border p-4 rounded sticky top-4">
                    <h3 className="font-bold text-lg mb-4">Page Preview</h3>
                    {renderDayPreview()}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="sm:hidden">
            <div className="text-sm text-gray-600 font-light py-1">
              Please watch demo and follow us for further
            </div>
            <div className="grid grid-cols-1 gap-4 pb-20">
              {Object.keys(daySelections).map((day) => (
                <div
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setSidebarOpen(true);
                  }}
                  className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base">{day}</h3>
                    <span className="text-sm text-gray-500">
                      {daySelections[day].length}/6 images
                    </span>
                  </div>
                  {dayMessages[day]?.[0] && (
                    <p className="text-sm text-gray-600 mt-2 truncate">
                      {dayMessages[day][0]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Sidebar */}
            <div
              className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
                sidebarOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {selectedDay && (
                <div className="h-full flex flex-col">
                  {/* Sidebar Header */}
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">{selectedDay}</h2>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Sidebar Content */}
                  <div className="flex-1 overflow-y-auto  space-y-4">
                    {/* Message Input */}
                    <div>
                      {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                        Day Message
                      </label> */}
                      {/* <textarea
                        value={dayMessages[selectedDay]?.[0] || ""}
                        onChange={(e) =>
                          handleDayMessageChange(selectedDay, e.target.value)
                        }
                        className="w-full rounded-md border-gray-300 shadow-sm"
                        rows={3}
                      /> */}
                    </div>

                    {/* Image Selection */}
                    <div>
                      <label className="block text-sm  font-medium text-gray-700 mb-2">
                        Select Images (tap to select)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {previewImages.map((url, idx) => (
                          <div
                            key={idx}
                            className={`aspect-square border-2 ${
                              daySelections[selectedDay].includes(url)
                                ? "border-blue-500"
                                : "border-gray-200"
                            }`}
                            onClick={() => {
                              const newSelection = daySelections[
                                selectedDay
                              ].includes(url)
                                ? daySelections[selectedDay].filter(
                                    (i) => i !== url
                                  )
                                : [...daySelections[selectedDay], url];
                              handleDayImageSelection(
                                selectedDay,
                                newSelection
                              );
                            }}
                          >
                            <img
                              src={url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Preview
                      </h4>
                      <div className="border-2 rounded-xl border-gray-900 ">
                        {renderDayPreview()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Backdrop */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:p-4 p-2 flex justify-between items-center">
            <p className="text-red-500 font-semibold text-xl">
              You can preview how your website will look after adding photos.
              Currently, subscriptions are not available, but stay tuned for
              updates! Soon, you'll be able to check your website just as you
              see in your previews. Stay connected with us for more updates.
            </p>
          </div>

          {/* Fixed Footer */}
          {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:p-4 p-2 flex  justify-between items-center">
            <div className="flex items-center md:block hidden md:gap-4">
              <button
                onClick={() => {
                  setPreviewMode(false);
                  setSelectedDay(null);
                  setSidebarOpen(false);
                }}
                className="bg-gray-500 text-white md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm  rounded-lg"
                disabled={isSubmitting}
              >
                Back
              </button>
            </div>

            {/* Payment Section */}
          {/* <div className="flex md:flex-row flex-col items-center md:gap-4 gap-1">
              {isAllDaysComplete && (
                <>
                  <div className="md:block hidden flex items-center gap-10">
                    <div className="md:text-lg text-sm font-semibold">
                      Total: ₹{discountedAmount || 312}
                    </div>
                  </div>

                  <div className="flex items-center  gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="md:px-4 md:py-2 py-1 px-2 md:w-auto w-32 border rounded-lg"
                      disabled={isCouponValid}
                    />
                    {isRemoveCoupon ? (
                      <button
                        onClick={handleRemoveCoupon}
                        className="md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={handleApplyCoupon}
                        className="md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                      >
                        Apply
                      </button>
                    )}
                    <button
                      onClick={handleBuyNow}
                      className="md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                    >
                      Pay Now
                    </button>
                  </div>
                </>
              )}
              <div className="flex gap-4">
                <div className="flex items-center gap-10">
                  <div className="md:text-lg md:hidden block text-sm font-semibold">
                    Total: ₹{discountedAmount || 312}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setPreviewMode(false);
                    setSelectedDay(null);
                    setSidebarOpen(false);
                  }}
                  className="bg-gray-500 md:hidden block text-white md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm  rounded-lg"
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className={`md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm rounded-lg text-white ${
                    isPaymentComplete
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isPaymentComplete}
                >
                  {isSubmitting ? "Submitting..." : "Submit Data"}
                </button>
              </div>
            </div> */}
          {/* </div>  */}

          {/* Message when days are not complete */}
          {/* {!isAllDaysComplete && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg">
              Select 6 images for each day to proceed with payment
            </div>
          )} */}

          {/* Success message for coupon */}
          {/* {isCouponValid && (
            <div className="fixed bottom-20 md:block hidden right-4 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg">
              Coupon applied! New total: ₹{discountedAmount}
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
