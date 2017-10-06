// BButton

class BButton extends BObject {

    constructor(config) {
        super(config);

        this.text = this.config.text || 'BButton';
        this.type = this.config.type || BButtonType.primary;
        this.prefixHtml = `<button type="button" class="btn ${this.type}">` + this.text;
        this.suffixHtml = '</button>';
    }

}