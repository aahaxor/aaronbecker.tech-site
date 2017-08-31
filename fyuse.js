var fyuse = function(){ //Original basic code from Nicu, heavily modified by me (Aaron Becker). Go check him out at https://github.com/nicu/fyuse
	this.container = "";
	this.containerid = "";
	this.videocontainer = "";
	this.canvascontainer = "";
	this.canvascontext = "";
	this.error = false;
	this.resolution = 0.25;
	this.initialized = false;
	this.currentTime = 0;
	this.loaded = false;
	this.loading = false;
	this.width = "auto";
	this.height = "auto";
	this.scale = "auto";
	this.originalscale = "auto";
	this.ev = "drag";
	this.mouseDown = false;
	this.vidTimeout = 7000;
	var _this = this;
	this.init = function(cont,vidcont,canvascont) {
		try {
			if (typeof cont == "string") {
				var c = ID(cont);
				if (c.isBlank()) {
					console.error("fyuse: id for container is invalid")
				} else {
					_this.container = c;
					_this.containerid = c.id||cont;
				}
			} else if (typeof cont == "object") {
				_this.container = cont;
				if (cont.id.isBlank()) {
					console.warn("fyuse: container id is blank");
					cont.id = "fyuse_container";
					_this.containerid = "fyuse_container";
				}
			} else {
				console.error("fyuse: container is undefined or not string or object");
			}
			if (typeof cont == "string" || typeof cont == "object") {
				if (typeof vidcont == "string") {
					var vc = ID(vidcont);
					if (vc.isBlank()) {
						console.error("fyuse: id for video is invalid")
					} else {
						_this.videocontainer = vc;
					}
				} else if (typeof vidcont == "object"){
					_this.videocontainer = vidcont;
				} else {
					if (_this.container.getInternalElementById("fyuse_video") == null) {
						var video = document.createElement('video');
						video.id = "fyuse_video";
						_this.container.appendChild(video);
						_this.videocontainer = video;
					} else {
						console.warn("fyuse: video is already created")
					}
				}
				if (typeof canvascont == "string") {
					var cc = ID(canvascont);
					if (cc.isBlank()) {
						console.error("fyuse: id for canvas is invalid")
					} else {
						_this.canvascontainer = cc;
						_this.canvascontext = cc.getContext('2d');
					}
				} else if (typeof canvascont == "object"){
					_this.canvascontainer = canvascont;
					_this.canvascontext = canvascont.getContext('2d');
				} else {
					if (_this.container.getInternalElementById("fyuse_canvas") == null) {
						var canvas = document.createElement('canvas');
						canvas.id = "fyuse_canvas";
						_this.container.appendChild(canvas);
						_this.canvascontainer = canvas;
						_this.canvascontext = canvas.getContext('2d');
					} else {
						console.warn("fyuse: canvas is already created");
					}
				}

				if (_this.container.getInternalElementById("fyuse_images") == null) {
					var imgContainer = document.createElement('div');
					imgContainer.id = "fyuse_images";
					_this.imagescontainer = imgContainer;
					_this.container.appendChild(imgContainer);
				} else {
					console.warn("fyuse: images div is already created, deleting");
					_this.container.getInternalElementById("fyuse_images").parentNode.removeChild(_this.container.getInternalElementById("fyuse_images"));
					var imgContainer = document.createElement('div');
					imgContainer.id = "fyuse_images";
					_this.imagescontainer = imgContainer;
					_this.container.appendChild(imgContainer);
				}

				_this.resolution = constrain(_this.resolution,0,1);

				_this.canvascontainer.style.display = "none";
				_this.videocontainer.style.display = "none";
				_this.container.style.position = "relative";
				if (_this.container.getInternalElementById("loading") == null) {
					var title = document.createElement('h2');
					var t = document.createTextNode("Loading: 0%");       // Create a text node
					title.appendChild(t);
					title.id = "loading";
					_this.container.appendChild(title);
				} else {
					console.warn("fyuse: loading title already created");
				}
				_this.initialized = true;
			}
		} catch(e) {
			console.error("fyuse: error initializing (e: "+e+")");
		}
	}
	this.load = function(vidsrc) {
		//console.log(typeof this+" "+typeof _this+" "+JSON.stringify(this)+" "+JSON.stringify(_this))
		if (_this.initialized == true) {
			_this.videocontainer.crossOrigin = "Anonymous";
			_this.videocontainer.src = vidsrc;

			document.querySelector('#'+_this.containerid+' #loading').innerHTML = "Loading video...";

			var loadTimeout = setTimeout(function(){
				document.querySelector('#'+_this.containerid+' #loading').innerHTML = "Error loading video";
				console.error("fyuse: video src bad (src = "+_this.videocontainer.src+")");
			},_this.vidTimeout);

			_this.videocontainer.addEventListener('loadeddata', function() { //loaded event listener
				clearTimeout(loadTimeout);
				_this.loading = true;
				document.querySelector('#'+_this.containerid+' #loading').innerHTML = "Video loaded.";
				_this.canvascontainer.width = _this.videocontainer.videoWidth;
				_this.canvascontainer.height = _this.videocontainer.videoHeight;
				_this.canvascontainer.style.width = _this.videocontainer.videoWidth+"px";
				_this.canvascontainer.style.height = _this.videocontainer.videoHeight+"px";

				if (_this.width == "auto") {
					_this.width = _this.videocontainer.videoWidth;
				}
				if (_this.height == "auto") {
					_this.height = _this.videocontainer.videoHeight;
				}
				if (_this.scale != "auto" && _this.scale.isBlank() == false) {
					_this.width = _this.width*_this.scale;
					_this.height = _this.height*_this.scale;
				}
				_this.originalscale = _this.scale;
				_this.scale = "auto"; //so that scale is not scaled twice

				_this.captureFrame(_this.videocontainer,_this.imagescontainer);

				if (_this.error == false) {
					_this.videocontainer.currentTime += _this.resolution;
				}
			}, false);

			_this.videocontainer.addEventListener('seeked', function() { //seek listener
				if (_this.error == false) {
					_this.captureFrame(_this.videocontainer,_this.imagescontainer);

					var currentTime = _this.videocontainer.currentTime;
					currentTime += _this.resolution;

					if (currentTime <= _this.videocontainer.duration) {
						_this.videocontainer.currentTime = currentTime;
						var percent = Math.round((_this.videocontainer.currentTime/_this.videocontainer.duration)*1000)/10;
						//console.log("fyuse: load percent = "+percent)
						document.querySelector('#'+_this.containerid+' #loading').innerHTML = "Loading: "+percent+"%";
					}
					else {
						_this.loaded = true;
						_this.loading = false;
						_this.finished();
					}
				}
			});
		} else {
			console.error("fyuse: initialize before load");
		}
	}
	this.captureFrame = function(video,dest) {
		if (_this.initialized == true) {
			_this.canvascontext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
			var dataUrl = "";
			try {
				dataUrl = _this.canvascontainer.toDataURL(); //the "magic" line!!!
			} catch(e) {
				console.error("fyuse: tainted canvas");
				document.querySelector('#'+_this.containerid+' #loading').innerHTML = "Error: Tainted canvas (darn you CORS)";
				_this.error = true;
			}
			if (dataUrl != "") {
			
				var img = document.createElement('img');
				img.setAttribute('src', dataUrl);
				img.className = "fyuse";

				img.ondragstart = function() { return false; };

				if (_this.width != "auto" && _this.width.isBlank() == false) {
					img.width = _this.width;
					img.style.width = _this.width+"px";
				}
				if (_this.height != "auto" && _this.height.isBlank() == false) {
					img.height = _this.height;
					img.style.height = _this.height+"px";
				}
				
				dest.appendChild(img);
			} else {
				console.error("fyuse: data-url blank (will happen if canvas is tainted)");
			}
		} else {
			console.error("fyuse: initialize before calling captureFrame");
		}
	}
	this.finished = function() {
		if (_this.initialized == true && _this.loaded == true) {
			if (_this.width.isBlank() == false) {
				_this.imagescontainer.width = _this.width;
				_this.imagescontainer.height = _this.height;
				_this.imagescontainer.style.width = _this.width+"px";
				_this.imagescontainer.style.height = _this.height+"px";
			}
			var imgs = _this.container.getElementsByTagName("img");
			for (var i=0; i<imgs.length; i++) {
				imgs[i].style.position = "relative";
				imgs[i].style.top = 0;
				imgs[i].style.left = 0;
				imgs[i].style.border = "1px solid gray";
				imgs[i].style.transform = "translate3d(0, 0, 0)";
			}
			try{document.querySelector('#'+_this.containerid+' #loading').remove();}catch(e){}

			var frames = document.querySelectorAll('#'+_this.containerid+' img');
			var frameCount = frames.length;
			var frameWidth = _this.width / frameCount;
			console.log("fyuse: init FrameCount: "+frameCount+", init Width: "+_this.width+", init FrameWidth: "+frameWidth);

			document.querySelector('#'+_this.containerid+' img').classList.add('visible');

			_this.imagescontainer.addEventListener('mousedown', (evt) => {
				_this.mouseDown = true;
				if (_this.ev == "drag") {
					_this.imagescontainer.className = "fyuse-grabbing";
				}
			}, false);

			_this.imagescontainer.addEventListener('mouseup', (evt) => {
				_this.mouseDown = false;
				if (_this.ev == "drag") {
					_this.imagescontainer.className = "fyuse-grab";
				}
			}, false);

			_this.imagescontainer.addEventListener('mouseleave', (evt) => {
				if (_this.ev == "drag") {
					_this.imagescontainer.className = "";
					_this.mouseDown = false;
				}
			}, false);

			_this.imagescontainer.addEventListener('mouseenter', (evt) => {
				if (_this.ev == "drag") {
					if (_this.mouseDown) {
						_this.imagescontainer.className = "fyuse-grabbing";
					} else {
						_this.imagescontainer.className = "fyuse-grab";
					}
				}
			}, false);

			_this.imagescontainer.addEventListener('mousemove', (evt) => {
				if (_this.ev == "move") {
					if (_this.imagescontainer.className == "fyuse-grab" || _this.imagescontainer.className == "fyuse-grabbing") { _this.imagescontainer.className = "";}
					var prev = document.querySelector('#'+_this.containerid+' .visible');
					var frameIndex = Math.round((evt.clientX - _this.container.offsetLeft) / frameWidth);

					if ((frames[frameIndex] !== prev) && frames[frameIndex]) {
					  prev && prev.classList.remove('visible');
					  frames[frameIndex] && frames[frameIndex].classList.add('visible');
					}
				} else if (_this.ev == "drag") {
					if (_this.mouseDown) {
						var prev = document.querySelector('#'+_this.containerid+' .visible');
						var frameIndex = Math.round((evt.clientX - _this.container.offsetLeft) / frameWidth);
						//console.log("ClientX: "+evt.clientX+", frameIndex: "+frameIndex+", offset: "+_this.container.offsetLeft)

						if ((frames[frameIndex] !== prev) && frames[frameIndex]) {
						  prev && prev.classList.remove('visible');
						  frames[frameIndex] && frames[frameIndex].classList.add('visible');
						}
					}
				}
			}, false);
		} else {
			console.error("fyuse: can't finish until loaded and initialized")
		}
	}
	this.removeImages = function() {
		_this.container.removeChild(_this.container.getInternalElementById("fyuse_images"));
		_this.loaded = false;
		_this.initialized = false;
	}
}