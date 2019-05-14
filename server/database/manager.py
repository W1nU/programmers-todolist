from database.acssess.maria import maria

class check_db_server:
    def __init__(self, func):
        self.func = func
    
    def __call__(self, *args, **kwargs):
        try:
            return self.func(*args, **kwargs)
        except:
            return {'status': 0, "contents" : "데이터베이스 서버에 문제가 있습니다. 관리자에게 문의하세요."}
        
class manager:
    def __init__(self):
        self.maria = maria()
    # todo - 데코레이터 통해서 서버 상태 점검 
    
    @check_db_server
    def check_duplicate(self, q_type, content):
        if q_type == "user_email":
            if self.maria.check_email_duplicate(content) == True:
                return [1, "이미 가입된 이메일 입니다"]
            else:
                return [0, ""]

    @check_db_server
    def create_todo(self, q_type, content):
        if q_type == "with_time":
            self.maria.create_todo_with_time(content)
                
        elif q_type == "without_time":
            self.maria.create_todo_without_time(content)
            
        else:
            return [0, "정상적인 요청이 아닙니다"]
                
        return [1, "정상적으로 등록되었습니다"]

    @check_db_server
    def signin(self, content):
        if self.check_duplicate(self, "user_email", content)[0] == 0:
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
        if user['user_password'] == content['user_password']:
            return [1, "정상 로그인"]
        
        else:
            return [0, "아이디와 비밀번호를 확인하세요"]
