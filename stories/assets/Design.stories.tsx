import type { Meta, StoryObj } from "@storybook/react";
import Design from "@/components/atoms/Design";

const meta = {
  title: "Example/Design",
  component: Design,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Design>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
