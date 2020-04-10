import React, { useState, useCallback, useEffect, useRef } from 'react';
import _ from 'lodash';
import { InputBase } from '@material-ui/core';

export const ControlledInput = ({ value: propsValue, onValueUpdate, type }) => {
  const [value, setValue] = useState(propsValue);

  const debouncedValueUpdate = useRef();
  useEffect(() => {
    debouncedValueUpdate.current = _.debounce((value) => onValueUpdate(value), 1000);
  }, [onValueUpdate]);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
    debouncedValueUpdate.current(e.target.value);
  }, []);

  useEffect(() => {
    console.log('ControlledInput kind of componentDidUpdate');
    setValue(propsValue);
  }, [propsValue]);

  return <InputBase type={type} value={value} onChange={onChange} />;
};
