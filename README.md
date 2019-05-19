# programmers-todolist**

이 프로그램은 프로그래머스 Summer Coding 인턴 프로그램 선발 2차 과제 입니다. 

```
링크 : http://programmers-todo.s3-website.ap-northeast-2.amazonaws.com/
```



## 과제. Todo list 만들기

### 요구사항 

```
1. 기능 요구사항
  - 새로운 TODO(제목과 내용)를 작성할 수 있다.
  - TODO 목록을 볼 수 있다.
  - TODO 항목의 제목과 내용을 수정할 수 있다.
  - TODO 항목을 삭제할 수 있다.
  - 사용자의 선택에 의해 TODO에는 마감 기한을 넣을 수 있다.
  - TODO 항목의 우선순위를 설정 및 조절할 수 있다.
  - TODO 항목에 대한 완료 처리를 할 수 있다.
  - 마감기한이 지난 TODO에 대해 알림을 노출할 수 있다.

2. 성능 요구사항
  - TODO 이용 시 발생하는 오류 사항을 최소화한다.
  - 오류 발생 시 사용자가 이해하기 쉽게 표시한다.
  - 다른 사람이 읽기 쉬운 코드를 작성한다.
  - HTML/CSS에서 사용할 수 있는 최신 구조와 기술을 사용한다.

3. 인터페이스 요구사항
  -  직관적이고 의미 전달이 명확한 화면을 사용자에게 제공한다.
```



### 구현내용

```
1. 새로운 TODO(제목과 내용)를 작성할 수 있다.
  - 추가하기 버튼을 이용해 작성이 가능합니다.
2. TODO 목록을 볼 수 있다.
  - 페이지의 전면에 제목 리스트가 왼쪽에 뜨고 해당 요소를 클릭하면 오른쪽의 회색 박스에 내용이 표시됩니다.
3. TODO 항목의 제목과 내용을 수정할 수 있다.
  - 싱위 항목과 동일합니다.
4. TODO 항목을 삭제할 수 있다.
  - 삭제 버튼으로 삭제가 가능하며, 로그인 후에 삭제를 하게되면 서버에 update_todo가 호출되며 DB에서도 삭제되게 됩니다. 
5. 사용자의 선택에 의해 TODO에는 마감 기한을 넣을 수 있다.
  - DatePicker의 Clearable 옵션을 이용하여 사용자의 필요에 따라 사용이 가능하도록 구성하였습니다.
6. TODO 항목의 우선순위를 설정 및 조절할 수 있다.
  - 우선순위는 TODO를 만들거나 수정할 때 지정할 수 있으며, 수정을 통해 변경할 수 있습니다.
7. TODO 항목에 대한 완료 처리를 할 수 있다.
  - 완료버튼으로 완료할 수 있으며, 완료시 리스트에 취소선이 그어지면서 완료버튼이 비활성화 되고 수정버튼이 사라지게 됩니다. 
8. 마감기한이 지난 TODO에 대해 알림을 노출할 수 있다.
  - TODO 리스트를 생성하면서 마감기한이 임박한(오늘 또는 과거)의 TODO들은 dark박스를 이용하여 알람을 주었습니다.
9. 로그인, 회원가입
  - 네비게이션바의 로그인, 회원가입, 로그아웃 버튼을 이용해 사용이 가능하며, 로그인 여부에 따라 변경됩니다. 
  - 사용자가 회원가입 요청을 클라이언트에서 보내면, 내부적으로 1차적으로 hashing하여 전송합니다. 
    그 후 서버에서 다시 hashing한 값을 DB(maria)에 저장하고, 임의의 문자열을 hashing한 값에 
    요청 시간의 timestamp를 문자열 덧셈하여 sessionKey로 클라이언트에 전송합니다. 
    또한 sessionKey는 redis에 key = user_email, value = sessionKey로 저장됩니다.
  - 이 때 생성되는 session은 60분 동안 유지되며, 만일 타임아웃이 되기 전에 다른 요청이 들어온다면, 
    들어온 시간으로 부터 60분으로 세션을 연장하게 됩니다. 
10. DB에 TODO 저장
  - 로그인을 하면 우선 localStorage에 TODO가 있는지 검사합니다. 
    만약 없다면 서버에서 get_todo를 호출하여 디비에 있는 해당 사용자의 TODO를 가져오고, 
    만약 있다면 DB보다 localStorage가 우선시 되어 update_todo를 호출하고 이전의 TODO들을 대체하고, 새로운 정보가 저장됩니다. 
```



### 사용기술

```
- 프론트엔드
  1. HTML, CSS, JavaScript
  2. React
  3. BootStrap
  
- 백엔드
  1. Python
  2. Flask
  3. Maria, Redis
	
- 기타
  1. AWS EC2, S3
```



### 실행방법

1. 공통 - Ubuntu 18.04

```
git clone https://github.com/W1nU/programmers-todolist.git
```

2. Client 

```
cd view 
yarn build
yarn global add serve
yarn serve -s build

*yarn의 설치는 다음 링크를 참고하세요. 
  - https://yarnpkg.com/en/docs/install#mac-stable
```

3. Server 

```
cd server
pip3 install -r requirements.txt
python3 app.py
```

4. DB

```
실행을 위해서 mariaDB와 redis가 필요합니다.
```



