import './style.scss';
import classNames from 'classnames';
import noop from 'noop';
import {ReactBackdropCtrl} from 'react-backdrop';
import appendToDocument from 'react-append-to-document';

export default class ReactActionSheet extends React.Component{
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
    this._timer = null;
    this.state = {
      visible:props.visible,
      items:props.items,
      onClick:props.onClick,
      animating:false,
    };
  }

  componentWillMount(){
    var self=this;
    ReactBackdropCtrl.createInstance({
      style:{
        opacity:0.6
      },
      onClick:function(){
        self.hide();
      }
    })
  }

  show(inOptions){
    let options = Object.assign({},this.props,inOptions,{visible:true});
    this.setState({
      animating:true
    },()=>{
      clearTimeout(this._timer);
      this._timer = setTimeout(()=>{
        this.setState(options);
      });
    });
    ReactBackdropCtrl.show();
  }

  hide(){
    this.setState({
      animating:true,
      visible:false
    });
    ReactBackdropCtrl.hide();
  }

  _onTransitionEnd(){
    this.setState({
      animating:false
    });
  }

  _onClick(inItem){
    const {onClick} = this.state;
    if(inItem.action){
      onClick.call(this,inItem);
    }
  }

  render(){
    const {visible,animating,items,onClick} = this.state;
    const {className} = this.props;
    return (
      <div
        data-visible={visible}
        hidden={!visible && !animating}
        onTransitionEnd={this._onTransitionEnd.bind(this)}
        className={classNames('react-actionsheet',className)}>
        {items.map((item,index)=>{
          return (
            <div key={index}
            data-role={item.role}
            className="react-actionsheet-item"
            style={item.style}
            onClick={onClick.bind(this,item)}>{item.content}</div>
          );
        })}
      </div>
    );
  }
}
