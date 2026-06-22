import { useState } from "react";

type ToggleState = [boolean, () => void];

function useToggle(initialVal = false): ToggleState  {
  // call useState, "reserve piece of state"
  const [state, setState] = useState(initialVal);
  const toggle = () => {
    setState(prevState => !prevState);
  };
  // return piece of state AND a function to toggle it
  return [state, toggle];
}
export default useToggle;
