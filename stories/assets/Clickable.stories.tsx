import Clickable from "@/components/atoms/Clickable";
import type { Meta, StoryObj } from "@storybook/react";

const clickable = {
  title: "Clickable/Clickable",
  component: Clickable,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Clickable>;

export default clickable;
type Story = StoryObj<typeof clickable>;

export const ClickableComponent: Story = {
  args: {
    children: "클릭이 가능합니다",
  },
};
