var ProceduralJSON = {
    html: "",
    debugMode: false,
    closetags: [],
    error: false,
    srcs: [],
    callback: function(log) {
        var successful = true;
        if (typeof log === "undefined") {
            log = true;
        }
        var elements = document.getElementsByTagName("img");
        for (var i=0; i<elements.length; i++) {
            for (var j=0; j<ProceduralJSON.srcs.length; j++) {
                if (elements[i].className != "") {
                    var srctocheck;
                    if (ProceduralJSON.srcs[j].contains("http://") || ProceduralJSON.srcs[j].contains("https://")) {
                        srctocheck = ProceduralJSON.srcs[j];
                    } else {
                        srctocheck = (window.location.href.substring(0,window.location.href.lastIndexOf(window.location.pathname))+window.location.pathname.split(".")[0].substring(0,window.location.pathname.split(".")[0].lastIndexOf("/")))+((ProceduralJSON.srcs[j].substring(0,1) == "/") ? ProceduralJSON.srcs[j] : ("/"+ProceduralJSON.srcs[j]));
                    }
                    var badImgSRC = (typeof badImgSrc === "undefined") ? undefined : (window.location.href.substring(0,window.location.href.lastIndexOf(window.location.pathname))+window.location.pathname.split(".")[0].substring(0,window.location.pathname.split(".")[0].lastIndexOf("/")))+((badImgSrc.substring(0,1) == "/")?badImgSrc:"/"+badImgSrc);
                    var loaded = elements[i].imgLoaded();
                    //alert(String(elements[i].src == srctocheck)+", src "+elements[i].src+", tc "+srctocheck+", loaded "+loaded)
                    if (loaded == false && badImgSRC !== undefined) {
                        if (log) {
                            console.warn("Image src "+ProceduralJSON.srcs[j]+" not loaded yet.");
                        }
                        successful = false;
                    }
                    //console.log(badImgSRC+" "+elements[i].src+" "+srctocheck)
                    if ((elements[i].src == srctocheck || elements[i].src === badImgSRC) && loaded) {
                        elements[i].className = "";
                    }
                } else {
                    if(ProceduralJSON.debugMode){console.warn("Elements i: "+i+" has no class name");}
                }
            }
        }
        var onloadel = getAllElementsWithAttribute("procedural_onload");
        for (var i=0; i<onloadel.length; i++) {
            try {
                eval(onloadel[i].getAttribute("procedural_onload").replaceAll("this","onloadel[i]"));
                if (onloadel[i].getAttribute("persistent_onload") != "true") {
                    onloadel[i].removeAttribute("procedural_onload"); //successful, remove
                }
            } catch(e) {
                console.error("Error running procedural onload. E: "+e+", element: "+onloadel[i]+", procedural code: "+onloadel[i].getAttribute("procedural_onload"));
                successful = false;
            }
        }
        return successful;
    },
    generate: function(template,fill,fn){
        //alert("Template: "+JSON.stringify(template)+", fill: "+JSON.stringify(fill));
        ProceduralJSON.html = "";
        ProceduralJSON.closetags = [];
        ProceduralJSON.error = false;
        var keys = Object.keys(template);
        var tpLv = true;
        var opts = ["class","width","height","src","href","id","disabled","style","content","element"];
        for (var i=0; i<opts.length; i++) {
            for (var j=0; j<keys.length; j++) {
                if (opts[i] == keys[j]) {
                    console.error("Top-level elem required to be object");
                    tpLv = false;
                    proceduralJSON.error = true;
                }
            }
        }
        if (tpLv) {
            if (ProceduralJSON.debugMode) {console.log("Elements in template: "+keys.length);}
            for (var i=0; i<keys.length; i++) {
                if (ProceduralJSON.debugMode) {console.log("Evaluating top-level element: "+keys[i]);}
                ProceduralJSON.add(template[keys[i]].element);
                ProceduralJSON.process(template[keys[i]],fill,fn);
            }
        }
        for (var i=0; i<ProceduralJSON.closetags.length; i++) {
            ProceduralJSON.close(ProceduralJSON.closetags[0]);
            ProceduralJSON.closetags.removeIndex(0);
        }
        if (ProceduralJSON.debugMode) {console.log("Done Processing JSON, generated "+((ProceduralJSON.error)?"error":ProceduralJSON.html));}
        if (ProceduralJSON.error) {
            return "error";
        } else {
            return ProceduralJSON.html;
        }
    },
    process: function(obje,fill,fn) {
        var obj = (obje);
        var keys = Object.keys(obj);
        if (ProceduralJSON.debugMode) {console.log("keys "+JSON.stringify(keys));}
        for (var j=0; j<keys.length; j++) {
            if (typeof obj[keys[j]] === 'undefined') {
                console.error("Error generating HTML: obj[key] is undefined");
                ProceduralJSON.error = true;
            } else if (keys[j] == "element") {
                if (ProceduralJSON.debugMode) {console.log("element: "+obj[keys[j]]);}
                ProceduralJSON.add(obj[keys[j]].element);
            } else if (keys[j] == "customtagstart") {
                if (ProceduralJSON.debugMode) {console.log("CUSTOM TAG start: "+obj[keys[j]]);}
                ProceduralJSON.html+="<"+(obj[keys[j]])+">";
            } else if (keys[j] == "customtagend") {
                if (ProceduralJSON.debugMode) {console.log("CUSTOM TAG end: "+obj[keys[j]]);}
                ProceduralJSON.html+="</"+(obj[keys[j]])+">";
            } else if (keys[j] == "customattribute") {
                if (ProceduralJSON.debugMode) {console.log("CUSTOM ATTRIBUTE: "+JSON.stringify(obj[keys[j]]));}
                var ke = Object.keys(obj[keys[j]]);
                for (var i=0; i<ke.length; i++) {
                    var attribname = ke[i];
                    var attribval = obj[keys[j]][ke[i]];
                    if (attribval === undefined || attribname === undefined) {
                        console.error("Error generating HTML: Custom attribute name or value undefined");
                        ProceduralJSON.error = true;
                    } else {
                        if (attribname.substring(0,1) == ".") {
                            var key = attribname.substring(1,attribname.length);
                            if (typeof fill[key] == "undefined") {
                                console.error("Error generating HTML: custom attribute fill property '"+key+"' doesn't exist.");
                                ProceduralJSON.error = true;
                            } else {
                                attribname = fill[key];
                            }
                        }
                        if (attribval.substring(0,1) == ".") {
                            var key = attribval.substring(1,attribval.length);
                            if (typeof fill[key] == "undefined") {
                                console.error("Error generating HTML: custom attribute fill property '"+key+"' doesn't exist.");
                                ProceduralJSON.error = true;
                            } else {
                                attribval = fill[key];
                            }
                        }
                        ProceduralJSON.property(attribname,attribval);
                    }
                }
            } else if (keys[j] == "class") {
                ProceduralJSON.calculateValue("class",obj,keys[j],fill,fn);
            } else if (keys[j] == "id") {
                if (obj[keys[j]].substring(0,1) == ".") { //replace property
                    if (ProceduralJSON.debugMode) {console.log("id replace");}
                    var key = obj[keys[j]].substring(1,obj[keys[j]].length);
                    if (typeof fill[key] == "undefined") {
                        console.error("Error generating HTML: id fill property '"+key+"' doesn't exist.");
                        ProceduralJSON.error = true;
                    } else {
                        var newid = fill[key].replace(/\W/g,'_');
                        ProceduralJSON.property("id",newid);
                    }
                } else {
                    if (ProceduralJSON.debugMode) {console.log("id fixed");}
                    var newid = obj[keys[j]].replace(/\W/g,'_');
                    ProceduralJSON.property("id",newid);
                }
            } else if (keys[j] == "href") {
                ProceduralJSON.calculateValue("href",obj,keys[j],fill,fn);
            } else if (keys[j] == "width") {
                if (ProceduralJSON.debugMode) {console.log("width: "+obj[keys[j]]);}
                ProceduralJSON.property("width",obj[keys[j]]);
            } else if (keys[j] == "persistent_onload") {
                if (ProceduralJSON.debugMode) {console.log("persistent onload: "+obj[keys[j]]);}
                ProceduralJSON.property("persistent_onload",obj[keys[j]]);
            } else if (keys[j] == "type") {
                if (ProceduralJSON.debugMode) {console.log("type: "+obj[keys[j]]);}
                ProceduralJSON.property("type",obj[keys[j]]);
            } else if (keys[j] == "height") {
                if (ProceduralJSON.debugMode) {console.log("height: "+obj[keys[j]]);}
                ProceduralJSON.property("height",obj[keys[j]]);
            } else if (keys[j] == "onload") {
                if (ProceduralJSON.debugMode) {console.log("onload: "+obj[keys[j]]);}
                ProceduralJSON.property("procedural_onload",obj[keys[j]]);
            } else if (keys[j] == "disabled") {
                if (ProceduralJSON.debugMode) {console.log("disabled");}
                ProceduralJSON.property("disabled","");
            } else if (keys[j] == "src") {
                if (ProceduralJSON.debugMode) {console.log("src: "+obj[keys[j]]);}
                if (obj[keys[j]].src.substring(0,1) == ".") { //replace property
                    if (ProceduralJSON.debugMode) {console.log("src replace");}
                    var key = obj[keys[j]].src.substring(1,obj[keys[j]].src.length);
                    if (typeof fill[key] == "undefined") {
                        console.error("Error generating HTML: src fill property '"+key+"' doesn't exist.");
                        ProceduralJSON.error = true;
                    } else {
                        if (obj[keys[j]].async == true) {
                            var downloadingImage = new Image();
                            downloadingImage.onload = function(){
                                ProceduralJSON.property("src",this.src);
                                alert(this.src);
                                var elements = document.getElementsByTagName("img");
                                for (var i=0; i<elements.length; i++) {
                                    if (elements[i].src == this.src) {

                                    }
                                }
                                ID("img").style.background = "none";
                            };
                            downloadingImage.src = fill[key];
                        } else {
                            ProceduralJSON.property("src",fill[key]);
                            ProceduralJSON.srcs[ProceduralJSON.srcs.length] = fill[key];
                        }
                    }
                } else { //fixed
                    if (ProceduralJSON.debugMode) {console.log("src fixed");}
                    ProceduralJSON.property("src",obj[keys[j]]);
                }
            } else if (keys[j] == "style") {
                if (ProceduralJSON.debugMode) {console.log("style: "+obj[keys[j]]);}
                ProceduralJSON.property("style",obj[keys[j]]);
            } else if (keys[j] == "content") {
                if (ProceduralJSON.debugMode) {console.log("key "+keys[j]+", obj w/o key "+JSON.stringify(obj)+", w/key "+JSON.stringify(obj[keys[j]]));}
                if (ProceduralJSON.debugMode) {console.log("CONTENT KEY DETECTED");}
                if (typeof obj[keys[j]] == "string") {
                    if (ProceduralJSON.debugMode) {console.log("str");}
                    ProceduralJSON.calculateValue("content str",obj,keys[j],fill,fn);
                    ProceduralJSON.close(ProceduralJSON.closetags[0]);
                    ProceduralJSON.closetags.removeIndex(0);
                } else if (typeof obj[keys[j]] == 'undefined') {
                    if (ProceduralJSON.debugMode) {console.log("undef");}
                    ProceduralJSON.add(keys[j],"");
                } else if (typeof obj[keys[j]] == 'object') {
                    if (ProceduralJSON.debugMode) {console.log("obj");}
                    var keyss = Object.keys(obj[keys[j]]);
                    if (ProceduralJSON.debugMode) {console.log("Keys in content object: "+JSON.stringify(keyss));}
                    for (var i=0; i<keyss.length; i++) {
                        //if (ProceduralJSON.debugMode) {console.log("")
                        ProceduralJSON.add(obj[keys[j]][keyss[i]].element);
                        ProceduralJSON.process(obj[keys[j]][keyss[i]],fill,fn);
                    }
                } else {
                    console.error("Error generating HTML: content is not object, string, or undefined (Typeof content "+typeof obj[keys[j]]);
                    ProceduralJSON.error = true;
                }
            } else {
                if (ProceduralJSON.debugMode) {console.log("Object identifier is not class, width, height, src, href, id, disabled, style, or content, it is "+keys[j]);}
            }
        }
    },
    add: function(element,content) {
        element = element || "";
        if (ProceduralJSON.htmlElements.contains(element)) {
            if (content == undefined) {
                ProceduralJSON.html+="<"+element+">";
                if (element!== "br") {
                    ProceduralJSON.closetags.unshift(element);
                    if (ProceduralJSON.debugMode) {console.log("pushed "+element);}
                } else {
                    if (ProceduralJSON.debugMode) {console.log("Elem br, no push");}
                }
            } else {
                ProceduralJSON.html+="<"+element+">"+content+"</"+element+">";
            }
        } else {
            if (element != "") {
                console.error("Error generating HTML: Element "+element+" is not a HTML element.");
                ProceduralJSON.error = true;
            }
        }
    },
    close: function(element) {
        if (ProceduralJSON.htmlElements.contains(element)) {
            ProceduralJSON.html+="</"+element+">";
        }
    },
    content: function(content) {
        ProceduralJSON.html+=content;
    },
    property: function(property,value) {
        if (ProceduralJSON.html.substring(ProceduralJSON.html.length-1,ProceduralJSON.html.length) == ">") {
            if (property == "disabled" || value == "") {
                ProceduralJSON.html = ProceduralJSON.html.substring(0,ProceduralJSON.html.length-1)+" "+property+">"
            } else {
                ProceduralJSON.html = ProceduralJSON.html.substring(0,ProceduralJSON.html.length-1)+" "+property+"="+"'"+value+"'"+">";
            }
        }
    },
    tag: function(tag,value) {
        ProceduralJSON.html+="<"+tag+">"+value+"</"+tag+">";
    },
    htmlElements: [
        "a",
        "abbr",
        "address",
        "area",
        "article",
        "aside",
        "audio",
        "b",
        "base",
        "bdi",
        "bdo",
        "blockquote",
        "body",
        "br",
        "button",
        "canvas",
        "caption",
        "cite",
        "code",
        "col",
        "colgroup",
        "data",
        "datalist",
        "dd",
        "del",
        "details",
        "dfn",
        "dialog",
        "div",
        "dl",
        "dt",
        "em",
        "embed",
        "fieldset",
        "figcaption",
        "figure",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hr",
        "html",
        "i",
        "iframe",
        "img",
        "input",
        "ins",
        "kbd",
        "keygen",
        "label",
        "legend",
        "li",
        "link",
        "main",
        "map",
        "mark",
        "math",
        "menu",
        "menuitem",
        "meta",
        "meter",
        "nav",
        "noscript",
        "object",
        "ol",
        "optgroup",
        "option",
        "output",
        "p",
        "param",
        "picture",
        "pre",
        "progress",
        "q",
        "rb",
        "rp",
        "rt",
        "rtc",
        "ruby",
        "s",
        "samp",
        "script",
        "section",
        "select",
        "small",
        "source",
        "span",
        "strong",
        "style",
        "sub",
        "summary",
        "sup",
        "svg",
        "table",
        "tbody",
        "td",
        "template",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "time",
        "title",
        "tr",
        "track",
        "u",
        "ul",
        "var",
        "video",
        "wbr"
    ],
    calculateValue: function(prop,obj,key,fill,fn) {
        //console.log("PROCEDURAL JSON AUTOPROP V1");
        if (obj[key].substring(0,1) == "." && obj[key].substring(0,2) != "..") { //replace property
            if (ProceduralJSON.debugMode) {console.log(prop+" replace");}
            var keyy = obj[key].substring(1,obj[key].length);
            if (typeof fill[keyy] === "undefined") {
                console.error("Error generating HTML: "+prop+" fill property '"+keyy+"' doesn't exist.");
                ProceduralJSON.error = true;
            } else {
                if (prop.contains("content") == false) {
                    ProceduralJSON.property(prop,fill[keyy]);
                } else {
                    ProceduralJSON.content(fill[keyy]);
                }
            }
        } else if (obj[key].substring(0,2) == "..") { //fn replace
            if (ProceduralJSON.debugMode) {console.log(prop+" replace FUNCTION");}
            var keys = obj[key].substring(2,obj[key].length).split(",");
            var func;
            var args = [];
            for (var i=0; i<keys.length; i++) {
                if (i == 0) {
                    func = keys[i];
                    if (ProceduralJSON.debugMode) {console.log("autoreplace function: "+func);}
                } else {
                    args[i-1] = keys[i];
                    if (ProceduralJSON.debugMode) {console.log("autoreplace argument: "+args[i-1]);}
                }
            }
            for (var i=0; i<args.length; i++) {
                if (args[i].substring(0,1) == ".") {
                    if (ProceduralJSON.debugMode) {console.log("autoreplace argument replace: "+args[i]);}
                    var keyyy = args[i].substring(1,args[i].length);
                    if (typeof fill[keyyy] === "undefined") {
                        console.warn("Warning generating HTML: "+prop+" fill property '"+keyyy+"' doesn't exist (autoprop replace prop). Defaulting to name of passed in property.");
                        //don't replace, prop undefined
                    } else {
                        args[i] = fill[keyyy];
                    }
                }
                args[i] = "'"+args[i].trim().replace(/['"]+/g, '')+"'";
            }
            var argsstr = "";
            for (var i=0; i<args.length; i++) {
                argsstr+=args[i]+",";
            }
            argsstr = argsstr.substring(0,argsstr.length-1);
            //console.log("ARGSSTR: "+argsstr+", ARGS: "+JSON.stringify(args))

            if (typeof func == "undefined" || JSON.stringify(args) === JSON.stringify(new Array()) || typeof fn === "undefined" || fn.hasOwnProperty(func) == false) {
                console.error("Error generating HTML: "+prop+" function '"+func+"' doesn't exist, isn't defined, or has bad arguments.");
                ProceduralJSON.error = true;
            } else {
                if (args.length !== fn[func].arguments) {
                    console.error("Error generating HTML: function "+fn[func].exec+" requires "+fn[func].arguments+" arguments, "+args.length+" provided");
                    ProceduralJSON.error = true;
                }
                if (ProceduralJSON.debugMode) {console.log("FUNC: "+func+", ARGS: "+argsstr);}
                var stat = fn[func].function+" "+fn[func].exec+".apply(null,["+argsstr+"]);";
                if (ProceduralJSON.debugMode) {console.log("STAT: "+stat);}
                var ret = eval(stat);
                if (prop.contains("content") == false) {
                    ProceduralJSON.property(prop,ret);
                } else {
                    ProceduralJSON.content(ret);
                }
            }
        } else {
            if (ProceduralJSON.debugMode) {console.log(prop+" fixed");}
            if (prop.contains("content") == false) {
                    ProceduralJSON.property(prop,obj[key]);
                } else {
                    ProceduralJSON.content(obj[key]);
                }
        }
    }
}