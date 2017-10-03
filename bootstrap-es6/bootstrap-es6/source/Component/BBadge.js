// BBadge

class BBadge extends BObject {

    constructor(config) {
        super(config);

        this.html = this.config.html || 'This is BBadge.';
        this.type = this.config.type || BBadgeType.default;

        this.prefixHtml = `<span class="label ${this.type}">` + this.html;
        this.suffixHtml = '</span>';
    }

}