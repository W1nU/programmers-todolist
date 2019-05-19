from database.access.maria import maria
from database.access.sessiondb import rdis

class manager:
    def __init__(self):
        self.maria = maria()
        self.redisobj = rdis()
   
    def check_db_server(func):
        def inner(*args):
            try:
                return func(*args)
            except Exception as e:
                print(e)
                return {'status': 0, 'contents' : "데이터베이스 서버에 문제가 있습니다. 관리자에게 문의하세요"}
        return inner

    @check_db_server
    def session_check(self, content):
        s_key = self.redisobj.open_session(content['user_email'])
        
        if s_key == content['sessionKey']:
            return [1, "세션 확인 성공"]
        else:
            return [2, "세션 오류"]
            
    @check_db_server
    def check_duplicate(self, q_type, content):
        if q_type == "user_email":
            if self.maria.check_email_duplicate(content) == True:
                return [1, "이미 가입된 이메일 입니다"]
            else:
                return [0, ""]

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
        print(user)
        if self.check_duplicate("user_email", content)[0] == 0:
            return [0, "가입되지 않은 이메일 입니다"]

        if user[0][2].strip() == content['user_password']:
            if self.redisobj.is_exist_session(content['user_email']) == 1:
                s_key = self.redisobj.open_session(content['user_email'])
            else:
                s_key = self.redisobj.create_session(content['user_email'])
            return [1, "정상 로그인", s_key]

        else:
            return [0, "아이디와 비밀번호를 확인하세요"]
    
    def logout(self, content):
        redisobj.drop_session(content['user_email'])
        return [1, "정상 로그아웃"]

    def update_todo(self, content):
        print(content)
        if self.session_check(content)[0] == 1:
            print("run")
            if self.maria.is_exist_todo(content)[0][0] == True:
                print("1")
                self.maria.update_todo(content)
            else:
                print("2")
                self.maria.create_todo(content)
            return [1, "정상 수정"]
        
        else:
            return [2, "세션 오류"]
    
    def get_todo(self, content):
        if self.session_check(content)[0] == 1:
            if self.maria.is_exist_todo(content)[0][0] == True:
                return self.maria.find_user_todo(content['user_email'])[0][0]

            else:
                return [0, "해당 사용자의 투두가 존재하지 않음"]
        
        else:
            return [2, "세션 오류"]


    
    

        


        
