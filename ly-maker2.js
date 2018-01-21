"use strict";
/*
size   = [marginPost, paddingPost, paddingQuote, paddingCode, boxShadow1, boxShadow2, boxShadow3, qcboxShadow1, qcboxShadow2, qcboxShadow3, marginImage, minHeight, signatureType];
color  = [colorBG, colorPost, colorDrop, colorText, colorShadow, colorLink, colorLinkHover, colorQuoteLink, colorQuoteHover, colorQuote, colorQuoteShadow, colorCode, colorCodeShadow, colorSpoiler, colorPostborder, colorQuoteborder, colorCodeborder, colorSpoilerborder];
border = [borderPost, borderQuote, borderCode, borderSpoiler, radiusPost, radiusQuote, radiusCode, radiusSpoiler];
bg     = [url, positiony, positionx, repeat];
font   = [fontFamily, customGoogleFont, customSerif, textShadow1, textShadow2, textShadow3];
*/
var database = {
    "size": ["20px", "7px", "5px", "5px", "2px", "2px", "1px", 0, 0, 0, 0, "100px", 0],
    "color": ["#102030", "#405060", "#000000", "#FFFFFF", "#000000", "#90B0F0", "#90B0F0", "#90B0F0", "#90B0F0", "rgba(0, 0, 0, 0.4)", "#000000", "rgba(0, 0, 0, 0.4)", "#000000", "#000000", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
    "border": ["0 ", "1px solid ", "1px solid ", "1px solid ", 0, 0, 0, "2px"],
    "bg": [["", "center", "right no-repeat"], ["", "top", "left", "repeat"], ["", "top", "left", "repeat"]],
    "font": ["inherit", "", "sans-serif", 0, 0, "3px"],
    "name": "",
    "app": "Layout Maker XP 2"
}
var backup = {
    "size": ["20px", "7px", "5px", "5px", "2px", "2px", "1px", 0, 0, 0, 0, "100px", 0],
    "color": ["#102030", "#405060", "#000000", "#FFFFFF", "#000000", "#90B0F0", "#90B0F0", "#90B0F0", "#90B0F0", "rgba(0, 0, 0, 0.4)", "#000000", "rgba(0, 0, 0, 0.4)", "#000000", "#000000", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
    "border": ["0 ", "1px solid ", "1px solid ", "1px solid ", 0, 0, 0, "2px"],
    "bg": [["", "center", "right no-repeat"], ["", "top", "left", "repeat"], ["", "top", "left", "repeat"]],
    "font": ["inherit", "", "sans-serif", 0, 0, "3px"],
    "name": "",
    "app": "Layout Maker XP 2"
}

window.onload = function() {firstFunction();};
function firstFunction() {
    database.name = "ly-" + Math.floor(Math.random() * 1000000);
    var hslColor = Math.floor(Math.random() * 360);
    database.color[0] = "hsl(" + hslColor + ", 30%, 13%)";
    database.color[1] = "hsl(" + hslColor + ", 20%, 29%)";
    database.color[5] = "hsl(" + (hslColor + 10) + ", 76%, 75%)";
    database.color[6] = "hsl(" + (hslColor + 10) + ", 76%, 85%)";
    database.color[7] = "hsl(" + (hslColor + 10) + ", 76%, 65%)";
    database.color[8] = "hsl(" + (hslColor + 10) + ", 76%, 75%)";
    layoutGenerator();
    document.getElementById("optionstoolbar").style.visibility = "";
}
function themeToggle() {
    var body = document.getElementsByTagName("BODY")[0];
    if (body.className === "nighttheme") {
        body.removeAttribute("class");
    } else {body.className = "nighttheme";}
}
function optionsToggle(s) {
    var tools = document.getElementsByClassName("toolicon");
    if (s === -1) {
        for (var i = 0; i < tools.length - 1; i++) {
            tools[i].className = "toolicon";
        }
        document.getElementById("returnoption").className = "toolicon hidden";
        document.getElementById("currentoptions").innerHTML = "<div><strong>Layout Maker XP 2</strong><br>version 1.1.1</div>";
        layoutGenerator();
        return;
    }
    for (var i = 0; i < tools.length - 1; i++) {
        if (i === s) {tools[i].className = "toolicon selected"; continue;}
        tools[i].className = "toolicon hidden";
    }
    document.getElementById("returnoption").className = "toolicon";
    return s === 0 ? sizeTool(true) : s === 1 ? settingsTool(true) : s === 2 ? colorTool(true) : s === 3 ? borderTool(true) : s === 4 ? backgroundTool(true) : s === 5 ? fontTool(true) : s === 6 ? saveTool(true) : s === 7 ? exportTool(true) : unknownTool();
}

// LAYOUT TOOLS

function sizeTool(uidraw, index, value) {
    if (uidraw) {
        var uiNumbers = [];
        for (var i = 0; i < (database.size.length - 1); i++) {
            uiNumbers[i] = database.size[i].toString().replace(/(px)/g,"");
        }
        uiNumbers[11] -= 100;
        document.getElementById("currentoptions").innerHTML = '<div><strong>Margin:</strong> <input type="number" max="75" min="0" placeholder="0" value="' + uiNumbers[0] + '"  oninput="sizeTool(false, 0, this.value);"> | <strong>Padding:</strong> <input type="number" max="40" min="0" placeholder="0" value="' + uiNumbers[1] + '" oninput="sizeTool(false, 1, this.value);"> | <strong>Quote/Code Box Padding:</strong> <input type="number" max="30" min="0" placeholder="3" value="' + uiNumbers[2] + '"  oninput="sizeTool(false, 2, this.value);"> | <strong>min-height:</strong> <input type="number" max="180" min="0" placeholder="0" value="' + uiNumbers[11] + '" oninput="sizeTool(false, 11, this.value);"><br><strong>Box Shadow:</strong> <input type="number" id="postshadowinput0" max="15" min="-15" placeholder="0" value="' + uiNumbers[4] + '" oninput="sizeTool(false, 4, this.value);">&nbsp;<input type="number" id="postshadowinput1" max="15" min="-15" placeholder="0" value="' + uiNumbers[5] + '" oninput="sizeTool(false, 5, this.value);">&nbsp;<input type="number" id="postshadowinput2" max="40" min="0" placeholder="0" value="' + uiNumbers[6] + '" oninput="sizeTool(false, 6, this.value);"> | <strong>Quote Box Shadow:</strong> <input type="number" id="postshadowinput4" max="15" min="-15" placeholder="0" value="' + uiNumbers[7] + '" oninput="sizeTool(false, 7, this.value);">&nbsp;<input type="number" id="postshadowinput5" max="15" min="-15" placeholder="0" value="' + uiNumbers[8] + '" oninput="sizeTool(false, 8, this.value);">&nbsp;<input type="number" id="postshadowinput6" max="40" min="0" placeholder="0" value="' + uiNumbers[9] + '" oninput="sizeTool(false, 9, this.value);"></div>';
        layoutGenerator(false, true);
        return;
    }
    var min = [0, 0, 0, 0, -15, -15, 0, -15, -15, 0, 0, 0];
    var max = [75, 40, 30, 30, 15, 15, 40, 15, 15, 40, 400, 180];
    if (value < min[index] || value > max[index] || isNaN(value)) {return;} //validator
    if (index >= 4 && index <= 6) {
        if (Math.abs(value) > database.size[0].replace(/px/g, "")) {document.getElementById("postshadowinput" + (index - 4)).className = "invalidinput"; return;} else {document.getElementById("postshadowinput" + (index - 4)).removeAttribute("class");}
    }
    var checkagainst;
    if (index === 0) {
        for (var i = 0; i < 3; i++) {
            checkagainst = database.size[i + 4].replace(/px/g, "");
            if (value < Math.abs(checkagainst)) {
                if (checkagainst < 0) {
                    sizeTool(false, (i + 4), value * -1); document.getElementById("postshadowinput" + i).value = value * -1;
                } else {sizeTool(false, (i + 4), value); document.getElementById("postshadowinput" + i).value = value;}
            } else {document.getElementById("postshadowinput" + i).removeAttribute("class");}
        }
    } //box shadow validator
    if (index === 11) {value = Number(value) + 100;}
    if (!value) {database.size[index] = 0;} else {database.size[index] = value + "px";}
    layoutGenerator(false, true);
}
function settingsTool(uidraw, value, index) {
    if (uidraw) {
        var contrastArray = colorContrast();
        var bgColor = database.color[1];
        var textColor = database.color[3];
        document.getElementById("currentoptions").innerHTML = '<div><strong>Layout Name:</strong> <input type="text" value="' + database.name + '" pattern="[A-Za-z]{1}[A-Za-z0-9_-]*" oninput="settingsTool(false, this.value);" required><br><strong>Signature Type:</strong> ' + 
            '<select onchange="settingsTool(false, this.value, 12);">' + 
                '<option class="listofSigOptions" value="0">Signature Box</option>' + 
                '<option class="listofSigOptions" value="1">Post Box</option>' + 
                '<option class="listofSigOptions" value="2">Post Box (w/ horizontal linebreak)</option>' + 
                '<option class="listofSigOptions" value="3">None</option>' + 
            '</select> | <strong>Contrast Ratio:</strong> ' + contrastArray[1] + '</div><a href="https://leaverou.github.io/contrast-ratio/#' + textColor + '-on-' + bgColor + '" target="_blank" style="margin: 0 0 0 auto;"><div class="contrastcircle contrast' + contrastArray[1] + '">' + contrastArray[0] + '</div></a>';
        var selectList = document.getElementsByClassName("listofSigOptions");
        for (var i = 0; i < selectList.length; i++) {if (selectList[i].value === database.size[9]) {selectList[i].selected = true;}}
        return;
    }
    if (!index) {
        if (!value||!value.match(/^[A-Za-z][\w_-]*$/)) {
            database.name = "ly-" + Math.floor(Math.random() * 1000000);
        } else {database.name = value;}
    } else {database.size[index] = value;}
    layoutGenerator();
}
function colorTool(uidraw, index, element) {
    if (uidraw) {
        var elementList = [];
        elementList.push(document.getElementsByClassName(database.name + "_bg")[0]);
        var postandsig = document.getElementsByClassName(database.name + "_post");
        elementList.push(postandsig[0]);
        if (postandsig[1]) {elementList.push(postandsig[1]);} else {elementList.push(postandsig[0]);}
        elementList.push(document.getElementsByClassName("spoiler")[0]);
        elementList.push(document.getElementsByClassName("anchoronclickreference")[0]);
        elementList.push(document.getElementsByClassName("anchoronclickreference")[1]);
        elementList.push(elementList[1].children[0]);
        elementList.push(elementList[1].children[2]);
        if (!index&&index !== 0) {
            for (var i = 0; i < elementList.length; i++) {
                elementList[i].setAttribute("onclick", "colorTool(true, " + i + ")");
            }
            document.getElementById("currentoptions").innerHTML = "<div>Click on the item that you want to change the color of.<br><a href=\"javascript:;\" onclick=\"colorTool(true, -1)\">If you want to change the text color, click here instead.</a></div>";
        } else {
            for (var i = 0; i < elementList.length ; i++) {elementList[i].removeAttribute("onclick");}
            if (index === 2) {index = 1;}
            if (index === 3) {index = 13;}
            if (index === 6) {index = 9;}
            if (index === 7) {index = 11;}
            if (index === 4) {index = 7;}
            if (index === -1) {index = 3;}
            // all of this is to align the indexes from elementList with the ones in database.color
            var colorArray = [
                //["Header Text:", "include opacity box?", "include next item in same menu?"],
                ["Post Background:"],
                ["Post and Signature Box:", true, true],
                ["Post Box Shadow:", true],
                ["Text Color:", false, true],
                ["Text Shadow Color:"],
                ["Link Color:", false, true],
                ["Link Hover:"],
                ["Quote Link Color:", false, true],
                ["Quote Link Hover:"],
                ["Quote Box:", true, true],
                ["Quote Box Shadow:", true],
                ["Code Box:", true, true],
                ["Code Box Shadow:", true],
                ["Spoilers:", true]
            ];
            var htmltemplate = [
                '<strong>',
                '</strong>',
                ' <input type="text" oninput="colorTool(false, ',
                ', this)" value="',
                '">',
                ' <input type="number" min="0" max="100" oninput="colorTool(false, ',
                ', this)" value="',
                '">'
            ];
            var htmlexport = "";
            var color = "";
            for (var i = 0; i < 2; i++) {
                color = colorParser(database.color[index]);
                htmlexport += htmltemplate[0] + colorArray[index][0] + htmltemplate[1] + " <button value=\"" + color[0] + "\" rhslcolor=\"index: " + index + ";\"></button>" + htmltemplate[2] + index + htmltemplate[3] + color[0] + htmltemplate[4];
                if (colorArray[index][1]) {
                    htmlexport += htmltemplate[5] + index + htmltemplate[6] + (color[1] * 100) + htmltemplate[7];
                }
                if (colorArray[index][2] && i !== 1) {index++; htmlexport += "<br>"} else {break;}
            }
            document.getElementById("currentoptions").innerHTML = "<div>" + htmlexport + "</div>";
            rhslFirstFunction();
        }
        return;
    }
    var value = [element.value];
    if (element.attributes[0].value === "text") {
        if (element.nextElementSibling) {value.push(element.nextElementSibling.value);}
    } else if (element.attributes[0].value === "number") {
        value.unshift(element.previousElementSibling.value);
    } else {return;}
    value = colorJoiner(value[0], value[1]);
    if (value) {database.color[index] = value; element.removeAttribute("class");} else {element.className = "invalidinput";}
    layoutGenerator();
}
function borderTool(uidraw, index, element, isborder) {
    if (uidraw) {
        var elementList = [];
        var postandsig = document.getElementsByClassName(database.name + "_post");
        elementList.push(postandsig[0]);
        if (postandsig[1]) {elementList.push(postandsig[1]);} else {elementList.push(postandsig[0]);}
        elementList.push(elementList[0].children[0]);
        elementList.push(elementList[0].children[2]);
        elementList.push(document.getElementsByClassName("spoiler")[0]);
        if (!index&&index !== 0) {
            for (var i = 0; i < elementList.length; i++) {
                elementList[i].setAttribute("onclick", "borderTool(true, " + i + ")");
            }
            document.getElementById("currentoptions").innerHTML = "Click on the item that you want to change the border of.";
        } else {
            for (var i = 0; i < elementList.length ; i++) {elementList[i].removeAttribute("onclick");}
            if (index === 0) {index = 1;}
            index += 13;
            var borderindex = index - 14;
            // all of this is to align the indexes from elementList with the ones in database.color
            var uiUnsort = database.border[borderindex];
            var uiNumber = uiUnsort.substring(0, uiUnsort.indexOf(" ")).replace(/(px)/g,"");
            var uiSelect = uiUnsort.slice(uiUnsort.indexOf(" ") + 1, -1);
            var uiRadius = database.border[borderindex + (database.border.length / 2)].toString().replace(/(px)/g,"");
            var borderArray = ["Post and Signature Border:", "Quote Border:", "Code Border:", "Spoiler Border:"];
            var color = colorParser(database.color[index]);
            var htmlexport = '<strong>' + borderArray[borderindex] + '</strong> <input type="number" min="0" max="15" value="' + uiNumber + '" oninput="borderTool(false, ' + borderindex + ', this, 1);">' + ' <select onchange="borderTool(false, ' + borderindex + ', this, 1);">' + 
                '<option class="listofBorderOptions" value="">None</option>' + 
                '<option class="listofBorderOptions" value="solid">Solid</option>' + 
                '<option class="listofBorderOptions" value="double">Double</option>' + 
                '<option class="listofBorderOptions" value="dotted">Dotted</option>' + 
                '<option class="listofBorderOptions" value="dashed">Dashed</option>' + 
                '<option class="listofBorderOptions" value="groove">Groove</option>' + 
                '<option class="listofBorderOptions" value="ridge">Ridge</option>' + 
                '<option class="listofBorderOptions" value="inset">Inset</option>' + 
                '<option class="listofBorderOptions" value="outset">Outset</option>' + 
            '</select> | <strong>Border Radius:</strong> <input type="number" min="0" max="50" value="' + uiRadius + '" oninput="borderTool(false, ' + borderindex + ', this, 2);"><br><strong>Color:</strong>' + " <button value=\"" + color[0] + "\" rhslcolor=\"index: " + index + ";\"></button>" + ' <input type="text" oninput="borderTool(false, ' + index + ', this)" value="' + color[0] + '">';
            document.getElementById("currentoptions").innerHTML = "<div>" + htmlexport + "</div>";
            var selectList = document.getElementsByClassName("listofBorderOptions");
            for (var i = 0; i < selectList.length; i++) {if (selectList[i].value === uiSelect) {selectList[i].selected = true;}}
            rhslFirstFunction();
        }
        return;
    }
    if (!isborder) {
        var value = colorJoiner(element.value, false);
        if (value) {database.color[index] = value; element.removeAttribute("class");} else {element.className = "invalidinput";}
    } else if (isborder === 1) {
        var value = [element.value];
        if (value < 0 || value > 15) {return;} //validator
        if (element.tagName === "INPUT") {
            value.push(element.nextElementSibling.value);
        } else if (element.tagName === "SELECT") {
            value.unshift(element.previousElementSibling.value);
        } else {return;}
        if (value[0] !== "0") {value[0] += "px";}
        if (value[1]) {value[1] += " ";}
        value = value.join(" ");
        database.border[index] = value;
    } else {
        var value = element.value;
        if (value < 0 || value > 50) {return;} //validator
        if (value !== "0") {value += "px";}
        database.border[index + (database.border.length / 2)] = value;
    }
    layoutGenerator();
}
function backgroundTool(uidraw, index, bgIndex, value) {
    if (uidraw) {
        if (!index && index !== 0) {
            document.getElementById("currentoptions").innerHTML = '<div><strong>Selected Background: </strong><select onchange="backgroundTool(true, this.value);">' + 
                '<option value="false">None</option>' + 
                '<option value="0">Side Image</option>' + 
                '<option value="2">1st Background</option>' + 
                '<option value="1">2nd Background</option>' + 
            '</select><br><div id="backgroundsettings">Please select a background to edit. The filesize of all used images should be under 200KB.</div></div>';
        } else if (index === "false") {
            document.getElementById("backgroundsettings").innerHTML = "Please select a background to edit. The filesize of all used images should be under 200KB.";
        } else {
            var filteredURL = database.bg[index][0].replace(/url\(/,"").replace(")","");
            document.getElementById("backgroundsettings").innerHTML = '<input type="text" value="' + filteredURL + '" oninput="backgroundTool(false, ' + index + ', 0, this.value)"> <select onchange="backgroundTool(false, ' + index + ', 1, this.value)">' + 
                '<option class="listofBgOptions1" value="top">Top</option>' + 
                '<option class="listofBgOptions1" value="center">Center</option>' + 
                '<option class="listofBgOptions1" value="bottom">Bottom</option>' + 
            '</select>';
            if (database.bg[index][3]) {
                document.getElementById("backgroundsettings").innerHTML += ' <select onchange="backgroundTool(false, ' + index + ', 2, this.value)">' + 
                    '<option class="listofBgOptions2" value="left">Left</option>' + 
                    '<option class="listofBgOptions2" value="center">Center</option>' + 
                    '<option class="listofBgOptions2" value="right">Right</option>' + 
                '</select> <select onchange="backgroundTool(false, ' + index + ', 3, this.value)">' + 
                    '<option class="listofBgOptions3" value="repeat">Repeat horizontally and vertically</option>' + 
                    '<option class="listofBgOptions3" value="repeat-x">Repeat horizontally</option>' + 
                    '<option class="listofBgOptions3" value="repeat-y">Repeat vertically</option>' + 
                    '<option class="listofBgOptions3" value="no-repeat">Don\'t repeat</option>' + 
                    '<option class="listofBgOptions3" value="/ 100% no-repeat">Don\'t repeat (stretch to full width)</option>' + 
                    '<option class="listofBgOptions3" value="/ cover no-repeat">Don\'t repeat (stretch to full size)</option>' + 
                '</select>';
                var selectList = document.getElementsByClassName("listofBgOptions1");
                for (var i = 0; i < selectList.length; i++) {
                    if (selectList[i].value === database.bg[index][1]) {selectList[i].selected = true;}
                }
                selectList = document.getElementsByClassName("listofBgOptions2");
                for (var i = 0; i < selectList.length; i++) {
                    if (selectList[i].value === database.bg[index][2]) {selectList[i].selected = true;}
                }
                selectList = document.getElementsByClassName("listofBgOptions3");
                for (var i = 0; i < selectList.length; i++) {
                    if (selectList[i].value === database.bg[index][3]) {selectList[i].selected = true;}
                }
            } else {
                var uiNumber = database.size[10].toString().replace(/(px)/g,"");
                document.getElementById("backgroundsettings").innerHTML += ' | <strong>Image Width (px):</strong> <input type="number" min="0" max="400" value="' + uiNumber + '" oninput="sizeTool(false, 10, this.value)">'; // screw consistency, this works better
                var selectList = document.getElementsByClassName("listofBgOptions1");
                for (var i = 0; i < selectList.length; i++) {
                    if (selectList[i].value === database.bg[index][1]) {selectList[i].selected = true;}
                } // selectList[i].selected gets reset by this stupid DOM change at the end, so I had to improvise
            }
        }
        return;
    }
    if (bgIndex === 0) {
        if (value.match(/(^[A-Z]:\\)|(^file:\/\/)/) || value.match(/[\\();]/)) {
            document.getElementById("backgroundsettings").children[0].className = "invalidinput";
            return;
        } else {document.getElementById("backgroundsettings").children[0].removeAttribute("class");}
        if (value) {value = "url(" + value + ")";}
    }
    database.bg[index][bgIndex] = value;
    layoutGenerator();
}
function fontTool(uidraw, index, value) {
    if (uidraw) {
        var uiNumbers = [];
        for (var i = 3; i <= 5; i++) {
            uiNumbers[i - 3] = database.font[i].toString().replace(/(px)/g,"");
        }
        document.getElementById("currentoptions").innerHTML = '<div><strong>Text Font:</strong> ' + 
        '<select onchange="fontTool(false, 0, this.value);">' + 
            '<option class="listofFontOptions" value="inherit">Default</option>' + 
            '<optgroup label="Sans-Serif">' + 
                '<option class="listofFontOptions" value="Arial, Helvetica, sans-serif">Arial</option>' + 
                '<option class="listofFontOptions" value="\'Comic Sans MS\', cursive, sans-serif">Comic Sans MS</option>' + 
                '<option class="listofFontOptions" value="\'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif">Lucida Sans Unicode</option>' + 
                '<option class="listofFontOptions" value="Tahoma, Geneva, sans-serif">Tahoma</option>' + 
                '<option class="listofFontOptions" value="\'Trebuchet MS\', Helvetica, sans-serif">Trebuchet MS</option>' + 
                '<option class="listofFontOptions" value="Verdana, Geneva, sans-serif">Verdana</option>' + 
            '</optgroup>' + 
            '<optgroup label="Serif">' + 
                '<option class="listofFontOptions" value="Georgia, serif">Georgia</option>' + 
                '<option class="listofFontOptions" value="\'Palatino Linotype\', \'Book Antiqua\', Palatino, serif">Palatino Linotype</option>' + 
                '<option class="listofFontOptions" value="\'Times New Roman\', Times, serif">Times New Roman</option>' + 
            '</optgroup>' + 
            '<optgroup label="Monospace">' + 
                '<option class="listofFontOptions" value="\'Courier New\', Courier, monospace">Courier New</option>' + 
                '<option class="listofFontOptions" value="\'Lucida Console\', Monaco, monospace">Lucida Console</option>' + 
            '</optgroup>' + 
        '</select> <input type="text" value="' + database.font[1] + '" placeholder="Custom Google Font" oninput="fontTool(false, 1, this.value);"> <select onchange="fontTool(false, 2, this.value);">' + 
            '<option class="listofTextOptions" value="sans-serif">Sans-Serif</option>' + 
            '<option class="listofTextOptions" value="serif">Serif</option>' + 
            '<option class="listofTextOptions" value="monospace">Monospace</option>' + 
        '</select><br>' + 
        '<strong>Text Shadow:</strong> <input type="number" max="15" min="-15" placeholder="0" value="' + uiNumbers[0] + '" oninput="fontTool(false, 3, this.value);">&nbsp;<input type="number" max="15" min="-15" placeholder="0" value="' + uiNumbers[1] + '" oninput="fontTool(false, 4, this.value);">&nbsp;<input type="number" max="40" min="0" placeholder="0" value="' + uiNumbers[2] + '" oninput="fontTool(false, 5, this.value);"></div>';
        var selectList = document.getElementsByClassName("listofFontOptions");
        for (var i = 0; i < selectList.length; i++) {if (selectList[i].value === database.font[0]) {selectList[i].selected = true;}}
        selectList = document.getElementsByClassName("listofTextOptions");
        for (var i = 0; i < selectList.length; i++) {if (selectList[i].value === database.font[2]) {selectList[i].selected = true;}}
        return;
    }
    if (index >= 3) {
        var min = [-15, -15, 0];
        var max = [15, 15, 40];
        if (value < min[index - 3] || value > max[index  - 3] || isNaN(value)) {return;} //validator
        if (!value) {database.font[index] = 0;} else {database.font[index] = value + "px";}
    } else {database.font[index] = value;}
    layoutGenerator();
}
function saveTool(uidraw, event, cookieaction, drawJSON) {
    if (uidraw) {
        var downloadAttrSupported = ("download" in document.createElement("a"));
        if (!downloadAttrSupported) {var savebutton = '<button onclick="saveTool(false, false, false, true)">Save JSON File</button>';} else {
            var jsonoutput = JSON.stringify(database);
            jsonoutput = jsonoutput.replace(/\s/g, "%20");
            jsonoutput = jsonoutput.replace(/'/g, "%27");
            var savebutton =  document.getElementById("currentoptions").innerHTML = '<a href=\'data:application/json,' + jsonoutput + '\' download="LM2XP - ' + database.name + '.json"><button>Save JSON File</button></a>';
        }
        document.getElementById("currentoptions").innerHTML = '<div>Saving the layout as a JSON file lets you re-open it later on.<br>' + savebutton + ' <input type="file" id="jsonupload" accept=".json" onchange="saveTool(false, event)"> <label for="jsonupload" class="file">Load JSON File</label> <button onclick="saveTool(false, false, 1)">Save as browser data</button> <button onclick="saveTool(false, false, 2)">Load from browser data</button>';
        return;
    }
    if (drawJSON) {
        var jsonoutput = JSON.stringify(database);
        document.getElementById("mainmakerwindow").innerHTML = '<textarea class="exporthtml" readonly>' + jsonoutput + '</textarea>';
        document.getElementById("currentoptions").innerHTML = '<div>Your browser does not support the <a href="https://caniuse.com/#feat=download" target="_blank">Download attribute</a>.<br>Please manually copy and paste the text in the textarea above and save it on a JSON file.</div>';
        return;
    }
    if (cookieaction) {
        if (cookieaction === 1) {
            createCookie("savedLayout", JSON.stringify(database), 365);
            document.getElementById("currentoptions").innerHTML = "<div>Layout saved successfully!<br>The layout is now stored in the browser's cookie data.</div>";
        } else {
            var cookiedata = readCookie("savedLayout");
            if (cookiedata) {
                cookiedata = JSON.parse(cookiedata);
                database = cookiedata;
                document.getElementById("currentoptions").innerHTML = "Layout loaded successfully!";
            } else {
                document.getElementById("currentoptions").innerHTML = "Error: Unable to find any layout data in the browser's cookies.";
            }
        }
        layoutGenerator();
        return;
    }
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var file = event.target.files[0];
        //if (!file.type.match('application.json')) {return;}
        var reader = new FileReader();
        reader.onload = function(event) {
            try {
                if (!file.name.match(/.json$/)) throw "The file is not a .json file.";
                if (!event.target.result.match(/{"size":\[[^\]]*\],"color":\[[^\]]*\],"border":\[[^\]]*\],"bg":\[.*\],"font":\[[^\]]*\],"name":"[\w-_]*","app":"Layout Maker XP 2"}/)) throw "Invalid, malformatted or corrupted JSON file.";
            }
            catch(errorText) {document.getElementById("currentoptions").innerHTML = "Error: " + errorText; return;}
            database = JSON.parse(event.target.result);
            layoutGenerator();
        };
        reader.readAsText(file);
    } else {document.getElementById("currentoptions").innerHTML = 'Your browser does not fully support the <a href="https://caniuse.com/#feat=fileapi" target="_blank">File API</a>. Therefore, the JSON file could not be loaded.';}
}
function exportTool(uidraw, exportSettings) {
    if (uidraw) {
        document.getElementById("currentoptions").innerHTML = '<div>This tool will generate the layout\'s HTML and CSS code.<br><button onclick="exportTool(false, -1);">Reset Layout</button> <button onclick="exportTool(false, this.nextElementSibling.nextElementSibling.value);">Export Layout</button> | <strong>Options:</strong> <select>' + 
            '<option value="1">Export normally</option>' + 
            '<option value="2">Export CSS separately</option>' + 
            '<option value="3">Export without linebreaks</option>' + 
        '</select> <a href="" download="" id="externalCSSanchor"></a></div>';
        return;
    }
    exportSettings = Number(exportSettings);
    if (exportSettings === -1) {
        if (confirm("Warning: This will reset all of the layout's properties and settings. If you want to save anything first, please hit \"Cancel\" and use either the Save Tool or the Export Tool.")) {database = backup; firstFunction();}
        return;
    }
    var generatedLayout = layoutGenerator(true);
    if (exportSettings === 2) {
        var downloadAttrSupported = ("download" in document.createElement("a"));
        if (!downloadAttrSupported) {document.getElementById("currentoptions").innerHTML = '<div>Your browser does not support the <a href="https://caniuse.com/#feat=download" target="_blank">Download attribute</a>.<br>As such, the CSS cannot be exported as a separate file.</div>'; return;}
        var externalCSS = generatedLayout[0].match(/<style>[^<>]*<\/style>/i).toString().slice(9, -8);
        externalCSS = "data:text/css," + externalCSS.replace(/\n /g, "%0D%0A");
        var externalCSSanchor = document.getElementById("externalCSSanchor");
        externalCSSanchor.innerHTML = "External CSS File";
        externalCSSanchor.href = externalCSS;
        externalCSSanchor.download = database.name + " External CSS";
        generatedLayout[0] = generatedLayout[0].replace(/<style>[^<>]*<\/style>/i, "<style> @import url('URL Goes Here'); </style>");
        document.getElementById("mainmakerwindow").innerHTML = '<textarea class="exporthtml" readonly>LAYOUT HEADER:\n' + generatedLayout[0] + '\n\nLAYOUT FOOTER:\n' + generatedLayout[2] + '</textarea>';
    } else {
        if (exportSettings === 3) {generatedLayout[0] = generatedLayout[0].replace(/\n/g, "");}
        document.getElementById("mainmakerwindow").innerHTML = '<textarea class="exporthtml" readonly>LAYOUT HEADER:\n' + generatedLayout[0] + '\n\nLAYOUT FOOTER:\n' + generatedLayout[2] + '</textarea>';
        document.getElementById("externalCSSanchor").innerHTML = "";
    }
}
function unknownTool() {document.getElementById("currentoptions").innerHTML = "Excuse me, but this tool doesn't seem to exist.";}

// LAYOUT GENERATOR AND OTHER COLOR-RELATED FUNCTIONS

function layoutGenerator(shouldExport, doScroll) {
    if (database.font[1]) {
        var generatedFont = "'" + database.font[1] + "', " + database.font[2];
        var generatedFontExtra = " @import url('https://fonts.googleapis.com/css?family=" + database.font[1].replace(" ", "+") + "');\n";
    } else {var generatedFont = database.font[0]; var generatedFontExtra = "";}
    var bgArray = [];
    for (var i = 0; i < database.bg.length; i++) {
        if (!database.bg[i][0]) {continue;}
        bgArray.push(database.bg[i].join(" "));
    }
    if (bgArray[0]) {
        bgArray[bgArray.length - 1] = database.color[0] + " " + bgArray[bgArray.length - 1];
        bgArray = bgArray.join(", ");
    } else {bgArray = database.color[0];}
    var generatedLayout = ['<style>\n' + generatedFontExtra + ' .' + database.name + '_bg {background: ' + 
    bgArray + '; padding: ' + database.size[0] + '; font-family: ' + generatedFont + '; color: ' + database.color[3] + '; text-shadow: ' + database.font[3] + ' ' + database.font[4] + ' ' + database.font[5] + ' ' + database.color[4] + '; min-height: ' + database.size[8] + ';}\n .' + database.name + '_post {background: ' + database.color[1] + '; border: ' + database.border[0] + database.color[14] + '; border-radius: ' + database.border[4] + '; padding: ' + database.size[1] + '; box-shadow: ' + database.size[4] + ' ' + database.size[5] + ' ' + database.size[6] + ' ' + database.color[2] + '; margin-right: ' + database.size[10] + ';}\n .' + database.name + '_post a {color: ' + database.color[5] + '; font-weight: normal; text-shadow: inherit;} .' + database.name + '_post a:hover {color: ' + database.color[6] + ';}\n .' + database.name + '_post .quote .box {background: ' + database.color[9] + '; border: ' + database.border[1] + database.color[15] + '; border-radius: ' + database.border[5] + '; padding: ' + database.size[2] + '; box-shadow: ' + database.size[7] + ' ' + database.size[8] + ' ' + database.size[9] + ' ' + database.color[10] + ';}\n .' + database.name + '_post .quote a {color: ' + database.color[7] + ';} .' + database.name + '_post .quote a:hover {color: ' + database.color[8] + ';}\n .' + database.name + '_post .code .box {background: ' + database.color[11] + '; border: ' + database.border[2] + database.color[16] + '; border-radius: ' + database.border[6] + '; padding: ' + database.size[2] + '; box-shadow: ' + database.size[7] + ' ' + database.size[8] + ' ' + database.size[9] + ' ' + database.color[12] + '; color: inherit; white-space: pre-wrap;}\n .' + database.name + '_post .spoiler {background: ' + database.color[13] + ' !important; border: ' + database.border[3] + database.color[17] + ' !important; border-radius: ' + database.border[7] + ';}\n .' + database.name + '_post .code .boxhead {color:  inherit;} .' + database.name + '_post .code br {display: none;}\n .' + database.name + '_post hr {border: 0; height: 1px; background: ' + database.color[14] + ';} /* Layout Maker XP 2 */\n</style>' + '<div class="' + database.name + '_bg"><div class="' + database.name + '_post">',
    '<div class="quote"><span class="boxhead">Originally posted by Sample quote</span><div class="box"><div class="quote"><span class="boxhead">Originally posted by Sample nested quote</span><div class="box"><div class="spoiler"><div class="spoilerInner">Sample spoiler</div></div><br>Sample text</div></div><br><a class="anchoronclickreference" href="javascript:;">Sample link</a><br>Sample quote</div></div><br><div class="code"><span class="boxhead">Code</span><pre class="box">Sample code</pre></div><br><a class="anchoronclickreference" href="javascript:;">Sample link</a><br>Sample post with <b>bold</b> and <i>italics</i>.'];
    var generatedFooter = ['</div><div class="' + database.name + '_post" style="margin-top: ' + database.size[0] + ';">SIGNATURE TEXT HERE.</div></div>', '<br>--------------------<br>SIGNATURE TEXT HERE.</div></div>', '<br><hr>SIGNATURE TEXT HERE.</div></div>', '</div></div>'];
    generatedLayout.push(generatedFooter[database.size[12]]);
    if (doScroll) {window.scrollTo(0, document.body.scrollHeight);}
    if (shouldExport) {return generatedLayout;}
    document.getElementById("mainmakerwindow").innerHTML = generatedLayout.join(" ");
}
function colorJoiner(color, alpha) {
    if (color.match(/^#[\dA-F]{3}$/i)) {
        color = [color.charAt(1), color.charAt(2), color.charAt(3)];
        color = "#" + color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    if (alpha >= 0 && alpha < 100 && alpha !== false) {
        if (color.match(/^#[\dA-F]{6}$/i)) {
            color = "rgb(" + parseInt(color.substr(1, 2), 16) + ", " + parseInt(color.substr(3, 2), 16) + ", " + parseInt(color.substr(5, 2), 16) + ")";
        }
        if (color.match(/(rgb|hsl)\(/)) {
            color = color.replace("(","a(");
            color = color.replace(")",", " + Math.round(alpha) / 100 + ")");
        }
    }
    // VALIDATOR
    var valid = false;
    var colortype = 0;
    if (color.match(/^#[\dA-F]{6}$/i)) {valid = true;} else if (color.match(/^rgb\([\d]{1,3}, ?[\d]{1,3}, ?[\d]{1,3}\)$/) || color.match(/^rgba\(([\d]{1,3}, ?){3} ?[\d.]{1,}\)$/)) {colortype = 1;} else if (color.match(/^hsl\([\d]{1,3}, ?[\d]{1,3}%, ?[\d]{1,3}%\)$/) || color.match(/^hsla\([\d]{1,3}, ?([\d]{1,3}%, ?){2}[\d.]{1,}\)$/)) {colortype = 2;}
    if (colortype) {
        var indValues = color.substring(color.indexOf("(") + 1, color.indexOf(")")).replace(/%/g, "");
        indValues = indValues.split(",");
        var t = 0;
        if (colortype === 2) {var indCompare = [360, 100, 100];} else {var indCompare = [255, 255, 255];}
        if (indValues[0] <= indCompare[0] && indValues[0] >= 0) {t++;}
        if (indValues[1] <= indCompare[1] && indValues[1] >= 0) {t++;}
        if (indValues[2] <= indCompare[2] && indValues[2] >= 0) {t++;}
        if (t === 3) {valid = true;}
    }
    if (valid) {return color;} else {return;}
}
function colorParser(value, toHsl) {
    if (value.match(/(rgb|hsl)a\(/)) {
        value = value.replace("a","");
        value = [value.substring(0, value.lastIndexOf(",")) + ")", value.slice(value.lastIndexOf(",") + 1, -1)];
    } else {value = [value, 1];}
    if (!toHsl) {return value;} else {
        if (value[0].match(/^#[\dA-F]{6}$/i)) {
            value[0] = "rgb(" + parseInt(value[0].substr(1, 2), 16) + ", " + parseInt(value[0].substr(3, 2), 16) + ", " + parseInt(value[0].substr(5, 2), 16) + ")";
        }
        if (value[0].match(/rgb/)) {
            value = value[0].replace(/[rgb()]/g,"");
            value = value.split(",");
            value = rgbToHsl(value[0], value[1], value[2]);
            value[0] *= 360;
            value[1] *= 100;
            value[2] *= 100;
            return value;
        } else {
            value = value[0].replace(/[hsl%()]/g,"");
            value = value.split(",");
            value[0] = Number(value[0]);
            value[1] = Number(value[1]);
            value[2] = Number(value[2]);
            return value;
        }
    }
}
function colorContrast(bgColor, textColor) {
    var bgColor = database.color[1];
    var textColor = database.color[3];
    var alpha = colorParser(database.color[1]);
    alpha = alpha[1];
    bgColor = colorParser(bgColor, 1);
    textColor = colorParser(textColor, 1);
    bgColor = hslToRgb(bgColor[0] / 360, bgColor[1] / 100, bgColor[2] / 100);
    textColor = hslToRgb(textColor[0] / 360, textColor[1] / 100, textColor[2] / 100);
    bgColor.forEach(srgbMadness);
    textColor.forEach(srgbMadness);
    var L1 = (0.2126 * bgColor[0]) + (0.7152 * bgColor[1]) + (0.0722 * bgColor[2]);
    var L2 = (0.2126 * textColor[0]) + (0.7152 * textColor[1]) + (0.0722 * textColor[2]);
    if (L2 > L1) {var contrast = (L2 + 0.05) / (L1 + 0.05)} else {var contrast = (L1 + 0.05) / (L2 + 0.05);}
    contrast = Math.round(contrast * 10) / 10;
    if (alpha < 0.70 || isNaN(contrast)) {contrast = "?";}
    var rating = (contrast > 6.9) ? "Excellent" : (contrast > 4.4) ? "Good" : (contrast > 2.9) ? "Fair" : (contrast > 0.9) ? "Bad" : "Unknown";
    return [contrast, rating];
}
function srgbMadness(value, index, array) {
    value /= 255;
    if (value <= 0.03928) {value /= 12.92;} else {value = Math.pow((value + 0.055) / 1.055, 2.4);}
    array[index] = value;
}

// COOKIE-RELATED FUNCTIONS

function createCookie(name, value, days) {
    if (days) {
	    var date = new Date();
	    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	    var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
    if (!document.cookie || !document.cookie.match(name)) {return;} //added this to prevent errors
	var ca = document.cookie.split(';');
	for (var i=0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
    return c;
}