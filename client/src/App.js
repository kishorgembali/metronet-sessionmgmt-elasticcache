import { Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import ReviewPage from "./pages/ReviewPage";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={HomePage} />
      <Route path="/login" exact component={HomePage} />
      <Route path="/dashboard" exact component={DashboardPage} />
      <Route path="/review" exact component={ReviewPage} />
    </div>
  );
}

export default App;
