var Visual = function () {
	this._message = 'ahoj svete!';
	this._dom = document.createElement('div');
	this._dom.classList.add("infoBox");
    document.body.appendChild(this._dom);
    this._dom.addEventListener('click', this._show.bind(this),true);
}

Visual.prototype._show = function (message) {
	console.log(this);
	this._dom.innerHTML = message;
}

