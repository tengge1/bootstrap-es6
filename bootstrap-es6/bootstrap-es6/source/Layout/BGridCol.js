// BGridCol

class BGridCol extends BObject {

    constructor(config) {
        super(config);
        this.type = this.config.type || BGridColType.md3;
        this.prefixHtml = '<div class="' + this.type + '">';
        this.suffixHtml = '</div>';
    }

    setType(type) {
        this.type = type;
        this.prefixHtml = '<div class="' + this.type + '">';
    }

    getType() {
        return this.type;
    }

}