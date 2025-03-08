import React, { useEffect, useMemo, useState } from "react";
import { DELETE, GET } from "../../ApiFunction/ApiFunction";
import CustomTable from "../../Common/CustomTable";
import CustomInput from "../../Common/CustomInput";
import { action } from "../../Url/url";

function AdminInstructor() {
  const [insdata, setInsData] = useState([]);
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");

  const buttonOption = [
    { name: "View All", color: "#334155" },
    { name: "Technology", color: "#0ea5e9" },
    { name: "Business", color: "#6366f1" },
    { name: "Design", color: "#8b5cf6" },
    { name: "Programming", color: "#f43f5e" },
    { name: "Personal Development", color: "#eab308" },
  ];

  const getallInstructors = async () => {
    let response = await GET(action.GET_ALL_INS);
    setInsData(response.data);
  };

  const filterData = useMemo(() => {
    if (active !== 0) {
      return insdata.filter((a) => a.expertise == buttonOption[active].name);
    }

    if (search) {
      return insdata.filter((a) =>
        a.username.toLowerCase().includes(search.toLowerCase())
      );
    }

    return insdata;
  }, [active, insdata, search]);

  const columns = [
    {
      title: <span className="text-base font-semibold">Name</span>,
      dataIndex: "username",
      key: "username",
      render: (text) =>
        text ? <span className="font-semibold">{text}</span> : "----",
    },
    {
      title: <span className="text-base font-semibold">Age</span>,
      dataIndex: "age",
      key: "age",
      render: (text) => (text ? text : "---"),
    },
    {
      title: <span className="text-base font-semibold">Expertise</span>,
      dataIndex: "expertise",
      key: "expertise",
    },
  ];

  const deleteInstructor = async (userId) => {
    console.log(userId);
    const response = await DELETE(action.DEL_INS, {
      userId,
    });
    getallInstructors();
  };
  useEffect(() => {
    getallInstructors();
  }, []);

  return (
    <div className="w-full grid gap-8 lg:gap-12 ">
      <h1 className="lg:text-lg font-semibold text-gray-700 flex gap-2 ">
        Instructor{" "}
        <p className="rounded-full text-sm h-[30px] w-[30px] flex items-center justify-center bg-Primary text-white ">
          {insdata?.length}
        </p>
      </h1>
      <div className="flex justify-end items-center flex-wrap gap-4">
        {buttonOption.map((v, i) => (
          <button
            key={i}
            className={`p-2 rounded text-xs border duration-500 transition-all`}
            style={{
              borderColor: v.color,
              color: active === i ? "white" : v.color,
              backgroundColor: active === i && v.color,
            }}
            onClick={() => setActive(i)}
          >
            {v.name}
          </button>
        ))}
        <CustomInput
          containerClassName="ml-auto"
          placeholder="Search by name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <CustomTable
        columns={columns}
        data={filterData}
        editBtn={false}
        deleteFunction={(params) => deleteInstructor(params.userId)}
      />
    </div>
  );
}

export default AdminInstructor;
