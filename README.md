# DogCare 🐶
반려견 피부 및 연구 관리를 위한 애플리케이션입니다.
직접 병원에 가지 않아도 집에서 편하게 진료를 받을 수 있는 애플리케이션입니다.

## 기술 스택
**Front-End**
- ReactJS
- Axios
- HTML5/CSS3

## 보안 및 인증
- JWT 토큰 관리: Access/Refresh 토큰 전략을 사용하여 CSRF 공격을 방지.
Access 토큰은 로그스프핑과 에서도 유연하게 동작할 수 있도록 구현.
HttpOnly와 SameSite를 적용하여 쿠키를 안전하게 관리.
- 토큰 리프레시 전략: 만료된 Access 토큰 요청 시 서버로부터 새로운 Access 토큰을 발급받는 리프레시 전략 사용.
- 토큰 인증 프로세스: 로컬 키스토리지에 저장된 토큰 인증을 최소화하며, 클라이언트가 토큰이 없거나 만료 시 서버로 인증 요청.

## 주요 페이지 구현
1. InquiryList 페이지

- 사용자가 문의 내용을 작성할 수 있는 페이지로, Ant Design의 List 컴포넌트를 활용하여 문의 목록을 보여주고 검색 기능을 지원.
- 문의 작성 후 실시간으로 목록이 갱신.

2. Pet 페이지

- 사용자가 등록한 강아지의 정보를 볼 수 있는 페이지.
- useParams를 통해 URL 파라미터에서 강아지 정보를 받아 해당 내용을 출력.

3. UserEdit 페이지

- 사용자 정보 수정 페이지.
- 관리자가 등록한 데이터를 Axios를 활용하여 백엔드와 통신하며 사용자 입력 정보를 업데이트.

4. AvgWeight, AllEyesGraph 컴포넌트

- 강아지의 체중 및 선택 관련 데이터를 시각화하여 테이블 및 그래프 형태로 제공.
