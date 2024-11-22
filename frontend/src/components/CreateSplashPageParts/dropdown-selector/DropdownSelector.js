import Select from 'react-select';
import './DropdownSelector.css';

const DropdownSelector = ({ dropdownItems, selectionField, selectedValue, onDropdownChange }) => {

  let dropdownOptions = []

  dropdownItems.forEach(option => {
    const selectionObj = {value: option, label: option}
    dropdownOptions.push(selectionObj)
  });

  console.log(dropdownOptions)

  return (
    <>
    <div className="form-container">
        <label htmlFor={selectionField} className="form-label">
          {selectionField}:
        </label>
        <Select
          classNamePrefix="react-select"
          options={dropdownOptions}
          onChange={onDropdownChange}
          // value={selectedValue ? { value: selectedValue, label: selectedValue } : null}
        />
      </div>
    </>
  );
};

export default DropdownSelector;

