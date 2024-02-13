import type { Meta, StoryObj } from "@storybook/react";
import HeaderDropdown from "@/components/atoms/Dropdowns/HeaderDropdown";

const meta = {
  title: "Dropdown/HeaderDropdown",
  component: HeaderDropdown,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeaderDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
