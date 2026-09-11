// Initialize MongoDB database
db = db.getSiblingDB('mcreative_db')

db.createUser({
  user: 'mcreative_user',
  pwd: 'mcreative_password',
  roles: [
    {
      role: 'readWrite',
      db: 'mcreative_db',
    },
  ],
})

console.log('MongoDB initialization completed')
