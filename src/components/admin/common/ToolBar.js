import QuickActionsHeader from "./QuickActionsHeader"
import {
    ArchiveIcon,
    ArrowCircleRightIcon,
    ChevronDownIcon,
    ChevronDoubleLeftIcon,
    DuplicateIcon,
    HeartIcon,
    PencilAltIcon,
    TrashIcon,
    UserAddIcon,
    SettingsIcon
  } from '@heroicons/react/solid'
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Chip";

function handleClick(e){
    console.log("Clicked chip")
}

export default function ToolBar() {
    return (
<div className="flex flex-row border-teal-700 sm:px-4 bg-teal-100">
    <div className="justify-start mt-2">
        <button
            type="button"
            className="mb-2 order-1 ml-3 inline-flex items-center px-4 py-2 shadow-sm font-bold text-xs border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:order-0 sm:ml-0"
        >
            <ChevronDoubleLeftIcon className="mr-1 h-2.5 w-2.5" aria-hidden="true" />
            Back
            
        </button>

    </div>
    <div className="flex flex-row justify-end mt-2 justify-items-end ml-auto mr-4">
        {/* <button
            type="button"
            className="mb-2 order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:order-0 sm:ml-0"
        >
            Quick Actions
        </button> */}
        <div className="">
            <Chip
                avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                label="Busy"
                variant="outlined"
                onClick={handleClick}

                />
        </div>
        <QuickActionsHeader></QuickActionsHeader>

        {/* <button
            type="button"
            className="mb-2 order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-bold text-xs rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:order-1 sm:ml-3"
        >
            Quick Actions
        </button> */}

    </div>

    
</div>
    )
}