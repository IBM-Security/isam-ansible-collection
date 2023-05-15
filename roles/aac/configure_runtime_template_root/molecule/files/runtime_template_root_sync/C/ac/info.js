var cookieName = @COOKIE_NAME@;
var serviceLocation = @SERVER_NAME@;

@ATTRIBUTES@

var lat = null;
var lon = null;
var userLocation;
var acc = null;
var alt = null;
var d = new Date();
var locationAvailable;
var correlationID = null;
var fontList = "";
var submitted = false;

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

var commonFonts = [
                "Aharoni", "Andale Mono", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Arabic Typesetting", "Arial Black", "Arial", "Batang", "BatangChe", "Bitstream Charter",
                "Bitstream Vera Sans Mono", "Bitstream Vera Sans", "Bitstream Vera Serif", "Browallia New", "BrowalliaUPC", "Calibri", "Cambria Math", "Cambria", "Candara",
                "Century Schoolbook L", "Comic Sans MS", "Consolas", "Constantia", "Corbel", "Cordia New", "CordiaUPC", "Courier 10 Pitch", "Courier New", "DFKai-SB",
                "DaunPenh", "David", "DejaVu Sans Mono", "DejaVu Sans", "DejaVu Serif", "DilleniaUPC", "Dingbats",
                "DokChampa", "Dotum", "DotumChe", "Ebrima", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "FangSong", "FrankRuehl", "Franklin Gothic Medium", "FreeMono", "FreeSans",
                "FreeSerif", "FreesiaUPC", "Gabriola", "Garuda", "Gautami", "Gentium Basic", "Gentium Book Basic", "Gentium", "GentiumAlt", "Georgia", "Gisha", "Gulim", "GulimChe",
                "Gungsuh", "GungsuhChe", "Impact", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KacstOne", "KaiTi", "Kalinga", "Kartika", "Kedage", "Khmer OS System", "Khmer OS",
                "Khmer UI", "Kinnari", "KodchiangUPC", "Kokila", "LMMathExtension10", "LMMathItalic10", "LMMathItalic12", "LMMathItalic5", "LMMathItalic6", "LMMathItalic7",
                "LMMathItalic8", "LMMathItalic9", "LMMathSymbols10", "LMMathSymbols5", "LMMathSymbols6", "LMMathSymbols7", "LMMathSymbols8", "LMMathSymbols9", "LMMono10", "LMMono12",
                "LMMono8", "LMMono9", "LMMonoCaps10", "LMMonoLt10", "LMMonoLtCond10", "LMMonoProp10", "LMMonoPropLt10", "LMMonoSlant10", "LMRoman10", "LMRoman12", "LMRoman17",
                "LMRoman5", "LMRoman6", "LMRoman7", "LMRoman8", "LMRoman9", "LMRomanCaps10", "LMRomanDemi10", "LMRomanDunh10", "LMRomanSlant10", "LMRomanSlant12", "LMRomanSlant17",
                "LMRomanSlant8", "LMRomanSlant9", "LMRomanUnsl10", "LMSans10", "LMSans12", "LMSans17", "LMSans8", "LMSans9", "LMSansDemiCond10", "LMSansQuot8", "Lao UI", "Latha",
                "Leelawadee", "Levenim MT", "Liberation Mono", "Liberation Sans Narrow", "Liberation Sans", "Liberation Serif", "LilyUPC", "Lohit Bengali", "Lohit Gujarati", "Lohit Hindi",
                "Lohit Punjabi", "Lohit Tamil", "Loma", "Lucida Bright", "Lucida Console", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Lucida Sans", "Luxi Mono", "Luxi Sans",
                "Luxi Serif", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "MS UI Gothic", "MV Boli", "Malgun Gothic", "Mallige", "Mangal", "Marlett", "Meera", "Meiryo UI",
                "Meiryo", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur",
                "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Miriam Fixed", "Miriam", "Mongolian Baiti", "MoolBoran",
                "Mukti Narrow", "NSimSun", "Narkisim", "Nimbus Mono L", "Nimbus Roman No9 L", "Nimbus Sans L", "Norasi", "Nyala", "OpenSymbol", "PMingLiU",
                "PMingLiU-ExtB", "Palatino Linotype", "Phetsarath OT", "Plantagenet Cherokee", "Pothana2000", "Purisa", "Raavi", "Rachana", "Rekha", "Rod", "Saab", "Sakkal Majalla",
                "Sawasdee", "Segoe Print", "Segoe Script", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Segoe UI", "Shonar Bangla", "Shruti", "SimHei", "SimSun",
                "SimSun-ExtB", "Simplified Arabic Fixed", "Simplified Arabic", "Standard Symbols L", "Sylfaen", "Symbol", "Tahoma", "TakaoPGothic", "Times New Roman", "Tlwg Typist",
                "Tlwg Typo", "TlwgMono", "TlwgTypewriter", "Traditional Arabic", "Trebuchet MS", "Tunga", "URW Bookman L", "URW Chancery L", "URW Gothic L", "URW Palladio L",
                "Ubuntu Condensed", "Ubuntu Mono", "Ubuntu", "Umpush", "UnBatang", "UnDotum", "Untitled", "Untitled1", "Utsaah", "Vani", "Vemana2000", "Verdana",
                "Vijaya", "Vrinda", "Waree", "Webdings", "WenQuanYi Micro Hei Mono", "WenQuanYi Micro Hei", "Wingdings", "gargi"
        ];


if(typeof geoLongitude != "undefined" || typeof geoLocation != "undefined") {
    getLocation();
}
window.onload = function() {
    if((typeof deviceFonts != "undefined") && deviceFonts) {
        getFonts();
    }
    sendSession(0);
}

/**
 * Detects the location of the device from which the requests are made.
 * If the location information is sent to the server, call the getLocation() function before the sendSession() function.
 * The following web browsers support the detection of location: Mozilla Firefox, Google Chrome, Opera, Apple Safari, and Microsoft Internet Explorer 9.
 */
function getLocation() {
    if(navigator.geolocation) {
            locationAvailable = true;
        navigator.geolocation.getCurrentPosition(showLocation, showError, {enableHighAccuracy:true,maximumAge:600000,timeout:5000});
    } else {
        locationAvailable = false;
    }
}

function showError(error) {
    locationAvailable = false;
}

function showLocation(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    acc = position.coords.accuracy;
    alt = position.coords.altitude;
}

function getCorrelationID(c_name) {
    var correlationID = "";
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++) {
                x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
                y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
                x=x.replace(/^\s+|\s+$/g,"");
                if (x==c_name) {
                        correlationID = y;
                }
        }
    return correlationID;
}

function populateFontList(fontArr) {
    var allFontsCounter = 0;
    fontList="";
    for (var key in fontArr)
    {
        var fontName = fontArr[key];
        fontName = fontName.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        fontList += fontName + ", ";
    }
    if (fontList.length >= 2) {
        fontList = fontList.substring(0, fontList.length - 2);
    }
}
var ajaxRequest;

/**
 * Makes a POST request to the delegate service.
 * The sendSession() function collects the web browser attributes and sends them to the server for storing in the database.
 * Call this function with the integer value "0" when a user logs in.
 */
function sendSession(timesCalled) {
    if(timesCalled <= 10 && lon == null && locationAvailable && (typeof geoLongitude != "undefined" || typeof geoLocation != null)) {
        setTimeout(function() {sendSession(timesCalled + 1)}, 1000);
    } else {
        if(!submitted){

            submitted = true;

            var jsonObj = {};

            jsonObj['timestamp'] = new Date().getTime();

            if(typeof pageId != "undefined") {
                            jsonObj['pageId'] = pageId;
                    }

            if((typeof screenHeight != "undefined") && screenHeight) {
                jsonObj['screenHeight'] = String(screen.height);
            }
            if((typeof screenWidth != "undefined") && screenWidth) {
                jsonObj['screenWidth'] = String(screen.width);
            }
            if((typeof screenAvailableHeight != "undefined") && screenAvailableHeight) {
                jsonObj['screenAvailableHeight'] = String(screen.availHeight);
            }
            if((typeof screenAvailableWidth != "undefined") && screenAvailableWidth) {
                jsonObj['screenAvailableWidth'] = String(screen.availWidth);
            }
            if((typeof colorDepth != "undefined") && colorDepth) {
                jsonObj['colorDepth'] = String(screen.colorDepth);
            }
            if((typeof deviceLanguage != "undefined") && deviceLanguage) {
                if(navigator.userAgent.toString().indexOf("MSIE") > -1) {
                    jsonObj['deviceLanguage'] = String(navigator.systemLanguage);
                } else {
                    jsonObj['deviceLanguage'] = String(navigator.language);
                }
            }
            if((typeof browserPlugins != "undefined") && browserPlugins) {
                var pluginStr = "";
                // Make sure the array has at least one plugin entry before we check their visibility.
                // When the first plugin returns as 'undefined' it is due to Firefox 53.0 + making browser plugins
                // non-iterable for privacy.
                if (navigator.plugins.length > 0 && navigator.plugins[0] != undefined) {
                    for(var i = 0; i < navigator.plugins.length; i++) {
                        if(i > 0) {
                            pluginStr += ",";
                        }
                        pluginStr += navigator.plugins[i].name;
                    }
                }

                //Prevent return of empty plugin string - causes failure of fingerprint storage
                if (pluginStr == "") {
                    pluginStr = "none";
                }
                jsonObj['browserPlugins'] = String(pluginStr);
            }
            if((typeof devicePlatform != "undefined") && devicePlatform) {
                jsonObj['devicePlatform'] = String(navigator.platform);
            }
            if((typeof geoLatitude != "undefined") && geoLatitude) {
                jsonObj['geoLatitude'] = String(lat);
            }
            if((typeof geoLongitude != "undefined") && geoLongitude) {
                jsonObj['geoLongitude'] = String(lon);
            }
            if((typeof geoLocationAccuracy != "undefined") && geoLocationAccuracy) {
                jsonObj['geoLocationAccuracy'] = String(acc);
            }
            if((typeof geoLocation != "undefined") && geoLocation) {
                jsonObj['geoLocation'] = String(lat) + "," + String(lon) + "," + String(acc);
            }
            if((typeof deviceFonts != "undefined")&& deviceFonts){
                jsonObj['deviceFonts'] = fontList;
            }
            if(window.XMLHttpRequest) {
                ajaxRequest = new XMLHttpRequest();
            } else  {
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            ajaxRequest.open("POST", serviceLocation + "/" + getCorrelationID(cookieName));
            ajaxRequest.onreadystatechange  = handleCookieResponse;
            ajaxRequest.setRequestHeader('Content-Type', 'application/json');
            try{
                ajaxRequest.withCredentials = true;
            }catch(e){
                //IE version does not support this property. eating up exception
            }
            ajaxRequest.send(JSON.stringify(jsonObj));

        }
    }
}

/**
 * Makes a DELETE request for a specified correlation ID.
 * The POST request from the sendSession() returns a correlation ID.
 * Based on the correlation ID, the deleteSession() function deletes the attributes from the database.
 * Call this function when the user logs out or when the current session times out.
 */
function deleteSession() {
    if(window.XMLHttpRequest) {
        ajaxRequest = new XMLHttpRequest();
    } else  {
        ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
        ajaxRequest.open("DELETE", serviceLocation + "/" + getCorrelationID(cookieName), true);
    ajaxRequest.onreadystatechange = handleServerResponse;
    try{
        ajaxRequest.withCredentials = true;
    }catch(e){
        //IE version does not support this property. eating up exception
    }
    ajaxRequest.send(null);
}

var getRequest;

function getSession() {
    if(window.XMLHttpRequest) {
        getRequest = new XMLHttpRequest();
    } else  {
        getRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try{
        ajaxRequest.withCredentials = true;
    }catch(e){
        //IE version does not support this property. eating up exception
    }
        getRequest.open("GET", serviceLocation + "/" + getCorrelationID(cookieName), true);
        getRequest.onreadystatechange = handleInitialResponse;
        //getRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        getRequest.send(null);
}

function handleServerResponse() {
   if (ajaxRequest.readyState == 4) {
     if(ajaxRequest.status == 200) {
//       document.write("<p>" + ajaxRequest.responseText + "</p>"); //Update the HTML Form element
     }
     else {
        alert("Error during AJAX call. Please try again");
     }
   }
}

function handleCookieResponse() {
    if(ajaxRequest.readyState == 4) {
        if(ajaxRequest.status == 200) {
            if(ajaxRequest.responseText.length > 0) {
                generateCookie(ajaxRequest.responseText);
            }
        }
        else {
            //alert("Error during AJAX call");
        }
    }
}

function handleInitialResponse() {
   if (getRequest.readyState == 4) {
     if(getRequest.status == 200) {
       //document.write("<p>" + ajaxRequest.responseText + "</p>"); //Update the HTML Form element
     }
     else {
       //alert("Error during AJAX call. Please try again");
     }
   }
}

function generateCookie(cookieValue) {
    if(window.location.protocol == "https:") {
        document.cookie=cookieName + "=" + cookieValue + ";path=/;secure";
    } else {
        document.cookie=cookieName + "=" + cookieValue + ";path=/";
    }
}

function cookieExists() {
    var cookieList = document.cookie.split(';');
    for(var i = 0; i < cookieList.length; i++) {
        if(cookieList[i].indexOf(cookieName) > -1) {
            return true;
        }
    }
    return false;
}

function getFonts() {
    var div = document.createElement('div');
        div.innerHTML = "The quick brown fox jumps over the lazy dog";
        div.style.cssFloat = "left"; //div width will take up entire screen unless you float it.... this one works on everything but IE
        div.style.styleFloat = "left";  //this is the property that works on IE
        div.style.fontFamily = "sans-serif";
        div.style.height = "auto";
        div.style.width = "auto";
        div.style.visibility = "hidden";

    document.body.appendChild(div);
        var defaultWidth = div.offsetWidth;  //get the height and width of the default font
        var defaultHeight = div.offsetHeight;

    for(var i = 0; i < commonFonts.length; i++) {
        div.style.fontFamily = commonFonts[i] + ", sans-serif";
        var currentHeight = div.offsetHeight;
        var currentWidth = div.offsetWidth;
        if(div.offsetHeight != defaultHeight || div.offsetWidth != defaultWidth) {
            if(fontList == "") {
                fontList += commonFonts[i];
            } else {
                fontList += "," + commonFonts[i];
            }
        } else {
            div.style.fontFamily = "'" + commonFonts[i] + "', serif";
            currentHeight = div.offsetHeight;
            currentWidth = div.offsetWidth;
            if(div.offsetHeight == defaultHeight && div.offsetWidth == defaultWidth) { //if it's still the same size, then it used the named font,
                if(fontList == "") {                                               //instead of the default
                    fontList += commonFonts[i];
                } else {
                    fontList += "," + commonFonts[i];
                }
            }
        }
    }
    document.body.removeChild(div);
}
