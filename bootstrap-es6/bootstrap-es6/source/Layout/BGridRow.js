// BGridRow

class BGridRow extends BObject {

    constructor(config) {
        super(config);
        this.prefixHtml = '<div class="row">';
        this.suffixHtml = '</div>';
    }

    appendChild(col) {
        if (!col instanceof BGridCol) {
            throw Error('BGridRow: Col is not instance of BGridCol.');
        }
        super.appendChild(col);
    }

    removeChild(col) {
        if (!col instanceof BGridCol) {
            throw Error('BGridRow: Col is not instance of BGridCol.');
        }
        super.removeChild(col);
    }

}