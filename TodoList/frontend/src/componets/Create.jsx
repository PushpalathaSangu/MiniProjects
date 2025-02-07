import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function Create() {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    axios.post("http://localhost:3001/add",{task:task})
    .then(result=>
      {
        location.reload(result);
      })
    .catch(err=>console.log(err))
    setTask("");
  };

  return (
    <div className="create_form">
      <input 
        type="text" 
        value={task}
        onChange={(e) => setTask(e.target.value)} 
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

Create.propTypes = {
  setTodos: PropTypes.func.isRequired,
};
