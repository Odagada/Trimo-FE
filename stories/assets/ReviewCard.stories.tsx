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
      reviewId: 1,
      title: "string",
      author: "여행자",
      imageUrls: [
        "https://images.unsplash.com/photo-1588438127981-fe383cf43bbd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      tag: ["2월", "맛집", "친구", "흐림"],
      rate: 5,
      date: "1995-12-17T03:24:00",
      destination: "제주 애월해변",
      description: "너무 멋있는 풍경이다",
      createdAt: "1995-12-17T03:24:00",
      likeUserId: [1, 2],
    },
  },
};
