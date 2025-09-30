import Comment from "./Comment";
import AddComment from "./AddComment";
import type { IComment } from "../types";
import { useComments } from "../../../features/Comments/useComments";

interface IProps {
  postId: string;
}

export default function CommentContainer({ postId }: IProps) {
  const { comments, isLoading } = useComments(postId);

  return (
    <div className="my-10">
      <h3 className="text-2xl mb-3">코멘트</h3>
      {isLoading ? null : (
        <div>
          {comments.map((comment: IComment) => (
            <Comment
              userId={comment.userId}
              postId={postId}
              key={comment.commentId}
              username={comment.userName}
              department={comment.departmentId}
              position={comment.positionId}
              message={comment.message}
              createdAt={comment.createdAt}
              commentId={comment.commentId}
              profilePhotoUrl={comment.profilePhotoUrl}
            />
          ))}
        </div>
      )}
      <hr className="text-gray-300 my-10" />
      <AddComment postId={postId} />
    </div>
  );
}
