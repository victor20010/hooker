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

function loadDexfile(dexfile) {
    Java.perform(function() {
        Java.openClassFile(dexfile).load();
        //console.log("load " + dexfile);
    });
};

var loadedXRadar = false;
function loadXRadarDexfile() {
    loadedXRadar = true;
    loadDexfile('/data/user/0/cn.org.caa.auction/radar.dex');
};


loadXRadarDexfile();

function hasTrustManagerImpl() {
    return classExists("com.android.org.conscrypt.TrustManagerImpl");
}

function newArrayList() {
    var ArrayListClz = Java.use('java.util.ArrayList');
    return ArrayListClz.$new();
}


function processOkHttp() {
    //Знаете ли вы, почему JustTrustMe иногда не работает? Потому что код приложения запутан, просто измените его на соответствующий класс и метод.
    if (classExists("com.squareup.okhttp.CertificatePinner")) {
        var squareupOkhttp3CertificatePinnerClz = Java.use('com.squareup.okhttp.CertificatePinner');
        var squareupOkhttp3CertificatePinnerClzCheck = squareupOkhttp3CertificatePinnerClz.check.overload('java.lang.String', 'java.util.List');
        squareupOkhttp3CertificatePinnerClzCheck.implementation = function(v0, v1) {
            //ничего не делать
            console.log("com.squareup.okhttp.CertificatePinner.check('java.lang.String', 'java.util.List') was hooked!");
        };
    }else{
        console.error("Не удалось найти класс com.squareup.okhttp.CertificatePinner, это встроенный класс Android, если не найден, не беспокойтесь. Разные системы разные, не ищите больше!!!");
    }

    if (classExists("okhttp3.CertificatePinner")) {
        try {
            var okhttp3CertificatePinnerClz = Java.use('okhttp3.CertificatePinner');
            var okhttp3CertificatePinnerClzCheck = okhttp3CertificatePinnerClz.check.overload('java.lang.String', 'java.util.List');
            okhttp3CertificatePinnerClzCheck.implementation = function(v0, v1) {
                //ничего не делать
                console.log("okhttp3.CertificatePinner.check('java.lang.String', 'java.util.List') was hooked!");
            };
        } catch (error) {
            console.error("Метод check okhttp3.CertificatePinner может быть запутан. Вы можете восстановить его с помощью jadx!");
        }
    }else{
        console.error("Не удалось найти класс okhttp3.CertificatePinner, возможно, он запутан. Вы можете восстановить его с помощью jadx!");
    }

    if (classExists("okhttp3.internal.tls.OkHostnameVerifier")) {
        try {
            var OkHostnameVerifierClz = Java.use('okhttp3.internal.tls.OkHostnameVerifier');
            var OkHostnameVerifierClzVerify_5791 = OkHostnameVerifierClz.verify.overload('java.lang.String', 'javax.net.ssl.SSLSession');
            OkHostnameVerifierClzVerify_5791.implementation = function(v0, v1) {
                //принудительно возвращать true
                console.log("okhttp3.internal.tls.OkHostnameVerifier.verify('java.lang.String', 'javax.net.ssl.SSLSession') was hooked!");
                return true;
            };
            var OkHostnameVerifierVerify_8978 = OkHostnameVerifierClz.verify.overload('java.lang.String', 'java.security.cert.X509Certificate');
            OkHostnameVerifierVerify_8978.implementation = function(v0, v1) {
                //принудительно возвращать true
                console.log("okhttp3.internal.tls.OkHostnameVerifier.verify('java.lang.String', 'java.security.cert.X509Certificate') was hooked!");
                return true;
            };
        } catch (error) {
            console.error("Метод verify okhttp3.internal.tls.OkHostnameVerifier может быть запутан. Вы можете восстановить его с помощью jadx!");
        }
    }else{
        console.error("Не удалось найти класс okhttp3.internal.tls.OkHostnameVerifier, возможно, он запутан. Вы можете восстановить его с помощью jadx!");
    }

    if (classExists("okhttp3.OkHttpClient$Builder")) {
        try{
            var okhttp3_OkHttpClient_Builder_clz = Java.use('okhttp3.OkHttpClient$Builder');
            var okhttp3_OkHttpClient_Builder_clz_sslSocketFactory_one = okhttp3_OkHttpClient_Builder_clz.sslSocketFactory.overload('javax.net.ssl.SSLSocketFactory');
            okhttp3_OkHttpClient_Builder_clz_sslSocketFactory_one.implementation = function(sSLSocketFactory) {
                //заменить параметр на EmptySSLFactory
                var ret = okhttp3_OkHttpClient_Builder_clz_sslSocketFactory_one.call(this, Java.use("gz.justtrustme.Helper").getEmptySSLFactory());
                return ret;
            };
            var okhttp3_OkHttpClient_Builder_clz_sslSocketFactory_two = okhttp3_OkHttpClient_Builder_clz.sslSocketFactory.overload('javax.net.ssl.SSLSocketFactory', 'javax.net.ssl.X509TrustManager');
            okhttp3_OkHttpClient_Builder_clz_sslSocketFactory_two.implementation = function(sSLSocketFactory, x509TrustManager) {
                //заменить параметр на EmptySSLFactory
                var ret = okhttp3_OkHttpClient_Builder_clz_sslSocketFactory_two.call(this, Java.use("gz.justtrustme.Helper").getEmptySSLFactory(), x509TrustManager);
                return ret;
            };
        } catch(error) {
            console.error("Метод sslSocketFactory okhttp3.OkHttpClient$Builder может быть запутан. Вы можете восстановить его с помощью jadx!");
        }
    }else{
        console.error("Не удалось найти класс okhttp3.OkHttpClient$Builder, возможно, он запутан. Вы можете восстановить его с помощью jadx!");
    }
}


function processXutils() {
    if (classExists("org.xutils.http.RequestParams")) {
        var RequestParamsClass = Java.use("org.xutils.http.RequestParams");
        var RequestParamsClassSetSslSocketFactory = RequestParamsClass.setSslSocketFactory.overload('javax.net.ssl.SSLSocketFactory');
        RequestParamsClassSetSslSocketFactory.implementation = function(v0) {
            console.log("org.xutils.http.RequestParams.setSslSocketFactory('javax.net.ssl.SSLSocketFactory') was hooked!");
            var Helper = Java.use("gz.justtrustme.Helper");
            //заменить параметр javax.net.ssl.SSLSocketFactory на наш EmptySSLFactory
            RequestParamsClassSetSslSocketFactory.call(this, Helper.getEmptySSLFactory());
        };
        var RequestParamsClassSetHostnameVerifier = RequestParamsClass.setHostnameVerifier.overload('javax.net.ssl.HostnameVerifier');
        RequestParamsClassSetHostnameVerifier.implementation = function(v0) {
            console.log("org.xutils.http.RequestParams.setHostnameVerifier('javax.net.ssl.HostnameVerifier') was hooked!");
            var ImSureItsLegitHostnameVerifier = Java.use("gz.justtrustme.ImSureItsLegitHostnameVerifier");
            //заменить параметр javax.net.ssl.HostnameVerifier на наш ImSureItsLegitHostnameVerifier
            RequestParamsClassSetHostnameVerifier.call(this, ImSureItsLegitHostnameVerifier.$new());
        };
    }
}

function processHttpClientAndroidLib() {
    if (classExists("ch.boye.httpclientandroidlib.conn.ssl.AbstractVerifier")) {
        var AbstractVerifierClass = Java.use("ch.boye.httpclientandroidlib.conn.ssl.AbstractVerifier");
        var OkHostnameVerifierClzVerify_5791 = AbstractVerifierClass.verify.overload('java.lang.String', '[Ljava.lang.String;', '[Ljava.lang.String;', 'boolean');
        OkHostnameVerifierClzVerify_5791.implementation = function(v0, v1, v2, v3) {
            //ничего не делать
            console.log("ch.boye.httpclientandroidlib.conn.ssl.AbstractVerifier.verify('java.lang.String', '[Ljava.lang.String;', '[Ljava.lang.String;', 'boolean') was hooked!");
        };
    }else{
        console.error("Не удалось найти класс ch.boye.httpclientandroidlib.conn.ssl.AbstractVerifier, но этот класс редко используется. Не ищите больше!");
    }
}

//Это hooker добавил hook, в оригинальном JustTrustMe его нет
function processConscryptPlatform() {
    if (!classExists("com.android.org.conscrypt.Platform")) {
        return;
    }
    var com_android_org_conscrypt_Platform_clz = Java.use('com.android.org.conscrypt.Platform');
    var com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_9565 = undefined;
    try{
        com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_9565 = com_android_org_conscrypt_Platform_clz.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.OpenSSLEngineImpl');
    }catch(error) {

    }finally{
        if (com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_9565) {
            com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_9565.implementation = function(v0, v1, v2, v3) {
                //ничего не делать
                console.log("static void com.android.org.conscrypt.Platform.checkServerTrusted('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.OpenSSLEngineImpl') was hooked!");
            };
        }
    }
    
    var com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_6928 = undefined;
    try{
        com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_6928 = com_android_org_conscrypt_Platform_clz.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.OpenSSLSocketImpl');
    }catch(error) {

    }finally{
        if (com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_6928) {
           com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_6928.implementation = function(v0, v1, v2, v3) {
                //ничего не делать
                console.log("static void com.android.org.conscrypt.Platform.checkServerTrusted('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.OpenSSLSocketImpl') was hooked!"); 
            }; 
        }
    }
    

    var com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_4651 = undefined;
    try{
        com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_4651 = com_android_org_conscrypt_Platform_clz.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.AbstractConscryptSocket');
    }catch(error) {

    }finally{
        if (com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_4651) {
            com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_4651.implementation = function(v0, v1, v2, v3) {
                console.log("static void com.android.org.conscrypt.Platform.checkServerTrusted(javax.net.ssl.X509TrustManager,java.security.cert.X509Certificate[],java.lang.String,com.android.org.conscrypt.AbstractConscryptSocket) throws java.security.cert.CertificateException was hooked!");
            };
        }
    }

    var com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_6474 = undefined;
    try{
        com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_6474 = com_android_org_conscrypt_Platform_clz.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.ConscryptEngine');
    }catch(error) {

    }finally{
        if (com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_6474) {
            com_android_org_conscrypt_Platform_clz_method_checkServerTrusted_6474.implementation = function(v0, v1, v2, v3) {
               console.log("static void com.android.org.conscrypt.Platform.checkServerTrusted(javax.net.ssl.X509TrustManager,java.security.cert.X509Certificate[],java.lang.String,com.android.org.conscrypt.ConscryptEngine) throws java.security.cert.CertificateException was hooked!"); 
            };
        }
    }
}


//Это hooker добавил hook, в оригинальном JustTrustMe его нет
function processPinningTrustManager() {
    if (!classExists("appcelerator.https.PinningTrustManager")) {
        return;
    }
    var pinningTrustManagerClass = Java.use('appcelerator.https.PinningTrustManager');
    var pinningTrustManagerClass_checkServerTrusted = pinningTrustManagerClass.checkServerTrusted.overload();
    pinningTrustManagerClass_checkServerTrusted.implementation = function() {
        //ничего не делать
    };
}


Java.perform(function() {
    var Helper = Java.use("gz.justtrustme.Helper");
    var DefaultHttpClientClass = Java.use("org.apache.http.impl.client.DefaultHttpClient");
    //изнасилованный конструктор
    var DefaultHttpClientClassRapeConstructor = DefaultHttpClientClass.$init.overload('org.apache.http.conn.ClientConnectionManager', 'org.apache.http.params.HttpParams');
    DefaultHttpClientClassRapeConstructor.implementation = function(v0, v1) {
        //если изнасилованный конструктор вызывается, мы заменяем параметр ClientConnectionManager на наш
        var returnObj = DefaultHttpClientClassRapeConstructor.call(this, Helper.getCCM(v0, v1), v1);
        console.log("org.apache.http.impl.client.DefaultHttpClient.$init('org.apache.http.conn.ClientConnectionManager', 'org.apache.http.params.HttpParams') was hooked!");
        return returnObj;
    };
    var DefaultHttpClientClassInit_1602 = DefaultHttpClientClass.$init.overload();
    DefaultHttpClientClassInit_1602.implementation = function() {
        //использовать DefaultHttpClientClassRapeConstructor для изнасилования
        var returnObj = DefaultHttpClientClassRapeConstructor.call(this, Helper.getSCCM(), null);
        console.log("org.apache.http.impl.client.DefaultHttpClient.$init() was hooked!");
        return returnObj;
    };
    var DefaultHttpClientClassInit_1603 = DefaultHttpClientClass.$init.overload('org.apache.http.params.HttpParams');
    DefaultHttpClientClassInit_1603.implementation = function(v0) {
        //использовать DefaultHttpClientClassRapeConstructor для изнасилования
        var returnObj = DefaultHttpClientClassRapeConstructor.call(this, Helper.getSCCM(), v0);
        console.log("org.apache.http.impl.client.DefaultHttpClient.$init('org.apache.http.params.HttpParams') was hooked!");
        return returnObj;
    };
    //вышеуказанные три конструктора DefaultHttpClient были полностью заменены нами
    var X509TrustManagerExtensionsClass = Java.use('android.net.http.X509TrustManagerExtensions');
    var X509TrustManagerExtensionsClassCheckServerTrusted = X509TrustManagerExtensionsClass.checkServerTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'java.lang.String');
    X509TrustManagerExtensionsClassCheckServerTrusted.implementation = function(certsArr, v1, v2) {
        console.log("android.net.http.X509TrustManagerExtensions.checkServerTrusted('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'java.lang.String') was hooked!");
        return Java.use('java.util.Arrays$ArrayList').$new(certsArr);
    };
    var NetworkSecurityTrustManagerClass = Java.use('android.security.net.config.NetworkSecurityTrustManager');
    var NetworkSecurityTrustManagerClassCheckPins = NetworkSecurityTrustManagerClass.checkPins.overload('java.util.List');
    NetworkSecurityTrustManagerClassCheckPins.implementation = function(v0) {
        //ничего не делать
        console.log("android.security.net.config.NetworkSecurityTrustManager.checkPins('java.util.List') was hooked!");
    };

    //заменить параметры trustmanagers
    var SSLSocketFactory = Java.use('org.apache.http.conn.ssl.SSLSocketFactory');
    var SSLSocketFactoryRapeConstructor = SSLSocketFactory.$init.overload('java.lang.String', 'java.security.KeyStore', 'java.lang.String', 'java.security.KeyStore', 'java.security.SecureRandom', 'org.apache.http.conn.scheme.HostNameResolver');
    SSLSocketFactoryRapeConstructor.implementation = function(v0, v1, v2, v3, v4, v5) {
        var returnObj = SSLSocketFactoryRapeConstructor.call(this, v0, v1, v2, v3, v4, v5);
        console.log("org.apache.http.conn.ssl.SSLSocketFactory.$init('java.lang.String', 'java.security.KeyStore', 'java.lang.String', 'java.security.KeyStore', 'java.security.SecureRandom', 'org.apache.http.conn.scheme.HostNameResolver') was hooked!");
        if (Helper.reInitSSLSocketFactory(this, v0, v1, v2, v3, v4, v5)) {
            console.log("Успешно заменены параметры trustmanagers!");
        }else{
            console.log("Не удалось заменить параметры trustmanagers!"); 
        }
        return returnObj;
    };

    var SSLSocketFactoryGetSocketFactoryMethod = SSLSocketFactory.getSocketFactory.overload();
    var SSLSocketFactoryEmptyConstructor = SSLSocketFactory.$init.overload();
    SSLSocketFactoryGetSocketFactoryMethod.implementation = function() {
        //принудительно использовать пустой конструктор
        console.log("org.apache.http.conn.ssl.SSLSocketFactory.getSocketFactory() was hooked!");
        return SSLSocketFactory.$new();
    };

    var SSLSocketFactoryIsSecure = SSLSocketFactory.isSecure.overload('java.net.Socket');
    SSLSocketFactoryIsSecure.implementation = function(v0) {
        //принудительно возвращать true
        console.log("org.apache.http.conn.ssl.SSLSocketFactory.isSecure('java.net.Socket') was hooked!");
        return true;
    };

    var TrustManagerFactory = Java.use('javax.net.ssl.TrustManagerFactory');
    var TrustManagerFactoryGetTrustManagers = TrustManagerFactory.getTrustManagers.overload();
    TrustManagerFactoryGetTrustManagers.implementation = function() {
        var ret = TrustManagerFactoryGetTrustManagers.call(this);
        //заменить логику метода getTrustManagers
        console.log("javax.net.ssl.TrustManagerFactory.getTrustManagers() was hooked!");
        return Helper.replaceGetTrustManagers(this, ret);
    };

    var HttpsURLConnection = Java.use("javax.net.ssl.HttpsURLConnection");
    var HttpsURLConnectionSetDefaultHostnameVerifier = HttpsURLConnection.setDefaultHostnameVerifier.overload('javax.net.ssl.HostnameVerifier');
    HttpsURLConnectionSetDefaultHostnameVerifier.implementation = function(v0) {
        //ничего не делать
        console.log("javax.net.ssl.HttpsURLConnection.setDefaultHostnameVerifier('javax.net.ssl.HostnameVerifier') was hooked!");
    };

    var HttpsURLConnectionSetHostnameVerifier = HttpsURLConnection.setHostnameVerifier.overload('javax.net.ssl.HostnameVerifier');
    HttpsURLConnectionSetHostnameVerifier.implementation = function(v0) {
        //ничего не делать
        console.log("javax.net.ssl.HttpsURLConnection.setHostnameVerifier('javax.net.ssl.HostnameVerifier') was hooked!");
    };

    var HttpsURLConnectionSetSSLSocketFactory = HttpsURLConnection.setSSLSocketFactory.overload('javax.net.ssl.SSLSocketFactory');
    HttpsURLConnectionSetSSLSocketFactory.implementation = function(v0) {
        //ничего не делать
        console.log("javax.net.ssl.SSLSocketFactory.setSSLSocketFactory('javax.net.ssl.SSLSocketFactory') was hooked!");
    };

    var SSLContextClz = Java.use('javax.net.ssl.SSLContext');
    var SSLContextClzInit = SSLContextClz.init.overload('[Ljavax.net.ssl.KeyManager;', '[Ljavax.net.ssl.TrustManager;', 'java.security.SecureRandom');
    SSLContextClzInit.implementation = function(v0, v1, v2) {
        //принудительно заменить второй параметр на наш небезопасный TrustManagers
        SSLContextClzInit.call(this, v0, Helper.getImSureTrustManagers(), v2);
        console.log("javax.net.ssl.SSLContext.init('[Ljavax.net.ssl.KeyManager;', '[Ljavax.net.ssl.TrustManager;', 'java.security.SecureRandom') was hooked!");
    };

    var ApplicationClz = Java.use('android.app.Application');
    var ApplicationClzAttach = ApplicationClz.attach.overload('android.content.Context');
    ApplicationClzAttach.implementation = function(context) {
        ApplicationClzAttach.call(this, context);
        //обратите внимание, что justTrustMe использует afterHookedMethod, поэтому мы также должны выполнить наш код после вызова оригинального метода
        var classLoader = context.getClassLoader();

    };

    if (hasTrustManagerImpl()) {
        var TrustManagerImplClz = Java.use('com.android.org.conscrypt.TrustManagerImpl');
        var TrustManagerImplCheckServerTrusted_8813 = undefined;
        try{
            TrustManagerImplCheckServerTrusted_8813 = TrustManagerImplClz.checkServerTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'java.lang.String');
        }catch(error){
            //console.error(error + " Не обращайте внимания на эту ошибку!");
        }finally{
            if (TrustManagerImplCheckServerTrusted_8813) {
                TrustManagerImplCheckServerTrusted_8813.implementation = function(v0, v1, v2) {
                console.log("com.android.org.conscrypt.TrustManagerImpl.checkServerTrusted('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'java.lang.String') was hooked!");
                    return newArrayList();
                };
            }
        }
        var TrustManagerImplCheckServerTrusted_7015 = undefined;
        try{
            TrustManagerImplCheckServerTrusted_7015 = TrustManagerImplClz.checkServerTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'javax.net.ssl.SSLSession');
        }catch(error){
            //console.error(error + " Не обращайте внимания на эту ошибку!");
        }finally {
            if (TrustManagerImplCheckServerTrusted_7015) {
                TrustManagerImplCheckServerTrusted_7015.implementation = function(v0, v1, v2) {
                    console.log("com.android.org.conscrypt.TrustManagerImpl.checkServerTrusted('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'javax.net.ssl.SSLSession') was hooked!");
                    return newArrayList();
                };
            }
        }
        var TrustManagerImplCheckTrusted_5587 = undefined;
        try{
            TrustManagerImplCheckTrusted_5587 = TrustManagerImplClz.checkTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'java.lang.String', 'boolean');
        }catch(error){
            //console.error(error + " Не обращайте внимания на эту ошибку!");
        }finally{
            if (TrustManagerImplCheckTrusted_5587) {
                TrustManagerImplCheckTrusted_5587.implementation = function(v0, v1, v2, v3) {
                    console.log("com.android.org.conscrypt.TrustManagerImpl.checkTrusted('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'java.lang.String', 'boolean') was hooked!");
                    return newArrayList();
                };
            }
        }
        var TrustManagerImplCheckTrusted_9999 = undefined;
        try{
            TrustManagerImplCheckTrusted_9999 = TrustManagerImplClz.checkTrusted.overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'javax.net.ssl.SSLSession', 'javax.net.ssl.SSLParameters', 'boolean');
            
        }catch(error){
            //console.error(error + " Не обращайте внимания на эту ошибку!");
        }finally{
            if (TrustManagerImplCheckTrusted_9999) {
                TrustManagerImplCheckTrusted_9999.implementation = function(v0, v1, v2, v3, v4) {
                    console.log("com.android.org.conscrypt.TrustManagerImpl.checkTrusted('[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'javax.net.ssl.SSLSession', 'javax.net.ssl.SSLParameters', 'boolean') was hooked!");
                    return newArrayList();
                };
            }
        }
        var TrustManagerImplCheckTrusted_2872 = undefined;
        try{
            TrustManagerImplCheckTrusted_2872 = TrustManagerImplClz.checkTrusted.overload('[Ljava.security.cert.X509Certificate;', '[B', '[B', 'java.lang.String', 'java.lang.String', 'boolean');
        }catch(error){
            //console.error(error + " Не обращайте внимания на эту ошибку!");
        }finally{
            if (TrustManagerImplCheckTrusted_2872) {
                TrustManagerImplCheckTrusted_2872.implementation = function(v0, v1, v2, v3, v4, v5) {
                    console.log('private java.util.List com.android.org.conscrypt.TrustManagerImpl.checkTrusted(java.security.cert.X509Certificate[],byte[],byte[],java.lang.String,java.lang.String,boolean) throws java.security.cert.CertificateException was hooked!');
                    return newArrayList();
                };
            }
        }
    }

    processOkHttp();
    processXutils();
    processHttpClientAndroidLib();
    //hooker добавил hook
    processConscryptPlatform();
    processPinningTrustManager();
})
