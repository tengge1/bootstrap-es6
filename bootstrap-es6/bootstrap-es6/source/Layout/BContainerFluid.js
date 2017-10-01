// BContainerFluid

class BContainerFluid extends BLayout {

    constructor(config) {
        super(config);
        this.prefixHtml = '<div class="container-fluid">';
        this.suffixHtml = '</div>';
    }

}