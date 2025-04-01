/* eslint-disable @next/next/no-html-link-for-pages */
import { AiOutlineInbox } from "react-icons/ai";

function CourseItem() {
  return (
    <li className="mx-2 px-3 py-3 bg-[#F6F6F6] rounded-lg my-1">
      <a className="flex items-center" href="/course/1">
        <AiOutlineInbox size="22px" className="mr-2 flex-shrink-0" />
        <span className="font-bold text-md">화11</span>
      </a>
    </li>
  );
}

export default CourseItem;
