import type { Meta, StoryObj } from "@storybook/react";
import FilterDropdown from "@/components/molecules/FilterDropdown";

const meta = {
  title: "Dropdown/FilterDropdown",
  component: FilterDropdown,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FilterDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
