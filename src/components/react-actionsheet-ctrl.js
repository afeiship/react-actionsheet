import ReactActionSheet from 'components/react-actionsheet';

let instance;

export default class ReactActionSheetCtrl {

  static createInstance(inProps) {
    instance = instance || ReactActionSheet.newInstance(inProps);
    return instance;
  }

  static show(inOptions){
    instance.component.show(inOptions);
  }

  static hide(){
    instance.component.hide();
  }

  static destroy(){
    instance.destroy();
    instance = null;
  }

}
