import React from "react";
import request from "superagent";
import { Button, Badge, Input } from "react-bootstrap";
import ApplicantStore from '../stores/applicant';

const get = (url, cb) => {
  request.get(url)
         .set("Content-Type", "application/json")
         .end(cb);
};
export default class Counter extends React.Component {
  static displayName = "Counter";
  static propTypes = { initialCount: React.PropTypes.number };
  static defaultProps = { initialCount: 0 };

  constructor(props) {
    super(props);
    this.state = { count: props.initialCount };
  }

  componentWillMount() {
    get("/value", (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({ count: res.body.count });
    });
  }

  onClickInc = (event) => {
    event.preventDefault();
    get("/inc", (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({ count: res.body.count });
    });
  }

  onClickGenerateCode = (e) => {
    e.preventDefault();
    let email = this.refs.applicantEmail.getValue();
    ApplicantStore.invitationcode(email, function() {

      console.log('done');
    });
  }

  onClickDec = (event) => {
    event.preventDefault();
    get("/dec", (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({ count: res.body.count });
    });
  }

  render() {
    return (
      <div>
        <h3>Counter</h3>
        <div className="counter">
          邀请码
          <Badge>{this.state.count}</Badge>
          <form>
            <Input type='text' label='选择申请人' ref="applicantEmail" placeholder='email' />
            <Button bsStyle="success" type="submit "
                    onClick={this.onClickGenerateCode}>生成邀请码</Button>
          </form>
        </div>
      </div>
    );
  }
}
