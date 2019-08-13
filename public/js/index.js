//삼항연산자
//조건?"참일 때":"거짓일때"

console.log(3>5?"참":"거짓");

//data-set
var html = '';
var site = "https://webmir.co.kr/score";
var scoreURL = {
	cURL : site + "/score_in.php",
	rURL : site + "/score_li.php",
	uURL : site + "/score_up.php",
	dURL : site + "/score_del.php",	
}

getList(1);
function getList(page){
	$.ajax({
		type: "get",//통신방법..get&post
		url: scoreURL.rURL, //URL은 대문자로 쓸 것!
		data:{
			page:page
		},
		dataType: "json",
		success: function (res) {
			console.log(res);
			$(".score-tb").find("tbody").empty();
			for(var i in res.student){
				html = '<tr>';
				html += '<th>'+res.student[i].stdname+'</th>';
				html += '<th>'+res.student[i].kor+'점</th>';
				html += '<th>'+res.student[i].eng+'점</th>';
				html += '<th>'+res.student[i].math+'점</th>';
				html += '<th class="text-center">';
				html += '<button class="btn btn-success">수정</button>';
				html += '<button class="btn btn-danger">삭제</button>';
				html += '</th>';
				html += '</tr>';
				$(".score-tb").find("tbody").append(html);
			}
			pagerMaker(res.total,page);
		},
		error:function(xhr){
			alert("통신이 실패했습니다. 관리자에게 문의하세요!")
		}
	});
}
function pagerMaker(total,page){
	var cnt = Math.ceil(total/10); //소수점 올림.page에 따라 한페이지에 10개씩 보임. 전체 페이지 갯수
	var div = 3;                  //세트당 나올 페이지 수
	var stn = 0;                   //세트중에 시작페이지
	var edn = 0;                   //세트중에 마지막페이지
	var prev = 0;                  //"<" 클릭시 나타날 페이지
	var next = 0;                  //">"클릭시 나타날 페이지
	var prevShow = false;          // true 면 활성화 false면 click이 안됨.비 활성화
	var lastShow = false;          // true 면 활성화 false면 click이 안됨.비 활성화
	var first = 1;                 //"<<" 클릭시 나타날 페이지
	var last = cnt;                  //">>"클릭시 나타날 페이지
	var nowIndex =(Math.ceil(page/div)-1);   // 페이지 세트의 현재 index
	var lastIndex =(Math.ceil(cnt/div)-1);   // 페이지 세트의 마지막 index

	/* temp = Math.floor(cnt/div);       */      //2/3=0.....에서 소수점을 버림. 결론은 0
	stn = nowIndex * div + 1;     //소수점을 반올림해서 올림 보여질 숫자를 찾아냄. 세트의 시작 페이지 값
	if(cnt < stn + div -1) edn = cnt;
	else edn = stn + div - 1;

	if(nowIndex > 0){
prevShow = true;
prev = stn-1;
	}

	if(lastIndex > nowIndex){
		lastShow = true;
		next = edn+1;
	}

	console.log("stn:"+stn);
	console.log("edn:"+edn);
	console.log("lastIndex:"+lastIndex);
	console.log("nowIndex:"+nowIndex);
	//prevShow?"disabled":""
	//          true    / false

	html = '<li class="page-item page-first'+(prevShow?"":"disabled")+'" data-page="'+first+'">';
html += '<span class="page-link"><i class="fas fa-angle-double-left"></i></span>';
html += '</li>';
html += '<li class="page-item page-prev'+(prevShow?"":"disabled")+'" data-page="'+prev+'">';
html += '<span class="page-link"><i class="fas fa-angle-left"></i></span>';
html += '</li>';
for(var i=stn; i<=edn; i++){
html += '<li class="page-item page-ct '+(page==i?"active":"")+'" data-page="'+i+'">';
html += '<span class="page-link">'+i+'</span>';
html += '</li>';
}
html += '<li class="page-item page-next '+(lastShow?"":"disabled")+'" data-page="'+next+'">';
html += '<span class="page-link"><i class="fas fa-angle-right"></i></span>';
html += '</li>';
html += '<li class="page-item page-last'+(lastShow?"":"disabled")+'" data-page="'+last+'">';
html += '<span class="page-link"><i class="fas fa-angle-double-right"></i></span>';
html += '</li>';
 $(".pager").html(html);
 $(".page-item").click(function(){
	 if(!$(this).hasClass("disabled")) getList( $(this).data("page") );
	});
}
	 //pager-item이 disabled를 가지고 있어=true클릭이 되기 때문에 fals로 만들어서 클릭이 되지 않게 만들어줌.
	 //!-not. true=>fals로 fals=>true로 만들어줌.
 
/*if(page == 1) $(".page-lt").addClass("disabled");
if(page == cnt) $(".page-rt").addClass("disabled");
$(".page-ct").eq(page-1).addClass("active"); */
