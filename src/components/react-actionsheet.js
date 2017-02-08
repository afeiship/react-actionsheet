import './style.scss';
import classNames from 'classnames';
import {ReactBackdropCtrl} from 'react-backdrop';
import appendToDocument from 'react-append-to-document';

class ReactActionSheet extends React.Component{
  static propTypes = {
    cssClass:React.PropTypes.string,
    items:React.PropTypes.array,
    visible:React.PropTypes.bool,
    onClick:React.PropTypes.func,
  };

  static defaultProps = {
    items:[],
    visible:false
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
      items:props.items,
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
    this._setVisible(inOptions,true);
    ReactBackdropCtrl.show();
  }

  hide(){
    this._setVisible({},false);
    ReactBackdropCtrl.hide();
  }

  _setVisible(inOptions,inValue){
    var self=this;
    this.setState({
      animating:true
    });

    setTimeout(function(){
      self.setState(
        Object.assign(inOptions,{
          visible:inValue
        })
      );
    });
  }

  _onTransitionEnd(){
    this.setState({
      animating:false
    })
  }

  render(){
    return (
      <div
        data-visible={this.state.visible}
        hidden={!this.state.visible && !this.state.animating}
        onTransitionEnd={this._onTransitionEnd.bind(this)}
        className={classNames('react-actionsheet',this.props.cssClass)}>
        {this.state.items.map(function(item,index){
          if(item.action){
            return <div key={index} data-role={item.role} className="react-actionsheet-item" style={item.style} onClick={this.props.onClick.bind(this,item)}>{item.content}</div>;
          }
          return <div key={index} data-role={item.role} className="react-actionsheet-item" style={item.style}>{item.content}</div>;
        }.bind(this))}
      </div>
    );
  }
}

export default ReactActionSheet;
