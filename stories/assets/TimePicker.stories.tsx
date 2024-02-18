import Timepicker from "@/components/atoms/TimePicker";
import type { Meta, StoryObj } from "@storybook/react";

const timepicker = {
  title: "Timepicker/Timepicker",
  component: Timepicker,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Timepicker>;

export default timepicker;
type Story = StoryObj<typeof timepicker>;

export const Example: Story = {};
