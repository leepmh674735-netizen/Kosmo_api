

function Study1(a) {
  // 부모가 준 props가 'a'라는 이름의 객체로 들어옵니다.
  console.log("a: ", a); 

  return (
    <>
      <h2>Study1</h2>
      {/* a 객체 안에 있는 person의 데이터를 꺼냅니다 */}
      <h3>{a.person?.name}</h3>
      <h3>{a.person?.age}</h3>
    </>
  ); // 괄호와 세미콜론 위치 수정!
}

export default Study1;