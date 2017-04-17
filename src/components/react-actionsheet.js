import './style.scss';
import classNames from 'classnames';
import noop from 'noop';
import {ReactBackdropCtrl} from 'react-backdrop';
import appendToDocument from 'react-append-to-document';
import ReactVisible from 'react-visible';

export default class ReactActionSheet extends ReactVisible{
  static propTypes = {
    className:React.PropTypes.string,
    items:React.PropTypes.array,
    visible:React.PropTypes.bool,
    onClick:React.PropTypes.func,
  };

  static defaultProps = {
    items:[],
    visible:false,
    onClick:noop
  };

  static newInstance(inProps){
    return appendToDocument(ReactActionSheet,inProps,{
      className:'react-actionsheet-wrapper'
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      visible:props.visible,
      hidden:!props.visible,
      items:props.items,
      onClick:props.onClick,
      animating:false
    };
  }

  componentWillMount(){
    ReactBackdropCtrl.createInstance({
      style:{
        opacity:0.6
      },
      onClick:()=>{
        this.hide();
      }
    });
  }

  show(inOptions,inCallback){
    let options = Object.assign({...this.props},inOptions,{visible:true});
    ReactBackdropCtrl.show();
    this.setState(options,()=>{
      super.show(inCallback);
    });
  }

  hide(inCallback){
    super.hide(inCallback);
    ReactBackdropCtrl.hide();
  }

  _onClick(inItem){
    const {onClick} = this.state;
    if(inItem.action){
      onClick.call(this,inItem);
    }
  }

  render(){
    const {visible,hidden,animating,items,onClick} = this.state;
    const {className} = this.props;
    return (
      <div
        data-visible={visible}
        hidden={hidden}
        onTransitionEnd={this._onTransitionEnd}
        className={classNames('react-actionsheet',className)}>
        {items.map((item,index)=>{
          return (
            <div key={index}
            data-role={item.role}
            className="react-actionsheet-item"
            style={item.style}
            onClick={this._onClick.bind(this,item)}>{item.content}</div>
          );
        })}
      </div>
    );
  }
}
