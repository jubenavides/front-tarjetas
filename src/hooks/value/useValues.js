import React from 'react';

const useValues = () => {
    const [values, setValues] = React.useState({})
    const updateValues = (key, value) => setValues({ ...values, [key]: value })
    const resetValues = () => setValues({})
    return {
        values,
        updateValues,
        resetValues
    }
}

export default useValues;
