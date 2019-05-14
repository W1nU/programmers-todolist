import database.acssess.maria as maria

class manager:
    def __init__(self):
        self.maria = maria()
    # todo - 데코레이터 통해서 서버 상태 점검 

    def check_db_server(func):
        def decorated():
            try:
                func()
            except:
                return [0, "데이터베이스 서버에 문제가 있습니다. 관리자에게 문의하세요."]
    
    @self.check_db_server
    def check_duplicate(self, q_type, content):
        if q_type == "email":
            if self.maria.check_email_duplicate(content) == True:
                return [1, "이미 가입된 이메일 입니다"]
            else:
                return [0, ""]

    @self.check_db_server
    def create_todo(self, q_type, content):
        if q_type == "with_time":
            self.maria.create_todo_with_time(content)
                
        elif q_type == "without_time":
            self.maria.create_todo_without_time(content)
            
        else:
            return [0, "정상적인 요청이 아닙니다"]
                
        return [1, "정상적으로 등록되었습니다"]