import { CircleX, ImageDown } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Spinner } from "react-bootstrap";
import { RootState, useAppDispatch } from "../../redux/store";
import { AddPostAction, GetAllCategories } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const FormAddPost = () => {
  const dispatch = useAppDispatch();

  //use state and handle state , add post
  const [description, setDescription] = useState("");
  const [catego, setCatego] = useState("");
  const [ImageFile, setImageFile] = useState<File | string>("");
  const [isPress, setIspress] = useState(false);

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCatego = (e: ChangeEvent<HTMLSelectElement>) => {
    setCatego(e.target.value);
  };

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Description", description);
    formData.append("Image", ImageFile);
    formData.append("CategoryId", catego);
    // console.log(formData);
    setIspress(true);
    await dispatch(AddPostAction(formData));
    setIspress(false);
  };

  // display image when i select image
  const refFile = useRef<HTMLInputElement | null>(null);

  const [selectImage, setSelectImage] = useState<any>(null);

  const ClickImage = () => {
    refFile.current?.click();
  };

  const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e?.target;

    if (files && files[0]) {
      setImageFile(files[0]);
    }

    const Reader = new FileReader();
    if (!files) {
      setSelectImage(null);
      return;
    }

    Reader.readAsDataURL(files[0]);
    Reader.onload = () => {
      setSelectImage(Reader.result);
    };
  };

  const resetImage = () => {
    setSelectImage(null);
  };

  // get All Categories
  useEffect(() => {
    dispatch(GetAllCategories());
  }, []);

  const { AllCategories, AddPost, error, isLoading } = useSelector(
    (item: RootState) => item.posts
  );

  useEffect(() => {
    if (isLoading === false) {
      if (AddPost?.status === 200) {
        // dispatch(GetAllPosts({ num: 1, word: "" }));
        setImageFile("");
        setCatego("");
        setDescription("");
        setSelectImage(null);
      }

      // handle errors
      if (error && error.status === 401) {
        toast.error("Please login");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    }
  }, [isLoading]);
  // add new Post

  return (
    <main className=" bg-body-secondary text-end p-2 my-3 col-12 col-md-7 m-auto ">
      <form className="row position-relative" onSubmit={submitPost}>
        {selectImage !== null ? (
          <Col sm="7" className=" text-center ">
            <div className=" position-relative bg-body-secondaryS shadow-lg rounded-3 mb-3 p-3">
              <img
                src={selectImage !== null ? selectImage : null}
                alt="Image"
                className="mb-2 img"
              ></img>
              <CircleX
                className=" text-danger remove-icon cursor-ponter"
                onClick={resetImage}
              />
            </div>
          </Col>
        ) : null}

        <Col sm="7" className="mb-3">
          <textarea
            placeholder="Compose new post"
            className=" w-100 border input-group-text text-start"
            required
            value={description}
            onChange={handleDescription}
          ></textarea>
        </Col>

        <Col sm="7" className="mb-3">
          <Form.Select
            aria-label="Default select example"
            value={catego}
            onChange={handleCatego}
          >
            <option value="0"> Choose from categories</option>
            {AllCategories
              ? AllCategories.map((item, index) => {
                  return (
                    <option value={`${item.categoryId}`} key={index}>
                      {item.name}
                      {item.categoryId}
                    </option>
                  );
                })
              : null}
          </Form.Select>
        </Col>

        <div>
          <input
            type="file"
            accept="image/*"
            ref={refFile}
            placeholder="Images"
            className=" d-none"
            onChange={onSelectImage}
          ></input>
          <ImageDown className="add-Image" size={30} onClick={ClickImage} />
        </div>

        <div>
          <Button
            className={`bg-warning mt-2 border w-25 ${
              isLoading ? "disabled" : null
            }`}
            type="submit"
          >
            {isPress ? (
              isLoading ? (
                <>
                  <Spinner animation="border" role="status" size="sm" /> Loading
                </>
              ) : (
                "Post"
              )
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </form>
      <Toaster></Toaster>
    </main>
  );
};

export default FormAddPost;
