import type { Meta, StoryObj } from "@storybook/react";
import ImagesInput from "../../components/ImagesInput";

const meta = {
  title: "Example/Header",
  component: ImagesInput,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
} satisfies Meta<typeof ImagesInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {};

export const Small: Story = {};
