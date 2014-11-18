<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"> 
<meta charset="UTF-8">
<meta name="description" content="省省-应用推荐">
<meta http-equiv="Cache-Control" content="no-cache">
<title>您可能喜欢的应用</title>
<style type="text/css">
*{margin:0; padding:0; border:0; outline:0;}
ol, ul, li{list-style:none;}
address, caption, cite, code, dfn, em, th, var {font-style:normal;font-weight:normal;}
h2 { margin-bottom: 15px;  font-size: 17px; color: #333;}
body{ background:#ffe;}
.app-list li { padding: 10px; font-size: 17px; border-top: 1px solid #FFF; border-bottom: 1px solid #E6E3DC; background: -webkit-gradient(linear, left top, left bottom, from(#FFFDF6), to(#F7F4EB));}
.app-list li a { display: block; margin: -10px -10px -11px; padding: inherit; color: inherit; text-decoration: inherit; color: #333; overflow: hidden;}
.app-list .e-l-i { padding-right: 35px; background: url(../images/chevron.png) right center no-repeat;}
.app-list .d-item { overflow: hidden;}
.app-list .d-item figure { float: left; width: 60px; height: 60px; overflow: hidden;}
.app-list .d-item article { margin-left: 75px;}
.app-list .d-item h2,.d-item p { margin-bottom: 2px;}
.app-list .d-item .introduce { color: #919191;}
</style>
</head>
<body>
<?php
    $app_list = array(
        array(
            'name' => 'HOT男人',
            'url'  => 'http://modp1.yokacdn.com/Downloads/861/110130431_v2.1.2.apk',
            'desc' => '全球男士真性情时尚杂志',
            'pic_url' => 'http://xingjiabi.b0.upaiyun.com/shareapp/ahotman.png',
        ),
		array(
            'name' => '大姨妈',
            'url'  => 'http://static.utan.com/theme/default/utan/mobile/dayima_d1.apk?promotedcode=592',
            'desc' => '大姨妈，1000万女性的贴心闺蜜，专属你的健康管家！',
            'pic_url' => 'http://xingjiabi.b0.upaiyun.com/shareapp/dayima.jpg',
        ),
        array(
            'name' => 'WiFi伴侣',
            'url'  => 'http://126.am/Vs5Ix3',
            'desc' => '免费WiFi解锁利器，一键畅游无线网络。',
            'pic_url' => 'http://xingjiabi.b0.upaiyun.com/shareapp/wifibanliv.png',
        ),
        array(
            'name' => '乐阅书城',
            'url'  => 'http://www.leread.com:8081/lereader/download/lereader.apk',
            'desc' => '食色，性也。AV女王饭岛爱自传，柏拉图式性爱的成长史。',
            'pic_url' => 'http://xingjiabi.b0.upaiyun.com/shareapp/bolatu.png',
        ), 
		array(
            'name' => '生日管家',
            'url'  => 'http://brup.365shengri.cn/other/BirthdayPlusV4_1_2_2073.apk',
            'desc' => '生日管家是国内领先的生日服务产品，在这里你可以，发现以及管理亲友生日，生日来临会及时提醒你。',
            'pic_url' => 'http://xingjiabi.b0.upaiyun.com/shareapp/shengriguanjia.png',
        ), 
		array(
            'name' => '新浪唱聊美女聊天',
            'url'  => 'http://xjbdocs.b0.upaiyun.com/apk/sinashow_2.3.1_461_1.apk',
            'desc' => '手机看美女，show才艺。',
            'pic_url' => 'http://xingjiabi.b0.upaiyun.com/shareapp/xinlangmeinv.png',
        ), 
		array(
            'name' => '碉堡资讯',
            'url'  => 'http://www.diaobao.la/Diaobao_v1.4.1_effective.apk',
            'desc' => '会让你上瘾的宅男腐女神器。',
            'pic_url' => 'http://xingjiabi.b0.upaiyun.com/shareapp/diaobao.png',
        ), 
    );

    $app_360 = array(
        array(
            'name' => '360手机助手',
            'url'  => 'http://openbox.mobilem.360.cn/channel/getUrl?src=cp&app=360box',
            'desc' => '数十万款Android软件和游戏供您下载，360安全中心检测全方位安全保障。',
            'pic_url' => 'http://xingjiabi.b0.upaiyun.com/shareapp/360.jpg',
        )
    );
	
	$app_az = array(
		array(
            'name' => '安卓市场',
            'url'  => 'http://dl.91rb.com/android/soft/himarketpho4.2.2_02.27_r_himarket_android1912.apk',
            'desc' => '用安卓手机，当然装安卓市场。',
            'pic_url' => 'http://xingjiabi.b0.upaiyun.com/shareapp/anzhuoshichang.png',
        )
	);

    if(isset($_REQUEST['place']) && strtolower($_REQUEST['place']) == '360zhushou'){
        $app_list = array_merge($app_360, $app_list); 
    }
	
	if(isset($_REQUEST['place']) && strtolower($_REQUEST['place']) == 'baidu'){
		$app_list = array_merge($app_az, $app_list); 
	}
?> 
	<ul class="app-list">
      <?php 
        foreach($app_list as $item){ 
      ?>
       <li class="d-item">
        <a class="e-l-i" href="<?php echo $item['url'];?>">
				<figure>
					<img src="<?php echo $item['pic_url'];?>" height="60" width="60">
				</figure>
				<article>
					<header>
						<h2><?php echo $item['name'];?></h2>
					</header>
					<p class="introduce">
					<?php echo $item['desc'];?>
					</p>
				</article>
		</a>
        </li>
       <?php } ?> 
	</ul>
</body>
</html>