import { useForm } from "react-hook-form";
import { LuSend } from "react-icons/lu";
import { useAddComment } from "../../../features/Comments/useComments";

interface IProps {
  postId: string;
}

interface CommentForm {
  message: string;
}

export default function AddComment({ postId }: IProps) {
  const { register, handleSubmit, reset } = useForm<CommentForm>();
  const addComment = useAddComment(postId);

  const onSubmit = (data: CommentForm) => {
    addComment.mutate(data.message, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3">
      <input
        {...register("message")}
        placeholder="코멘트 추가"
        className="border border-gray-300 w-full h-10 p-3 rounded-md"
      />
      <button>
        <LuSend className="w-6 h-6 text-blue-300 hover:cursor-pointer hover:text-blue-500 transition" />
      </button>
    </form>
  );
}
