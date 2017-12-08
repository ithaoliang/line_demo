# bms-kb

> system of kuaibai back manage system

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



文件内容说明：
src：								//主要操作的目录
	assets:							//存放css和image
			css
				sprites				//存放雪碧图引用目录
				demo.scss           //存放公共的css样式，可继续往下写
			images
				sprites				//存放需要生成，以及已经生成的雪碧图内容
					Build       	//生成的雪碧图
					test			//需要生成雪碧图的文件夹		
				新文件夹			//存放其他图片文件，用于页面引用

	compontents:					//存放公共的组件,用于业务组件引用
	router:							//配置跳转路由
	view:							//业务组件，不同业务新建文件夹，组件要在文件夹下面，便于管理
		业务组件文件夹


