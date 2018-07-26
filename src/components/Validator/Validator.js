export const validator = (objectForValidation) => {
    const key = Object.keys(objectForValidation)[0];
    const value = objectForValidation[key];
    if ( value === '' ) {
        return { invalid: (key + ' is empty') };
    } else {
        return {valid: ''};
    }
};