var Examples = {
	_current: [],
	
	_show: function(e) {
		var div = e.target.getContainer();
		var cns = div.className.split(" ");
		for (var i=0;i<cns.length;i++) {
			var r = cns[i].match(/example-(.+)/);
			if (!r) { continue; }
			var name = r[1];
			
			if (!(name in this)) {
				if (window.console) { console.warn("No example "+name); }
				continue;
			}
			
			var example = this[name];
			var result = example.show(div);
			if (result) { this._current.push(example); }
		}
	},
	
	_hide: function(e) {
		while (this._current.length) { this._current.shift().hide(); }
	},
	
	init: function() {
		OZ.Event.add(null, "slide-show", this._show.bind(this));
		OZ.Event.add(null, "slide-hide", this._hide.bind(this));
	}
};

Examples.clock = {
	_svg: null,
	_interval: null,
	_texts: [],
	_textIndex: -1,
	_minutes: 0,
	_day: 60*12,
	_ns: "http://www.w3.org/2000/svg",
	_line1: null,
	_line2: null,
	_button: null,
	_container: null,
	_event: null,
	
	show: function(elm) {
		if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) { return false; }
		this._container = elm;
		if (!this._svg) { this._build(); }
		
		this._minutes = 0;
		
		document.body.appendChild(this._svg);
		this._draw();
		this._sync();
		
		return true;
	},

	hide: function(elm) {
		this._stop();
		this._container = null;
		this._svg.parentNode.removeChild(this._svg);
	},
	
	_sync: function() { /* sync size and position? */
		var avail = window.innerHeight;
		
		this._svg.setAttribute("width", avail*0.9);
		this._svg.setAttribute("height", avail*0.9);
		this._svg.style.top = Math.round(avail*0.05) + "px";
	},
	
	_elm: function(name, attrs, parent) {
		var result = document.createElementNS(this._ns, name);
		for (var p in attrs) { result.setAttribute(p, attrs[p]); }
		if (parent) { parent.appendChild(result); }
		return result;
	},
	
	_build: function() {
		this._svg = this._elm("svg", {id:"clock", viewBox:"-15 -15 30 30"});
		this._button = this._elm("circle", {cx:0, cy:-12.5, r:1.5, "class":"off", id:"button"}, this._svg);
		this._elm("circle", {cx:0, cy:0, r:12, id:"background"}, this._svg);

		var defs = this._elm("defs", {}, this._svg);
		var marker = this._elm("marker", {id:"arrow", viewBox:"-2 -2 4 4", refX:0, refY:1.5}, defs)
		var poly = this._elm("polygon", {points:"-1.5,2 0,-1 1.5,2 0,1"}, marker);
	
		for (var i=0;i<12;i++) {
			var label = i+1;
			var angle = ((i+10)%12) / 12 * 2 * Math.PI;
			var radius = 9.55;
			var x = Math.cos(angle) * radius;
			var y = Math.sin(angle) * radius + 1;
			var text = this._elm("text", {x:x, y:y}, this._svg);
			this._texts.push(text);
			text.textContent = label;
		}
		
		this._line1 = this._elm("line", {x1:0, y1:0, y2:-5.5, x2:0, "class":"line", id:"line1", "marker-end": "url(#arrow)"}, this._svg);
		this._line2 = this._elm("line", {x1:0, y1:0, y2:-7.8, x2:0, "class":"line", id:"line2", "marker-end":"url(#arrow)"}, this._svg);

		this._elm("circle", {cx:0, cy:0, r:0.2, fill:"white"}, this._svg);

		this._button.addEventListener("click", this._click.bind(this));
		window.addEventListener("resize", this._resize.bind(this));
	},
	
	_click: function(e) {
		if (this._interval) {
			this._stop();
		} else {
			this._interval = setInterval(this._step.bind(this), 30);
			this._button.setAttribute("class", "on");
		}
	},
	
	_draw: function() {
		var angle1 = this._minutes/this._day*360;
		var angle2 = (this._minutes%60)/60*360;
		
		this._line1.setAttribute("transform", "rotate("+angle1+")");
		this._line2.setAttribute("transform", "rotate("+angle2+")");
		
		var index = (Math.round((this._minutes)/60)+this._texts.length-1) % this._texts.length;
		if (index != this._textIndex) {
			if (this._textIndex != -1) { 
				var old = this._texts[this._textIndex];
				old.setAttribute("class", ""); 
				old.parentNode.appendChild(old); /* ie refuses to redraw => this forces it */
			}
			this._texts[index].setAttribute("class", "active");
			this._textIndex = index;
		}
	},
	
	_step: function() {
		this._minutes = (this._minutes+2)%this._day;
		this._draw();
	},
	
	_stop: function() {
		if (!this._interval) { return; }
		clearInterval(this._interval);
		this._interval = null;
		this._button.setAttribute("class", "off");
	},
	
	_resize: function(e) {
		if (this._container) { this._sync(); }
	}
};
