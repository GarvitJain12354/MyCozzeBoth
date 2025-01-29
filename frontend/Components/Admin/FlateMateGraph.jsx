import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminFlatMateDetails } from "../../store/Action/Admin";
import FlatmateBar from "./FlatmateBar";
import { Select } from "antd";
import { getAllCity, getAllPlans } from "../../store/Action/Others";

const GraphPage = ({ role }) => {
  const { flatgraph } = useSelector((state) => state.Admin);
  const { city, plan } = useSelector((state) => state.Others);
  const [filter, setfilter] = useState("All");
  const [value, setvalue] = useState("All");
  const [option, setoption] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminFlatMateDetails(role, "", "", ""));
    dispatch(getAllCity());
    dispatch(getAllPlans());
  }, []);
  const handleChange = (value) => {
    setfilter(value);
    if (value === "All") {
      dispatch(getAdminFlatMateDetails(role, "", "", ""));
      setvalue("All");
    }
  };
  const handleChangeFilter = (value) => {
    setvalue(value);
    if (filter === "Gender") {
      dispatch(getAdminFlatMateDetails(role, value, "", ""));
    }
    if (filter === "Region") {
      dispatch(getAdminFlatMateDetails(role, "", value, ""));
    }
    if (filter === "Subscription") {
      dispatch(getAdminFlatMateDetails(role, "", "", value));
    }
  };
  useEffect(() => {
    if (filter === "Gender") {
      setoption([
        {
          value: "Male",
          label: "Male",
        },
        {
          value: "Female",
          label: "Female",
        },
        {
          value: "Others",
          label: "Others",
        },
      ]);
    }
    if (filter === "Region") {
      if (city) {
        const region = [];
        const r = city?.map((i, ind) => {
          region.push({
            value: i.name,
            label: i.name,
          });
        });

        setoption(region);
      }
    }
    if (filter === "Subscription") {
      const plans = [];
      plan.map((i) => {
        i.type === "Roommate"
          ? plans.push({
              value: i.planName + "/" + i.price,
              label: i.planName + "/" + i.price,
            })
          : "";
      });
      setoption(plans);
    }
  }, [filter]);

  return (
    <div>
      <div className="w-full flex items-center justify-between px-5">
        <Select
          defaultValue="All"
          value={filter}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={[
            {
              value: "All",
              label: "All",
            },
            {
              value: "Gender",
              label: "Gender",
            },
            {
              value: "Region",
              label: "Region",
            },
            {
              value: "Subscription",
              label: "Subscription",
            },
          ]}
        />
        <Select
          defaultValue="Select Filter"
          //   value={filter}

          value={value}
          style={{
            width: 120,
          }}
          onChange={handleChangeFilter}
          options={option}
        />
      </div>
      {flatgraph?.every((value) => value === 0) ? (
        <div className="h-20 w-full p-10">
          <h1 className="text-2xl font-semibold">No data available</h1>
        </div>
      ) : (
        <FlatmateBar monthlySales={flatgraph} />
      )}
    </div>
  );
};

export default GraphPage;
