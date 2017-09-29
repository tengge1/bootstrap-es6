// BObject

class BObject {

    constructor(container) {
        if (!container instanceof HTMLElement) {
            throw Error('BObject: Container is not instance of HTMLElement.');
        }
        this.container = container;
        this.parent = this.container;
        this.children = [];
        this.prefixHtml = '';
        this.suffixHtml = '';
    }

    appendChild(obj) {
        if (!obj instanceof BObject) {
            throw Error('BObject: Obj is not instance of BObject.');
        }
        this.children.push(obj);
    }

    removeChild(obj) {
        if (!obj instanceof BObject) {
            throw Error('BObject: Obj is not instance of BObject.');
        }
        for (var i = 0; i < this.children.length; i++) {
            var item = this.children[i];
            if (item == obj) {
                this.children.splice(i, 1);
                i--;
            }
        }
    }

    toHtml() {
        var html = this.prefixHtml;
        this.children.forEach((n, i) => {
            html += n.toHtml();
        });
        html += this.suffixHtml;
        return html;
    }

}