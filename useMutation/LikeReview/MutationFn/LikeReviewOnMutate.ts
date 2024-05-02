import { QueryClient } from "@tanstack/react-query";

type Props = { isLiked: boolean; queryClient: QueryClient; reviewId: number };

const LikeReviewOnMutate = async ({ isLiked, queryClient, reviewId }: Props) => {
  // 쿼리 취소하기
  await queryClient.cancelQueries({ queryKey: ["reviewIsLiked", reviewId] });
  await queryClient.cancelQueries({ queryKey: ["reviewLikeCount", reviewId] });

  // 쿼리 데이터 가져와서 백업해두기
  const prevLikeStatus = queryClient.getQueryData(["reviewIsLiked", reviewId]);
  const prevLikeCount = queryClient.getQueryData(["reviewLikeCount", reviewId]);

  // 쿼리 데이터 수정하기
  queryClient.setQueryData(["reviewIsLiked", reviewId], (oldData: any) => {
    const newData = {
      ...oldData,
      data: { isLiked: !oldData.data.isLiked },
    };
    return newData;
  });
  queryClient.setQueryData(["reviewLikeCount", reviewId], (oldData: any) => {
    const newData = {
      ...oldData,
      data: { likeCount: isLiked ? oldData.data.likeCount - 1 : oldData.data.likeCount + 1 },
    };
    return newData;
  });

  // 필요할 때 갖다 쓰기 위한 백업본 리턴하기
  return { prevLikeStatus, prevLikeCount };
};

export default LikeReviewOnMutate;
