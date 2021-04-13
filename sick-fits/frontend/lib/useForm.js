import { useCallback, useState } from "react";

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  const handleChange = (e) => {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }

    if (type === "file") {
      value = e.target.files[0];
    }

    setInputs({ ...inputs, [name]: value });
  };

  const resetForm = useCallback(() => {
    setInputs(initial);
  }, []);

  const clearForm = useCallback(() => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => {
        return [key, ""];
      })
    );
    setInputs(blankState);
  }, []);

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
