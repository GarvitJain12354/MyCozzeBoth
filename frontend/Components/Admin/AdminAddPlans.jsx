import React, { useState } from "react";
import InputCustom from "../InputCustom";
import CustomDropdown from "../Auth/CustomDropDown";
import { Button, Switch } from "antd";
import { useDispatch } from "react-redux";
import { updatePlan, uploadPlan } from "../../store/Action/Admin";

const AdminAddPlans = ({ setaddSales, editPlan }) => {
  const [description, setdescription] = useState([]);
  const [checked, setchecked] = useState(false);
  const [type, settype] = useState("Select the plan for");
  const options = [
    {
      name: "Roommate",
    },
    {
      name: "PG",
    },
    {
      name: "Flat",
    },
  ];
  const [desc, setdesc] = useState("");
  const addDescription = () => {
    if (desc.trim() === "") return;
    const dets = {
      value: desc,
    };
    setdescription([...description, dets]);
    setdesc("");
  };
  const removeDescription = (ind) => {
    const a = description?.filter((i, index) => index !== ind);
    setdescription(a);
  };
  const onChange = (val) => {
    setchecked(val);
  };
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("planName", e.target.planName.value);
    formData.append("price", Number(e.target.price.value));
    formData.append("type", type);
    formData.append("realPrice", Number(e.target.realPrice.value));
    formData.append("days", Number(e.target.day.value));
    formData.append("description", JSON.stringify(editPlan?.description));
    formData.append("manager", editPlan?.manager);
    dispatch(updatePlan(editPlan._id,formData));
    setaddSales(false);
  };
  return (
    <div className="flex flex-col relative h-full ">
      <i className="ri-arrow-left-line" onClick={()=>setaddSales(false)}></i>
      <form
        onSubmit={onSubmit}
        className="flex flex-col  w-full  h-full pb-20 overflow-y-auto"
      >
        <InputCustom
          title={"Plan Name"}
          name={"planName"}
          required={"true"}
          placeholder={"DIY Plan"}
          type={"text"}
          val={editPlan?.planName}
        />
        <InputCustom
          title={"Plan Price"}
          name={"price"}
          required={"true"}
          type={"number"}
          placeholder={"299"}
          val={editPlan?.price}
        />
           <InputCustom
          title={"Original Price"}
          name={"realPrice"}
          required={"true"}
          type={"number"}
          placeholder={"299"}
          val={editPlan?.realPrice}
        />
        <InputCustom
          title={"Days"}
          name={"day"}
          required={"true"}
          type={"number"}
          placeholder={"15"}
          val={editPlan?.days}

        />
        <div className="flex  mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
          <label className="font-extrabold">
            Plan For <span className="text-primary">*</span>
          </label>
          <CustomDropdown
            options={options}
            selectedOption={editPlan?.type}
            setSelectedOption={settype}
            width={"100%"}
          />
        </div>
        <div className="flex  mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
          <label className="font-extrabold">
            Plan Description <span className="text-primary">*</span>
          </label>
          {/* <div className="flex w-full items-center justify-start gap-2">
            <input
              type={"text"}
              placeholder={"Unlimited listings"}
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
              className="w-[80%] p-2 rounded-xl border-2 outline-primary max-md:w-full"
            />
            <Button
              type="primary"
              onClick={addDescription}
              className="rounded-full h-10 w-10"
            >
              <i className="ri-add-line"></i>
            </Button>
          </div> */}
          {editPlan?.description?.map((i, index) => (
            <div
              key={index}
              className="flex w-[80%] items-center justify-between border-2 p-1 px-3 rounded-lg"
            >
              <p>{i?.value}</p>
              {/* <i
                onClick={() => removeDescription(index)}
                className="ri-close-circle-fill text-primary cursor-pointer"
              ></i>{" "} */}
            </div>
          ))}
        </div>
        <div className="flex ml-3 mt-6 flex-col items-start gap-2 p-2 w-full max-md:ml-0">
          <label className="font-extrabold">
            Manager Added <span className="text-primary">*</span>
          </label>
          <div className="flex">
            <Switch value={editPlan?.manager}  />
          </div>
        </div>
        <button type="submit" className="w-fit ml-4">
          Add Plan
        </button>
      </form>
    </div>
  );
};

export default AdminAddPlans;
