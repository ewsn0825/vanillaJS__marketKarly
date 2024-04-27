import { getNode, bindEvent, tiger, insertLast } from '../../lib/index.js';

const registerNodeFirstPw = getNode('#register_user_pw_first');
const registerNodeSecondPw = getNode('#register_user_pw_second');
const buttonDoubleCheck = getNode('#button_doubleCheck_pw');

//pw을 위한 정규표현식
function regularExpressionPw() {
  const regularExpressionPw =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])[!@#$%^&*(),.?":{}|<>\w]{6,16}$/;
  return regularExpressionPw;
}

//입력된 pw가 정규식과 일치하는지 확인
function checkRegex() {
  const regex = regularExpressionPw();
  return regex.test(registerNodeFirstPw.value);
}

//firstPw의 정규표현식 통과여부 체크
function createMessageRegularExpressionPw() {
  let boolRegex = checkRegex();
  if (!boolRegex) {
    console.log(
      '비밀번호는 하나 이상의 특수문자를 포함하며 6자이상 16자 이하여야 합니다',
    );
  } else {
    console.log('사용가능한 비밀번호 입니다');
  }
}

//firstPw 키다운시 정규표현식 통과여부 알림
function handlerKeydownFirstPw(e) {
  // e.preventDefault();
  createMessageRegularExpressionPw();
}

export function eventRegularExpressionPw() {
  bindEvent(registerNodeFirstPw, 'keyup', handlerKeydownFirstPw);
}

// fistPw/secondPw 일치확인
function checkPws() {
  return registerNodeFirstPw.value === registerNodeSecondPw.value;
}

//중복검사 버튼 클릭시 경고 생성
function handlerButtonDoubleCheckPw(e) {
  e.preventDefault();
  let boolDoubleCheck = checkPws();
  if (!boolDoubleCheck) {
    globalThis.alert('비밀번호가 일치하지 않습니다');
  } else {
    globalThis.alert('비밀번호가 일치합니다');
  }
}
export function eventDoubleCheckPw() {
  bindEvent(buttonDoubleCheck, 'click', handlerButtonDoubleCheckPw);
}
