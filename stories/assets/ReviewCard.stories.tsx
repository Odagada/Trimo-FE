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
      tagValues: {
        weather: "눈",
        companion: "가족",
        placeType: "명소",
      },
      nickName: "test11@gmail.com",
      visitingTime: "2023-01-17T12:30:00",
      stars: 5,
      image:
        "https://i.namu.wiki/i/GSI7uVe89-gloLIdXTnnvklvRPaIhI-4nQH-r1ajStN6VfghnXFbA3RxhEWCFfdSw6krlR-yKaelAifKIPZQxw.webp",
    },
  },
};
