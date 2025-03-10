class M {
    elm;
    _step = 5;
    _tId = null;

    constructor(element) {  // HTML element with initial position stored in dataset
        //
        // 1. standard way
        // document.body.addEventListener('keydown', this._keydown.bind(this));

        //
        // 2. with handleEvent
        document.body.addEventListener('keydown', this);

        //
        // 3. log mouse position
        document.body.addEventListener('mousemove', this, true); // try set useCapture when stopPropagating on circle

        //
        // 4. show confirm before using link's href
        document.body.addEventListener("click", this);

        // 
        // 5. listener for stopping Propagation
        this.elm = element;
        this.elm.addEventListener('mousemove', e => this._stop(e)); // bind only for clearing timeout

        // or we could use bind in addEventListener
        // this.elm.addEventListener('mousemove', this._stop.bind(this));

        // set initial position
        this.elm.style.top = element.dataset.y + 'px';
        this.elm.style.left = element.dataset.x + 'px';
    }

    // handleEvent function look at constructor
    handleEvent(e) {
        if (e.type == "keydown") {
            this._keydown(e);
        }
        if (e.type == "mousemove") {
            this._logPosition(e);
        }
        if (e.type == "click" && e.target.nodeName.toLowerCase() == "a") {
            this._showConfirm(e);
        }
    }

    _keydown(e) {
        switch (e.code) {
            case "ArrowUp":
                this._move('top', -this._step);
                break;
            case "ArrowDown":
                this._move('top', this._step);
                break;
            case "ArrowLeft":
                this._move('left', -this._step);
                break;
            case "ArrowRight":
                this._move('left', this._step);
                break;
        }
    }

    // move circle
    _move(dir, mv) {
        this.elm.style[dir] = (parseInt(this.elm.style[dir]) + mv) + 'px';
    }

    // log mouse position
    _logPosition(e) {
        if (this._tId == null) {
            this._tId = window.setTimeout(() => {
                console.log(("x: " + e.clientX), ("y:" + e.clientY));
                this._tId = null;
            }, 1000);  // other option would be .bind(this)
        }
    }

    // showConfirm for links
    _showConfirm(e) {
        if (!confirm("Opravdu chcete přejít na odkaz:" + e.target.href +" ?")) {
            e.preventDefault(e);
        }
    }

    _stop(e) {
        e.stopPropagation();
        // clear interval if exists to avoid delayed printing of mouseposition
        if (this._tId != null) {
            clearTimeout(this._tId);
            this._tId = null;
        }
    }
}

const circleEl = document.querySelector('div');
const m = new M(circleEl);
