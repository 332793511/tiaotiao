/**
 * constant 常量
 */ 
var WIN_SIZE     = cc.winSize, //窗口大小（ 格式 { width: 640, height: 1040 } ）
	WIN_WIDTH    = WIN_SIZE.width, //窗口宽度
	WIN_HEIGHT   = WIN_SIZE.height, //窗口高度
	CCX          = CENTERCOORDINATEX = WIN_WIDTH / 2, //笛卡尔窗口中心X轴坐标
	CCY          = CENTERCOORDINATEY = WIN_HEIGHT / 2, //笛卡尔窗口中心Y轴坐标
	CCDOT        = cc.p(CCX, CCY);//笛卡尔窗口中心点坐标
