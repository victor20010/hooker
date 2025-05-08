# Отказ от ответственности
Все материалы данного проекта предназначены исключительно для обучения и технического обмена, с целью помочь разработчикам понять структуру и принцип работы мобильных приложений.

Проект не содержит никаких операций по взлому конкретных приложений или нарушению авторских прав.
Простые методы распаковки, используемые в некоторых приложениях, широко распространены на различных технических форумах и не наносят реального ущерба этим приложениям.
Проект не предназначен для содействия любым незаконным целям, включая, но не ограничиваясь, обходом защиты авторских прав, изменением функциональности приложений или получением несанкционированных данных.
Пожалуйста, убедитесь, что при использовании инструментов данного проекта вы соблюдаете соответствующие законы и правила и используете их только в личных учебных или исследовательских целях.

### Добро пожаловать в рабочую станцию реверс-инжиниринга hooker

hooker - это набор инструментов для реверс-инжиниринга, основанный на frida. Он предоставляет унифицированный способ управления скриптами для разработчиков реверс-инжиниринга, универсальные скрипты, автоматическую генерацию hook-скриптов, обнаружение activity и service в памяти, frida-версию JustTrustMe, boringssl unpinning для всех приложений.

# Последние обновления
#### [Временное использование hooker js-скриптов на Windows](#6-windows临时使用hooker-js脚本方案)

#### [frida-версия just_trust_me с поддержкой boringssl unpinning](#11-just_trust_mejs)

#### [Автоматическая генерация frida hook-скриптов](#j---生成指定类的hook脚本)

#### [Захват пакетов в памяти с помощью printAndCloneOkhttp3Request(javaObject)](#9-printAndCloneOkhttp3Request)

#### [trace init_proc функции](#13-trace_init_procjs)

#### [Более низкоуровневый способ hookNative функции регистрации](#15-hook_artmethod_registerjs)

#### [Поиск анти-frida so](#16-find_anit_frida_sojs)

#### [Противодействие dlsym версии libmsaoaidsec.so](#18-replace_dlsym_get_pthread_createjs)

#### [Поиск функции проверки boringssl](#19-find_boringssl_custom_verify_funcjs)

#### [Получение информации о устройстве](#20-get_device_infojs)

#### [apk_shell_scanner для проверки оболочки](#21-apk_shell_scannerjs)

# Полезные советы
* Как проверить, является ли функция независимой от среды телефона/пользователя? Возьмите два телефона, войдите в разные аккаунты, если результаты вызова совпадают, значит функция независима от среды.
* В настоящее время (2025-04-09) libmsaoaidsec.so использует динамическую загрузку dlsym для получения указателя на функцию pthread_create, необходимо hook dlsym и напечатать стек для нахождения места вызова.
* Можно использовать lsposed для динамической загрузки dex и запуска службы.
* Unidbg иногда плохо работает, не забывайте о естественной среде выполнения на телефоне.
* MobSF может помочь в анализе отпечатков приложений.
* Самый грубый способ понизить уровень QUIC - заблокировать все UDP-запросы (кроме порта 53) с помощью iptables.

目录
=================

* [hooker环境部署](#环境部署)
    * [1. git clone项目](#1-git-clone项目)
    * [2. 安装依赖](#2-安装依赖)
    * [3. 手机连接adb](#3-手机连接adb)
    * [4. frida-server部署](#4-frida-server部署)
    * [5. 部署之后手机的增强功能](#5-部署之后手机的增强功能)
    * [6. windows临时使用hooker js脚本方案](#6-windows临时使用hooker-js脚本方案)
* [快速开始](#快速开始)
    * [1. 查看可调试进程](#1-查看可调试进程)
    * [2. attach一个应用](#2-attach一个应用)
    * [3. 应用工作目录](#3-应用工作目录)
* [应用工作目录的命令](#应用工作目录的命令)
    * [1. hooking](#1-hooking)
    * [2. attach](#2-attach)
    * [3. spawn](#3-spawn)
    * [4. objection](#4-objection)
    * [5. xinitdeploy](#5-xinitdeploy)
    * [6. kill](#6-kill)
    * [7. disable_sslpinning](#7-disable_sslpinning)
* [应用工作目录的通杀脚本](#应用工作目录的通杀脚本)
    * [1. url.js](#1-urljs)
    * [2. activity_events.js](#2-activity_eventsjs)
    * [3. click.js](#3-clickjs)
    * [4. android_ui.js](#4-android_uijs)
    * [5. keystore_dump.js](#5-keystore_dumpjs)
    * [6. edit_text.js](#6-edit_textjs)
    * [7. text_view.js](#7-text_viewjs)
    * [8. ssl_log.js](#8-ssl_logjs)
    * [9. object_store.js](#9-object_storejs)
    * [10. hook_RN.js](#10-hook_RNjs)
    * [11. just_trust_me.js](#11-just_trust_mejs)
    * [13. trace_iniproc.js](#13-trace_init_procjs)
    * [14. dump_dex.js](#14-dump_dexjs)
    * [15. hook_artmethod_register.js](#15-hook_artmethod_registerjs)
    * [16. find_anit_frida_so.js](#16-find_anit_frida_sojs)
    * [17. hook_jni_method_trace.js](#17-hook_jni_method_tracejs)
    * [18. replace_dlsym_get_pthread_create.js](#18-replace_dlsym_get_pthread_createjs)
    * [19. find_boringssl_custom_verify_func.js](#19-find_boringssl_custom_verify_funcjs)
    * [20. get_device_info.js](#20-get_device_infojs)
    * [21. apk_shell_scanner.js](#21-apk_shell_scannerjs)
* [hooker调试命令行](#hooker调试命令行)
    * [a-打印Activity栈](#a---打印activity栈)
    * [b-打印Service栈](#b---打印Service栈)
    * [c-扫描指定Object](#c---扫描指定Object)
    * [d-展开Object[]、List或Map](#d---%E5%B1%95%E5%BC%80objectlist%E6%88%96map)
    * [v-以View方式查看对象](#v---以view的方式查看对象)
    * [e-检测类在内存中是否存在](#e---检测类在内存中是否存在)
    * [s-正则表达式扫描类](#s---正则表达式扫描类)
    * [j-生成指定类的hook脚本](#j---生成指定类的hook脚本)
    * [k-生成字符串hook脚本](#k---%E7%94%9F%E6%88%90%E5%AD%97%E7%AC%A6%E4%B8%B2hook%E8%84%9A%E6%9C%AC)
* [hooker高级应用](#hooker高级应用)
    * [radar.dex](#radardex)
    * [脚本的内置函数](#脚本的内置函数)
        * [1. loadDexfile(dexfile)](#1-loaddexfiledexfile)
        * [2. checkLoadDex(className，dexfile)](#2-checkloaddexclassname-dexfile)
        * [3. loadXinitDexfile(dexfile)](#3-loadxinitdexfiledexfile)
        * [4. loadXRadarDexfile()](#4-loadxradardexfile)
        * [5. fastTojson(javaObject)](#5-fasttojsonjavaobject)
        * [6. getPrettyString(javaObject)](#6-getprettystringjavaobject)
        * [7. getField(javaObject, fieldName)](#7-getfieldjavaobject-fieldname)
        * [8. storeObjectAndLog(javaObject)](#8-storeobjectandlogjavaobject)
        * [9. printAndCloneOkhttp3Request(javaObject)](#9-printAndCloneOkhttp3Request)
  * [原生ui自动化](#原生ui自动化)
      * [1. startActivity(activityName)](#1-startactivityactivityname)
      * [2. contextStartActivity(activityName)](#1-startactivityactivityname)
      * [3. contextStartActivity(activityName)](#1-startactivityactivityname)
      * [4. home()](#1-startactivityactivityname)
      * [5. back()](#1-startactivityactivityname)
      * [6. finishCurrentActivity()](#1-startactivityactivityname)
      * [7. clickByText(text)](#1-startactivityactivityname)
      * [8. clickById(id)](#1-startactivityactivityname)
      * [9. hover(x,y,upStepLength)](#1-startactivityactivityname)
      * [10. viewTree()](#1-startactivityactivityname)
  * [远程frida支持](#远程frida支持)
* [更新教程](#更新教程)
    * [1. clone最新项目](#1-clone最新项目)
    * [2. 方式一覆盖核心文件到你的hooker](#2-方式一覆盖核心文件到你的hooker)
    * [3. 方式二覆盖你的应用工作目录到最新hooker](#3-方式二覆盖你的应用工作目录到最新hooker)


# 环境部署

### 1. git clone项目
```shell
stephen@ubuntu:~$ git clone https://github.com/CreditTone/hooker.git
stephen@ubuntu:~$ cd hooker
stephen@ubuntu:~$ ls
colorful.py                 com.mokee.aegis              mobile-deploy.tar
com.alibaba.wireless        com.sankuai.meituan          org.mokee.lawnchair
com.changba                 com.sdiread.kt.ktandroid     org.mokee.weatherservice
com.google.android.youtube  com.smile.gifmaker           __pycache__
com.jifen.qukan             com.ss.android.article.news  radar.dex
com.jzg.jzgoto.phone        com.ss.android.ugc.aweme     README.md
com.koudai.weidian.buyer    com.tencent.karaoke          run_env.py
com.kugou.shiqutouch        com.tencent.mm               sogou.mobile.explorer
com.lululemon.shop          hooker                       spider.py
com.meicai.mall             hooker.py                    traceJNI
com.meitu.meipaimv          js                           xapk
com.miui.screenrecorder     mobile-deploy.sh             xinitdeploy.py
```

### 2. 安装依赖
```shell
stephen@ubuntu:~/hooker$ pip3 install -r requirements.txt
```


### 3. 手机连接adb
```shell
stephen@ubuntu:~/hooker$ adb devices
List of devices attached
FA77C0301476	device
```

### 4. frida-server部署
如果 твой телефон уже запущен frida-server, можно пропустить этот шаг.

Внимание: на некоторых телефонах после развертывания могут возникнуть проблемы с подключением adb, в этом случае используйте deploy2.sh.

```shell
stephen@ubuntu:~/hooker$ adb shell #войти в командную строку телефона
sailfish:/ $ su #войти в режим командной строки с правами root
sailfish:/ $ cd /sdcard/mobile-deploy/
sailfish:/ $ sh deploy2.sh                                             
disable android firewall.
start frida-server
deploy successfull.
sailfish:/ $ exit
stephen@ubuntu:~/hooker$ 
```
![Развертывание](assets/hooker-deploy.gif)
***

Внимание: для настройки среды разработки с пользовательским портом frida server необходимо использовать режим host:port, так как по умолчанию usb ищет порт 27042. Поэтому обязательно [измените локальный файл .hooker_driver](#远程frida支持), иначе hooker не сможет работать корректно.

### 5. Дополнительные функции телефона после развертывания
- 1.Запуск frida-server, если ваш телефон на arm64, он будет запускать frida-server arm64 в первую очередь
- 2.Создание файла tools_env.rc в каталоге /data/mobile-deploy, который можно выполнить с помощью команды source /data/mobile-deploy/tools_env.rc для временного создания команд vi, telnet, frpc, tcpforward, ll для удобства разработки, например:
![Развертывание](assets/tools_env.gif)
***
- 3.Запуск сетевого adb, что позволяет подключаться к телефону через удаленный adb. Например: adb connect 192.168.0.105
![Развертывание](assets/remote_adb.gif)
***

### 6. Временное использование hooker js-скриптов на Windows
- Ручное копирование файла radar.dex в каталог /data/user/0/{package}/, adb push radar.dex /data/user/0/{package}/
- Войти в терминал телефона через adb и выполнить команду chmod 777 /data/user/0/{package}/radar.dex
- Если в скрипте есть переменная package_name, измените ее на имя пакета приложения, например, если вы хотите отладить пакет com.xx.xxxxx.xxx.axxme, и используете скрипт just_trust_me.js, то var package_name = "com.xx.xxxxx.xxx.axxme";
- Использование: frida -U -f com.xx.xxxxx.xxx.axxme -l just_trust_me.js
***


# Быстрый старт

### 1. Просмотр доступных для отладки процессов
```shell
stephen@ubuntu:~/hooker$ ./hooker 
  PID  Name                           Identifier                                                   
-----  -----------------------------  -------------------------------------------------------------
 2857  Android Auto                   com.google.android.projection.gearhead                       
 1779  Android Services Library       com.google.android.ext.services                              
  929  Android 系统                     android                                                      
 5073  Carrier Services               com.google.android.ims                                       
11051  Device Health Services         com.google.android.apps.turbo                                
 2913  Device Personalization S…      com.google.android.as                                        
 2522  Google                         com.google.android.googlequicksearchbox                      
15189  Google Play 商店                 com.android.vending                                          
 2101  Google Play 服务                 com.google.android.gms                                       
 2833  Google VR 服务                   com.google.vr.vrcore                                         
 7710  Google 服务框架                    com.google.android.gsf                                       
 2546  NFC服务                          com.android.nfc                                              
  929  NetworkStack                   com.android.networkstack.inprocess                                                                   
  929  一体化位置信息                        com.android.location.fused                                   
14468  云端硬盘                           com.google.android.apps.docs                                 
14403  信息                             com.google.android.apps.messaging                            
12073  存储已屏蔽的号码                       com.android.providers.blockednumber                          
 1574  实时数据壁纸                         com.ustwo.lwp                                                
15637  抖音                             com.ss.android.ugc.aweme                                     
 2480  搜狗输入法                          com.sohu.inputmethod.sogou                                   
12073  用户字典                           com.android.providers.userdictionary                         
13362  电话                             com.google.android.dialer                                    
 1704  电话和短信存储                        com.android.providers.telephony                              
 1704  电话服务                           com.android.phone                                            
11818  知乎                             com.zhihu.android                                            
 1451  系统界面                           com.android.systemui                                         
12424  紧急警报                           com.android.cellbroadcastreceiver                            
12073  联系人存储                          com.android.providers.contacts                               
 1431  蓝牙                             com.android.bluetooth                                        
  929  设置存储                           com.android.providers.settings                               
10149  运营商设置                          com.google.android.wfcactivation                             
14376  通讯录                            com.google.android.contacts                                  
  929  通话管理                           com.android.server.telecom                                   
14807  阿里巴巴                           com.alibaba.wireless                                         
Enter the need to attach package.
: 
```

### 2. Подключение к приложению
```shell
stephen@ubuntu:~/hooker$ ./hooker
  PID  Name                           Identifier                                                   
-----  -----------------------------  -------------------------------------------------------------
15637  抖音                             com.ss.android.ugc.aweme                                     
 2480  搜狗输入法                          com.sohu.inputmethod.sogou                                   
12073  用户字典                           com.android.providers.userdictionary                         
13362  电话                             com.google.android.dialer                                    
 1704  电话和短信存储                        com.android.providers.telephony                              
 1704  电话服务                           com.android.phone                                            
11818  知乎                             com.zhihu.android                                            
 1451  系统界面                           com.android.systemui                                         
12424  紧急警报                           com.android.cellbroadcastreceiver                            
12073  联系人存储                          com.android.providers.contacts                               
 1431  蓝牙                             com.android.bluetooth                                        
  929  设置存储                           com.android.providers.settings                               
10149  运营商设置                          com.google.android.wfcactivation                             
14376  通讯录                            com.google.android.contacts                                  
  929  通话管理                           com.android.server.telecom                                   
14807  阿里巴巴                           com.alibaba.wireless                                         
Enter the need to attach package.
: com.ss.android.ugc.aweme  #введите идентификатор процесса для отладки
It's com.ss.android.ugc.aweme that you have attached app.
--------------------------------------------------
Please enter e, s, j, c or ex command.
a: Discovering activities.
b: Discovering services.
c: Discovering object. eg:'c {objectId}'
d: Object2Explain. eg:'d {objectId}'
v: Discovering view. eg:'v {viewId}'
e: Determines whether a class exists. eg:'e android.app.Application'
s: Discovering classes by a class'regex. eg:'s com.tencent.mm.Message.*'
t: Discovering offspring classes by a class'name. eg:'t com.tencent.mm.BasicActivity'
j: Generating hooked js. eg:'j okhttp3.Request$Builder:build'
k: Generating hooked the string generation js with a keyword. eg:'k {YourKeyword}'
l: Generating hooked the param generation js with a param keyword. eg:'l {YourKeyword}'
m: Discovering so module.
ex: Exit to the upper layer. eg:'ex'
: 
```
##### Подсказка 1: При первой отладке вашего приложения hooker создаст рабочий каталог приложения с именем идентификатора процесса и инициализирует несколько универсальных скриптов.
##### Подсказка 2: При успешном подключении к приложению команда будет приостановлена в ожидании ввода команды отладки. Для использования команд для продвинутой отладки в состоянии паузы перейдите к [hooker调试命令行](#hooker调试命令行)
##### Подсказка 3: При подключении hooker скопирует файл [radar.dex](#radardex) в каталог /data/user/0/{package}/ на телефоне
![](assets/hooker-attach.gif)


### 3. Рабочий каталог приложения
Рабочий каталог приложения предназначен для хранения и управления скриптами frida и быстрыми командами. hooker создаст рабочий каталог приложения при первой отладке и инициализирует несколько универсальных скриптов и быстрых команд.

```shell
stephen@ubuntu:~/hooker/com.ss.android.ugc.aweme$ ls -l
total 784
-rw-rw-r-- 1 stephen stephen   7662 3月  16 20:55 activity_events.js
-rw-rw-r-- 1 stephen stephen   5790 3月  16 20:55 android_ui.js
-rwxrwxrwx 1 stephen stephen    102 8月   3  2020 attach
-rw-rw-r-- 1 stephen stephen   2242 8月   3  2020 click.js
-rw-rw-r-- 1 stephen stephen  12687 3月  23 22:23 com.bytedance.frameworks.core.encrypt.RequestEncryptUtils.js
-rw-rw-r-- 1 stephen stephen   4322 8月   3  2020 edit_text.js
-rwxrwxrwx 1 stephen stephen    159 8月   3  2020 hooking
-rwxrwxrwx 1 stephen stephen    101 8月   3  2020 kill
-rw-rw-r-- 1 stephen stephen 709448 3月  18 22:11 log
-rwxrwxr-x 1 stephen stephen     99 3月  16 20:55 objection
-rw-rw-r-- 1 stephen stephen   1226 3月  16 20:55 object_store.js
-rw-rw-r-- 1 stephen stephen   2553 3月  16 20:55 spider.py
-rw-rw-r-- 1 stephen stephen   2371 8月   3  2020 text_view.js
-rw-rw-r-- 1 stephen stephen   4789 3月  16 20:55 url.js
drwxrwxr-x 2 stephen stephen   4096 3月  25 21:21 xinit
-rwxrwxr-x 1 stephen stephen   5552 3月  16 20:55 xinitdeploy
```

# Команды рабочего каталога приложения

### 1. hooking
Команда hooking требует указания имени скрипта в качестве параметра, например ./hooking url.js. hooking фактически добавляет к традиционному frida attach функцию сохранения вывода hook в файл журнала, что полезно при анализе большого объема логов. Например, если вы hook функцию, которая вызывается очень часто, вы можете открыть файл журнала в текстовом редакторе и медленно анализировать. Пример реализации hooking для рабочего каталога Douyin:

```shell
#!/bin/bash
HOOKER_DRIVER=$(cat ../.hooker_driver)
echo "hooking $1" > log
date | tee -ai log
frida $HOOKER_DRIVER -l $1 com.ss.android.ugc.aweme | tee -ai log
```
![](assets/hooking_log.gif)

### 2. attach
attach аналогичен hooking, но без функции сохранения журнала. Это оригинальная команда frida attach. Например: ./attach android_ui.js. Пример реализации attach для рабочего каталога Douyin:

```shell
#!/bin/bash
HOOKER_DRIVER=$(cat ../.hooker_driver)
frida $HOOKER_DRIVER -l $1 com.ss.android.ugc.aweme
```

### 3. spawn
Запуск скрипта в режиме spawn. Некоторые методы инициализируются при запуске приложения, и для их hook необходимо использовать режим spawn. По умолчанию используется --no-pause, то есть не требуется вручную возобновлять приложение. Если требуется без --no-pause, отредактируйте файл spawn и удалите эту опцию. Пример реализации spawn для рабочего каталога Douyin:

```shell
#!/bin/bash
HOOKER_DRIVER=$(cat ../.hooker_driver)
frida $HOOKER_DRIVER --no-pause -f com.ss.android.ugc.aweme -l $1
```


### 4. objection
Быстрое выполнение команды objection, выполните ./objection. Пример реализации objection для рабочего каталога Douyin:

```shell
#!/bin/bash
HOOKER_DRIVER=$(cat ../.hooker_driver)
objection -d -g com.ss.android.ugc.aweme explore
```
![](assets/objection.gif)

### 5. xinitdeploy
xinitdeploy используется для развертывания ресурсов, он копирует файлы из каталога xinit на телефон в /data/user/0/{packageName}/xinit/. При этом гарантируется, что права пользователя и группы файлов ресурсов совпадают с временным пользователем процесса приложения.
![](assets/xinitdeploy.gif)
![](assets/xinit_files.png)

### 6. kill
./kill завершает основной процесс приложения и все его дочерние процессы

```shell
#!/bin/bash
HOOKER_DRIVER=$(cat ../.hooker_driver)
frida-kill $HOOKER_DRIVER com.ss.android.ugc.aweme
```
![](assets/kill.gif)


### 7. disable_sslpinning
Быстрое отключение ssl pinning, эта команда основана на исходном коде objection и дополняет [frida-версию just_trust_me](#11-just_trust_mejs). Когда just_trust_me не работает, можно использовать disable_sslpinning. И наоборот, используйте [just_trust_me](#11-just_trust_mejs).

![](assets/disable_sslpinning.gif)


# Универсальные скрипты рабочего каталога приложения

### 1. url.js
Для отслеживания генерации url выполните ./hooking url.js
![](assets/hooking_url.gif)


### 2. activity_events.js
Для отслеживания запуска Activity и получения информации об intent и стеке вызовов выполните ./hooking activity_events.js
![](assets/activity_events.gif)

### 3. click.js
Для отслеживания событий клика и получения реального класса View выполните ./hooking click.js. Получив класс, вы можете найти код, связанный с событием, в jadx. Это поможет вам найти ключевую логику. Не обязательно анализировать сетевые запросы, можно использовать разные подходы.
![](assets/click.gif)

### 4. android_ui.js
Содержит функции для работы с нативным Android UI, такие как startActivity(activityName), home(), back(), finishCurrentActivity(), clickByText(text) и другие. Команда используется с attach './attach android_ui.js'. Принцип работы основан на использовании radar.dex в качестве прокси для работы с нативными View Android.
![](assets/android_ui.gif)
***

### 5. keystore_dump.js
В случае двусторонней аутентификации https, дамп клиентского сертификата в формате p12. Местоположение хранения: /data/user/0/{packagename}/client_keystore_{nowtime}.p12 Пароль сертификата: hooker. Принцип работы основан на hook методов getPrivateKey и getCertificate класса java.security.KeyStore, так как клиент вызывает эти методы для отправки сертификата на сервер. Рекомендуется запускать keystore_dump.js в режиме spawn, команда запуска: ./spawn keystore_dump.js. Пример процесса дампа клиентского сертификата для приложения с двусторонней аутентификацией:
![](assets/https_bothway_01.png)
![](assets/https_bothway_02.png)
![](assets/https_bothway_03.png)
![](assets/https_bothway_04.png)

### 6. edit_text.js
Для отслеживания событий getText() EditView и получения реального класса EditView выполните ./hooking edit_text.js. EditView обычно связан с реализацией Search Action, и если вы хотите захватить "поисковый" интерфейс, это поможет вам найти код, связанный с отправкой поискового запроса. Не обязательно анализировать сетевые запросы, можно использовать разные подходы.
![](assets/edit_text.png)

### 7. text_view.js
Для отслеживания методов setText и getText TextView и получения реального класса TextView выполните ./hooking text_view.js. Обычно информация о стеке вызовов setText поможет вам найти логику обработки данных на уровне бизнес-слоя.
![](assets/text_view.png)

### 8. ssl_log.js
Для отслеживания ssl рукопожатия на уровне native и записи CLIENT RANDOM. Захваченные пакеты на уровне канала связи можно расшифровать с помощью файла CLIENT RANDOM. Подробности будут описаны в продвинутом разделе.

### 9. object_store.js
Для работы с объектами, идентифицированными ObjectId, в зависимости от анализа можно выполнять специфическую сериализацию, изменять значения приватных полей объектов и т.д.
Практическая статья: https://bbs.pediy.com/thread-267245.htm

### 10. hook_RN.js
Для динамической регистрации native функций используйте hook_register_natives.js. Рекомендуется запускать в режиме spawn, команда запуска: ./spawn hook_register_natives.js. Если hook_RN.js не может найти native функции, попробуйте [15. hook_artmethod_register.js](#15-hook_artmethod_registerjs)
![](assets/hook_RN.gif)

### 11. just_trust_me.js
frida-версия just_trust_me, поддерживающая boringssl unpinning. Выполните ./spawn just_trust_me.js

Для настройки среды выполнения just_trust_me.js на Windows см. [windows临时使用hooker js脚本方案](#6-windows临时使用hooker-js脚本方案)

Пример запуска just_trust_me.js на примере Twitter:
Запуск
![](assets/strat_just_trust_me.gif)

Пример захвата пакетов
![](assets/just_trust_me_show.gif)


### 12. just_trust_me_okhttp_hook_finder.js
Для поддержки just_trust_me.js в случае обфускации okhttp, помогает найти точки обфускации 
Откройте apk в jadx и найдите okhttp3, например:
![](assets/qutoutiao.png)

Выполните команду ./hooking just_trust_me_okhttp_hook_finder.js для сканирования точек hook
```shell
-----------------------------------------------------------------------
Оригинальное имя класса: okhttp3.CertificatePinner
Обфусцированное имя класса: okhttp3.g


Обфусцированный метод 0:
Оригинальная сигнатура метода: public void okhttp3.CertificatePinner.check(java.lang.String,java.util.List)
Обфусцированная сигнатура метода: public void okhttp3.g.a(java.lang.String,java.util.List) throws javax.net.ssl.SSLPeerUnverifiedException


-----------------------------------------------------------------------
Оригинальное имя класса: okhttp3.OkHttpClient$Builder
Обфусцированное имя класса: okhttp3.OkHttpClient$Builder


Автоматическое определение обфусцированных методов не удалось, откройте okhttp3.OkHttpClient$Builder в jadx для ручного анализа обфусцированных методов
-----------------------------------------------------------------------
Оригинальное имя класса: okhttp3.internal.tls.OkHostnameVerifier
Обфусцированное имя класса: okhttp3.internal.i.d


Обфусцированный метод 0:
Оригинальная сигнатура метода: public boolean okhttp3.internal.tls.OkHostnameVerifier.verify(java.lang.String,javax.net.ssl.SSLSession)
Обфусцированная сигнатура метода: public boolean okhttp3.internal.i.d.verify(java.lang.String,javax.net.ssl.SSLSession)


Обфусцированный метод 1:
Оригинальная сигнатура метода: public boolean okhttp3.internal.tls.OkHostnameVerifier.verify(java.lang.String,java.security.cert.X509Certificate)
Обфусцированная сигнатура метода: public boolean okhttp3.internal.i.d.a(java.lang.String,java.security.cert.X509Certificate)

-----------------------------------------------------------------------
```
На основе результатов выполнения just_trust_me_okhttp_hook_finder.js
Измените точки hook для okhttp3 на обфусцированные классы:

![](assets/okhttp_justhook.png)
Этот коммит: https://github.com/CreditTone/hooker/commit/f47d2068320a58306735a623f12bd955cbd20632

Откройте apk в jadx и найдите okhttp3, например:
![](assets/qutoutiao.png)

### 13. trace_init_proc.js
Реализация hook для функции init_proc может быть сложной, здесь представлен шаблон реализации. Вам нужно дополнить адреса startAddr и endAddr функции init_proc, а также имя модуля somodule, чтобы можно было отслеживать init_proc.
![trace_init_proc.png](assets/trace_init_proc.png)

### 14. dump_dex.js
Выполните ./spawn dump_dex.js для снятия оболочки, подходит для большинства простых оболочек. В среде ART используется dex2oat для компиляции dex, что генерирует native код для каждого java метода, чтобы повысить производительность. Если не удается снять оболочку, удалите все файлы в каталоге /data/app/<package_name>-*/oat/arm64/ и повторите попытку. Если все равно не удается, то, к сожалению, это не получится.
```javascript
MacBook-Pro-32G-2T:com.shxpxx.sg stephen256$ ./spawn dump_dex.js
     ____
    / _  |   Frida 14.2.2 - A world-class dynamic instrumentation toolkit
   | (_| |
    > _  |   Commands:
   /_/ |_|       help      -> Displays the help system
   . . . .       object?   -> Display information about 'object'
   . . . .       exit/quit -> Exit
   . . . .
   . . . .   More info at https://www.frida.re/docs/home/
Spawning `com.shxpxx.sg`...
_ZN3art11ClassLinker11DefineClassEPNS_6ThreadEPKcmNS_6HandleINS_6mirror11ClassLoaderEEERKNS_7DexFileERKNS9_8ClassDefE 0x7521584e08
[DefineClass:] 0x7521584e08
Spawned `com.shxpxx.sg`. Resuming main thread!
[MI MAX 3::com.shxpxx.sg]-> [find dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes.dex
[dump dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes.dex
[find dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes2.dex
[dump dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes2.dex
[find dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes3.dex
[dump dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes3.dex
[find dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes4.dex
[dump dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes4.dex
[find dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes5.dex
[dump dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes5.dex
[find dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes6.dex
[dump dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes6.dex
[find dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes7.dex
[dump dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes7.dex
[find dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes8.dex
[dump dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes8.dex
[find dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes9.dex
[dump dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes9.dex
[find dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes10.dex
[dump dex]: /data/data/com.shxpxx.sg/files/dump_dex_com.shxpxx.sg/classes10.dex
```

### 15. hook_artmethod_register.js
Иногда hook_RN.js не может hook метод RegisterNatives, так как производители реализовали его самостоятельно, и метод был перенесен в ArtMethod.RegisterNative. Сначала выполните ./xinitdeploy для развертывания расширенных so в каталог приложения, затем выполните ./spawn hook_artmethod_register.js для hook метода ArtMethod RegisterNative.

```shell
MacBook-Pro-32G-2T:com.shxpxx.sg stephen256$ ./xinitdeploy
copying libext64.so to path: /data/data/com.shxpxx.sg/libext64.so
copying libext.so to path: /data/data/com.shxpxx.sg/libext.so
deploying xinit finished.
MacBook-Pro-32G-2T:com.shxpxx.sg stephen256$ ./spawn hook_artmethod_register.js
     ____
    / _  |   Frida 14.2.2 - A world-class dynamic instrumentation toolkit
   | (_| |
    > _  |   Commands:
   /_/ |_|       help      -> Displays the help system
   . . . .       object?   -> Display information about 'object'
   . . . .       exit/quit -> Exit
   . . . .
   . . . .   More info at https://www.frida.re/docs/home/
Spawning `com.shxpxx.sg`...
ArtMethod::PrettyMethod is at  0x7521538e60 _ZN3art9ArtMethod12PrettyMethodEb
ArtMethod::RegisterNative is at  0x75215391b0 _ZN3art9ArtMethod14RegisterNativeEPKv
Spawned `com.shxpxx.sg`. Resuming main thread!
[MI MAX 3::com.shxpxx.sg]-> [ArtMethod_RegisterNative] Method_sig: int com.qualcomm.qti.Performance.native_perf_lock_acq(int, int, int[]) module_name: libqti_performance.so offset: 0x19f0
[ArtMethod_RegisterNative] Method_sig: int com.qualcomm.qti.Performance.native_perf_lock_rel(int) module_name: libqti_performance.so offset: 0x1abc
[ArtMethod_RegisterNative] Method_sig: int com.qualcomm.qti.Performance.native_perf_hint(int, java.lang.String, int, int) module_name: libqti_performance.so offset: 0x1ad8
[ArtMethod_RegisterNative] Method_sig: int com.qualcomm.qti.Performance.native_perf_get_feedback(int, java.lang.String) module_name: libqti_performance.so offset: 0x1b90
[ArtMethod_RegisterNative] Method_sig: int com.qualcomm.qti.Performance.native_perf_io_prefetch_start(int, java.lang.String, java.lang.String) module_name: libqti_performance.so offset: 0x1c24
[ArtMethod_RegisterNative] Method_sig: int com.qualcomm.qti.Performance.native_perf_io_prefetch_stop() module_name: libqti_performance.so offset: 0x1e58
[ArtMethod_RegisterNative] Method_sig: int com.qualcomm.qti.Performance.native_perf_uxEngine_events(int, int, java.lang.String, int) module_name: libqti_performance.so offset: 0x1f80
[ArtMethod_RegisterNative] Method_sig: java.lang.String com.qualcomm.qti.Performance.native_perf_uxEngine_trigger(int) module_name: libqti_performance.so offset: 0x2154
[ArtMethod_RegisterNative] Method_sig: void com.tencent.mmkv.MMKV.onExit() module_name: libmmkv.so offset: 0x1717c
[ArtMethod_RegisterNative] Method_sig: java.lang.String com.tencent.mmkv.MMKV.cryptKey() module_name: libmmkv.so offset: 0x17180
[ArtMethod_RegisterNative] Method_sig: boolean com.tencent.mmkv.MMKV.reKey(java.lang.String) module_name: libmmkv.so offset: 0x1727c
[ArtMethod_RegisterNative] Method_sig: void com.tencent.mmkv.MMKV.checkReSetCryptKey(java.lang.String) module_name: libmmkv.so offset: 0x17478
```

### 16. find_anit_frida_so.js
Некоторые приложения могут использовать анти-фрида методы для предотвращения отладки. Этот скрипт помогает найти такие so. Принцип работы заключается в том, что последний загруженный so, после которого приложение падает, является виновником.
![find_anti_frida_so.png](assets/find_anti_frida_so.png)

### 17. hook_jni_method_trace.js
Для отслеживания вызовов методов Java из native кода и определения стека вызовов so. Скрипт содержит много hook точек, вывод может быть запутанным, поэтому его нужно адаптировать под конкретные нужды.

### 18. replace_dlsym_get_pthread_create.js
libmsaoaidsec.so имеет множество версий и широко используется в различных приложениях. В основном их можно разделить на две категории: одна использует got таблицу для импорта функции pthread_create и создания анти-отладочного потока, в этом случае можно просто найти функцию pthread_create в so и заменить ее на NOP в ida. Вторая категория использует dlsym для динамической загрузки библиотеки libc.so и получения указателя на функцию pthread_create, в этом случае можно использовать frida для hook функции dlsym. В будущем производители могут перенести эту функцию в svc или использовать другие so для запуска потоков, тогда мы будем решать эту проблему. Здесь представлен универсальный способ для борьбы с версией libmsaoaidsec.so, использующей dlsym.
![replace_pthread_create.png](assets/replace_pthread_create.png)


### 19. find_boringssl_custom_verify_func.js
Для поиска функции проверки boringssl. boringssl стал умнее, и функция проверки больше не имеет прежних строковых характеристик. Нам нужно hook функцию SSL_CTX_set_custom_verify, чтобы найти функцию проверки, а затем hook ее и принудительно возвращать 0.

Выполните ./spawn find_boringssl_custom_verify_func.js перед этим очистите все данные и кэш приложения, так как некоторые функции регистрируются только один раз.

![find_boringssl_custom_verify.png](assets/find_boringssl_custom_verify.png)

Найдя несколько функций проверки, мы реализуем hook для принудительного возврата 0, например:
![hook_verify.png](assets/hook_verify.png)

Пример захвата пакетов:
![mouyin_capture_33.9.0.png](assets/mouyin_capture_33.9.0.png)

### 20. get_device_info.js
Получение информации о устройстве, включая Android ID, IMEI, FINGERPRINT, установленные приложения, датчики, версию прошивки и многое другое. Используется для быстрого ознакомления с отпечатками устройства.
Откройте любое приложение, подключитесь к отладке и войдите в командную строку attach:
./attach get_device_info.js
![get_device_info_attach.png](assets/get_device_info_attach.png)
Здесь доступны 4 метода, введите любой из них для получения соответствующей информации:
#### getBasicInfo() - получение основной информации о устройстве, включая бренд, производителя, модель, плату, оборудование, версию системы, информацию о памяти, информацию о хранилище, информацию о батарее, Android ID, IMEI, FINGERPRINT и т.д.
#### getInstalledPackages() - получение информации о каждом установленном apk, включая название приложения, имя пакета, является ли системным приложением
#### getSensos() - получение информации о каждом датчике, включая название, производителя, потребление энергии, точность, минимальную задержку и т.д.
#### getSystemInfo() - получение информации о root, времени работы устройства, информации о Java Runtime, информации о ядре, информации о DRM
![get_device_info_functions.png](assets/get_device_info_functions.png)


### 21. apk_shell_scanner.js
Скрипт для проверки оболочки, динамически определяет загруженные общие библиотеки (.so) или файлы с характеристиками. Поддерживает множество популярных типов оболочек, включая: Naga, Aegis, Aegis Enterprise Edition, Bangbang Free Edition, Bangbang Enterprise Edition, 360 Jiagu, Tongfudun, NetQin, Baidu Jiagu, Ali Ju Security, Tencent Jiagu, Tencent Yusecurity, NetEase Yidun, APKProtect, Kiwi Security, Dingxiang Technology, Shanda Jiagu, Rising Jiagu.

./attach apk_shell_scanner.js

Если обнаружена оболочка, будет выведено: This app is protected by {Aegis}.

Если оболочка не обнаружена, будет выведено: This app is not protected or uses an unknown protection scheme.

# Команды отладки hooker

### a - Печать стека Activity
Печать всех экземпляров стека Activity, текущий интерфейс будет первым. Вы можете сразу получить реализацию класса Activity, наследование, реализованные интерфейсы, все значения и методы свойств Activity. В сочетании с jadx анализ интерфейса и внутренних данных Activity будет значительно ускорен. Обратите внимание, что каждому члену Activity hooker присваивает ObjectId, чтобы вы могли использовать команду c для сканирования внутренних членов.
![](assets/a.gif)


### b - Печать стека Service
Печать всех экземпляров стека Service. Аналогично команде a, вы можете получить реализацию класса Service, наследование, реализованные интерфейсы, все значения и методы свойств Service. В сочетании с jadx анализ интерфейса и внутренних данных Service будет значительно ускорен. Обратите внимание, что каждому члену Service hooker присваивает ObjectId, чтобы вы могли использовать команду c для сканирования внутренних членов.
![](assets/b.gif)

### c - Сканирование указанного объекта
Сканирование объекта с указанным ObjectId. Команды a и b сканируют Activity и Service и предоставляют множество подсказок. В сочетании с jadx вы можете обнаружить новые объекты, которые вас интересуют. Используйте команду c для их сканирования, и команда c предоставит новые интересные подсказки (объекты). Следуя этим подсказкам, вы можете найти много интересного.
![](assets/c.gif)

### d - Развертывание Object[], List или Map
Развертывание Object[], List или Map и печать в формате Index/key->value, чтобы получить тип и ObjectId каждого объекта в коллекции. Например, если мы обнаружили, что свойство o является массивом Fragment: 'name:o static:false fromExtends:false type:[Landroidx.fragment.app.Fragment; objectId:tGErGHXLso value:[Landroidx.fragment.app.Fragment;@94023208', мы можем использовать команду d для его развертывания.
![](assets/d.png)

### v - Просмотр объекта в виде View
Просмотр объекта в виде View. Помимо всех функций команды c, команда v сначала преобразует объект в View, а затем получает привязанные к View OnClickListener, OnLongClickListener, OnTouchListener, OnFocusChangeListener, OnEditorActionListener, OnItemClickListener и т.д. Эти объекты также будут полностью исследованы. Например, для свойства: 'name:h static:false fromExtends:false type:com.ttpc.bidding_hall.weight.HomeTabButton viewId:2131297762 objectId:GKuWPZOyY0 value:com.ttpc.bidding_hall.weight.HomeTabButton@227103246' команда v покажет, что HomeTabButton привязан к событию клика com.ttpai.track.g, и вы можете найти этот класс в jadx, чтобы узнать логику обработки этого события. Команда v также может принимать ViewId, но ViewId не всегда существует и не всегда уникален для каждого View, это зависит от реализации Android приложения.
![](assets/v.png)

### e - Проверка наличия класса в памяти
Проверка наличия класса в памяти. В большинстве случаев статически проанализированные классы будут присутствовать в памяти, но иногда приложение может использовать горячее обновление, и класс может быть заменен. Как внимательный инженер по реверс-инжинирингу, перед выполнением операций с классом рекомендуется проверить его наличие в памяти. Например: e com.bytedance.frameworks.encryptor.EncryptorUtil вывод: True означает, что класс существует, False означает, что не существует.
![](assets/exists_class.gif)

### s - Сканирование классов с помощью регулярного выражения
Сканирование классов в памяти с помощью регулярного выражения. Например, если вас интересуют классы с определенными ключевыми словами, вы можете использовать команду s для их сканирования. В сочетании с jadx просмотр кода классов будет удобным. Хотя в jadx есть функция поиска классов, она статическая и требует много памяти, что может быть проблемой на компьютерах с менее чем 32 ГБ оперативной памяти. В таких случаях команда s может быть полезной.
![](assets/s.png)

### j - Генерация hook-скрипта для указанного класса
Генерация hook-скрипта для указанного класса, одна из ключевых функций hooker. В отличие от objection, hooker генерирует скрипты с аннотациями о версии apk и имени класса. Каждый метод внутри скрипта уже содержит функции для печати стека вызовов, времени вызова, идентификатора потока, имени потока, хэш-кода объекта вызова и времени выполнения метода.
![](assets/j0.png)
![](assets/j1.png)
![](assets/j2.png)

### j - Генерация hook-скрипта для указанного метода класса
Генерация hook-скрипта для указанного метода класса, j [class_name]:[method_name]
j java.lang.System:loadLibrary
![](assets/j_method.png)
Пример скрипта:
![j_method_02.png](assets/j_method_02.png)

Сравнение преимуществ генерации скриптов hooker и objection

| Проект        | Команда генерации скрипта   |  Возможность печати стека  |  Включает вспомогательные методы  |  Аннотации о версии скрипта  |  Возможность настройки скрипта  |
| --------   | -----:  | :----:  | :----:  | :----:  | :----:  |
| hooker      | j [class_name] -o [outputpath].js   |   Да     |   Включает     |   Включает версию apk и команду генерации     |   Хорошая     |
| objection        |   android hooking generate simple [class_name]  |   Нет (пустой скрипт)   |   Не включает     |   Не включает     |   Средняя     |

### k - Генерация hook-скрипта для строки
Используйте k 1821053, и в рабочем каталоге приложения будет создан файл str_1821053.js. Если строка содержит ключевое слово 1821053, будет напечатан стек вызовов, где эта строка была сгенерирована. Принцип основан на том, что код Java для конкатенации строк при компиляции преобразуется в StringBuilder с вызовами append.

```java
String url = "http://www.example.com/login?"+ "sign=" + getSign();
```

Этот код при компиляции будет преобразован в:

```java
String url = new StringBuilder("http://www.example.com/login?").append("sign=").append(getSign()).toString();
```

Этот метод может быть похож на грубую силу и значительно замедлять работу приложения, что может привести к его сбоям. Однако, если это поможет получить полезные подсказки, сбои могут быть оправданы. Вы согласны?

hooker高级应用
=================

## radar.dex
В корневом каталоге hooker есть файл radar.dex, который содержит расширенные функции для работы с Java-классами.

## Встроенные функции скриптов
Скрипты являются основой frida, и они должны делать больше, чем просто печатать стек вызовов. Мы также можем изменять значения приватных полей объектов, вызывать методы объектов, патчить dex. Поэтому в каждом скрипте, сгенерированном hooker, я включил функции, которые могут понадобиться для настройки скриптов. Вот описание этих функций.

### 1. loadDexfile(dexfile)
Загружает файл dex в процесс приложения. dexfile - это абсолютный путь к файлу dex на телефоне, перед вызовом этой функции необходимо убедиться, что права пользователя и группы файла позволяют процессу приложения видеть этот файл.

### 2. checkLoadDex(className, dexfile)
Сначала проверяет, существует ли className в памяти, если нет, загружает файл dex в процесс приложения. dexfile - это абсолютный путь к файлу dex на телефоне, перед вызовом этой функции необходимо убедиться, что права пользователя и группы файла позволяют процессу приложения видеть этот файл.

### 3. loadXinitDexfile(dexfile)
Загружает файл dex в процесс приложения. В отличие от loadDexfile и checkLoadDex, эта функция загружает файл dex из каталога /data/user/0/{packageName}/xinit/. Например, если мы хотим загрузить файл patch.dex, развернутый с помощью команды [xinitdeploy](#4-xinitdeploy), просто вызовите loadXinitDexfile("patch.dex"); и файл dex будет инъектирован в процесс приложения. Теперь вы понимаете, зачем нужен [xinitdeploy](#4-xinitdeploy)!

### 4. loadXRadarDexfile()
Загружает файл radar.dex в процесс приложения. radar.dex содержит расширенные функции для работы с Java-объектами, если вы хотите использовать функции fastTojson, getPrettyString, storeObjectAndLog и другие, необходимо вызвать loadXRadarDexfile() при загрузке скрипта.

### 5. fastTojson(javaObject)
Сериализует Java-объект в строку json с использованием fastjson из radar.dex. Эта функция зависит от radar.dex, перед использованием необходимо вызвать loadXRadarDexfile(). Обратите внимание, что loadXRadarDexfile() нужно вызывать только один раз, повторные вызовы не требуются.

### 6. getPrettyString(javaObject)
Аналогично toString(), но если подкласс не реализует метод toString или класс является android.os.Parcelable, что может вызвать исключение из-за рекурсивного вызова, getPrettyString будет использовать формат [className]@[hashCode] для обхода этой проблемы. Эта функция зависит от radar.dex, перед использованием необходимо вызвать loadXRadarDexfile(). Обратите внимание, что loadXRadarDexfile() нужно вызывать только один раз, повторные вызовы не требуются.

### 7. getField(javaObject, fieldName)
Получает значение поля объекта. Эта функция компенсирует недостаток синтаксиса frida, который не поддерживает глубокий доступ к объектам, например this.a.b.c.d. Эта функция зависит от radar.dex, перед использованием необходимо вызвать loadXRadarDexfile(). Обратите внимание, что loadXRadarDexfile() нужно вызывать только один раз, повторные вызовы не требуются.

В frida глубокий доступ к объектам не поддерживается, следующий способ получения объекта вызовет ошибку:
```js
let d = this.a.b.c.d;
```
Поэтому вы можете использовать getField(javaObject, fieldName) для замены этой логики:
```js
let aObj = getField(this, "a");
let bObj = getField(aObj, "b");
let cObj = getField(bObj, "c");
let dObj = getField(cObj, "d");
```

### 8. storeObjectAndLog(javaObject)
Сохраняет объект в кэш объектов и выводит идентификатор кэша объекта. Затем вы можете использовать команду c [objectId] для сканирования объекта, что поможет вам лучше исследовать память. Эта функция зависит от radar.dex, перед использованием необходимо вызвать loadXRadarDexfile(). Обратите внимание, что loadXRadarDexfile() нужно вызывать только один раз, повторные вызовы не требуются.

### 9. printAndCloneOkhttp3Request
Иногда при захвате пакетов вы можете обнаружить, что запросы содержат зашифрованное тело и ответ, и при чтении тела запроса Okhttp3Request в post-запросах вы можете исчерпать его, что приведет к неудаче последующих запросов. В этом случае необходимо клонировать новый запрос. hooker добавляет функцию printAndCloneOkhttp3Request в каждый автоматически сгенерированный hook-скрипт, просто вызовите ее для вывода содержимого запроса.
```javascript
 var com_xxxx_networking_crypto_utils_XXXXHelper_clz_method_a_8315 = com_xxxx_networking_crypto_utils_XXXXXHelper_clz.a.overload('okhttp3.Request', 'java.lang.String');
    com_xxxx_networking_crypto_utils_XXXXXHelper_clz_method_a_8315.implementation = function(v0, v1) {
        var executor = this.hashCode();
        var beatText = 'public final okhttp3.Request com.xxxx.networking.crypto.utils.XXXXXHelper.a(okhttp3.Request,java.lang.String)';
        var beat = newMethodBeat(beatText, executor);
        var newReq = printAndCloneOkhttp3Request(v0);
        var ret = com_xxxx_networking_crypto_utils_XXXXXHelper_clz_method_a_8315.call(this, newReq, v1);
        printBeat(beat);
        return ret;
    };
```
![](assets/printAndCloneOkhttp3Request.png)

## Автоматизация нативного UI
hooker использует реализацию gz.radar.AndroidUI из radar.dex для непосредственного изменения кода приложения и работы с нативными View Android. Этот метод превосходит все сторонние фреймворки автоматизации, так как они основаны на архитектуре C/S, а hooker использует инвазивное изменение кода приложения.

Однако android_ui.js - это всего лишь инструмент для простых операций с UI, для более эффективной работы с UI необходимо разрабатывать патчи, учитывая особенности каждого приложения.

В рабочем каталоге приложения выполните ./attach android_ui.js для входа в командную строку управления UI, вы можете использовать следующие методы:

### 1. startActivity(activityName)
Запускает Activity без передачи intent и action. Например, в апреле 2020 года, когда в WeChat только появилась функция видео, у моего маленького аккаунта не было доступа к этой функции - не было кнопки "Видео". Но это не значит, что я не могу запустить эту функцию. Логика кнопки заключается в вызове метода startActivity, поэтому я реализовал этот метод - принудительно запускает интерфейс поиска видео в WeChat.

```js
startActivity("com.tencent.mm.plugin.finder.search.FinderFeedSearchUI")
```

Однако startActivity не всегда успешен, так как многие Activity требуют определенного intent и action, которые определены в AndroidManifest.xml приложения. Также необходимо учитывать [activity_events.js](#2-activity_eventsjs) для анализа оригинального кода запуска Activity. Например, если я хочу принудительно открыть Activity профиля пользователя, мне нужно передать userid или uid, и знать, как эти данные определены. В этом случае необходимо найти оригинальный код запуска Activity, что и делает [activity_events.js](#2-activity_eventsjs). Например, после анализа я определил, что код для запуска главной страницы автора видео в WeChat должен выглядеть так:

```java
Intent intent = new Intent();
intent.putExtra("finder_username", username);
com.tencent.mm.plugin.finder.g.a aVar = com.tencent.mm.plugin.finder.g.a.pPL;
com.tencent.mm.plugin.finder.g.a.enterFinderProfileUI(Android.getTopActivity(), intent);
```

### 2. contextStartActivity(activityName)
contextStartActivity отличается от startActivity тем, что сначала получает context приложения, а затем вызывает метод startActivity этого context.

### 3. topActivityStartActivity(activityName)
topActivityStartActivity сначала получает экземпляр верхней Activity в стеке, а затем вызывает метод startActivity этого экземпляра. startActivity - это topActivityStartActivity.

### 4. home()
Имитирует нажатие кнопки home.

### 5. back()
Имитирует нажатие кнопки back.

### 6. finishCurrentActivity()
Завершает верхнюю Activity в стеке. Принцип работы заключается в получении экземпляра верхней Activity и вызове метода finish() для его завершения.

### 7. clickByText(text)
Кликает по кнопке, содержащей текст text. Если на экране есть несколько кнопок с текстом text, будет выбрана первая найденная.

### 8. clickById(id)
Кликает по кнопке с указанным id view. Вы можете использовать uiautomatorviewer для просмотра id view, или использовать метод viewTree() для вывода дерева view в формате json и найти нужный элемент. uiautomatorviewer находится в каталоге {AndroidSdk}/tools/bin/.

### 9. hover(x,y,upStepLength)
Скользит по экрану. x и y - координаты нажатия, upStepLength - абсолютное значение шага, указывающее длину скольжения. Если upStepLength положительное, скольжение вверх, если отрицательное - вниз.

### 10. viewTree()
Получает дерево view в формате json.

![](assets/android_ui_view_tree2.gif)
![](assets/android_ui_view_tree.png)
Результат ViewTree см. в [viewTree.json](com.ss.android.ugc.aweme/viewTree.json "viewTree.json")




## Поддержка удаленного frida
В корневом каталоге hooker есть файл .hooker_driver, по умолчанию он содержит -U, что означает подключение к frida-server через usb.
```shell
stephen@ubuntu:~/hooker$ cat .hooker_driver 
-U
```
Если ваш frida-server привязан к 0.0.0.0:27042 и вы хотите подключаться удаленно, вам нужно узнать IP-адрес вашего телефона в локальной сети, например, 192.168.0.105, и изменить файл .hooker_driver следующим образом для глобальной удаленной отладки hooker:
```shell
stephen@ubuntu:~/hooker$ cat .hooker_driver 
-H 192.168.0.105:27042
```


# Обновление
hooker не имеет версий, обновление можно выполнить двумя способами. Рекомендуется обновлять каждую неделю, следуя этим шагам.

### 1. Клонирование последнего проекта
```shell
git clone https://github.com/CreditTone/hooker.git
```
Если клонирование git медленное, вы можете скачать архив https://github.com/CreditTone/hooker/archive/refs/heads/master.zip и распаковать его.

### 2. Способ 1: замена основных файлов в вашем hooker
Этот способ подходит, если у вас есть собственное локальное хранилище hooker, и вы хотите управлять своей версией hooker. Выполните следующие команды для замены основных файлов на последние версии hooker:

```shell
export LATEST_HOOKER=~/Download/hooker #установите каталог последнего hooker
export MY_HOOKER=~/hooker #установите каталог вашего hooker

#после настройки двух переменных окружения, выполните следующие команды
cp -f $LATEST_HOOKER/hooker $MY_HOOKER/hooker
cp -f $LATEST_HOOKER/hooker.py $MY_HOOKER/hooker.py
cp -f $LATEST_HOOKER/radar.dex $MY_HOOKER/radar.dex
cp -f $LATEST_HOOKER/run_env.py $MY_HOOKER/run_env.py
cp -f $LATEST_HOOKER/xinitdeploy.py $MY_HOOKER/xinitdeploy.py
cp -f $LATEST_HOOKER/spider.py $MY_HOOKER/spider.py
cp -f $LATEST_HOOKER/colorful.py $MY_HOOKER/colorful.py
cp -f $LATEST_HOOKER/requirements.txt $MY_HOOKER/requirements.txt
cp -rf $LATEST_HOOKER/js/* $MY_HOOKER/js/
cp -rf $LATEST_HOOKER/mobile-deploy/* $MY_HOOKER/mobile-deploy/
```
### 3. Способ 2: замена рабочего каталога вашего приложения на последний hooker
Если вам не нужно поддерживать свою версию hooker, используйте этот способ. Просто и быстро!

```shell
export LATEST_HOOKER=~/Download/hooker #установите каталог последнего hooker
export MY_HOOKER=~/hooker #установите каталог вашего hooker

#скопируйте все каталоги приложений
cp -rf $MY_HOOKER/{your_app_package} $LATEST_HOOKER/ 
```

hooker实战应用
=================

### ssl_log链路层离线抓包

### objectId的深度理解和灵活应用
https://bbs.pediy.com/thread-267245.htm

### 内存漫游窥视对象内部数据
https://bbs.pediy.com/thread-267245.htm

### 亲测好用的脱壳工具
https://github.com/CodingGay/BlackDex

https://github.com/GuoQiang1993/Frida-Apk-Unpack

https://github.com/hanbinglengyue/FART

### 通信降级案例（亲测有效）
https://blog.csdn.net/qq314000558/article/details/105958847


### End
[1]: https://github.com/frida/frida "frida"
