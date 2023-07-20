import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { brandColors } from "@/utils/helpers";
import ContentWrapper from "../ContentWrapper";

type Props = {};

function RepoSkeleton(props: Props) {
    return (
        <ContentWrapper>
            <div style={{ width: "100%" }}>
                <SkeletonTheme baseColor={brandColors.gray} highlightColor={brandColors.captionBlack}>
                    <div style={{ width: "50%", marginBottom: "48px" }}>
                        <Skeleton height={20} style={{ marginBottom: "12px", borderRadius: "5px" }} />
                        <Skeleton height={20} style={{ marginBottom: "12px", borderRadius: "5px" }} />
                    </div>
                    <div style={{ width: "100%" }}>
                        <Skeleton height={50} style={{ marginBottom: "24px", borderRadius: "5px" }} />
                        <Skeleton height={60} style={{ marginBottom: "12px", borderRadius: "5px" }} />
                        <Skeleton height={60} style={{ marginBottom: "12px", borderRadius: "5px" }} />
                    </div>
                </SkeletonTheme>
            </div>
        </ContentWrapper>
    );
}

export default RepoSkeleton;
