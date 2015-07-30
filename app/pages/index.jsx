import React from "react";
import Applicant from "../components/applicant";

export default class Index extends React.Component {
  static displayName = "IndexPage";
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>简寻</h2>
        <Applicant />
      </div>
    );
  }
}
