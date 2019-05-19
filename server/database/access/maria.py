import pymysql
from getpass import getpass

class maria:
    def __init__(self):
        self.maria_user = "todo" 
        self.password = "password"

    def execute(self, sql):
        connect = pymysql.connect(host = 'localhost',
                                  port = 3306,
                                  user = self.maria_user,
                                  password = self.password,
                                  db = 'todo',
                                  charset = 'utf8')
        cursor = connect.cursor()
        cursor.execute(sql)
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
        sql = f"""SELECT EXISTS(SELECT user_email FROM user WHERE user_email = '{content['user_email']}');"""
        return self.s_execute(sql)[0][0]

    def create_user(self, content):
        sql = f"""INSERT INTO user(user_email, user_password) VALUES ('{content['user_email']}',' {content['user_password']}');"""
        self.execute(sql)

    def is_exist_todo(self, content):
        sql = f"""SELECT EXISTS(SELECT * FROM todo WHERE user_email = '{content['user_email']}');"""
        return self.s_execute(sql)

    def find_user(self, content):
        sql = f"""SELECT * FROM user WHERE user_email = '{content['user_email']}';"""
        return self.s_execute(sql)

    def update_todo(self, content):
        sql = f"""UPDATE todo SET todo = '{content['todo']}' WHERE user_email = '{content['user_email']}';"""
        self.execute(sql)

    def create_todo(self, content):
        sql = f"""INSERT INTO todo(user_email, todo) VALUES ('{content['user_email']}', '{content['todo']}');"""
        self.execute(sql)

    def find_user_todo(self, content):
        sql = f"""SELECT todo FROM todo WHERE user_email = '{content['user_email']}';"""
        print(sql)
        return self.s_execute(sql)
