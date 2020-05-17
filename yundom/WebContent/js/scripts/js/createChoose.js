function createChoose(parentID, type, _width, _cname, _ctype, _cstring, _important, _originalname) {
    // alert(parentID); alert(type); alert(_width); alert(_cname); alert(_ctype); alert(_cstring); alert(_important);
    var parent = document.getElementById(parentID + "_div");
    var div = document.createElement("div");
    var divLeft = document.createElement("div");
    divLeft.style.float = "left";

    var divRight = document.createElement("div");
    divRight.style.float = "left";
    divRight.style.paddingTop = "0px";

    var aElementID = document.createElement("input");
    aElementID.id = parentID;
    aElementID.name = parentID;
    aElementID.type = "hidden";

    var aElementName = document.createElement("input");
    aElementName.id = parentID + "Name";
    aElementName.name = parentID + "Name";
    aElementName.type = "text";
    if (_important == "true") {
        aElementName.className = "validate[required]";
    }
    aElementName.readOnly = "readonly";
    aElementName.style.width = (document.body.clientWidth * 0.95 * _width - 210) + "px";


    var addBtn = document.createElement("a");
    addBtn.setAttribute("class", "orgAdd");
    addBtn.innerText = "添加";
    addBtn.href = "javascript:void(0)";
    addBtn.onclick = function () {
        if (_ctype == "url") {
            // alert(parentID); alert(_cname); alert(_cstring);
            StableDialog.customControl(parentID, (parentID + "Name"), _cname, _cstring);
        } else if (_ctype == "sql") {
            // alert(_originalname);
            //alert(_cname); alert(_cstring);
            StableDialog.chooseControlSingle(parentID, (parentID + "Name"), $("#DF_TableID").val(), _originalname);
        }
    }

    var delBtn = document.createElement("a");
    delBtn.setAttribute("class", "orgClear");
    delBtn.innerText = "清除";
    delBtn.href = "javascript:void(0)";
    delBtn.onclick = function () {
        $("#" + parentID).val("");
        $("#" + parentID + "Name").val("");
    }

    div.appendChild(divLeft);
    div.appendChild(divRight);
    divLeft.appendChild(aElementID);
    divLeft.appendChild(aElementName);
    divRight.appendChild(addBtn);
    divRight.appendChild(delBtn);
    parent.appendChild(div);
}