const NuguReq = require('../models/NuguReq')
const NuguResBuilder = require('../models/NuguRes')

const TodayQuiz = require('../models/TodayQuiz')


//fix2. nuguRes로 통합작업 필요
const AudioPlayerDirectiveBuilder = require('../models/AudioPlayerDirective');
const DisplayDirectiveBuilder = require('../models/DisplayDirective');

async function common_start(nuguReq) {
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
        .directivePlayServiceId(nuguReq.displayPlayServiceId)
        .directiveToken("DisplayToken")
        .directiveTitleUrl("이미지파일URL")
        .directiveTitleText("오늘의 퀴즈")
        .directiveContentHearderText("오늘의 퀴즈를 알려드릴게요.")
        .directiveContentBodyText(`${todayQuiz.question}`)
        .directiveContentFooterText(`1번 : ${todayQuiz.choice1}    2번 : ${todayQuiz.choice2}    3번 : ${todayQuiz.choice3}    4번 : ${todayQuiz.choice4} \n정답을 숫자로 말씀해주세요.`)
        .build()
                
        nuguRes = new NuguResBuilder()
        .version(nuguReq.version)
        .resultCode('OK')
        .output(open_ment)
        .addDirective(audioPlayerDirective)
        .addDirective(displayDirective)
        .build();

        return nuguRes

    } catch (e) {
        throw e;
    }
}

async function openQuiz(nuguReq) {
    try {

        todayQuiz = new TodayQuiz();
        let open_ment = { "nugu_openment" : `${todayQuiz.openment} ${todayQuiz.sound_comment}`};
        
        let audioPlayerDirective = new AudioPlayerDirectiveBuilder()
            .directiveType('AudioPlayer.Play')
            .directiveUrl(`https://www.inseop.pe.kr/music/${todayQuiz.sound}.mp3`)
            .directiveToken('quiz_sound')
            .build();

        nuguRes = new NuguResBuilder()
        .version(nuguReq.version)
        .resultCode('OK')
        .output(open_ment)
        .addDirective(audioPlayerDirective)
        //.addDirective(displayDirective)
        .build();
    
        return nuguRes

    } catch (e) {
        throw e;
    }
}

function answerQuiz(nuguReq) {
    /*
    User의 Answer와 Quiz Correct의 일치를 확인후 정답 /오답 Prompt를 담는다.
    */
    todayQuiz = new TodayQuiz();
    const userAnswer = nuguReq.getValue("userAnswer");
    let answerMent = {};
    let displayDirective = {}

    if (userAnswer === todayQuiz.correct) {
        answerMent = { "nugu_answerment" : `정답입니다. ${todayQuiz.commentary}` };
        
        displayDirective = new DisplayDirectiveBuilder()
        .directiveType('Display.FullText1')
        .directiveVersion(nuguReq.displayVersion)
        .directivePlayServiceId(nuguReq.displayPlayServiceId)
        .directiveToken("DisplayToken")
        .directiveTitleUrl("http://140.238.11.119/todayquiz_logo_50.png")
        .directiveTitleText("오늘의 퀴즈")
        .directiveContentHearderText("정답입니다!")
        .directiveContentBodyText(`${todayQuiz.commentary}`)
        .build()
    }
    else {

        displayDirective = new DisplayDirectiveBuilder()
        .directiveType('Display.FullText1')
        .directiveVersion(nuguReq.displayVersion)
        .directivePlayServiceId(nuguReq.displayPlayServiceId)
        .directiveToken("DisplayToken")
        .directiveTitleUrl("http://140.238.11.119/todayquiz_logo_50.png")
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
    
    let displayDirective = new DisplayDirectiveBuilder()
    .directiveType('Display.FullText1')
    .directiveVersion(nuguReq.displayVersion)
    .directivePlayServiceId(nuguReq.displayPlayServiceId)
    .directiveToken("DisplayToken")
    .directiveTitleUrl("http://140.238.11.119/todayquiz_logo_50.png")
    .directiveTitleText("오늘의 퀴즈")
    .directiveContentHearderText("오늘의 퀴즈를 알려드릴게요.")
    .directiveContentBodyText(`${todayQuiz.question}`)
    .directiveContentFooterText(`1번 : ${todayQuiz.choice1}    2번 : ${todayQuiz.choice2}    3번 : ${todayQuiz.choice3}    4번 : ${todayQuiz.choice4} \n정답을 숫자로 말씀해주세요.`)
    .build()

    nuguRes = new NuguResBuilder()
    .version(nuguReq.version)
    .resultCode('OK')
    .output(nugu_todayquiz)
    .addDirective(displayDirective)
    .build();
}

function repeat_answerstate(nuguReq) {
    todayQuiz = new TodayQuiz();
    let repeat_todayquiz = {'repeat_todayquiz' : `네, 문제를 다시 들려드릴게요. ${todayQuiz.question}. 1번, ${todayQuiz.choice1}. 2번, ${todayQuiz.choice2}. 3번, ${todayQuiz.choice3}. 4번, ${todayQuiz.choice4}. `};
    

    let displayDirective = new DisplayDirectiveBuilder()
    .directiveType('Display.FullText1')
    .directiveVersion(nuguReq.displayVersion)
    .directivePlayServiceId(nuguReq.displayPlayServiceId)
    .directiveToken("DisplayToken")
    .directiveTitleUrl("http://140.238.11.119/todayquiz_logo_50.png")
    .directiveTitleText("오늘의 퀴즈")
    .directiveContentHearderText("네, 문제를 다시 들려드릴게요.")
    .directiveContentBodyText(`${todayQuiz.question}`)
    .directiveContentFooterText(`1번 : ${todayQuiz.choice1}    2번 : ${todayQuiz.choice2}    3번 : ${todayQuiz.choice3}    4번 : ${todayQuiz.choice4} \n정답을 숫자로 말씀해주세요.`)
    .build()


    nuguRes = new NuguResBuilder()
    .version(nuguReq.version)
    .resultCode('OK')
    .output(repeat_todayquiz)
    .addDirective(displayDirective)
    .build();

}


module.exports = (req, res) => {
    const nuguReq = new NuguReq(req);

    try {
        /*
        * req로 넘어온 actionName에 따라 분기
        */
        switch (nuguReq.actionName) {
            case 'common_start':
                common_start(nuguReq);
                break;
            case 'openQuiz':
                openQuiz(nuguReq);
                break;
            case 'repeat_answerstate':
                repeat_answerstate(nuguReq);
                break;
            case 'answerQuiz':
                answerQuiz(nuguReq);
                break;
            case 'quiz_sound':
                quizSound(nuguReq);
                break;
            case 'default_finished':
                defaultFinished(nuguReq);
                break;
        }
    }
    catch (e) {
        console.log(`\n${e.stack}`);
        nuguReq.resultCode = e.resultCode;
    } finally {
        console.log(nuguReq.response);
        return res.json(nuguReq.response);
    }
}