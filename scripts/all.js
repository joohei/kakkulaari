const accessToken = "IGQVJWOVBXZAlBnQjZAZAOUI1dEVMQVU1SDRLa0hra2h4bS1XLXgwSktLRFlOdUNzVWY3YnJCQWZAnSHB3U3YwNjVDRlIxNXEwTDk3YnJnS1ZANNENHTktxeHhjRlFVR1JubEdlVDFVWnpJcnRjN0F3Q1V1MQZDZD";

let dataUrl = `https://graph.instagram.com/me/media?fields=media_url,caption&access_token=${accessToken}`;

let profileUrl = `https://graph.instagram.com/me?fields=media_count&access_token=${accessToken}`

let sweetImg = ["103658080_148889320053281_5658960216754624125_n.jpg", "107507115_275139680440995_9027953567345555352_n.jpg", "110204740_290153285528126_6056051071124312324_n.jpg", "117229429_760703614695231_151787945344000353_n.jpg", "118287590_1441795899339233_8120205639650397246_n.jpg", "118799867_167385401632771_211766639141218833_n.jpg", "119180701_368611290971494_3035428003628719391_n.jpg", "119702101_636097317100936_457111475170658489_n.jpg", "119838625_805881753493408_624161046345142694_n.jpg", "120133763_363665404988563_8581011538970415339_n.jpg", "120759178_180337810214771_8233460266065619637_n.jpg", "121970966_691325878180646_6269961740282630846_n.jpg", "122456462_781621366026808_5830387830216664084_n.jpg", "123940780_3057766280994625_3521209228740959885_n.jpg", "129671588_2808310669440660_7072699540203421544_n.jpg", "129790282_3606310196128766_4233415884216681601_n.jpg", "139836616_471198804269499_459908570673009727_n.jpg", "141404706_2852409498413762_8112521702810504843_n.jpg", "154815188_110607714395419_568474052935795468_n.jpg", "162333709_409277653839925_8938965817752697557_n.jpg", "166234599_144252627603724_8006851671282126029_n.jpg", "178352880_322979026122497_4663273237912832846_n.jpg", "197294963_482803946166655_8411405627255352424_n.jpg", "202778144_527862005226938_3208314264993813638_n.jpg", "220942561_552405499130727_4102793338238612270_n.jpg", "228494575_546640699816584_219149159165928359_n.jpg", "241085871_922253218649778_1811904579692422294_n.jpg", "247464723_280422733943517_1394621269890815914_n.jpg", "271951944_139548908516370_3472703948637981907_n.jpg", "65788510_402260340497659_9196052919888597925_n.jpg", "66079197_120464979239055_4899776859266306130_n.jpg", "66299926_148778326307783_6402899228086778220_n.jpg", "67121289_154974982309431_7838611417911486706_n.jpg", "67311443_2341702029239165_2483983395461022013_n.jpg", "76897216_107620000915398_8797682421060888577_n.jpg", "82935625_2533917920185833_6222412365714880002_n.jpg", "83090931_1752929234831887_8204027136712800608_n.jpg", "83092702_180603529857043_5718483803291510651_n.jpg", "83102604_517797899145164_8009958534322863759_n.jpg", "83133750_188792042356626_5008205104739466873_n.jpg", "83148277_2600752600170643_5389345340560061739_n.jpg", "83154551_1032662417115092_8963886253992649302_n.jpg", "83159307_186785099323168_4605654352372550339_n.jpg", "83159309_309898203312733_2185186913123984470_n.jpg", "83170093_121126405944915_3759902324734881505_n.jpg", "83171564_2657139387854386_4684392173302606366_n.jpg", "83173274_189542428794321_6756441588116182329_n.jpg", "83200791_140546494086764_3647476189227343704_n.jpg", "83203403_192389725156444_1397876626188947867_n.jpg", "83203404_761758287667319_1407749672082184002_n.jpg", "83208226_165649288185936_8317081119644377498_n.jpg", "83218114_610601836154439_3245233370075793904_n.jpg", "83226609_211224940013555_7136190707748880207_n.jpg", "83244072_2207393302890667_320284595419791086_n.jpg", "83258251_3480202085384842_7450163743945277356_n.jpg", "83264693_170060810959500_7609256243978050744_n.jpg", "83281350_592204474968436_5727440642246868295_n.jpg", "83282222_1291630567692540_8384581336686022026_n.jpg", "83312928_818174555321644_5761793520727380340_n.jpg", "83353569_238414897167873_8951953312615326739_n.jpg", "83359571_190957938815072_8005580757247285594_n.jpg", "83362204_175577257060504_1329960313913406444_n.jpg", "83368524_853101865136896_3749968388770591147_n.jpg", "83383641_203523457713279_3355907028234314273_n.jpg", "83392886_171433300820871_6009852271905323485_n.jpg", "83415271_1363949033809704_455841972889882061_n.jpg", "83435103_214784406361117_3057505227420439679_n.jpg", "83456050_2670532219682017_3580427715946394468_n.jpg", "83524950_2693798777407136_6358981904947442595_n.jpg", "83528904_133619628132939_584199415194872045_n.jpg", "83547224_530549244253874_1245715711706441370_n.jpg", "83551957_2293191217656648_630333947134784936_n.jpg", "83566981_790375578112199_3677043851740279198_n.jpg", "83600138_492065015020303_6230768615688120584_n.jpg", "83607795_131846471597955_7794011283008291808_n.jpg", "83639242_1642974229177678_2487613510776048881_n.jpg", "83640212_150614436459375_6241827781955117618_n.jpg", "83649310_124608195738340_7750066213966917844_n.jpg", "83703387_464062791165827_6613881012666027851_n.jpg", "83727451_125667478744265_2864917015735638317_n.jpg", "83771690_1204537946415944_7881694692933018216_n.jpg", "83773347_625015714709181_3472124746308158034_n.jpg", "83780999_129142505260594_7909180701568891542_n.jpg", "83798167_584172378830357_4440392429916877546_n.jpg", "83827724_905445659853443_6042744493498992476_n.jpg", "83840356_2604997836491795_1671590036507012890_n.jpg", "83881807_2666399460124530_7854448915112802170_n.jpg", "83886513_179778086669129_1363567063891565128_n.jpg", "83886515_513093666062692_5540032444645142753_n.jpg", "83893476_623179225135697_475449789623962220_n.jpg", "83928692_618322385634566_3062824396331207285_n.jpg", "83932398_170067037746453_6112107654000355391_n.jpg", "83941968_124231735588224_1163650139266433956_n.jpg", "83952679_506375353351667_5685548501737299314_n.jpg", "84009329_189290522448126_6284337074308355859_n.jpg", "84020875_473962646605687_6723519071125478153_n.jpg", "84176925_2323024957987852_2716202050885570818_n.jpg", "84319492_196901565009388_3770811988497931554_n.jpg", "84331845_2767403896673666_5938701683688109318_n.jpg", "84348996_638773983565723_789877096449588627_n.jpg", "84453760_170806124342750_2622854652037708719_n.jpg", "84606648_192687308762071_5771205939204326704_n.jpg", "84766212_1007771126268713_92672637005489177_n.jpg", "90351833_548568852462504_6747003850205261652_n.jpg", "92506117_2720155731554505_2700424442663236423_n.jpg", "92533653_233450241397495_1783612743494857095_n.jpg", "95263428_724591181612601_705709007760192953_n.jpg", "96014499_166054161479398_1724338920748524255_n.jpg", "96101932_246433063267021_7538006493127236555_n.jpg"];

let saltyImg = ["107275296_1389121354615572_6869990983325170658_n.jpg", "115927570_276949840275298_8646469938486224357_n.jpg", "116731281_325382118842950_5152981979453377256_n.jpg", "117872233_598207020868781_1233606582241572403_n.jpg", "126228413_864603707643598_9181937428391697747_n.jpg", "130269816_396711381777956_6926006644308192171_n.jpg", "133647040_421632572586882_4789232797105868796_n.jpg", "271463876_5357319117615488_2950246290657109200_n.jpg", "83183011_2076921122454759_7575858734005177615_n.jpg", "83348742_107521060705984_8789294739045836415_n.jpg", "83410271_187660325783692_6214203334089461214_n.jpg", "83428076_193789708674127_599513956079108274_n.jpg", "83565605_867430100352534_8718255499464167986_n.jpg", "83585368_554277325170264_5639365913955321006_n.jpg", "83619387_186142006066143_8019901803757529445_n.jpg", "83643775_825548911203808_4566851124216566439_n.jpg", "83710707_196135241741045_1687748462042905800_n.jpg", "83897707_2709191419134751_7059041928050824569_n.jpg", "83920857_189334568838536_7991823288232501249_n.jpg", "84342926_666752847477391_6682817437905890719_n.jpg", "84527673_590214378489820_4624486746396645642_n.jpg", "89328473_571839727009009_3404747214634833520_n.jpg", "94102809_257694942032504_5808250113414886105_n.jpg", "96695046_2889566201097179_7954666066826929925_n.jpg"];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCount(profileUrl) {
  let response = await fetch(profileUrl);
  let data = await response.json();
  return Math.ceil(data.media_count / 25);
}

async function getMedia(dataUrl, count) {
  console.log("a")
  const loader = document.querySelector(".loader-container");
  let filterItem = document.querySelector(".item.is-active")
  let filter = filterItem.getAttribute("dataclass")
  let response = await fetch(dataUrl);
  let data = await response.json();
  for (let i in data.data) {
    let img = document.createElement("img");
    let imgUrl = data.data[i].media_url;
    let imgId = imgUrl.split("?").join("/").split("/")[5];
    let caption = data.data[i].caption
    if (sweetImg.includes(imgId)) {
      sweetImg.splice(sweetImg.indexOf(imgId), 1);
      img.src = imgUrl;
      img.alt = "Instagram API photo";
      hashtags = caption.split("#").slice(1)
      tags = document.createAttribute("tags");
      tags.value = hashtags.join("").split(" ")
      img.setAttributeNode(tags)
      dataClass = document.createAttribute("dataclass");
      dataClass.value = "sweet";
      img.setAttributeNode(dataClass);
      img.classList.add("animate");
      if (filter == dataClass.value || filter == "all") {
        img.classList.add("show")
      }
      else {
        img.classList.add("hide")
      }
      let gallery = document.getElementsByClassName("gallery")[0];
      gallery.appendChild(img);
    }
    else if ((saltyImg.includes(imgId))) {
      saltyImg.splice(saltyImg.indexOf(imgId), 1);
      img.src = imgUrl;
      img.alt = "Instagram API photo";
      hashtags = caption.split("#").slice(1)
      tags = document.createAttribute("tags");
      tags.value = hashtags.join(",")
      img.setAttributeNode(tags)
      dataClass = document.createAttribute("dataclass");
      dataClass.value = "salty";
      img.setAttributeNode(dataClass);
      img.classList.add("animate");
      if (filter == dataClass.value || filter == "all") {
        img.classList.add("show")
      }
      else {
        img.classList.add("hide")
      }
      let gallery = document.getElementsByClassName("gallery")[0];
      gallery.appendChild(img);
    }
  }
  dataUrl = data.paging.next;
  count -= 1;
  if (count > 0) {
    await sleep(5000);
    getMedia(dataUrl, count);
  }
  else {
    loader.classList.add("loaded");
  }}

getCount(profileUrl).then(count => {
  getMedia(dataUrl, count);
});
