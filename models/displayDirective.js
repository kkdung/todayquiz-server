/*
FullText1을 위한 display DTO
다 수의 Templet지원하도록 리팩토링 작업 예정
*/
module.exports = class displayDirective {

    constructor(version) {
        this.type = "Display.FullText1"
        this.version = version
        this.playServiceId = ""
        this.token = "";
        this.duration = "";
        this.title = {
            "logo": {
                "contentDescription": "{{contentDescription}}",
                "sources": [
                    {
                        "url": "http://someurl.com/name.png"
                    }
                ]
            },
            "text": {
                "text": "NUGU 백과"
            }
        }

        this.background = {
            "image": {
                "contentDescription": "{{STRING}}",
                "sources": [
                    {
                        "url": "http://someurl.com/name.png",
                        "size": "LARGE"
                    }
                ]
                },
            "color": ""
            }

        this.content = {
            "header": {
                "text": "독도"
            },
            "body": {
                "text": "‘독도’는 동해의 남서부인 울릉도와 오키 제도 사이에 있는 섬으로, 동도와 서도를 포함하고 총 91개의 섬들로 이루어져 있습니다."
            },    
            "footer": {
                "text": "출처 : 위키피디아"
            }
        }

    }

    set directiveType(type) {
        this.type = type;
    }
    set directiveVersion(version) {
        this.version = version;
    }

    set directivePlayServiceId(playServiceId) {
        this.playServiceId = playServiceId;
    }

    set directiveToken(token) {
        this.token = token;
    }
    
    set directiveDuration(duration) {
        this.duration = duration;
    }

    set directiveTitleContentDescription(contentDescription) {
        this.title.logo.contentDescription = contentDescription;
    }

    set directiveTitleUrl(url) {
        this.title.logo.sources[0].url = url;
    }
    
    set directiveTitleText(text) {
        this.title.text.text = text;
    }

    set directiveBackgroundContentDescription(contentDescription) {
        this.background.image.contentDescription = contentDescription;
    }

    set directiveBackgroundUrl(url) {
        this.background.image.sources[0].url = url;
    }
    
    set directiveBackgroundSize(size) {
        this.background.image.sources[0].size = size;
    }
    
    set directiveBackgroundSize(size) {
        this.background.image.sources[0].size = size;
    }
    
    set directiveBackgroundColer(color) {
        this.background.color = color;
    }

    set directiveContentHearderText(text) {
        this.content.header.text = text;
    }

    set directiveContentBodyText(text) {
        this.content.body.text = text;
    }

    set directiveContentFooterText(text) {
        this.content.footer.text = text;
    }    
}//end of class
