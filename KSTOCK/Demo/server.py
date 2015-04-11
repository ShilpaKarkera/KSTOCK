import csv
import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
import thread
import json
import redis
r= redis.StrictRedis()
ItemArr = []

def GetInventoryData():
    with open('itemList.csv', 'r') as fp:
        rdr = csv.reader(fp)
        for i in rdr:

            mydict = {}
            mydict['Item'] = i[0]
            mydict['Quantity'] = i[1]
            mydict['CRate'] = i[2]
            ItemArr.append(mydict)
    return ItemArr


class InvenHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header("Content-Type", "text/plain")
        self.set_header("Access-Control-Allow-Credentials", "true")
        self.set_header('Access-Control-Allow-Origin','*') 
        self.set_header('Access-Control-Allow-Methods',
                         'POST, GET, PUT, PATCH, DELETE, OPTIONS')
        self.set_header('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
        a = r.hget('InvData', 'Pizza')
        a.replace("'", '"')

        self.write(json.dumps(a))

class InventoryHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header("Content-Type", "text/plain")
        self.set_header("Access-Control-Allow-Credentials", "true")
        self.set_header('Access-Control-Allow-Origin','*'); 
        self.set_header('Access-Control-Allow-Methods',
                         'POST, GET, PUT, PATCH, DELETE, OPTIONS')
        self.set_header('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
        item = GetInventoryData()
        MainInv =  {'MainList': item}
        self.write(MainInv)

class chartHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header("Content-Type", "text/plain")
        self.set_header("Access-Control-Allow-Credentials", "true")
        self.set_header('Access-Control-Allow-Origin','*'); 
        self.set_header('Access-Control-Allow-Methods',
                         'POST, GET, PUT, PATCH, DELETE, OPTIONS')
        self.set_header('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
        ChartArr = []
        for i in ItemArr:
            cdict = {}
            cdict['data'] = [i['Quantity']]
            cdict['name'] = i['Item']
            ChartArr.append(cdict)

        # item = GetInventoryData()
        # MainInv =  {'MainList': item}
        self.write(ChartArr)

class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    @tornado.web.asynchronous   
    def on_message(self, message):
        def run(*args):
            try:
                rdata = json.loads(message)
                if(rdata.keys()[0] == 'MainList' ):
                    for i in rdata[u'MainList']:
                        r.hset('InvData', i[u'Item'], i)
                elif(rdata.keys()[0] == 'Table'):
                    print rdata

                for i in rdata[u'Table']:
                    for j in i[i.keys()[0]]:
                        r.hset(i.keys()[0], j, i[i.keys()[0]][j])
            except:
                pass
        thread.start_new_thread(run, ())
        pass

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/websocket', WebSocketHandler),
            (r"/getInv/", InventoryHandler),
            (r'/getChart/', chartHandler),
            (r'/Inv/',InvenHandler)
        ]
        tornado.web.Application.__init__(self, handlers)

if __name__ == "__main__":
    ws_app = Application()
    server = tornado.httpserver.HTTPServer(ws_app)
    server.listen(8020)
    ioloop =tornado.ioloop.IOLoop.instance()
    ioloop.start()
