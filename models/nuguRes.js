/* 
Builder 패턴으로 Response 세팅 해주는 DTO
*/

// const audioPlayerDirective = require('./audioPlayerDirective');
// const displayDirective = require('./displayDirective');
class NuguRes {

  constructor() {
    this.version = "";
    this.resultCode = "OK";
    this.output = {};
    this.directives = [];
    //req = new nuguReq(version).resultCode(a).output(a).addDirective(displayDirective).build()
  }

}

module.exports = class Builder {
  constructor() {
    //여기디스
    this.nuguRes = new nuguRes();
  }

  version(version) {
    this.nuguRes.version = version;
    return this;
  }

  // set resultCode(resultCode) {
  //   this.resultCode = resultCode;
  // }//set은 ES6부터 지원되어 대입연산자로 가능하다. 그차이.
  resultCode(resultCode) {
    this.nuguRes.resultCode = resultCode;
    return this;
  }

  output(output) {
    this.nuguRes.output = output;
    return this;
  }

  //Interface를 사용하는 경우 directive 추가
  addDirective(directive){
    //audio interface, display interface 어디서 처리할지 체크해보기
    //여기하면 안되고 의존성 주입처럼 외부에서 처리해야함.
    //인터페이스 템플릿 추가될 경우 directiv model 추가하고 외부에서 주입해주면 된디.
    this.nuguRes.directives.push(directive)
    return this;
  }
  
  build(){ 
    return this.nuguRes;

  }
}
//https://dev-momo.tistory.com/entry/%EB%B9%8C%EB%8D%94-%ED%8C%A8%ED%84%B4-Builder-Pattern
      
       