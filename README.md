# A SIMPLE minirouter for spa
使用原生API，十分简短，支持链式语法，使用简洁优雅。

## API:
`Router.use(path, controller)`

path: 即路径
controller: 一个包含的render等方法的对象. 

```javascript
var mockController = {
    render: function(){
        return "<div></div>"
    }
    onEnter: function(){
        //this对象为当前组件，即{path, controller: controller}对象
    }
    onLeave: function(){

    }
}
```

`Router.default`

设置默认路径

`Router.run`

bootstrap整个路由


## DEMO:
```javascript
var router = new Router('#app');
router.use('/', {
    render: function(){
        return '<div><h4>page1</h4><p><a href="#/baidu">a path does not exits<a><br/><a href="#/page2">#page2</a></p></div>';
    },
    onEnter: function(){
        alert("hi i\'m here, page1");
    },
    onLeave: function(){
        alert('goodbye page1');
    }
}).use('/page2', {
    render: function(){
        return '<div>page2</div>';
    },
    onEnter: function(){
        alert('hi page2');
    },
    onLeave: function(){
        alert('bye page2');
    }
}).run();
``` 

## 说明

MIT Licence.

