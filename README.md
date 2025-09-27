# 오피스콘 - 웹퍼블리싱

## 환경

- ![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
- ![Bootstrap](https://img.shields.io/badge/bootstrap-5.3.8-7952b3.svg)
- 호스팅 : aws s3 (https://ap-northeast-2.console.aws.amazon.com/s3/buckets/officecon-pub?region=ap-northeast-2&tab=objects&bucketType=general)
- 이미지 스토리지 : aws s3 (추가 예정)

## 폴더 구조

```sh
/ - 루트, html파일들
/css - css 폴더
/fonts - 폰트 폴더
/images - 이미지 폴더
/js - js 폴더
/.github - actions 배포 설정 폴더
```

## 작업 및 배포 가이드

- html 작업 시 js파일의 CORS 이슈가 있으므로 로컬서버를 사용해야 합니다. 하위 항목의 서비스를 사용하시거나 편하신 로컬환경 구축하여 사용하셔도 무방합니다.
  - vsCode 사용 중이시면 'live server' 익스텐션 설치하여 구동
  - npm의 http-server 사용
- github의 actions를 통해 배포 자동화가 세팅되어 있습니다.
  - main브랜치가 push되면 자동으로 s3에 배포가 시작됩니다.
  - 수동배포를 원하시면 Actions에 세팅한 Deployment에서 배포합니다.

## 페이지 리스트

- 메인: http://officecon-pub.s3-website.ap-northeast-2.amazonaws.com/
