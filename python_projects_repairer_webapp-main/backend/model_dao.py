
def get_models(connection):
    cursor = connection.cursor()
    query = ("select * from model")
    cursor.execute(query)
    response = []
    for (model_id, model_name) in cursor:
        response.append({
            'model_id': model_id,
            'model_name': model_name
        })
    return response


if __name__ == '__main__':
    from sql_connector import get_sql_connection

    connection = get_sql_connection()
    # print(get_all_parts(connection))
    print(get_models(connection))