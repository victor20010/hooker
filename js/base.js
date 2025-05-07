function loadDexfile(dexfile) {
    Java.perform(function() {
          Java.openClassFile(dexfile).load();
          //console.log("load " + dexfile);
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
        return obj.getName();
    }
    var javaObject = Java.use("java.lang.Object");
    return Java.cast(obj, javaObject).getClass().getName();
}

//str1 содержит str2, str2 может быть регулярным выражением
function contains(str1, str2) {
    var reg = RegExp(eval("/"+str2+"/"));
    if(str1 && str1.match && str1.match(reg)){
        return true;
    }else{
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

function newMethodBeat(text, executor) {
    var threadClz = Java.use("java.lang.Thread");
    var androidLogClz = Java.use("android.util.Log");
    var exceptionClz = Java.use("java.lang.Exception");
    var processClz = Java.use("android.os.Process");
    var currentThread = threadClz.currentThread();
    var beat = new Object();
    beat.invokeId = Math.random().toString(36).slice( - 8);
    beat.executor = executor;
    beat.myPid = processClz.myPid();
    beat.threadId = currentThread.getId();
    beat.threadName = currentThread.getName();
    beat.text = text;
    beat.startTime = new Date().getTime();
    beat.stackInfo = androidLogClz.getStackTraceString(exceptionClz.$new()).substring(20);
    return beat;
};

function printBeat(beat) {
    var str = ("------------pid:" + beat.myPid + ",startFlag:" + beat.invokeId + ",objectHash:"+beat.executor+",thread(id:" + beat.threadId +",name:" + beat.threadName + "),timestamp:" + beat.startTime+"---------------\n");
    str += beat.text + "\n";
    str += beat.stackInfo;
    str += ("------------endFlag:" + beat.invokeId + ",usedtime:" + (new Date().getTime() - beat.startTime) +"---------------\n");
	console.log(str);
};

var log = console.log;

var print = console.log;

function getBaseContext() {
    var currentApplication = Java.use('android.app.ActivityThread').currentApplication();
    var context = currentApplication.getApplicationContext();
    return context; //Java.scheduleOnMainThread(fn):
};

function sleep(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};



// Когда объект Okhttp3Request является post, чтение тела приведет к его потреблению один раз, что приведет к неудаче последующих запросов. В этом случае нам нужно клонировать новый запрос
function printAndCloneOkhttp3Request(ok3ReqObj) {
    var logObj = {};
    // Имя класса
    logObj.class = ok3ReqObj.getClass().getName();
    // URL
    logObj.url = ok3ReqObj.url().toString();
    // Метод
    logObj.method = ok3ReqObj.method();
    // Заголовки запроса
    var headers = {};
    var headerList = ok3ReqObj.headers();
    for (var i = 0; i < headerList.size(); i++) {
        headers[headerList.name(i)] = headerList.value(i);
    }
    logObj.headers = headers;
    // Тег
    var tag = ok3ReqObj.tag();
    logObj.tag = tag ? tag.toString() : null;
    // Клонирование тела запроса
    var body = ok3ReqObj.body();
    var newRequest = null;
    var bodyContent = null;
    if (body) {
        var BufferClz = Java.use("okio.Buffer");
        var buffer = BufferClz.$new();
        body.writeTo(buffer);  // Первое чтение потока
        bodyContent = buffer.readUtf8();  // Сохранение содержимого
        var RequestBodyClz = Java.use("okhttp3.RequestBody");
        var newBody = RequestBodyClz.create(body.contentType(), bodyContent);
        // Клонирование нового тела запроса
        newRequest = ok3ReqObj.newBuilder()
            .method(ok3ReqObj.method(), newBody)
            .build();
    } else {
        newRequest = ok3ReqObj.newBuilder().build();
    }
    logObj.body = bodyContent;
    // Печать в формате JSON
    console.log(JSON.stringify(logObj, null, 4));
    return newRequest;
}

// Чтение тела ответа приведет к его потреблению один раз, что приведет к неудаче последующих программ. В этом случае нам нужно клонировать новый ответ
function printAndCloneOkhttp3Response(ok3ResObj) {
    // Создание данных JSON
    var result = {
        request: {},
        response: {}
    };

    // Получение информации о запросе
    var request = ok3ResObj.request();
    result.request.url = request.url().toString();
    result.request.method = request.method();

    // Заголовки запроса
    var reqHeaders = request.headers();
    var reqHeadersJson = {};
    for (var i = 0; i < reqHeaders.size(); i++) {
        reqHeadersJson[reqHeaders.name(i)] = reqHeaders.value(i);
    }
    result.request.headers = reqHeadersJson;

    // Получение информации о ответе
    result.response.statusCode = ok3ResObj.code();

    var resHeaders = ok3ResObj.headers();
    var resHeadersJson = {};
    for (var i = 0; i < resHeaders.size(); i++) {
        resHeadersJson[resHeaders.name(i)] = resHeaders.value(i);
    }
    result.response.headers = resHeadersJson;
    var newOk3ResObj = ok3ResObj;
    // Чтение тела ответа
    var body = ok3ResObj.body();
    if (body) {
        try {
            var bodyStr = body.string();
            result.response.body = bodyStr;

            // Повторное создание тела для предотвращения потребления содержимого
            var newBody = Java.use("okhttp3.ResponseBody").create(body.contentType(), Java.use("java.lang.String").$new(bodyStr));
            newOk3ResObj = ok3ResObj.newBuilder().body(newBody).build();
        } catch (e) {
            result.response.body = "[!] Не удалось прочитать тело: " + e;
        }
    } else {
        result.response.body = "[!] Нет тела";
    }

    // Форматированный вывод данных JSON
    console.log(JSON.stringify(result, null, 4));
    return newOk3ResObj
}

// loadXRadarDexfile если вы хотите использовать функции fastTojson или storeObjectAndLog  
//loadXRadarDexfile();
