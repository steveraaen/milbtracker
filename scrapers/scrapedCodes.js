require('dotenv').config()
const cheerio = require('cheerio')
const request = require('request')
const mysql = require('mysql')
const puppeteer = require('puppeteer');
const chalk = require('chalk');

var baseURL ='https://www.baseball-reference.com/players'
var tail = '.shtml'
var codes = [
/*"/a/acunaro01",
"/a/adamewi01",
"/a/adamsau02",
"/a/adamsma01",
"/a/adducji02",
"/a/adriaeh01",
"/a/aguilje01",
"/a/ahmedni01",
"/a/alberma01",
"/a/alberha01",
"/a/albieoz01",
"/a/alcansa01",
"/a/alcanvi01",
"/a/alexasc02",
"/a/alfarjo01",
"/a/alforan01",
"/a/allenau01",
"/a/allenco01",
"/a/allengr01",
"/a/almonye01",
"/a/almoral01",
"/a/alonspe01",
"/a/alonsyo01",
"/a/altheaa01",
"/a/altuvjo01",
"/a/alvarjo03",
"/a/alvarjo02",
"/a/anderbr04",
"/a/anderbr06",
"/a/anderch01",
"/a/anderdr02",
"/a/anderni01",
"/a/andersh01",
"/a/anderti01",
"/a/anderty01",
"/a/andrima01",
"/a/andruel01",
"/a/andujmi01",
"/a/aranovi01",
"/a/archech01",
"/a/arciaor01",
"/a/arenano01",
"/a/armstsh01",
"/a/arraelu01",
"/a/arrieja01",
"/a/arroych01",
"/a/astudwi01",
"/a/austity01",
"/a/avilaal01",
"/a/avilape01",
"/a/avilalu01",
"/b/baderha01",
"/b/baezja01",
"/b/baezpe01",
"/b/baileho02",
"/b/bardlu01",
"/b/barlosc01",
"/b/barneau01",
"/b/barneja01",
"/b/barnema01",
"/b/barnhtu01",
"/b/barraky01",
"/b/barrefr02",
"/b/bashlty01",
"/b/bassich01",
"/b/bauertr01",
"/b/bauerja01",
"/b/beatyma01",
"/b/beckhgo01",
"/b/beckhti01",
"/b/beedety01",
"/b/beeksja02",
"/b/belljo02",
"/b/bellico01",
"/b/beltbr01",
"/b/bemboan01",
"/b/beninan01",
"/b/bergetr01",
"/b/berrijo01",
"/b/bertijo01",
"/b/bettich01",
"/b/bettsmo01",
"/b/biagijo01",
"/b/biddlje01",
"/b/biggica01",
"/b/birdgr01",
"/b/birdky01",
"/b/bishobr01",
"/b/blachty01",
"/b/blackch02",
"/b/bleieri01",
"/b/blevije01",
"/b/bogaexa01",
"/b/boltsk01",
"/b/boteda01",
"/b/bourju01",
"/b/bourjpe01",
"/b/bourqja01",
"/b/bowmama01",
"/b/boxbebr01",
"/b/brachbr01",
"/b/bradfch02",
"/b/bradlar01",
"/b/bradlja02",
"/b/brantmi02",
"/b/brasiry01",
"/b/braulst01",
"/b/braunry02",
"/b/brebbjo01",
"/b/bregmal01",
"/b/brennbr01",
"/b/breweco01",
"/b/briceau01",
"/b/brinsle01",
"/b/britoso01",
"/b/brittza01",
"/b/broxtke01",
"/b/bruceja01",
"/b/bryankr01",
"/b/buchtry01",
"/b/buehlwa01",
"/b/bumgama01",
"/b/burdini01",
"/b/burneco01",
"/b/buterdr01",
"/b/buttrty01",
"/b/buxtoby01",
"/c/cabreas01",
"/c/cabreme01",
"/c/cabremi01",
"/c/cahiltr01",
"/c/cainlo01",
"/c/calhoko01",
"/c/calhowi01",
"/c/camarjo01",
"/c/candeje01",
"/c/canhama01",
"/c/canoro01",
"/c/caratvi01",
"/c/carlesh01",
"/c/carpema01",
"/c/carpery01",
"/c/casalcu01",
"/c/cashnan01",
"/c/casteni01",
"/c/castidi01",
"/c/castilu02",
"/c/castiwe01",
"/c/castrha01",
"/c/castrja01",
"/c/castrmi01",
"/c/castrst01",
"/c/caveja01",
"/c/cedenxa01",
"/c/cervefr01",
"/c/cessalu01",
"/c/chacijh01",
"/c/chafian01",
"/c/chapmar01",
"/c/chapmma01",
"/c/chargjt01",
"/c/chatwty01",
"/c/chaveje01",
"/c/chavimi01",
"/c/chenwe02",
"/c/chiriro01",
"/c/chiriyo01",
"/c/choiji01",
"/c/choosh01",
"/c/cimbead01",
"/c/cishest01",
"/c/ciuffni01",
"/c/clarkta01",
"/c/claudal01",
"/c/clippty01",
"/c/colliti01",
"/c/confomi01",
"/c/conlead01",
"/c/contrwi01",
"/c/coonrsa01",
"/c/coopega03",
"/c/corbipa01",
"/c/cordery01",
"/c/cordefr02",
"/c/correca01",
"/c/cozarza01",
"/c/cozendy01",
"/c/crawfbr01",
"/c/crawfjp01",
"/c/crickky01",
"/c/croncj01",
"/c/cronke01",
"/c/cruzne02",
"/c/cuevano01",
"/c/culbech01",
"/d/darnatr01",
"/d/dahlda01",
"/d/darviyu01",
"/d/davieza02",
"/d/davisau01",
"/d/davisch02",
"/d/davisjd01",
"/d/davisjo05",
"/d/daviskh01",
"/d/davisra01",
"/d/davisro03",
"/d/davista01",
"/d/daviswa01",
"/d/daytogr01",
"/d/dazayo01",
"/d/dejonch01",
"/d/delosen01",
"/d/deanau01",
"/d/degroja01",
"/d/dejonpa01",
"/d/delmoni01",
"/d/descada01",
"/d/desclan01",
"/d/deshide02",
"/d/desmoia01",
"/d/deverra01",
"/d/diazal02",
"/d/diazed04",
"/d/diazel01",
"/d/diazja01",
"/d/diazya01",
"/d/dickeal01",
"/d/dickeco01",
"/d/dietrde01",
"/d/difowi01",
"/d/dixonbr01",
"/d/dominse01",
"/d/donaljo02",
"/d/doolise01",
"/d/dowdyky01",
"/d/doziebr01",
"/d/doziehu01",
"/d/drurybr01",
"/d/dudalu01",
"/d/duggast01",
"/d/dukeza01",
"/d/dunnmi01",
"/d/duplajo01",
"/d/durapmo01",
"/d/dysonja01",
"/d/dysonsa01",
"/e/eatonad02",
"/e/edwarca01",
"/e/eflinza01",
"/e/eickhje01",
"/e/elmorja01",
"/e/encared01",
"/e/engelad01",
"/e/erlinro01",
"/e/ervinph01",
"/e/escobed01",
"/e/estevca01",
"/e/estrath01",
"/f/familje01",
"/f/farmebu01",
"/f/farmeky01",
"/f/feddeer01",
"/f/felizmi01",
"/f/ferguca01",
"/f/fishede01",
"/f/flaheja01",
"/f/fletcda02",
"/f/flexech01",
"/f/florewi01",
"/f/florody01",
"/f/flowety01",
"/f/foltymi01",
"/f/fontwi01",
"/f/fordmi01",
"/f/forsylo01",
"/f/fowlede01",
"/f/francty01",
"/f/francma02",
"/f/fraziad01",
"/f/frazicl01",
"/f/frazito01",
"/f/freelky01",
"/f/freemfr01",
"/f/freemmi01",
"/f/freesda01",
"/f/freitda01",
"/f/friedma01",
"/f/frypa01",
"/f/fuentjo01",
"/g/gagnodr01",
"/g/galero01",
"/g/gallaca01",
"/g/gallegi01",
"/g/gallojo01",
"/g/gallois01",
"/g/galvifr01",
"/g/gamelbe01",
"/g/gantjo01",
"/g/garciar01",
"/g/garciav01",
"/g/garcied01",
"/g/garcigr01",
"/g/garcija04",
"/g/garcile02",
"/g/garcilu03",
"/g/garciyi01",
"/g/gardnbr01",
"/g/garliky01",
"/g/garnedu01",
"/g/garream01",
"/g/garvemi01",
"/g/gausmke01",
"/g/gearrco01",
"/g/gerbemi01",
"/g/germado01",
"/g/gibsoky01",
"/g/gileske01",
"/g/givenmy01",
"/g/glasnty01",
"/g/godleza01",
"/g/goldspa01",
"/g/gomesya01",
"/g/gomezca01",
"/g/gonzaca01",
"/g/gonzaer01",
"/g/gonzagi01",
"/g/gonzama01",
"/g/goodrni01",
"/g/goodwbr01",
"/g/gordoal01",
"/g/gordode01",
"/g/gorete01",
"/g/gosseph01",
"/g/gotttr01",
"/g/gracema02",
"/g/grandya01",
"/g/grandcu01",
"/g/grayjo02",
"/g/grayso01",
"/g/greensh02",
"/g/gregelu01",
"/g/greingr01",
"/g/greinza01",
"/g/grichra01",
"/g/grossro01",
"/g/gsellro01",
"/g/guerrja01",
"/g/guerrju02",
"/g/guerrta01",
"/g/guerrvl02",
"/g/guilllu01",
"/g/gurrilo01",
"/g/gourryu01",
"/g/gutieke01",
"/g/guzmaro01",
"/g/gyorkje01",
"/h/haaseer01",
"/h/haderjo01",
"/h/hamelco01",
"/h/hamilbi02",
"/h/hammejd01",
"/h/hampsga01",
"/h/handbr01",
"/h/hanigmi01",
"/h/hansoal01",
"/h/happja01",
"/h/hardybl01",
"/h/harpebr03",
"/h/harpery01",
"/h/harrijo05",
"/h/hartdo01",
"/h/hartlge01",
"/h/harvejo01",
"/h/healyry01",
"/h/hechaad01",
"/h/hedgeau01",
"/h/hellije01",
"/h/helslry01",
"/h/hendrky01",
"/h/hendrli01",
"/h/heredgu01",
"/h/hernace02",
"/h/hernada01",
"/h/hernaen02",
"/h/hernafe02",
"/h/hernate01",
"/h/herreod01",
"/h/herrero02",
"/h/hessda01",
"/h/heywaja01",
"/h/hicksaa01",
"/h/hicksjo02",
"/h/hicksjo03",
"/h/higasky01",
"/h/hildetr01",
"/h/hillri01",
"/h/hiranyo01",
"/h/hiurake01",
"/h/hoffmje02",
"/h/holadbr01",
"/h/holdejo02",
"/h/hollade01",
"/h/hollagr01",
"/h/holmecl01",
"/h/holtbr01",
"/h/hoskirh01",
"/h/hosmeer01",
"/h/housead01",
"/h/hudsoda02",
"/h/hudsoda01",
"/h/hugheja02",
"/h/hundlni01",
"/i/iannech01",
"/i/iglesjo01",
"/i/iglesra01",
"/i/inciaen01",
"/i/irvinco01",
"/j/jacksal02",
"/j/jacksdr01",
"/j/jacksed01",
"/j/jacksja01",
"/j/jackslu01",
"/j/janseda01",
"/j/janseke01",
"/j/jeffrje01",
"/j/jennida01",
"/j/jerezwi01",
"/j/jewelja01",
"/j/jimenel02",
"/j/jimenjo02",
"/j/joeco01",
"/j/johnsbr02",
"/j/johnsdj01",
"/j/jonesad01",
"/j/jonesja07",
"/j/josepca01",
"/j/joycema01",
"/j/judgeaa01",
"/j/juradar01",
"/k/kahnlto01",
"/k/kangju01",
"/k/kelake01",
"/k/kellebr01",
"/k/kellemi03",
"/k/kellesh01",
"/k/kellyca02",
"/k/kellyjo05",
"/k/kellyme01",
"/k/kempma01",
"/k/kempto01",
"/k/kendrho01",
"/k/keplema01",
"/k/kershcl01",
"/k/kieboca01",
"/k/kiermke01",
"/k/kineris01",
"/k/kingesc01",
"/k/kinghni01",
"/k/kinlety01",
"/k/kinslia01",
"/k/kintzbr01",
"/k/kipnija01",
"/k/klinebr01",
"/k/klubeco01",
"/k/knappan01",
"/k/kochma01",
"/k/kolarad01",
"/k/kratzer01",
"/l/lasteto01",
"/l/lagarju01",
"/l/lambja01",
"/l/lauerer01",
"/l/laurera01",
"/l/leclejo01",
"/l/lemahdj01",
"/l/leonsa01",
"/l/leonedo01",
"/l/lestejo01",
"/l/lintz02",
"/l/lindofr01",
"/l/liriafr01",
"/l/locasti01",
"/l/longsh01",
"/l/longoev01",
"/l/lopezjo02",
"/l/lopezni01",
"/l/lopezpa01",
"/l/lopezyo01",
"/l/lorenmi01",
"/l/loupaa01",
"/l/lovelri01",
"/l/lowebr01",
"/l/lowena01",
"/l/lucasjo02",
"/l/lucchjo01",
"/l/lucrojo01",
"/l/lugoda01",
"/l/lugose01",
"/l/luplojo01",
"/l/lylesjo01",
"/l/lynnla01",
"/l/lyonsty01",
"/m/machama01",
"/m/maedake01",
"/m/mahlety01",
"/m/mahtomi01",
"/m/mailelu01",
"/m/maldoma01",
"/m/mancitr01",
"/m/mapledi01",
"/m/margeni01",
"/m/margoma01",
"/m/marisja01",
"/m/markani01",
"/m/marquge01",
"/m/marteke01",
"/m/martest01",
"/m/martibr01",
"/m/martich02",
"/m/martija03",
"/m/martile01",
"/m/martiri01",
"/m/martiru01",
"/m/martica04",
"/m/martijd02",
"/m/martijo08",
"/m/mathije01",
"/m/matonph01",
"/m/matzst01",
"/m/maytr01",
"/m/maybica01",
"/m/mayermi01",
"/m/mayfija01",
"/m/mayzati01",
"/m/mazarno01",
"/m/mccanbr01",
"/m/mccanja02",
"/m/mccarke01",
"/m/mccutan01",
"/m/mcfartj01",
"/m/mcgeeja01",
"/m/mcgowky01",
"/m/mckinbi01",
"/m/mcmahry01",
"/m/mcneije01",
"/m/mcraeal01",
"/m/meadoau01",
"/m/meansjo01",
"/m/mejiaad01",
"/m/mejiafr01",
"/m/melanma01",
"/m/mercaos01",
"/m/mercejo03",
"/m/merriwh01",
"/m/mikolmi01",
"/m/millean01",
"/m/millebr02",
"/m/milleju02",
"/m/millesh01",
"/m/minormi01",
"/m/minteaj01",
"/m/molinya01",
"/m/moncayo01",
"/m/mondera02",
"/m/montafr02",
"/m/montgmi01",
"/m/mooredy01",
"/m/moralke01",
"/m/moranco01",
"/m/morelmi01",
"/m/morgaad01",
"/m/morofma01",
"/m/moronre01",
"/m/mortoch02",
"/m/moustmi01",
"/m/mullice01",
"/m/muncyma01",
"/m/munozya01",
"/m/murphda08",
"/m/murphjr01",
"/m/murphto04",
"/m/musgrha01",
"/m/musgrjo01",
"/m/myerswi01",
"/n/naquity01",
"/n/narvaom01",
"/n/naylojo01",
"/n/nerishe01",
"/n/neshepa01",
"/n/neverdo01",
"/n/newcose01",
"/n/newmake01",
"/n/nicasju01",
"/n/nidoto01",
"/n/nimmobr01",
"/n/nolaaa01",
"/n/nollja01",
"/n/norrida01",
"/n/norwoja01",
"/n/nottija01",
"/n/nunezed02",
"/n/nunezre01",
"/o/obriepe01",
"/o/ohearry01",
"/o/oneilty01",
"/o/orourry01",
"/o/obergsc01",
"/o/odorro01",
"/o/odorija01",
"/o/ohse01",
"/o/ohtansh01",
"/o/olsonma02",
"/o/osunajo01",
"/o/oswalco01",
"/o/oteroda01",
"/o/ottavad01",
"/o/owingch01",
"/o/ozunama01",
"/p/paddach01",
"/p/paganem01",
"/p/palkada01",
"/p/panikjo01",
"/p/pannoth01",
"/p/parkebl01",
"/p/parrage01",
"/p/parsowe01",
"/p/paxtoja01",
"/p/pearcst01",
"/p/pederjo01",
"/p/pedrodu01",
"/p/penafe01",
"/p/pencehu01",
"/p/peralda01",
"/p/peralfr01",
"/p/peralwa01",
"/p/peralwi01",
"/p/perazjo01",
"/p/perdolu02",
"/p/perezhe01",
"/p/perezma02",
"/p/perezmi03",
"/p/perezro02",
"/p/peterdu01",
"/p/peterti01",
"/p/petityu01",
"/p/petrija01",
"/p/phamth01",
"/p/phegljo01",
"/p/phillev01",
"/p/pillake01",
"/p/pinama01",
"/p/pindech01",
"/p/pinedmi01",
"/p/pireljo01",
"/p/piscost01",
"/p/pivetni01",
"/p/plaweke01",
"/p/polangr01",
"/p/polanjo01",
"/p/polloaj01",
"/p/pomerdr01",
"/p/ponceda01",
"/p/porceri01",
"/p/poseybu01",
"/p/poynebo01",
"/p/pradoma01",
"/p/priceda01",
"/p/profaju01",
"/p/puigya01",
"/p/pujolal01",
"/q/quantca01",
"/q/quijajo01",
"/q/quinnro01",
"/q/quintjo01",
"/r/raineta01",
"/r/ramirha01",
"/r/ramirha02",
"/r/ramirjo01",
"/r/ramirne01",
"/r/ramirni01",
"/r/ramirno01",
"/r/ramosed02",
"/r/ramoswi01",
"/r/rayro02",
"/r/realmjt01",
"/r/reddijo01",
"/r/reedco01",
"/r/reedmi02",
"/r/reiniza01",
"/r/rendoan01",
"/r/renfrhu01",
"/r/rengilu01",
"/r/reyesal02",
"/r/reyesfr01",
"/r/reyesge01",
"/r/reyespa01",
"/r/reyesvi01",
"/r/reynobr01",
"/r/reynoma01",
"/r/rhameja01",
"/r/richatr01",
"/r/rickajo01",
"/r/riddljt01",
"/r/rileyau01",
"/r/rizzoan01",
"/r/roarkta01",
"/r/roberda10",
"/r/roberda08",
"/r/robindr01",
"/r/robleha01",
"/r/roblevi01",
"/r/rodgebr02",
"/r/rodnefe01",
"/r/rodride01",
"/r/rodriri05",
"/r/rodriro03",
"/r/rodrise01",
"/r/roech01",
"/r/rogerta01",
"/r/rojasmi02",
"/r/rominau01",
"/r/romose01",
"/r/rondojo02",
"/r/rosaram01",
"/r/rosared01",
"/r/rosarra01",
"/r/rosentr01",
"/r/rossjo01",
"/r/ruizri01",
"/r/russead02",
"/r/ryanky01",
"/r/ryuhy01",
"/s/sabatc",
"/s/saladty01",
"/s/samarje01",
"/s/sampsad01",
"/s/sanchad01",
"/s/sanchan01",
"/s/sanchga02",
"/s/sanchca01",
"/s/sandopa01",
"/s/sanomi01",
"/s/santaca01",
"/s/santada01",
"/s/santade01",
"/s/santado01",
"/s/santaan02",
"/s/santihe01",
"/s/schebsc01",
"/s/scherma01",
"/s/schoojo01",
"/s/schulja02",
"/s/schwaky01",
"/s/schwifr01",
"/s/seageco01",
"/s/seageky01",
"/s/segurje01",
"/s/semiema01",
"/s/senzaan01",
"/s/senzeni01",
"/s/severpe01",
"/s/sewalpa01",
"/s/shawbr01",
"/s/shawtr01",
"/s/sherfji01",
"/s/shuckja01",
"/s/simmoan01",
"/s/sippto01",
"/s/skaggty01",
"/s/smithbu03",
"/s/smithca03",
"/s/smithdo02",
"/s/smithdw02",
"/s/smithke04",
"/s/smithma05",
"/s/smithwi04",
"/s/smoakju01",
"/s/sobotch01",
"/s/sogarer01",
"/s/solando01",
"/s/solarya01",
"/s/solerjo01",
"/s/soriajo01",
"/s/sorokmi01",
"/s/sotogr01",
"/s/sotoju01",
"/s/sparkgl01",
"/s/springe01",
"/s/stallja01",
"/s/stameer01",
"/s/stammcr01",
"/s/stanery01",
"/s/stantmi03",
"/s/stassma01",
"/s/steckdr01",
"/s/stephro01",
"/s/stevean01",
"/s/stewabr01",
"/s/stewach02",
"/s/stockro01",
"/s/storytr01",
"/s/strahma01",
"/s/strasst01",
"/s/stratch01",
"/s/stripro01",
"/s/stroppe01",
"/s/stumpda01",
"/s/suarean01",
"/s/suareeu01",
"/s/sucreje01",
"/s/suerowa01",
"/s/suzukic01",
"/s/suzukku01",
"/s/swansda01",
"/s/swanser01",
"/s/swarzan01",
"/s/swihabl01",
"/s/syndeno01",
"/t/taillja01",
"/t/tanakma01",
"/t/tapiara01",
"/t/tatisfe02",
"/t/tauchmi01",
"/t/tayloch03",
"/t/taylomi02",
"/t/teherju01",
"/t/tellero01",
"/t/teperry01",
"/t/thameer01",
"/t/thomala02",
"/t/thornty01",
"/t/thorntr01",
"/t/tilsoch01",
"/t/tomlijo01",
"/t/torregl01",
"/t/toussto01",
"/t/travisa01",
"/t/trivilo01",
"/t/troutmi01",
"/t/tuckeco01",
"/t/tulowtr01",
"/t/turnbsp01",
"/t/turneju01",
"/t/turnetr01",
"/u/urenajo01",
"/u/urenari01",
"/u/uriasju01",
"/u/uriaslu01",
"/u/urshegi01",
"/v/valaipa01",
"/v/vanmejo01",
"/v/vargail01",
"/v/vargaja01",
"/v/vasquan02",
"/v/vazquch01",
"/r/riverfe01",
"/v/velasvi01",
"/v/velazan01",
"/v/velazhe01",
"/v/vendipa01",
"/v/ventejo01",
"/v/verdual01",
"/v/verhadr01",
"/v/villajo01",
"/v/vinceni01",
"/v/vizcaar01",
"/v/vogelda01",
"/v/vogtst01",
"/v/voitlu01",
"/v/vottojo01",
"/w/wachami01",
"/w/wadety01",
"/w/wainwad01",
"/w/waldema01",
"/w/waldimi01",
"/w/walkech02",
"/w/walkene01",
"/w/wallach01",
"/w/walshja01",
"/w/wardta01",
"/w/warread01",
"/w/watsoto01",
"/w/weavelu01",
"/w/webbja01",
"/w/webbty01",
"/w/webstal01",
"/w/wendejb01",
"/w/wendljo01",
"/w/wheelza01",
"/w/whitety01",
"/w/wickro01",
"/w/wieckbr01",
"/w/wietema01",
"/w/wilkeaa01",
"/w/wilkest01",
"/w/williau01",
"/w/willini01",
"/w/willita01",
"/w/willitr01",
"/w/willima11",
"/w/wilsoal01",
"/w/wilsobr02",
"/w/wilsoju10",
"/w/wingetr01",
"/w/winkeje01",
"/w/winklda01",
"/w/wisdopa01",
"/w/wislema01",
"/w/wittgni01",
"/w/wolteto01",
"/w/wongko01",
"/w/woodrbr01",
"/w/workmbr01",
"/w/wrighky01",
"/w/wynnsau01",
"/y/yarbrry01",
"/y/yastrmi01",
"/y/yateski01",
"/y/yelicch01",
"/z/zagunma01",
"/z/zamorda01",
"/z/zavalse01",
"/z/zimmery01",
"/z/zobribe01",
"/z/zuninmi01",
"/a/adamsau01",
"/a/adamsch01",
"/a/alanirj01",
"/a/altavda01",
"/a/anderco01",
"/a/anderju01",
"/a/araujpe01",
"/b/baezsa01",
"/b/banuema01",
"/b/barreja01",
"/b/barrija01",
"/b/bassan01",
"/b/bedroca01",
"/b/biebesh01",
"/b/boydma01",
"/b/brookaa01",
"/b/buchhcl01",
"/b/bummeaa01",
"/b/bundydy01",
"/b/burrry01",
"/c/cannigr01",
"/c/carraca01",
"/c/clevimi01",
"/c/cobbal01",
"/c/coleaj01",
"/c/colege01",
"/c/coleta01",
"/c/colomal01",
"/c/cordeji01",
"/c/cortene01",
"/c/coveydy01",
"/c/curtijo02",
"/d/devench02",
"/d/diekmja01",
"/d/drakeol01",
"/d/duffety01",
"/d/duffyda01",
"/d/dullry01",
"/e/edwarjo02",
"/e/eliasro01",
"/e/ellisch01",
"/e/eovalna01",
"/e/estrama01",
"/f/fariaja01",
"/f/feierry01",
"/f/fernajo04",
"/f/festama01",
"/f/fiersmi01",
"/f/fillmhe01",
"/f/frareca01",
"/f/freemsa01",
"/f/fryja01",
"/f/fulmeca01",
"/g/garrere01",
"/g/gartory01",
"/g/gavigsa01",
"/g/giolilu01",
"/g/gomezje01",
"/g/gonzama02",
"/g/greench03",
"/g/guduare01",
"/h/haleda02",
"/h/harriwi10",
"/h/harvema01",
"/h/heanean01",
"/h/hearnta01",
"/h/hembrhe01",
"/h/hernada02",
"/h/herreke01",
"/h/hillti01",*/
"/h/huangwe01",
"/j/jamesjo02",
"/j/jimened01",
"/j/jonesna01",
"/j/junisja01",
"/k/karnsna01",
"/k/kenneia01",
"/k/kikucyu01",
"/l/lakintr01",
"/l/lawde01",
"/l/leakemi01",
"/l/leblawa01",
"/l/litteza01",
"/l/livelbe01",
"/l/loaisjo01",
"/l/lopezre01",
"/l/luciael01",
"/m/magilma01",
"/m/markepa01",
"/m/marshev01",
"/m/martico02",
"/m/mchugco01",
"/m/mckayda02",
"/m/mengdda01",
"/m/mileywa01",
"/m/milonto01",
"/m/minayju01",
"/m/moorema02",
"/m/morinmi01",
"/n/newbeja01",
"/n/novaiv01",
"/o/olsonty01",
"/o/osichjo01",
"/o/osunaro01",
"/p/peacobr01",
"/p/perezol01",
"/p/peterdi01",
"/p/plutkad01",
"/p/pressry01",
"/p/pruitau01",
"/r/ramirer02",
"/r/ramirye01",
"/r/ramsema01",
"/r/reidfse01",
"/r/richacl01",
"/r/rodgebr01",
"/r/rodonca01",
"/r/rodried05",
"/r/rodrije01",
"/r/rogerjo01",
"/r/romerfe01",
"/r/rondohe01",
"/r/rossty01",
"/r/rosscza01",
"/r/ruizjo01",
"/r/rumbeni01",
"/s/sadleca02",
"/s/sadzeco01",
"/s/salech01",
"/s/sanchaa01",
"/s/santaer01",
"/s/scottta01",
"/s/sheffju01",
"/s/shoemma01",
"/s/smithjo07",
"/s/smithjo08",
"/s/smylydr01",
"/s/snellbl01",
"/s/sprinje01",
"/s/stewako01",
"/s/straida01",
"/s/strichu01",
"/s/stromma01",
"/t/tarplst01",
"/t/treinbl01",
"/v/valdefr01",
"/v/verlaju01",
"/v/vieirth01",
"/v/volqued01",
"/w/wagueja01",
"/w/weberry01",
"/w/woodhu01",
"/w/wothema01",
"/w/wrighmi01",
"/y/yacabji01",
"/y/ynoaga01",
"/z/zimmeky01",
"/z/zimmejo02"
];
var connection  = mysql.createConnection({
    host: process.env.DB_HOSTI,
    port: '3306',
    user: process.env.DB_USERI,
    password: process.env.DB_PWI,
    database: process.env.DB_NAMEI
});

for (let i=0; i< codes.length; i++) {
    setTimeout( function timer(){
      
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(chalk.whiteBright(baseURL + codes[i] + tail))
  await page.goto(baseURL + codes[i] + tail, {waitUntil: 'networkidle2'});
  
  const lines = await page.evaluate(() => {
  const results = Array.from(document.querySelectorAll('#batting_standard > tbody > tr.minors_table'));

const zzz = []

  return results.map((result, ix) => {
var leagues = [
 "International League",
 "Pacific Coast League",
 "Liga Mexicana de Béisbol",
 "Minor League Baseball",
 "American Association",
 "Eastern League",
 "Southern League",
 "Texas League",
 "California League",
 "Carolina League",
 "Florida State League",
 "Midwest League",
 "South Atlantic League",
 "New York-Penn League",
 "Northwest League",
 "Appalachian League",
 "Pioneer League",
 "Arizona League",
 "Dominican Summer League",
 "New York-Pennsylvania League",
 "Gulf Coast League"
]
function parseTeams(tm) {
  var tmArr = []
  var lgArr = []
  for(let i = 0; i < tm.length; i++) {
    if(!leagues.includes(tm[i].title)) {
      tmArr.push(tm[i].title)
    }  else {
      lgArr.push(tm[i].textContent)
    }
  }
  return [tmArr, lgArr]
}
  return {
       yr: result.querySelector('th:nth-child(1)').textContent,
       age: result.querySelector('td:nth-child(2)').textContent,
       franchise: result.querySelector('td:nth-child(3)').textContent.replace('-min', ''),
       classes: result.querySelector('td:nth-child(4)').textContent,
       tmName:  parseTeams(result.lastChild.querySelectorAll('a'))
     
     }
   });
  return result
 });
  	for(let j = 0; j < lines.length; j++) {
		lines[j].playerID = codes[i].replace(/\/[a-z]{1}\//g, '')
	}
var arr = []
for(let i = 0; i < lines.length; i++) {
    lines[i].classes = lines[i].classes.split(',')
}

for(let i = 0; i < lines.length; i++) {
            for(let k = 0; k <= lines[i].tmName.length; k++) {
  /*  for(let j = 0; j < lines[i].classes.length; j++) {*/
       
        var obj = {}
        var tmArr = []
        obj.yr = lines[i].yr
        obj.age = lines[i].age
        obj.franchise = lines[i].franchise
        obj.playerID = lines[i].playerID
        obj.class = lines[i].classes[k]
        obj.team = lines[i].tmName[0][k]
        obj.league = lines[i].tmName[1][k]
      if(obj.league) {
        console.log(chalk.blueBright(JSON.stringify(obj))) 
     connection.query(`INSERT INTO  teamSeason (playerID, yr, age, franchise, tmName, class, league)VALUES (?,?,?,?,?,?,?)`, [obj.playerID, obj.yr, obj.age, obj.franchise, obj.team, obj.class, obj.league], function (error) {
      if (error) throw error;
          console.log(chalk.red(`record added to db`))         
   }); 
    }

}

}
 await browser.close();
})();


    }, i*12000 );
}



/*(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(baseURL + codes[1] + tail)
  await page.goto(baseURL + codes[1] + tail, {waitUntil: 'networkidle2'});
  
  const lines = await page.evaluate(() => {
  const results = Array.from(document.querySelectorAll('#batting_standard > tbody > tr.minors_table'));

  return results.map(result => {
     return {
       yr: result.querySelector('th:nth-child(1)').textContent,
       age: result.querySelector('td:nth-child(2)').textContent,
       franchise: result.querySelector('td:nth-child(3)').textContent.replace('-min', ''),
       classes: result.querySelector('td:nth-child(4)').textContent
     }
   });
  return results
 });
lines[1].playerID = codes[1].replace(/\/[a-z]{1}\//g, '')
 console.log(lines[1])

 await browser.close();
})();*/













/*
var i = 0;
function f() {
request(baseURL + codes[i] + tail, function(error, response, html) {

  if(!error && response.statusCode === 200){
   console.log(baseURL + codes[i] + tail)
var playerID = codes[i].replace(/\/[a-z]\//g, '')
      var $ = cheerio.load(html);
     var tbl = $('table#batting_standard > tbody')

     $('table#batting_standard > tbody > tr.minors_table').map(function(i, el) {

var splitClass = Array.from($(el).children('[data-stat="lg_ID"]').html().split(","))
console.log(splitClass)

for(let j = 0; j < splitClass.length; j++) {

	var detail = {}
	detail.player = playerID;
	detail.yr = $(el).children().first().html();
	detail.age = $(el).children('td:nth-child(2)').html();
	detail.class = splitClass[j];
	detail.franchise = $(el).children('td:nth-child(3)').html().replace(/\-[a-z]{1,}/g, "");
	console.log(detail)

    connection.query(`INSERT INTO  fullMinors (playerID, yr, age, class, franchise)VALUES (?,?,?,?,?)`, [detail.player, detail.yr, detail.age, detail.class, detail.franchise], function (error) {
      if (error) throw error;
          console.log('object added to db')           
   }); 
		}
    }) 
  } else (console.log('err'))
})   
    if( i < codes.length ){
    	 i++;
        setTimeout( f, 15000 );
    }
}
f();*/
/*
request(baseURL + codes[1] + tail, function(error, response, html) {
	console.log(error)
  if(!error && response.statusCode === 200){

      var $ = cheerio.load(html);
     var tbl = $('table#batting_standard > tbody')

     $('table#batting_standard > tbody > tr.minors_table').map(function(i, el) {

var splitClass = Array.from($(el).children('td:nth-child(4)').html().split(","))
for(let i = 0; i < splitClass.length; i++) {
	var detail = {}
	detail.player = codes[i].replace(/\/[a-z]\//g, '')
	detail.yr = $(el).children().first().html()
	detail.age = $(el).children('td:nth-child(2)').html()
	detail.class = splitClass[i]
	detail.franchise = $(el).children('td:nth-child(3)').html().replace(/\-[a-z]{1,}/g, "")
	console.log(detail)
}

     }) 

  

  } else (console.log('err'))
})*/

/*var i = 0;
function f() {
request(baseURL + codes[i] + tail, function(error, response, html) {

  if(!error && response.statusCode === 200){

var playerID = codes[i].replace(/\/[a-z]\//g, '')
      var $ = cheerio.load(html);
     var tbl = $('table#batting_standard > tbody')

     $('table#batting_standard > tbody > tr.minors_table').map(function(i, el) {

var splitClass = Array.from($(el).children('[data-stat="lg_ID"]').html().split(","))
console.log(splitClass)

for(let j = 0; j < splitClass.length; j++) {

	var detail = {}
	detail.player = playerID;
	detail.yr = $(el).children().first().html();
	detail.age = $(el).children('td:nth-child(2)').html();
	detail.class = splitClass[j];
	detail.franchise = $(el).children('td:nth-child(3)').html().replace(/\-[a-z]{1,}/g, "");
	console.log(detail)

    connection.query(`INSERT INTO  fullMinors (playerID, yr, age, class, franchise)VALUES (?,?,?,?,?)`, [detail.player, detail.yr, detail.age, detail.class, detail.franchise], function (error) {
      if (error) throw error;
          console.log('object added to db')           
   }); 
		}
    }) 
  } else (console.log('err'))
})   
    if( i < codes.length ){
    	 i++;
        setTimeout( f, 5000 );
    }
}
f();*/




