
const InputContact = ({name,placeholder,type,title, }) => {
    return (
      <div className="flex  mt-6 gap-2  flex-col items-start  w-full">
        <label className="font-extrabold">
          {title}
          {/* <span className="text-primary">*</span> */}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full p-2 py-2  rounded-xl border-2 outline-none "
          name={name}
        />
      </div>
    );
  };

  export default InputContact;
