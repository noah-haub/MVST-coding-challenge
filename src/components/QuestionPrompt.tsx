import { brandColors } from "@/utils/helpers";
import React from "react";
import styled from "styled-components";

type Props = {
    showPrompt: boolean;
    setShowPrompt: React.Dispatch<React.SetStateAction<boolean>>;

    headline: string;
    caption: string;
    cancelButtonText: string;
    confirmButtonText: string;
    functionOnConfirm: () => void;
};

const PromptOverlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${brandColors.black}75;
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PromptDiv = styled.div`
    background-color: ${brandColors.white};
    width: 600px;
    text-align: center;
    padding: 40px;
    overflow-y: auto;
    position: relative;
    border-radius: 10px;
`;

const Headline = styled.p`
    color: ${brandColors.black};
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 12px;
`;

const Caption = styled.p`
    color: ${brandColors.captionBlack};
    font-size: 0.95rem;
    font-weight: 400;
`;

const ConfirmButton = styled.button`
    all: unset;
    cursor: pointer;
    color: ${brandColors.white};
    background-color: ${brandColors.purple};
    padding: 10px;
    border-radius: 5px;
    height: 20px;
    margin-left: 5px;

    &:hover {
        background-color: ${brandColors.darkPurple};
        outline: 1px solid ${brandColors.purple};

        color: ${brandColors.white};
    }
`;

const CancelButton = styled.button`
    all: unset;
    cursor: pointer;
    color: ${brandColors.black};
    background-color: ${brandColors.cancelColor};
    padding: 10px;
    border-radius: 5px;
    height: 20px;
    margin-right: 5px;

    &:hover {
        background-color: ${brandColors.gray};
        outline: 1px solid ${brandColors.cancelColor};

        color: ${brandColors.black};
    }
`;

function QuestionPrompt(props: Props) {
    return (
        <>
            {props.showPrompt ? (
                <PromptOverlay>
                    <PromptDiv>
                        <div style={{ marginBottom: "24px" }}>
                            <Headline>{props.headline}</Headline>
                            <Caption>{props.caption}</Caption>
                        </div>

                        <CancelButton
                            onClick={() => {
                                props.setShowPrompt(!props.showPrompt);
                            }}
                        >
                            {props.cancelButtonText}
                        </CancelButton>
                        <ConfirmButton
                            onClick={() => {
                                props.functionOnConfirm();
                            }}
                        >
                            {props.confirmButtonText}
                        </ConfirmButton>
                    </PromptDiv>
                </PromptOverlay>
            ) : null}
        </>
    );
}

export default QuestionPrompt;
