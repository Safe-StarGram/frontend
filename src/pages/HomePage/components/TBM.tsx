export default function TBM() {
  const tbms = [
    "밥캣 장비 들어옴. 미리 도로 정리하기.",
    "1블록 아차 사고 (몽키 낙하, 부상자 없음)",
    "TL(테이블 트레이) 인증 시험 시간 2시 변경.",
  ];
  return (
    <div>
      <h3 className="text-2xl mb-3">오늘의 TBM</h3>
      <div className="flex flex-col gap-3 border-2 border-gray-300 rounded-md p-3">
        {tbms.map((tbm, index) => (
          <div key={index}>
            <div>{tbm}</div>
            {index !== tbms.length - 1 ? (
              <hr className="text-gray-300 border-1 mt-2" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
