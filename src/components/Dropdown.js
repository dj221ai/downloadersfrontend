import React, {useState} from 'react'

const Dropdown = (props) => {
    
    const [ddvalue, setValue] = useState("selector");
    
    const options = [
        {label: 'Select file type', value: 'selector'},
        {label: 'LifeDB', value: 'Life'},
        {label: 'SchoolDB', value: 'School'}
    ];


    const handleChange = (e) => {
        setValue(e.target.value);
        {
            props.dropdownData(e.target.value)
        }
        
    }

  return (

        <div>
            <label>
                Select File Type:-
                <select value={ddvalue} onChange={handleChange}>
                    {
                        options.map((curOption) => {
                            return (
                                <option value={curOption.value} key={curOption.value}> {curOption.label} </option>
                            )
                        })
                            
                    }
                </select>
                
            </label>

        </div>

  )
}

export default Dropdown