import type { Meta, StoryObj } from "@storybook/react";
import StarRate from "@/components/molecules/StarRate";

const meta = {
  title: "Review/StarRate",
  component: StarRate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StarRate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const ReadOnly: Story = { args: { readOnly: true, defaultRate: 3 } };
