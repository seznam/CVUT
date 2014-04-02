var Pocitej = function () {
	this._a = 10;
	
	this._vx = new Visual();
}

Pocitej.prototype.absolute = function (v) {
	var vysledek = Math.abs(v);
	this._vx._show(vysledek);
	return vysledek;
}
