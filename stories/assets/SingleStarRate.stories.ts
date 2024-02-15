import type { Meta, StoryObj } from "@storybook/react";
import SingleStarRate from "@/components/atoms/SingleStarRate";

const meta = {
  title: "ReviewCard/SingleStarRate",
  component: SingleStarRate,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SingleStarRate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    rate: 4.5,
  },
};
