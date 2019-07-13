export const denominated = nominal => {
  return {
    type: "DENOMINATED",
    payload: nominal
  };
};

export const getAmount = amount => {
  return {
    type: "GET_AMOUNT",
    payload: amount
  };
};

export const emptyAmount = () => {
  return {
    type: "EMPTY_AMOUNT"
  };
};
