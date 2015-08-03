import React from "react";
import AuthStore from "../stores/auth";

const get = (url, cb) => {
  request.get(url)
         .set("Content-Type", "application/json")
         .end(cb);
};
export default class EventsPage extends React.Component {
  static displayName = "IndexPage";

  /* static defaultProps = { user: AuthStore.getUser() }; */

  constructor(props) {
    super(props);
    this.state = { user:props.user };
  }

  componentWillMount() {
    get("/events/9month", (err, res) => {
      if(err) {
        console.log(err);
        return ;
      }
      this.setState({ user: res.body.user });
    });
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.onStoreChange);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.onStoreChange);
  }

  render() {
    return (
      <div>
        <h2>简寻</h2>
        <NavItemLink eventKey={1} to="profile">
          <Glyphicon glyph="user" /> {this.state.user}
        </NavItemLink>
      </div>
    );
  }
}
