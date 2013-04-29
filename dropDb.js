var lt = db.getMongo().getDB('photosynthesis');
print("dropping " + lt.getName());
lt.dropDatabase();