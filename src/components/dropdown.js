import { useState } from "react"

export const Dropdown = (props) => {
    const { options, selected, onSelect } = props
    const [selectedOption, setSelectedOption] = useState(selected || null);
  
    const handleSelect = (option) => {
      setSelectedOption(option);
      onSelect(option);
    };
  
    return (
      <select value={selectedOption} onChange={(e) => handleSelect(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} selected={selectedOption.value === option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }