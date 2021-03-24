module.exports = (version) => {
    return {
        version : version,
        resultCode : "OK",
        output : {},
        directives : [],
    
        addDirective(directive){
            this.directives.push(directive)
        },

        addDisplayDirective(display_directive){
            this.directives.push(display_directive)
        }
    }
}

res.json(nugu.response)
res.send('string');

module.exports = {
    type : 'AudioPlayer.Play',
    audioItem : {
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


module.exports = (req, res) => {
    req.nugu = {
        version : req.body.version,
        actionName : req.body.action.actionName,
        
        this.parameters = req.body.action.parameters;
        this.event = req.body.event;
        this.context = req.body.context;
        this.accessToken = req.body.context.session.accessToken;
        this.sessionId = req.body.context.session.id;
        this.isNew = req.body.context.session.isNew;
        this.isPlayBuilderRequest = req.body.context.session.isPlayBuilderRequest;
        this.deviceType = req.body.context.device.type;
        this.deviceState = req.body.context.device.state;
        
        
        this.response = Response(this.version);
        
        addDirective(){
            this.response.addDirective(Directive);
        }
        
        //2
        if (Object.keys(req.body.context.supportedInterfaces).length !== ) {
            this.audioPlayer = req.body.context.supportedInterfaces.AudioPlayer;
            if(this.audioPlayer){
                this.audioPlayerActivity = this.audioPlayer.playerActivity;
                this.audioToken = this.audioPlayer.token;
                this.audioOffset = this.audioPlayer.offsetInMilliseconds;
            }
        }

        if (Object.keys(req.body.context.supportedInterfaces).length !== 0) {
            this.audioPlayer = req.body.context.supportedInterfaces.AudioPlayer;
            if(this.audioPlayer){
                this.audioPlayerActivity = this.audioPlayer.playerActivity;
                this.audioToken = this.audioPlayer.token;
                this.audioOffset = this.audioPlayer.offsetInMilliseconds;
            }
        }
    }
}



{
    "version": "2.0",
    "action": {
        "actionName": "{{string}}",
        "parameters": {
            KEY: {
                "type": "{{string}}",
                "value": VALUE
            }
        }
    },
    "event": {
        "type": "{{string}}"
    },  
    "context": {
        "session": {
            "accessToken": "{{string}}"
        },
        "device": {
            "type": "{{string}}",
            "state": {
                KEY: VALUE
            }
        },
        "supportedInterfaces": {
            "AudioPlayer": {
                "playerActivity": "PLAYING",
                "token": "string value",
                "offsetInMilliseconds": 100000
            },
            "Displayer": {
                "playerActivity": "PLAYING",
                "token": "string value",
                "offsetInMilliseconds": 100000
            }  
        },
        "privatePlay" : { } // reserved
    }
}