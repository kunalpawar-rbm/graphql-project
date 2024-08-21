import React, { useState } from "react";
import CapsuleMainPage from './CapsuleMainPage';
import CoreMainPage from './CoreMainPage';
import Dropdown from './Dropdown';
import HistoryMainPage from './HistoryMainPage';
import RocketMainPage from './RocketMainPage';
import ShipMainPage from './ShipMainPage';

const HomePage: React.FC = () => {
    // To save selected dropdown value
    const [selectedOption, setSelectedOption] = useState('Ships');

    type dropDownOption = 'Ships' | 'Rockets' | 'Capsules' | 'Cores' | 'History';

    // To handle dropdown change
    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value as dropDownOption);
    }

    return (
        <div>
            <Dropdown value={selectedOption} onChange={handleDropdownChange}/>

            {/* Conditional Rendering to change data accordingly to dropdown value */}
            {selectedOption === 'Ships' && <ShipMainPage/>}
            {selectedOption === 'Cores' && <CoreMainPage/>}
            {selectedOption === 'Rockets' && <RocketMainPage/>}
            {selectedOption === 'Capsules' && <CapsuleMainPage/>}
            {selectedOption === 'History' && <HistoryMainPage/>}
        </div>
    )
}

export default HomePage;