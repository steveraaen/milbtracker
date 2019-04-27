
http://a841-dotweb01.nyc.gov/datafeeds/ParkingReg/Parking_Regulation_Shapefile.zip
# Step 1: convert to ndjson and filter out all non street sweeping signs
# ----Initial reduction includes boro, objectid, order no, MUTCD code, sign text and location (375,408 lines | 84.72mb)
shp2json -n ./Parking_Regulation_Shapefile/Parking_Regulation_Shapefile.shp | ndjson-map '{"type": "Feature", "properties": {"B": d.properties.SG_KEY_BOR, "ID": d.properties.OBJECTID, "MUT": d.properties.SG_MUTCD_C, "T": d.properties.SIGNDESC1}, "geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}'   > rawSigns.ndjson
# ----Since nulls interfere with matching Broom strings, get rid of sign text === nulls (374,584 lines | 84.58mb)
ndjson-filter < allSigns.ndjson 'd.properties.T != null' > allSignsNoNull.ndjson
# ----Filter out signs that don't have the word "BROOM" in the sign's text (193,188 lines | 45.75mb)
ndjson-filter < allSignsNoNull.ndjson 'd.properties.T.includes("BROOM")' > justBrooms.ndjson

# Step 2: find and trim text of each distinct MUTCD code, and load to mongo
# --------------Prepare table of MUTCD (sign definition codes) to sign text
ndjson-map < justBrooms.ndjson '{"T": d.properties.T, "MUT": d.properties.MUT}' > signCode.ndjson
# --------------Dedupe sign code/text file
gawk < signCode.ndjson '!seen[$0]++' > signSet.ndjson
# --------------Trim down some un-needed text (810 lines | .07mb)
gawk < signSet.ndjson '{gsub("SANITATION BROOM SYMBOL", "");print}' > setTr1.ndjson
gawk < setTr1.ndjson '{gsub("NO PARKING", "");print}' > setTr2.ndjson
gawk < setTr2.ndjson '{gsub("NIGHT REGULATION", "");print}' > setTr3.ndjson
# mongo cli import
mongoimport -h ds143362.mlab.com:43362 -d signs -c codes -u ***** -p ***** --file setTr3.ndjson 

# Step 3: Create new file with all signs borough, OBJECTID, MUTCD and geometry (193,188 lines | 23.53mb)
ndjson-map < justBrooms.ndjson '{"B": d.properties.B, "OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}' > signData.ndjson
ndjson-reduce < ksigns.ndjson | ndjson-map '{type: "FeatureCollection", features: d}' > signData.json

ndjson-filter < justBrooms.ndjson 'd.properties.B == "S"' | ndjson-map  '{"type": "Feature", "properties": {"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}}' > signDataS.ndjson
ndjson-filter < justBrooms.ndjson 'd.properties.B == "M"' | ndjson-map  '{"type": "Feature", "properties": {"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}}' > signDataM.ndjson
ndjson-filter < justBrooms.ndjson 'd.properties.B == "B"' | ndjson-map  '{"type": "Feature", "properties": {"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}}' > signDataX.ndjson
ndjson-filter < justBrooms.ndjson 'd.properties.B == "K"' | ndjson-map  '{"type": "Feature", "properties": {"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}}' > signDataK.ndjson
ndjson-filter < justBrooms.ndjson 'd.properties.B == "Q"' | ndjson-map  '{"type": "Feature", "properties": {"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}{' > signDataQ.ndjson


mongoimport -h ds143362.mlab.com:43362 -d signs -c qsigns -u ***** -p ***** --file signDataQ.ndjson 
mongoimport -h ds143362.mlab.com:43362 -d signs -c ksigns -u ***** -p ***** --file signDataK.ndjson 
mongoimport -h ds143362.mlab.com:43362 -d signs -c ssigns -u ***** -p ***** --file signDataS.ndjson 
mongoimport -h ds143362.mlab.com:43362 -d signs -c xsigns -u ***** -p ***** --file signDataX.ndjson 
mongoimport -h ds143362.mlab.com:43362 -d signs -c msigns -u ***** -p ***** --file signDataM.ndjson 



mongoimport -h ds143362.mlab.com:43362 -d signs -c hoods -u -u ***** -p ***** --file neighborhoods.json 

ndjson-reduce < ksigns.ndjson | ndjson-map '{type: "FeatureCollection", features: d}' > signData.json

ndjson-map < ksigns.ndjson '{"type": "Feature", "properties": {"B": MUT}, "geometry": {"type": "Point", "coordinates": coordinates}}'   > bkigns.json


# ------- download zip file
curl 'http://a841-dotweb01.nyc.gov/datafeeds/ParkingReg/Parking_Regulation_Shapefile.zip' -o Parking_Regulation_Shapefile.zip
# ------- extract zip file
unzip -o Parking_Regulation_Shapefile.zip
# ------- convert shp + dbf to new line json, discarding some unwanted fields
shp2json -n ./Parking_Regulation_Shapefile/Parking_Regulation_Shapefile.shp | ndjson-map '{"type": "Feature", "properties": {"B": d.properties.SG_KEY_BOR, "ID": d.properties.OBJECTID, "MUT": d.properties.SG_MUTCD_C, "T": d.properties.SIGNDESC1}, "geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}'   > rawSigns.ndjson
# ------- Since nulls interfere with matching Broom strings, get rid of sign text === nulls (374,584 lines | 78.9mb)
ndjson-filter < rawSigns.ndjson 'd.properties.T != null' > rawSignsTemp.ndjson
# ---- Filter out signs that don't have the word "BROOM" in the sign's text (193,188 lines | 42.8mb)
ndjson-filter < rawSignsTemp.ndjson 'd.properties.T.includes("BROOM")' > justBrooms.ndjson
# ---- Filter out sign text that isn't DAY or time (193,188 lines | 36.6mb)
gawk < justBrooms.ndjson '{gsub("SANITATION||BROOM||NO||PARKING||NIGHT||REGULATION||STARS||STAR||SYMBOLS||SYMBOL||HALF||MOON||SINGLE||ARROW", "");print}' > trim1.ndjson
# ---- Before cleaning up white space, convert white space to meaningful 'operators'
gawk < trim1.ndjson '{gsub("EXCEPT SUNDAY", "_MON_TUE_WED_THU_FRI_SAT_");print}' > trim2.ndjson


gawk < trim2.ndjson '{gsub("MONDAY", "MON");print}' > trim3.ndjson
gawk < trim3.ndjson '{gsub("TUESDAY", "TUE");print}' > trim4.ndjson 
gawk < trim4.ndjson '{gsub("WEDNESDAY", "WED");print}' > trim5.ndjson 
gawk < trim5.ndjson '{gsub("THURSDAY", "THU");print}' > trim6.ndjson
gawk < trim6.ndjson '{gsub("FRIDAY", "FRI");print}' > trim7.ndjson
gawk < trim7.ndjson '{gsub("SATURDAY", "SAT");print}' > trim8.ndjson
gawk < trim8.ndjson '{gsub("SUNDAY", "SUN");print}' > trim9.ndjson
gawk < trim9.ndjson '{gsub("MIDNIGHT", "12AM");print}' > trim10.ndjson
gawk < trim10.ndjson '{gsub("NOON", "12PM");print}' > trim11.ndjson
gawk < trim11.ndjson '{gsub("&", "");print}' > trim12.ndjson
gawk < trim12.ndjson '{gsub("EXCEPT SUN", "MON TUE WED THU FRI SAT");print}' > trim13.ndjson
gawk < trim13.ndjson '{gsub("MID", "12AM");print}' > trim14.ndjson
gawk < trim14.ndjson '{gsub("  (  ) _ () ", "");print}' > trim21.ndjson
gawk < trim21.ndjson '{gsub("_ ()", "");print}' > trim22.ndjson
gawk < trim22.ndjson '{gsub("(  )", "");print}' > trim23.ndjson
gawk < trim23.ndjson '{gsub("()", "");print}' > trim24.ndjson
gawk < trim24.ndjson '{gsub("()() ", "");print}' > trim25.ndjson
gawk < signDataK.ndjson '{gsub("_", " ");print}' > bksigns.ndjson

ndjson-filter < trim25.ndjson 'd.properties.B == "S"' | ndjson-map  '{"type": "Feature", "properties": {"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}}' > signDataS.ndjson
ndjson-filter < trim25.ndjson 'd.properties.B == "M"' | ndjson-map  '{"type": "Feature", "properties": {"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}}' > signDataM.ndjson
ndjson-filter < trim25.ndjson 'd.properties.B == "B"' | ndjson-map  '{"type": "Feature", "properties": {"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}}' > signDataX.ndjson
ndjson-filter < trim25.ndjson 'd.properties.B == "K"' | ndjson-map  '{"type": "Feature", "properties": {"T": d.properties.T}, "geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}' > Ksigns.ndjson
ndjson-filter < trim25.ndjson 'd.properties.B == "Q"' | ndjson-map  '{"type": "Feature", "properties": {"OID": d.properties.ID, "MUT": d.properties.MUT,"geometry": {"type": "Point", "coordinates": d.geometry.coordinates}}{' > signDataQ.ndjson

ndjson-reduce < signDataM.ndjson | ndjson-map '{type: "FeatureCollection", features: d}' > sign.json

mongoimport -h ds143362.mlab.com:43362 -d signs -c ksigns -u ***** -p ***** --file bksigns15.ndjson


gawk < Ksigns.ndjson '{gsub("_", " ");print}' > bksigns.ndjson
gawk < bksigns.ndjson '{gsub("MON", " MON ");print}' > bksigns1.ndjson
gawk < bksigns1.ndjson '{gsub("TUE", " TUE ");print}' > bksigns2.ndjson
gawk < bksigns2.ndjson '{gsub("WED", " WED ");print}' > bksigns3.ndjson
gawk < bksigns3.ndjson '{gsub("THU", " THU ");print}' > bksigns4.ndjson
gawk < bksigns4.ndjson '{gsub("THURS", " THU ");print}' > bksigns5.ndjson
gawk < bksigns5.ndjson '{gsub("FRI", " FRI ");print}' > bksigns6.ndjson
gawk < bksigns6.ndjson '{gsub("SAT", " SAT ");print}' > bksigns7.ndjson
gawk < bksigns7.ndjson '{gsub("_", " ");print}' > bksigns8.ndjson
gawk < bksigns8.ndjson '{gsub("MON", "MON ");print}' > bksigns9.ndjson
gawk < bksigns9.ndjson '{gsub("_", " ");print}' > bksigns10.ndjson
gawk < bksigns10.ndjson '{gsub("MON", "MON ");print}' > bksigns11.ndjson
gawk < bksigns11.ndjson '{gsub("_", " ");print}' > bksigns12.ndjson
gawk < bksigns12.ndjson '{gsub("  ", " ");print}' > bksigns13.ndjson
gawk < bksigns13.ndjson '{gsub("  ", " ");print}' > bksigns14.ndjson
gawk < bksigns14.ndjson '{gsub("  ", " ");print}' > bksigns15.ndjson
gawk < bksigns15.ndjson '{gsub("\" ", "\"");print}' > bksigns16.ndjson

sed -e '<div class="placeholder"></div>

sed -e 's/Here\(.*\)String/\1/'