export interface ReviewType {
  reviewId: number;
  title: string;
  author: string;
  imageUrls: string[];
  tag: string[] | null;
  rate: 1 | 2 | 3 | 4 | 5;
  date: string;
  destination: string;
  description: string;
  createdAt: string;
  likeUserId: number[];
}
