from tornado import gen
import rethinkdb as r


@gen.coroutine
def dump_cursor(data):
    data_filter = []
    while (yield data.fetch_next()):
        item = yield data.next()
        data_filter.append(item)
    return data_filter


@gen.coroutine
def try_create_table(conn, tableName):
    try:
        yield r.table_create(tableName).run(conn)
        print("created table {0}".format(tableName))
    except Exception as e:
        print("Didn't create table {}: {}".format(tableName, e))
