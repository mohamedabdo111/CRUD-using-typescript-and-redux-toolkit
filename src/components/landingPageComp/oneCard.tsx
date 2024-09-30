import { EllipsisVertical, MessageCircle } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import Comment from "./comment";
import cookieService from "../../services/cookieService";
import Modals from "../../util/modals";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  AddCommentAction,
  DeletePostAction,
  EditPostAction,
  GetAllPosts,
} from "../../redux/slices/userSlice";
import toast, { Toaster } from "react-hot-toast";

interface Iprops {
  items: {
    categoryID: null;
    comments: [];
    createdAt: string;
    description: string;
    image: string;
    postId: number;
    userId: string;
  };
}

const OneCard = ({ items }: Iprops) => {
  const dispatch = useAppDispatch();
  const userId = cookieService.get("UserData");

  const showComment = () => {
    setComment(!comment);
  };

  //
  const [showTogglePost, setShowTogglePost] = useState(false);
  const handleTogglePost = () => {
    setShowTogglePost(!showTogglePost);
  };

  // get all categories

  const { AllCategories, AddComment } = useSelector(
    (item: RootState) => item.posts
  );

  // handleshow modal to edit post
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  // show modal to delete post
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [descriptionEdit, setDescriptionEdit] = useState(items.description);
  // const [imageFileEdit, setImageFileEdit] = useState(items.image);
  const [catego, setCatego] = useState<any>(
    items.categoryID === null ? "" : items.categoryID
  );
  const postId: any = items.postId;
  // const [ImageFile ,setImageFile] = useState(null)

  const handleDecripEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionEdit(e.target.value);
  };
  const handleCatego = (e: ChangeEvent<HTMLSelectElement>) => {
    setCatego(e.target.value);
  };
  // const onSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { files } = e?.target;

  //   if (files && files[0]) {
  //     setImageFile(files[0]);
  //   }

  //   const Reader = new FileReader();
  //   if (!files) {
  //     setSelectImage(null);
  //     return;
  //   }

  //   Reader.readAsDataURL(files[0]);
  //   Reader.onload = () => {
  //     setSelectImage(Reader.result);
  //   };
  // };

  const onSaveEdit = async () => {
    const formData = new FormData();
    formData.append("PostId", postId);
    formData.append("Description", descriptionEdit);
    // formData.append("Image", imageFileEdit);
    formData.append("CategoryId", catego);

    await dispatch(EditPostAction(formData));
  };

  const onDeletePost = async () => {
    await dispatch(DeletePostAction(items.postId));
  };

  // add commentl;

  const [comment, setComment] = useState(false);
  const [addComment, setAddComment] = useState("");

  const handleAddComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddComment(e.target.value);
  };

  const [loading, setLoading] = useState(true);
  const onAddComment = async () => {
    setLoading(true);
    await dispatch(
      AddCommentAction({
        content: addComment,
        postID: items.postId,
      })
    );
    setLoading(false);
  };

  let pageNumber: any = "";
  if (localStorage.getItem("numberPage")) {
    pageNumber = localStorage.getItem("numberPage");
  }

  useEffect(() => {
    if (loading === false) {
      if (AddComment.status === 200) {
        dispatch(GetAllPosts({ num: pageNumber, word: "" }));
      } else {
        toast.error("Please login");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    }
  }, [loading]);

  return (
    <section className="card my-2 shadow col-sm-12 col-md-7 m-auto">
      {/* <img src={user} alt="UserImage" className="user-image"></img> */}
      <header className="d-flex justify-content-between p-3 ">
        <div className=" d-flex gap-2 align-items-center">
          <div className="user-image"></div>
          <div>
            <h5 className=" m-0">Mohamed zidan</h5>
            <p className=" m-0">@zidanberg</p>
          </div>
        </div>
        {items?.userId === userId?.userId ? (
          <div className=" position-relative">
            <h5 className="cursor-ponter">
              <EllipsisVertical onClick={handleTogglePost} />
            </h5>
            {showTogglePost ? (
              <ListGroup className="list cursor-ponter">
                <ListGroup.Item className="userpermision" onClick={handleShow}>
                  Edit Post
                </ListGroup.Item>
                <ListGroup.Item
                  className="userpermision"
                  onClick={handleShowDelete}
                >
                  Delete Post
                </ListGroup.Item>
              </ListGroup>
            ) : null}
          </div>
        ) : null}
      </header>

      <main className="p-3">
        <h4 className="p-3">{items.description}</h4>
        {items.image === null ? null : (
          <div className=" image-post mb-3">
            <img
              src={`https://blogsapp.runasp.net/assets/images/posts/${items.image}`}
              alt="s"
              className="w-100 h-100 rounded-2  object-fit-fill "
            ></img>
          </div>
        )}

        <div>
          {/* <span className=" mx-2">like</span> */}
          <h5 className=" mx-2 pointercss " onClick={showComment}>
            <MessageCircle className="cursor-ponter" size={35} />
          </h5>
        </div>

        {/* comments */}
        {comment ? (
          <div className=" card p-3 mt-3 ">
            <Row className="bg-body-secondary rounded-2 p-2 gap-2">
              <Col sm="12" lg="9">
                <textarea
                  placeholder="Comment"
                  name="comment"
                  id="comment"
                  className="w-100  rounded-2 p-2 input-group-text text-start"
                  value={addComment}
                  onChange={handleAddComment}
                ></textarea>
              </Col>
              <Col sm="12" lg="2" className="m-0 p-0 disabled">
                <Button
                  className={`w-100 ${addComment === "" ? " disabled" : null}`}
                  onClick={onAddComment}
                >
                  Send
                </Button>
              </Col>
            </Row>

            <Row className=" flex-column-reverse">
              {items?.comments
                ? items.comments.map((item, index) => {
                    return <Comment comment={item} key={index}></Comment>;
                  })
                : null}
            </Row>
          </div>
        ) : null}
      </main>

      {/* edit post  */}
      <Modals
        handleClick={onSaveEdit}
        handleClose={handleClose}
        show={show}
        title={"Edit Post"}
        btntitle="Edit Post"
        colorbtn="success"
      >
        <textarea
          placeholder="Edit description"
          value={descriptionEdit}
          onChange={handleDecripEdit}
          className=" input-group-text text-start w-100 mb-3"
        ></textarea>

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
      </Modals>

      {/* delete post  */}
      <Modals
        handleClick={onDeletePost}
        handleClose={handleCloseDelete}
        show={showDelete}
        title={"Delete Post"}
        btntitle="Delete Post"
        colorbtn="danger"
      >
        <p className=" fw-bold">Are you sure, this post will be deleted !</p>
      </Modals>

      <Toaster></Toaster>
    </section>
  );
};

export default OneCard;
