# bootstrap-es6

使用ECMAScript6封装的Bootstrap框架。

## 版本

jquery版本：3.2.1

bootstrap版本：v4.0.0-beta

## 用法一

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>bootstrap-es6 hello world</title>
    <link href="css/bootstrap.css" rel="stylesheet" />
    <link href="css/bootstrap-theme.css" rel="stylesheet" />
</head>
<body>
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.js"></script>

    <script src="source/BObject.js"></script>
    <script src="source/BHtml.js"></script>

    <script src="source/Layout/BLayout.js"></script>
    <script src="source/Layout/BContainer.js"></script>
    <script src="source/Layout/BContainerFluid.js"></script>
    <script>
        var container = new BContainer();
    
        var html = new BHtml();
        html.setHtml('<h1>Hello,world.</h1>');
        container.appendChild(html);
    
        container.render(document.body);
    </script>
</body>
</html>
```

## 用法二

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>bootstrap-es6 hello world</title>
    <link href="css/bootstrap.css" rel="stylesheet" />
    <link href="css/bootstrap-theme.css" rel="stylesheet" />
</head>
<body>
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.js"></script>

    <script src="source/BObject.js"></script>
    <script src="source/BHtml.js"></script>

    <script src="source/Layout/BLayout.js"></script>
    <script src="source/Layout/BContainer.js"></script>
    <script src="source/Layout/BContainerFluid.js"></script>
    <script>
        var container = new BContainer({
            children: [{
                new BHtml({
                    html: '<h1>Hello,world.</h1>'
                })
            }]
        });
    
        container.render(document.body);
    </script>
</body>
</html>
```

## 网站

Bootstrap中文网：http://www.bootcss.com/

ECMAScript6入门：http://es6.ruanyifeng.com/
