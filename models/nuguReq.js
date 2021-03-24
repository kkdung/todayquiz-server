/*
Req를 파싱해 VO를 json 객체로 표현해 req에 nugu로 추가로 붙여주는 미들웨어
*/

//express에서 사용하기 때문에 (req, res) 받아서 그대로 넘겨준다.
module.exports = (req, res) => {
    //NUGU Request 파싱(Required)
    req.nugu = {
        version : req.body.version,
        actionName : req.body.action.actionName,
        parameters : req.body.action.parameters,
        event : req.body.event,
        context : req.body.context,
        accessToken : req.body.context.session.accessToken,
        sessionId : req.body.context.session.id,
        isNew : req.body.context.session.isNew,
        isPlayBuilderRequest : req.body.context.session.isPlayBuilderRequest,
        deviceType : req.body.context.device.type,
        deviceState : req.body.context.device.state,
    }
    //NUGU 추가 인터페이스 Req 파싱(Optional)
    if (Object.keys(req.body.context.supportedInterfaces).length !== 0) {    
        audioPlayer = req.body.context.supportedInterfaces.AudioPlayer
        //위 req를 기반으로 req.audioPlayer에 추가한다.
        req.nugu.audioPlayer = {
            audioPlayerActivity : audioPlayer.playerActivity,
            audioToken : audioPlayer.token,
            audioOffsetInMilliseconds : audioPlayer.offsetInMilliseconds
        } 
    }
}