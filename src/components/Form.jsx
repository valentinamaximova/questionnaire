import { Rating, Typography } from "@mui/material";
import React, {  useState } from "react";
import ReactSlider from 'react-slider'
import "./Form.css";
import NumericInput from 'react-numeric-input';
import  {thisId} from './Create';


function Form(){
   const [textt, setTextt] = useState([]);
  const [name, setName] = useState([]);
  const [useful, setUseful] = useState([]);
  const [percent, setPercent] = useState([]);
  const [come_again, setCome_again] = useState([]);
  const [like, setLike] = useState([]);
  const [review, setReview] = useState([]);

  
  const handleSubmit=()=> { 
    const getURL = "http://localhost:4000/api/staff/" 
    fetch(getURL, {
        method: 'GET'
    }).then((response) => response.json()) 
    .then((textt) => setTextt(textt))
  } 
 
 window.onload = handleSubmit;

  function myFormat(num) {
    return num + '%';
}

const handleSubmittt=()=> { 
  const postURL = "http://localhost:4000/api/result/" 
  fetch(postURL, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
                     questionnaire_id: thisId,
                      name: name,
                      useful: useful,
                      percent: percent,
                      come_again: come_again,
                      like: like,
                      review: review
                    })
  })
}

    return ( <div>
      
<form onSubmit={handleSubmittt}>
<h1>Form</h1>
      <h1 >Voting Page {thisId}</h1>
      <input name="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off"  placeholder="Enter your name"></input>
      <div>
    <label id="slider-label">Was the meeting useful?</label>
    <ReactSlider

        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        onAfterChange={(result, tumb) => {
          setUseful(result)
        }}
    />
  
</div>
<br></br>

<label id="res">Were the results achieved?</label><br></br>
<NumericInput precision={0} id="res"  max={100} step={1} format={myFormat} 
  onChange={(event, percent) => {
    setPercent(percent);
  }}/>

<Typography component="legend">Would you come again?</Typography>
<Rating
  name="simple-controlled"
  value={come_again}
  onChange={(event, come_again) => {
    setCome_again(come_again);
  }}
/>

<Typography component="legend">Do you like me?</Typography>
<Rating
  name="simple-controlled"
  value={like}
  onChange={(event, like) => {
    setLike(like);
  }}
/>
<br></br>
        <p>
        What can we improve? Tweet size
        </p><br></br>
        <textarea type="text"cols={30} rows={3} value={review} onChange={(e) => setReview(e.target.value)}  ></textarea>
        <br></br>
        <input type="submit" value="Submit" />
      </form>



   </div>



    
    )
}

export default Form;

