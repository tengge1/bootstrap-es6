// BContainerFluid

class BContainerFluid extends BObject {

    constructor(config) {
        super(config);
        this.prefixHtml = '<div class="container-fluid">';
        this.suffixHtml = '</div>';
    }

}