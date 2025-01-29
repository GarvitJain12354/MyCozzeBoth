import { useState } from "react";
import emoji from "../../src/assets/emoji.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";

function FeedBack() {
  const [mood, setMood] = useState(null); // For mood emoji selection
  const [rating, setRating] = useState(5); // Default rating value
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [feedback, setFeedback] = useState("");

  const features = [
    "Lorem ipsum dolor sit amet 1",
    "Lorem ipsum dolor sit amet 2",
    "Lorem ipsum dolor sit amet 3",
  ];

  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-[30rem]  relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl ">Feedback</h2>
          <button
            className=" text-[#bc2c3d] "
            onClick={() => console.log("Close Popup")}
          >
            <RiCloseLargeFill />
          </button>
        </div>

        <p className="mb-2 text-sm">
          How would you describe your mood after using our MyCozee for the first
          time?
        </p>
        <div className="flex items-center space-x-4 mb-4">
          {/* <button
            onClick={() => setMood("sad")}
            className={`text-3xl ${mood === "sad" ? "text-red-500" : "text-gray-400"}`}
          >
            😔
          </button>
          <button
            onClick={() => setMood("neutral")}
            className={`text-3xl ${mood === "neutral" ? "text-red-500" : "text-gray-400"}`}
          >
            😐
          </button>
          <button
            onClick={() => setMood("happy")}
            className={`text-3xl ${mood === "happy" ? "text-red-500" : "text-gray-400"}`}
          >
            😀
          </button> */}
          <img src={emoji} width={100} alt="" />
        </div>

        <p className="mb-2 text-sm">
          How would you describe your mood after using our MyCozee for the first
          time?
        </p>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setRating(num)}
              className={`w-8 h-8 rounded-full ${
                rating === num
                  ? "bg-[#bc2c3d] text-[#fff]"
                  : "bg-gray-200 text-[#bc2c3d]"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <p className="mb-2">Which feature is best for you?</p>
        <div className="mb-4">
          {features.map((feature) => (
            <label key={feature} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-7 w-7  border-[#bc2c3d] text-red-500 rounded checked:bg-white checked:border-red-500 checked:text-red-500"
                checked={selectedFeatures.includes(feature)}
                onChange={() => toggleFeature(feature)}
              />
              <span className="text-sm">{feature}</span>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="feedback" className="block mb-2 text-sm">
            Your feedback
          </label>
          <textarea
            id="feedback"
            className="w-full text-sm p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#bc2c3d]"
            placeholder="Lorem ipsum dolor sit amet"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <button
          className=" bg-[#bc2c3d]  text-white p-2  rounded-md flex justify-center items-center "
          onClick={() => console.log("Send Feedback")}
        >
          <span className="font thin"> Send feedback</span>{" "}
          <span>
            <MdKeyboardArrowRight size={25} />
          </span>
        </button>
      </div>
    </div>
  );
}

export default FeedBack;
