import { store } from '../../src/store';
export const COMMON = 'COMMON'
export const CommonAction = (data) => {
    return {
        type: COMMON,
        data,
    }
}
/**基础提示框 */
export const BaseAlert = (BaseAlertTitle, BaseAlertContent) => {
    let data = { BaseAlert: true, BaseAlertTitle, BaseAlertContent };
    store.dispatch(CommonAction(data))
}
/**
 * 取消
 */
export const Cancel = () => {
    let data = { BaseAlert: false };
    store.dispatch(CommonAction(data))
}