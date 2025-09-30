import Image from "./Image";
import { usePost } from "../../../features/Posts/usePost";

export default function ImageContainer() {
  const { posts, isLoading } = usePost();

  return (
    <div>
      <h3 className="text-2xl mb-3">최근 등록 사진</h3>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : posts && posts.length > 0 ? (
        <div className="flex flex-col gap-3">
          {posts.slice(0, 3).map((element, index) => (
            <Image
              title={element.title}
              createdAt={element.createdAt}
              id={element.postId}
              postPhotoUrl={element.postPhotoUrl}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-500">등록된 사진이 없습니다.</div>
      )}
    </div>
  );
}
