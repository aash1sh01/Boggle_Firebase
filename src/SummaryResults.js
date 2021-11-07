import React from 'react';
import './SummaryResults.css';

export default function SummaryResults({ words, totalTime}) {

    return (
      <div className="Summary">
        <h2>SUMMARY</h2>
       
         <div>
          <li key="12">Total Words Found: {words.length}</li>
          
         </div>
        
           <div>
          <li key="15">Total Time: {totalTime} secs</li>
          
         </div>    
      </div>
    );
  }