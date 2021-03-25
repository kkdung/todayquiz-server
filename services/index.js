const NuguReq = require('../models/NuguRes')
const TodayQuiz = require('../models/TodayQuiz')


//fix2. nuguRes로 통합작업 필요
const AudioPlayerDirectiveBuilder = require('../models/AudioPlayerDirective');
const DisplayDirectiveBuilder = require('../models/DisplayDirective');

async function common_start(nugu) {
    /*
    퀴즈 시작함수
    */
    try {

        todayQuiz = new TodayQuiz();
    
        let open_ment = todayQuiz.openment

        let audioPlayerDirective = new AudioPlayerDirectiveBuilder()
            .directiveType('AudioPlayer.Play')
            .directiveUrl(`https://www.inseop.pe.kr/music/${todayQuiz.sound}.mp3`)
            .directiveToken('quiz_sound')
            .build();

        let displayDirective = new DisplayDirectiveBuilder()
            .directiveType('Display.FullText1')
            .directiveVersion(nugu.version)
            .directivePlayServiceId()
            .build()
        
        nugu.addDirective(audioPlayerDirective)
        nugu.addDirective(displayDirective)

        

    } catch (e) {
        throw e;
    }
}

async function openQuiz(nugu) {
   
}

function answerQuiz(nugu) {

}

function quizSound(nugu) {

}

function repeat_answerstate(nugu) {

}

function defaultFinished(nugu) {

}

module.exports = (req, res) => {
    const nugu = new NuguReq(req);

    try {
        /*
        * req로 넘어온 actionName에 따라 분기
        */
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