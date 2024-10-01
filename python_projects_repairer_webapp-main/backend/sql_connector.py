import datetime
import mysql.connector

__cnx = None

def get_sql_connection():
  print("Opening mysql connection")
  global __cnx

  if __cnx is None:
    __cnx = mysql.connector.connect(
      host="localhost",
      user='root',
      password='Asus2024.',
      database='repairers')

  return __cnx