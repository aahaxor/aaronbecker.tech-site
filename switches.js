//By Aaron Becker, 
function TypeSwitch(thRef) {
    console.log("ts-Init: run on elem title: "+thRef.title);
    console.log("VIEW1: "+thRef.parentNode.getInternalElementById(thRef.title).getAttribute("view1")+", VIEW2: "+thRef.parentNode.getInternalElementById(thRef.title).getAttribute("view2"))
    if (typeof thRef.sw === "undefined") {
        thRef.sw = new Switchery(thRef, {
            size: "small",
            speed: "1s"
        });
    } else {
        console.warn("ts-Init: Switchery on elem already initialized");
    }
    thRef.parentNode.getInternalElementById(thRef.title).style.display = "none";
    setTimeout(function() {
        thRef.onchange();
    }, Math.floor(Math.random() * 1000) + 1);
    thRef.onchange = function() {
        if (thRef.sw.element.getAttribute("disabled") === null && (thRef.parentNode.getInternalElementById(thRef.title).fy.loading === false || thRef.parentNode.getInternalElementById(thRef.title).fy.loaded === true)) {
            var fyuseEl = thRef.parentNode.getInternalElementById(thRef.title);
            var viewSelector = thRef.parentNode.getInternalElementById("viewSelector");
            var viewSelectorSw = viewSelector.getInternalElementById("switch2");
            if (thRef.checked) {
                console.log("ts-SelectorVID: Fyuse (360 view) selected on element title "+thRef.title);
                viewSelector.style.display = "block";
                fyuseEl.style.display = "block";
                if (fyuseEl.fy.initialized === false) {
                    fyuseEl.fy.init(fyuseEl);
                }
                fyuseEl.fy.load(fyuseEl.getAttribute((viewSelectorSw.checked) ? "view2" : "view1"));
                thRef.parentNode.getInternalElementById("thumb_img").style.display = "none";
                thRef.sw.disable();
                viewSelectorSw.sw.disable();
                var loadInterv = setInterval(function() {
                    if (fyuseEl.fy.loaded) {
                        clearInterval(loadInterv);
                        thRef.sw.enable();
                        viewSelectorSw.sw.enable();
                    }
                }, 200);
            } else {
                console.log("ts-SelectorIMG: Image selected on element title "+thRef.title);
                try {
                    fyuseEl.fy.removeImages();
                } catch (e) {}
                viewSelector.style.display = "none";
                var vid = document.createElement("video");
                vid.style.display = "none";
                vid.crossOrigin = "Anonymous";
                document.body.appendChild(vid);
                //thRef.parentNode.getInternalElementById("thumb_img").class += " noload";
                vid.src = thRef.parentNode.getInternalElementById(thRef.title).getAttribute((thRef.parentNode.getInternalElementById("viewSelector").getInternalElementById("switch2").checked) ? "view2" : "view1");
                console.log("ts-SelectorIMG: Loading video...");
                var timeout_dur = 60000;
                var loadingTimeout = setTimeout(function() {
                    thRef.sw.disable();
                    console.error("ts-SelectorIMG: Video failed to load");
                    vid.parentNode.removeChild(vid);
                    var h2 = document.createElement("h2");
                    var h2t = document.createTextNode("Error Loading Photo");
                    h2.appendChild(h2t);
                    thRef.parentNode.insertBefore(h2, thRef.parentNode.getInternalElementById("thumb_img"));
                    thRef.parentNode.getInternalElementById("thumb_img").style.display = "none";
                }, timeout_dur);
                vid.addEventListener("loadeddata", function() {
                    clearTimeout(loadingTimeout);
                    console.log("ts-SelectorIMG: Video load success (elem title " + thRef.title + ")");
                    var canv = thRef.parentNode.getInternalElementById("thumb_img");
                    //thRef.parentNode.getInternalElementById("thumb_img").class = "projImg";
                    canv.style.display = "block";
                    canv.width = vid.videoWidth;
                    canv.height = vid.videoHeight;
                    /*canv.style.width = "50%";
                    canv.style.height = "50%";*/
                    canv.style.margin = "0 auto";
                    canv.style.maxWidth = "100%";
                    //canv.style.margin = "0px";
                    canv.getContext("2d").drawImage(vid, 0, 0, vid.videoWidth, vid.videoHeight);
                    vid.parentNode.removeChild(vid);
                });
            }
        }
    }
}
function ViewSwitch(thRef) {
    console.log("vs-Init on elem title: "+thRef.title);
    if (typeof thRef.sw === "undefined") {
        thRef.sw = new Switchery(thRef, {
            size: "small",
            speed: "1s"
        });
    } else {
        console.warn("vs: Switchery already initialized");
    }
    var first = true;
    setTimeout(function() {
        first = false;
    }, 100);
    thRef.onchange = function() {
        if (thRef.parentNode.parentNode.getInternalElementById("switch").sw.element.getAttribute("disabled") === null && (thRef.parentNode.parentNode.getInternalElementById(thRef.title).fy.loading === false || thRef.parentNode.parentNode.getInternalElementById(thRef.title).fy.loaded === true) && first === false) {
            var fyuseEl = thRef.parentNode.parentNode.getInternalElementById(thRef.title);
            var viewSelector = thRef.parentNode.parentNode.getInternalElementById("viewSelector");
            var viewSelectorSw = viewSelector.getInternalElementById("switch2");
            fyuseEl.fy.removeImages();
            viewSelector.style.display = "block";
            fyuseEl.style.display = "block";
            if (fyuseEl.fy.initialized === false) {
                fyuseEl.fy.init(fyuseEl);
            }
            fyuseEl.fy.load(fyuseEl.getAttribute((viewSelectorSw.checked) ? "view2" : "view1"));
            thRef.parentNode.parentNode.getInternalElementById("switch").sw.disable();
            viewSelectorSw.sw.disable();
            var loadInterv = setInterval(function() {
                if (fyuseEl.fy.loaded) {
                    clearInterval(loadInterv);
                    thRef.parentNode.parentNode.getInternalElementById("switch").sw.enable();
                    viewSelectorSw.sw.enable();
                }
            }, 200);
        }
    }
}