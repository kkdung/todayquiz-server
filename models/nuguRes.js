/* 
Builder패턴으로 Response세팅 해주는 DTO
*/

// const audioPlayerDirective = require('./audioPlayerDirective');
// const displayDirective = require('./displayDirective');
module.exports = class nuguReq {

  constructor(version) {
    this.version = version;
    this.resultCode = "OK";
    this.output = {};
    this.directives = [];

    class Builder {
      constructor(version) {
        this.nuguReq = new nuguReq(version);
        
        
      }
      
      // set resultCode(resultCode) {
      //   this.resultCode = resultCode;
      // }
      resultCode(resultCode) {
        this.resultCode = resultCode;
        return this;
      }

      output(output) {
        this.output = output;
        return this;
      }

      //Interface를 사용하는 경우 directive 추가
      addDirective(directive){
        //audio interface, display interface 어디서 처리할지 체크해보기
        //여기하면 안되고 의존성 주입처럼 외부에서 처리해야함.
        //인터페이스 템플릿 추가될 경우 directiv model 추가하고 외부에서 주입해주면 된디.
        this.directives.push(directive)
        return this;
      }
      
      build(){ 
        return this.nuguReq;

      }
    }
    //book = new nuguReq.Builder(version).resultCode(a).output(a).addDirective(displayDirective).build
  }
}

//https://dev-momo.tistory.com/entry/%EB%B9%8C%EB%8D%94-%ED%8C%A8%ED%84%B4-Builder-Pattern
      
       