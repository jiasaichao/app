export const COMMON = 'COMMON'
export const CommonAction = (index) => {
    return {
        type: COMMON,
        index,
    }
}
/**设置遮罩层是否显示 */
export const SetMask = (isMask) => {
    return (dispatch) => {
        let data = { MaskShow: isMask };
        dispatch(CommonAction(data))
    }
}
