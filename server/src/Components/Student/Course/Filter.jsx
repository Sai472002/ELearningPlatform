import React, { useState } from "react";
import CustomInput from "../../Common/CustomInput";
import CustomButton from "../../Common/CustomButton";
import CustomDropdown from "../../Common/CustomDropdown";

const Filter = ({
  setTitle = () => {},
  setPrice = () => {},
  setRate = () => {},
  className,
}) => {
  const [selectedPrice, setSelectedPrice] = useState("select");
  const [selectedRating, setSelectedRating] = useState("");
  const priceOption = [
    {
      label: "select",
      value: "select",
    },
    {
      label: "0-800",
      value: 0,
    },
    {
      label: "800-1000",
      value: 1,
    },
    {
      label: "Above 1000",
      value: 2,
    },
  ];

  return (
    <div
      className={`flex z-30 flex-col md:justify-start border gap-4 md:gap-8 justify-between drop-shadow md:h-[90vh] px-2 py-4 w-full md:w-fit md:px-4 lg:px-8 bg-white h-fit sticky top-[10vh] left-0 ${className}`}
    >
      <div className="grid gap-4 w-full grid-flow-col md:grid-flow-row justify-between md:justify-normal">
        <CustomInput
          placeholder="Filter by course title"
          className=" w-full "
          titleClassName="text-xs md:text-base"
          title="Filter"
          onChange={setTitle}
          containerClassName="w-full h-fit "
        />
        <CustomDropdown
          title="Price"
          menus={priceOption}
          titleClassName="text-xs md:text-base"
          type="select"
          className=" w-full"
          containerClassName="w-32 md:w-full"
          onChange={(e) => {
            setSelectedPrice(e.value);
            setPrice(e);
          }}
          value={selectedPrice}
        />
      </div>
      <div className="mr-auto text-gray-700 w-full text-xs md:text-base flex md:block items-center justify-between">
        <p className="mb-4">Rating</p>
        <div className="grid gap-2 grid-flow-col">
          {[4, 5].map((v, i) => (
            <CustomButton
              key={i}
              className={`w-full text-xs md:text-sm
                ${
                  selectedRating !== v
                    ? "bg-gray-50 text-gray-500"
                    : "border-Primary text-Primary"
                }
              `}
              variant={selectedRating === v ? "outlined" : "text"}
              onClick={() => {
                if (selectedRating === v) {
                  setSelectedRating(null); // Clear the filter
                  setRate(null); // Reset the rate
                } else {
                  setSelectedRating(v); // Set the new filter
                  setRate(v);
                }
              }}
              title={v === 4 ? "4 & below" : "4 above"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
