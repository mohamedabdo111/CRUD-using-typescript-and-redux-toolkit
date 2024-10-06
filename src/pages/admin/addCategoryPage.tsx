import { Button, Container, Spinner } from "react-bootstrap";
import Header from "../../util/header";
import { ChangeEvent, useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { AddCategorAction } from "../../redux/slices/adminSlice";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const AddCategoryPage = () => {
  const dispatch = useAppDispatch();
  const [category, SetCategory] = useState("");
  const [isPress, setIsPress] = useState(false);
  const handleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    SetCategory(e.target.value);
  };

  const OnAddCategory = async () => {
    setIsPress(true);
    await dispatch(AddCategorAction({ name: category }));
    setIsPress(false);
  };

  const { IsLoadingCategory } = useSelector(
    (item: RootState) => item.adminCategory
  );

  useEffect(() => {
    if (IsLoadingCategory === false) {
      SetCategory("");
    }
  }, [IsLoadingCategory]);

  return (
    <>
      <Header></Header>
      <Container>
        <div className=" col-12 col-md-7 my-5 text-end">
          <input
            type="text"
            placeholder="Add Category"
            className=" input-group-text text-start w-100"
            value={category}
            onChange={handleCategory}
          ></input>
          <Button
            variant="success my-2"
            onClick={OnAddCategory}
            className={`${category === "" ? "disabled" : null}`}
          >
            {isPress ? (
              IsLoadingCategory ? (
                <>
                  <Spinner animation="border" role="status" size="sm" /> Loading
                </>
              ) : (
                "Add Category"
              )
            ) : (
              "Add Category"
            )}
          </Button>
        </div>
      </Container>
      <Toaster></Toaster>
    </>
  );
};

export default AddCategoryPage;
