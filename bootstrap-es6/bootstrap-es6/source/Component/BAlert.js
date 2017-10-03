// BAlert

class BAlert extends BObject {

    constructor(config) {
        super(config);

        this.html = this.config.html || 'This is BAlert.';
        this.type = this.config.type || BAlertType.info;
        this.closable = this.config.closable || true;

        this.prefixHtml = `<div class="alert ${this.type} ${this.closable ? 'alert-dismissible' : ''}" role="alert">${this.closable ? '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' : ''}` + this.html;
        this.suffixHtml = '</div>';
    }

    appendChild(obj) {
        throw Error('BAlert: BAlert doesnot support appendChild.');
    }

    removeChild(obj) {
        throw Error('BAlert: BAlert doesnot support removeChild.');
    }

}