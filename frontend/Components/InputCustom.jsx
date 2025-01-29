import React from "react";

const InputCustom = ({
  title,
  type,
  name,
  placeholder,
  value,
  required,
  onChange,
  val,
  disabled,
}) => {
  return (
    <div className="flex  mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
      <label className="font-extrabold">
        {title} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 rounded-xl border-2 outline-primary max-md:w-full"
        name={name}
        value={value}
        defaultValue={val}
        onChange={onChange} // Pass onChange from props
        disabled={disabled}
      />
    </div>
  );
};

export default InputCustom;
