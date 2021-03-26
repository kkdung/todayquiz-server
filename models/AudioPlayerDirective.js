
/*
AudioPlayerDirective를 Build해주는 DTO
*/

class AudioPlayerDirective {
    constructor() {
        this.type = 'AudioPlayer.Play'
        this.audioItem = {
            'stream': {
                'url': '',
                'offsetInMilliseconds': 0,
                'progressReport': {
                    'progressReportDelayInMilliseconds': 0,
                    'progressReportIntervalInMilliseconds': 0
                },
                'token': '',
                'expectedPreviousToken': ''
            },
            'metadata': {}
        }
    }
}
//외부에서 여러 빌드를 사용해야하므로 정확히 구분하는 Class Name
//JS 내부 클래스 불가능
module.exports = class AudioPlayerDirectiveBuilder {

    constructor() {
        //this차이
        this.audioPlayerDirective = new AudioPlayerDirective();
    }

    directiveType(type) {
        this.audioPlayerDirective.type = type;
        return this;
    }

    directiveUrl(url) {
        this.audioPlayerDirective.audioItem.stream.url = url;
        return this;
    }

    directiveOffset(offset) {
        this.audioPlayerDirective.audioItem.stream.offsetInMilliseconds = offset;
        return this;
    }

    directiveDelay(delay) {
        this.audioPlayerDirective.audioItem.stream.progressReport.progressReportDelayInMilliseconds = delay;
        return this;
    }

    directiveInterval(interval) {
        this.audioPlayerDirective.audioItem.stream.progressReport.progressReportIntervalInMilliseconds = interval;
        return this;
    }

    directiveToken(token) {
        this.audioPlayerDirective.audioItem.stream.token = token;
        return this;
    }

    directivePreviousToken(previousToken) {
        this.audioPlayerDirective.audioItem.stream.expectedPreviousToken = previousToken;
        return this;
    }
    
    build(){
        return this.audioPlayerDirective
    }
}
