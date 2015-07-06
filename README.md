#JDB   
JDB是一款基于jquery的轻量级双向绑定库。    
JDB希望可以帮助使用者轻松实现双向绑定而无须用户付出过多的学习成本和使用成本。   
__JDB默认约定整个页面只有一个被绑定对象__    

##简单应用   
1. 引入jquery.js  
2. 引入jdb.js  
3. HTML代码采用jdb-model属性进行绑定,以下代码绑定了对象的name属性   
```   
<input type="text" jdb-model="name" >
```  
4. 设置被绑定对象    
```   
var data = {   
	name:"zack",   
	age:18  
};  
jdb.bind(data);   
``` 
5. 修改绑定对象值改变视图   
```   
var data = {   
	name:"zack",   
	age:18   
};   
var mock = jdb.bind(data);   
mock.name.set("改变name属性的值，同时被绑定视图控件将自动改变");   
```

##JDB实现的简单原理   
JDB采用getter，setter模式完成对象的双向绑定   
当JDB的bind方法被调用时会自动返回当前绑定对象的一个模拟对象，该模拟对象拥有绑定对象的所有属性，并将属性封装成对象并提供了get与set方法。set方法被调用时在改变了原有对象值的同时也会同时更新页面绑定对象实现了object->html的绑定   
JDB会自动为所有带有jdb-model属性的控件绑定click与keyup事件用来监听页面的值改变来实现html->object的绑定



