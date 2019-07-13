import React from "react";
import { connect } from "react-redux";

// scss
import drstyles from "../scss/Input.scss";

// action creator
import { denominated, getAmount, emptyAmount } from "./actions/actions";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nominal: "",
      warning: "",
      validate: false,
      errorClass: drstyles.hideMessage,
      denominations: []
    };
  }

  // validasi input dari user
  validateInput = value => {
    // const rgx = /(^\d{1,3}(?!\d|\w|\W)|(?=^\d\.\d{3}(?!\d|\w|\W))+)|(?=^\d\,\d{2}(?!\d|\w|\W))/; // sebelumnya tanpa RP
    const rgx = /((^\Rp|\Rp\s)(\d{1,3}(?!\d|\w|\W))|(^\d{1,3}(?!\d|\w|\W))|(?=\d\.\d{3}(?!\d|\w|\W))+)|(?=\d\,\d{2}(?!\d|\w|\W))/;
    return rgx.test(value);
  };

  // handler saat user mengganti value pada input
  onKeydownInputHandler = e => {
    const inputValue = e.key;
    const validPattern = /[RrPp.,]|\s|\d/;
    const shiftButton = e.keyCode === 16 ? true : false; // tombol SHIFT pada keyboard

    if (shiftButton) {
      this.setState({ errorClass: drstyles.hideMessage });
    } else if (inputValue.match(validPattern)) {
      this.setState({ errorClass: drstyles.hideMessage });
    } else {
      e.preventDefault();
      this.setState({
        warning:
          "Error: Karakter yang diperbolehkan hanya Rp,spasi,backspace,titik,koma, dan angka",
        errorClass: drstyles.showMessage
      });
    }
  };

  // input change handler
  onChangeInputHandler = e => {
    // kosongkan data pada section result apabila field kosong
    if (e.target.value === "") {
      this.props.denominated(this.state.denominations); // dispatch action
      this.props.emptyAmount(); // empty amount (result sebelumnya akan otomatis hilang)
    }

    let inputFromUser = e.target.value; // data yang diinput oleh user

    if (this.validateInput(inputFromUser) === false) {
      this.setState({ validate: false }); // apabila data tidak valid set validate ke false, untuk selanjutnya di proses di onSubmit
    } else {
      this.setState({ nominal: inputFromUser, validate: true }); // set ke true agar dispatch berjalan di onSubmit

      // apabila input valid, maka extract number yang diinput oleh user untuk disimpan di state dan dikirim ke reducer
      let inputFromUserExtracted =
        inputFromUser.match(/\d+/g) !== null
          ? inputFromUser.match(/\d+/g).join("")
          : 0;

      let denominationsCount = this.denominateRupiah(inputFromUserExtracted);
      this.setState({ denominations: denominationsCount });
    }
  };

  // input focus handler
  onFocusInputHandler = e => {
    this.setState({ errorClass: drstyles.hideMessage }); // kosongkan pesan error (apabila ada)
  };

  // submit form handler
  onSubmitFormHandler = e => {
    e.preventDefault(); // prevent default

    if (this.state.validate === false) {
      this.setState({
        warning:
          "Error: Format tidak valid. Masukan format sesuai pada petunjuk penggunaan.",
        errorClass: drstyles.showMessage
      });
      this.props.emptyAmount(); // empty amount (result sebelumnya akan otomatis hilang)
    } else {
      this.props.denominated(this.state.denominations); // dispatch action
      let nominalFormatted =
        this.state.nominal.match(/\d+/g) !== null
          ? this.state.nominal.match(/\d+/g).join("")
          : 0;
      this.props.getAmount(nominalFormatted); // dispatch amount
    }
  };

  // hitung pecahan dari nominal yang diinput
  denominateRupiah = nominal => {
    let inum = nominal.match(/\d+/) !== null ? nominal.match(/\d+/)[0] : 0; // extract number dari number yang diinput user yang telah tersimpan di state
    let i = inum;
    let obj = [];

    /* 100K */
    const seratusribuan = n => {
      let j = n / 100000;
      return j;
    };

    if (seratusribuan(i) >= 1) {
      obj = [
        ...obj,
        { pecahan: "100000", jumlah: Math.floor(seratusribuan(i)) }
      ];
    }

    /* 50K */
    const limapuluhribuan = n => {
      return ((seratusribuan(i) % 1).toFixed(5) * 100000) / 50000;
    };

    // tambah 50ribuan ke object jika ada
    if (limapuluhribuan(i) >= 1) {
      obj = [
        ...obj,
        { pecahan: "50000", jumlah: Math.floor(limapuluhribuan(i)) }
      ];
    }

    /* 20K */
    const duapuluhribuan = n => {
      if (limapuluhribuan(n) >= 1) {
        return ((seratusribuan(i) % 1).toFixed(5) * 100000 - 50000) / 20000;
      } else {
        return ((seratusribuan(i) % 1).toFixed(5) * 100000) / 20000;
      }
    };

    // tambah 20ribuan ke object jika ada
    if (duapuluhribuan(i) >= 1) {
      obj = [
        ...obj,
        { pecahan: "20000", jumlah: Math.floor(duapuluhribuan(i)) }
      ];
    }

    /* 10K */
    const sepuluhribuan = n => {
      if (n >= 20000) {
        let nmin;
        n >= 50000
          ? (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                50000) /
              10000)
          : (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n))) /
              10000);
        return nmin / 10 < 0.5 ? Math.floor(nmin) : Math.round(nmin);
      } else {
        return ((seratusribuan(i) % 1).toFixed(5) * 100000) / 10000;
      }
    };

    // tambah 10ribuan ke object jika ada
    if (sepuluhribuan(i) >= 1) {
      obj = [
        ...obj,
        { pecahan: "10000", jumlah: Math.floor(sepuluhribuan(i)) }
      ];
    }

    /* 5K */
    const limaribuan = n => {
      if (n >= 10000) {
        let nmin;
        n >= 50000
          ? (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                10000 * Math.floor(sepuluhribuan(n)) -
                50000) /
              5000)
          : (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                10000 * Math.floor(sepuluhribuan(n))) /
              5000);
        return nmin / 10 < 0.5 ? Math.floor(nmin) : Math.round(nmin);
      } else {
        return ((seratusribuan(i) % 1).toFixed(5) * 100000) / 5000;
      }
    };

    // tambah 5ribuan ke object jika ada
    if (limaribuan(i) >= 1) {
      obj = [...obj, { pecahan: "5000", jumlah: Math.floor(limaribuan(i)) }];
    }

    /* 2K */
    const duaribuan = n => {
      if (n >= 5000) {
        let nmin;
        n >= 50000
          ? (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                10000 * Math.floor(sepuluhribuan(n)) -
                5000 * Math.floor(limaribuan(n)) -
                50000) /
              2000)
          : (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                10000 * Math.floor(sepuluhribuan(n)) -
                5000 * Math.floor(limaribuan(n))) /
              2000);
        return nmin / 10 < 0.5 ? Math.floor(nmin) : Math.round(nmin);
      } else {
        return ((seratusribuan(i) % 1).toFixed(5) * 100000) / 2000;
      }
    };

    // tambah 2ribuan ke object jika ada
    if (duaribuan(i) >= 1) {
      obj = [...obj, { pecahan: "2000", jumlah: Math.floor(duaribuan(i)) }];
    }

    /* 1K */
    const seribuan = n => {
      if (n >= 2000) {
        let nmin;
        n >= 50000
          ? (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                10000 * Math.floor(sepuluhribuan(n)) -
                5000 * Math.floor(limaribuan(n)) -
                2000 * Math.floor(duaribuan(n)) -
                50000) /
              1000)
          : (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                10000 * Math.floor(sepuluhribuan(n)) -
                5000 * Math.floor(limaribuan(n)) -
                2000 * Math.floor(duaribuan(n))) /
              1000);
        // pembanding menggunakan 0.5 karena 1k jumlahnya tidak akan lebih dari 1 apabila nominal yang dihitung lebih dari 2k
        return nmin / 10 < 0.5 ? Math.floor(nmin) : Math.round(nmin);
      } else {
        return ((seratusribuan(i) % 1).toFixed(5) * 100000) / 1000;
      }
    };

    // tambah 1ribuan ke object jika ada
    if (seribuan(i) >= 1) {
      obj = [...obj, { pecahan: "1000", jumlah: Math.floor(seribuan(i)) }];
    }

    /* 500 */
    const limaratusan = n => {
      if (n >= 1000) {
        let nmin;
        n >= 50000
          ? (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                10000 * Math.floor(sepuluhribuan(n)) -
                5000 * Math.floor(limaribuan(n)) -
                2000 * Math.floor(duaribuan(n)) -
                1000 * Math.floor(seribuan(n)) -
                50000) /
              500)
          : (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                10000 * Math.floor(sepuluhribuan(n)) -
                5000 * Math.floor(limaribuan(n)) -
                2000 * Math.floor(duaribuan(n)) -
                1000 * Math.floor(seribuan(n))) /
              500);
        // pecahan 500 dibulatkan kebawah, karena ada 1k sebelumnya jadi 500 tidak akan lebih dari satu
        return Math.floor(nmin);
      } else {
        return ((seratusribuan(i) % 1).toFixed(5) * 100000) / 500;
      }
    };

    // tambah 500an ke object jika ada
    if (limaratusan(i) >= 1) {
      obj = [...obj, { pecahan: "500", jumlah: Math.floor(limaratusan(i)) }];
    }

    /* 100 */
    const seratusan = n => {
      if (n >= 500) {
        let nmin;
        n >= 50000
          ? (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                10000 * Math.floor(sepuluhribuan(n)) -
                5000 * Math.floor(limaribuan(n)) -
                2000 * Math.floor(duaribuan(n)) -
                1000 * Math.floor(seribuan(n)) -
                500 * Math.floor(limaratusan(n)) -
                50000) /
              100)
          : (nmin =
              ((seratusribuan(i) % 1).toFixed(5) * 100000 -
                20000 * Math.floor(duapuluhribuan(n)) -
                10000 * Math.floor(sepuluhribuan(n)) -
                5000 * Math.floor(limaribuan(n)) -
                2000 * Math.floor(duaribuan(n)) -
                1000 * Math.floor(seribuan(n)) -
                500 * Math.floor(limaratusan(n))) /
              100);
        return Math.floor(nmin); // dibulatkan ke bawah. 100 tidak akan lebih dari lima, karena diatasnya ada 500
      } else {
        return ((seratusribuan(i) % 1).toFixed(5) * 100000) / 100;
      }
    };

    // tambah 100an ke object jika ada
    if (seratusan(i) >= 1) {
      obj = [...obj, { pecahan: "100", jumlah: Math.floor(seratusan(i)) }];
    }

    return obj;
  };

  // render
  render() {
    const warning = this.state.warning;
    console.log(this.state);
    return (
      <div className={drstyles.formContainer}>
        <form>
          <input
            type="text"
            placeholder="Masukan nominal"
            onKeyDown={this.onKeydownInputHandler}
            onChange={this.onChangeInputHandler}
            onFocus={this.onFocusInputHandler}
          />
          <button type="submit" onClick={this.onSubmitFormHandler}>
            ENTER
          </button>
        </form>
        <div className={drstyles.errorMessage}>
          <p className={this.state.errorClass}>{warning ? warning : ""}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return state;
};

export default connect(
  mapStateToProps,
  { denominated, getAmount, emptyAmount }
)(Input);
