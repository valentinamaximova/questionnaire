import QRCode from 'qrcode'
import { Button } from '@mui/material'
import React, {  useState } from "react";
import copy from "copy-to-clipboard"; 

function Code() {
  let questID = 1;
  let strLast = "";
  let url = "";

  const [text, setText] = useState("");
  
  const handleSubmitt=()=> { 
    const getURL = "http://localhost:4000/api/staff/" 
    fetch(getURL, {
        method: 'GET'
    }).then((response) => response.json()) 
    .then((text) => setText(text))
    .then(console.log("nz"))
  } 

 
  
 if(questID === 1){
   if(text[text.length-1] !== undefined){
    questID = text[text.length-1].questionnaire_id
    strLast = text[text.length-1].string;
    
  }
 }
  const [qr, setQr] = useState('')
  url = "qck.app/" + questID; 
    const GenerateQRCode = () =>  {
        QRCode.toDataURL(url, {
            width: 200,
            margin: 2,
            color: {
                dark: '#335383FF',
                // light: '#EEEEEEFF'
            }
          }, (err, url) => {
              if (err) return console.error(err)
              setQr(url)
        })
    }
  


  const copyToClipboard = () => {
    copy(questID);
    alert(`You have copied "${questID}"`);
 }
 const copyToClipboardUrl = () => {
  copy(qr);
  alert(`You have copied "${qr}"`);
}
  const copyToClipboardUrlRes = () => {
  const i = "qck.app/" + questID + "/results/" + strLast
  copy(i);
  alert(`You have copied "${i}"`);
  }

  if(questID === 1){
    window.onload = handleSubmitt();
  console.log("yes");
  }
  
  window.onload = GenerateQRCode;

    return (
      <div onLoad={GenerateQRCode}>
           <h1 >Codes for questionnaire</h1>
           <h1>ID: {questID}</h1>
           <Button   onClick={copyToClipboard}>&#128203;</Button>
           <h1>qck.app/{questID}/</h1>
           <Button   onClick={copyToClipboardUrl}>&#128203;</Button>
           <h1>qck.app/{questID}/results/{strLast}</h1>
           <Button   onClick={copyToClipboardUrlRes}>&#128203;</Button>
           {/* <Button variant="contained" onClick={GenerateQRCode}>Generate</Button> */}
           {qr && <>
                    <img src={qr} />
                    <Button variant='contained' color='success' href={qr} download="qrcode.png">Download</Button>
                </>}
 
      </div>
    )
}

    export default Code





  