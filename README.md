# bootstrap-es6

使用ECMAScript6封装的Bootstrap框架。

## 版本

jquery版本：3.2.1

bootstrap版本：v4.0.0-beta

## 类库

|       类名         |       xtype       |
|-------------------|-------------------|
|   XBootstrap      |        无         |
|   XType           |        无         |
|   XCache          |        无         |
|   XEvent          |        无         |
|   X               |        无         |
|   XObject         |     object        |
|   XHtml           |     html          |
|   XChild          |     child         |
|   XExample        |     example       |
|   XContainer      |     container     |
|   XContainerFluid |    containerfluid |
|

## 用法

```html
<!DOCTYPE html>

<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>bootstrap-es6 hello world</title>
    <link href="css/bootstrap.css" rel="stylesheet" />
</head>
<body>
    <script src="../dist/js/jquery.js"></script>
    <script src="../dist/js/popper.js"></script>
    <script src="../dist/js/bootstrap.js"></script>
    <script src="../dist/js/bootstrap-es6.js"></script>
    <script>
        var container = new XContainer({
            container: document.body,
            children: [{
                xtype: 'html',
                html: 'Hello, world!'
            }]
        });
        container.render();
    </script>
</body>
</html>
```

## 网站

Bootstrap中文网：http://www.bootcss.com/

ECMAScript6入门：http://es6.ruanyifeng.com/
