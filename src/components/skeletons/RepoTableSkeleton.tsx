import React from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { brandColors } from "@/utils/helpers";
import ContentWrapper from "../ContentWrapper";

type Props = {};

function RepoTableSkeleton(props: Props) {
    return (
        <ContentWrapper>
            <div style={{ width: "100%" }}>
                <SkeletonTheme baseColor={brandColors.white} highlightColor={brandColors.captionBlack}>
                    <div style={{ width: "100%" }}>
                        <Skeleton height={75} style={{ marginBottom: "12px", borderRadius: "10px" }} />
                        <Skeleton height={75} style={{ marginBottom: "12px", borderRadius: "10px" }} />
                        <Skeleton height={75} style={{ marginBottom: "12px", borderRadius: "10px" }} />
                        <Skeleton height={75} style={{ marginBottom: "12px", borderRadius: "10px" }} />
                        <Skeleton height={75} style={{ marginBottom: "12px", borderRadius: "10px" }} />
                    </div>
                </SkeletonTheme>
            </div>
        </ContentWrapper>
    );
}

export default RepoTableSkeleton;
