import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Carousel from "@/components/Carousel/Carousel";

export default {
  title: "Example/Carousel",
  component: Carousel,
} as Meta;

const Template: StoryFn<typeof Carousel> = (args) => <Carousel />;

export const Default = Template.bind({});
