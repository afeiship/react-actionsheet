import './dev.scss';
import {ReactActionSheetCtrl} from './main';


class App extends React.Component{

  componentWillMount(){
    ReactActionSheetCtrl.createInstance({
      onClick:function(inItem){
        console.log(this,inItem);
      },
      items:[]
    });
  }

  _click1(){
    ReactActionSheetCtrl.show({
      items:[{
        role:'cmd',
        content:'Take Photo',
        action:'tackPhoto'
      },{
        role:'cmd',
        content:'Choose From ...',
        action:'choose'
      },{
        role:'cmd',
        content:'Other action',
        action:'other'
      },{
        role:'cmd',
        content:'OPtion2',
        action:'option2'
      },{
        role:'blank',
        style:{
          height:'8px'
        }
      },{
        role:'cmd',
        content:'Cancel',
        action:'cancel'
      }]
    })
  }

  _click2(){
    ReactActionSheetCtrl.show({
      items:[{
        role:'text',
        content:'Title',
        style:{
          color:'#F00',
          fontWeight:800
        }
      },{
        role:'cmd',
        content:'Choose From ...',
        action:'choose'
      },{
        role:'blank',
        style:{
          height:'8px'
        }
      },{
        role:'cmd',
        content:'Cancel',
        action:'cancel'
      }]
    })
  }
  _click3(){
    ReactActionSheetCtrl.show({
      items:[{
        role:'text',
        content:'Are you sure?',
        style:{
          fontWeight:800
        }
      },{
        role:'text',
        content:'Once deleted, you will never find it.',
        style:{
          padding:'2px 0 10px',
          color:'#999',
          fontSize:'12px'
        }
      },{
        role:'blank',
        style:{
          height:'2px'
        }
      },{
        role:'cmd',
        content:'Cancel',
        action:'cancel'
      }]
    })
  }
  render(){
    return (
      <div className="hello-react-actionsheet">
        <button onClick={this._click1.bind(this)}>Show ActionSheet - TYPE1</button>
        <button onClick={this._click2.bind(this)}>Show ActionSheet - TYPE2</button>
        <button onClick={this._click3.bind(this)}>Show ActionSheet - TYPE3</button>
    </div>
    );
  }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);
