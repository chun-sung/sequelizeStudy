var express = require('express');
var router = express.Router();

// model/index.js DB객체 참조하기 
var db = require('../models/index');

// 회원목록 전체 조회하기 - 비동기 라우팅 메소드 // http://localhost:3000/member/list
router.get('/list', async(req, res, next) => { 
  const result = await db.Member.findAll();
  res.render('member/list', {members: result})
});

// 회원 신규 등록 페이지 불러오기 -비동기-   // http://localhost:3000/member/create
router.get('/create', async(req, res, next) => {
  res.render('member/create');
});

// 신규 회원 정보 등록 처리 라우팅 메소드
router.post('/create', async(req, res, next) => {

  var userid1 = req.body.userid;
  var username1 = req.body.username;
  // DB에 입력할 JSON 데이터 생성 (모델 속성명)
  let memberData = {
    userid: userid1,
    username: username1
  }

  // const savedMember = await db.Member.create(memberData);
  await db.Member.create(memberData);
  res.redirect('/member/list')
})

// 회원 수정 페이지 불러오기  // http://localhost:3000/member/modify/1
router.get('/modify/:id', async(req, res, next) => {

  // 와일드 카드 방식으로 전달된 사용자 고유번호 정보 수집
  var userIdx = req.params.id;

  // 단일 사용자 정보조회
  var memberData = await db.Member.findOne({where:{id: userIdx}});
  
  var updateMember = {
    userid: memberData.userid,
    username: memberData.username + ":수정함.."
  }
  //단일 사용자 정보 수정
  // var updateCnt = await db.Member.update(updateMember, {where:{iduserIdx}});
  await db.Member.update(updateMember, {where:{id:userIdx}});

  // 뷰렌더링 처리
  res.render('member/modify', {members: memberData}) 
});



// 회원 정보 수정 처리 라우팅 메소드
router.post('/modify', async(req, res, next) => {

  var userIdx = req.body.userIdx;
  var userid = req.body.userid;
  var username = req.body.username;

  var updateMember = {
    userid,
    username,
  };

  // 단일 사용자 정보 수정하기
  var updateCnt = await db.Member.update(updateMember, {where:{id:userIdx}});
  res.redirect('/member/list')
})

// 게시글 삭제 처리 라우팅 메소드  // http://localhost:3000/members/delete?id=1
router.get('/delete',async(req, res) => {

  // 삭제하려는 사용자의 고유번호 추출
  var userIdx = req.query.id;  //  던질 때 쿼리스트링으로 던짐
  // var result = await db.Member.destroy({where: {id:userIdx}});
  await db.Member.destroy({where: {id:userIdx}});
  res.redirect('/member/list')
})

module.exports = router;
