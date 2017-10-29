# bootstrap-es6

使用ECMAScript6封装的Bootstrap框架。

## 版本

* jquery版本：3.2.1
* bootstrap版本：v4.0.0-beta
* popper版本：1.12.5

## 类库

|       类名         |       xtype       |        类名          |       xtype        |
|-------------------|-------------------|----------------------|--------------------|
|   XBootstrap      |        无         |   XAlert             |   alert            |
|   XType           |        无         |   XBadge             |   badge            |
|   XCache          |        无         |   XBreadcrumb        |   breadcrumb       |
|   XEvent          |        无         |   XBreadcrumbItem    |   breadcrumbitem   |
|   X               |        无         |   XButton            |   button           |
|   XObject         |     object        |   XLinkButton        |   linkbutton       |
|   XHtml           |     html          |   XButtonGroup       |   buttongroup      |
|   XChild          |     child         |   XCard              |   card             |
|   XExample        |     example       |   XCardImage         |   cardimage        |
|   XContainer      |     container     |   XCardBody          |   cardbody         |
|   XContainerFluid |    containerfluid |   XCardTitle         |   cardtitle        |
|   XRow            |    row            |   XCardSubTitle      |   cardsubtitle     |
|   XCol            |    col            |   XCardText          |   cardtext         |
|   XMedia          |    media          |   XCardLink          |   cardlink         |
|   XList           |    list           |   XCardHeader        |   cardheader       |
|   XDefinitionList |   definitionlist  |   XCardFooter        |   cardfooter       |
|   XDefinitionItem |   definitionitem  |   XCarousel          |   carousel         |
|   XCode           |   code            |   XCarouselInner     |   carouselinner    |
|   XImage          |   image           |   XCarouselItem      |   carouselitem     |
|   XTable          |   table           |   XListGroup         |   listgroup        |
|   XTHead          |   thead           |   XListGroupItem     |   listgroupitem    |
|   XTBody          |   tbody           |   XCollapse          |   collapse         |
|   XTR             |   tr              |   XAccordion         |   accordion        |
|   XTH             |   th              |   XAccordionItem     |   accordionitem    |
|   XTD             |   td              |   XDropdown          |   dropdown         |
|   XFigure         |   figure          |   XDropdownItem      |   dropdownitem     |
|   XH1             |   h1              |   XForm              |   form             |
|   XH2             |   h2              |   XFormGroup         |   formgroup        |
|   XH3             |   h3              |   XLabel             |   label            |
|   XH4             |   h4              |   XInput             |   input            |
|   XH5             |   h5              |   XFormText          |   formtext         |
|   XH6             |   h6              |   XFormCheck         |   formcheck        |
|   XP              |   p               |   XSelect            |   select           |
|   XHr             |   hr              |   XOption            |   option           |

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
