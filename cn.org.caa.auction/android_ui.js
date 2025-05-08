function loadDexfile(dexfile) {
    Java.perform(function() {
        Java.openClassFile(dexfile).load();
    });
};

function checkLoadDex(className, dexfile) {
    Java.perform(function() {
        if (!classExists(className)) {
            Java.openClassFile(dexfile).load();
            //console.log("load " + dexfile);
        }
    });
};
loadDexfile('/data/user/0/cn.org.caa.auction/radar.dex');
function classExists(className) {
    var exists = false;
    try {
        var clz = Java.use(className);
        exists = true;
    } catch(err) {
        //console.log(err);
    }
    return exists;
};

function getClassName(obj) {
    if (obj.getClass) {
        return obj.getClass().getName();
    }
    var javaObject = Java.use("java.lang.Object");
    return Java.cast(obj, javaObject).getClass().getName();
}

//str1 содержит str2, str2 может быть регулярным выражением
function contains(str1, str2) {
    var reg = RegExp(eval("/" + str2 + "/"));
    if (str1 && str1.match && str1.match(reg)) {
        return true;
    } else {
        return false;
    }
};

//создать объект ArrayList, просто используйте этот метод
function newArrayList() {
    var ArrayListClz = Java.use('java.util.ArrayList');
    return ArrayListClz.$new();
}

//создать объект HashSet, просто используйте этот метод
function newHashSet() {
    var HashSetClz = Java.use('java.util.HashSet');
    return HashSetClz.$new();
}

//создать объект HashMap, просто используйте этот метод
function newHashMap() {
    var HashMapClz = Java.use('java.util.HashMap');
    return HashMapClz.$new();
}

function log(str) {
    console.log(str);
};

//Хотя мы привыкли использовать fastjson для преобразования объекта в строку json за одну строку, библиотека Android имеет встроенный gson, который может это сделать. Просто sdk не раскрывает его, и многие люди не знают об этом. В frida весь код прозрачен, вы можете вызывать его как угодно......
function toJson(javaObject) {
    var gsonClz = Java.use("com.google.gson.Gson");
    var toJsonMethod = gsonClz.toJson.overload("java.lang.Object");
    return toJsonMethod.call(gsonClz.$new(), javaObject);
};

function getBaseContext() {
    var currentApplication = Java.use('android.app.ActivityThread').currentApplication();
    var context = currentApplication.getApplicationContext();
    return context; //Java.scheduleOnMainThread(fn):
};

function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while (new Date().getTime() < startTime) {}
};

function fastTojson(javaObject) {
    var JSONClz = Java.use("gz.com.alibaba.fastjson.JSON");
    return JSONClz.toJSONString(javaObject);
};

function findViewById(viewId) {
    var report = "";
    Java.perform(function() {
        var radarAndroidClz = Java.use("gz.radar.Android");
        var viewInfo = radarAndroidClz.getViewInfo(viewId + "");
        if (!viewInfo) {
            report += "Not Found View."
            return;
        }
        report += ("------------------View--------------------") + "\n";
        report += ("View Id: " + viewInfo.getViewId()) + "\n";
        report += ("View IdName: " + viewInfo.getViewIdName()) + "\n";
        report += ("View Class: " + viewInfo.getName()) + "\n";
        report += ("View SuperClass: " + viewInfo.getSuperClazz()) + "\n";
        report += ("View ImplementInterfaces: " + viewInfo.getImplementInterfaces()) + "\n";
        var androidApkFields = viewInfo.getAndroidApkFields();
        report += ("View Fields: " + androidApkFields.length) + "\n";
        for (var j = 0; j < androidApkFields.length; j++) {
            report += ("\t" + androidApkFields[j].toLine()) + "\n";
        }
        var methods = viewInfo.methods();
        report += ("View Methods: " + methods.length) + "\n";
        for (var j = 0; j < methods.length; j++) {
            report += ("\t" + methods[j]) + "\n";
        }
    });
    log(report);
}

function startActivity(activityName) {
    Java.perform(function() {
        var androidUIClz = Java.use("gz.radar.AndroidUI");
        androidUIClz.startActivity(activityName);
    });
}

function contextStartActivity(activityName) {
    Java.perform(function() {
        var androidUIClz = Java.use("gz.radar.AndroidUI");
        androidUIClz.contextStartActivity(activityName);
    });
}

function contextStartActivityForNewTask(activityName) {
    Java.perform(function() {
        var androidUIClz = Java.use("gz.radar.AndroidUI");
        androidUIClz.contextStartActivityForNewTask(activityName);
    });
}

function topActivityStartActivity(activityName) {
    Java.perform(function() {
        var androidUIClz = Java.use("gz.radar.AndroidUI");
        androidUIClz.topActivityStartActivity(activityName);
    });
}

function home() {
    Java.perform(function() {
        var androidUIClz = Java.use("gz.radar.AndroidUI");
        androidUIClz.home();
    });
}

function back() {
    Java.perform(function() {
        var androidUIClz = Java.use("gz.radar.AndroidUI");
        androidUIClz.back();
    });
}

function finishCurrentActivity() {
    Java.perform(function() {
        var androidUIClz = Java.use("gz.radar.AndroidUI");
        androidUIClz.finishCurrentActivity();
    });
}

function clickByText(text) {
    Java.perform(function() {
        var androidUIClz = Java.use("gz.radar.AndroidUI");
        log(androidUIClz.clickByText(text));
    });
}

function clickById(id) {
    Java.perform(function() {
        var androidUIClz = Java.use("gz.radar.AndroidUI");
        log(androidUIClz.clickById(id));
    });
}

function hover(x,y,upStepLength) {
    Java.perform(function() {
        var androidui = Java.use("gz.radar.AndroidUI");
        androidui.hover(x,y,upStepLength);
    });
}

function viewTree() {
    Java.perform(function() {
        var androidUIClz = Java.use("gz.radar.AndroidUI");
        log(androidUIClz.viewTree());
    });
}
