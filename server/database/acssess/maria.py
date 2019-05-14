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
        sql = """SELECT EXISTS(SELECT user_email FROM user WHERE email = '{content}')"""
        return self.s_excute(sql)
            
