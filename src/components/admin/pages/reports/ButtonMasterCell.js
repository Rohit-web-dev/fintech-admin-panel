import React from 'react';
import ActionButtons from './ActionButtons';


export default function ButtonMasterCell(cellData) {
  // console.log(cellData.data)
  return (
    <div >
      <ActionButtons  data={cellData} pageType={"parent"}/>
    </div>
  );
}
