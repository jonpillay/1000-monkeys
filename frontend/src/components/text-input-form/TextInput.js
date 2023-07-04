import React, { useRef } from "react";
import './TextInput.css'

const TextInput = React.forwardRef(( label, ref ) => {

  return (
    <div className="text-input">
      <label className="text-input-label">{label + ":"}</label>
      <textarea className="text-input-input" type="textarea" ref={ref}/>
    </div>
  );
});

export default TextInput;