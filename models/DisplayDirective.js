/*
FullText1을 위한 display DTO
다 수의 Templet지원하도록 리팩토링 작업 예정
*/
class DisplayDirective {

    constructor(version) {
        this.type = "Display.FullText1"
        this.version = version
        this.playServiceId = ""
        this.token = "";
        // this.duration = "";
        this.title = {
            "logo": {
                //"contentDescription": "{{contentDescription}}",
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

        // this.background = {
        //     "image": {
        //         "contentDescription": "{{STRING}}",
        //         "sources": [
        //             {
        //                 "url": "http://someurl.com/name.png",
        //                 "size": "LARGE"
        //             }
        //         ]
        //         },
        //     "color": ""
        //     }

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

}

module.exports = class DisplayDirectiveBuilder {
    constructor() { 
        displayDirective = new DisplayDirective()
    }

    directiveType(type) {
        this.displayDirective.type = type;
        return this;
    }
    directiveVersion(version) {
        this.displayDirective.version = version;
        return this;
    }

    directivePlayServiceId(playServiceId) {
        this.displayDirective.playServiceId = playServiceId;
        return this;
    }

    directiveToken(token) {
        this.displayDirective.token = token;
        return this;
    }
    
    // directiveDuration(duration) {
    //     this.displayDirective.duration = duration;
    //     return this;
    // }

    directiveTitleContentDescription(contentDescription) {
        this.displayDirective.title.logo.contentDescription = contentDescription;
        return this;
    }

    /*
    sources 부분 클래스로 분리 필요!!!
    */
    directiveTitleUrl(url) {
        this.displayDirective.title.logo.sources[0].url = url;
        return this;
    }
    
    directiveTitleText(text) {
        this.displayDirective.title.text.text = text;
        return this;
    }

    // directiveBackgroundContentDescription(contentDescription) {
    //     this.displayDirective.background.image.contentDescription = contentDescription;
    //     return this;
    // }

    // directiveBackgroundUrl(url) {
    //     this.displayDirective.background.image.sources[0].url = url;
    //     return this;
    // }
    
    // directiveBackgroundSize(size) {
    //     this.displayDirective.background.image.sources[0].size = size;
    //     return this;
    // }
    
    // directiveBackgroundSize(size) {
    //     this.displayDirective.background.image.sources[0].size = size;
    //     return this;
    // }
    
    // directiveBackgroundColer(color) {
    //     this.displayDirective.background.color = color;
    // }

    directiveContentHearderText(text) {
        this.displayDirective.content.header.text = text;
    }

    directiveContentBodyText(text) {
        this.displayDirective.content.body.text = text;
    }

    directiveContentFooterText(text) {
        this.displayDirective.content.footer.text = text;
    }

    build() {
        return this.displayDirective;
    }
}//end of class
