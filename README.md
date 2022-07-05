# ContiNew

#### 한줄 소개

빅데이터를 활용하여 간단한 설문 조사 및 좋아요 기반을 통해 사용자의 취향에 맞는 향수 추천 및 향수 정보 제공 서비스.

### ✨ 프로젝트 소개

**ContiNew**는 이어살기 및 쉐어하우스를 중개해주는 부동산 플랫폼 입니다.

2년 전, 코로나로 인해 모든 것이 온라인으로 대체되고 월세에 발목잡혀 방도 못 빼는 대학생들을 많이 볼 수 있었습니다. 이처럼 특정한 상황으로 인해 계약기간을 다 채우지 못하고 방을 빼야하는 상황이 종종 생깁니다.

또 다른 문제로 해를 거듭할수록 월세 가격이 상승하는 것을 통계적으로 확인할 수 있었습니다. 비싼 월세 부담을 줄이기 위해 룸메이트를 구하는 경우가 있습니다.

위와 같은 상황에서 학생들은 에브리타임, 페이스북 등 다양한 커뮤니티를 통해 이어살 사람을 구하거나 룸메이트를 구하게 됩니다. 분산화된 플랫폼으로 인해 여러 커뮤니티를 확인해야하는 불편함이 존재했고, 불법으로 이뤄지는 경우가 많았습니다.

이러한 문제를 해결하기 위해 이어살기 및 쉐어하우스를 하나의 플랫폼으로 제공하고 온라인 계약을 통해 안전한 거래를 할 수 있는 **ContiNew**를 개발하였습니다.



### 📄 프로젝트 개요

- **진행 기간:** 2022.04.11 ~ 2022.05.20
- **목표**
  - 월세 계약에 일정 기간 만큼 이어 살 사람을 구하거나 “이어살기”를 할 집을 구할 수 있는 “이어살기” 중개 서비스를 개발한다.
  - 기존 부동산 서비스와 달리 허위 매물을 줄여 차별화를 강조해 사용자 만족도를 높인다.
  - 지금까지 학습한 기술을 모두 접목하여 1년 뒤 다시 보아도 쉽게 파악할 수 있는 코드를 작성하고, 서비스로서의 완성도, 안정성 그리고 최적화를 모두 갖춘 프로젝트를 완성한다.
- 🖼 **기획 개요 및 배경**
  - 보통 월세 계약기간은 1년으로 한다.
  - 하지만 계약기간을 다 채우지 못하는 상황이 발생한다.
  - 이어살기를 중개해주는 서비스 플랫폼이 거의 없다.
  - 이어살 사람을 구하기 위해 에타, 페이스북 등 다양한 커뮤니티를 이용하게 된다.
  - 이 때 여러 커뮤니티에 글을 올려야 하는 불편함이 있다.
  - 이어살기를 구하는 사람도 마찬가지이다.
- 🎉 **기대효과**
  - 분산된 게시글들을 모아서 플랫폼화 ⇒ 사용자들이 편리하게 검색할 수 있다.
  - 이어살기 구하는 사람과 입주자 양쪽 모두 구하기에 편리하다.
  - 단기 임대의 수요를 맞출 수 있다. (ex. 한달살기)
  - 임차인이 계약 만기 전에 방을 비워야 할 경우 월세를 계속 부담할 필요없이 매물 양도 가능하다.
  - 채팅을 통해 계약 조건 및 룸 컨디션을 구체적으로 파악할 수 있다. (ex. 소음, 벌레, 층간소음 등)
  - (쉐어하우스) 내가 원하는 조건의 룸메이트를 공지하고 구할 수 있다.
- 👩‍👧‍👦 **핵심 키워드 3가지**
  - 매물 등록 및 검색
    - 옵션에 따른 필터링 기능
    - 지도를 통한 매물 검색
  - 실시간 채팅
    - 판매자와 1:1 채팅 기능
    - 개인정보 노출 방지
    - 채팅 로그 확인
  - 비대면 계약
    - 온라인 계약서 제공
    - 3단계로 진행되는 안전한 계약
    - 마이페이지를 통한 내 계약 확인
- 🎬 **프로젝트 UCC**



## **🧰** 사용기술 및 아키텍쳐

### 1. ERD

![search](https://cdn.discordapp.com/attachments/962869113766707270/982186583476301894/unknown.png)



### 2. 아키텍쳐

![search](https://user-images.githubusercontent.com/97500667/171812103-68bb150a-d704-4bdc-bebc-fa33ba1d33e5.png)

### 3. 사용 스킬![search](https://user-images.githubusercontent.com/97500667/171811829-3e353947-8c26-4fb8-a15e-6f0839e732a5.png)



### 📄 주요 기능

#### 인증

- ContiNew는 휴대폰 인증을 통해 인증된 유저인지를 확인할 수 있습니다. 인증된 유저라면 좀 더 안심하고 거래를 진행할 수 있을 것입니다.

#### 매물 등록 및 검색

[![search](https://user-images.githubusercontent.com/97500667/171806927-8d3e9777-f6b6-49bd-a629-97e263ebdfd4.png)](https://user-images.githubusercontent.com/97500667/171806927-8d3e9777-f6b6-49bd-a629-97e263ebdfd4.png)

- 매물 등록은 1인당 1개씩만 가능하며 지도에서 쉽게 확인을 할 수 있습니다.
- 거래 유형, 임대 기간, 보증금 등 다양한 옵션 필터 기능을 제공하며 원하는 지역에서 검색할 수 있습니다.

#### 채팅

[![chatting](https://user-images.githubusercontent.com/97500667/171807032-84aef7ab-601d-4a71-8794-9b920410d39d.png)](https://user-images.githubusercontent.com/97500667/171807032-84aef7ab-601d-4a71-8794-9b920410d39d.png)

- 상세페이지에서 채팅하기 버튼을 통해 판매자와 1:1 채팅을 할 수 있습니다.
- 채팅페이지에서도 간략하게 해당 매물 정보를 확인할 수 있습니다.
- 채팅 로그는 저장되며 스크롤을 통해 이전 채팅 기록을 불러올 수 있습니다.

#### 온라인 계약

[![contract](https://user-images.githubusercontent.com/97500667/171807097-7015b051-63b8-483c-b24f-9a5278c43813.png)](https://user-images.githubusercontent.com/97500667/171807097-7015b051-63b8-483c-b24f-9a5278c43813.png)

- 채팅페이지에서 계약요청을 할 수 있고 상대방이 수락하게 되면 계약이 진행됩니다.
- 1단계에서 판매자(전대인)가 먼저 계약서를 작성합니다.
- 2단계에서 구매자(전차인)는 판매자가 작성한 계약서를 확인하고 인적사항 작성 및 서명을 합니다.
- 3단계에서 판매자는 구매자의 인적사항 및 서명을 확인하고 최종적으로 서명을 합니다. 이 때 판매자는 이전에 작성한 항목을 수정할 수 없으며 서명만 할 수 있습니다.
- 3단계까지 진행하면 계약이 최종 완료되며 마이페이지를 통해 내 계약을 확인할 수 있습니다.





#### 기타 협업 룰

- **Jira**

  - 에픽은 각자 맡은 기능으로 구분하여 사용
  - 스프린트 시작 전까지 금주 에픽 및 스토리 등록
  - 스프린트 기간(월~금) 설정 후 시작
    - 월요일 10시
    - 백로그 → 스프린트로 스토리 옮기기
  - 스토리 포인트는 1시간에 1포인트
  - Description에 as-is 와 to-be 작성

  

- #### Git convention

  ```
  $ git commit -m [#'이슈번호'] 타입 : 작업 설명 
  ```

  - 과거시제 및 첫 시작을 대문자로 사용하지 않는다

  ##### 커밋메시지 타입

  | git status | 의미                                      |
  | ---------- | ----------------------------------------- |
  | feature    | 기능 작업 시 사용                         |
  | doc        | 문서 작업 시 사용                         |
  | style      | 스타일 작업 시 사용                       |
  | refactor   | 코드 리팩토링 시 사용                     |
  | fix        | 버그 수정시 사용                          |
  | chore      | 빌드 업무 수정, 패키지 매니저 수정시 사용 |



#### 소감

- 우동진(팀원 / Frontend)

  - 구현 파트 : 매물 검색(지도 및 필터링 구현), 매물 올리기 및 수정, 매물 상세보기 페이지 UI 및 API 구현

  - 카카오 API를 연결하여 주소 찾기 및 지도를 구현하는 과정에서 타입을 좀 더 효율적으로 사용하지 못한게 아쉬웠다. 하지만 외부 API 문서를 보며 프로젝트에 잘 녹여내어서 이후에 다른 프로젝트를 하더라도 외부 API를 사용하는데 큰 어려움은 없을 것 같다. 
  
  - 글 작성 및 수정을 하는 과정에서 업로드 할 사진을 preview 하는 기능을 만들었는데, 수정 과정에서 FormData 및 DataTrasfer로서는 preview 기능을 구현하지 못해 결국 글 작성할때만 preview기능을 구현한것이 아쉬웠다. 여러가지 방법을 찾아봤지만 아직 프론트에서 해결은 못할거같다. 혹시 아는 사람이 있으면 방법을 꼭 알고 싶다
  
  - Next.js로 구현을 했으나 막상 프로젝트를 시작하며 기능 구현에 시간이 쫓겨 Next.js를 공부 하지도 못하고 Next.js의 기능을 전혀 사용하지 못한 부분이 굉장히 아쉽고 Next.js는 계속 공부를 더 해야 할것 같다.
  
- [방기진](https://github.com/GJBBang)(팀원 / Frontend)
  - 소켓 통신을 사용해볼 수 있었고 이번 프로젝트에서 특히 서버와 의사소통이 얼마나 중요한지를 깨닫게 되었다.
  - 기획 단계에서 레퍼런스를 참고하여 기능 구현을 계획했음에도 불구하고 생각처럼 기능구현이 제대로 되지 않아 딜레이가 많이 되었고 기획했던 모든 기능을 시간 내 구현하지 못해 아쉬웠다.
  - 알림 기능은 추가적으로 구현해볼 생각이다.
  - 중복되는 데이터 타입에 대해 파일을 만들어 관리할 수 있도록 아키텍처를 구성했지만 실제로 적용하지 못했다. 팀원들이 작성한 코드를 참고하여 리펙토링을 추후 진행할 것이다.
  - 테스트코드 또한 작성해볼 것이다.
  - next.js를 적용했으나 이해를 잘 못하였고 공부가 더 필요하다.