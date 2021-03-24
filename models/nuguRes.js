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
        this.version = version;
        this.resultCode = "OK";
        this.output = {};
        this.directives = [];
      }
      set resultCode(resultCode) {
        this.resultCode = resultCode;
      }

      set output(output) {
        this.output = output;
      }
      //Interface를 사용하는 경우 directive 추가
      addDirective(directive){
        this.directives.push(directive)
      }
      
      build(){ 
        nuguReq = new nuguReq();
        nuguReq.version = version;
        nuguReq.resultCode = resultCode;
        nuguReq.output = output;
        nuguReq.directives = directives;
        
        return nuguReq;

      }
    }
    //book = new nuguReq.Builder(version).resultCode(a).output(a).addDirective(displayDirective).build
  }
}
      
       