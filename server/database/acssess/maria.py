import pymysql
import database.sql.user

class maria:
    def __init__(self):
        self.maria_user = input('Insert username : ')
        self.password = getpass('Insert password : ')
        self.user = user()

    def execute(self, sql):
        connect = pymysql.connect(host = 'localhost',
                                  port = 3306,
                                  user = self.maria_user,
                                  password = self.password,
                                  db = 'todo',
                                  charset = 'utf8')
        cursor = connect.cursor()
        cursor.excute(sql)
        connect.commit()

    def s_execute(self, sql):
        connect = pymysql.connect(host = 'localhost',
                                  port = 3306,
                                  user = self.maria_user,
                                  password = self.password,
                                  db = 'todo',
                                  charset = 'utf8')
        cursor = connect.cursor()
        cursor.execute(sql)
        return cursor.fetchall()
    
    def check_email_duplicate(self, content):
        sql = f"""SELECT EXISTS(SELECT user_email FROM user WHERE email = '{content['user_email']}');"""
        return self.s_excute(sql)

    def create_user(self, content):
        sql = f"""INSERT INTO user(user_email, user_password) VALUES ({content['user_email']}, {content['user_password']});"""
        self.execute(sql)

    def create_todo_with_time(self, content):
        sql = f"""INSERT INTO todo(todo_user, todo_title, toto_content) VALUES ({content['todo_user']}, {content['todo_title']}, {content['todo_content']});"""
        self.excute(sql)
        
    def find_user(self, content):
        sql = f"""SELECT * FROM user WHERE email = '{content['user_email']}'"""
        return self.s_execute(sql)
        