from datetime import datetime
from sql_connector import get_sql_connection

def insert_repaired_unit(connection, repaired_unit):
    cursor = connection.cursor()

    repaired_unit_query = ("INSERT INTO repaired_unit "
             "(repairer_name, total, datetime)"
             "VALUES (%s, %s, %s)")
    repaired_unit_data = (repaired_unit['repairer_name'], repaired_unit['grand_total'], datetime.now())

    cursor.execute(repaired_unit, repaired_unit_data)
    order_id = cursor.lastrowid

    repaired_details_query = ("INSERT INTO repaired_details "
                           "(repaired_unit_id, part_id, quantity, total_price)"
                           "VALUES (%s, %s, %s, %s)")

    repaired_details_data = []
    for repaired_detail_record in repaired_unit['repaired_details']:
        repaired_details_data.append([
            order_id,
            int(repaired_detail_record['part_id']),
            float(repaired_detail_record['quantity']),
            float(repaired_detail_record['total_price'])
        ])
    cursor.executemany(repaired_details_query, repaired_details_data)

    connection.commit()

    return order_id

def get_repaired_details(connection, unit_id):
    cursor = connection.cursor()

    query = "SELECT * from repaired_details where repaired_id = %s"

    query = "SELECT repaired_details.repaired_id, repaired_unit_details.quantity, repaired_unit_details.total_price, "\
            "parts.name, parts.price_per_part FROM repaired_details LEFT JOIN products on " \
            "repaired_details.part_id = parts.part_id where repaired_details.repaired_id = %s"

    data = (unit_id, )

    cursor.execute(query, data)

    records = []
    for (repaired_id, quantity, total_price, part_name, price_per_part) in cursor:
        records.append({
            'repaired_id': repaired_id,
            'quantity': quantity,
            'total_price': total_price,
            'part_name': part_name,
            'price_per_part': price_per_part
        })

    cursor.close()

    return records

def get_all_repaired_unit(connection):
    cursor = connection.cursor()
    query = ("SELECT * FROM repaired_unit")
    cursor.execute(query)
    response = []
    for (unit_id, repairer_name, total, dt) in cursor:
        response.append({
            'unit_id': unit_id,
            'repairer_name': repairer_name,
            'total': total,
            'datetime': dt,
        })

    cursor.close()

    # append order details in each order
    for record in response:
        record['repaired_details'] = get_repaired_details(connection, record['unit_id'])

    return response

if __name__ == '__main__':
    connection = get_sql_connection()
    print(get_all_repaired_unit(connection))
    # print(get_repaired_details(connection,4))
    # print(insert_order(connection, {
    #     'repairer_name': 'joy',
    #     'total': '500',
    #     'datetime': datetime.now(),
    #     'order_details': [
    #         {
    #             'product_id': 1,
    #             'quantity': 2,
    #             'total_price': 50
    #         },
    #         {
    #             'product_id': 3,
    #             'quantity': 1,
    #             'total_price': 30
    #         }
    #     ]
    # }))