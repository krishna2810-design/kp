import React from "react";
import { connect } from "react-redux";
import { increment } from "../action/Count";
function Count(props) {
  const increments = () => {
    props.dispatch(increment());
  };
  return (
    <div>
      <h4>Count - {props.count}</h4>
      <button onClick={increments}>Click</button>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};
export default connect(mapStateToProps)(Count);
