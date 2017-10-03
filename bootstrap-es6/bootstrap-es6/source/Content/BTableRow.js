// BTableRow

class BTableRow extends BObject {

    constructor(config) {
        super(config);

        this.prefixHtml = `<tr>`;
        this.suffixHtml = '</tr>';
    }

    appendChild(cell) {
        if (!cell instanceof BTableCell) {
            throw Error('BTableRow: Cell is not an instance of BTableCell.');
        }
        super.appendChild(cell);
    }

    removeChild(cell) {
        if (!cell instanceof BTableCell) {
            throw Error('BTableRow: Cell is not an instance of BTableCell.');
        }
        super.removeChild(cell);
    }

}