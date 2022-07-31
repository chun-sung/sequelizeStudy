var express = require('express');
var router = express.Router();

// model/index.js DB객체 참조하기 
var db = require('../models/index');

// 회원목록 전체 조회하기  // http://localhost:3000/members/list

router.get('/list', function(req, res, next) {
  
  // DB에서 데이터 목록 조회하기
  db.Member.findAll()
    .then((result)=> {
      // console.log("전체 회원 목록: " , result)
      res.render('member/list', {members: result});
    })
    .catch((err)=> {
      next(err)
    })
});

// 회원 신규 등록 페이지 불러오기   // http://localhost:3000/member/create
router.get('/create', function(req, res, next) {
  res.render('member/create');
});

// 신규 회원 정보 등록 처리 라우팅 메소드
router.post('/create', function(req, res, next) {

  var userid1 = req.body.userid;
  var username1 = req.body.username;
  // DB에 입력할 JSON 데이터 생성 (모델 속성명)
  let memberData = {
    userid: userid1,
    username: username1
  }

  // db.Member.create().then().catch();
  // create 메소드에 객체 데이터 넣으면 DB에 입력된다.
  db.Member.create(memberData).then((savedMember) => {
    // console.log("신규 저장 데이터 확인: ", savedMember);
    res.redirect('/members/list')  // 동기 방식으로 처리하려면 안에 넣어야 함
  }).catch((err)=> {
    next(err);
  });

})

// 회원 수정 페이지 불러오기  // http://localhost:3000/member/modify/1
router.get('/modify/:id', function(req, res, next) {

  // 와일드 카드 방식으로 전달된 사용자 고유번호 정보 수집
  var userIdx = req.params.id;

  db.Member.findOne({where:{id: userIdx} }).then((memberData) => {
    res.render('member/modify',{members: memberData });
  }).catch()
});

// 회원 정보 수정 처리 라우팅 메소드
router.post('/modify', function(req, res, next) {

  var userIdx = req.body.userIdx;
  var userid = req.body.userid;
  var username = req.body.username;

  var updateMember = {
    userid,
    username,
  };
  // 단일 사용자 정보 수정하기
  db.Member.update(updateMember,{where: {id:userIdx}}).then((updatedCnt) => {
    // console.log("수정된 건수 :" , updatedCnt)
    res.redirect('/members/list')
  }).catch();

})

// 게시글 삭제 처리 라우팅 메소드  // http://localhost:3000/members/delete?id=1
router.get('/delete',function(req, res) {

  // 삭제하려는 사용자의 고유번호 추출
  var userIdx = req.query.id;
  // var userIdx = req.params.id;

  db.Member.destroy({where: {id: userIdx}}).then((result) => {
    // console.log("삭제결과: ", result )
    res.redirect('/member/list')
  }).catch()
})

module.exports = router;
