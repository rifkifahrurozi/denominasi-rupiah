import React from "react";
import drstyles from "../scss/Footer.scss";

import { connect } from "react-redux";

// ICONS
import githubicon from "../static/images/github.svg";
import instagramicon from "../static/images/instagram.svg";

const Footer = props => {
  return (
    <div className={drstyles.footerContainer}>
      <p>{props.initialStaticData.info}</p>
      <div className={drstyles.footerCredit}>
        <p>
          Copyright 2019 by Rifki Fahrurozi. Main purpose of this application is
          for review by .... Team.{" "}
        </p>
        <ul>
          <li
            style={{
              backgroundImage: `url(${instagramicon})`
            }}
          >
            <a href="https://instagram.com/rifkifahru" target="_blank">
              Instagram
            </a>
          </li>
          <li
            style={{
              backgroundImage: `url(${githubicon})`
            }}
          >
            <a
              href="https://github.com/rifkifahrurozi/denominasi-rupiah"
              target="_blank"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  // console.log(state);
  return state;
};

export default connect(mapStateToProps)(Footer);
