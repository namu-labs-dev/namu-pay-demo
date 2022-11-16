export const centerContent = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};
export const autoSizingText = {
    width: "max-content",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    overflow: "hidden",
    whiteSpace: "pre-wrap",
    flexShrink: 0
};
export const defaultContainerStyles = {
    ...centerContent,
    overflow: "hidden"
};
export const containerStyles = defaultContainerStyles;
export const randomColor = ()=>"#" + Math.floor(Math.random() * 16777215).toString(16)
;

export const __FramerMetadata__ = {"exports":{"centerContent":{"type":"variable","annotations":{"framerContractVersion":"1"}},"containerStyles":{"type":"variable","annotations":{"framerContractVersion":"1"}},"autoSizingText":{"type":"variable","annotations":{"framerContractVersion":"1"}},"defaultContainerStyles":{"type":"variable","annotations":{"framerContractVersion":"1"}},"randomColor":{"type":"variable","annotations":{"framerContractVersion":"1"}}}}
//# sourceMappingURL=./Utils.map