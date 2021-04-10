# 오늘의 퀴즈 - Display.ver(21.03.23)

## 개요

SKT NUGU Play로 서비스 중인 오늘의 퀴즈 Display버전입니다.

T전화로 서비스 확장 요청을 받아 Display interface기능을 업데이트했습니다. 3rd party Play입니다.



### Purpose

----

- NUGU Reference에 맞게 Display기능을 위한 Response 업데이트
- Display환경에 맞게 텍스트 구성(Divece종류별), 데이터 객체화



### Intent

---



![image-20210323142244069](./img/image-20210323142244069.png)



사용자의 발화를 구분하는 Intent입니다. 오늘의 퀴즈는 3개의 intent를 사용합니다.

1. open - 퀴즈시작 발화 (퀴즈 시작해줘, 알려줘 등 )
2. answer - 정답 발화 (3번, 정답 4번 등)
3. repeat - 퀴즈 다시 듣기 (다시 들려줘)





### Action

---



![image-20210323142558369](./img/image-20210323142558369.png)

서버와 요청을 주고받는 Action은 개별로 처리를 해줘야한다. 오늘의 퀴즈 Play는 Audio를 사용해 로직을 진행하기 때문에 플랫폼에서 제공하는 Audio관련 이벤트를 처리해주는 Action이 추가로 작성되었습니다.



오늘의 퀴즈는 특별한 단어나 문장을 사용하지 않기 때문에

플랫폼 빌더에서 Intent와 Action을 작성했다면 그 외에는 기본적인 설정(Backend 서버 URL 등)만 추가로 설정해주면 빌더에서 해야할 작업은 끝난다. 





## BackEnd

작성한 Action과 연동하는 API 서버를 만듭니다. 오늘의 퀴즈를 리소스를 참고해 사용자 요청에 따라 퀴즈 컨텐츠에 관련된 Text와 Audio를 제공해주는 서버입니다. 오늘의 퀴즈 서버는 Node.js로 구현되었습니다.

### Router

```javascript
const express = require('express');
const router = express.Router();
const app = require('../core');

router.post("/common_start", app);
router.post("/openQuiz", app);
router.post("/answerQuiz", app);
router.post("/quiz_sound", app);
router.post("/repeat_answerstate", app);
router.post("/default_finished", app);

module.exports = router;
```

NUGU의 Post요청을 구분해 경로를 지정하는 라우터 코드. 

위 빌더에서 작성한 "Action name"으로 해당 Action을 처리하는 REST API URL 주소가 결정된다.





### Request Body & Response Body

---

요청에는 Requset Body에 JSON형식으로 요청 관련된 데이터가 서버로 요청됩니다. 그럼 백엔드 서버에서는 해당 요청을 처리해 Response를 만들어 응답해야합니다.

#### Request 클래스

```javascript
module.exports = class NuguReq {
    constructor(req) {
        this.version = req.body.version;
        this.actionName = req.body.action.actionName;
        this.parameters = req.body.action.parameters;
        this.event = req.body.event;
        this.context = req.body.context;
        this.accessToken = req.body.context.session.accessToken;
        this.sessionId = req.body.context.session.id;
        this.isNew = req.body.context.session.isNew;
        this.isPlayBuilderRequest = req.body.context.session.isPlayBuilderRequest;
        this.deviceType = req.body.context.device.type;
        this.deviceState = req.body.context.device.state;
      
        if (Object.keys(req.body.context.supportedInterfaces).includes('AudioPlayer')) {
            this.audioPlayer = req.body.context.supportedInterfaces.AudioPlayer;
            if(this.audioPlayer){
                this.audioPlayerActivity = this.audioPlayer.playerActivity;
                this.audioToken = this.audioPlayer.token;
                this.audioOffset = this.audioPlayer.offsetInMilliseconds;
            }
        }
     
        if (Object.keys(req.body.context.supportedInterfaces).includes('Display')) {
        /* Display resquest smaple
        "Display": {
            "version": "1.0",
            "playServiceId": "{{STRING}}",
            "token": "{{STRING}}"
        }
        */
            this.display = req.body.context.supportedInterfaces.Display;
            if(this.display){
                this.displayVersion = this.display.version;
                this.displayPlayServiceId = this.display.playServiceId;
                this.displayToken = this.display.token;
            }
        }

    }

    getValue(value) {
        if (this.parameters[value] === undefined) {
            return undefined
        }
        //TodayQuiz에만 적용 정답길이가 1 이상일 경우 substirng
        if (this.parameters[value].value.length >= 2){
            console.log(this.parameters[value].value.substr(0,1))
            return this.parameters[value].value.substr(0,1);
        }
        return this.parameters[value].value;
    }

    getValueType(value) {
        if (this.parameters[value] === undefined) {
            return undefined
        }
        return this.parameters[value].type;
    }
   
}


```



#### Response 클래스

```javascript
/* 
Builder 패턴으로 Response 세팅 해주는 DTO
*/

class NuguRes {

  constructor() {
    this.version = "";
    this.resultCode = "OK";
    this.output = {};
    this.directives = [];
  }

}

module.exports = class NuguResBuilder {
  constructor() {
    this.nuguRes = new NuguRes();
  }

  version(version) {
    this.nuguRes.version = version;
    return this;
  }

  resultCode(resultCode) {
    this.nuguRes.resultCode = resultCode;
    return this;
  }

  output(output) {
    this.nuguRes.output = output;
    return this;
  }

  //Interface를 사용하는 경우 directive 추가
  addDirective(directive){
    /*
    Directive 관련 함수 - 필요한 Directive list 구조
    */
    this.nuguRes.directives.push(directive)
    return this;
  }
  
  build(){ 
    return this.nuguRes;
  }
}
```



Response객체는 Builder 패턴을 이용. 

directive객체를 분리해 Push해주는 방법으로 상황에 맞게 Audio, Display 추가 가능. 



### TODO

----

- ~~데이터 클래스 추가 & Builder 적용~~

- ~~Divece 종류별 UI 구분~~
- 코드정리

