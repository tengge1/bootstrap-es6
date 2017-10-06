// BBreadcrumb

class BBreadcrumb extends BObject {

    constructor(config) {
        super(config);

        this.prefixHtml = '<ol class="breadcrumb">';
        this.suffixHtml = '</ol>';
    }

    appendChild(item) {
        if (!item instanceof BBreadcrumbItem) {
            throw Error('BBreadcrumb: item is not an instance of BBreadcrumbItem.');
        }
        super.appendChild(item);
    }

    removeChild(item) {
        if (!item instanceof BBreadcrumbItem) {
            throw Error('BBreadcrumb: item is not an instance of BBreadcrumbItem.');
        }
        super.removeChild(item);
    }
}