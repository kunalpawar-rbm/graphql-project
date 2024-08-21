import React, { useState, ChangeEvent } from 'react';
import Heading from './Heading';

type TableOption = 'Ships' | 'Rockets' | 'Capsules' | 'Cores' | 'History';

interface DropdownProps {
  // dropdown value is in string
  value: string;
  // onChange which calls handleDropdownChange and returns nothing
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({value, onChange}) => {
  return (
    <div className="flex justify-between items-center bg-cyan-400">
      {/* flex-grow: Makes the div grow and take up all available space within the flex container. Helps in centering the heading. */}
      <div className="text-center text-sky-950 flex-grow h-16">
        <h1 className='text-5xl font-bold'>{value}</h1>
      </div>
      <div className="ml-auto">
        <label htmlFor="table-select">Choose data : </label>
        <select
          id="table-select"
          value={value}
          onChange={onChange}
          className="bg-cyan-200"
        >
          <option value="Ships">Ships</option>
          <option value="History">History</option>
          <option value="Capsules">Capsules</option>
          <option value="Cores">Cores</option>
          <option value="Rockets">Rockets</option>
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
