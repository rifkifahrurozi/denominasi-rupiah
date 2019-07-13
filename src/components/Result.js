import React, { useState, useEffect } from "react";

import drstyles from "../scss/Result.scss";

const Result = props => {
  // console.log(props);
  // map hasil pecahan rupiah
  const renderList = () => {
    return props.result.map(rupiah => {
      return (
        <div key={rupiah.pecahan} className={drstyles.itemResult}>
          {props.dataloaded !== false
            ? rupiah.jumlah + " x " + rupiah.pecahan
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
          mata uang rupiah terbesar adalah:
        </p>
        {renderList()}
      </div>
    );
  }
  return "";
};

export default Result;
