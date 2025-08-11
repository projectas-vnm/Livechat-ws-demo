openssl rand -base64 756 > mongo-keyfile
chmod 400 mongo-keyfile


rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "192.168.1.57:27017" },
    { _id: 1, host: "192.168.1.57:27018" },
    { _id: 2, host: "192.168.1.57:27019" }
  ]
})