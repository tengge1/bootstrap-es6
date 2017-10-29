# bootstrap-es6 v1.0.0

bootstrap-es6将bootstrap框架中的组件封装为类，可以像ExtJs那样通过javascript动态生成页面。这对于功能特别多、特别复杂的页面特别有用。

## 版本

* jquery版本：3.2.1
* bootstrap版本：4.0.0-beta
* popper版本：1.12.5

## 类库

|       类名         |       xtype       |        类名          |       xtype        |      类名          |       xtype           |
|-------------------|-------------------|----------------------|--------------------|--------------------|-----------------------|
|   XBootstrap      |        无         |   XAlert             |   alert            |   XTextarea        |   textarea            |
|   XType           |        无         |   XBadge             |   badge            |   XFile            |   file                |
|   XCache          |        无         |   XBreadcrumb        |   breadcrumb       |   XInputGroup      |   inputgroup          |
|   XEvent          |        无         |   XBreadcrumbItem    |   breadcrumbitem   |   XInputGroupAddon |   inputgroupaddon     |
|   X               |        无         |   XButton            |   button           |   XJumbotron       |   jumbotron           |
|   XObject         |     object        |   XLinkButton        |   linkbutton       |   XModal           |   modal               |
|   XHtml           |     html          |   XButtonGroup       |   buttongroup      |   XNav             |   nav                 |
|   XChild          |     child         |   XCard              |   card             |   XNavItem         |   navitem             |
|   XExample        |     example       |   XCardImage         |   cardimage        |   XNavLink         |   navlink             |
|   XContainer      |     container     |   XCardBody          |   cardbody         |   XTabPanel        |   tabpanel            |
|   XContainerFluid |    containerfluid |   XCardTitle         |   cardtitle        |   XTabPanelItem    |   tabpanelitem        |
|   XRow            |    row            |   XCardSubTitle      |   cardsubtitle     |   XNavbar          |   navbar              |
|   XCol            |    col            |   XCardText          |   cardtext         |   XNavbarBrand     |   navbarbrand         |
|   XMedia          |    media          |   XCardLink          |   cardlink         |   XNavbarToggler   |   navbartoggler       |
|   XList           |    list           |   XCardHeader        |   cardheader       |   XNavbarCollapse  |   navbarcollapse      |
|   XDefinitionList |   definitionlist  |   XCardFooter        |   cardfooter       |   XNavbarNav       |   navbarnav           |
|   XDefinitionItem |   definitionitem  |   XCarousel          |   carousel         |   XDropdownMenu    |   dropdownmenu        |
|   XCode           |   code            |   XCarouselInner     |   carouselinner    |   XPagination      |   pagination          |
|   XImage          |   image           |   XCarouselItem      |   carouselitem     |   XPageItem        |   pageitem            |
|   XTable          |   table           |   XListGroup         |   listgroup        |   XPopOver         |   popover             |
|   XTHead          |   thead           |   XListGroupItem     |   listgroupitem    |   XProgress        |   progress            |
|   XTBody          |   tbody           |   XCollapse          |   collapse         |   XTooltip         |   tooltip             |
|   XTR             |   tr              |   XAccordion         |   accordion        |                    |                       |
|   XTH             |   th              |   XAccordionItem     |   accordionitem    |                    |                       |
|   XTD             |   td              |   XDropdown          |   dropdown         |                    |                       |
|   XFigure         |   figure          |   XDropdownItem      |   dropdownitem     |                    |                       |
|   XH1             |   h1              |   XForm              |   form             |                    |                       |
|   XH2             |   h2              |   XFormGroup         |   formgroup        |                    |                       |
|   XH3             |   h3              |   XLabel             |   label            |                    |                       |
|   XH4             |   h4              |   XInput             |   input            |                    |                       |
|   XH5             |   h5              |   XFormText          |   formtext         |                    |                       |
|   XH6             |   h6              |   XFormCheck         |   formcheck        |                    |                       |
|   XP              |   p               |   XSelect            |   select           |                    |                       |
|   XHr             |   hr              |   XOption            |   option           |                    |                       |

## 原理

* bootstrap-es6并不是通过拼接字符串的方式生成页面，而是通过两个函数`document.createElement`和`[HTMLElement].appendChild`来动态渲染页面。
* 当调用`XObject.render`函数时，它首先渲染最外层元素，然后最外层元素根据`children`属性列表中的`xtype`，创建相对应的类，来一层一层向内渲染。

## 核心函数简介

`XType`：用于管理class和xtype对应关系的类。

XType.add(xtype, cls)：可以将xtype和class的对应关系添加进来，这样就可以在children列表中使用了。  
XType.get(config)：通过属性配置动态生成一个类的实例，config中必须包含xtype属性。  
XType.remove(xtype)：将某个xtype从XType类中移除。  

`XCache`：用于管理id和实例对应关系的类。  

XCache.add(id, instance)：将id和实例对应关系保存。  
XCache.get(id)：通过id获取实例，不存在则返回null。  

`XEvent`：用于给控件添加事件的类。  

constructor(target, listener, scope)：给target元素添加一些监听事件，scope为事件中的命名空间。  
enable()：启用所有事件监听。  
disable()：停用所有事件监听。  
add(eventName, callback, scope)：为target添加一个事件。  
remove(eventName, callback)：为target元素移除一个事件。  

`X`：为方便使用创建的帮助类。  

X.create(config)：通过xtype配置动态生成一个实例。  
X.get(id)：通过id获取实例。  

`XObject`：所有控件的基类。  

constructor(config)：通过配置生成类的实例。  
render()：将该控件及其子控件渲染到config.container容器中。  

## 示例

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
