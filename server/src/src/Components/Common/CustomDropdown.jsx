import { Dropdown, Select, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const CustomDropdown = ({
  menus,
  type = "default",
  onClick,
  title,
  className,
  placement = "bottom",
  icon,
  titleClassName,variant,
  placeholder,allowClear,defaultValue,disabled,required,containerClassName,onChange,value
}) => {

  const styledMenus = menus.map((menu) => ({
    key: menu.id,
    label: (
      <span
        className={`lg:py-2 rounded-none text-gray-700 font-Poppins ${
          menu.id === 6 && "text-red-500"
        }`}
      >
        <Link
          to={menu.to}
          onClick={() => menu.id === 6 && sessionStorage.removeItem("token")}
        >
          {menu.title}
        </Link>
      </span>
    ),
    onClick: menu.onClick,
  }));
  const selectOptions = menus.map((menu) => ({
    label: menu.label,
    value: menu.value, // Assuming `id` is the value you want for the select
  }));

  return (
    <>
      {type === "default" ? (
        <Dropdown
          menu={{ items: styledMenus, selectable: true }}
          placement={placement}
          className={`tracking-wider capitalize ${className}`}
        >
          <Space>{icon ? icon : title}</Space>
        </Dropdown>
      ) : (
        <span className={containerClassName}>
          <p className={`text-base font-normal capitalize mb-4 text-gray-700 ${titleClassName}`}>
        {title}
        {required && (
            <span className="text-red-500 mx-1 text-xs bg-red-50 rounded-md p-1">required</span>
        )}
      </p>
      <Select
        defaultValue={defaultValue}
        value={value} 
        allowClear={allowClear}
        options={selectOptions}
        placeholder={placeholder}
        disabled={disabled}
        className={`${className}`}
        onChange={onChange}
        variant={variant}
      />
        </span>
      )}
    </>
  );
};

export default CustomDropdown;
