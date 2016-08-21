const initialState = {
    /**遮罩 */
    MaskShow:false,
    /**模态窗口 */
    ModalShow:false
};
/**公共的Reducer，比如一些公共组件的状态放到这里，如遮罩，弹窗提示，等 */
export const CommonReducer = (state=initialState, action)=>{
  switch(action.type){
      case action.COMMON:
      return {...state, ...action.data};
    default:
      return state;
  }
}