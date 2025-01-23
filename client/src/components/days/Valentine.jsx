import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getValentineDayData } from "../../Pages/api/Api";
import { toast } from "sonner";
import couple2 from "../../assets/hug/couple2.jpg"; // Default image

export const Valentine = ({
  isPreview,
  previewImages,
  messages,
  ...previewData
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [valentineData, setValentineData] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchValentineData = async () => {
      try {
        setLoading(true);
        const response = await getValentineDayData(username);
        if (response.success) {
          setValentineData(response.dayData);
        }
      } catch (err) {
        console.error("Error fetching valentine day data:", err);
        setError(err.message || "Failed to fetch valentine day data");
        toast.error("Failed to load valentine day data");
      } finally {
        setLoading(false);
      }
    };

    if (!isPreview && username) {
      fetchValentineData();
    } else if (isPreview) {
      setValentineData({
        images: previewImages || [],
        messages: messages || [],
        ...previewData,
      });
      setLoading(false);
    }
  }, [isPreview, username, previewImages, messages, previewData]);

  // Helper function to get images
  const getImages = (start, end) => {
    const images = isPreview ? previewImages : valentineData?.images;
    return images?.slice(start, end) || Array(end - start).fill(couple2);
  };

  if (loading && !isPreview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-900"></div>
      </div>
    );
  }

  if (error && !isPreview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Data
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Update your image sections to use getImages() */}
      {getImages(0, 1).map((imageUrl, idx) => (
        <img
          key={idx}
          src={imageUrl}
          alt={`Image ${idx + 1}`}
          className="your-existing-classes"
        />
      ))}
      {/* ... rest of your component ... */}
    </div>
  );
};
