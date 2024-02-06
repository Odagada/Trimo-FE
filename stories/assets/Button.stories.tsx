import Button from "@/components/atoms/Button";
import type { Meta, StoryObj } from "@storybook/react";

const button = {
  title: "Button/Button",
  component: Button,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Button>;

export default button;
type Story = StoryObj<typeof button>;

export const ButtonComponent: Story = {
  args: {
    children: "버튼",
  },
};
