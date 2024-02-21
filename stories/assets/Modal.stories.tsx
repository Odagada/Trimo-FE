import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Modal from "@/components/molecules/Modal";

export default {
  title: "Components/Modal",
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Click to open modal</button>
      <Modal
        isOpen={isOpen}
        title="모달 제목"
        description="모달 설명"
        buttonText="확인"
        handleOKClick={() => {}}
        handleModalClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const ModalComponent = Template.bind({});

ModalComponent.args = {
  title: "모달 제목dd",
  description: "모달 설명dd",
  buttonText: "확인",
  handleModalClose: () => {},
  handleOKClick: () => {},
};
