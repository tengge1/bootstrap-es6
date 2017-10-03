// BTable

class BTable extends BObject {

    constructor(config) {
        super(config);

        this.striped = this.config.striped || false;
        this.bordered = this.config.bordered || false;
        this.hover = this.config.hover || false;
        this.condensed = this.config.condensed || false;

        this.prefixHtml = `<table class="table ${this.striped ? 'table-striped' : ''} ${this.bordered ? 'table-bordered' : ''} ${this.hover ? 'table-hover' : ''} ${this.condensed ? 'table-condensed' : ''}"><tbody>`;
        this.suffixHtml = '</tbody></table>';
    }

    appendChild(row) {
        if (!cell instanceof BTableRow) {
            throw Error('BTable: Row is not an instance of BTableRow.');
        }
        super.appendChild(row);
    }

    removeChild(row) {
        if (!cell instanceof BTableRow) {
            throw Error('BTable: Row is not an instance of BTableRow.');
        }
        super.removeChild(row);
    }

}