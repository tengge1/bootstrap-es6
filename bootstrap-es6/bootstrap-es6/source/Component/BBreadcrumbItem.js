// BBreadcrumbItem.js

class BBreadcrumbItem extends BObject {

    constructor(config) {
        super(config);

        this.text = this.config.text || 'BBreadcrumbItem';
        this.url = this.config.url || null;
        this.prefixHtml = '<li class="breadcrumb-item">';
        if (this.url == null) {
            this.prefixHtml += this.text;
        } else {
            this.prefixHtml += `<a href="${this.url}">${this.text}</a>`;
        }
        this.suffixHtml = '</li>';
    }

    appendChild(item) {
        throw Error('BBreadcrumbItem: BBreadcrumbItem doesnot support appendChild.');
    }

    removeChild(item) {
        throw Error('BBreadcrumbItem: BBreadcrumbItem doesnot support removeChild.');
    }

}