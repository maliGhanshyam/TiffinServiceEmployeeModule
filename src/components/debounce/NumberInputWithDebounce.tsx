import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const NumberInputWithDebounce = ({
  initialValue,
  onUpdateQuantity,
}: {
  initialValue: number;
  onUpdateQuantity: (value: number) => void;
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const [tempValue, setTempValue] = useState<number | string>(initialValue);

  // Debounced function for updating the quantity
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;

    if (inputVal === "") {
      // Allow temporary empty value
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

  const increment = () => {
    const newValue = value + 1;
    setTempValue(newValue);
    setValue(newValue);
    debouncedUpdate(newValue);
  };

  const decrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      setTempValue(newValue);
      setValue(newValue);
      debouncedUpdate(newValue);
    }
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      value={tempValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      inputProps={{
        style: { textAlign: "left", minWidth: "20px" },
        min: 1,
      }}
      sx={{ width: "120px", marginLeft: "10px"}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton size="small" onClick={decrement} disabled={value <= 1}>
              <RemoveIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={increment}>
              <AddIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default NumberInputWithDebounce;
