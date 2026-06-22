import { ChangeEvent, useState } from "react";

type InputState = [string, (evt: ChangeEvent<HTMLInputElement>) => void, () => void];

export default (initialVal: string): InputState => {
  const [value, setValue] = useState(initialVal);
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };
  const reset = (): void => {
    setValue("");
  };
  return [value, handleChange, reset];
};
