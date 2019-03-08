// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"views/SearchResults.js":[function(require,module,exports) {
// Display things
var $ = function $(x) {
  return document.querySelector(x);
};

var englishCell = function englishCell(verses, content) {
  return verses.map(function (v, i) {
    return "<span class=\"verseNumber\">".concat(v % 1000, "</span><span class=\"verseText\">").concat(content[i], "</span>");
  });
};

var hebrewCell = function hebrewCell(verses, content) {
  return verses.map(function (v, i) {
    return "<span class=\"verseNumber\">".concat(v % 1000, "</span><span class=\"verseText\">").concat(hebrewContent(content[i]), "</span>");
  });
};

var hebrewContent = function hebrewContent(text) {
  return text.map(function (accentUnit) {
    return accentUnit.map(function (wbit) {
      if (wbit.hasOwnProperty("temperature")) {
        return "<span class=\"temp".concat(wbit.temperature, "\">").concat(wbit.word).concat(wbit.trailer, "</span>");
      } else {
        return wbit.word + wbit.trailer;
      }
    }).join("");
  }).join("");
};

var resultOutput = function resultOutput(results) {
  var surroundWithFrame = function surroundWithFrame(content) {
    return "<div class=\"resultTable\">".concat(content, "</div>");
  };

  var resultRow = function resultRow(row) {
    return "<div class=\"resultRow\">\n\t\t\t<div class=\"wlc\">".concat(hebrewCell(row.verses, row.verses.map(function (v) {
      return row.text[v].wlc;
    })), "</div>\n\t\t\t<div class=\"net\">").concat(englishCell(row.verses, row.verses.map(function (v) {
      return row.text[v].net;
    })), "</div>\n\t\t</div>");
  };

  var resultTable = results.map(function (r) {
    return resultRow(r);
  }).join("");
  $("#results").innerHTML = surroundWithFrame(resultTable);
};

module.exports = resultOutput;
},{}],"data/search_results.json":[function(require,module,exports) {
module.exports = {
  "reference": {
    "book": "Psalms",
    "chapter": 111
  },
  "text": {
    "190111001": {
      "wlc": [[{
        "wid": 330360,
        "word": "הַ֥לְלוּ",
        "trailer": " "
      }], [{
        "wid": 330361,
        "word": "יָ֨הּ",
        "trailer": "׀ "
      }], [{
        "wid": 330362,
        "word": "אֹודֶ֣ה",
        "trailer": " "
      }], [{
        "wid": 330363,
        "word": "יְ֭הוָה",
        "trailer": " "
      }], [{
        "wid": 330364,
        "word": "בְּ",
        "trailer": ""
      }, {
        "wid": 330365,
        "word": "כָל",
        "trailer": "־"
      }, {
        "wid": 330366,
        "word": "לֵבָ֑ב",
        "trailer": " "
      }], [{
        "wid": 330367,
        "word": "בְּ",
        "trailer": ""
      }, {
        "wid": 330368,
        "word": "סֹ֖וד",
        "trailer": " "
      }], [{
        "wid": 330369,
        "word": "יְשָׁרִ֣ים",
        "trailer": " "
      }], [{
        "wid": 330370,
        "word": "וְ",
        "trailer": ""
      }, {
        "wid": 330371,
        "word": "עֵדָֽה",
        "trailer": "׃ "
      }]],
      "net": "<chunk><poetry><verse>1</verse> Praise the <smallCaps>Lord</smallCaps>!</poetry><poetry>I will give thanks to the <smallCaps>Lord</smallCaps> with my whole heart,</poetry><poetry>in the assembly of the godly and the congregation.</poetry></chunk>",
      "lxx": {
        "Ps 110:1": [{
          "wid": 909512,
          "text": "αλληλουια"
        }, {
          "wid": 909513,
          "text": "ἐξομολογήσομαί"
        }, {
          "wid": 909514,
          "text": "σοι"
        }, {
          "wid": 909515,
          "text": "κύριε"
        }, {
          "wid": 909516,
          "text": "ἐν"
        }, {
          "wid": 909517,
          "text": "ὅλῃ"
        }, {
          "wid": 909518,
          "text": "καρδίᾳ"
        }, {
          "wid": 909519,
          "text": "μου"
        }, {
          "wid": 909520,
          "text": "ἐν"
        }, {
          "wid": 909521,
          "text": "βουλῇ"
        }, {
          "wid": 909522,
          "text": "εὐθείων"
        }, {
          "wid": 909523,
          "text": "καὶ"
        }, {
          "wid": 909524,
          "text": "συναγωγῇ"
        }]
      }
    },
    "190111002": {
      "wlc": [[{
        "wid": 330372,
        "word": "גְּ֭דֹלִים",
        "trailer": " "
      }], [{
        "wid": 330373,
        "word": "מַעֲשֵׂ֣י",
        "trailer": " "
      }], [{
        "wid": 330374,
        "word": "יְהוָ֑ה",
        "trailer": " "
      }], [{
        "wid": 330375,
        "word": "דְּ֝רוּשִׁ֗ים",
        "trailer": " "
      }], [{
        "wid": 330376,
        "word": "לְ",
        "trailer": ""
      }, {
        "wid": 330377,
        "word": "כָל",
        "trailer": "־"
      }, {
        "wid": 330378,
        "word": "חֶפְצֵיהֶֽם",
        "trailer": "׃ "
      }]],
      "net": "<chunk><poetry><verse>2</verse> The <smallCaps>Lord</smallCaps>&#8217;s deeds are great,</poetry><poetry>eagerly awaited by all who desire them.</poetry></chunk>",
      "lxx": {
        "Ps 110:2": [{
          "wid": 909525,
          "text": "μεγάλα"
        }, {
          "wid": 909526,
          "text": "τὰ"
        }, {
          "wid": 909527,
          "text": "ἔργα"
        }, {
          "wid": 909528,
          "text": "κυρίου"
        }, {
          "wid": 909529,
          "text": "ἐξεζητημένα"
        }, {
          "wid": 909530,
          "text": "εἰς"
        }, {
          "wid": 909531,
          "text": "πάντα"
        }, {
          "wid": 909532,
          "text": "τὰ"
        }, {
          "wid": 909533,
          "text": "θελήματα"
        }, {
          "wid": 909534,
          "text": "αὐτοῦ"
        }]
      }
    },
    "190111003": {
      "wlc": [[{
        "wid": 330379,
        "word": "הֹוד",
        "trailer": "־"
      }, {
        "wid": 330380,
        "word": "וְ",
        "trailer": ""
      }, {
        "wid": 330381,
        "word": "הָדָ֥ר",
        "trailer": " "
      }], [{
        "wid": 330382,
        "word": "פָּֽעֳלֹ֑ו",
        "trailer": " "
      }], [{
        "wid": 330383,
        "word": "וְ֝",
        "trailer": ""
      }, {
        "wid": 330384,
        "word": "צִדְקָתֹ֗ו",
        "trailer": " "
      }], [{
        "wid": 330385,
        "word": "עֹמֶ֥דֶת",
        "trailer": " "
      }], [{
        "wid": 330386,
        "word": "לָ",
        "trailer": ""
      }, {
        "wid": 330387,
        "word": "עַֽד",
        "trailer": "׃ "
      }]],
      "net": "<chunk><poetry><verse>3</verse> His work is majestic and glorious,</poetry><poetry>and his faithfulness endures forever.</poetry></chunk>",
      "lxx": {
        "Ps 110:3": [{
          "wid": 909535,
          "text": "ἐξομολόγησις"
        }, {
          "wid": 909536,
          "text": "καὶ"
        }, {
          "wid": 909537,
          "text": "μεγαλοπρέπεια"
        }, {
          "wid": 909538,
          "text": "τὸ"
        }, {
          "wid": 909539,
          "text": "ἔργον"
        }, {
          "wid": 909540,
          "text": "αὐτοῦ"
        }, {
          "wid": 909541,
          "text": "καὶ"
        }, {
          "wid": 909542,
          "text": "ἡ"
        }, {
          "wid": 909543,
          "text": "δικαιοσύνη"
        }, {
          "wid": 909544,
          "text": "αὐτοῦ"
        }, {
          "wid": 909545,
          "text": "μένει"
        }, {
          "wid": 909546,
          "text": "εἰς"
        }, {
          "wid": 909547,
          "text": "τὸν"
        }, {
          "wid": 909548,
          "text": "αἰῶνα"
        }, {
          "wid": 909549,
          "text": "τοῦ"
        }, {
          "wid": 909550,
          "text": "αἰῶνος"
        }]
      }
    },
    "190111004": {
      "wlc": [[{
        "wid": 330388,
        "word": "זֵ֣כֶר",
        "trailer": " "
      }], [{
        "wid": 330389,
        "word": "עָ֭שָׂה",
        "trailer": " "
      }], [{
        "wid": 330390,
        "word": "לְ",
        "trailer": ""
      }, {
        "wid": 330391,
        "word": "נִפְלְאֹתָ֑יו",
        "trailer": " "
      }], [{
        "wid": 330392,
        "word": "חַנּ֖וּן",
        "trailer": " "
      }], [{
        "wid": 330393,
        "word": "וְ",
        "trailer": ""
      }, {
        "wid": 330394,
        "word": "רַח֣וּם",
        "trailer": " "
      }], [{
        "wid": 330395,
        "word": "יְהוָֽה",
        "trailer": "׃ "
      }]],
      "net": "<chunk><poetry><verse>4</verse> He does amazing things that will be remembered;</poetry><poetry>the <smallCaps>Lord</smallCaps> is merciful and compassionate.</poetry></chunk>",
      "lxx": {
        "Ps 110:4": [{
          "wid": 909551,
          "text": "μνείαν"
        }, {
          "wid": 909552,
          "text": "ἐποιήσατο"
        }, {
          "wid": 909553,
          "text": "τῶν"
        }, {
          "wid": 909554,
          "text": "θαυμασίων"
        }, {
          "wid": 909555,
          "text": "αὐτοῦ"
        }, {
          "wid": 909556,
          "text": "ἐλεήμων"
        }, {
          "wid": 909557,
          "text": "καὶ"
        }, {
          "wid": 909558,
          "text": "οἰκτίρμων"
        }, {
          "wid": 909559,
          "text": "ὁ"
        }, {
          "wid": 909560,
          "text": "κύριος"
        }]
      }
    },
    "190111005": {
      "wlc": [[{
        "wid": 330396,
        "word": "טֶ֭רֶף",
        "trailer": " "
      }], [{
        "wid": 330397,
        "word": "נָתַ֣ן",
        "trailer": " "
      }], [{
        "wid": 330398,
        "word": "לִֽ",
        "trailer": ""
      }, {
        "wid": 330399,
        "word": "ירֵאָ֑יו",
        "trailer": " "
      }], [{
        "wid": 330400,
        "word": "יִזְכֹּ֖ר",
        "trailer": " "
      }], [{
        "wid": 330401,
        "word": "לְ",
        "trailer": ""
      }, {
        "wid": 330402,
        "word": "עֹולָ֣ם",
        "trailer": " "
      }], [{
        "wid": 330403,
        "word": "בְּרִיתֹֽו",
        "trailer": "׃ "
      }]],
      "net": "<chunk><poetry><verse>5</verse> He gives food to his faithful followers;</poetry><poetry>he always remembers his covenant.</poetry></chunk>",
      "lxx": {
        "Ps 110:5": [{
          "wid": 909561,
          "text": "τροφὴν"
        }, {
          "wid": 909562,
          "text": "ἔδωκεν"
        }, {
          "wid": 909563,
          "text": "τοῖς"
        }, {
          "wid": 909564,
          "text": "φοβουμένοις"
        }, {
          "wid": 909565,
          "text": "αὐτόν"
        }, {
          "wid": 909566,
          "text": "μνησθήσεται"
        }, {
          "wid": 909567,
          "text": "εἰς"
        }, {
          "wid": 909568,
          "text": "τὸν"
        }, {
          "wid": 909569,
          "text": "αἰῶνα"
        }, {
          "wid": 909570,
          "text": "διαθήκης"
        }, {
          "wid": 909571,
          "text": "αὐτοῦ"
        }]
      }
    },
    "190111006": {
      "wlc": [[{
        "wid": 330404,
        "word": "כֹּ֣חַ",
        "trailer": " "
      }], [{
        "wid": 330405,
        "word": "מַ֭עֲשָׂיו",
        "trailer": " "
      }], [{
        "wid": 330406,
        "word": "הִגִּ֣יד",
        "trailer": " "
      }], [{
        "wid": 330407,
        "word": "לְ",
        "trailer": ""
      }, {
        "wid": 330408,
        "word": "עַמֹּ֑ו",
        "trailer": " "
      }], [{
        "wid": 330409,
        "word": "לָ",
        "trailer": ""
      }, {
        "wid": 330410,
        "word": "תֵ֥ת",
        "trailer": " "
      }], [{
        "wid": 330411,
        "word": "לָ֝הֶ֗ם",
        "trailer": " "
      }], [{
        "wid": 330412,
        "word": "נַחֲלַ֥ת",
        "trailer": " "
      }], [{
        "wid": 330413,
        "word": "גֹּויִֽם",
        "trailer": "׃ "
      }]],
      "net": "<chunk><poetry><verse>6</verse> He announced that he would do mighty deeds for his people,</poetry><poetry>giving them a land that belonged to other nations.</poetry></chunk>",
      "lxx": {
        "Ps 110:6": [{
          "wid": 909572,
          "text": "ἰσχὺν"
        }, {
          "wid": 909573,
          "text": "ἔργων"
        }, {
          "wid": 909574,
          "text": "αὐτοῦ"
        }, {
          "wid": 909575,
          "text": "ἀνήγγειλεν"
        }, {
          "wid": 909576,
          "text": "τῷ"
        }, {
          "wid": 909577,
          "text": "λαῷ"
        }, {
          "wid": 909578,
          "text": "αὐτοῦ"
        }, {
          "wid": 909579,
          "text": "τοῦ"
        }, {
          "wid": 909580,
          "text": "δοῦναι"
        }, {
          "wid": 909581,
          "text": "αὐτοῖς"
        }, {
          "wid": 909582,
          "text": "κληρονομίαν"
        }, {
          "wid": 909583,
          "text": "ἐθνῶν"
        }]
      }
    },
    "190111007": {
      "wlc": [[{
        "wid": 330414,
        "word": "מַעֲשֵׂ֣י",
        "trailer": " "
      }], [{
        "wid": 330415,
        "word": "יָ֭דָיו",
        "trailer": " "
      }], [{
        "wid": 330416,
        "word": "אֱמֶ֣ת",
        "trailer": " "
      }], [{
        "wid": 330417,
        "word": "וּ",
        "trailer": ""
      }, {
        "wid": 330418,
        "word": "מִשְׁפָּ֑ט",
        "trailer": " "
      }], [{
        "wid": 330419,
        "word": "נֶ֝אֱמָנִ֗ים",
        "trailer": " "
      }], [{
        "wid": 330420,
        "word": "כָּל",
        "trailer": "־"
      }, {
        "wid": 330421,
        "word": "פִּקּוּדָֽיו",
        "trailer": "׃ "
      }]],
      "net": "<chunk><poetry><verse>7</verse> His acts are characterized by faithfulness and justice;</poetry><poetry>all his precepts are reliable.</poetry></chunk>",
      "lxx": {
        "Ps 110:7": [{
          "wid": 909584,
          "text": "ἔργα"
        }, {
          "wid": 909585,
          "text": "χειρῶν"
        }, {
          "wid": 909586,
          "text": "αὐτοῦ"
        }, {
          "wid": 909587,
          "text": "ἀλήθεια"
        }, {
          "wid": 909588,
          "text": "καὶ"
        }, {
          "wid": 909589,
          "text": "κρίσις"
        }, {
          "wid": 909590,
          "text": "πισταὶ"
        }, {
          "wid": 909591,
          "text": "πᾶσαι"
        }, {
          "wid": 909592,
          "text": "αἱ"
        }, {
          "wid": 909593,
          "text": "ἐντολαὶ"
        }, {
          "wid": 909594,
          "text": "αὐτοῦ"
        }]
      }
    },
    "190111008": {
      "wlc": [[{
        "wid": 330422,
        "word": "סְמוּכִ֣ים",
        "trailer": " "
      }], [{
        "wid": 330423,
        "word": "לָ",
        "trailer": ""
      }, {
        "wid": 330424,
        "word": "עַ֣ד",
        "trailer": " "
      }], [{
        "wid": 330425,
        "word": "לְ",
        "trailer": ""
      }, {
        "wid": 330426,
        "word": "עֹולָ֑ם",
        "trailer": " "
      }], [{
        "wid": 330427,
        "word": "עֲ֝שׂוּיִ֗ם",
        "trailer": " "
      }], [{
        "wid": 330428,
        "word": "בֶּ",
        "trailer": ""
      }, {
        "wid": 330429,
        "word": "אֱמֶ֥ת",
        "trailer": " "
      }], [{
        "wid": 330430,
        "word": "וְ",
        "trailer": ""
      }, {
        "wid": 330431,
        "word": "יָשָֽׁר",
        "trailer": "׃ "
      }]],
      "net": "<chunk><poetry><verse>8</verse> They are forever firm,</poetry><poetry>and should be faithfully and properly carried out.</poetry></chunk>",
      "lxx": {
        "Ps 110:8": [{
          "wid": 909595,
          "text": "ἐστηριγμέναι"
        }, {
          "wid": 909596,
          "text": "εἰς"
        }, {
          "wid": 909597,
          "text": "τὸν"
        }, {
          "wid": 909598,
          "text": "αἰῶνα"
        }, {
          "wid": 909599,
          "text": "τοῦ"
        }, {
          "wid": 909600,
          "text": "αἰῶνος"
        }, {
          "wid": 909601,
          "text": "πεποιημέναι"
        }, {
          "wid": 909602,
          "text": "ἐν"
        }, {
          "wid": 909603,
          "text": "ἀληθείᾳ"
        }, {
          "wid": 909604,
          "text": "καὶ"
        }, {
          "wid": 909605,
          "text": "εὐθύτητι"
        }]
      }
    },
    "190111009": {
      "wlc": [[{
        "wid": 330432,
        "word": "פְּד֤וּת",
        "trailer": "׀ "
      }], [{
        "wid": 330433,
        "word": "שָׁ֘לַ֤ח",
        "trailer": " "
      }], [{
        "wid": 330434,
        "word": "לְ",
        "trailer": ""
      }, {
        "wid": 330435,
        "word": "עַמֹּ֗ו",
        "trailer": " "
      }], [{
        "wid": 330436,
        "word": "צִוָּֽה",
        "trailer": "־"
      }, {
        "wid": 330437,
        "word": "לְ",
        "trailer": ""
      }, {
        "wid": 330438,
        "word": "עֹולָ֥ם",
        "trailer": " "
      }], [{
        "wid": 330439,
        "word": "בְּרִיתֹ֑ו",
        "trailer": " "
      }], [{
        "wid": 330440,
        "word": "קָדֹ֖ושׁ",
        "trailer": " "
      }], [{
        "wid": 330441,
        "word": "וְ",
        "trailer": ""
      }, {
        "wid": 330442,
        "word": "נֹורָ֣א",
        "trailer": " "
      }], [{
        "wid": 330443,
        "word": "שְׁמֹֽו",
        "trailer": "׃ "
      }]],
      "net": "<chunk><poetry><verse>9</verse> He delivered his people;</poetry><poetry>he ordained that his covenant be observed forever.</poetry><poetry>His name is holy and awesome.</poetry></chunk>",
      "lxx": {
        "Ps 110:9": [{
          "wid": 909606,
          "text": "λύτρωσιν"
        }, {
          "wid": 909607,
          "text": "ἀπέστειλεν"
        }, {
          "wid": 909608,
          "text": "τῷ"
        }, {
          "wid": 909609,
          "text": "λαῷ"
        }, {
          "wid": 909610,
          "text": "αὐτοῦ"
        }, {
          "wid": 909611,
          "text": "ἐνετείλατο"
        }, {
          "wid": 909612,
          "text": "εἰς"
        }, {
          "wid": 909613,
          "text": "τὸν"
        }, {
          "wid": 909614,
          "text": "αἰῶνα"
        }, {
          "wid": 909615,
          "text": "διαθήκην"
        }, {
          "wid": 909616,
          "text": "αὐτοῦ"
        }, {
          "wid": 909617,
          "text": "ἅγιον"
        }, {
          "wid": 909618,
          "text": "καὶ"
        }, {
          "wid": 909619,
          "text": "φοβερὸν"
        }, {
          "wid": 909620,
          "text": "τὸ"
        }, {
          "wid": 909621,
          "text": "ὄνομα"
        }, {
          "wid": 909622,
          "text": "αὐτοῦ"
        }]
      }
    },
    "190111010": {
      "wlc": [[{
        "wid": 330444,
        "word": "רֵ֘אשִׁ֤ית",
        "trailer": " "
      }], [{
        "wid": 330445,
        "word": "חָכְמָ֨ה",
        "trailer": "׀ "
      }], [{
        "wid": 330446,
        "word": "יִרְאַ֬ת",
        "trailer": " "
      }], [{
        "wid": 330447,
        "word": "יְהוָ֗ה",
        "trailer": " "
      }], [{
        "wid": 330448,
        "word": "שֵׂ֣כֶל",
        "trailer": " "
      }], [{
        "wid": 330449,
        "word": "טֹ֖וב",
        "trailer": " "
      }], [{
        "wid": 330450,
        "word": "לְ",
        "trailer": ""
      }, {
        "wid": 330451,
        "word": "כָל",
        "trailer": "־"
      }, {
        "wid": 330452,
        "word": "עֹשֵׂיהֶ֑ם",
        "trailer": " "
      }], [{
        "wid": 330453,
        "word": "תְּ֝הִלָּתֹ֗ו",
        "trailer": " "
      }], [{
        "wid": 330454,
        "word": "עֹמֶ֥דֶת",
        "trailer": " "
      }], [{
        "wid": 330455,
        "word": "לָ",
        "trailer": ""
      }, {
        "wid": 330456,
        "word": "עַֽד",
        "trailer": "׃ "
      }]],
      "net": "<chunk><poetry><verse>10</verse> To obey the <smallCaps>Lord</smallCaps> is the fundamental principle for wise living;</poetry><poetry>all who carry out his precepts acquire good moral insight.</poetry><poetry>He will receive praise forever.</poetry></chunk>",
      "lxx": {
        "Ps 110:10": [{
          "wid": 909623,
          "text": "ἀρχὴ"
        }, {
          "wid": 909624,
          "text": "σοφίας"
        }, {
          "wid": 909625,
          "text": "φόβος"
        }, {
          "wid": 909626,
          "text": "κυρίου"
        }, {
          "wid": 909627,
          "text": "σύνεσις"
        }, {
          "wid": 909628,
          "text": "ἀγαθὴ"
        }, {
          "wid": 909629,
          "text": "πᾶσι"
        }, {
          "wid": 909630,
          "text": "τοῖς"
        }, {
          "wid": 909631,
          "text": "ποιοῦσιν"
        }, {
          "wid": 909632,
          "text": "αὐτήν"
        }, {
          "wid": 909633,
          "text": "ἡ"
        }, {
          "wid": 909634,
          "text": "αἴνεσις"
        }, {
          "wid": 909635,
          "text": "αὐτοῦ"
        }, {
          "wid": 909636,
          "text": "μένει"
        }, {
          "wid": 909637,
          "text": "εἰς"
        }, {
          "wid": 909638,
          "text": "τὸν"
        }, {
          "wid": 909639,
          "text": "αἰῶνα"
        }, {
          "wid": 909640,
          "text": "τοῦ"
        }, {
          "wid": 909641,
          "text": "αἰῶνος"
        }]
      }
    }
  },
  "highlights": {
    "1551991949413": [330363, 330374, 330395, 330447],
    "1551991952006": [330391, 330419, 330442]
  }
};
},{}],"Main.js":[function(require,module,exports) {
var ViewSearchResults = require("/views/SearchResults.js");

var result_data = require("/data/search_results.json");

var $ = function $(x) {
  return document.querySelector(x);
};

var url = function url(queryString) {
  return "https://api.wit.ai/message?v=20170307&verbose=true&q=".concat(queryString);
};

var clickEvent = function clickEvent() {
  var queryString = $(".search").value;
  $("#header").classList.remove("fullheight");
  ViewSearchResults(result_data.results);
  return;
  fetch(url(queryString), {
    headers: new Headers({
      'Authorization': 'Bearer EKHGH2LBZ744Y4QD2FIQ7VUJH45I5NUC',
      'Content-Type': 'application/json'
    })
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    console.log(response.entities);
    $("#header").classList.remove("fullheight");
  });
};

$(".search").addEventListener("keydown", function (e) {
  var event = e ? e : window.event;

  if (e.keyCode == 13
  /*enter*/
  ) {
      clickEvent();
    }
}, false);
},{"/views/SearchResults.js":"views/SearchResults.js","/data/search_results.json":"data/search_results.json"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42951" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","Main.js"], null)
//# sourceMappingURL=/Main.js.map