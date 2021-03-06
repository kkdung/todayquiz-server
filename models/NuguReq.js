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
        //this.response = new Response(this.version);

        //fix : lenth check ->         Object.keys(object_1).includes('test_1')
 //supportedInterfaces에서 s를 빼먹은 문제 해결
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
        //예시 : "1번 1번 "  -> 1|1로 값이 넘어옴

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
