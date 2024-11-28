import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

const NumberInputWithDebounce = ({
  initialValue,
  onUpdateQuantity,
}: {
  initialValue: number;
  onUpdateQuantity: (value: number) => void;
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const [tempValue, setTempValue] = useState<number | string>(initialValue);

  // Declare the debounced function type
  const debouncedUpdate = useCallback(
    debounce((val: number) => {
      onUpdateQuantity(val);
    }, 500),
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
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
      setTempValue(numericValue);
      setValue(numericValue);

      debouncedUpdate(numericValue);
    }
  };

  const handleBlur = () => {
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
