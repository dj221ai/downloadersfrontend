import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UploadForm from './Forms';

const ListFiles = (props) => {

    const [getRecords, setGetRecords] = useState([])

    let apiUrl = 'http://localhost:8000/api/upload/';

    let allData = "";

    useEffect(() => {
        async function getData(){
        await axios({
                method: 'get',
                url: apiUrl,
        }).then((result) => {
            console.log("total records are >>> ", result.data, typeof(result.data), typeof(result), result);
            allData = result.data;
        }).catch((err) => {
            console.log("eror is >>>> ", err)
        })

        setGetRecords(allData);

        }

        getData()
    }, [])

    const callToBtn = async (event) => {
        let btnId = event.target.id;
        console.log("this btn is clicked", btnId);
        
        let postUrl = 'http://localhost:8000/api/download/'

        await axios({
            method: 'POST',
            url: postUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                'btnId': btnId
            })
        }).catch((error) => {
            console.log("download pai error >>>> ", error);
        })
    }

    const deleteFile = async (event) => {
        let btnId = event.target.id;
        console.log("dlt btn clicked <---->", btnId);

        let delUrl = 'http://localhost:8000/api/delete/'
        console.log("get url is >>> ", delUrl);

        let temp_state_records = [...getRecords]

        await axios({
            method: 'POST',
            url: delUrl,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                'btnId': btnId
            })
        }).then(() => {
            axios({
                method: 'GET',
                url: apiUrl
            }).then((result) => {
                allData = result.data;
                setGetRecords(allData);
            })

        }).catch((error) => {
            console.log("delete  error is  >>>> ", error);
        })

        console.log("my new get records is =========================================================== ");
        console.log(getRecords)

    }


  return (
    <>
            <h3>All Uploaded Records are below :- </h3>
            <table>
            <tbody>
                <tr>
                    <th>Sr.No</th>
                    <th>File Name</th>
                    <th>File Type</th>
                    <th>Sheet Name</th>
                    <th>Delete File</th>
                    <th>Download Files</th>
                </tr>
            {
                getRecords.map((curElem) => (
                    <tr key={curElem.id}>
                        <td>{curElem.id}</td>
                        <td>{!curElem ? 'No File Uploaded' : curElem.uploadedFile.split('/').pop()}</td>
                        <td>{curElem.fileType}</td>
                        <td>{curElem.sheetName}</td>
                        <td><button className='btn btn-danger' id={curElem.id} onClick={deleteFile}>Delete</button></td>
                        <td><button className='btn btn-success downloadbtn' id={curElem.id} onClick={callToBtn}>Download</button></td>
                    </tr>
                ))

            }
            </tbody>
            </table>
    </>
  )
}

export default ListFiles