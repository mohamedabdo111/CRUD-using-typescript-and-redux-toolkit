import ReactPaginate from "react-paginate";

interface Iprops {
  pageCount: number;
  onpress: (e: number) => void;
}
const PaginationCode = ({ pageCount, onpress }: Iprops) => {
  const handlePageClick = (e: { selected: number }) => {
    onpress(e.selected + 1);
  };

  return (
    <div className="m-auto">
      <ReactPaginate
        breakLabel="..."
        nextLabel="التالي"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="السابق"
        renderOnZeroPageCount={null}
        containerClassName="pagination justify-content-center p-3"
        pageClassName="page-item"
        activeClassName="active"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-link"
      />
    </div>
  );
};

export default PaginationCode;
