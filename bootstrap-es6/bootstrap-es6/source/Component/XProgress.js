// XProgress.js

class XProgress extends XObject {

    constructor(config) {
        super(config);
        this.value = this.config.value || 0;
        this.maxValue = this.config.maxValue || 100;
        this.text = this.config.text || null;
        this.cls = this.config.cls || null;
    }

    render() {
        this.el.progress = document.createElement('div');
        this.el.progress.className = 'progress';
        this.container.appendChild(this.el.progress);

        this.el.bar = document.createElement('div');
        this.el.bar.className = 'progress-bar';
        if (this.cls) {
            this.el.bar.className += ' ' + this.cls;
        }
        this.el.bar.setAttribute('role', 'progressbar');
        this.el.bar.style.width = `${this.value / this.maxValue * 100}%`;
        if (this.text) {
            this.el.bar.innerHTML = this.text;
        }
        this.el.progress.appendChild(this.el.bar);
    }

}

XType.add('progress', XProgress);