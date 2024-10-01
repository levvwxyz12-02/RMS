from sql_connector import get_sql_connection

def get_all_parts(connection):
    cursor = connection.cursor()
    query = ("select parts.part_id, parts.name, parts.model_id, parts.price_per_part, model.model_name from parts inner join model on parts.model_id=model.model_id")
    cursor.execute(query)
    response = []
    for (part_id, name, model_id, price_per_part, model_name) in cursor:
        response.append({
            'part_id': part_id,
            'name': name,
            'model_id': model_id,
            'price_per_part': price_per_part,
            'model_name': model_name
        })
    return response

def insert_new_part(connection, part):
    cursor = connection.cursor()
    query = ("INSERT INTO parts "
             "(name, model_id, price_per_part)"
             "VALUES (%s, %s, %s)")
    data = (part['name'], part['model_id'], part['price_per_part'])

    cursor.execute(query, data)
    connection.commit()

    return cursor.lastrowid

def delete_part(connection, part_id):
    cursor = connection.cursor()
    query = ("DELETE FROM parts where part_id=" + str(part_id))
    cursor.execute(query)
    connection.commit()

    return cursor.lastrowid

if __name__ == '__main__':
    connection = get_sql_connection()
    # print(get_all_parts(connection))
    print(insert_new_part(connection, {
        'name': 'y motor',
        'model_id': '1',
        'price_per_part': '60'
    }))