import info from "../../src/assets/info.png";
const ReportListing = ({ handleClose, handleReport }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center w-[35rem] border border-gray-200">
        <div className="mb-6 flex justify-center items-center">
          <img src={info} width={200} alt="" />
        </div>

        <h2 className="text-2xl font-semibold text-[#bc2c3d] mb-2">
          Found wrong information?
        </h2>
        <p className="text-gray-600 text-sm font-thin mb-6">
          Please choose the correct option below
        </p>

        <div className="flex font-thin justify-center space-x-4 mb-6">
          <button
            onClick={() => handleReport("Not Looking Now")}
            className="px-6 py-2 font-thin bg-[#bc2c3d] text-white  rounded-lg"
          >
            Not Looking Now
          </button>
          <button
            className="px-6 py-2 bg-[#f5bb1d]  rounded-lg "
            onClick={() => handleReport("Wrong Information")}
          >
            Wrong Information
          </button>
        </div>

        <p className="text-sm text-gray-500">
          <strong>Note:</strong> We’ll review this listing and proceed with its
          removal once we’ve confirmed the decision with the user who posted it.
        </p>
      </div>
    </div>
  );
};

export default ReportListing;
