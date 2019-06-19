LOAD DATA LOCAL INFILE '/Users/stevenjraaen/Downloads/baseballdatabank-2019.2/core/Schools.csv'
INTO TABLE colleges
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(schoolID,name_full,city,state,country);