// 1. useState도 함께 쓸 수 있도록 상단에 import를 추가합니다.
import { useState, useRef } from "react";

function Study2(props) {
  // 2. 화면을 다시 그리게(재렌더링) 만들 토글용 State
  const [change, setChange] = useState(false);
  
  // 3. useRef로 초기값 "test"를 담은 주머니를 만듭니다.
  const input = useRef("test");

  function add() {
    input.current = "iu"; // useRef 내부의 실제 값 변경!
    setChange(!change);   // 4. State를 반대로 뒤집으면서 화면을 강제로 다시 그리게 만듭니다.
  }
   
  return (
    <>
      <hr />
      <h2>Study2</h2>
      {/* 5. 부모 컴포넌트(App)가 내려준 count Props를 출력합니다 */}
      <h3>Count from App: {props.count}</h3>
      
      {/* 6. onClick 자리에 우리가 만든 add 함수를 쏙 연결해 줍니다 */}
      <button onClick={add}>CLICK</button>
      
      {/* 7. 버튼을 누르면 iu로 바뀌어 출력됩니다 */}
      <h4>INPUT : {input.current}</h4>
      <hr />
    </>
  );
}

export default Study2;