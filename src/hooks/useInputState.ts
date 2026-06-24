import { useState } from "react";
import type { ChangeEvent } from "react";
import { MAX_CHAR_ERROR_MSG } from "../constant";
type InputState = [
  string,
  string,
  number,
  (evt: ChangeEvent<HTMLInputElement>) => void,
  () => boolean,
  () => void,
];

export default (initialVal: string, maxLength?: number): InputState => {
  const [value, setValue] = useState(initialVal);
  const [error, setError] = useState("");

  const validate = (): boolean => {
    const trimmed = value.trim();
    if (trimmed === "") {
      setError("Todo cannot be empty");
      return false;
    }
    if (maxLength !== undefined && value.length > maxLength) {
      setError(`Todo cannot exceed ${maxLength} characters`);
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const nextValue = evt.target.value;
    if (maxLength !== undefined && nextValue.length > maxLength) {
      setError(`Todo cannot exceed ${maxLength} characters`);
      return;
    }
    setValue(nextValue);
    if (nextValue.trim() === "") {
      setError("");
      return;
    }
    if (maxLength !== undefined && nextValue.length === maxLength) {
      setError(MAX_CHAR_ERROR_MSG);
      return;
    }
    setError("");
  };

  const reset = (): void => {
    setValue("");
    setError("");
  };

  return [value, error, value.length, handleChange, validate, reset];
};
