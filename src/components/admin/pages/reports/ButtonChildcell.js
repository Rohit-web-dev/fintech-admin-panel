import React from 'react';
import ActionButtons from './ActionButtons';


export default function ButtonChildcell(cellData) {
// console.log(cellData.data)
  return (
    <div >
      <ActionButtons  data={cellData} pageType={"child"}/>
    </div>
  );
}
