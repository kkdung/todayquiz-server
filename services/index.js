const NuguReq = require('../models/NuguReq')
const NuguResBuilder = require('../models/NuguRes')

const TodayQuiz = require('../models/TodayQuiz')


//fix2. nuguRes로 통합작업 필요
const AudioPlayerDirectiveBuilder = require('../models/AudioPlayerDirective');
const DisplayDirectiveBuilder = require('../models/DisplayDirective');

function common_start(nuguReq) {
    /*
    퀴즈 시작함수
    */
    try {
        todayQuiz = new TodayQuiz();

        let open_ment = { "nugu_common_openment" : `${todayQuiz.openment} ${todayQuiz.sound_comment}`};
        
        let audioPlayerDirective = new AudioPlayerDirectiveBuilder()
            .directiveType('AudioPlayer.Play')
            .directiveUrl(`https://www.inseop.pe.kr/music/${todayQuiz.sound}.mp3`)
            .directiveToken('quiz_sound')
            .build();
        
    
        
        let displayDirective = new DisplayDirectiveBuilder()
        .directiveType('Display.FullText1')
        .directiveVersion(nuguReq.displayVersion)
        .directivePlayServiceId(nuguReq.sessionId)
        .directiveToken("DisplayToken")
        .directiveTitleUrl("https://www.inseop.pe.kr/logo/todayquiz_logo.png")
        .directiveTitleText("오늘의 퀴즈")
        .directiveContentHearderText("안녕하세요. 오늘의 퀴즈입니다.")
        .directiveContentBodyText(`${todayQuiz.openment} ${todayQuiz.sound_comment}`)
        .directiveContentFooterText(`잠시 후 퀴즈가 나갑니다.`)
        .build()
        
                
        nuguRes = new NuguResBuilder()
        .version(nuguReq.version)
        .resultCode('OK')
        .output(open_ment)
        .addDirective(audioPlayerDirective)
        .addDirective(displayDirective)
        .build();

        //console.log(JSON.parse(JSON.stringify(nuguRes)));
        //console.log(JSON.stringify(nuguRes, null, 4));
        //console.dir(nuguRes,{depth:null})
        return nuguRes

    } catch (e) {
        throw e;
    }
}


function answerQuiz(nuguReq) {
    /*
    User의 Answer와 Quiz Correct의 일치를 확인후 정답 /오답 Prompt를 담는다.
    */

    console.log(JSON.stringify(nuguReq, null, 4));
    
    todayQuiz = new TodayQuiz();
    const userAnswer = nuguReq.getValue("userAnswer");
    let answerMent = {};
    let displayDirective = {}

    if (userAnswer === todayQuiz.correct) {
        answerMent = { "nugu_answerment" : `정답입니다. ${todayQuiz.commentary}` };
        
        displayDirective = new DisplayDirectiveBuilder()
        .directiveType('Display.FullText1')
        .directiveVersion(nuguReq.displayVersion)
        .directivePlayServiceId(nuguReq.sessionId)
        .directiveToken("DisplayToken")
        .directiveTitleUrl("https://www.inseop.pe.kr/logo/todayquiz_logo.png")
        .directiveTitleText("오늘의 퀴즈")
        .directiveContentHearderText("정답입니다!")
        .directiveContentBodyText(`${todayQuiz.commentary}`)
        .build()
    }
    else {

        displayDirective = new DisplayDirectiveBuilder()
        .directiveType('Display.FullText1')
        .directiveVersion(nuguReq.displayVersion)
        .directivePlayServiceId(nuguReq.sessionId)
        .directiveToken("DisplayToken")
        .directiveTitleUrl("https://www.inseop.pe.kr/logo/todayquiz_logo.png")
        .directiveTitleText("오늘의 퀴즈")
        .directiveContentHearderText("이런 틀렸어요...")
        .directiveContentBodyText(`${todayQuiz.commentary}`)
        .build()

        switch (todayQuiz.correct) {
            case '1' || 1:
                answerMent = { "nugu_answerment" : `이런 틀렸어요. 정답은 ${todayQuiz.correct}번, ${todayQuiz.choice1}입니다. ${todayQuiz.commentary}` };
    
                break;
            case '2' || 2:
                answerMent = { "nugu_answerment" : `이런 틀렸어요. 정답은 ${todayQuiz.correct}번, ${todayQuiz.choice2}입니다. ${todayQuiz.commentary}` };
    
                break;
            case '3' || 3:
                answerMent = { "nugu_answerment" : `이런 틀렸어요. 정답은 ${todayQuiz.correct}번, ${todayQuiz.choice3}입니다. ${todayQuiz.commentary}` };
    
                break;
            case '4' || 4:
                answerMent = { "nugu_answerment" : `이런 틀렸어요. 정답은 ${todayQuiz.correct}번, ${todayQuiz.choice4}입니다. ${todayQuiz.commentary}` };
                break;
        }
    }
    
    nuguRes = new NuguResBuilder()
    .version(nuguReq.version)
    .resultCode('OK')
    .output(answerMent)
    .addDirective(displayDirective)
    .build();

    return nuguRes
}

function quizSound(nuguReq) {
    todayQuiz = new TodayQuiz();
    let nugu_todayquiz = {'nugu_todayquiz' : ` ${todayQuiz.question}. 1번, ${todayQuiz.choice1}. 2번, ${todayQuiz.choice2}. 3번, ${todayQuiz.choice3}. 4번, ${todayQuiz.choice4}. `};
    
    //T전화 디바이스 타입
    let displayDirective = {}
    if (nuguReq.deviceType == "app.nugu.agent"){
        displayDirective = new DisplayDirectiveBuilder()
        .directiveType('Display.FullText1')
        .directiveVersion(nuguReq.displayVersion)
        .directivePlayServiceId(nuguReq.sessionId)
        .directiveToken("DisplayToken")
        .directiveTitleUrl("https://www.inseop.pe.kr/logo/todayquiz_logo.png")
        .directiveTitleText("오늘의 퀴즈")
        .directiveContentHearderText("오늘의 퀴즈를 알려드릴게요.")
        .directiveContentBodyText(`${todayQuiz.question} \n\n1번. ${todayQuiz.choice1}\n2번. ${todayQuiz.choice2}\n3번. ${todayQuiz.choice3}\n4번. ${todayQuiz.choice4}\n`)
        .directiveContentFooterText(`정답을 숫자로 말씀해주세요.`)
        .build()

    }
    else {
        displayDirective = new DisplayDirectiveBuilder()
        .directiveType('Display.FullText1')
        .directiveVersion(nuguReq.displayVersion)
        .directivePlayServiceId(nuguReq.sessionId)
        .directiveToken("DisplayToken")
        .directiveTitleUrl("https://www.inseop.pe.kr/logo/todayquiz_logo.png")
        .directiveTitleText("오늘의 퀴즈")
        .directiveContentHearderText("오늘의 퀴즈를 알려드릴게요.")
        .directiveContentBodyText(`${todayQuiz.question}\n\n1번 ${todayQuiz.choice1}, 2번 ${todayQuiz.choice2}, 3번 ${todayQuiz.choice3}, 4번 ${todayQuiz.choice4}`)
        .directiveContentFooterText(`정답을 숫자로 말씀해주세요.`)
        .build()
    }

    nuguRes = new NuguResBuilder()
    .version(nuguReq.version)
    .resultCode('OK')
    .output(nugu_todayquiz)
    .addDirective(displayDirective)
    .build();

    return nuguRes
}

function repeat_answerstate(nuguReq) {
    todayQuiz = new TodayQuiz();
    let repeat_todayquiz = {'repeat_todayquiz' : `네, 문제를 다시 들려드릴게요. ${todayQuiz.question}. 1번, ${todayQuiz.choice1}. 2번, ${todayQuiz.choice2}. 3번, ${todayQuiz.choice3}. 4번, ${todayQuiz.choice4}. `};
    
    let displayDirective = {}
    if (nuguReq.deviceType == "app.nugu.agent"){
        displayDirective = new DisplayDirectiveBuilder()
        .directiveType('Display.FullText1')
        .directiveVersion(nuguReq.displayVersion)
        .directivePlayServiceId(nuguReq.sessionId)
        .directiveToken("DisplayToken")
        .directiveTitleUrl("https://www.inseop.pe.kr/logo/todayquiz_logo.png")
        .directiveTitleText("오늘의 퀴즈")
        .directiveContentHearderText("네, 문제를 다시 알려드릴게요.")
        .directiveContentBodyText(`${todayQuiz.question} \n\n1번. ${todayQuiz.choice1}\n2번. ${todayQuiz.choice2}\n3번. ${todayQuiz.choice3}\n4번. ${todayQuiz.choice4}\n`)
        .directiveContentFooterText(`정답을 숫자로 말씀해주세요.`)
        .build()
    }
    else {
        displayDirective = new DisplayDirectiveBuilder()
        .directiveType('Display.FullText1')
        .directiveVersion(nuguReq.displayVersion)
        .directivePlayServiceId(nuguReq.sessionId)
        .directiveToken("DisplayToken")
        .directiveTitleUrl("https://www.inseop.pe.kr/logo/todayquiz_logo.png")
        .directiveTitleText("오늘의 퀴즈")
        .directiveContentHearderText("네, 문제를 다시 알려드릴게요.")
        .directiveContentBodyText(`${todayQuiz.question}\n\n1번 ${todayQuiz.choice1}, 2번 ${todayQuiz.choice2}, 3번 ${todayQuiz.choice3}, 4번 ${todayQuiz.choice4}`)
        .directiveContentFooterText(`정답을 숫자로 말씀해주세요.`)
        .build()
    }


    nuguRes = new NuguResBuilder()
    .version(nuguReq.version)
    .resultCode('OK')
    .output(repeat_todayquiz)
    .addDirective(displayDirective)
    .build();

    return nuguRes

}


module.exports = (req, res) => {
    const nuguReq = new NuguReq(req);

    try {
        /*
        * req로 넘어온 actionName에 따라 분기
        */
        switch (nuguReq.actionName) {
            case 'common_start':    
                return res.json(common_start(nuguReq));

            case 'repeat_answerstate':
                return res.json(repeat_answerstate(nuguReq));

            case 'answerQuiz':
                return res.json(answerQuiz(nuguReq));

            case 'quiz_sound':
                return res.json(quizSound(nuguReq));
        }
    }
    catch (e) {
        console.log(e)
        console.log(`\n${e.stack}`);
        //nuguReq.resultCode = e.resultCode;
    }
}
