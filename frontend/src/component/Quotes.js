import React, { useState } from "react";
const Quotes=()=>{
    const [facts,setFacts]=useState('')
   const getQuote=async()=>{
      try {
        let response = await fetch('https://catfact.ninja/fact')
        let data= await response.json();
        console.log(data)
        
        if(data.fact){
            setFacts(data.fact)
        }else{
            throw new Error('failed to get quote')
        }
      } catch (error) {
        console.log(error);
        setFacts('failed to get the quote')
        
      }
    }

 return(

    <div className="Quotes">
        <div className="container-quotes">Quotes</div>
        <button className="get-quotes" onClick={getQuote}>get fact</button>
        <p className="facts">{facts}</p>
       
    </div>
 )

}
export default Quotes;
