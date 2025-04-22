function CourseItemSkeleton() {
  return (
    <li className="mx-2 bg-[#F6F6F6] rounded-lg my-1 animate-pulse">
      <div className="flex items-center px-3 py-3">
        <div className="w-[22px] h-[22px] bg-gray-300 rounded mr-2 flex-shrink-0" />
        <div className="h-4 bg-gray-300 rounded w-3/4" />
      </div>
    </li>
  );
}

export default CourseItemSkeleton;
