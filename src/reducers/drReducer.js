import { combineReducers } from "redux";

// Initial data untuk informasi pelengkap saja, supaya gak terlalu kosong hehehhe :D
const initialStaticData = () => {
  return {
    author: "Rifki Fahrurozi",
    info:
      "Mencari pecahan mata uang rupiah terbesar hingga terkecil dari jumlah angka yang dimasukan. Contoh: pecahan rupiah dari Rp 59.000 adalah 1x50.000, 1x5.000 dan 2x2.000. Silahkan baca petunjuk penggunaan aplikasi ini agar anda mendapatkan hasil yang diharapkan."
  };
};

const denominateReducer = (denominationState = null, action) => {
  switch (action.type) {
    case "DENOMINATED":
      denominationState = {
        denominationResult: action.payload,
        status: true
      };
      break;
    case "FAILED":
      nominal = "Failed!";
      break;
  }
  return denominationState;
};

const amountReducer = (amount = null, action) => {
  // if (action.type === "GET_AMOUNT") {
  //   return action.payload;
  // } else if (action.type === "EMPTY_AMOUNT") {
  //   return amount;
  // }
  switch (action.type) {
    case "GET_AMOUNT":
      return action.payload;
      break;
    case "EMPTY_AMOUNT":
      return null;
      break;
  }
  return amount;
};

export default combineReducers({
  initialStaticData: initialStaticData,
  denomination: denominateReducer,
  amount: amountReducer
});
