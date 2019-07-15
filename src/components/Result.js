import React from "react";

import drstyles from "../scss/Result.scss";

const Result = props => {
  // console.log(props);
  // map array hasil pecahan rupiah
  const renderList = () => {
    return props.result.map(rupiah => {
      // format pecahan rupiah ke indonesian currency
      let pecahanRupiah = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0
      }).format(rupiah.pecahan);

      return (
        <div key={rupiah.pecahan} className={drstyles.itemResult}>
          {props.dataloaded !== false
            ? rupiah.jumlah + " x " + pecahanRupiah
            : ""}
        </div>
      );
    });
  };

  if (props.result !== null && props.amount !== null) {
    let amountIDR = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0
    }).format(props.amount);
    return (
      <div className={drstyles.resultContainer}>
        <p>
          Hasil pembagian dari <strong>{amountIDR}</strong> ke dalam pecahan
          mata uang rupiah terbesar hingga terkecil adalah:
        </p>
        {renderList()}
      </div>
    );
  }
  return "";
};

export default Result;
