export const ADD_MERCHANT = 'ADD_MERCHANT';
export const REMOVE_MERCHANT = 'REMOVE_MERCHANT';

export const addMerchant = (merchant) => {
    return {
        type: ADD_MERCHANT,
        payload: merchant
    };
};

export const removeMerchant = (id) => {
    return {
        type: REMOVE_MERCHANT,
        payload: id
    };
};