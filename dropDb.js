var lt = db.getMongo().getDB('test_db');
print("dropping " + lt.getName());
lt.dropDatabase();