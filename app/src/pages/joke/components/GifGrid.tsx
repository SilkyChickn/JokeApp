import React from "react";
import styled from "styled-components";

const GifWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Gif = styled.img`
    display: inline-block;
    width: 50%;

    @media all and (min-width: 700px) {
        width: 25%;
    }
`;

export type GifGridProps = {
    gifs: string[]
}

export const GifGrid: React.FC<GifGridProps> = (args) => {
    return (
        <GifWrapper>{
            args.gifs.map(gif => {
                return <Gif src={gif} />
            })
        }</GifWrapper>
    );
}