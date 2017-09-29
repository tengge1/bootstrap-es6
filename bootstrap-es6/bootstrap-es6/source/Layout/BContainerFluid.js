// BContainerFluid

class BContainerFluid extends BLayout {

    constructor(container) {
        super(container);
        this.prefixHtml = '<div class="container-fluid">';
        this.suffixHtml = '</div>';
    }

}