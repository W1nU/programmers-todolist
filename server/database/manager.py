from database.access.maria import maria
from database.access.redis import redis

class manager:
    def __init__(self):
        self.maria = maria()
        self.redis = redis()
   
    def check_db_server(func):
        def inner(*args):
            try:
                return func(*args)
            except Exception as e:
                print(e)
                return {'status': 0, 'contents' : "데이터베이스 서버에 문제가 있습니다. 관리자에게 문의하세요"}
        return inner

    @check_db_server
    def session_check(self, key, email):
        s_key = redis.open_session(email)
        if s_key == '0':
            return 0

        if s_key == key:
            return 1

    @check_db_server
    def check_duplicate(self, q_type, content):
        if q_type == "user_email":
            if self.maria.check_email_duplicate(content)[0][0] == True:
                return [1, "이미 가입된 이메일 입니다"]
            else:
                return [0, ""]

    @check_db_server
    def create_todo(self, q_type, content):
        if self.session_check(content['key'], content['user_email']) == 0:
            return {'status': 2, 'contents' : "세션오류"}
        if q_type == "with_time":
            self.maria.create_todo_with_time(content)
                
        elif q_type == "without_time":
            self.maria.create_todo_without_time(content)
            
        else:
            return [0, "정상적인 요청이 아닙니다"]
                
        return [1, "정상적으로 등록되었습니다"]

    @check_db_server
    def signin(self, content):
        if self.check_duplicate("user_email", content)[0] == 0:
            self.maria.create_user(content)
            return {
                "status" : 1,
                "contents" : "정상 가입"
                }
        
        else:
            return [0, "이미 가입된 이메일 입니다"]

    @check_db_server
    def login(self, content):
        user = self.maria.find_user(content)
        if self.check_duplicate("user_email", content)[0] == 0:
            return [0, "가입되지 않은 이메일 입니다"]
        print(user[0][2], content)
        if user[0][2].strip() == content['user_password']:
            s_key = redis.create_session(content['user_email'])
            return [1, "정상 로그인", S_key]
        
        else:
            return [0, "아이디와 비밀번호를 확인하세요"]

    