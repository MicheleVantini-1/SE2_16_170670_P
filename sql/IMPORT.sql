COPY users
  FROM 'sql/data/users.csv' 
  WITH (FORMAT CSV);
SELECT setval('users_id_seq', MAX(id)) FROM users;

COPY orders
  FROM 'sql/data/users.csv' 
  WITH (FORMAT CSV);
SELECT setval('users_id_seq', MAX(id)) FROM users;

COPY dishes
  FROM 'sql/data/users.csv' 
  WITH (FORMAT CSV);
SELECT setval('users_id_seq', MAX(id)) FROM users;

COPY orders_ingredients
  FROM 'sql/data/users.csv' 
  WITH (FORMAT CSV);
SELECT setval('users_id_seq', MAX(id)) FROM users;

COPY dishes_ingredients
  FROM 'sql/data/users.csv' 
  WITH (FORMAT CSV);
SELECT setval('users_id_seq', MAX(id)) FROM users;