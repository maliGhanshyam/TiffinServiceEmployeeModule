import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

const NumberInputWithDebounce = ({
  initialValue,
  onUpdateQuantity,
}: {
  initialValue: number;
  onUpdateQuantity: (value: number) => void;
}) => {
  const [value, setValue] = useState<number>(initialValue); // Local state for user input
  const [tempValue, setTempValue] = useState<number | string>(initialValue); // For intermediate values

  // Declare the debounced function type
  const debouncedUpdate = useCallback(
    debounce((val: number) => {
      console.log("Debounced update triggered with value:", val);
      onUpdateQuantity(val);
    }, 500),
    [] // Ensure debounce function is stable across renders
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log("Debounced function cleanup");
      debouncedUpdate.cancel(); // Ensure cancel method is available
    };
  }, [debouncedUpdate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;

    if (inputVal === "") {
      // Allow empty value temporarily for editing
      setTempValue("");
      return;
    }

    const numericValue = Number(inputVal);
    if (!isNaN(numericValue) && numericValue >= 1) {
      setTempValue(numericValue); // Update displayed value
      setValue(numericValue); // Update actual value

      // Trigger debounced API call
      debouncedUpdate(numericValue);
    }
  };

  const handleBlur = () => {
    // Reset to the last valid value on blur if input is empty
    if (tempValue === "") {
      setTempValue(value);
    }
  };

  return (
    <input
      type="number"
      min="1"
      value={tempValue}
      onChange={handleChange}
      onBlur={handleBlur}
      style={{ width: "60px", padding: "5px", textAlign: "center" }}
    />
  );
};

export default NumberInputWithDebounce;
