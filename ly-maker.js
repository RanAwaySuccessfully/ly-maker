"use strict";
document.getElementById("themeSelector").onchange = function() {themeChange();};
(function () {
    document.getElementById("currentModeText").innerHTML = "in <u>Generating Mode</u>";
})();
function themeChange() {
    var num = document.getElementById("themeSelector").value;
    document.getElementsByTagName("body")[0].className = "theme" + num;
}
function resetInputs() {
    if (!confirm("This action will reset the values in all input fields except for the Layout Header and Footer.")) {
        document.getElementById("resetButton").disabled = 'disabled';
        setTimeout(clearData, 10);
    }
}
function clearData() {
    document.getElementById("ly-makerPreview").innerHTML = "<h2>Layout Preview</h2>" + 
    "<div style=\"padding: 1px 4px;\"><div class=\"quote\"><span class=\"boxhead\">Originally posted by Sample quote</span>" + 
    "<div class=\"box\"><div class=\"quote\"><span class=\"boxhead\">Originally posted by Sample nested quote</span><div class=\"box\"><div class=\"spoiler\">" + 
    "<div class=\"spoilerInner\">Sample spoiler</div></div><br>Sample text</div></div><br><a href=\"#\">Sample link</a><br>Sample quote</div></div><br><div class=\"code\">" + 
    "<span class=\"boxhead\">Code</span><pre class=\"box\">Sample code</pre></div><br><a href=\"#\">Sample link</a><br>Sample post with <b>bold</b> and <i>italics</i>.</div>";
    document.getElementById("errors").innerHTML = "";
    document.getElementById("warnings").innerHTML = "";
    document.getElementById("errors").style.display = "none";
    document.getElementById("warnings").style.display = "none";
    //document.getElementById("resetButton").disabled = "";
}
function switchMode() {
    if (document.getElementById("ly-makerHeader").readOnly === true) {
        document.getElementById("ly-makerHeader").readOnly = false;
        document.getElementById("ly-makerFooter").readOnly = false;
        document.getElementById("generateButton").style.display = "none";
        document.getElementById("previewButton").style.display = "";
        document.getElementById("currentModeText").innerHTML = "in <u>Editing Mode</u>";
    } else if (document.getElementById("ly-makerHeader").readOnly === false) {
        alert("You're now in Generating Mode, clicking the preview button at this time will remove the content in the Layout Header and Footer boxes.");
        document.getElementById("ly-makerHeader").readOnly = true;
        document.getElementById("ly-makerFooter").readOnly = true;
        document.getElementById("generateButton").style.display = "";
        document.getElementById("previewButton").style.display = "none";
        document.getElementById("currentModeText").innerHTML = "in <u>Generating Mode</u>";
    }
}
function previewLayout() {
    clearData();
    var layoutheader = document.getElementById("ly-makerHeader").value;
    var layoutfooter = document.getElementById("ly-makerFooter").value;
    layoutheader = layoutheader.replace(/<(iframe|script|meta)>(.*)<\/\1>/ig, "");
    layoutfooter = layoutfooter.replace(/<(iframe|script|meta)>(.*)<\/\1>/ig, "");
    var layouttester = layoutheader + layoutfooter;
    var ly1 = layouttester.match(/<(div|style)/ig);
    var ly2 = layouttester.match(/<\/(div|style)/ig);
    if (!ly1) {ly1 = 0;} else {ly1 = ly1.length;}
    if (!ly2) {ly2 = 0;} else {ly2 = ly2.length;}
    if (ly1 > ly2) {warningSystem("There's " + (ly1 - ly2) + " more opening tag(s) (ex. &lt;div&gt;) than closing tag(s) (ex. &lt;/div&gt;).");}
    if (ly1 < ly2) {warningSystem("There's " + Math.abs(ly1 - ly2) + " more closing tag(s) (ex. &lt;/div&gt;) than opening tag(s) (ex. &lt;div&gt;).");}
    document.getElementById("ly-makerPreview").innerHTML = "<h2>Layout Preview</h2>" + layoutheader + 
    "<div class=\"quote\"><span class=\"boxhead\">Originally posted by Sample quote</span>" + 
    "<div class=\"box\"><div class=\"quote\"><span class=\"boxhead\">Originally posted by Sample nested quote</span><div class=\"box\"><div class=\"spoiler\">" + 
    "<div class=\"spoilerInner\">Sample spoiler</div></div><br>Sample text</div></div><br><a href=\"#\">Sample link</a><br>Sample quote</div></div><br><div class=\"code\">" + 
    "<span class=\"boxhead\">Code</span><pre class=\"box\">Sample code</pre></div><br><a href=\"#\">Sample link</a><br>Sample post with <b>bold</b> and <i>italics</i>." + layoutfooter;
}
function makeLayout() {
//  Step 0 - Clearing previous data:
    clearData();
    document.getElementById("ly-makerHeader").value = "";
    document.getElementById("ly-makerFooter").value = "";
    document.getElementById("externalCSSanchor").innerHTML = "";
//  Step 1 - The Madness Begins:
    var bgColor = document.getElementById("bgColor").value
, bgImg = document.getElementById("bgImg").value
, bgPos1 = document.getElementById("bgPos1").value
, bgPos2 = document.getElementById("bgPos2").value
, bgRepeat = document.getElementById("bgRepeat").value
, bg2Img = document.getElementById("bg2Img").value
, bg2Pos1 = document.getElementById("bg2Pos1").value
, bg2Pos2 = document.getElementById("bg2Pos2").value
, bg2Repeat = document.getElementById("bg2Repeat").value
, postAvatarHeight = document.getElementById("postAvatarHeight").value
, postbgColor = document.getElementById("postbgColor").value
, postbgAlpha = document.getElementById("postbgAlpha").value
, postborderType = document.getElementById("postborderType").value
, postborderWidth = document.getElementById("postborderWidth").value
, postborderRadius = document.getElementById("postborderRadius").value
, postborderColor = document.getElementById("postborderColor").value
, postboxMargin = document.getElementById("postboxMargin").value
, postboxPadding = document.getElementById("postboxPadding").value
, postboxText = document.getElementById("postboxText").value
, postboxLink = document.getElementById("postboxLink").value
, postboxFont = document.getElementById("postboxFont").value
, postCustomFontURL = document.getElementById("postCustomFontURL").value
, postCustomFontType = document.getElementById("postCustomFontType").value
, textboxShadow1 = document.getElementById("textboxShadow1").value
, textboxShadow2 = document.getElementById("textboxShadow2").value
, textboxShadow3 = document.getElementById("textboxShadow3").value
, textboxShadow = document.getElementById("textboxShadow").value
, sigbox = document.getElementById("sigbox").value
, sideimgUrl = document.getElementById("sideimgUrl").value
, sideimgWidth = document.getElementById("sideimgWidth").value
, sideimgPos = document.getElementById("sideimgPos").value
, quoteboxColor = document.getElementById("quoteboxColor").value
, codeboxColor = document.getElementById("codeboxColor").value
, quoteboxAlpha = document.getElementById("quoteboxAlpha").value
, quoteborderType = document.getElementById("quoteborderType").value
, quoteborderWidth = document.getElementById("quoteborderWidth").value
, quoteborderRadius = document.getElementById("quoteborderRadius").value
, quoteborderColor = document.getElementById("quoteborderColor").value
, codeborderColor = document.getElementById("codeborderColor").value
, quoteboxPadding = document.getElementById("quoteboxPadding").value
, postboxShadow1 = document.getElementById("postboxShadow1").value
, postboxShadow2 = document.getElementById("postboxShadow2").value
, postboxShadow3 = document.getElementById("postboxShadow3").value
, boxshadowColor = document.getElementById("boxshadowColor").value
, boxshadowAlpha = document.getElementById("boxshadowAlpha").value
, spoilerboxColor = document.getElementById("spoilerboxColor").value
, spoilerboxAlpha = document.getElementById("spoilerboxAlpha").value
, spoilerborderType = document.getElementById("spoilerborderType").value
, spoilerborderWidth = document.getElementById("spoilerborderWidth").value
, spoilerborderRadius = document.getElementById("spoilerborderRadius").value
, spoilerborderColor = document.getElementById("spoilerborderColor").value
, layoutname = document.getElementById("layoutname").value
, ignoreErrors = document.getElementById("ignoreErrors").checked
, generateInline = document.getElementById("generateInline").checked
, exportCSSfile = document.getElementById("exportCSSfile").checked;
    if (!ignoreErrors) {
        try {
            if (postboxMargin > 75||postboxMargin < 0||isNaN(postboxMargin)) throw "Invalid post box margin value.";
            if (postboxPadding > 40||postboxPadding < 0||isNaN(postboxPadding)) throw "Invalid post box padding value.";
            if (quoteboxPadding > 30||quoteboxPadding < 0||isNaN(quoteboxPadding)) throw "Invalid quote box padding value.";
            if (postborderRadius > 50||postborderRadius < 0||isNaN(postborderRadius)) throw "Invalid post border radius value.";
            if (quoteborderRadius > 50||quoteborderRadius < 0||isNaN(quoteborderRadius)) throw "Invalid quote border radius value.";
            if (sideimgWidth > 400||sideimgWidth < 0||isNaN(sideimgWidth)) throw "Invalid side image width value.";
            if (postborderWidth > 15||postborderWidth < 0||isNaN(postborderWidth)) throw "Invalid post border width value.";
            if (quoteborderWidth > 15||quoteborderWidth < 0||isNaN(quoteborderWidth)) throw "Invalid quote border width value.";
            if (spoilerborderWidth > 15||spoilerborderWidth < 0||isNaN(spoilerborderWidth)) throw "Invalid spoiler border width value.";
            if (Math.abs(textboxShadow1) > 15||Math.abs(textboxShadow2) > 15) throw "Invalid text shadow offset value.";
            if (textboxShadow3 > 40||textboxShadow3 < 0||isNaN(textboxShadow3)) throw "Invalid text shadow blur value.";
            if (Math.abs(postboxShadow1) > 15||Math.abs(postboxShadow2) > 15) throw "Invalid box shadow offset value.";
            if (postboxShadow3 > 40||postboxShadow3 < 0||isNaN(postboxShadow3)) throw "Invalid box shadow blur value.";
            if (postAvatarHeight < 0||postAvatarHeight > 150||isNaN(postAvatarHeight)) throw "Invalid avatar height value.";
        }
        catch(error) {document.getElementById("errors").innerHTML = "<strong>Input Error:</strong> " + error; document.getElementById("errors").style.display = ""; return;}
        if (postboxMargin > 50) {warningSystem("The post box margin has a very high value. Make sure there's enough space for the post itself.");}
        if (postboxPadding > 20) {warningSystem("The post box padding has a very high value. Make sure there's not much unnecessary empty space between the post box border and the text.");}
        if (quoteboxPadding > 15) {warningSystem("The quote/code box padding has a very high value. Make sure there's not any unnecessary empty space between the post box border and the text.");}
        if (sideimgWidth > 200) {warningSystem("The side image's width has a very high value. It's recommended to use values near or below 200px.");}
        if (postborderWidth > 7) {warningSystem("The post box border has a very high value. Make sure it doesn't occupy too much unnecessary space.");}
        if (quoteborderWidth > 7) {warningSystem("The quote/code box border has a very high value. Make sure it doesn't occupy too much unnecessary space.");}
        if (Math.abs(textboxShadow1) > 5||Math.abs(textboxShadow2) > 5) {warningSystem("The text shadow has a very high offset value. Make sure it doesn't obstruct or interfere with the nearby text.");}
        if (textboxShadow3 > 20) {warningSystem("The text shadow has a very high blur value. The text shadow opacity reduces signficantly with more blur, try using lower values.");}
        var url1 = bgImg.match(/(^[A-Z]:\\)|(^file:\/\/)/);
        var url2 = bg2Img.match(/(^[A-Z]:\\)|(^file:\/\/)/);
        var url3 = sideimgUrl.match(/(^[A-Z]:\\)|(^file:\/\/)/);
        if (url1||url2||url3) {warningSystem("You can't link to images on your computer. Well, you <em>can</em> but no one will be able to see it. You can upload images to the File Bin instead.");}
    }
//  Step 2 - Let's Organize These Colors:
    if (!postbgAlpha) {postbgAlpha = 100;}
    if (!quoteboxAlpha) {quoteboxAlpha = "0";} //lol fix, 0 is treated as false and will not pass the if (alpha) check while "0" will.
    bgColor = colorParser(bgColor, false, ignoreErrors);
    postbgColor = colorParser(postbgColor, postbgAlpha, ignoreErrors);
    postborderColor = colorParser(postborderColor, false, ignoreErrors);
    postboxText = colorParser(postboxText, false, ignoreErrors);
    postboxLink = colorParser(postboxLink, false, ignoreErrors);
    textboxShadow = colorParser(textboxShadow, false, ignoreErrors);
    quoteboxColor = colorParser(quoteboxColor, quoteboxAlpha, ignoreErrors);
    codeboxColor = colorParser(codeboxColor, quoteboxAlpha, ignoreErrors);
    quoteborderColor = colorParser(quoteborderColor, false, ignoreErrors);
    codeborderColor = colorParser(codeborderColor, false, ignoreErrors);
    boxshadowColor = colorParser(boxshadowColor, boxshadowAlpha, ignoreErrors);
    spoilerboxColor = colorParser(spoilerboxColor, spoilerboxAlpha, ignoreErrors);
    spoilerborderColor = colorParser(spoilerborderColor, false, ignoreErrors);
    if (postbgAlpha > 66) {colorContrast(postbgColor, postboxText);}
//  Step 3 - Le Backgrounds:
    var arrayBg = [];
    if (bgImg) {bgImg = "url(" + bgImg +  ") " + bgPos1 + " " + bgPos2 + " " + bgRepeat; arrayBg.unshift(bgImg);}
    if (bg2Img) {bg2Img = "url(" + bg2Img +  ") " + bg2Pos1 + " " + bg2Pos2 + " " + bg2Repeat; arrayBg.unshift(bg2Img);}
    if (sideimgUrl) {sideimgUrl = "url(" + sideimgUrl +  ") " + sideimgPos + " right no-repeat"; arrayBg.unshift(sideimgUrl);}
    if (arrayBg[0]) {bgColor += " " + arrayBg.pop();}
    arrayBg.push(bgColor);
    var defactoBg = "background: " + arrayBg.join(", ") + "; ";
//  Step 4 - The Name of The Game:
    if (!layoutname || layoutname.search(/\d/i) == 0 || layoutname.toString().search(/[^A-Z,0-9]/i) != -1) {layoutname = "ly" + Math.floor(Math.random() * 1000000)}
//  Step 5 - Shadow the non-hedgehog:
    var exceedspost;
    if (Math.abs(postboxShadow1) > Number(postboxMargin)) {exceedspost = true; if (postboxShadow1 < 0) {postboxShadow1 = postboxMargin * -1;} else {postboxShadow1 = postboxMargin;}}
    if (Math.abs(postboxShadow2) > Number(postboxMargin)) {exceedspost = true; if (postboxShadow2 < 0) {postboxShadow2 = postboxMargin * -1;} else {postboxShadow2 = postboxMargin;}}
    if (Number(postboxShadow3) > Number(postboxMargin) - 3) {exceedspost = true; postboxShadow3 = postboxMargin - 3;}
    if (exceedspost) {warningSystem("The post box's shadow went outside the layout itself, therefore its value was reduced to fit inside the layout.");}
//  Step 6 - Y'all got any more of them pixels:
    postAvatarHeight = Number(postAvatarHeight) + 100 + "px";
    if (!postboxMargin) {postboxMargin = "0";} else {postboxMargin += "px";}
    if (!postboxPadding) {postboxPadding = "0";} else {postboxPadding += "px";}
    if (!postborderWidth) {postborderWidth = "0";} else {postborderWidth += "px";}
    if (!textboxShadow1) {textboxShadow1 = "0 ";} else {textboxShadow1 += "px ";}
    if (!textboxShadow2) {textboxShadow2 = "0 ";} else {textboxShadow2 += "px ";}
    if (!textboxShadow3) {textboxShadow3 = "0 ";} else {textboxShadow3 += "px ";}
    if (!postboxShadow1) {postboxShadow1 = "0 ";} else {postboxShadow1 += "px ";}
    if (!postboxShadow2) {postboxShadow2 = "0 ";} else {postboxShadow2 += "px ";}
    if (!postboxShadow3) {postboxShadow3 = "0 ";} else {postboxShadow3 += "px ";}
    if (!quoteborderWidth) {quoteborderWidth = "0";} else {quoteborderWidth += "px";}
    if (!quoteboxPadding) {quoteboxPadding = "0";} else {quoteboxPadding += "px";}
    if (!spoilerborderWidth) {quoteborderWidth = "0";} else {spoilerborderWidth += "px";}
//  Step 7 - If it doesn't exist, don't include it:
    if (postborderRadius) {postborderRadius = "border-radius: " + postborderRadius + "px; ";}
    if (sideimgWidth) {sideimgWidth = " margin-right: " + sideimgWidth + "px;"}
    if (quoteboxColor) {quoteboxColor = "background: " + quoteboxColor + "; "}
    if (codeboxColor) {codeboxColor = "background: " + codeboxColor + "; "}
    if (quoteborderRadius) {quoteborderRadius = "border-radius: " + quoteborderRadius + "px; ";}
    if (spoilerborderRadius) {spoilerborderRadius = "border-radius: " + spoilerborderRadius + "px; ";}
    if (postCustomFontURL) {
        postboxFont = "'" + postCustomFontURL + "', " + postCustomFontType;
        postCustomFontURL = "@import url('https://fonts.googleapis.com/css?family=" + postCustomFontURL.replace(" ","+") + "');\n";
    }
//  Step 8 - Dat Sig Yo:
    if (sigbox == 0) {var layoutfooter = "</div><div class=\"" + layoutname + "_post\" style=\"margin-top: " + postboxMargin + ";\">SIGNATURE TEXT HERE.</div></div>";}
    if (sigbox == 1) {var layoutfooter = "<br>--------------------<br>SIGNATURE TEXT HERE.</div></div>";}
    if (sigbox == 2) {var layoutfooter = "<br><hr>SIGNATURE TEXT HERE.</div></div>";}
    if (sigbox == 3) {var layoutfooter = "</div></div>";}
//  Step 9 - Merging Everything:
    var layoutheader = "<style>\n" + postCustomFontURL + "." + layoutname + "_bg {" + defactoBg + "padding: " + 
    postboxMargin + "; font-family: " + postboxFont + "; min-height: " + postAvatarHeight + ";}\n" + "." + layoutname + "_post {background: " + postbgColor + 
    "; border: " + postborderWidth + " " + postborderType + " " + postborderColor + "; " + postborderRadius + 
    "padding: " + postboxPadding + "; color: " + postboxText + "; text-shadow: " + textboxShadow1 + textboxShadow2 + 
    textboxShadow3 + textboxShadow + "; box-shadow: " + postboxShadow1 + postboxShadow2 + 
    postboxShadow3 + boxshadowColor + ";" + sideimgWidth + "}\n." + layoutname + "_post a {color: " + postboxLink + 
    "; font-weight: normal; text-shadow: inherit;}\n." + layoutname + "_post .quote .box {" + quoteboxColor + "border: " + quoteborderWidth + 
    " " + quoteborderType + " " + quoteborderColor + "; " + quoteborderRadius + "padding: " + quoteboxPadding + ";}\n." + 
    layoutname + "_post .code .box {" + codeboxColor + "border: " + quoteborderWidth + " " + quoteborderType + " " + 
    codeborderColor + "; " + quoteborderRadius + "padding: " + quoteboxPadding + "; color: inherit; white-space: pre-wrap;}\n." + layoutname + 
    "_post .code .boxhead {color:  inherit;}\n." + layoutname + '_post .spoiler {background: ' + spoilerboxColor + ' !important; ' + spoilerborderRadius + 'border: ' + spoilerborderWidth + " " + spoilerborderType + " " + spoilerborderColor + ' !important;}\n.' + layoutname + "_post hr {border: 0; height: 1px; background: " + 
    postborderColor + ";}\n." + layoutname + "_post .code br {display: none;} /* Layout Maker XP */\n" + 
    "</style><div class=\"" + layoutname + "_bg\"><div class=\"" + layoutname + "_post\">";
//  Step 10 - Final Touches:
    if (generateInline&&!exportCSSfile) {layoutheader = layoutheader.replace(/\n/g, " ");}
    if (exportCSSfile) {
        var downloadAttrSupported = ("download" in document.createElement("a"));
        if (!downloadAttrSupported) {warningSystem('Your browser does not support the <a href="https://caniuse.com/#feat=download" target="_blank">Download attribute</a>. As such, the CSS cannot be exported as a separate file.'); return;}
        var elementList = layoutheader.match(/<style>[^<>]*<\/style>/i);
        elementList = elementList.toString().slice(8, -8);
        // elementList = elementList.match(/\.[\w. ]+ {([A-Z-]+: *[^{}:;]+; ?)+}/ig);
        // elementList = elementList.join("%0D%0A");
        elementList = elementList.replace(/\n/g, "%0D%0A");
        elementList = "data:text/css," + elementList;
        var externalCSSanchor = document.getElementById("externalCSSanchor");
        externalCSSanchor.innerHTML = "External CSS File";
        externalCSSanchor.href = elementList;
        externalCSSanchor.download = layoutname + " External CSS";
        var layoutheader2 = layoutheader;
        layoutheader = layoutheader.replace(/<style>[^<>]*<\/style>/i, "<style> @import url('URL Goes Here'); </style>");
    }
//  Step 11 - Output:
    document.getElementById("ly-makerHeader").value = layoutheader;
    document.getElementById("ly-makerFooter").value = layoutfooter;
    if (exportCSSfile) {layoutheader = layoutheader2;} //dirty hacks²
    document.getElementById("ly-makerPreview").innerHTML = "<h2>Layout Preview</h2>" + layoutheader + 
    "<div class=\"quote\"><span class=\"boxhead\">Originally posted by Sample quote</span>" + 
    "<div class=\"box\"><div class=\"quote\"><span class=\"boxhead\">Originally posted by Sample nested quote</span><div class=\"box\"><div class=\"spoiler\">" + 
    "<div class=\"spoilerInner\">Sample spoiler</div></div><br>Sample text</div></div><br><a href=\"#\">Sample link</a><br>Sample quote</div></div><br><div class=\"code\">" + 
    "<span class=\"boxhead\">Code</span><pre class=\"box\">Sample code</pre></div><br><a href=\"#\">Sample link</a><br>Sample post with <b>bold</b> and <i>italics</i>." + layoutfooter;
}
function warningSystem(value) {
    var warningsDOC = document.getElementById("warnings");
    if (warningsDOC.innerHTML) {warningsDOC.innerHTML += "<br>";}
    warningsDOC.innerHTML += "<strong>Warning:</strong> " + value;
    warningsDOC.style.display = "";
}
function colorParser(colorValue, alpha, ignoreErrors) {
    try {
        if (!ignoreErrors) {
            if (!colorValue) throw "No color value was specified.";
            if (!colorValue.match(/^#[A-F,0-9]{3}$|^#[A-F,0-9]{6}$|^rgb\(\d\d?\d?, ?\d\d?\d?, ?\d\d?\d?\)$|^hsl\(\d\d?\d?, ?\d\d?\d?%, ?\d\d?\d?%\)$/i)) throw "Invalid color value.";
            if (alpha < 0||alpha > 100) throw "Invalid opacity value (too high/low).";
            if (isNaN(alpha)&&alpha !== false) throw "Invalid opacity value (non-number).";
        }
    }
    catch(error) {document.getElementById("errors").innerHTML = "<strong>Color Validation Error:</strong> " + error; document.getElementById("errors").style.display = ""; stop = now;}
    colorValue = colorValue.toString();
    // If an alpha value doesn't exist, there's no need to convert it to RGBA/HSLA.
    if (alpha) {
        if (colorValue.match(/^hsl\(\d\d?\d?, ?\d\d?\d?%, ?\d\d?\d?%\)$/i)) {
            colorValue = colorValue.replace(")", ", " + (alpha / 100) + ")");
            colorValue = colorValue.replace("hsl", "hsla");
            return colorValue;
        }
        if (colorValue.match(/^#[A-F,0-9]{3}$/i)) {
            var hex1 = colorValue.substring(1, 2);
            var hex2 = colorValue.substring(2, 3);
            var hex3 = colorValue.substring(3, 4);
            colorValue = "#" + hex1 + hex1 + hex2 + hex2 + hex3 + hex3;
        }
        if (colorValue.match(/^#[A-F,0-9]{6}$/i)) {
            var rgb1 = parseInt(colorValue.substring(1, 3), 16);
            var rgb2 = parseInt(colorValue.substring(3, 5), 16);
            var rgb3 = parseInt(colorValue.substring(5, 7), 16);
            colorValue = "rgba(" + rgb1 + ", " + rgb2 + ", " + rgb3 + ", " + (alpha / 100) + ")"
        } else {colorValue = colorValue.replace(")", ", " + (alpha / 100) + ")"); colorValue = colorValue.replace("rgb", "rgba");}
    }
    return colorValue;
}
function colorContrast(bgColor, textColor) {
    bgColor = colorParser(bgColor, bgColor, 100, true);
    bgColor = bgColor.replace(/[\(\)rgba]/ig, "");
    bgColor = bgColor.split(", ");
    textColor = colorParser(textColor, textColor, 100, true);
    textColor = textColor.replace(/[\(\)rgba]/ig, "");
    textColor = textColor.split(", ");
    bgColor.forEach(srgbMadness);
    textColor.forEach(srgbMadness);
    var L1 = (0.2126 * bgColor[0]) + (0.7152 * bgColor[1]) + (0.0722 * bgColor[2]);
    var L2 = (0.2126 * textColor[0]) + (0.7152 * textColor[1]) + (0.0722 * textColor[2]);
    if (L2 > L1) {var contrast = (L2 + 0.05) / (L1 + 0.05)} else {var contrast = (L1 + 0.05) / (L2 + 0.05);}
    contrast = Math.round(contrast * 100) / 100;
    if (contrast < 4.5) {warningSystem("The contrast ratio between the text and the background is too low " + "(" + contrast + "). " + 
    "A contrast ratio of 4.5 or higher is recommended so it is easier to read your post.");}
}
function srgbMadness(value, index, array) {
    value /= 255;
    if (value <= 0.03928) {value /= 12.92;} else {value = Math.pow((value + 0.055) / 1.055, 2.4);}
    array[index] = value;
    // I FORGOT THIS LAST ONE BEFORE SO IT WASN'T SAVING THE VALUE BACK AT THE ARRAY AND I SPENT SO MUCH TIME TRYING TO FIX THE FORMULA ITSELF TO FIGURE OUT WHAT WAS WRONG
}
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l) {
    var r, g, b;
    if (s == 0) {r = g = b = l; /* achromatic */} else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
//  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]; I don't really need to return it as an array in this code so...yeah.
    return "rgb(" + Math.round(r * 255) + ", " + Math.round(g * 255) + ", " + Math.round(b * 255) + ")";
}