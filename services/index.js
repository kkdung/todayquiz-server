const nuguReq = require('../models/NuguRes')
const todayQuiz = require('../models/TodayQuiz')


//fix2. nuguRes로 통합작업 필요
const audioPlayerDirective = require('../models/AudioPlayerDirective')
const displayDirective = require('../models/DisplayDirective')

async function common_start(nugu) {
    try {
        todayQuiz = new TodayQuiz();
        todayQuiz.openment;

    } catch (e) {
        throw e;
    }
}

async function openQuiz(nugu) {
    try {
        const todayQuiz = quiz.today();
        if(todayQuiz["SOUND_COMMENT"]===undefined){ todayQuiz["SOUND_COMMENT"]="" }
        if(todayQuiz["OPENMENT"]===undefined){ todayQuiz["OPENMENT"]="" }
        let open_ment = { "nugu_openment" : `${todayQuiz["OPENMENT"]} ${todayQuiz["SOUND_COMMENT"]}`};
        
        nugu.addDirective(); 
        nugu.directiveType = 'AudioPlayer.Play';
        nugu.directiveUrl = `https://www.inseop.pe.kr/music/${todayQuiz["SOUND"]}.mp3`;
        //nugu.directiveOffset = 10000;
        //nugu.directiveDelay = 20000;
        //nugu.directiveInterval = 30000;
        nugu.directiveToken = 'quiz_sound';
        //nugu.directivePreviousToken = 'select_token';
        nugu.output = open_ment;
        console.log(open_ment);
    } catch (e) {
        throw e;
    }
}

function answerQuiz(nugu) {
    try {
        const todayQuiz = quiz.today();
        const userAnswer = nugu.getValue("userAnswer");
        let answerMent = {};
        
        if (userAnswer === todayQuiz["CORRECT"]) {
            answerMent = { "nugu_answerment" : `정답입니다. ${todayQuiz["COMMENTARY"]}` };
        } else {
            answerMent = { "nugu_answerment" : `이런 틀렸어요. 정답은 ${todayQuiz['CORRECT']}번, ${todayQuiz["CHOICE"+todayQuiz['CORRECT']]}입니다. ${todayQuiz["COMMENTARY"]}` };
        }
        nugu.output = answerMent;
    } catch (e) {
        throw e;
    }
}

function quizSound(nugu) {
    try {
        const todayQuiz = quiz.today();
        nugu.output = {'nugu_todayquiz' : ` ${todayQuiz["QUESTION"]}. 1번, ${todayQuiz["CHOICE1"]}. 2번, ${todayQuiz["CHOICE2"]}. 3번, ${todayQuiz["CHOICE3"]}. 4번, ${todayQuiz["CHOICE4"]}. `};
        } catch (e) {
        throw e;
    }
}

function repeat_answerstate(nugu) {
    try {
        const todayQuiz = quiz.today();
        nugu.output = {'repeat_todayquiz' : `네, 문제를 다시 들려드릴게요. ${todayQuiz["QUESTION"]}. 1번, ${todayQuiz["CHOICE1"]}. 2번, ${todayQuiz["CHOICE2"]}. 3번, ${todayQuiz["CHOICE3"]}. 4번, ${todayQuiz["CHOICE4"]}. `};
        } catch (e) {
        throw e;
    }
}

function defaultFinished(nugu) {

}

module.exports = (req, res) => {
    const nugu = new nuguReq(req);

    try {
        switch (nugu.actionName) {
            case 'common_start':
                common_start(nugu);
                break;
            case 'openQuiz':
                openQuiz(nugu);
                break;
            case 'repeat_answerstate':
                repeat_answerstate(nugu);
                break;
            case 'answerQuiz':
                answerQuiz(nugu);
                break;
            case 'quiz_sound':
                quizSound(nugu);
                break;
            case 'default_finished':
                defaultFinished(nugu);
                break;
        }
    }
    catch (e) {
        console.log(`\n${e.stack}`);
        nugu.resultCode = e.resultCode;
    } finally {
        console.log(nugu.response);
        return res.json(nugu.response);
    }
}