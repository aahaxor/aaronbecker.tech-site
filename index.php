<!DOCTYPE html>
<html>
<!--By Aaron Becker, March 2017-->
    <head>
        <title>Home of developer Aaron Becker</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" media="screen" href="css/style.css">
        <link rel="stylesheet" type="text/css" media="screen" href="css/pannellum.css">
        <link rel="stylesheet" type="text/css" media="screen" href="css/fyuse.css">
        <link rel="stylesheet" type="text/css" media="screen" href="css/switchery.css">
        <meta name="Description" content="Home of developer Aaron Becker :)"></meta>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta charset="utf-8">
        <!--<meta name="viewport" content="width=device-width, initial-scale=1.0">-->
        <script src="js/proceduralJSON.js"></script>
        <script src="js/helpLib.js"></script>
        <script src="js/keypress.js"></script>
        <script src="js/shine.js"></script>
        <script src="js/offsetanchors.js"></script>
        <script src="js/pannellum.js"></script>
        <script src="js/fyuse.js"></script>
        <script src="js/switchery.js"></script>
        <script src="js/switches.js"></script>
        <script src="js/misc.js"></script>

        <!--Pannellum control styling-->
        <style>
        #workshop360 {
            width: 600px;
            height: 400px;
        }
        #controls {
            position: absolute;
            bottom: 0;
            z-index: 2;
            text-align: center;
            width: 100%;
            padding-bottom: 3px;
        }
        .ctrl {
            padding: 8px 5px;
            width: 30px;
            text-align: center;
            background: rgba(200, 200, 200, 0.8);
            display: inline-block;
            cursor: pointer;
        }
        .ctrl:hover {
            background: rgba(200, 200, 200, 1);
        }
        </style>

        <!--Fyuse control styling-->
        <style>
        </style>
    </head>
    <body>
        <noscript>
            <meta http-equiv="refresh" content="0;url=noscript.html">
        </noscript>
        <div class="gradient" id="grad" style="display:none;">
            <ul class="menu">
                <li class="menuitem"><a class="menulink" href="http://www.aaronbecker.tech">Home</a></li>
                <li class="menuitemnoanim">|</li>
                <li class="menuitem"><a class="menulink" href="#about">About</a></li>
                <li class="menuitemnoanim">|</li>
                <li class="menuitem"><a class="menulink" href="#workshop">My Workshop</a></li>
                <li class="menuitemnoanim">|</li>
                <li class="menuitem"><a class="menulink" href="#projects">Projects</a></li>
                <li class="menuitemnoanim">|</li>
                <li class="menuitem"><a class="menulink" href="#contact">Contact</a></li>
            </ul>
        </div>
        <div id="portrait" style="opacity: 0; display: none;">
            <p class="portraitwarn" style="opacity: inherit; text-align: center;">Sorry, this site works best in landscape mode. <br>Please rotate your device.</p>
        </div>
        <!--Main title-->
        <p class="title" id="title" style="display:none;">aaronbecker.tech</p>
        <p class="intro" id="intro" style="display:none;">Home of developer Aaron Becker</p>
        <br>
        <div class="img" id="imgholder" style="display:none;">
            <img src="img/transdown.png" id="down" width="50" height="50" onclick="console.log('s'); scrolled(); setTimeout(function(){ScrollTo.scrollVerticalToElementById('main', 20);},100);"></img>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><p></p>
        </div>
        <!--Make an element just bigger than the screen to allow the onscroll listener to pick it up.-->
        <div id="scrolldetect" style="height: auto; min-height: 103%; margin: 0px auto; padding: 0px auto;"></div>
        <!--Main div for content-->
        <div class="main" id="main" style="display:none;">
        <br>
        <br>
        <br>
        <hr>
        <div id="about">
            <h6 class="title2">About me!</h6>
            </body>
            <span>My name is Aaron Becker and I am a </span><span id="age"></span><span>-year-old who loves to code. I'm inspired by many things, including good code, interesting web and hardware design projects, and school. I'm currently a freshman at Burlingame High School in California.</span>
            <p>I've been coding and making projects since the age of 5, and I'm excited to present all the projects that I have finished over several years.</p>
        </div>
        <br>
        <br>
        <hr>
        <div id="workshop">
            <h6 class="title2">My Workshop</h6>
            <p>My workshop is a space where I have created many of my projects. I think that the best way to represent a space like this is with a 360-degree view, so feel free to use the arrow keys and buttons onscreen to navigate the image.</p>
            <div id="workshop360">
                <div id="controls">
                    <div class="ctrl" id="pan-up">▲</div>
                    <div class="ctrl" id="pan-down">▼</div>
                    <div class="ctrl" id="pan-left">◀</div>
                    <div class="ctrl" id="pan-right">▶</div>
                    <div class="ctrl" id="zoom-in">+</div>
                    <div class="ctrl" id="zoom-out">−</div>
                    <div class="ctrl" id="fullscreen">⤢</div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <hr>
        <div id="projects">
            <h6 class="title2">My Projects</h6>
            <p>Over the years, I have accumulated many projects. I have cataloged them here in reverse chronological order (newest first).</p><!-- If you would like, select the desired sort algorithm below.</p>
            <br>
            <div>
                <p>Select sort algorithm:</p>
                <select id="projsort" class="sort">
                    <option value="chrono">Chronological (oldest first)</option>
                    <option value="revchrono" selected>Reverse Chronological (newest first)</option>
                    <option value="alpha">Alphabetical (A-Z)</option>
                    <option value="revalpha">Reverse Alphabetical (Z-A)</option>
                    <option value="comp">Complexity (least complex first)</option>
                    <option value="revcomp">Reverse Complexity (most complex first)</option>
                    <option value="aaronsbest">"Aaron's Best"</option>
                </select>
                <br>
                <button onclick="sortProjects()" class="sort" >Sort Projects!</button>
            </div>-->
            <br>
            <div id="mp">
            </div>
        </div>
        <br>
        <br>
        <hr>
        <div id="contact">
            <h6 class="title2">Contact Me</h6>
            <p>If you'd like to contact me, simply fill out the form below.</p>
            <br>
            <div id="cf">
                <form class="contact" action="feedback.php" method="post" accept-charset="UTF-8">
                <label for="tswname">Name</label> <input type="text" name="fullname" style="max-width: 100%;" id="tswname" size="39" /><br />&nbsp;<br />
                <label for="tswemail">Email</label> <input type="email" style="max-width: 100%;" id="tswemail" name="email" size="39" /><br />&nbsp;<br />
                <label for="tswcomments">Comments</label><br />&nbsp;<br />
                <textarea rows="15" cols="45" name="comments" style="max-width: 100%;" id="tswcomments"></textarea>
                <br />&nbsp;<br />
                <div class="g-recaptcha" data-sitekey="6LcAfhkUAAAAAFxkMTZoZen7YeUsIFJ_e2CoIwoW"></div>
                <script type="text/javascript" src="https://www.google.com/recaptcha/api.js?hl=en"></script>
                <noscript>
                <div style="width: 302px; height: 352px;">
                <div style="width: 302px; height: 352px; position: relative;">
                <div style="width: 302px; height: 352px; position: absolute;">
                <iframe src="https://www.google.com/recaptcha/api/fallback?hl=en&amp;k=6LcAfhkUAAAAAFxkMTZoZen7YeUsIFJ_e2CoIwoW"
                frameborder="0" scrolling="no" style="width: 302px; height:352px; border-style: none;" title="Test for Homo Sapiens"></iframe>
                </div>
                <label for="g-recaptcha-response">Please enter the information requested into the box below</label>
                <div style="width: 250px; height: 80px; position: absolute; border-style: none; bottom: 21px; left: 25px; margin: 0px; padding: 0px; right: 25px;">
                <textarea id="g-recaptcha-response" name="g-recaptcha-response" class="g-recaptcha-response"
                style="width: 250px; height: 80px; border: 1px solid #c1c1c1; margin: 0px; padding: 0px; resize: none;" cols="20" rows="5"></textarea>
                </div>
                </div>
                </div>
                </noscript>
                <br />&nbsp;<br />
                <input type="submit" value="Send Feedback" />
                </form>

            </div>
        </div>
        <br>
        <br>
        <hr>
        <ul style="list-style: none; text-align: center;">
            <li style="text-align: center;">&copy; Idea and design by Aaron Becker, <?php echo date("Y"); ?>. All rights reserved. 😃</li>
            <br>
            <li style="text-align: center;">Visitor counter: <?php include(realpath(dirname(__FILE__)."/stats.php")) ?></li>
        </ul>
        <br>
        <br>
        <br>
        <br>
        <br>
        <p style="font-size: xx-small; color: #f2f2f2; text-align: center;" onclick="alert('Secret found!');">Click here!</p>
    </body>
    <script>
    var version = 29;  
    console.typeable("ifoundit","console.log(\"<--- aaronbecker.tech v\"+version+\" ---> %cIf you can see this, type in 'ifoundit' in the console and see what happens :)\",'color:#ffffff; background:#ffffff');","console.log(\"You found it! (More will be added later)\");")
        var ___DEVELOPMENT = (window.location.href.indexOf("aaronbecker.tech")>-1)?false:true;
        console.info("Developer mode is: "+((___DEVELOPMENT)?"enabled":"disabled"));
        setInterval(function(){
            try{
                var chk = (window.location.href.indexOf("aaronbecker.tech")>-1)?false:true;
                if (___DEVELOPMENT != chk) {
                    console.info("Overriding developer mode; URL detected");
                    ___DEVELOPMENT = chk;
                }
            } catch(e) {console.warn("Error overriding developer mode; disabling"); try{___DEVELOPMENT = false}catch(e){window.___DEVELOPMENT = false}}
        },500);
        /*setTimeout(function(){
            if (!___DEVELOPMENT){alert("Please note that this is in development. If there is any problems, I'm working on it :) \n\nIf you'd like to check out the changelog, go to aaronbecker.tech/changelog.txt to see it"); window.scrollTo(0, 0);}
        },500);*/
        console.info("Changelog available at aaronbecker.tech/changelog.txt");
        var required = [[typeof helpLib,"HelpLib"],[typeof shinejs,"ShineJS"],[typeof window.keypress,"WindowKeypress"],[typeof ProceduralJSON,"ProceduralJSON"],[typeof ___offsetanchor,"OffsetAnchors"],[typeof window.pannellum,"Pannellum"],[typeof Switchery,"Switchery"],[typeof fyuse,"Fyuse"],[typeof ViewSwitch,"3dViewSwitch"],[typeof TypeSwitch,"3dTypeSwitch"]];

        //INITIALIZATION ERROR HANDLER - By Aaron Becker
        var errorRedirectTimeout = 100;
        if (___DEVELOPMENT) {errorRedirectTimeout = 1000000;}
        console.log("%cInitialization started\n",'color:#0000ff');
        console.log("%cScript initialization started",'color:#0000ff');
        var errored = false; var e = ""; try { for (var i=0; i<required.length; i++) { //yer boi's built-in error handler
            if (required[i][0] === 'undefined') {
                if (errored == false) {
                    console.log("%cERROR: Failed to load script "+required[i][1]+".",'color:#ff0000');
                    errored = true;
                }
                if (e != "") {
                    e+=", ";
                }
                e+="no"+required[i][1];
            } else {
                console.log("Loaded script "+required[i][1]+" %csuccessfully.",'color:#009933');
            }
        }
        if (errored) {
            setTimeout(function(){
                window.location.href = "error.html?e="+e;
            },errorRedirectTimeout); //change timeout!! -done
            console.log("%cScript initialization finished with %cfailure, %credirecting",'color:#0000ff','color:#ff0000','color:#0000ff');
        } else {
            console.log("%cScript initialization finished %csuccessfully, %cno redirect",'color:#0000ff','color:#009933','color:#0000ff');

            console.log("%cProject initialization started",'color:#0000ff');
            console.log("%cRequesting json script projects.json",'color:#0000ff');
            var ___projects = null;
            loadScript("projects.json",function(response,status) {
                try {
                    if (status != 200) {
                        errored = true;
                        console.log("Requesting JSON script status: %cfailure %c("+status+")",'color:#ff0000','color:#000000');
                        setTimeout(function(){
                            window.location.href = "error.html?e=getJSONScriptFailure";
                        },errorRedirectTimeout);
                    } else {
                        if (response == null && status == 200) {
                            console.log("Requesting JSON script status: %cstatus 200, but returned null %c("+status+"). This may happen a few times before full load.",'color:#ffcc00','color:#000000');
                        } else {
                            console.log("Requesting JSON script status: %csuccess %c("+status+")",'color:#009933','color:#000000');
                            ___projects = JSON.parse(response); //parse the response
                            var keys = Object.keys(___projects.projects);
                            if (typeof keys === 'undefined') {
                                errored = true;
                                console.log("%cFailure %cfetching projects from configuration file",'color:#0000ff','color:#000000');
                                setTimeout(function(){
                                    window.location.href = "error.html?e=fetchProjectFromConfigFailure";
                                },errorRedirectTimeout);
                            } else {
                                console.log("%cRequesting json scripts finished",'color:#0000ff');
                                console.log("%cProject initialization started",'color:#0000ff');
                                for (var i=0; i<keys.length; i++) {
                                    var template = "";
                                    if (typeof ___projects.projects[keys[i]].fill === "undefined") {
                                        //console.log("Project fill blank, defaulting");
                                        template = "default";
                                    } else {
                                        if (typeof ___projects.project_template[___projects.projects[keys[i]].fill] === "undefined") {
                                            errored = true;
                                            console.error("Template requested doesn't exist (requested "+___projects.projects[keys[i]].fill+")");
                                        } else {
                                            template = ___projects.projects[keys[i]].fill;
                                        }
                                    }
                                    if (typeof ___projects.functions === "undefined") {
                                        errored = true;
                                        console.error("Functions in JSON not defined");
                                        setTimeout(function(){
                                            try{
                                                window.location.href = "error.html?e=JSONfunctionsNotDefined";
                                            } catch(e) {
                                                window.location.href = "error.html?e=JSONfunctionsNotDefined";
                                            }
                                        },errorRedirectTimeout);
                                    }
                                    var ret = ProceduralJSON.generate(___projects.project_template[template],___projects.projects[keys[i]],___projects.functions); //THE MAGIC LINE!!!
                                    //console.log("tem: "+template+", temJSON: "+JSON.stringify(___projects.project_template[template])+", proj: "+JSON.stringify(___projects.projects[keys[i]])+", ret: "+JSON.stringify(ret));
                                    if (typeof ret !== 'undefined' && ret != "error") {
                                        var title = ___projects.projects[keys[i]].title || "(no name specified)";
                                        console.log("Loaded project '"+title+"' %csuccessfully%c, template = "+template,'color:#009933','color:#000000');
                                        ID("mp").innerHTML = ID("mp").innerHTML + ret;
                                    } else {
                                        errored = true;
                                        if (typeof ___projects.projects[keys[i]].title != "undefined") {
                                            console.log("Loading project '"+(___projects.projects[keys[i]].title || "(no name specified)")+"' %cfailed",'color:#ff0000');
                                        } else {
                                            console.log("Loading project '"+(keys[i] || "(no name specified)")+"' %cfailed (title property not defined, taken from key)",'color:#ff0000');
                                        }
                                        setTimeout(function(){
                                            try{
                                                var title = ___projects.projects[keys[i-1]].title || "(no name specified)";
                                                window.location.href = "error.html?e=projectLoadingFailure(p: "+title+")";
                                            } catch(e) {
                                                window.location.href = "error.html?e=projectLoadingFailure(p: "+keys[i-1]+")";
                                            }
                                        },errorRedirectTimeout);
                                    }
                                }
                                //sortProjects(); //sort projects into reverse chronological order for better readability
                                var tries = 50;

                                var origtries = tries;
                                var fiximgsinterval = setInterval(function(){
                                    var successful = ProceduralJSON.callback(___projects.log_warnings);
                                    if (successful) {
                                        console.log("Resizing project images was %csuccessful",'color:#009933');
                                        clearInterval(fiximgsinterval);
                                    } else {
                                        console.log("Resizing project images %cfailed, %ctry "+(origtries+1-tries)+"/"+origtries,'color:#ff0000','color:#000000');
                                        tries--;
                                    }
                                    if (tries <= 0) {
                                        console.error("Resizing project images failed after reaching max amount of tries");
                                        //window.location.href = "error.html?e=resizeProjectImagesFailure";
                                        clearInterval(fiximgsinterval);
                                    }
                                },2000);
                            }
                        }
                    }
                } catch(e) {
                    errored = true;
                    console.error("ErrorHandlerCeption (inside JSON) e: "+e);
                    setTimeout(function(){
                        window.location.href = "error.html?e=errorHandlerCeption(error while handling error inside json) -- E: "+e+" -- LN: "+e.lineNumber;
                    },errorRedirectTimeout);
                }
            },false,"application/json");
        }
        }  catch(e) {
            errored = true;
            console.error("ErrorHandlerCeption (outside JSON) e: "+e);
            setTimeout(function(){
                window.location.href = "error.html?e=errorHandlerCeption(error while handling error outside json) -- E: "+e+", -- LN: "+e.lineNumber;
            },errorRedirectTimeout);
        }



        console.log("\n");

        var workshop360 = {};
        if (errored == false) {
            if (___DEVELOPMENT) {ID("main").style.display = "block";}
            console.log("%cInitialization finished",'color:#0000ff');
            var animate;
            ID("controls").style.display = "none";
            ID("main").style.display = "none";
            function anim() {
                ID("controls").style.display = "none";
                ID("main").style.display = "none";
                ID('imgholder').style.display = 'block';
                ID('down').fade("in",1000,"console.log('anim seq 2 done');");
                animate = new animation(); //nice animation function :)
                animate.init(ID("down"),20,35,true,EasingFunctions.easeInOutQuad);
                animate.start();
                window.onscroll = function() {
                    scrolled();
                }
            }
            function scrolled() {
                window.onscroll = function(){}
                animate.stop();
                if (ID("down").style.opacity != 1) {
                    console.info("Fadein animation not finished; listener set for down arrow fadeout");
                    setTimeout(function(){
                        ID('down').fade("out",500,"console.log('anim seq 3 done');");
                    },1100);
                } else {
                    ID('down').fade("out",500,"console.log('anim seq 3 done');");
                }
                ID("grad").fade("in",500);
                ID("main").style.display = "block";
                ID("controls").style.display = "block";
                initworkshop();
            }

            var startint;
            console.info("Welcome to my website! Glad you made it here. Enjoy!");
            if ((window.innerHeight-window.innerWidth) > 100) {
                console.log("start anim disabled, portrait detected");
                startint = setInterval(function(){
                    if ((window.innerHeight-window.innerWidth) < 100) {
                        setTimeout(function(){
                            ID('title').fade("in",2000,"ID('intro').fade(\"in\",2000,\"console.log('anim seq 1 done'); anim();\");");
                        },1000);
                        //console.clear();
                        clearInterval(startint);
                    }
                })
            } else {
                console.log("start anim allowed, landscape detected");
                setTimeout(function(){
                    if (___DEVELOPMENT) {
                        ID("main").style.display = "block";
                    }
                    ID("age").innerHTML = String(new Date().getYear()-new Date("6/27/2003").getYear());
                    ID('title').fade("in",2000,"ID('intro').fade(\"in\",2000,\"console.log('anim seq 1 done'); anim();\");");
                },1000);
                //console.clear();
            }

            var initworkshop = function() {
                workshop360 = pannellum.viewer('workshop360', ﻿{
                    "panorama": "https://www.projects.aaronbecker.tech/projects/360/pano6.jpg", //"panorama": "https://i.imgur.com/zMXUAqA.jp",
                    "autoLoad": true,
                    "showControls": false,
                    "pitch": -24.8,
                    "yaw": -160.5,
                    "hfov": 102
                });
                document.getElementById('pan-up').addEventListener('click', function(e) {
                    workshop360.setPitch(workshop360.getPitch() + 10);
                });
                document.getElementById('pan-down').addEventListener('click', function(e) {
                    workshop360.setPitch(workshop360.getPitch() - 10);
                });
                document.getElementById('pan-left').addEventListener('click', function(e) {
                    workshop360.setYaw(workshop360.getYaw() - 10);
                });
                document.getElementById('pan-right').addEventListener('click', function(e) {
                    workshop360.setYaw(workshop360.getYaw() + 10);
                });
                document.getElementById('zoom-in').addEventListener('click', function(e) {
                    workshop360.setHfov(workshop360.getHfov() - 10);
                });
                document.getElementById('zoom-out').addEventListener('click', function(e) {
                    workshop360.setHfov(workshop360.getHfov() + 10);
                });
                document.getElementById('fullscreen').addEventListener('click', function(e) {
                    workshop360.toggleFullscreen();
                });
                workshop360.loadScene();
                /*workshop360.addEventListener('load',function(e){
                    console.log("Workshop 360 loaded")
                });*/
                initworkshop = function(){};
            }
            var voice = false;
            setTimeout(function(){
                var config = new shinejs.Config({
                    numSteps: 5,
                    opacity: 0.2,
                    opacityPow: 1.2,
                    offset: 0.15,
                    offsetPow: 1.8,
                    blur: 40,
                    blurPow: 1,
                    shadowRGB: new shinejs.Color(100, 100, 100)
                });//set up some configuration options
                var shineA = new shinejs.Shine(document.getElementById('title')); //Init shine on p id shine

                shineA.config = config; //set shine config to the config set above

                window.addEventListener('mousemove', function(event) {//listener to change light orientation
                    shineA.light.position.x = event.clientX;
                    shineA.light.position.y = event.clientY;
                    shineA.draw();
                }, false);
                shineA.light.position.x = 0;
                shineA.light.position.y = 0;
                shineA.draw();

                /*
                EASTER EGG APPROACHING :() !!!!!!!!!!!!!
                Yay!
                If you find this, you are awesome!
                You probably looked through the source code.
                Have fun searching for some more!
                */
                var listener = new window.keypress.Listener();
                listener.sequence_combo("up up down down left right left right b a", function() {
                    voice = true;
                    slowersay("You have enabled voice navigation.");
                }, true);
                setTimeout(function(){ //after 20 seconds stop user from entering keypass
                    listener.unregister_combo("up up down down left right left right b a");
                },20000);
                /*
                EASTER EGG ^
                           |
                More boring text for you to read!!!
                Will you see this, too?
                Smart visitor, or myself.

                Anyway, that's all for now.
                Signing off,
                Aaron Becker
                3-29-17
                8th Grade
                Revisited 8/8/17 about to be a freshman :)
                */
            },1);
        }
        //GLOBAL FUNCTIONS
        function sortProjects() {
            var selected = ID("projsort").value;
            console.log("Sort selected: "+selected);
            //generate new projects list
            var sorted = [];
            switch (selected) {
                case "chrono":
                    var copy = JSON.parse(JSON.stringify(___projects.projects));
                    for (var j=0; j<Object.keys(___projects.projects).length; j++) {
                        var lowest = new Object({key:{date: "12/31/9999"}});
                        for (var i=0; i<Object.keys(copy).length; i++) {
                            //console.log("copy has date: "+copy[Object.keys(copy)[i]].hasOwnProperty('date')+", lowest has date "+lowest[Object.keys(lowest)[0]].hasOwnProperty('date'))
                            if (copy[Object.keys(copy)[i]].hasOwnProperty('date') && lowest[Object.keys(lowest)[0]].hasOwnProperty('date')) {
                                //console.log("Inside date, copy date "+copy[Object.keys(copy)[i]].date+", lowest date "+lowest[Object.keys(lowest)[0]].date)
                                var d1 = new Date(copy[Object.keys(copy)[i]].date);
                                if (d1 != "Invalid Date") {
                                    var d2 = new Date(lowest[Object.keys(lowest)[0]].date);
                                    //console.log("d1"+d1+",d2"+d2)
                                    var td = (d2.getTime() - d1.getTime());
                                    if (td > 0) { //new lowest
                                        lowest = new Object();
                                        lowest[Object.keys(copy)[i]] = copy[Object.keys(copy)[i]];
                                        //console.log("TD: "+td);//+", lowest: "+JSON.stringify(lowest));
                                        delete copy[Object.keys(copy)[i]];
                                    } else if (td == 0) {
                                        if (lowest[Object.keys(lowest)[0]].date != "1/1/0000") {
                                            //console.log("TD: "+td);//+", lowest: "+JSON.stringify(lowest));
                                            sorted.push(lowest);
                                        }
                                        delete copy[Object.keys(copy)[i]];
                                    }
                                } else {
                                    if (typeof copy[Object.keys(copy)[i]].title !== "undefined") {
                                        console.error("Invalid date while sorting, title: "+copy[Object.keys(copy)[i]].title);
                                    }
                                }
                            } else {
                                console.warn("Item to sort missing 'date' property");
                            }
                        }
                        if (lowest[Object.keys(lowest)[0]].date != "1/1/0000") {
                            sorted.push(lowest);
                        }
                    }
                break;
                case "revchrono":
                    var copy = JSON.parse(JSON.stringify(___projects.projects));
                    for (var j=0; j<Object.keys(___projects.projects).length; j++) {
                        var highest = new Object({key:{date: "1/1/0000"}});
                        for (var i=0; i<Object.keys(copy).length; i++) {
                            //console.log("copy has date: "+copy[Object.keys(copy)[i]].hasOwnProperty('date')+", highest has date "+highest[Object.keys(highest)[0]].hasOwnProperty('date'))
                            if (copy[Object.keys(copy)[i]].hasOwnProperty('date') && highest[Object.keys(highest)[0]].hasOwnProperty('date')) {
                                //console.log("Inside date, copy date "+copy[Object.keys(copy)[i]].date+", highest date "+highest[Object.keys(highest)[0]].date)
                                var d1 = new Date(copy[Object.keys(copy)[i]].date);
                                if (d1 != "Invalid Date") {
                                    var d2 = new Date(highest[Object.keys(highest)[0]].date);
                                    //console.log("d1"+d1+",d2"+d2)
                                    var td = (d2.getTime() - d1.getTime());
                                    if (td < 0) { //new highest
                                        highest = new Object();
                                        highest[Object.keys(copy)[i]] = copy[Object.keys(copy)[i]];
                                        //console.log("TD: "+td);//+", highest: "+JSON.stringify(highest));
                                        delete copy[Object.keys(copy)[i]];
                                    } else if (td == 0) {
                                        if (highest[Object.keys(highest)[0]].date != "1/1/0000") {
                                            //console.log("TD: "+td);//+", highest: "+JSON.stringify(highest));
                                            sorted.push(highest);
                                        }
                                        delete copy[Object.keys(copy)[i]];
                                    }
                                } else {
                                    if (typeof copy[Object.keys(copy)[i]].title !== "undefined") {
                                        console.error("Invalid date while sorting, title: "+copy[Object.keys(copy)[i]].title);
                                    }
                                }
                            } else {
                                console.warn("Item to sort missing 'date' property");
                            }
                        }
                        if (highest[Object.keys(highest)[0]].date != "1/1/0000") {
                            sorted.push(highest);
                        }
                    }
                break;
                case "alpha":
                    var copy = JSON.parse(JSON.stringify(___projects.projects));
                    for (var j=0; j<Object.keys(___projects.projects).length; j++) {
                        var highest = new Object({key:{title: "Z"}});
                        for (var i=0; i<Object.keys(copy).length; i++) {
                            if (copy[Object.keys(copy)[i]].hasOwnProperty('title') && highest[Object.keys(highest)[0]].hasOwnProperty('title')) {
                                var a1 = copy[Object.keys(copy)[i]].title.toLowerCase().charCodeAt(0) - 97;
                                var a2 = highest[Object.keys(highest)[0]].title.toLowerCase().charCodeAt(0) - 97;
                                //console.log("a1"+a1+",a2"+a2)
                                var td = a1 - a2;
                                if (td < 0) { //new highest or number
                                    highest = new Object();
                                    highest[Object.keys(copy)[i]] = copy[Object.keys(copy)[i]];
                                    //console.log("TD: "+td);//+", highest: "+JSON.stringify(highest));
                                    delete copy[Object.keys(copy)[i]];
                                } else if (td == 0 || a1 <= -40) {
                                    if (highest[Object.keys(highest)[0]].title != "Z") {
                                        //console.log("TD: "+td);//+", highest: "+JSON.stringify(highest));
                                        sorted.push(highest);
                                    }
                                    delete copy[Object.keys(copy)[i]];
                                }
                            } else {
                                console.warn("Item to sort missing 'title' property");
                            }
                        }
                        if (highest[Object.keys(highest)[0]].title != "Z") {
                            sorted.push(highest);
                        }
                    }
                break;
                case "revalpha":
                    var copy = JSON.parse(JSON.stringify(___projects.projects));
                    for (var j=0; j<Object.keys(___projects.projects).length; j++) {
                        var lowest = new Object({key:{title: "A"}});
                        for (var i=0; i<Object.keys(copy).length; i++) {
                            if (copy[Object.keys(copy)[i]].hasOwnProperty('title') && lowest[Object.keys(lowest)[0]].hasOwnProperty('title')) {
                                var a1 = copy[Object.keys(copy)[i]].title.toLowerCase().charCodeAt(0) - 97;
                                var a2 = lowest[Object.keys(lowest)[0]].title.toLowerCase().charCodeAt(0) - 97;
                                //console.log("a1"+a1+",a2"+a2)
                                var td = -(a1 - a2);
                                if (td < 0) { //new lowest or number
                                    lowest = new Object();
                                    lowest[Object.keys(copy)[i]] = copy[Object.keys(copy)[i]];
                                    //console.log("TD: "+td);//+", lowest: "+JSON.stringify(lowest));
                                    delete copy[Object.keys(copy)[i]];
                                } else if (td == 0 || a1 <= -40) {
                                    if (lowest[Object.keys(lowest)[0]].title != "A") {
                                        //console.log("TD: "+td);//+", lowest: "+JSON.stringify(lowest));
                                        sorted.push(lowest);
                                    }
                                    delete copy[Object.keys(copy)[i]];
                                }
                            } else {
                                console.warn("Item to sort missing 'title' property");
                            }
                        }
                        if (lowest[Object.keys(lowest)[0]].title != "A") {
                            sorted.push(lowest);
                        }
                    }
                break;
                case "comp":
                    var copy = JSON.parse(JSON.stringify(___projects.projects));
                    for (var j=0; j<Object.keys(___projects.projects).length; j++) {
                        var highest = new Object({key:{complexity: "0"}});
                        for (var i=0; i<Object.keys(copy).length; i++) {
                            if (copy[Object.keys(copy)[i]].hasOwnProperty('complexity') && highest[Object.keys(highest)[0]].hasOwnProperty('complexity')) {
                                var c1 = Number(copy[Object.keys(copy)[i]].complexity);
                                var c2 = Number(highest[Object.keys(highest)[0]].complexity);
                                //console.log("c1"+c1+",c2"+c2)
                                var td = c2 - c1;
                                if (td < 0) { //new highest
                                    highest = new Object();
                                    highest[Object.keys(copy)[i]] = copy[Object.keys(copy)[i]];
                                    //console.log("TD: "+td);//+", highest: "+JSON.stringify(highest));
                                    delete copy[Object.keys(copy)[i]];
                                } else if (td == 0 || a1 <= -40) {
                                    if (highest[Object.keys(highest)[0]].complexity != "0") {
                                        //console.log("TD: "+td);//+", highest: "+JSON.stringify(highest));
                                        sorted.push(highest);
                                    }
                                    delete copy[Object.keys(copy)[i]];
                                }
                            } else {
                                console.warn("Item to sort missing 'complexity' property");
                            }
                        }
                        if (highest[Object.keys(highest)[0]].complexity != "0") {
                            sorted.push(highest);
                        }
                    }
                break;
                case "revcomp":
                    var copy = JSON.parse(JSON.stringify(___projects.projects));
                    for (var j=0; j<Object.keys(___projects.projects).length; j++) {
                        var lowest = new Object({key:{complexity: "100"}});
                        for (var i=0; i<Object.keys(copy).length; i++) {
                            if (copy[Object.keys(copy)[i]].hasOwnProperty('complexity') && lowest[Object.keys(lowest)[0]].hasOwnProperty('complexity')) {
                                var c1 = Number(copy[Object.keys(copy)[i]].complexity);
                                var c2 = Number(lowest[Object.keys(lowest)[0]].complexity);
                                //console.log("c1"+c1+",c2"+c2)
                                var td = -(c2 - c1);
                                if (td < 0) { //new lowest
                                    lowest = new Object();
                                    lowest[Object.keys(copy)[i]] = copy[Object.keys(copy)[i]];
                                    //console.log("TD: "+td);//+", lowest: "+JSON.stringify(lowest));
                                    delete copy[Object.keys(copy)[i]];
                                } else if (td == 0 || a1 <= -40) {
                                    if (lowest[Object.keys(lowest)[0]].complexity != "100") {
                                        //console.log("TD: "+td);//+", lowest: "+JSON.stringify(lowest));
                                        sorted.push(lowest);
                                    }
                                    delete copy[Object.keys(copy)[i]];
                                }
                            } else {
                                console.warn("Item to sort missing 'complexity' property");
                            }
                        }
                        if (lowest[Object.keys(lowest)[0]].complexity != "100") {
                            sorted.push(lowest);
                        }
                    }
                break;
                /*case "aaronsbest":
                break;*/
                default:
                console.error("No sort algorithm matching '"+selected+"'' found. Sorting canceled.")
            }
            //console.log("Sorted: "+JSON.stringify(sorted));

            //regen projects from new list using 'insertBefore'
            if (sorted.length != Object.keys(___projects.projects).length) {
                console.warn("Sort length not equal to projects length. Sort length: "+sorted.length+", projects length: "+Object.keys(___projects.projects).length);
            }
            for (var i=sorted.length; i>0; i--) {
                if (typeof sorted[i] !== "undefined") {
                    if (sorted[i][Object.keys(sorted[i])[0]].hasOwnProperty('title')) {
                        var id = sorted[i][Object.keys(sorted[i])[0]].title.replace(/\W/g,'_');
                        console.log("id: "+id+", child0id: "+ID("mp").children[0].id)
                        ID("mp").insertBefore(ID(id), ID("mp").children[0]);
                    } else {
                        console.error("Sorted i: "+i+" is missing title, not sorting");
                    }
                }
            }
        }
    </script>
</html>
