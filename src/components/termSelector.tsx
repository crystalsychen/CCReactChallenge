import { useState } from "react";

interface termSelectorProps {
  options: string[]; 
  defaultSelected: string;
  setSelected: (selected: string) => void;
};

const TermSelector = ({options, defaultSelected, setSelected}: termSelectorProps) => {

    const [currentSelection, setCurrentSelection] = useState(defaultSelected); 

    return (
        <div className="flex justify-center">
            {options.map((option) => (
                <div key ={option} className="inline-block mr-2">
                    <input type="radio" id={option} name="term" value={option} checked = {option === currentSelection} 
                    onChange={() => {
                        setSelected(option)
                        setCurrentSelection(option)}
                        }/>

                    <label htmlFor={option} className="ml-1" data-cy={option}>{option}</label>
                </div>
            ))}
        </div>
    )

}

export default TermSelector;