import Nav from "@/components/molecules/NavigationBar";
import type { Meta, StoryObj } from "@storybook/react";

const navbar = {
  title: "Navbar/NavigationBar",
  component: Nav,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Nav>;

export default navbar;
type Story = StoryObj<typeof navbar>;

export const NavbarStatus: Story = {
  args: {
    navStatus: "LoggedOut",
    hasSearchBar: false,
  },
};
