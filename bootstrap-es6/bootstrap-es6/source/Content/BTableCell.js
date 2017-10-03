// BTableCell

class BTableCell extends BObject {

    constructor(config) {
        super(config);
        this.prefixHtml = '<td>';
        this.suffixHtml = '</td>';
    }

}