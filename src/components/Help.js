import React from "react";
import drstyles from "../scss/Help.scss";

const Help = props => {
  //   console.log(props);
  return (
    <div className={props.showstatus ? drstyles.showBox : drstyles.hideBox}>
      <div className={drstyles.modalContainer}>
        <div className={drstyles.modalBody}>
          <div className={drstyles.modalContent}>
            <h3>Petunjuk Penggunaan</h3>
            <ol>
              <li>
                Masukan jumlah angka yang ingin anda ubah ke dalam pecahan mata
                uang rupiah (pecahan yang paling besar hingga yang paling
                kecil).
              </li>
              <li>
                Klik tombol <strong>ENTER</strong> dan jumlah angka yang anda
                masukan tadi akan diubah ke dalam bentuk pecahan mata uang
                rupiah.
              </li>
            </ol>
            <h3>Aturan Penggunaan</h3>
            <ol>
              <li>
                Anda hanya bisa memasukan gabungan karakter yaitu:{" "}
                <strong>Rp</strong>, <strong>Titik(.)</strong>,{" "}
                <strong>Koma(,)</strong> dan angka dari <strong>0-9</strong>
              </li>
              <li>
                Format isian yang diperbolehkan adalah sebagai berikut, contoh:{" "}
                <strong>18.215</strong> (18215), <strong>Rp17500</strong>{" "}
                (17500), <strong>Rp17.500,00</strong> (17500),{" "}
                <strong>Rp 120.325</strong>
                (120325), <strong>005.000</strong> (5000),{" "}
                <strong>001000</strong> (1000)
              </li>
            </ol>
            <button onClick={props.hide} className={drstyles.btnClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
