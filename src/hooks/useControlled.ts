import React from "react";

export const useControlled = <T = any>(
  controlledValue: T,
  defaultValue: T,
  formatValue?: (value: T) => T
): [T, (value: React.SetStateAction<T>) => void, boolean] => {
  const { current: isControlled } = React.useRef(controlledValue !== undefined);
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    defaultValue
  );

  let value = isControlled ? controlledValue : uncontrolledValue;

  if (formatValue) {
    value = formatValue(value);
  }

  const setValue = React.useCallback(
    (nextValue) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
    },
    [isControlled]
  );

  return [value, setValue, isControlled];
};

export default useControlled
