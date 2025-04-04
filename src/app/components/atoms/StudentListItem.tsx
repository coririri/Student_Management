import React from "react";

function StudentListItem() {
  return (
    <div className="flex items-center border-b border-[#D9D9D9] py-2">
      <input type="checkbox" className="w-6 h-6 mx-2" />
      <span className="w-[109.5px] text-center font-bold">초3</span>
      <span className="w-[109.5px] text-center font-bold">김선우</span>
      <span className="w-[219px] text-center font-bold">010-3433-0625</span>
    </div>
  );
}

export default StudentListItem;
