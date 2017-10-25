// XModal.js

class XModal extends XObject {

    constructor(config) {
        super(config);
        this.id = this.config.id || null;
        this.title = this.config.title || 'title';
        this.children = this.config.children || [];
        this.buttons = this.config.buttons || [];
    }

    render() {
        this.el.modal = document.createElement('div');
        this.el.modal.className = 'modal';
        this.el.modal.tabindex = '-1';
        this.el.modal.role = 'dialog';
        if (this.id) {
            this.el.modal.id = this.id;
        }
        this.container.appendChild(this.el.modal);

        this.el.dialog = document.createElement('div');
        this.el.dialog.className = 'modal-dialog';
        this.el.dialog.role = 'document';
        this.el.modal.appendChild(this.el.dialog);

        this.el.content = document.createElement('div');
        this.el.content.className = 'modal-content';
        this.el.dialog.appendChild(this.el.content);

        this.el.header = document.createElement('div');
        this.el.header.className = 'modal-header';
        this.el.content.appendChild(this.el.header);

        this.el.title = document.createElement('h5');
        this.el.title.className = 'modal-title';
        this.el.title.innerHTML = this.title;
        this.el.header.appendChild(this.el.title);

        this.el.closeBtn = document.createElement('button');
        this.el.closeBtn.type = 'button';
        this.el.closeBtn.className = 'close';
        this.el.closeBtn.setAttribute('data-dismiss', 'modal');
        this.el.header.appendChild(this.el.closeBtn);

        this.el.closeIcon = document.createElement('span');
        this.el.closeIcon.innerHTML = '&times;';
        this.el.closeBtn.appendChild(this.el.closeIcon);

        this.el.body = document.createElement('div');
        this.el.body.className = 'modal-body';
        this.el.content.appendChild(this.el.body);

        this.children.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.body;
            obj.render.call(obj);
        });

        this.el.footer = document.createElement('div');
        this.el.footer.className = 'modal-footer';
        this.el.content.appendChild(this.el.footer);

        this.buttons.forEach((n, i) => {
            var obj = X.create(n);
            obj.container = this.el.footer;
            obj.render.call(obj);
        });
    }

    show() {
        if (this.el.modal) {
            $(this.el.modal).modal('show');
        }
    }

    hide() {
        if (this.el.modal) {
            $(this.el.modal).modal('hide');
        }
    }

}

XType.add('modal', XModal);