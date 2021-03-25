module.exports = class AudioPlayerDirective {
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

    // audio.directiveType('type');
    // audo.directiveType =  'type'; -> set으로 했을경우
    set directiveType(type) {
        this.type = type;
    }

    set directiveUrl(url) {
        this.audioItem.stream.url = url;
    }

    set directiveOffset(offset) {
        this.audioItem.stream.offsetInMilliseconds = offset;
    }

    set directiveDelay(delay) {
        this.audioItem.stream.progressReport.progressReportDelayInMilliseconds = delay;
    }

    set directiveInterval(interval) {
        this.audioItem.stream.progressReport.progressReportIntervalInMilliseconds = interval;
    }

    set directiveToken(token) {
        this.audioItem.stream.token = token;
    }

    set directivePreviousToken(previousToken) {
        this.audioItem.stream.expectedPreviousToken = previousToken;
    }
}