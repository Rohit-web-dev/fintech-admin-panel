import { Fragment } from 'react'
import DropDownButton from 'devextreme-react/drop-down-button';
import Toolbar from 'devextreme-react/toolbar';
import { Template } from 'devextreme-react/core/template';
import notify from 'devextreme/ui/notify';
import 'whatwg-fetch';

const quickActions = [
  { id: 1, name: 'Edit', icon: 'rename' },
  { id: 4, name: 'Duplicate', icon: 'copy' },
  { id: 2, name: 'Archive', icon: 'group' },
  { id: 3, name: 'Move', icon: 'movetofolder' },
  { id: 4, name: 'Share', icon: 'share' },
  { id: 5, name: 'Add to favorites', icon: 'like' },
  { id: 6, name: 'Delete', icon: 'trash' },
];

export default function QuickActionsHeader() {


  // function onButtonClick(e) {
  //   notify(`Go to ${e.component.option('text')}'s profile`, 'success', 600);
  // }

  function onItemClick(e) {
    notify(e.itemData.name || e.itemData, 'success', 600);
  }



  
  const buttonDropDownOptions = { width: 230 };
  return (
    <>
      <div className="dx-fieldset">
        <div className="dx-field">
          <div className="dx-field-value">
            <DropDownButton
              dropDownOptions={buttonDropDownOptions}
              // splitButton={true}
              useSelectMode={false}
              // text="Sandra Johnson"
              icon="preferences"
              items={quickActions}
              displayExpr="name"
              keyExpr="id"
              // onButtonClick={onButtonClick}
              onItemClick={onItemClick}
            />
          </div>
        </div>
      </div>
    </>
  )
}