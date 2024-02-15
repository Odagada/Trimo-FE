import type { Meta, StoryObj } from "@storybook/react";
import ReviewCard from "@/components/molecules/ReviewCard";

const meta = {
  title: "ReviewCard/ReviewCard",
  component: ReviewCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Review: Story = {
  args: {
    review: {
      reviewId: 10,
      title: "대한민국 정부의 중심을 엿보다",
      content:
        "역사적인 건물과 아름다운 정원, 그리고 정치의 중심에서 벌어지는 이야기들을 엿볼 수 있는 특별한 시간이었어요.",
      weather: "눈",
      companion: "가족",
      placeType: "명소",
      nickName: "test11@gmail.com",
      spotId: "ChIJa6GU77eifDUR3K3qNfHVFgs",
      createdAt: "2024-02-14T21:43:30.68089",
      modifiedAt: "2024-02-14T21:43:30.68089",
      visitingTime: "2023-01-17T12:30:00",
      stars: 5,
    },
  },
};
