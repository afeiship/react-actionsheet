#react-actionsheet
> ActionSheet component for react.


## resource:
+ http://www.cnblogs.com/Kummy/p/4966937.html
+ https://github.com/steven5538/vue-button
+ https://yarnpkg.com/en/docs/install


## props:
| name | type | value | description |
| :----| :----| :----| :----|
| className  | String | '' | Your ext class |
| items  | Array | true/false | [] |
| visible  | Boolean | true/false | show/hide |
| onClick  | Function | function(){} | Item click |


## usage:
```javascript
import {ReactActionSheetCtrl} from './main';

_click1(){
    ReactActionSheetCtrl.show({
      onClick:function(item){
        console.log('click1',item)
      },
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
```
