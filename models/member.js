module.exports = (sequelize, DataTypes) => {
  //member 테이블과 맵핑되는 member모델 정의
  //return sequelize.define()메소드를 통해 물리테이블과 맵핑되는 모델클래스를 생성하고 반환한다.
  //sequelize.define('맵핑되는 물리 테이블명',{테이블의 데이터구조 정의},{테이블생성 옵션정보})
  //맵핑되는 물리 테이블명은 단수형태로 정의할것..실제생성되는 물리테이블은 복수형태로 생성됨. member(모델명) ->members(물리테이블명)
  //{테이블의 데이터구조 정의} = {속성(컬럼)명:{각종세팅정보정의(데이터타입,null허용여부,primarykey여부,자동채번여부..)},속성(컬럼)명:{},속성(컬럼)명:{}}
    return sequelize.define('member',
      {
        userid: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        username: {
          type: DataTypes.STRING(100),
          allowNull: true
        },
      },
      {
        timestamps: true,
        paranoid: true
    });
  //timestamps 는 물리적 테이블 createdAt,updatedAt컬럼을 자동추가하고
  //데이터 신규생성일시,수정일시 데이터를 자동으로 마킹해줍니다.
  //paranoid가 트루이면 deletedAt컬럼이 자동추가되고
  //삭제시 삭제일시정보가 자동 마킹되고 데이터는 실제 삭제되지 않습니다.
  };