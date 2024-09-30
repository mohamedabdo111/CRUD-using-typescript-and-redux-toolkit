import { EllipsisVertical } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import CookieServices from "../../services/cookieService";
import cookieService from "../../services/cookieService";
import Modals from "../../util/modals";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  DeleteCommentAction,
  EditCommentAction,
  GetAllPosts,
} from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";

interface Iprops {
  comment: {
    commentId: number;
    content: string;
    createdAt: string;
    postID: number;
    userId: string;
  };
}

const Comment = ({ comment }: Iprops) => {
  const dispatch = useAppDispatch();
  const [showToggle, setShowToggle] = useState(false);

  let userIdLogin = "";
  if (cookieService.get("UserData")) {
    userIdLogin = CookieServices.get("UserData").userId;
  }

  const handleToggle = () => {
    setShowToggle(!showToggle);
  };

  // show modal to delete comment
  const [showDeleteComment, setShowDeleteComment] = useState(false);
  const handleCloseDeleteComment = () => setShowDeleteComment(false);

  const handleshowDeleteComment = () => {
    setShowDeleteComment(true);
  };

  const [loading, setLoading] = useState(true);
  const onDeleteComment = async () => {
    setLoading(true);
    await dispatch(DeleteCommentAction(comment.commentId));
    setLoading(false);
    setShowDeleteComment(false);
  };
  // show modal to edit comment
  const [showEditComment, setShowEditComment] = useState(false);
  const handleCloseEditComment = () => setShowEditComment(false);
  const [content, setContent] = useState(comment.content);

  const handleCommet = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleshowEditComment = () => {
    setShowEditComment(true);
  };

  const onEditComment = async () => {
    setLoading(true);
    await dispatch(
      EditCommentAction({
        id: comment.commentId,
        content,
      })
    );
    setLoading(false);

    setShowEditComment(false);
  };

  const { DeleteComment, EditComment } = useSelector(
    (item: RootState) => item.posts
  );

  let pageNumber: any = "";
  if (localStorage.getItem("numberPage")) {
    pageNumber = localStorage.getItem("numberPage");
  }
  useEffect(() => {
    if (loading === false) {
      if (DeleteComment === "Deleted Successfully") {
        dispatch(GetAllPosts({ num: pageNumber, word: "" }));
      }

      if (EditComment.status === 200) {
        dispatch(GetAllPosts({ num: pageNumber, word: "" }));
      }
    }
  }, [loading]);
  return (
    <>
      <div className="borderComment mt-2 p-2 ">
        <div className=" d-flex justify-content-between align-items-center">
          <div className=" d-flex gap-2 align-items-center">
            <div className="user-image"></div>
            <div>
              <h5 className=" m-0">Mohamed zidan</h5>
              <p className=" m-0">@zidanberg</p>
            </div>
          </div>
          {userIdLogin === comment?.userId ? (
            <div className="position-relative">
              <h5 className="cursor-ponter">
                <EllipsisVertical onClick={handleToggle} />
              </h5>
              {showToggle ? (
                <ListGroup className="list cursor-ponter">
                  <ListGroup.Item
                    // onClick={handleShow}
                    className="userpermision"
                    onClick={handleshowEditComment}
                  >
                    Edit
                  </ListGroup.Item>
                  <ListGroup.Item
                    className="userpermision"
                    onClick={handleshowDeleteComment}
                  >
                    Delete
                  </ListGroup.Item>
                </ListGroup>
              ) : null}
            </div>
          ) : null}
        </div>

        <p className=" mx-5 fw-bold">{comment.content}</p>
      </div>

      {/* delete comment */}
      <Modals
        handleClick={onDeleteComment}
        handleClose={handleCloseDeleteComment}
        show={showDeleteComment}
        title={"Delete comment"}
        btntitle="Delete comment"
        colorbtn="danger"
      >
        <p className=" fw-bold">Are you sure, this comment will be deleted !</p>
      </Modals>
      <Modals
        handleClick={onEditComment}
        handleClose={handleCloseEditComment}
        show={showEditComment}
        title={"Edit comment"}
        btntitle="Edit comment"
        colorbtn="success"
      >
        <input
          type="text"
          placeholder="Comment"
          value={content}
          onChange={handleCommet}
          className=" input-group-text text-start w-100"
        />
      </Modals>
    </>
  );
};

export default Comment;
