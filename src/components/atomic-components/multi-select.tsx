import React from "react";
import { Select } from "antd";
import { MultiSelectProps } from "@/interfaces/common-interfaces";

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  placeholder = "Select options",
  isLoading = false,
  allowClear = true,
  defaultValue,
  maxTagCount = 2,
  mode = "multiple", // Default to multiple
}) => {
  return (
    <div className="w-full">
      <Select
        mode={mode === "multiple" ? "multiple" : undefined} // Set mode dynamically
        allowClear={allowClear}
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        value={defaultValue}
        loading={isLoading}
        className="w-full"
        maxTagCount={mode === "multiple" ? maxTagCount : undefined} // Only apply maxTagCount for multi-select
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "")
            .toString()
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      />
    </div>
  );
};
