import Select from 'react-select';
import './DropdownSelector.css';

const DropdownSelector = ({ dropdownItems, selectionField, selectedValue, onDropdownChange }) => {

  return (
    <>
    <div className="form-container">
        <label htmlFor={selectionField} className="form-label">
          {selectionField}:
        </label>
        <Select
          classNamePrefix="react-select"
          options={dropdownItems.map((item) => ({ value: item, label: item }))}
          onChange={onDropdownChange}
          // value={selectedValue ? { value: selectedValue, label: selectedValue } : null}
        />
      </div>
    </>
  );
};

export default DropdownSelector;

