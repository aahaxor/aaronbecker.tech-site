//misc scripts by aaron becker
window.onorientationchange = function() { document.body.scrollTop = 0; }
window.addEventListener("beforeunload",function(){
    window.scrollTo(0,0); 
    try{
        localStorage.setItem("page_y", 0);
        localStorage.setItem("page_x", 0);
    }catch(e){}
    console.log("Captured beforeunload event, scrolled to top and set localStorage");
})

window.addEventListener("load",function(){
    var url = window.location.href;
    console.log("URL: "+url);
    if( url.indexOf('#') < 0 ) {
        window.location.replace(url + "#");
        console.log("Added # to url so page loads at top")
    } else {
        window.location.replace(url);
        console.log("# already present in url")
    }
});

if (helpLib) {
    setInterval(function(){
        if ((window.innerHeight-window.innerWidth) > 100) { //portrait
            if ((document.body.style.opacity > 0.1 || document.body.style.opacity == "") && (ID("portrait").style.opacity < 0.1 || ID("portrait").style.opacity == "")) {
                console.log("portrait-warn: portrait orientation detected")
                var ids = ["grad","title","intro","main"];
                for (var i=0; i<ids.length; i++) {
                    ID(ids[i]).fade("out",1000,function(){});
                }
                setTimeout(function(){
                    ID("portrait").style.display = "block";
                    ID("portrait").fade("in",1000,function(){
                        console.log("portrait-warn: warning is enabled");
                    });
                },1000);
            }
        } else {
            if ((document.body.style.opacity < 0.1 || document.body.style.opacity == "") && ID("portrait").style.opacity > 0.1) {
                ID("portrait").fade("out",1000,function(){
                    ID("portrait").style.display = "none";
                    var ids = ["grad","title","intro"];
                    for (var i=0; i<ids.length; i++) {
                        ID(ids[i]).fade("in",1000,function(){});
                    }
                    console.log("portrait-warn: warning is disabled");
                });
            }
        }
    },1000);
} else {
    console.error("No helpLib, landscape detection disabled")
}


/**
 *
 * Created by Borbás Geri on 12/17/13
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */


var ScrollTo =
{
    /**
     * Helpers.
     */
    documentVerticalScrollPosition: function()
    {
        if (self.pageYOffset) return self.pageYOffset; // Firefox, Chrome, Opera, Safari.
        if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop; // Internet Explorer 6 (standards mode).
        if (document.body.scrollTop) return document.body.scrollTop; // Internet Explorer 6, 7 and 8.
        return 0; // None of the above.
    },

    viewportHeight: function()
    { return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight; },

    documentHeight: function()
    { return (document.height !== undefined) ? document.height : document.body.offsetHeight; },

    documentMaximumScrollPosition: function()
    { return this.documentHeight() - this.viewportHeight(); },

    elementVerticalClientPositionById: function(id)
    {
        var element = document.getElementById(id);
        var rectangle = element.getBoundingClientRect();
        return rectangle.top;
    },

    /**
     * Animation tick.
     */
    scrollVerticalTickToPosition: function(currentPosition, targetPosition)
    {
        var filter = 0.2;
        var fps = 60;
        var difference = parseFloat(targetPosition) - parseFloat(currentPosition);

        // Snap, then stop if arrived.
        var arrived = (Math.abs(difference) <= 0.5);
        if (arrived)
        {
            // Apply target.
            scrollTo(0.0, targetPosition);
            return;
        }

        // Filtered position.
        currentPosition = (parseFloat(currentPosition) * (1.0 - filter)) + (parseFloat(targetPosition) * filter);

        // Apply target.
        scrollTo(0.0, Math.round(currentPosition));

        // Schedule next tick.
        setTimeout("ScrollTo.scrollVerticalTickToPosition("+currentPosition+", "+targetPosition+")", (1000 / fps));
    },

    /**
     * For public use.
     *
     * @param id The id of the element to scroll to.
     * @param padding Top padding to apply above element.
     */
    scrollVerticalToElementById: function(id, padding)
    {
        var element = document.getElementById(id);
        if (element == null)
        {
            console.warn('Cannot find element with id \''+id+'\'.');
            return;
        }

        var targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - padding;
        var currentPosition = this.documentVerticalScrollPosition();

        // Clamp.
        var maximumScrollPosition = this.documentMaximumScrollPosition();
        if (targetPosition > maximumScrollPosition) targetPosition = maximumScrollPosition;

        // Start animation.
        this.scrollVerticalTickToPosition(currentPosition, targetPosition);
    }
};