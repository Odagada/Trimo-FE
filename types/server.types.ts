export type Review = {
  reviewId: number;
  title: string;
  date: string;
  destination: string;
  imageUrls: string[];
  description: string;
  tag: string[];
  createdAt: string;
  likeUserId: number[];
  spot_id: number | string;
};
