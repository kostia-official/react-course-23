import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import { InputBase } from '@material-ui/core';

export const ControlledInput = ({ value: propsValue, onValueUpdate, type }) => {
  const [value, setValue] = useState(propsValue);

  const debouncedValueUpdate = useMemo(() => _.debounce((value) => onValueUpdate(value), 1000), [
    onValueUpdate
  ]);

  const onChange = (e) => {
    setValue(e.target.value);
    debouncedValueUpdate.current(e.target.value);
  };

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  return <InputBase type={type} value={value} onChange={onChange} />;
};
