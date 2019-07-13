import React from "react";
import { connect } from "react-redux";

// SCSS
import drstyles from "../scss/Denominasirupiah.scss";

// COMPONENTS
import Input from "./Input";
import Result from "./Result";
import Footer from "./Footer";
import Help from "./Help";

class Denominasirupiah extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showhelpstatus: false };
  }

  // show & hide help popup event handler
  showHelp = e => {
    // console.log("test");
    this.setState({ showhelpstatus: true });
  };

  hideHelp = e => {
    // console.log("test");
    this.setState({ showhelpstatus: false });
  };

  render() {
    // console.log(this.props);
    let result;
    if (this.props.denomination !== null) {
      result = this.props.denomination.denominationResult;
    } else {
      result = null;
    }

    return (
      <div className={drstyles.mainContainer}>
        <div className={drstyles.appHeading}>
          <h1>Denominasi Rupiah</h1>
          <a onClick={this.showHelp} className={drstyles.linkHelp}>
            Petunjuk Penggunaan Klik Disini
          </a>
        </div>
        <Input />
        <Result result={result} amount={this.props.amount} />
        <Footer />
        <Help showstatus={this.state.showhelpstatus} hide={this.hideHelp} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return state;
};

export default connect(mapStateToProps)(Denominasirupiah);
