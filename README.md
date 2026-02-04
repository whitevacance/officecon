# 오피스콘 - 웹퍼블리싱

## 환경

- ![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
- ![Bootstrap](https://img.shields.io/badge/bootstrap-5.3.8-7952b3.svg)
- ![Swiper](https://img.shields.io/badge/swiper-12.0.2-6332f6.svg)

## 폴더 구조

```sh
/ - 루트, html파일들
/css - css 폴더
/fonts - 폰트 폴더
/images - 이미지 폴더
/js - js 폴더
```

## 작업 및 배포 가이드

- html 작업 시 js파일의 CORS 이슈가 있으므로 로컬서버를 사용해야 합니다. 하위 항목의 서비스를 사용하시거나 편하신 로컬환경 구축하여 사용하셔도 무방합니다.
  - vsCode 사용 중이시면 'live server' 익스텐션 설치하여 구동
  - npm의 http-server 사용

## 페이지 리스트

### 1차

- 예제/컴포넌트: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/examples.html
- 메인: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/
- 상품리스트: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/products.html
- 상품리스트 - 검색 결과 없음: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/products-empty.html
- 상품리스트 - 필터 결과 없음: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/products-empty-filter.html
- 상품상세: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/detail.html
- 리워드관: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/reward.html
- 서비스 소개: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/service.html
- (기타-퍼블리싱 확인): http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/etc.html

### 2차

- 로그인: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/login.html
- 회원가입 - 인트로: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/signup-intro.html
- 회원가입 - 기업: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/signup-company.html
- 회원가입 - 일반: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/signup-personal.html
- 회원가입 - 가입완료: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/signup-success.html
- 아이디/비밀번호 찾기 - 휴대폰 번호: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/find-idpw.html
- 아이디/비밀번호 찾기 - 이메일 주소: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/find-idpw-email.html
- 아이디/비밀번호 찾기 - 새로운 비밀번호: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/find-idpw-change.html
- 비밀번호 변경: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/change-password.html
- 장바구니: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/cart.html
- 장바구니 - 장바구니없음: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/cart-empty.html
- 결제하기: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/order.html
- 주문완료: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/order-success.html

### 3-1차

- 브랜드: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/brand.html
- 공지사항 > 리스트: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/notice-list.html
- 공지사항 > 뷰: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/notice-view.html
- 1:1문의 > 리스트: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/qna-list.html
- 1:1문의 > 뷰: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/qna-view.html
- 1:1문의 > 작성: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/qna-create.html
- FAQ: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/faq-list.html

### 3-2차

- 마이페이지 > 쇼핑내역 > 주문/발송 내역 > 리스트: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-order-list.html
- 마이페이지 > 쇼핑내역 > 주문/발송 내역 > 뷰: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-order-view.html
- 마이페이지 > 쇼핑내역 > 주문/발송 내역 > 수정: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-order-modify.html
- 마이페이지 > 쇼핑내역 > 취소/환불 내역: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-order-cancel.html
- 마이페이지 > 캐시/리워드 내역 > 캐시 내역: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-cash.html
- 마이페이지 > 캐시/리워드 내역 > 캐시 내역 > 캐쉬 충전(카드): http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-cash-charge.html
- 마이페이지 > 캐시/리워드 내역 > 캐시 결제내역: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-cash-order-history.html
- 마이페이지 > 캐시/리워드 내역 > 리워드 내역: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-reward.html
- 마이페이지 > 발송관리 > 리스트: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-message-list.html
- 마이페이지 > 발송관리 > 작성(수정): http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-message-edit.html
- 마이페이지 > 서브회원 > 서브회원 관리 > 리스트: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-sub-member-list.html
- 마이페이지 > 서브회원 > 서브회원 관리 > 등록: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-sub-member-regist.html
- 마이페이지 > 서브회원 > 서브회원 주문/발송 내역: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-sub-member-order-list.html
- 마이페이지 > 나의 정보 > 인증 IP관리: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-ip-list.html
- 마이페이지 > 나의 정보 > 회원정보 수정(기업회원): http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-info-modify-company.html
- 마이페이지 > 나의 정보 > 회원정보 수정(일반회원): http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-info-modify-personal.html
- 마이페이지 > 나의 정보 > 회원 탈퇴: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/mypage-cancel-membership.html
- 파트너링크: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/partner.html
- 서비스 이용약관: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/policy-service.html
- 이벤트 > 리스트: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/event-list.html
- 이벤트 > 뷰: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/event-view.html
- 이벤트 > 뷰(상품형): http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/event-view-products.html
- 오류/긴급점검 > 503: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/503.html
- 오류/긴급점검 > 403: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/403.html
- 오류/긴급점검 > 404: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/404.html
