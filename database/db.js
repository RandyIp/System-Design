require('dotenv').config()
const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

// set up, set to false to turn off, comment things out if you only need specifics
if (false) {
  pool.query(`CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY NOT NULL, product_id INT, rating INT, date BIGINT, summary VARCHAR(500), body VARCHAR(1000), recommend BOOLEAN, reported BOOLEAN DEFAULT false, reviewer_name VARCHAR(500), reviewer_email VARCHAR(500), response VARCHAR(1000), helpfulness INT DEFAULT 0
  );`, (err) => {
    if (err) throw err
    pool.query(`CREATE INDEX IF NOT EXISTS reviews_index ON reviews(product_id);`)
    // COPY reviews(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) FROM '/Users/randy/hackreactor/SDC/CSV/reviews.csv' DELIMITER ',' CSV HEADER;

    // SELECT setval('reviews_review_id_seq', (SELECT MAX(review_id) FROM reviews)+1);
  })

  pool.query(`CREATE TABLE IF NOT EXISTS photos(
    id SERIAL PRIMARY KEY NOT NULL, review_id INT REFERENCES reviews (review_id), url VARCHAR(200)
  );`, (err) => {
    if (err) throw err
    pool.query(`CREATE INDEX IF NOT EXISTS photos_index ON photos (review_id);`, (err) => { if (err) throw err })
    // COPY photos (id, review_id, url) FROM '/Users/randy/hackreactor/SDC/CSV/reviews_photos.csv' DELIMITER ',' CSV HEADER;

    //SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos)+1);
  })

  pool.query(`CREATE TABLE IF NOT EXISTS meta (
    id SERIAL PRIMARY KEY NOT NULL, characteristic_id INT, review_id INT REFERENCES reviews (review_id), value INT
    );`, (err) => {
    if (err) throw err
    pool.query(`CREATE INDEX IF NOT EXISTS meta_index ON meta (characteristic_id);`, (err) => {
      if (err) throw err
    })
    // COPY meta(id, characteristic_id, review_id, value) FROM '/Users/randy/hackreactor/SDC/CSV/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

    //SELECT setval('meta_id_seq', (SELECT MAX(id) FROM meta)+1);
  })

  pool.query(`CREATE TABLE IF NOT EXISTS characteristics(id SERIAL PRIMARY KEY NOT NULL, product_id INT, name VARCHAR(100));`,
    (err) => {
      if (err) throw err
      pool.query(`CREATE INDEX IF NOT EXISTS characteristics_index ON characteristics (product_id);`, (err) => {
        if (err) throw err
      })
      // COPY characteristics FROM '/Users/randy/hackreactor/SDC/CSV/characteristics.csv' DELIMITER ',' CSV HEADER;
    })

  // ALTER TABLE reviews ALTER COLUMN date TYPE TIMESTAMP USING to_timestamp(date/1000);
}
module.exports = pool
