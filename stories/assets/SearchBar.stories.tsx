import SearchBar from "@/components/atoms/Inputs/SearchBar";
import type { Meta, StoryObj } from "@storybook/react";

const searchBar = {
  title: "Input/SearchBar",
  component: SearchBar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SearchBar>;

export default searchBar;
type Story = StoryObj<typeof searchBar>;

export const WithoutInitialValue: Story = {
  args: {
    size: "large",
  },
};

export const WithInitialValue: Story = {
  args: {
    size: "large",
    initialValue: "제주도",
  },
};
