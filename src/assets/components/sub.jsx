import React, { useState } from 'react'; // 상단에 useState 임포트 필수!

function Test() {
    // 1. 가이드 글자(count:number, initialState:)를 모두 지우고 올바르게 선언합니다.
    // 대소문자 구분을 위해 setCount의 s는 소문자로 맞춥니다.
    const [count, setCount] = useState(1);


    // 2. 중복되던 'let count = 0;' 라인은 깨끗하게 삭제했습니다.

    function fn() {
        console.log("click");
        // 3. value: 가이드를 지우고 순수하게 값만 넘겨줍니다.
        setCount(count + 1);
    }

    return (
        <>
            <h3>Test Page</h3>
            <button onClick={fn}>CLICK</button>
            {/* 이제 useState의 count 값이 실시간으로 여기에 반영됩니다. */}
            <div>{count}</div>
        </>
    );
}

export default Test;