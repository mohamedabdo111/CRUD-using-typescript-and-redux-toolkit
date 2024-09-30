import { ChangeEvent, useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import OneCard from "./oneCard";
import { GetAllPosts } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import PaginationCode from "../../util/pagination";

const AllCards = () => {
  const dispatch = useAppDispatch();

  // when web open
  useEffect(() => {
    localStorage.removeItem("Search");
    dispatch(GetAllPosts({ num: 1, word: "" }));
  }, []);

  let words: string | null = "";
  if (localStorage.getItem("Search") !== null) {
    words = localStorage.getItem("Search");
  }

  // change with search
  const [searchWord, setSearchWord] = useState("");

  const handleSearchWord = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchWord(value);
    localStorage.setItem("Search", value);
  };
  useEffect(() => {
    dispatch(GetAllPosts({ num: 1, word: searchWord }));
  }, [searchWord]);

  // change with pagination
  const onpress = (e: any) => {
    dispatch(GetAllPosts({ num: e, word: words }));
    localStorage.setItem("numberPage", e);
  };

  const { AllPosts, isLoading } = useSelector((item: RootState) => item.posts);

  // if (isLoading) return <h2>Loading ...</h2>;

  return (
    <>
      <h1 className="mb-1  mt-4 col-12 col-md-7 m-auto">Posts</h1>
      <>
        <Row className="p-3">
          <input
            type="text"
            placeholder="Search"
            className=" col-12 col-md-7 input-group-text text-start m-auto"
            onChange={handleSearchWord}
            value={searchWord}
          />
        </Row>
        {isLoading ? (
          <h1 className="m-auto d-block col-12 col-md-7 text-center">
            Loading ...
          </h1>
        ) : AllPosts?.items && AllPosts.items.length >= 1 ? (
          AllPosts.items.map((item, idx) => {
            return <OneCard key={idx} items={item}></OneCard>;
          })
        ) : (
          <h1 className=" text-center">No Posts</h1>
        )}

        {AllPosts.totalCount <= 1 ? null : (
          <PaginationCode
            pageCount={AllPosts.totalPages}
            onpress={onpress}
          ></PaginationCode>
        )}
      </>
    </>
  );
};

export default AllCards;
