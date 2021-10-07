import { CSSProperties, FC, useCallback, useState } from "react";
import { GCodeViewer, GCodeViewerProps } from "../../src";
import { ComponentMeta } from "@storybook/react";
import React from "react";

const style: CSSProperties = {
    position: "absolute",
    top: '0vh',
    left: '0vw',
    width: '100vw',
    height: '100vh',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

function FromUrl(props: Omit<GCodeViewerProps, "url">) {
    const [file, setFile] = useState<File>()

    const preventDefault = useCallback((e: React.DragEvent<any>) => {
        e.preventDefault()
    }, [])

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        console.log("file dropped")
        setFile(e.dataTransfer.files[0])
    }, [])

    const extraProps = {onDragOver: preventDefault, onDragEnter: preventDefault, onDrop}

    return (
        <>
            {file && <GCodeViewer
                file={file}
                style={style}
                {...extraProps}
                {...props}
                layerColor={"#008675"}
                topLayerColor={"#e79f0d"}
            />}
            {!file && <div style={style} {...extraProps}>
                <h4>drop here</h4>
            </div>}
        </>

    );
}

export const Primary = FromUrl.bind({})

export default {
    component: GCodeViewer,
    title: "GCodeViewer from dropped file",
} as ComponentMeta<FC<GCodeViewerProps>>
