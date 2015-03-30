var Visual = function () {
	this._message = 'ahoj svete!';
	this._dom = document.createElement('div');
	this._dom.style.height = "50px";
    this._dom.style.backgroundColor = "gray";
    document.body.appendChild(this._dom);
    this._dom.addEventListener('click', this._show.bind(this),true);
}

Visual.prototype._show = function (message) {
	this._dom.innerHTML = message;
}

var v = new Visual();
