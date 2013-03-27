var Pocitej = function () {
	this._a = 10;
	
	this._vx = new Visualize();
}

Pocitej.prototype.absolute = function (v) {
	var vysledek = Math.abs(v);
	this._v.zobrazVysledek(vysledek);
	return vysledek;
}
