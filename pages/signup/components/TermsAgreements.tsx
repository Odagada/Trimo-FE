import Clickable from "@/components/atoms/Clickable";
import Input from "@/components/atoms/Inputs/Input";
import InputWrapper from "@/components/atoms/Inputs/InputWapper";
import ShadowBox from "@/components/atoms/ShadowBox";
import ProgressNavigator from "@/components/molecules/ProgressNavigator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Select from "react-select";

import { useController, useForm } from "react-hook-form";
import { boolean } from "zod";
import { useCallback, useState } from "react";

function TermsAgreements() {
  const [termsCheckedStatus, setTermsCheckedStatus] = useState({ term1: false, term2: false, term3: false });

  const handleTermCheck = useCallback(
    (termType: string, status: boolean) => {
      setTermsCheckedStatus({ ...termsCheckedStatus, [termType]: status });
      console.log(termsCheckedStatus);
    },
    [termsCheckedStatus]
  );

  return (
    <div>
      <span className="text-20 font-bold text-center mb-15 mt-35">회원가입</span>
      <ProgressNavigator stepArray={[1, 0, 0]}></ProgressNavigator>
      <div>
        <span>개인정보처리방침</span>
        <label>
          <input
            type="radio"
            value="male"
            className="h-18 w-18 border-0 accent-black mr-12"
            onClick={() => handleTermCheck("term1", !termsCheckedStatus.term1)}
          />
          전체 동의
        </label>
      </div>

      <p className="w-[675px] h-[280px] rounded-[10px] border border-zinc-400">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <label>
        <input
          type="radio"
          value="male"
          className="h-18 w-18 border-0 accent-black mr-12"
          onClick={() => handleTermCheck("term1", !termsCheckedStatus.term1)}
        />
        동의
      </label>
      <p className="w-[675px] h-[280px] rounded-[10px] border border-zinc-400">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <label>
        <input
          type="radio"
          value="male"
          className="h-18 w-18 border-0 accent-black mr-12"
          onClick={() => handleTermCheck("term2", !termsCheckedStatus.term2)}
        />
        동의
      </label>
      <p className="w-[675px] h-[280px] rounded-[10px] border border-zinc-400">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <label>
        <input
          type="radio"
          value="male"
          className="h-18 w-18 border-0 accent-black mr-12"
          onClick={() => handleTermCheck("term3", !termsCheckedStatus.term3)}
        />
        동의
      </label>
      <button onClick={() => console.log(termsCheckedStatus)}>
        <Clickable size="medium">확인</Clickable>
      </button>
    </div>
  );
}

export default TermsAgreements;
