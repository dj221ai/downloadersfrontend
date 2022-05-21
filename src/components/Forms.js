import React, {useState} from 'react';
import Dropdown from './Dropdown';
import { ExcelRenderer, OutTable } from 'react-excel-renderer';
import axios from 'axios';


function UploadForm(props) {
    
    const [fileType, setFileType] = useState("");
    const [sheetName, setSheetName] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isFilePicked, setIsFilePicked] = useState(false);


    function getDropDownData(dpData) {
        console.log("dpData is ", dpData);
        setFileType(dpData);
    }

    const handleInput = (event) => {
        setSheetName(event.target.value);
    }

    const handleFileInput  = (event) => {
        setUploadedFile(event.target.files[0]);
        setIsFilePicked(true);
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("new append data is ", sheetName, fileType, isFilePicked, uploadedFile);

        let formFields = new FormData();
        formFields.append('fileType', fileType);
        formFields.append('sheetName', sheetName);
        formFields.append('isFilePicked', isFilePicked);

        if (uploadedFile !== null){
            formFields.append('uploadedFile', uploadedFile);
        }

        let apiUrl = 'http://localhost:8000/api/upload/'

        await axios({
            method: 'post',
            url: apiUrl,
            data: formFields
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log("error from post is  >>>>>> ", error);
        })

        setFileType("selector");
        setSheetName("");
        setUploadedFile(null);
        setIsFilePicked(false);
        
    }


    
    return (
        <form onSubmit={handleSubmit}>
        <div className='main_div'>
            <div className='box'>
                <Dropdown dropdownData={getDropDownData} />
                <br/>
                <div className="input-box">
                    <input type="text" autoComplete='off' name="sheet" id='sheet' placeholder='Enter Sheet Name' onChange={handleInput} value={sheetName} />
                </div>
                <div className="input-box">
                    <input type="file" name="filename" id='filename' onChange={handleFileInput} />
                </div>
                <div>
                    <input type="submit" value="Upload" />
                </div>
            </div>
        </div>
    </form>
    )


}

export default UploadForm;

