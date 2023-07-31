import React from "react";
import './TextInput.css'

const TextInput = React.forwardRef(( label, ref ) => {
  return (
    <div className="text-input-container">
      <div>
        <label className="text-input-label">{`${label.label}:`}</label>
      </div>
      <div>
        <textarea className="text-input-box" type="text" ref={ref}/>
      </div>
    </div>
  );
});

export default TextInput;