import { brandColors } from "@/utils/helpers";
import React from "react";
import styled from "styled-components";

type Props = {
    errorMessage: string;
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentDiv = styled.div`
    text-align: center;
    width: 300px;
`;

const Headline = styled.h2`
    color: ${brandColors.black};
    font-size: 1.5rem;
    font-weight: 900;
`;

const Caption = styled.p`
    color: ${brandColors.captionBlack};
    font-size: 0.95rem;
    font-weight: 400;
`;

function ErrorBox(props: Props) {
    return (
        <Container>
            <ContentDiv>
                <Headline style={{ marginBottom: "12px" }}>Something went wrong!</Headline>
                <Caption>{props.errorMessage}</Caption>
            </ContentDiv>
        </Container>
    );
}

export default ErrorBox;
