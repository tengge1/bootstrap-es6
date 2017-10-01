// BContainer

class BContainer extends BLayout {

    constructor(config) {
        super(config);
        this.prefixHtml = '<div class="container">';
        this.suffixHtml = '</div>';
    }

}