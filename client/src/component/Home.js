import React from "react";
import Header from "../component/Header";
function Home(props) {
  return (
    <div>
      <Header {...props} />
      <h1>Task Management Application</h1>
    </div>
  );
}
export default Home;
