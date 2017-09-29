// BContainer

class BContainer extends BLayout {

    constructor(container) {
        super(container);
        this.prefixHtml = '<div class="container">';
        this.suffixHtml = '</div>';
    }

}