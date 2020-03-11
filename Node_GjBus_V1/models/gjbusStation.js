var mongoose = require('mongoose')

var gjStationVO = mongoose.Schema({
    
    STATION_NUM : String, // 레코드 구분
    BUSSTOP_ID : String, // 정류소 ID
    BUSSTOP_NAME : String, // 정류소명 국문
    NAME_E : String, // 정류소명 영문
    LONGITUDE : String, // 위도
    LATITUDE : String, // 경도
    ARS_ID : String, // ARS 검색 ID
    NEXT_BUSSTOP : String // 다음 버스 승강장
    
})


module.exports = mongoose.model('gjstation',gjStationVO)
