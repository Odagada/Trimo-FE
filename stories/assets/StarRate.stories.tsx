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

export const Primary: Story = { args: { value: 0 } };

export const DefaultRate: Story = { args: { defaultRate: 3, value: 0 } };
