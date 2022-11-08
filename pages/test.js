// Generated by Framer (b814472)
import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";
import{addFonts,addPropertyControls,ControlType,cx,RichText,useVariantState,withCSS}from"framer";
import{LayoutGroup,motion}from"framer-motion";import*as React from"react";
const cycleOrder=["ahRq0HBOe"];const variantClassNames={ahRq0HBOe:"framer-v-lx0mjk"};
function addPropertyOverrides(overrides,...variants){
  const nextOverrides={};
  variants===null||variants===void 0?void 0:variants.forEach(variant=>variant&&Object.assign(nextOverrides,overrides[variant]));return nextOverrides;}const humanReadableVariantMap={};const transitions={default:{damping:60,delay:0,duration:.3,ease:[.44,0,.56,1],mass:1,stiffness:500,type:"spring"}};const BASE62="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";function useRandomID(){const ref=React.useRef(null);if(ref.current===null){ref.current=Array(5).fill(0).map(()=>BASE62[Math.floor(Math.random()*BASE62.length)]).join("");}return ref.current;}const Component=/*#__PURE__*/ React.forwardRef(function({id,style:externalStyle={},className,width,height,layoutId,variant:outerVariant="ahRq0HBOe",title:rShNcDTPV="Welcome to SBT",...restProps},ref){const outerVariantId=humanReadableVariantMap[outerVariant];const variant=outerVariantId||outerVariant;const{baseVariant,classNames,gestureVariant,setGestureState,setVariant,transition,variants}=useVariantState({cycleOrder,defaultVariant:"ahRq0HBOe",transitions,variant,variantClassNames});const layoutDependency=variants.join("-")+restProps.layoutDependency;const defaultLayoutId=useRandomID();const{pointerEvents,...style}=externalStyle;return /*#__PURE__*/ _jsx(LayoutGroup,{id:layoutId!==null&&layoutId!==void 0?layoutId:defaultLayoutId,children:/*#__PURE__*/ _jsx(motion.div,{"data-framer-generated":true,initial:variant,animate:variants,onHoverStart:()=>setGestureState({isHovered:true}),onHoverEnd:()=>setGestureState({isHovered:false}),onTapStart:()=>setGestureState({isPressed:true}),onTap:()=>setGestureState({isPressed:false}),onTapCancel:()=>setGestureState({isPressed:false}),className:cx("framer-G1ThL",classNames),style:{display:"contents",pointerEvents:pointerEvents!==null&&pointerEvents!==void 0?pointerEvents:undefined},children:/*#__PURE__*/ _jsx(motion.div,{...restProps,className:cx("framer-lx0mjk",className),"data-framer-name":"Variant 1",layoutDependency:layoutDependency,layoutId:"ahRq0HBOe",ref:ref,style:{...style},transition:transition,children:/*#__PURE__*/ _jsx(RichText,{__fromCanvasComponent:true,children:/*#__PURE__*/ _jsx(React.Fragment,{children:/*#__PURE__*/ _jsx(motion.p,{style:{"--font-selector":"R0Y7QmUgVmlldG5hbSBQcm8tNTAw","--framer-font-family":'"Be Vietnam Pro", serif',"--framer-font-size":"40px","--framer-font-weight":"500","--framer-letter-spacing":"-1px","--framer-line-height":"1em","--framer-text-alignment":"center","--framer-text-color":"var(--extracted-r6o4lv)"},children:/*#__PURE__*/ _jsxs(motion.span,{"data-text-fill":"true",style:{backgroundImage:"linear-gradient(274deg, rgb(39, 196, 184) 0%, rgb(48, 15, 215) 100%)"},children:["Welcome to ",/*#__PURE__*/ _jsx(motion.span,{style:{"--font-selector":"R0Y7QmUgVmlldG5hbSBQcm8tODAw","--framer-font-weight":"800"},children:"SBT"})]})})}),className:"framer-1ek775u",fonts:["GF;Be Vietnam Pro-500","GF;Be Vietnam Pro-800"],layoutDependency:layoutDependency,layoutId:"IoTZ9GsJr",style:{"--extracted-r6o4lv":"rgb(255, 255, 255)","--framer-link-text-color":"rgb(0, 153, 255)","--framer-link-text-decoration":"underline","--framer-paragraph-spacing":"0px"},text:rShNcDTPV,transformTemplate:(_,t)=>`translate(-50%, -50%) ${t}`,transition:transition,verticalAlignment:"top",withExternalLayout:true})})})});});const css=['.framer-G1ThL [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none;}',"@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",".framer-G1ThL * { box-sizing: border-box; }",".framer-G1ThL .framer-lx0mjk { height: 40px; overflow: hidden; position: relative; width: 314px; }",".framer-G1ThL .framer-1ek775u { flex: none; height: auto; left: 50%; position: absolute; top: 50%; white-space: pre; width: auto; }"];/**
 * This is a generated Framer component.
 * @framerIntrinsicHeight 40
 * @framerIntrinsicWidth 314
 * @framerCanvasComponentVariantDetails {"propertyName":"variant","data":{"default":{"layout":["fixed","fixed"]}}}
 * @framerVariables {"rShNcDTPV":"title"}
 */ const FramerFbJJDRVSo=withCSS(Component,css);export default FramerFbJJDRVSo;FramerFbJJDRVSo.displayName="Test1";FramerFbJJDRVSo.defaultProps={height:40,width:314};addPropertyControls(FramerFbJJDRVSo,{rShNcDTPV:{defaultValue:"Welcome to SBT",displayTextArea:false,title:"Title",type:ControlType.String}});addFonts(FramerFbJJDRVSo,[{family:"Be Vietnam Pro",moduleAsset:{localModuleIdentifier:"local-module:canvasComponent/FbJJDRVSo:default",url:"https://fonts.gstatic.com/s/bevietnampro/v10/QdVMSTAyLFyeg_IDWvOJmVES_HTEJl8yT7wrcwap.ttf"},style:"normal",url:"https://fonts.gstatic.com/s/bevietnampro/v10/QdVMSTAyLFyeg_IDWvOJmVES_HTEJl8yT7wrcwap.ttf",weight:"500"},{family:"Be Vietnam Pro",moduleAsset:{localModuleIdentifier:"local-module:canvasComponent/FbJJDRVSo:default",url:"https://fonts.gstatic.com/s/bevietnampro/v10/QdVMSTAyLFyeg_IDWvOJmVES_HSQI18yT7wrcwap.ttf"},style:"normal",url:"https://fonts.gstatic.com/s/bevietnampro/v10/QdVMSTAyLFyeg_IDWvOJmVES_HSQI18yT7wrcwap.ttf",weight:"800"}]);
export const __FramerMetadata__ = {"exports":{"Props":{"type":"tsType","annotations":{"framerContractVersion":"1"}},"default":{"type":"reactComponent","name":"FramerFbJJDRVSo","slots":[],"annotations":{"framerContractVersion":"1","framerIntrinsicHeight":"40","framerCanvasComponentVariantDetails":"{\"propertyName\":\"variant\",\"data\":{\"default\":{\"layout\":[\"fixed\",\"fixed\"]}}}","framerIntrinsicWidth":"314","framerVariables":"{\"rShNcDTPV\":\"title\"}"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./FbJJDRVSo.map