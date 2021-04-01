/*
Excel 리소스에서 오늘 퀴즈 Sheet를 선택해 필요한 데이터를 만들어 반환하는 DTO모듈
*/

const e = require('express');
const XLSX = require('xlsx');
const moment = require('../config/moment');

function getTodayQuiz() {
    let today_cell = {}//insert 

    try {
        const today = moment().format('D');
        const yearMonth = moment().format('YYYYMM');
    
        // today quiz아주 
        const today_sheets = XLSX.readFile(`./resource/quiz/${yearMonth}_revoicequizlist.xlsx`,
            { dateNF: 'yyyy-mm-dd', cellDates: true, encoding: 'utf8' }
        );
        const today_sheet1 = XLSX.utils.sheet_to_row_object_array(
            today_sheets.Sheets['Sheet1'],
            { raw: false }
        )
    
        // find cell    
        for (var i = 0; i < today_sheet1.length; i++) {
            if (today_sheet1[i].DATE == today) {
                today_cell = today_sheet1[i];
                break;//insert
            }
        }
     
        return today_cell;

    } catch (e) {
        //이거 동작여부 확인
        //e.resultCode = process.env.SERVER_CHECK
        throw e;
    }
}

module.exports = class TodayQuiz{
    constructor() {

        this.today_cell = getTodayQuiz();
        
        if(this.today_cell["OPENMENT"]=== undefined) { 
            this.today_cell["OPENMENT"]=" "
        }

        if(this.today_cell["SOUND_COMMENT"]===undefined) {
            this.today_cell["SOUND_COMMENT"]=" " 
        }

        this.openment = this.today_cell["OPENMENT"]
        this.sound = this.today_cell["SOUND"]
        this.sound_comment = this.today_cell["SOUND_COMMENT"]
        this.question = this.today_cell["QUESTION"]
        this.choice1 = this.today_cell["CHOICE1"]
        this.choice2 = this.today_cell["CHOICE2"]
        this.choice3 = this.today_cell["CHOICE3"]
        this.choice4 = this.today_cell["CHOICE4"]
        this.correct = this.today_cell["CORRECT"]
        this.commentary = this.today_cell["COMMENTARY"]

    }

}