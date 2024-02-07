import type { Meta, StoryObj } from "@storybook/react";
import OrderDropdown from "@/components/atoms/Dropdowns/OrderDropdown";

const meta = {
  title: "Dropdown/OrderDropdown",
  component: OrderDropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OrderDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
