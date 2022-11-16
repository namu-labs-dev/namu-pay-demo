import{jsx as _jsx}from"react/jsx-runtime";import{CircleNotch,CheckCircle}from"phosphor-react";import{AnimatePresence,motion}from"framer-motion";// import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"
// import { randomColor } from "https://framer.com/m/framer/utils.js@^0.9.0"
// Learn more: https://www.framer.com/docs/guides/overrides/
// const useStore = createStore({
//     background: "#0099FF",
// })
export function appearence(Component){return props=>{return /*#__PURE__*/ _jsx(AnimatePresence,{mode:"wait",children:/*#__PURE__*/ _jsx(motion.div,{initial:"hidden",animate:"visible",exit:{opacity:0,transition:{duration:1}},variants:{hidden:{opacity:0,y:35},visible:{opacity:1,y:0,transition:{duration:.5}}},...props})});};}export function checkAppear(Component){return()=>{return /*#__PURE__*/ _jsx(AnimatePresence,{mode:"wait",children:/*#__PURE__*/ _jsx(motion.div,{initial:"hidden",animate:"visible",exit:{opacity:0,transition:{duration:1}},variants:{hidden:{opacity:0,y:35},visible:{opacity:1,y:0,transition:{duration:.5}}},children:/*#__PURE__*/ _jsx(CheckCircle,{size:60,color:"#016252"})})});};}export function spinner(Component){return props=>{return /*#__PURE__*/ _jsx(motion.div,{animate:{rotate:360},transition:{repeat:Infinity,duration:1,ease:"linear"},exit:{opacity:0,transition:{duration:1}},variants:{hidden:{opacity:0}},children:/*#__PURE__*/ _jsx(CircleNotch,{size:60,color:"#016252"})});};} // export function withRotate(Component): ComponentType {
 //     return (props) => {
 //         return (
 //             <Component
 //                 {...props}
 //                 animate={{ rotate: 90 }}
 //                 transition={{ duration: 2 }}
 //             />
 //         )
 //     }
 // }
 // export function withHover(Component): ComponentType {
 //     return (props) => {
 //         return <Component {...props} whileHover={{ scale: 1.05 }} />
 //     }
 // }
 // export function withRandomColor(Component): ComponentType {
 //     return (props) => {
 //         const [store, setStore] = useStore()
 //         return (
 //             <Component
 //                 {...props}
 //                 animate={{
 //                     background: store.background,
 //                 }}
 //                 onClick={() => {
 //                     setStore({ background: randomColor() })
 //                 }}
 //             />
 //         )
 //     }
 // }

export const __FramerMetadata__ = {"exports":{"checkAppear":{"type":"reactHoc","name":"checkAppear","annotations":{"framerContractVersion":"1"}},"spinner":{"type":"reactHoc","name":"spinner","annotations":{"framerContractVersion":"1"}},"appearence":{"type":"reactHoc","name":"appearence","annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./Examples_1.map