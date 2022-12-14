// import ReactDOM from 'react-dom/client';
import { Routes, Route, useNavigate, Form} from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import Code from './Code';
import "./Create.css";
let thisId = 0;

function Create() {
    const [text, setText] = useState([]);
    const [str, setStr] = useState([]); 
    const [all, setAll] = useState([]);

    const navigate = useNavigate();

    const[idd, setIdd] = useState([]);
    let random = 0;
      function randomNumberInRange(min, max) {
        random = Math.floor(Math.random() * (max - min + 1)) + min
        return random;
      }
      function randomTextInRange() {
        var result           = '';
        var characters       = 'abcde8fghijklmnopq9rs6tuvwxyz0';
        
        for ( var i = 0; i < 6; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 6)) ;
       }
       return result
      }
      
      function handleSubmittt(){ 
        const getURL = "http://localhost:4000/api/staff/" 
        fetch(getURL, {
            method: 'GET'
        }).then((response) => response.json()) 
        .then((all) => setAll(all))
      } 

  if(all.length === 0){
        window.onload = handleSubmittt()
      }

function l (){
   for(let i = 0; i < all.length; i++){
      console.log(all[i].questionnaire_id);
      if(parseInt(all[i].questionnaire_id) === parseInt(idd)){
        navigate('/form');
      }
      }
}
      const handleClick = () => { 
        setText(randomNumberInRange(100000, 999999));
        setStr(randomTextInRange())
        
      };

 
    const handleSubmit=()=> { 
        const postURL = "http://localhost:4000/api/staff/" 
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                            {
                              questionnaire_id: text,
                              string: str
                            }

                          )
        })
        .finally(navigate('/code'))
    }
  
    thisId = idd;

    // const handS=(event)=> {
    //   event.preventDefault();
      
    // }
     
    // let changeCode = e => {
    //   this.setState({ code: e.target.value },()=>{
    //     if(this.state.code.length === 6) {
    //      this.verifyCode(); 
    //     }
    //    });
    // };
    
    return (
      <div >
         <h1>Create questionnaire</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        
          <form onSubmit={l}>
          <input  name="idd" value={idd} onChange={(e) => setIdd(e.target.value)}   autoComplete="off"  placeholder="Questionnaire code"></input> 
          {/* <Link to="/code">Home</Link> */}
          <input value='Log'   type="submit" />
          <Routes>
          <Route path="/form" element={<Form />} />
        </Routes>
          </form>

          <form onClick={handleClick} onSubmit={handleSubmit}   >
        <label>
           {/* /* <textarea  name="content" rows="4" cols="50" value={content} autoComplete="off"  placeholder="Note content"></textarea> */}
        </label><input value='Create questionnaire'   type="submit" />
        

        <Routes>
          <Route path="/code" element={<Code />} />
        </Routes>
      </form>


      </div>
    )
  }

  export  {Create, thisId};