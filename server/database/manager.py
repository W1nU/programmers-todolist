import database.acssess.maria as maria

class manager:
    def __init__(self):
        self.maria = maria()

    def check_duplicate(self, type, content):
        if type == "email":
            if self.maria.check_email_duplicate(content) == True:
                return [1, "이미 가입된 이메일 입니다"]
            else:
                return [0, ""]

    
    def create_todo(self, content):
        