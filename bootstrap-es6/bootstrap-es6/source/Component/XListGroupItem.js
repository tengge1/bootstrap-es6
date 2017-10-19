// XListGroupItem.js

class XListGroupItem extends XObject {

    constructor(config) {
        super(config);
        this.html = this.config.html || 'html';

        this.el = {};
    }

    render() {
        this.el.item = document.createElement('li');
        this.el.item.className = 'list-group-item';
        this.el.item.innerHTML = this.html;
        this.container.appendChild(this.el.item);
    }

}

XType.add('listgroupitem', XListGroupItem);