import ReactPaginate from "react-paginate";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (selectedItem: { selected: number }) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <ReactPaginate
    previousLabel={"Voltar"}
    nextLabel={"Avançar"}
    breakLabel={"..."}
    pageCount={totalPages}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={onPageChange}
    containerClassName={"flex items-center justify-center gap-2 mt-4 p-2"}
    
    activeClassName={"font-bold opacity-100 bg-zinc-900 text-white rounded-md px-3 py-2"}
    
    pageClassName={
      "border border-gray-700 opacity-80 text-white hover:bg-zinc-800 rounded-md px-3 py-2 transition-all"
    }
    pageLinkClassName={"w-full h-full flex justify-center items-center"}
    
    previousClassName={
      "font-semibold bg-zinc-900 text-white hover:bg-zinc-800 px-3 py-2 rounded-md transition-all"
    }
    nextClassName={
      "font-semibold bg-zinc-900 text-white hover:bg-zinc-800 px-3 py-2 rounded-md transition-all"
    }
    disabledClassName={"opacity-50 bg-zinc-800 cursor-not-allowed text-gray-400"}
    forcePage={page - 1}
  />
  );
};

export default Pagination;
