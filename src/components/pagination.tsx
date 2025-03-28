import ReactPaginate from "react-paginate"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: ({ selected }: { selected: number }) => void
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      previousLabel={<RiArrowLeftSLine className="h-5 w-5" />}
      nextLabel={<RiArrowRightSLine className="h-5 w-5" />}
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      forcePage={page - 1}
      containerClassName="flex items-center justify-center gap-1"
      pageClassName="flex"
      pageLinkClassName="flex items-center justify-center h-8 w-8 rounded-md text-sm border border-gray-200 hover:bg-gray-50"
      activeLinkClassName="bg-black text-white border-black hover:bg-gray-800"
      previousClassName="flex"
      nextClassName="flex"
      previousLinkClassName="flex items-center justify-center h-8 w-8 rounded-md border border-gray-200 hover:bg-gray-50"
      nextLinkClassName="flex items-center justify-center h-8 w-8 rounded-md border border-gray-200 hover:bg-gray-50"
      breakClassName="flex"
      breakLinkClassName="flex items-center justify-center h-8 w-8 rounded-md text-sm border border-gray-200 hover:bg-gray-50"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  )
}

