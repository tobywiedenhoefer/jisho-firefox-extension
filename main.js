var windowRefObj = null
var windowPref = "menubar=no,innerWidth=500,innerHeight=500,resizable=yes"

function langCode(lang) {
  switch (lang) {
    case "en":
      return {space: " ", code: "%20"};
    case "ja":
      return {space: "　", code: "%E3%80%80"};
  }
}

function spaceSwitch(txt, lang) {
  var langSpace = langCode(lang);
  while (txt.includes(langSpace.space)) {
    txt.replace(langSpace.space, langSpace.code);
  }
  return txt;
}

function convertString(txt) {
  // Check if the string contains a japanese or english space
  let enCondition = txt.includes(" ");
  let jaCondition = txt.includes("　");
  var newText = text;

  switch(true) {
    case enCondition:
      newText = spaceSwitch(newText, "en")
    case jaCondition:
      newText = spaceSwitch(newtext, "ja")
      break;
  }
  return newText;
};

/*
Create menu button
*/
browser.menus.create({
  id: "jisho-button",
  title: "Search Jisho",
  type: "normal",
  contexts: ["selection"]
});

/*
Create an action for menu button
*/
browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "jisho-button":
      var selected = window.getSelection().toString();
      let condition = selected.includes(" ") || selected.includes("　")

      if (condition) {
        selected = convertString(selected);
      }
      let url = "https://www.jisho.org/search/" + selected;
      windowRefObj = window.open(url, windowPref)
  }
});