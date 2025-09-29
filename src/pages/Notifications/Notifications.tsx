import Layout from "../../shared/layout/Layout";
import Noti from "./components/Noti";
import { SyncLoader } from "react-spinners";
import { changeTimeForm } from "../../shared/hooks/useCurrentTime";
import { useEffect, useRef } from "react";
import { useInfinitePost } from "../../shared/hooks/useInfinitePost";

export default function Notifications() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePost();


  // 스크롤이 끝에 도달하면 fetchNextPage를 호출
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Layout
      title="최근 위험 사진 보고"
      activeTab="notifications"
      showBackButton={false}
    >
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <SyncLoader color="#ff7f4c" />
            <span className="text-brand mt-10">
              데이터를 불러오는 중입니다 ...
            </span>
          </div>
        ) : isError ? (
          <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
        ) : data?.pages[0]?.length === 0 ? (
          <div className="text-center mt-10 text-gray-500">
            최근 알림이 없습니다.
          </div>
        ) : (
          data?.pages.map((page, index) => (
            <div key={index} className="flex flex-col gap-3">
              {page.map((noti) => (
                <Noti
                  key={noti.postId}
                  postId={noti.postId}
                  title={noti.title}
                  upperArea={noti.areaId}
                  lowerArea={noti.subAreaId}
                  uploadTime={noti.createdAt ? changeTimeForm(noti.createdAt) : undefined}
                  score={noti.reporterRisk ? Number(noti.reporterRisk) : undefined}
                  photoUrl={noti.postPhotoUrl}
                />
              ))}
            </div>
          ))
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <SyncLoader color="#ff7f4c" />
            <span className="text-brand">더 많은 데이터를 불러오는 중...</span>
          </div>
        )}
        {hasNextPage && !isFetchingNextPage && (
          <div ref={loadMoreRef} className="h-1" />
        )}
      </div>
    </Layout>
  );
}
