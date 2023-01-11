import { useSelector } from "react-redux";
import { Register } from "./components/Register/Register";
import { Todo } from "./components/Todo/Todo";

function App() {
  const state = useSelector((state) => state.user);

  if (state.token) {
    return <Todo/>
  }else{
    return <Register/>
  }
}

export default App;
