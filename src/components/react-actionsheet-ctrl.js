import ReactActionSheet from 'components/react-actionsheet';

let instance;

export default class ReactActionSheetCtrl {

  static createInstance(inProps) {
    instance = instance || ReactActionSheet.newInstance(inProps);
    return instance;
  }

  static show(inOptions,inCallback){
    return instance.component.show(inOptions,inCallback);
  }

  static hide(inCallback){
    return instance.component.hide(inCallback);
  }

  static destroy(){
    instance.destroy();
    instance = null;
  }

}
