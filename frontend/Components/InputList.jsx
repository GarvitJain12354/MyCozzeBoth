
const InputList = ({name,placeholder,type,title, required,val}) => {
  return (
    <div className="flex  mt-6 gap-2  flex-col pl-2 pr-2     items-start  w-full">
      <label className=" font-semibold">
        {title} {required && <span className="text-[#bc2c3d]">*</span>}
        {/* <span className="text-primary">*</span> */}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2   rounded-xl border-2 outline-none border-[#bc2c3d]"
        name={name}
        defaultValue={val}
      />
    </div>
  );
};

export default InputList;
