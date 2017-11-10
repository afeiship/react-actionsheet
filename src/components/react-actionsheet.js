import './style.scss';

import PropTypes from 'prop-types';
import {ReactBackdrop} from 'react-backdrop';
import ReactVisible from 'react-visible';
import appendToDocument from 'react-append-to-document';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';

export default class ReactActionSheet extends ReactVisible{
  static propTypes = {
    className:PropTypes.string,
    items:PropTypes.array,
    visible:PropTypes.bool,
    onClick:PropTypes.func,
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

  show(inOptions,inCallback){
    let options = objectAssign({...this.props},inOptions);
    this.setState(options,()=>{
      super.show(inCallback);
    });
    return this;
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
      <div className="react-actionsheet-container">
        <ReactBackdrop onClick={this.hide.bind(this)} visible={visible} style={{ position:'fixed'}} />
        <div
          data-visible={visible}
          className={classNames('react-actionsheet',className)}>
          {items.map((item,index)=>{
            return (
              !item.hidden && <div key={index}
              data-role={item.role}
              className="react-actionsheet-item"
              style={item.style}
              onClick={this._onClick.bind(this,item)}>{item.content}</div>
            );
          })}
        </div>
      </div>
    );
  }
}
