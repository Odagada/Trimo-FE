import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Modal from "@/components/molecules/Modal";

export default {
  title: "Component/Modal",
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal!</button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const SingleButtonModal = Template.bind({});
SingleButtonModal.args = {
  isOpen: false,
  title: "모달 제목",
  description: "모달 설명입니다!!",
  buttonText: "확인",
};

export const DualButtonModal = Template.bind({});
DualButtonModal.args = {
  isOpen: false,
  title: "모달 제목",
  description: "모달 설명입니다!!",
  buttonText: ["확인", "취소"],
};
