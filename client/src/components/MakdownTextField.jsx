import React, { useState, useCallback } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymd";

export const ControlledUsage = () => {
  const [value, setValue] = useState("Initial value");

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  return <SimpleMDE value={value} onChange={onChange} />;
};
