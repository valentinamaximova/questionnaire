import React, {  useState } from "react";
import "./AllCodes.css";


function AllCodes() { 
    const [text, setText] = useState([ ]);

    function fetchData () { 
      const getURL = "http://localhost:4000/api/staff/" 
      fetch(getURL, {
          method: 'GET'
         
      }).then(console.log("yes connect"))
      .then((response) => response.json()) 
      .then((text) => setText(text));
    } 
   
      if(text.length === 0){
        window.onload = fetchData();
      }
    
    return (
      <div onLoad={fetchData}>
        
      
         { text.map((userObj, index) => (
            <h1 key={userObj.id}>{userObj.questionnaire_id}</h1>  
            ))}
      </div>
    );
  }

export default AllCodes;