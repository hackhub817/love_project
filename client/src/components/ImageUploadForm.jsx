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
import imageCompression from "browser-image-compression";

import { Rose } from "./days/Rose";
import {
  uploadImages,
  createDayData,
  makePayment,
  getKey,
  verify,
  getUserDetails,
} from "../Pages/api/Api";
import qr from "../assets/qr.jpg";
import axios from "axios";
import { FaHeart, FaExclamationTriangle } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CloudFog } from "lucide-react";

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
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isExternalLinkClicked, setIsExternalLinkClicked] = useState(false);

  const [key, setKey] = useState("");
  const [isRemoveCoupon, setIsRemovedCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(null);
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
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
  const fetchDetails = async () => {
    const response = await getUserDetails();
    setIsDataSubmitted(response.user.isSubmittedData);
    if (response.user.isSubmittedData) {
      navigate("/dashboard");
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

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
  const [totalAmount, setTotalAmount] = useState(249); // Initial amount
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  // Add new state for tracking image count
  const [imageCount, setImageCount] = useState(0);

  // Add new state for confirmation dialog
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Add this state for instructions
  const [showInstructions, setShowInstructions] = useState(false);

  // Add these helper functions for complete data persistence
  const saveImagesToStorage = (images) => {
    try {
      const chunkSize = 4;
      for (let i = 0; i < images.length; i += chunkSize) {
        const chunk = images.slice(i, i + chunkSize);
        localStorage.setItem(
          `images_chunk_${i / chunkSize}`,
          JSON.stringify(chunk)
        );
      }
      localStorage.setItem(
        "totalImageChunks",
        Math.ceil(images.length / chunkSize)
      );
    } catch (error) {
      console.error("Error saving images:", error);
    }
  };

  const saveFormDataToStorage = () => {
    try {
      const formData = {
        passcode,
        partnerName,
        messages,
        gender,
        daySelections,
      };
      localStorage.setItem("formData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  // Add useEffect to load all data on mount
  useEffect(() => {
    // Load images
    const totalChunks = localStorage.getItem("totalImageChunks");
    if (totalChunks) {
      const savedImages = [];
      for (let i = 0; i < totalChunks; i++) {
        const chunk = JSON.parse(localStorage.getItem(`images_chunk_${i}`));
        if (chunk) savedImages.push(...chunk);
      }
      if (savedImages.length > 0) {
        setPreviewImages(savedImages);
        setImageCount(savedImages.length);
      }
    }

    // Load form data
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const data = JSON.parse(savedFormData);
      setPasscode(data.passcode || "");
      setPartnerName(data.partnerName || "");
      setMessages(
        data.messages || {
          needToTellSomething: "",
          secretPromise: "",
          secretMessage: "",
          specialMessage: "",
        }
      );
      setGender(data.gender || "");
      setDaySelections(
        data.daySelections || {
          Rose: [],
          Propose: [],
          Chocolate: [],
          Teddy: [],
          Promise: [],
          Hug: [],
          Kiss: [],
          Valentine: [],
        }
      );
    }

    // Check if we should be in preview mode
    const isPreviewMode = localStorage.getItem("previewMode") === "true";
    setPreviewMode(isPreviewMode);
  }, []);

  // Add useEffect to save form data changes
  useEffect(() => {
    saveFormDataToStorage();
  }, [passcode, partnerName, messages, gender, daySelections]);

  // Modify handleImageChange to not set preview mode
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length !== 12) {
      toast.error("Please select exactly 12 images");
      return;
    }

    try {
      toast.loading("Please wait Processing images...", {
        id: "compression",
      });

      // Process images one by one
      const compressedFiles = [];
      for (const file of files) {
        if (file.size > 4 * 1024 * 1024) {
          const options = {
            maxSizeMB: 4,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            initialQuality: 0.8,
          };
          const compressedFile = await imageCompression(file, options);
          compressedFiles.push(compressedFile);
        } else {
          compressedFiles.push(file);
        }
      }

      setImages(compressedFiles);

      // Create local URLs for preview
      const urls = compressedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages(urls);
      setImageCount(files.length);

      // Save images to storage but don't enter preview mode
      saveImagesToStorage(urls);

      toast.dismiss("compression");
    } catch (error) {
      console.error("Error processing images:", error);
      toast.error("Error processing images. Please try again.");
      toast.dismiss("compression");
    }
  };

  // Add effect to save preview mode state
  // useEffect(() => {
  //   if (previewMode) {
  //     localStorage.setItem("previewMode", "true");
  //   } else {
  //     localStorage.removeItem("previewMode");
  //   }
  // }, [previewMode]);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_order_id: "",
    razorpay_signature: "",
  };

  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 20) {
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

  // Modify handlePreviewClick to validate all required fields
  const handlePreviewClick = () => {
    if (imageCount !== 12) {
      toast.error("Please upload exactly 12 images");
      return;
    }

    if (!passcode) {
      toast.error("Please enter a passcode");
      return;
    }

    if (!partnerName) {
      toast.error("Please enter partner's name");
      return;
    }

    if (
      !messages.needToTellSomething ||
      !messages.secretPromise ||
      !messages.secretMessage ||
      !messages.specialMessage
    ) {
      toast.error("Please fill all message fields");
      return;
    }

    setShowInstructions(true);
  };

  // Modify handleCloseInstructions
  const handleCloseInstructions = () => {
    setShowInstructions(false);
    setPreviewMode(true);
    localStorage.setItem("previewMode", "true");
    toast.success("Preview mode activated!");
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setErrorMessage("Please enter a coupon code.");
      return;
    }
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
        setIsPaymentComplete(true);
        toast.success(
          "Coupon applied successfully! You can now submit your data."
        );
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

      if (response.status == 200) {
        setDiscountedAmount(response.data.updatedAmount);
        setIsRemovedCoupon(false);
        setIsCouponValid(false);
        setCouponCode("");
        setIsPaymentComplete(false);
        toast.success(response.data.message);
        toast.info("Please apply a coupon to enable submission");
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

  // Add this function to get data from localStorage
  const getDataFromStorage = () => {
    try {
      // Get form data
      const savedFormData = JSON.parse(
        localStorage.getItem("formData") || "{}"
      );

      // Get images from chunks
      const savedImages = [];
      const totalChunks = parseInt(
        localStorage.getItem("totalImageChunks") || "0"
      );

      for (let i = 0; i < totalChunks; i++) {
        const chunk = JSON.parse(localStorage.getItem(`images_chunk_${i}`));
        if (chunk) savedImages.push(...chunk);
      }

      // Validate data before returning
      if (
        !savedFormData.passcode ||
        !savedFormData.partnerName ||
        savedImages.length === 0
      ) {
        console.error("Missing required data in localStorage");
        return null;
      }

      return {
        passcode: savedFormData.passcode,
        partnerName: savedFormData.partnerName,
        gender: savedFormData.gender || "",
        messages: savedFormData.messages || {},
        daySelections: savedFormData.daySelections || {},
        images: savedImages,
      };
    } catch (error) {
      console.error("Error loading from storage:", error);
      return null;
    }
  };

  // Modify handleFinalSubmit to properly send data to API
  const handleFinalSubmit = () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Get data either from current state or localStorage
      const storedData = getDataFromStorage();
      const dataToUse = storedData || {
        passcode,
        partnerName,
        gender,
        messages,
        daySelections,
        images,
      };

      // Log the data we're using
      console.log("Using data:", dataToUse);

      // Append form fields
      formData.append("passcode", dataToUse.passcode);
      formData.append("partnerName", dataToUse.partnerName);
      formData.append("gender", dataToUse.gender);
      formData.append("messages", JSON.stringify(dataToUse.messages));
      formData.append("daySelections", JSON.stringify(dataToUse.daySelections));

      // Handle images
      if (dataToUse.images && dataToUse.images.length > 0) {
        dataToUse.images.forEach((image, index) => {
          // For File objects (fresh uploads)
          if (image instanceof File) {
            formData.append("images", image);
          }
          // For base64 strings (from localStorage)
          else if (typeof image === "string" && image.includes("base64")) {
            const blob = base64ToBlob(image);
            formData.append("images", blob, `image${index}.jpg`);
          }
        });
      } else {
        toast.error("No images found to upload");
        setIsSubmitting(false);
        return;
      }

      // Log the final FormData
      console.log("Sending FormData:");
      for (let [key, value] of formData.entries()) {
        if (key === "images") {
          console.log("Image:", value instanceof Blob ? "Blob" : typeof value);
        } else {
          console.log(key, ":", value);
        }
      }

      // Send to API
      uploadImages(formData)
        .then((response) => {
          if (response.success) {
            toast.success("Your story has been saved successfully!");
            navigate("/dashboard");
          } else {
            throw new Error(response.message || "Failed to save your story");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
          toast.error(error.message || "Failed to save your story");
        })
        .finally(() => {
          setIsSubmitting(false);
          setIsConfirmOpen(false);
        });
    } catch (error) {
      console.error("Error preparing data:", error);
      toast.error("Failed to prepare data for submission");
      setIsSubmitting(false);
      setIsConfirmOpen(false);
    }
  };

  // Helper function to convert base64 to Blob
  const base64ToBlob = (base64String) => {
    try {
      const parts = base64String.split(";base64,");
      const contentType = parts[0].split(":")[1] || "image/jpeg";
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    } catch (error) {
      console.error("Error converting base64 to blob:", error);
      return null;
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

  // Add this effect to update total amount when coReupon is applied
  useEffect(() => {
    if (discountedAmount) {
      setTotalAmount(discountedAmount);
    } else {
      setTotalAmount(312);
    }
  }, [discountedAmount]);

  // Add notification when all days are complete
  useEffect(() => {
    if (isAllDaysComplete && !isCouponValid) {
      toast.info("All days are complete! Please apply a coupon to continue.");
    }
  }, [isAllDaysComplete]);

  // Add reset data button component
  const ResetDataButton = () => (
    <button
      onClick={() => {
        // Clear all localStorage
        localStorage.clear();

        // Reset states
        setPreviewMode(false);
        setImages([]);
        setPreviewImages([]);
        setImageCount(0);
        setDaySelections({
          Rose: [],
          Propose: [],
          Chocolate: [],
          Teddy: [],
          Promise: [],
          Hug: [],
          Kiss: [],
          Valentine: [],
        });
        setPasscode("");
        setPartnerName("");
        setMessages({
          needToTellSomething: "",
          secretPromise: "",
          secretMessage: "",
          specialMessage: "",
        });
        setGender("");

        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = "";
        }

        toast.success("All data has been reset successfully!");
      }}
      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
    >
      Reset All Data
    </button>
  );

  const ConfirmationDialog = () => (
    <Transition appear show={isConfirmOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsConfirmOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center gap-2"
                >
                  <FaHeart className="text-pink-500" />
                  Save Your Love Story
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to save your love story? Please note
                    that you won't be able to make any changes after submission.
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⌛</span> Saving...
                      </>
                    ) : (
                      "Save Story"
                    )}
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                    onClick={() => setIsConfirmOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  // Add the InstructionsDialog
  const InstructionsDialog = () => (
    <Transition appear show={showInstructions} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleCloseInstructions}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Welcome to Preview Mode! 🎉
                </Dialog.Title>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-pink-600">
                      Image Selection
                    </h4>
                    <p className="text-sm text-gray-600">
                      • Select exactly 6 images for each day
                      <br />
                      • Click on images to select/deselect them
                      <br />• Watch the preview update in real-time
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-pink-600">
                      Preview Features
                    </h4>
                    <p className="text-sm text-gray-600">
                      • Click "Preview Page" to see how each day will look
                      <br />
                      • Your selections are automatically saved
                      <br />• Use "Reset All Data" button to return to the
                      upload page
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-pink-600">
                      Important Notes
                    </h4>
                    <p className="text-sm text-gray-600">
                      • Complete all days before applying coupon
                      <br />
                      • Use "Reset All Data" to start over if needed
                      <br />• Your data will be automatically deleted after
                      February 25th
                    </p>
                  </div>

                  <div className="mt-4 bg-pink-50 p-3 rounded-lg">
                    <p className="text-sm text-pink-800">
                      💝 Make sure to follow us on Instagram for updates and
                      support!
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                    onClick={handleCloseInstructions}
                  >
                    Got it, let's start! 👍
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-red-50 to-pink-50 py-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <FaHeart
            key={i}
            className="absolute text-pink-200 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>

      <div className="px-2 relative">
        {!previewMode ? (
          // Upload Form
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                Create Your Love Story
              </h1>
              <p className="text-gray-600">
                Fill this form with love and care ❤️
              </p>
            </div>

            <div className="p-8 max-w-3xl mx-auto bg-white/90 backdrop-blur-xs rounded-2xl shadow-xl space-y-8 transform hover:scale-[1.01] transition-all duration-300">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Upload Your Memories
                    </h2>
                  </div>
                  <div className="text-sm font-medium">
                    <span
                      className={`${
                        imageCount === 12 ? "text-green-500" : "text-pink-500"
                      }`}
                    >
                      {imageCount}/12 images
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="relative z-10 w-full h-32 opacity-0 cursor-pointer"
                    required
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-pink-300 rounded-lg bg-pink-50">
                    <FaHeart className="text-pink-400 text-3xl mb-2" />
                    <p className="text-sm text-gray-600">
                      Drop 12 images here or click to upload
                    </p>
                    <p className="text-xs text-pink-500 mt-1">
                      Square images recommended for best results
                    </p>
                    <p className="text-xs text-pink-500 mt-1">
                      {" "}
                      Please don't use very large size images{" "}
                    </p>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Security
                  </h2>
                </div>
                <div className="bg-pink-50 p-6 rounded-xl">
                  <input
                    type="password"
                    value={passcode}
                    onChange={handlePasscodeChange}
                    placeholder="Enter your secret passcode"
                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                  <p className="mt-2 text-sm text-pink-600">
                    <FaHeart className="inline mr-1" />
                    This keeps your love story private and secure
                  </p>
                </div>
              </div>

              {/* Partner Details Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                  <h2 className="text-xl font-semibold text-gray-800">
                    About Your Love
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To Whom You Are Gifting
                    </label>
                    <select
                      value={gender}
                      onChange={handleGenderChange}
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Partner's Name
                    </label>
                    <input
                      type="text"
                      value={partnerName}
                      onChange={handlePartnerNameChange}
                      placeholder="Their first name"
                      className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      required
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {partnerName.length}/8 characters
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-6 bg-pink-500 rounded-full"></span>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Your Messages
                  </h2>
                </div>
                <div className="grid gap-6">
                  {Object.keys(messages).map((key) => (
                    <div key={key} className="bg-pink-50 p-6 rounded-xl">
                      <label className="block text-base font-medium text-gray-700 mb-2">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <textarea
                        name={key}
                        value={messages[key]}
                        onChange={handleMessageChange}
                        className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                        rows={3}
                        placeholder="Write from your heart..."
                        required
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {messages[key]?.length || 0}/20 characters
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handlePreviewClick}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Preview Your Love Story
              </button>
            </div>
          </div>
        ) : (
          <div className=" space-y-4 md:pb-40 pb-12  mx-auto">
            {/* Desktop/Tablet Layout - Hidden on Mobile */}
            <div className="hidden sm:block">
              <div className="flex lg:flex-row sm:flex-row flex-col gap-4">
                <div className="space-y-4 flex-1">
                  {Object.keys(daySelections).map((day) => (
                    <div
                      key={day}
                      className="border p-4 lg:w-96 sm:w-72 rounded"
                    >
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
                  <div className="w-[885px] ">
                    <div className="border   rounded sticky py-2 px-4 top-4">
                      <h3 className="font-bold text-lg mb-4">Page Preview</h3>
                      {renderDayPreview()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:hidden">
              <div className="text-xl text-center text-red-500 font-semibold py-1">
                Please watch demo and follow us for further
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="w-52 text-sm font-medium">
                  Click to select other photos or data
                </div>
                <ResetDataButton />
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
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-gray-700 mb-2">
                            Preview
                          </div>
                          <button
                            onClick={() => {
                              setSidebarOpen(false);
                            }}
                            className="font-medium text-white-700 bg-green-500 rounded-xl px-3 py-1 mb-2"
                          >
                            Done
                          </button>
                        </div>
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
            {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:p-4 p-2 flex justify-between items-center">
              <p className="text-red-500 font-semibold text-xl">
                You can preview how your website will look after adding photos.
                Currently, subscriptions are not available, but stay tuned for
                updates! Soon, you'll be able to check your website just as you
                see in your previews. Stay connected with us for more updates.
              </p>
            </div> */}

            {/* Fixed Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:p-4 p-2 flex justify-between items-center">
              <div className="flex items-center md:block hidden md:gap-4">
                <div>
                  <button
                    onClick={() => {
                      setPreviewMode(false);
                      setSelectedDay(null);
                      setSidebarOpen(false);
                    }}
                    className="bg-gray-500 text-white md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm rounded-lg"
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                </div>
              </div>

              {/* Coupon and Submit Section */}
              <div className="flex flex-row flex-wrap md:gap-4 gap-2">
                {isCouponValid ? (
                  <>
                    <div className="flex items-center gap-1 text-lg text-black font-semibold">
                      <span>Pay</span> <FaIndianRupeeSign />{" "}
                      <span>{discountedAmount}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-1 text-lg text-black font-semibold">
                    <span>Pay</span> <FaIndianRupeeSign /> <span>312</span>
                  </div>
                )}
                {isAllDaysComplete && (
                  <div className="flex items-center gap-2">
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
                  </div>
                )}
                {/* {isCouponValid && (
                  <>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.instagram.com/bob.the.builder.co/" // Replace with your external link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={() => {
                          setIsExternalLinkClicked(true);
                          setTimeout(() => {
                            setIsSubmitEnabled(true);
                          }, 30000);
                        }}
                      >
                        Instagram Page
                      </a>
                    </div>
                  </>
                )} */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setPreviewMode(false);
                      setSelectedDay(null);
                      setSidebarOpen(false);
                    }}
                    className="bg-gray-500 md:hidden block text-white md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm rounded-lg"
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    className={`md:px-4 md:py-2 px-2 py-1 md:text-lg text-sm rounded-lg text-white flex items-center gap-2 ${
                      isCouponValid
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!isCouponValid}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⌛</span> Submitting...
                      </>
                    ) : (
                      <>
                        {!isCouponValid && <FaExclamationTriangle />}
                        Submit Data
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Message when days are not complete */}
            <div className="px-2">
              <div className="fixed mt-2  lg:bottom-20 sm:bottom-20  bottom-20 left-1/2 lg:text-lg w-full text-xs  transform -translate-x-1/2 bg-yellow-50 border border-yellow-200 text-red-500 px-4 py-2 rounded-lg ">
                Select 6 images for each day to proceed After Selecting 6
                images, Add Coupon FIRST50 (Free for first 50 users) and submit
                button enable.
                <br />
                Note:Your Data will automatically be deleted after 25 February
                <div className="flex items-center  gap-4">
                  <div className="text-black md:text-xl text-xs  font-semibold">
                    Please Follow us on Instagram
                  </div>
                  <a
                    href="https://www.instagram.com/bob.the.builder.co/" // Replace with your external link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:px-4 md:py-2 px-2 py-1 md:text-base text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Instagram Page
                  </a>
                </div>
              </div>
            </div>

            {/* Success message for coupon */}
            {/* {isCouponValid && (
              <>
                <div className="fixed md:bottom-28 bottom-20   bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg w-96">
                  Please scan the QR code to make the payment and send us the
                  screenshot on our Instagram page. After that, submit your
                  details here. Your account will be activated within 5 minutes
                  of sending the message
                  <div className="flex items-center justify-center">
                    <img src={qr} alt="Generated" className="w-72 h-72" />
                  </div>
                </div>
              </>
            )} */}
          </div>
        )}
      </div>

      {/* Add the confirmation dialog */}
      <ConfirmationDialog />

      {/* Add Instructions Dialog */}
      {showInstructions && <InstructionsDialog />}

      {/* Add reset data button */}
    </div>
  );
};

export default ImageUploadForm;
