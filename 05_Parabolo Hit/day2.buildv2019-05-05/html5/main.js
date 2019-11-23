
//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_BRL_THREAD_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="debug";
CFG_GLFW_COPY_LIBS="openal32";
CFG_GLFW_GCC_LIB_OPTS="-lopenal32";
CFG_HOST="winnt";
CFG_HTML5_WEBAUDIO_ENABLED="1";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_LANG="js";
CFG_MODPATH="";
CFG_MOJO_AUTO_SUSPEND_ENABLED="1";
CFG_MOJO_DRIVER_IMPLEMENTED="1";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[Monster.png];type=image/png;width=70;height=70;\n[background.jpg];type=image/jpg;width=588;height=294;\n[background.png];type=image/png;width=640;height=480;\n[bird.png];type=image/png;width=100;height=100;\n[bird2.png];type=image/png;width=70;height=70;\n[bird3.png];type=image/png;width=70;height=70;\n[black.png];type=image/png;width=640;height=480;\n[box.png];type=image/png;width=50;height=50;\n[bullet.png];type=image/png;width=50;height=41;\n[gameWin.png];type=image/png;width=640;height=480;\n[gob1.png];type=image/png;width=120;height=170;\n[gob2.png];type=image/png;width=100;height=150;\n[life.png];type=image/png;width=35;height=35;\n[man.png];type=image/png;width=225;height=225;\n[monster2.png];type=image/png;width=70;height=70;\n[player.png];type=image/png;width=191;height=150;\n[rock.png];type=image/png;width=70;height=70;\n[rotatingObjects.png];type=image/png;width=71;height=35;\n[mojo_font.png];type=image/png;width=864;height=13;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Cerberus runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Cerberus Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

//function debugLog( str ){
//	if( window.console!=undefined ) window.console.log( str );
//}

function debugLog( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function debugStop(){
	debugger;	//	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_charCodeAt( str,index ){
	if( index<0 || index>=str.length ) error( "Character index out of range" );
	return str.charCodeAt( index );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Cerberus Exception"; 
}


function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBDisplayMode( width,height ){
	this.width=width;
	this.height=height;
}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "cerberusstate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "cerberusstate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.CountJoysticks=function( update ){
	return 0;
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.GetDeviceWidth=function(){
	return 0;
}

BBGame.prototype.GetDeviceHeight=function(){
	return 0;
}

BBGame.prototype.SetDeviceWindow=function( width,height,flags ){
}

BBGame.prototype.GetDisplayModes=function(){
	return new Array();
}

BBGame.prototype.GetDesktopMode=function(){
	return null;
}

BBGame.prototype.SetSwapInterval=function( interval ){
}

BBGame.prototype.PathToFilePath=function( path ){
	return "";
}

//***** js Game *****

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
	
//	if( navigator.userAgent.indexOf( "Chrome/48." )>0 ){
//		xhr.setRequestHeader( "If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT" );
//	}

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Cerberus Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}


var webglGraphicsSeq=1;

function BBHtml5Game( canvas ){

	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){

		//can't get these to fire!
		canvas.addEventListener( "webglcontextlost",function( event ){
			event.preventDefault();
//			print( "WebGL context lost!" );
		},false );

		canvas.addEventListener( "webglcontextrestored",function( event ){
			++webglGraphicsSeq;
//			print( "WebGL context restored!" );
		},false );

		var attrs={ alpha:false };
	
		this._gl=this._canvas.getContext( "webgl",attrs );

		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl",attrs );
		
		if( !this._gl ) this.Die( "Can't create WebGL" );
		
		gl=this._gl;
	}
	
	// --- start gamepad api by skn3 ---------
	this._gamepads = null;
	this._gamepadLookup = [-1,-1,-1,-1];//support 4 gamepads
	var that = this;
	window.addEventListener("gamepadconnected", function(e) {
		that.connectGamepad(e.gamepad);
	});
	
	window.addEventListener("gamepaddisconnected", function(e) {
		that.disconnectGamepad(e.gamepad);
	});
	
	//need to process already connected gamepads (before page was loaded)
	var gamepads = this.getGamepads();
	if (gamepads && gamepads.length > 0) {
		for(var index=0;index < gamepads.length;index++) {
			this.connectGamepad(gamepads[index]);
		}
	}
	// --- end gamepad api by skn3 ---------
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

// --- start gamepad api by skn3 ---------
BBHtml5Game.prototype.getGamepads = function() {
	return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
}

BBHtml5Game.prototype.connectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//check if this is a standard gamepad
	if (gamepad.mapping == "standard") {
		//yup so lets add it to an array of valid gamepads
		//find empty controller slot
		var slot = -1;
		for(var index = 0;index < this._gamepadLookup.length;index++) {
			if (this._gamepadLookup[index] == -1) {
				slot = index;
				break;
			}
		}
		
		//can we add this?
		if (slot != -1) {
			this._gamepadLookup[slot] = gamepad.index;
			
			//console.log("gamepad at html5 index "+gamepad.index+" mapped to Cerberus gamepad unit "+slot);
		}
	} else {
		console.log('Cerberus has ignored gamepad at raw port #'+gamepad.index+' with unrecognised mapping scheme \''+gamepad.mapping+'\'.');
	}
}

BBHtml5Game.prototype.disconnectGamepad = function(gamepad) {
	if (!gamepad) {
		return false;
	}
	
	//scan all gamepads for matching index
	for(var index = 0;index < this._gamepadLookup.length;index++) {
		if (this._gamepadLookup[index] == gamepad.index) {
			//remove this gamepad
			this._gamepadLookup[index] = -1
			break;
		}
	}
}

BBHtml5Game.prototype.PollJoystick=function(port, joyx, joyy, joyz, buttons){
	//is this the first gamepad being polled
	if (port == 0) {
		//yes it is so we use the web api to get all gamepad info
		//we can then use this in subsequent calls to PollJoystick
		this._gamepads = this.getGamepads();
	}
	
	//dont bother processing if nothing to process
	if (!this._gamepads) {
	  return false;
	}
	
	//so use the Cerberus port to find the correct raw data
	var index = this._gamepadLookup[port];
	if (index == -1) {
		return false;
	}

	var gamepad = this._gamepads[index];
	if (!gamepad) {
		return false;
	}
	//so now process gamepad axis/buttons according to the standard mappings
	//https://w3c.github.io/gamepad/#remapping
	
	//left stick axis
	joyx[0] = gamepad.axes[0];
	joyy[0] = -gamepad.axes[1];
	
	//right stick axis
	joyx[1] = gamepad.axes[2];
	joyy[1] = -gamepad.axes[3];
	
	//left trigger
	joyz[0] = gamepad.buttons[6] ? gamepad.buttons[6].value : 0.0;
	
	//right trigger
	joyz[1] = gamepad.buttons[7] ? gamepad.buttons[7].value : 0.0;
	
	//clear button states
	for(var index = 0;index <32;index++) {
		buttons[index] = false;
	}
	
	//map html5 "standard" mapping to Cerberuss joy codes
	/*
	Const JOY_A=0
	Const JOY_B=1
	Const JOY_X=2
	Const JOY_Y=3
	Const JOY_LB=4
	Const JOY_RB=5
	Const JOY_BACK=6
	Const JOY_START=7
	Const JOY_LEFT=8
	Const JOY_UP=9
	Const JOY_RIGHT=10
	Const JOY_DOWN=11
	Const JOY_LSB=12
	Const JOY_RSB=13
	Const JOY_MENU=14
	*/
	buttons[0] = gamepad.buttons[0] && gamepad.buttons[0].pressed;
	buttons[1] = gamepad.buttons[1] && gamepad.buttons[1].pressed;
	buttons[2] = gamepad.buttons[2] && gamepad.buttons[2].pressed;
	buttons[3] = gamepad.buttons[3] && gamepad.buttons[3].pressed;
	buttons[4] = gamepad.buttons[4] && gamepad.buttons[4].pressed;
	buttons[5] = gamepad.buttons[5] && gamepad.buttons[5].pressed;
	buttons[6] = gamepad.buttons[8] && gamepad.buttons[8].pressed;
	buttons[7] = gamepad.buttons[9] && gamepad.buttons[9].pressed;
	buttons[8] = gamepad.buttons[14] && gamepad.buttons[14].pressed;
	buttons[9] = gamepad.buttons[12] && gamepad.buttons[12].pressed;
	buttons[10] = gamepad.buttons[15] && gamepad.buttons[15].pressed;
	buttons[11] = gamepad.buttons[13] && gamepad.buttons[13].pressed;
	buttons[12] = gamepad.buttons[10] && gamepad.buttons[10].pressed;
	buttons[13] = gamepad.buttons[11] && gamepad.buttons[11].pressed;
	buttons[14] = gamepad.buttons[16] && gamepad.buttons[16].pressed;
	
	//success
	return true
}
// --- end gamepad api by skn3 ---------


BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;
	if( this._suspended ) return;
	
	var game=this;
	var seq=game._timerSeq;
	
	var maxUpdates=4;
	var updateRate=this._updateRate;
	
	if( !updateRate ){

		var reqAnimFrame=(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame);
	
		if( reqAnimFrame ){
			function animate(){
				if( seq!=game._timerSeq ) return;
	
				game.UpdateGame();
				if( seq!=game._timerSeq ) return;
	
				reqAnimFrame( animate );
				game.RenderGame();
			}
			reqAnimFrame( animate );
			return;
		}
		
		maxUpdates=1;
		updateRate=60;
	}
	
	var updatePeriod=1000.0/updateRate;
	var nextUpdate=0;

	function timeElapsed(){
		if( seq!=game._timerSeq ) return;
		
		if( !nextUpdate ) nextUpdate=Date.now();
		
		for( var i=0;i<maxUpdates;++i ){
		
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			nextUpdate+=updatePeriod;
			var delay=nextUpdate-Date.now();
			
			if( delay>0 ){
				setTimeout( timeElapsed,delay );
				game.RenderGame();
				return;
			}
		}
		nextUpdate=0;
		setTimeout( timeElapsed,0 );
		game.RenderGame();
	}

	setTimeout( timeElapsed,0 );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "cerberus://data/" )!=0 ) return "";
	path=path.slice(16);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "cerberus:" )!=0 ){
		return path;
	}else if( path.indexOf( "cerberus://data/" )==0 ) {
		return "data/"+path.slice( 16 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

BBHtml5Game.prototype.GetDeviceWidth=function(){
	return this._canvas.width;
}

BBHtml5Game.prototype.GetDeviceHeight=function(){
	return this._canvas.height;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	BBGame.prototype.RenderGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var xscale=1;
	var yscale=1;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x*xscale;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y*yscale;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e),0 );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}
	
	canvas.onclick=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		eatEvent( e );
		return;
	}
	
	canvas.oncontextmenu=function( e ){
		return false;
	}
	
	canvas.ontouchstart=function( e ){
		if( game.Suspended() ){
			canvas.focus();
		}
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}else{
			game.ValidateUpdateTimer();
		}
	}
	
	canvas.onblur=function( e ){
		for( var i=0;i<256;++i ) game.KeyEvent( BBGameEvent.KeyUp,i );
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}

	canvas.updateSize=function(){
		xscale=canvas.width/canvas.clientWidth;
		yscale=canvas.height/canvas.clientHeight;
		game.RenderGame();
	}
	
	canvas.updateSize();
	
	canvas.focus();
	
	game.StartGame();
	
	game.RenderGame();
}


function BBCerberusGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBCerberusGame.prototype=extend_class( BBHtml5Game );

BBCerberusGame.Main=function( canvas ){

	var game=new BBCerberusGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}


// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

// ***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	game.IncLoading();

	var image=new Image();
	image.onload=function(){ game.DecLoading(); }
	image.onerror=function(){ game.DecLoading(); }
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;	
	this.gc.globalAlpha=this.alpha;	
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<2 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawPoly2=function( verts,surface,srx,srcy ){
	if( verts.length<4 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=4;i<verts.length;i+=4 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

// ***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

// ***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
}

if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

//print( "Using WebAudio!" );

// ***** WebAudio *****

var wa=null;

// ***** WebAudio gxtkSample *****

var gxtkSample=function(){
	this.waBuffer=null;
	this.state=0;
}

gxtkSample.prototype.Load=function( path ){
	if( this.state ) return false;

	var req=new XMLHttpRequest();
	
	req.open( "get",BBGame.Game().PathToUrl( path ),true );
	req.responseType="arraybuffer";
	
	var abuf=this;
	
	req.onload=function(){
		wa.decodeAudioData( req.response,function( buffer ){
			//success!
			abuf.waBuffer=buffer;
			abuf.state=1;
		},function(){
			abuf.state=-1;
		} );
	}
	
	req.onerror=function(){
		abuf.state=-1;
	}
	
	req.send();
	
	this.state=2;
			
	return true;
}

gxtkSample.prototype.Discard=function(){
}

// ***** WebAudio gxtkChannel *****

var gxtkChannel=function(){
	this.buffer=null;
	this.flags=0;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.waSource=null;
	this.waPan=wa.create
	this.waGain=wa.createGain();
	this.waGain.connect( wa.destination );
	this.waPanner=wa.createPanner();
	this.waPanner.rolloffFactor=0;
	this.waPanner.panningModel="equalpower";
	this.waPanner.connect( this.waGain );
	this.startTime=0;
	this.offset=0;
	this.state=0;
}

// ***** WebAudio gxtkAudio *****

var gxtkAudio=function(){

	if( !wa ){
		window.AudioContext=window.AudioContext || window.webkitAudioContext;
		wa=new AudioContext();
	}
	
	this.okay=true;
	this.music=null;
	this.musicState=0;
	this.musicVolume=1;
	this.channels=new Array();
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	if( this.MusicState()==1 ) this.music.pause();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=1 ) continue;
		this.PauseChannel( i );
		chan.state=5;
	}
}

gxtkAudio.prototype.Resume=function(){
	if( this.MusicState()==1 ) this.music.play();
	for( var i=0;i<32;++i ){
		var chan=this.channels[i];
		if( chan.state!=5 ) continue;
		chan.state=2;
		this.ResumeChannel( i );
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var sample=new gxtkSample();
	if( !sample.Load( BBHtml5Game.Html5Game().PathToUrl( path ) ) ) return null;
	
	return sample;
}

gxtkAudio.prototype.PlaySample=function( buffer,channel,flags ){

	if( buffer.state!=1 ) return;

	var chan=this.channels[channel];
	
	if( chan.state ){
		chan.waSource.onended=null
		try {
			chan.waSource.stop( 0 );
			chan.state = 0			
		} catch (err) {			
		}
	}
	
	chan.buffer=buffer;
	chan.flags=flags;

	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}

	chan.offset=0;	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0 );

	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){

	var chan=this.channels[channel];
	if( !chan.state ) return;
	
	if( chan.state==1 ){
		chan.waSource.onended=null;
		try {
			chan.waSource.stop( 0 );
		} catch (err) {			
		}
		chan.waSource=null;
	}

	chan.state=0;
}

gxtkAudio.prototype.PauseChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=1 ) return;
	
	chan.offset=(chan.offset+(wa.currentTime-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
	
	chan.waSource.onended=null;
	try {
		chan.waSource.stop( 0 );
	} catch (err) {			
	}
	chan.waSource=null;
	
	chan.state=2;
}

gxtkAudio.prototype.ResumeChannel=function( channel ){

	var chan=this.channels[channel];
	if( chan.state!=2 ) return;
	
	chan.waSource=wa.createBufferSource();
	chan.waSource.buffer=chan.buffer.waBuffer;
	chan.waSource.playbackRate.value=chan.rate;
	chan.waSource.loop=(chan.flags&1)!=0;
	chan.waSource.connect( chan.waPanner );
	
	chan.waSource.onended=function( e ){
		chan.waSource=null;
		chan.state=0;
	}
	
	chan.startTime=wa.currentTime;
	chan.waSource.start( 0,chan.offset );

	chan.state=1;
}

gxtkAudio.prototype.ChannelState=function( channel ){
	return this.channels[channel].state & 3;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];

	chan.volume=volume;
	
	chan.waGain.gain.value=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];

	chan.pan=pan;
	
	var sin=Math.sin( pan*3.14159265359/2 );
	var cos=Math.cos( pan*3.14159265359/2 );
	
	chan.waPanner.setPosition( sin,0,-cos );
}

gxtkAudio.prototype.SetRate=function( channel,rate ){

	var chan=this.channels[channel];

	if( chan.state==1 ){
		//update offset for pause/resume
		var time=wa.currentTime;
		chan.offset=(chan.offset+(time-chan.startTime)*chan.rate)%chan.buffer.waBuffer.duration;
		chan.startTime=time;
	}

	chan.rate=rate;
	
	if( chan.waSource ) chan.waSource.playbackRate.value=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	if( this.musicState ) this.music.pause();
	this.music=new Audio( BBGame.Game().PathToUrl( path ) );
	this.music.loop=(flags&1)!=0;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.StopMusic=function(){
	if( !this.musicState ) return;
	this.music.pause();
	this.music=null;
	this.musicState=0;
}

gxtkAudio.prototype.PauseMusic=function(){
	if( this.musicState!=1 ) return;
	this.music.pause();
	this.musicState=2;
}

gxtkAudio.prototype.ResumeMusic=function(){
	if( this.musicState!=2 ) return;
	this.music.play();
	this.musicState=1;
}

gxtkAudio.prototype.MusicState=function(){
	if( this.musicState==1 && this.music.ended && !this.music.loop ){
		this.music=null;
		this.musicState=0;
	}
	return this.musicState;
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.musicVolume=volume;
	if( this.musicState ) this.music.volume=volume;
}

}else{

//print( "Using OldAudio!" );

// ***** gxtkChannel class *****

var gxtkChannel=function(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

// ***** gxtkAudio class *****

var gxtkAudio=function(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
		if( !this.okay ) this.channels[i].state=-1;
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ){
			if( chan.audio.ended && !chan.audio.loop ){
				chan.state=0;
			}else{
				chan.audio.pause();
				chan.state=3;
			}
		}
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==3 ){
			chan.audio.play();
			chan.state=1;
		}
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return null;

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];

	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;

	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state>0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	if( chan.state==3 ) return 1;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state>0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

// ***** gxtkSample class *****

//function gxtkSample( audio ){
var gxtkSample=function( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
//			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
//				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

}


function BBThread(){
	this.result=null;
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.result=null;
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Result=function(){
	return this.result;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}


function BBAsyncImageLoaderThread(){
	this._running=false;
}

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	thread._surface=null;
	thread._result=false;
	thread._running=true;

	var image=new Image();

	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread._result=true;
		thread._running=false;
	}
	
	image.onerror=function( e ){
		thread._running=false;
	}
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}

BBAsyncImageLoaderThread.prototype.IsRunning=function(){
	return this._running;
}



function BBAsyncSoundLoaderThread(){
	this._running=false;
}
  
if( CFG_HTML5_WEBAUDIO_ENABLED=="1" && (window.AudioContext || window.webkitAudioContext) ){

BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	var req=new XMLHttpRequest();
	req.open( "get",BBGame.Game().PathToUrl( this._path ),true );
	req.responseType="arraybuffer";
	
	req.onload=function(){
		//load success!
		wa.decodeAudioData( req.response,function( buffer ){
			//decode success!
			thread._sample=new gxtkSample();
			thread._sample.waBuffer=buffer;
			thread._sample.state=1;
			thread._result=true;
			thread._running=false;
		},function(){	
			//decode fail!
			thread._running=false;
		} );
	}
	
	req.onerror=function(){
		//load fail!
		thread._running=false;
	}
	
	req.send();
}
	
}else{
 
BBAsyncSoundLoaderThread.prototype.Start=function(){

	this._sample=null;
	if( !this._device.okay ) return;
	
	var audio=new Audio();
	if( !audio ) return;
	
	var thread=this;
	
	thread._sample=null;
	thread._result=false;
	thread._running=true;

	audio.src=BBGame.Game().PathToUrl( this._path );
	audio.preload='auto';	
	
	var success=function( e ){
		thread._sample=new gxtkSample( audio );
		thread._result=true;
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	var error=function( e ){
		thread._running=false;
		audio.removeEventListener( 'canplaythrough',success,false );
		audio.removeEventListener( 'error',error,false );
	}
	
	audio.addEventListener( 'canplaythrough',success,false );
	audio.addEventListener( 'error',error,false );
	
	//voodoo fix for Chrome!
	var timer=setInterval( function(){ if( !thread._running ) clearInterval( timer ); },200 );
	
	audio.load();
}

}
  
BBAsyncSoundLoaderThread.prototype.IsRunning=function(){
	return this._running;
}

function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<152>";
	if((bb_app__app)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<152>";
		error("App has already been created");
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<153>";
	bb_app__app=this;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<154>";
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<155>";
	bb_app__game.SetDelegate(bb_app__delegate);
	pop_err();
	return this;
}
c_App.prototype.p_OnResize=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnCreate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnResume=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnRender=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnClose=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<177>";
	bb_app_EndApp();
	pop_err();
	return 0;
}
c_App.prototype.p_OnBack=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<181>";
	this.p_OnClose();
	pop_err();
	return 0;
}
function c_human(){
	c_App.call(this);
	this.m_gameOver=null;
	this.m_life=null;
	this.m_background=null;
	this.m_gameWin=null;
	this.m_human=null;
	this.m_bullet=null;
	this.m_bird1=null;
	this.m_bird2=null;
	this.m_bird3=null;
	this.m_monster=null;
	this.m_monster2=null;
}
c_human.prototype=extend_class(c_App);
c_human.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<6>";
	c_App.m_new.call(this);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<6>";
	pop_err();
	return this;
}
c_human.prototype.p_OnCreate=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<24>";
	bb_app_SetUpdateRate(30);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<25>";
	this.m_gameOver=bb_graphics_LoadImage("black.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<26>";
	this.m_life=bb_graphics_LoadImage("life.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<27>";
	this.m_background=bb_graphics_LoadImage("background.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<28>";
	this.m_gameWin=bb_graphics_LoadImage("gameWin.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<30>";
	this.m_human=c_myObject.m_new.call(new c_myObject);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<31>";
	dbg_object(this.m_human).m_mainImage=bb_graphics_LoadImage("player.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<33>";
	dbg_object(this.m_human).m_mainImage.p_SetHandle(0.0,((dbg_object(this.m_human).m_mainImage.p_Height()/2)|0));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<35>";
	dbg_object(this.m_human).m_x=10.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<36>";
	dbg_object(this.m_human).m_y=430.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<38>";
	this.m_bullet=c_myObject.m_new.call(new c_myObject);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<39>";
	dbg_object(this.m_bullet).m_mainImage=bb_graphics_LoadImage("bullet.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<40>";
	dbg_object(this.m_bullet).m_mainImage.p_SetHandle(((dbg_object(this.m_bullet).m_mainImage.p_Width()/2)|0),((dbg_object(this.m_bullet).m_mainImage.p_Height()/2)|0));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<41>";
	dbg_object(this.m_bullet).m_x=0.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<42>";
	dbg_object(this.m_bullet).m_y=460.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<43>";
	dbg_object(this.m_bullet).m_visible=false;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<45>";
	var t_time=bb_app_Millisecs();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<46>";
	var t_temp=((bb_random_Rnd3(t_time+200))|0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<47>";
	print(String(t_temp));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<50>";
	this.m_bird1=c_unit.m_new.call(new c_unit);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<51>";
	dbg_object(this.m_bird1).m_mainImage=bb_graphics_LoadImage("bird.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<52>";
	dbg_object(this.m_bird1).m_mainImage.p_SetHandle(0.0,((dbg_object(this.m_bird1).m_mainImage.p_Height()/2)|0));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<53>";
	dbg_object(this.m_bird1).m_x=600.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<54>";
	dbg_object(this.m_bird1).m_y=200.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<55>";
	dbg_object(this.m_bird1).m_visible=true;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<57>";
	this.m_bird2=c_unit.m_new.call(new c_unit);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<58>";
	dbg_object(this.m_bird2).m_mainImage=bb_graphics_LoadImage("bird2.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<59>";
	dbg_object(this.m_bird2).m_mainImage.p_SetHandle(0.0,((dbg_object(this.m_bird2).m_mainImage.p_Height()/2)|0));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<60>";
	dbg_object(this.m_bird2).m_x=900.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<61>";
	dbg_object(this.m_bird2).m_y=220.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<62>";
	dbg_object(this.m_bird2).m_visible=true;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<64>";
	this.m_bird3=c_unit.m_new.call(new c_unit);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<65>";
	dbg_object(this.m_bird3).m_mainImage=bb_graphics_LoadImage("bird3.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<66>";
	dbg_object(this.m_bird3).m_mainImage.p_SetHandle(0.0,((dbg_object(this.m_bird3).m_mainImage.p_Height()/2)|0));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<67>";
	dbg_object(this.m_bird3).m_x=800.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<68>";
	dbg_object(this.m_bird3).m_y=234.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<69>";
	dbg_object(this.m_bird3).m_visible=true;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<71>";
	this.m_monster=c_unit.m_new.call(new c_unit);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<72>";
	dbg_object(this.m_monster).m_mainImage=bb_graphics_LoadImage("gob1.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<73>";
	dbg_object(this.m_monster).m_mainImage.p_SetHandle(0.0,((dbg_object(this.m_monster).m_mainImage.p_Height()/2)|0));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<74>";
	dbg_object(this.m_monster).m_x=700.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<75>";
	dbg_object(this.m_monster).m_y=430.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<76>";
	dbg_object(this.m_monster).m_visible=true;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<78>";
	this.m_monster2=c_unit.m_new.call(new c_unit);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<79>";
	dbg_object(this.m_monster2).m_mainImage=bb_graphics_LoadImage("gob2.png",1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<80>";
	dbg_object(this.m_monster2).m_mainImage.p_SetHandle(0.0,((dbg_object(this.m_monster2).m_mainImage.p_Height()/2)|0));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<81>";
	dbg_object(this.m_monster2).m_x=1000.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<82>";
	dbg_object(this.m_monster2).m_y=425.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<83>";
	dbg_object(this.m_monster2).m_visible=true;
	pop_err();
	return 0;
}
c_human.prototype.p_OnUpdate=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<88>";
	print(String(bb_day2_winPoint));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<90>";
	var t_dx=bb_input_MouseX()-dbg_object(this.m_human).m_x;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<91>";
	var t_dy=bb_input_MouseY()-dbg_object(this.m_human).m_y;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<92>";
	var t_cursorAngle=(Math.atan2(t_dy,t_dx)*R2D);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<93>";
	dbg_object(this.m_human).m_rotation=-t_cursorAngle;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<95>";
	dbg_object(this.m_bird1).m_visible=true;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<97>";
	dbg_object(this.m_bird2).m_visible=true;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<98>";
	dbg_object(this.m_bird3).m_visible=true;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<100>";
	dbg_object(this.m_monster).m_visible=true;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<101>";
	dbg_object(this.m_monster2).m_visible=true;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<103>";
	if(!dbg_object(this.m_bullet).m_visible){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<106>";
		if((bb_input_MouseHit(0))!=0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<107>";
			print("hitted");
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<109>";
			var t_cos=Math.cos((-dbg_object(this.m_human).m_rotation)*D2R);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<110>";
			var t_sin=Math.sin((-dbg_object(this.m_human).m_rotation)*D2R);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<111>";
			var t_speed=20.0;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<113>";
			dbg_object(this.m_bullet).m_x=dbg_object(this.m_human).m_x+t_cos*100.0;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<114>";
			dbg_object(this.m_bullet).m_y=dbg_object(this.m_human).m_y+t_sin*100.0;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<115>";
			dbg_object(this.m_bullet).m_vx=t_cos*t_speed;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<116>";
			dbg_object(this.m_bullet).m_vy=t_sin*t_speed;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<117>";
			dbg_object(this.m_bullet).m_visible=true;
		}
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<120>";
		dbg_object(this.m_bullet).m_vy+=0.7;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<122>";
		var t_radians=(Math.atan2(dbg_object(this.m_bullet).m_vy,dbg_object(this.m_bullet).m_vx)*R2D);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<123>";
		dbg_object(this.m_bullet).m_rotation=-t_radians;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<126>";
		dbg_object(this.m_bullet).m_x+=dbg_object(this.m_bullet).m_vx;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<127>";
		dbg_object(this.m_bullet).m_y+=dbg_object(this.m_bullet).m_vy;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<131>";
		if(dbg_object(this.m_bullet).m_y>=(bb_app_DeviceHeight()) || dbg_object(this.m_bullet).m_x>=(bb_app_DeviceWidth())){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<132>";
			dbg_object(this.m_bullet).m_visible=false;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<135>";
		if(dbg_object(this.m_bullet).m_x>dbg_object(this.m_bird1).m_x-15.0 && dbg_object(this.m_bullet).m_x<dbg_object(this.m_bird1).m_x+30.0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<136>";
			if(dbg_object(this.m_bullet).m_y>dbg_object(this.m_bird1).m_y-10.0 && dbg_object(this.m_bullet).m_y<dbg_object(this.m_bird1).m_y+15.0){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<137>";
				dbg_object(this.m_bird1).m_visible=false;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<138>";
				dbg_object(this.m_bird1).m_x=1000.0;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<139>";
				bb_day2_winPoint+=1;
			}
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<147>";
		if(dbg_object(this.m_bullet).m_x>dbg_object(this.m_bird2).m_x-15.0 && dbg_object(this.m_bullet).m_x<dbg_object(this.m_bird2).m_x+15.0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<148>";
			if(dbg_object(this.m_bullet).m_y>dbg_object(this.m_bird2).m_y-15.0 && dbg_object(this.m_bullet).m_y<dbg_object(this.m_bird2).m_y+15.0){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<149>";
				dbg_object(this.m_bird2).m_visible=false;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<150>";
				dbg_object(this.m_bird2).m_x=1000.0;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<151>";
				bb_day2_winPoint+=1;
			}
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<157>";
		if(dbg_object(this.m_bullet).m_x>dbg_object(this.m_bird3).m_x-15.0 && dbg_object(this.m_bullet).m_x<dbg_object(this.m_bird3).m_x+15.0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<158>";
			if(dbg_object(this.m_bullet).m_y>dbg_object(this.m_bird3).m_y-15.0 && dbg_object(this.m_bullet).m_y<dbg_object(this.m_bird3).m_y+15.0){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<159>";
				dbg_object(this.m_bird3).m_visible=false;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<160>";
				dbg_object(this.m_bird3).m_x=1000.0;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<161>";
				bb_day2_winPoint+=1;
			}
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<166>";
		if(dbg_object(this.m_bullet).m_x>dbg_object(this.m_monster).m_x-15.0 && dbg_object(this.m_bullet).m_x<dbg_object(this.m_monster).m_x+15.0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<167>";
			if(dbg_object(this.m_bullet).m_y>dbg_object(this.m_monster).m_y-15.0 && dbg_object(this.m_bullet).m_y<dbg_object(this.m_monster).m_y+15.0){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<168>";
				dbg_object(this.m_monster).m_visible=false;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<169>";
				dbg_object(this.m_monster).m_x=1000.0;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<170>";
				bb_day2_winPoint+=1;
			}
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<176>";
		if(dbg_object(this.m_bullet).m_x>dbg_object(this.m_monster2).m_x-15.0 && dbg_object(this.m_bullet).m_x<dbg_object(this.m_monster2).m_x+15.0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<177>";
			if(dbg_object(this.m_bullet).m_y>dbg_object(this.m_monster2).m_y-15.0 && dbg_object(this.m_bullet).m_y<dbg_object(this.m_monster2).m_y+15.0){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<178>";
				dbg_object(this.m_monster2).m_visible=false;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<179>";
				dbg_object(this.m_monster2).m_x=1000.0;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<180>";
				bb_day2_winPoint+=1;
			}
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<189>";
	dbg_object(this.m_bird1).m_x=dbg_object(this.m_bird1).m_x-2.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<192>";
	dbg_object(this.m_bird2).m_x-=2.5;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<193>";
	dbg_object(this.m_bird3).m_x=dbg_object(this.m_bird3).m_x-3.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<195>";
	dbg_object(this.m_monster).m_x-=1.5;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<196>";
	dbg_object(this.m_monster2).m_x-=1.7;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<199>";
	if(dbg_object(this.m_bird1).m_x==10.0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<200>";
		bb_day2_lifeCount-=1;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<201>";
		dbg_object(this.m_bird1).m_x=600.0;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<204>";
	if(dbg_object(this.m_bird2).m_x==10.0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<205>";
		bb_day2_lifeCount-=1;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<206>";
		dbg_object(this.m_bird2).m_x=700.0;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<209>";
	if(dbg_object(this.m_bird3).m_x==10.0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<210>";
		bb_day2_lifeCount-=1;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<211>";
		dbg_object(this.m_bird3).m_x=630.0;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<214>";
	if(dbg_object(this.m_monster).m_x==10.0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<215>";
		bb_day2_lifeCount-=1;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<216>";
		dbg_object(this.m_monster).m_x=666.0;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<219>";
	if(dbg_object(this.m_monster2).m_x==10.0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<220>";
		bb_day2_lifeCount-=1;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<221>";
		dbg_object(this.m_monster2).m_x=720.0;
	}
	pop_err();
	return 0;
}
c_human.prototype.p_OnRender=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<230>";
	bb_graphics_Cls(0.0,0.0,0.0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<232>";
	bb_graphics_DrawImageRect(this.m_background,0.0,0.0,0,0,640,480,0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<234>";
	var t_1=bb_day2_lifeCount;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<237>";
	if(t_1==5){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<238>";
		bb_graphics_DrawImageRect(this.m_life,20.0,20.0,0,0,35,35,0);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<239>";
		bb_graphics_DrawImageRect(this.m_life,60.0,20.0,0,0,35,35,0);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<240>";
		bb_graphics_DrawImageRect(this.m_life,100.0,20.0,0,0,35,35,0);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<241>";
		bb_graphics_DrawImageRect(this.m_life,140.0,20.0,0,0,35,35,0);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<242>";
		bb_graphics_DrawImageRect(this.m_life,180.0,20.0,0,0,35,35,0);
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<244>";
		if(t_1==4){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<245>";
			bb_graphics_DrawImageRect(this.m_life,20.0,20.0,0,0,35,35,0);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<246>";
			bb_graphics_DrawImageRect(this.m_life,60.0,20.0,0,0,35,35,0);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<247>";
			bb_graphics_DrawImageRect(this.m_life,100.0,20.0,0,0,35,35,0);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<248>";
			bb_graphics_DrawImageRect(this.m_life,140.0,20.0,0,0,35,35,0);
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<249>";
			if(t_1==3){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<250>";
				bb_graphics_DrawImageRect(this.m_life,20.0,20.0,0,0,35,35,0);
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<251>";
				bb_graphics_DrawImageRect(this.m_life,60.0,20.0,0,0,35,35,0);
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<252>";
				bb_graphics_DrawImageRect(this.m_life,100.0,20.0,0,0,35,35,0);
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<254>";
				if(t_1==2){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<255>";
					bb_graphics_DrawImageRect(this.m_life,20.0,20.0,0,0,35,35,0);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<256>";
					bb_graphics_DrawImageRect(this.m_life,60.0,20.0,0,0,35,35,0);
				}else{
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<258>";
					if(t_1==1){
						err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<259>";
						bb_graphics_DrawImageRect(this.m_life,20.0,20.0,0,0,35,35,0);
					}else{
						err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<261>";
						if(t_1==0){
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<262>";
							dbg_object(this.m_bird1).m_visible=false;
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<263>";
							dbg_object(this.m_bird1).m_x=0.0;
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<265>";
							dbg_object(this.m_bird2).m_visible=false;
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<266>";
							dbg_object(this.m_bird3).m_visible=false;
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<267>";
							dbg_object(this.m_monster).m_visible=false;
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<268>";
							dbg_object(this.m_monster2).m_visible=false;
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<270>";
							dbg_object(this.m_bird2).m_x=0.0;
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<271>";
							dbg_object(this.m_bird3).m_x=0.0;
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<272>";
							dbg_object(this.m_monster).m_x=0.0;
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<273>";
							dbg_object(this.m_monster2).m_x=0.0;
							err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<277>";
							bb_graphics_DrawImageRect(this.m_gameOver,0.0,0.0,0,0,640,480,0);
						}
					}
				}
			}
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<281>";
	if(bb_day2_winPoint>=15){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<285>";
		dbg_object(this.m_bird1).m_x=0.0;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<287>";
		dbg_object(this.m_bird2).m_x=0.0;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<288>";
		dbg_object(this.m_bird3).m_x=0.0;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<289>";
		dbg_object(this.m_monster).m_x=0.0;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<290>";
		dbg_object(this.m_monster2).m_x=0.0;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<292>";
		dbg_object(this.m_bird1).m_visible=false;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<293>";
		dbg_object(this.m_bird2).m_visible=false;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<294>";
		dbg_object(this.m_bird3).m_visible=false;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<295>";
		dbg_object(this.m_monster).m_visible=false;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<296>";
		dbg_object(this.m_monster2).m_visible=false;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<298>";
		bb_graphics_DrawImageRect(this.m_gameWin,0.0,0.0,0,0,640,480,0);
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<303>";
	bb_graphics_DrawText(String(bb_day2_winPoint),100,100,201.0,201.0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<304>";
	this.m_bullet.p_Draw();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<305>";
	this.m_human.p_Draw();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<306>";
	this.m_bird1.p_Draw();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<308>";
	this.m_bird2.p_Draw();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<309>";
	this.m_bird3.p_Draw();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<310>";
	this.m_monster.p_Draw();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<311>";
	this.m_monster2.p_Draw();
	pop_err();
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<65>";
	pop_err();
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<75>";
	this.m__graphics=(new gxtkGraphics);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<76>";
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<77>";
	bb_graphics_SetFont(null);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<79>";
	this.m__audio=(new gxtkAudio);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<80>";
	bb_audio_SetAudioDevice(this.m__audio);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<82>";
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<83>";
	bb_input_SetInputDevice(this.m__input);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<85>";
	bb_app_ValidateDeviceWindow(false);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<87>";
	bb_app_EnumDisplayModes();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<89>";
	bb_app__app.p_OnCreate();
	pop_err();
}
c_GameDelegate.prototype.SuspendGame=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<93>";
	bb_app__app.p_OnSuspend();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<94>";
	this.m__audio.Suspend();
	pop_err();
}
c_GameDelegate.prototype.ResumeGame=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<98>";
	this.m__audio.Resume();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<99>";
	bb_app__app.p_OnResume();
	pop_err();
}
c_GameDelegate.prototype.UpdateGame=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<103>";
	bb_app_ValidateDeviceWindow(true);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<104>";
	this.m__input.p_BeginUpdate();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<105>";
	bb_app__app.p_OnUpdate();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<106>";
	this.m__input.p_EndUpdate();
	pop_err();
}
c_GameDelegate.prototype.RenderGame=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<110>";
	bb_app_ValidateDeviceWindow(true);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<111>";
	var t_mode=this.m__graphics.BeginRender();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<112>";
	if((t_mode)!=0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<112>";
		bb_graphics_BeginRender();
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<113>";
	if(t_mode==2){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<113>";
		bb_app__app.p_OnLoading();
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<113>";
		bb_app__app.p_OnRender();
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<114>";
	if((t_mode)!=0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<114>";
		bb_graphics_EndRender();
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<115>";
	this.m__graphics.EndRender();
	pop_err();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<119>";
	this.m__input.p_KeyEvent(t_event,t_data);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<120>";
	if(t_event!=1){
		pop_err();
		return;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<121>";
	var t_1=t_data;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<122>";
	if(t_1==432){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<123>";
		bb_app__app.p_OnClose();
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<124>";
		if(t_1==416){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<125>";
			bb_app__app.p_OnBack();
		}
	}
	pop_err();
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<130>";
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y,t_z);
	pop_err();
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<134>";
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<138>";
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
	pop_err();
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<142>";
	this.m__graphics.DiscardGraphics();
	pop_err();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<339>";
	c_human.m_new.call(new c_human);
	pop_err();
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<67>";
	bb_graphics_device=t_dev;
	pop_err();
	return 0;
}
function c_Font(){
	Object.call(this);
	this.m__pages=[];
	this.m__pageCount=0;
	this.m__firstChar=0;
	this.m__height=.0;
	this.m__charMap=c_IntMap.m_new.call(new c_IntMap);
}
c_Font.m_new=function(t_pages,t_pageCount,t_chars,t_firstChar,t_height){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<104>";
	dbg_object(this).m__pages=t_pages;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<105>";
	dbg_object(this).m__pageCount=t_pageCount;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<106>";
	dbg_object(this).m__firstChar=t_firstChar;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<107>";
	dbg_object(this).m__height=t_height;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<108>";
	dbg_object(this).m__charMap=t_chars;
	pop_err();
	return this;
}
c_Font.m_new2=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<101>";
	pop_err();
	return this;
}
c_Font.m_Load=function(t_path,t_firstChar,t_numChars,t_padded){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<132>";
	var t_image=bb_graphics_LoadImage(t_path,1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<133>";
	var t__pages=new_object_array(1);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<134>";
	dbg_array(t__pages,0)[dbg_index]=t_image;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<135>";
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<137>";
	var t__pageCount=1;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<138>";
	if(!((t_image)!=null)){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<138>";
		pop_err();
		return null;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<140>";
	var t_cellWidth=((t_image.p_Width()/t_numChars)|0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<141>";
	var t_cellHeight=t_image.p_Height();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<142>";
	var t_glyphX=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<142>";
	var t_glyphY=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<142>";
	var t_glyphWidth=t_cellWidth;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<142>";
	var t_glyphHeight=t_cellHeight;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<143>";
	if(t_padded==true){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<144>";
		t_glyphX+=1;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<145>";
		t_glyphY+=1;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<146>";
		t_glyphWidth-=2;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<147>";
		t_glyphHeight-=2;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<150>";
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<151>";
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<153>";
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<154>";
		var t_y=((t_i/t_w)|0);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<155>";
		var t_x=t_i % t_w;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<156>";
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,0,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,t_glyphWidth);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<157>";
		t__charMap.p_Add(t_firstChar+t_i,t_glyph);
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<160>";
	var t_=c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,t_firstChar,(t_glyphHeight));
	pop_err();
	return t_;
}
c_Font.m_Load2=function(t_path,t_cellWidth,t_cellHeight,t_glyphX,t_glyphY,t_glyphWidth,t_glyphHeight,t_firstChar,t_numChars){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<164>";
	var t_image=bb_graphics_LoadImage(t_path,1,c_Image.m_DefaultFlags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<165>";
	var t__pages=new_object_array(1);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<166>";
	dbg_array(t__pages,0)[dbg_index]=t_image;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<167>";
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<169>";
	var t__pageCount=1;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<170>";
	if(!((t_image)!=null)){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<170>";
		pop_err();
		return null;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<172>";
	var t_w=((t_image.p_Width()/t_cellWidth)|0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<173>";
	var t_h=((t_image.p_Height()/t_cellHeight)|0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<175>";
	for(var t_i=0;t_i<t_numChars;t_i=t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<176>";
		var t_y=((t_i/t_w)|0);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<177>";
		var t_x=t_i % t_w;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<178>";
		var t_glyph=c_Glyph.m_new.call(new c_Glyph,0,t_firstChar+t_i,t_x*t_cellWidth+t_glyphX,t_y*t_cellHeight+t_glyphY,t_glyphWidth,t_glyphHeight,t_glyphWidth);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<179>";
		t__charMap.p_Add(t_firstChar+t_i,t_glyph);
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<182>";
	var t_=c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,t_firstChar,(t_glyphHeight));
	pop_err();
	return t_;
}
c_Font.m_Load3=function(t_url){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<187>";
	var t_iniText="";
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<188>";
	var t_pageNum=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<189>";
	var t_idnum=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<190>";
	var t_tmpChar=null;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<191>";
	var t_plLen=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<192>";
	var t_lines=[];
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<194>";
	var t_filename="";
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<195>";
	var t_lineHeight=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<197>";
	var t__pages=[];
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<198>";
	var t__charMap=c_IntMap.m_new.call(new c_IntMap);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<199>";
	var t__pageCount=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<201>";
	var t_path="";
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<203>";
	if(t_url.indexOf("/",0)>-1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<204>";
		var t_pl=t_url.split("/");
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<205>";
		t_plLen=t_pl.length;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<206>";
		for(var t_pi=0;t_pi<=t_plLen-2;t_pi=t_pi+1){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<207>";
			t_path=t_path+dbg_array(t_pl,t_pi)[dbg_index]+"/";
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<210>";
	var t_ts=t_url.toLowerCase();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<211>";
	if(t_ts.indexOf(".txt",0)>0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<212>";
		t_iniText=bb_app_LoadString(t_url);
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<214>";
		t_iniText=bb_app_LoadString(t_url+".txt");
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<217>";
	t_lines=t_iniText.split(String.fromCharCode(13)+String.fromCharCode(10));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<218>";
	if(t_lines.length<2){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<219>";
		t_lines=t_iniText.split(String.fromCharCode(10));
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<222>";
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<222>";
	var t_=t_lines;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<222>";
	var t_2=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<222>";
	while(t_2<t_.length){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<222>";
		var t_line=dbg_array(t_,t_2)[dbg_index];
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<222>";
		t_2=t_2+1;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<224>";
		t_line=string_trim(t_line);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<225>";
		if(string_startswith(t_line,"info") || t_line==""){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<225>";
			continue;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<226>";
		if(string_startswith(t_line,"padding")){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<226>";
			continue;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<227>";
		if(string_startswith(t_line,"common")){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<228>";
			var t_commondata=t_line.split(String.fromCharCode(32));
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<229>";
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<229>";
			var t_3=t_commondata;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<229>";
			var t_4=0;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<229>";
			while(t_4<t_3.length){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<229>";
				var t_common=dbg_array(t_3,t_4)[dbg_index];
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<229>";
				t_4=t_4+1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<231>";
				if(string_startswith(t_common,"lineHeight=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<232>";
					var t_lnh=t_common.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<233>";
					dbg_array(t_lnh,1)[dbg_index]=string_trim(dbg_array(t_lnh,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<234>";
					t_lineHeight=parseInt((dbg_array(t_lnh,1)[dbg_index]),10);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<237>";
				if(string_startswith(t_common,"pages=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<238>";
					var t_lnh2=t_common.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<239>";
					dbg_array(t_lnh2,1)[dbg_index]=string_trim(dbg_array(t_lnh2,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<240>";
					t__pageCount=parseInt((dbg_array(t_lnh2,1)[dbg_index]),10);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<241>";
					t__pages=new_object_array(t__pageCount);
				}
			}
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<247>";
		if(string_startswith(t_line,"page")){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<248>";
			var t_pagedata=t_line.split(String.fromCharCode(32));
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<249>";
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<249>";
			var t_5=t_pagedata;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<249>";
			var t_6=0;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<249>";
			while(t_6<t_5.length){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<249>";
				var t_data=dbg_array(t_5,t_6)[dbg_index];
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<249>";
				t_6=t_6+1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<250>";
				if(string_startswith(t_data,"file=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<251>";
					var t_fn=t_data.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<252>";
					dbg_array(t_fn,1)[dbg_index]=string_trim(dbg_array(t_fn,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<253>";
					t_filename=dbg_array(t_fn,1)[dbg_index];
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<254>";
					if(dbg_charCodeAt(t_filename,0)==34){
						err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<255>";
						t_filename=t_filename.slice(1,t_filename.length-1);
					}
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<257>";
					t_filename=t_path+string_trim(t_filename);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<259>";
					dbg_array(t__pages,t_pageNum)[dbg_index]=bb_graphics_LoadImage(t_filename,1,c_Image.m_DefaultFlags);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<261>";
					if(dbg_array(t__pages,t_pageNum)[dbg_index]==null){
						err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<261>";
						error("\n\nError in file graphics.cxs, Method Font.Load:Font(url:String)\n\nCan not load page image: "+t_filename);
					}
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<263>";
					t_pageNum=t_pageNum+1;
				}
			}
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<268>";
		if(string_startswith(t_line,"chars")){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<268>";
			continue;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<270>";
		if(string_startswith(t_line,"char")){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<271>";
			t_tmpChar=c_Glyph.m_new2.call(new c_Glyph);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<272>";
			var t_linedata=t_line.split(String.fromCharCode(32));
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<273>";
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<273>";
			var t_7=t_linedata;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<273>";
			var t_8=0;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<273>";
			while(t_8<t_7.length){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<273>";
				var t_data2=dbg_array(t_7,t_8)[dbg_index];
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<273>";
				t_8=t_8+1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<274>";
				if(string_startswith(t_data2,"id=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<275>";
					var t_idc=t_data2.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<276>";
					dbg_array(t_idc,1)[dbg_index]=string_trim(dbg_array(t_idc,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<277>";
					dbg_object(t_tmpChar).m_id=parseInt((dbg_array(t_idc,1)[dbg_index]),10);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<279>";
				if(string_startswith(t_data2,"x=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<280>";
					var t_xc=t_data2.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<281>";
					dbg_array(t_xc,1)[dbg_index]=string_trim(dbg_array(t_xc,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<282>";
					dbg_object(t_tmpChar).m_x=parseInt((dbg_array(t_xc,1)[dbg_index]),10);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<284>";
				if(string_startswith(t_data2,"y=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<285>";
					var t_yc=t_data2.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<286>";
					dbg_array(t_yc,1)[dbg_index]=string_trim(dbg_array(t_yc,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<287>";
					dbg_object(t_tmpChar).m_y=parseInt((dbg_array(t_yc,1)[dbg_index]),10);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<289>";
				if(string_startswith(t_data2,"width=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<290>";
					var t_wc=t_data2.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<291>";
					dbg_array(t_wc,1)[dbg_index]=string_trim(dbg_array(t_wc,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<292>";
					dbg_object(t_tmpChar).m_width=parseInt((dbg_array(t_wc,1)[dbg_index]),10);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<294>";
				if(string_startswith(t_data2,"height=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<295>";
					var t_hc=t_data2.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<296>";
					dbg_array(t_hc,1)[dbg_index]=string_trim(dbg_array(t_hc,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<297>";
					dbg_object(t_tmpChar).m_height=parseInt((dbg_array(t_hc,1)[dbg_index]),10);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<299>";
				if(string_startswith(t_data2,"xoffset=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<300>";
					var t_xoc=t_data2.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<301>";
					dbg_array(t_xoc,1)[dbg_index]=string_trim(dbg_array(t_xoc,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<302>";
					dbg_object(t_tmpChar).m_xoff=parseInt((dbg_array(t_xoc,1)[dbg_index]),10);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<304>";
				if(string_startswith(t_data2,"yoffset=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<305>";
					var t_yoc=t_data2.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<306>";
					dbg_array(t_yoc,1)[dbg_index]=string_trim(dbg_array(t_yoc,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<307>";
					dbg_object(t_tmpChar).m_yoff=parseInt((dbg_array(t_yoc,1)[dbg_index]),10);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<309>";
				if(string_startswith(t_data2,"xadvance=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<310>";
					var t_advc=t_data2.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<311>";
					dbg_array(t_advc,1)[dbg_index]=string_trim(dbg_array(t_advc,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<312>";
					dbg_object(t_tmpChar).m_advance=parseInt((dbg_array(t_advc,1)[dbg_index]),10);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<314>";
				if(string_startswith(t_data2,"page=")){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<315>";
					var t_advc2=t_data2.split("=");
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<316>";
					dbg_array(t_advc2,1)[dbg_index]=string_trim(dbg_array(t_advc2,1)[dbg_index]);
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<317>";
					dbg_object(t_tmpChar).m_page=parseInt((dbg_array(t_advc2,1)[dbg_index]),10);
				}
			}
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<320>";
			t__charMap.p_Add(dbg_object(t_tmpChar).m_id,t_tmpChar);
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<322>";
		continue;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<324>";
	var t_9=c_Font.m_new.call(new c_Font,t__pages,t__pageCount,t__charMap,-1,(t_lineHeight));
	pop_err();
	return t_9;
}
c_Font.prototype.p_GetGlyph=function(t_char){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<112>";
	var t_=dbg_object(this).m__charMap.p_Get(t_char);
	pop_err();
	return t_;
}
c_Font.prototype.p_TextWidth=function(t_text){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<116>";
	var t_w=0.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<117>";
	var t_char=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<118>";
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<118>";
	var t_=t_text;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<118>";
	var t_2=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<118>";
	while(t_2<t_.length){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<118>";
		t_char=dbg_charCodeAt(t_,t_2);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<118>";
		t_2=t_2+1;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<119>";
		var t_glyph=this.p_GetGlyph(t_char);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<120>";
		if(!((t_glyph)!=null)){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<120>";
			continue;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<121>";
		t_w=t_w+(dbg_object(t_glyph).m_advance);
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<123>";
	pop_err();
	return t_w;
}
c_Font.prototype.p_TextHeight=function(t_text){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<127>";
	pop_err();
	return this.m__height;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<33>";
	pop_err();
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<44>";
	if((this.m_matDirty)!=0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<45>";
		bb_graphics_renderDevice.SetMatrix(dbg_object(bb_graphics_context).m_ix,dbg_object(bb_graphics_context).m_iy,dbg_object(bb_graphics_context).m_jx,dbg_object(bb_graphics_context).m_jy,dbg_object(bb_graphics_context).m_tx,dbg_object(bb_graphics_context).m_ty);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<46>";
		this.m_matDirty=0;
	}
	pop_err();
	return 0;
}
var bb_graphics_context=null;
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<336>";
	pop_err();
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<380>";
	dbg_object(this).m_tx=t_tx;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<381>";
	dbg_object(this).m_ty=t_ty;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<382>";
	dbg_object(this).m_flags=dbg_object(this).m_flags&-2;
	pop_err();
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<464>";
	this.m_flags=t_iflags;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<466>";
	if((this.m_flags&2)!=0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<467>";
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<467>";
		var t_=this.m_frames;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<467>";
		var t_2=0;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<467>";
		while(t_2<t_.length){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<467>";
			var t_f=dbg_array(t_,t_2)[dbg_index];
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<467>";
			t_2=t_2+1;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<468>";
			dbg_object(t_f).m_x+=1;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<470>";
		this.m_width-=2;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<473>";
	if((this.m_flags&4)!=0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<474>";
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<474>";
		var t_3=this.m_frames;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<474>";
		var t_4=0;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<474>";
		while(t_4<t_3.length){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<474>";
			var t_f2=dbg_array(t_3,t_4)[dbg_index];
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<474>";
			t_4=t_4+1;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<475>";
			dbg_object(t_f2).m_y+=1;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<477>";
		this.m_height-=2;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<480>";
	if((this.m_flags&1)!=0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<481>";
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<484>";
	if(this.m_frames.length==1 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_x==0 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<485>";
		this.m_flags|=65536;
	}
	pop_err();
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<410>";
	if((this.m_surface)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<410>";
		error("Image already initialized");
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<411>";
	this.m_surface=t_surf;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<413>";
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<414>";
	this.m_height=this.m_surface.Height();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<416>";
	this.m_frames=new_object_array(t_nframes);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<417>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<418>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0);
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<421>";
	this.p_ApplyFlags(t_iflags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<422>";
	pop_err();
	return this;
}
c_Image.prototype.p_Init2=function(t_surf,t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_src,t_srcx,t_srcy,t_srcw,t_srch){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<426>";
	if((this.m_surface)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<426>";
		error("Image already initialized");
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<427>";
	this.m_surface=t_surf;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<428>";
	this.m_source=t_src;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<430>";
	this.m_width=t_iwidth;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<431>";
	this.m_height=t_iheight;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<433>";
	this.m_frames=new_object_array(t_nframes);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<435>";
	var t_ix=t_x;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<435>";
	var t_iy=t_y;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<437>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<438>";
		if(t_ix+this.m_width>t_srcw){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<439>";
			t_ix=0;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<440>";
			t_iy+=this.m_height;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<442>";
		if(t_ix+this.m_width>t_srcw || t_iy+this.m_height>t_srch){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<443>";
			error("Image frame outside surface");
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<445>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_ix+t_srcx,t_iy+t_srcy);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<446>";
		t_ix+=this.m_width;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<449>";
	this.p_ApplyFlags(t_iflags);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<450>";
	pop_err();
	return this;
}
c_Image.prototype.p_Width=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<347>";
	pop_err();
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<351>";
	pop_err();
	return this.m_height;
}
function bb_data_FixDataPath(t_path){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/data.cxs<7>";
	var t_i=t_path.indexOf(":/",0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/data.cxs<8>";
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/data.cxs<8>";
		pop_err();
		return t_path;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/data.cxs<9>";
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/data.cxs<9>";
		pop_err();
		return t_path;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/data.cxs<10>";
	var t_="cerberus://data/"+t_path;
	pop_err();
	return t_;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<27>";
	dbg_object(this).m_x=t_x;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<28>";
	dbg_object(this).m_y=t_y;
	pop_err();
	return this;
}
c_Frame.m_new2=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<22>";
	pop_err();
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<506>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<507>";
	if((t_surf)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<508>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
		pop_err();
		return t_;
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<510>";
		debugLog("Error - Unable to load image: "+t_path);
	}
	pop_err();
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<515>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<516>";
	if((t_surf)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<517>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init2(t_surf,0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags,null,0,0,t_surf.Width(),t_surf.Height());
		pop_err();
		return t_;
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<519>";
		debugLog("Error - Unable to load image: "+t_path);
	}
	pop_err();
	return null;
}
function c_Glyph(){
	Object.call(this);
	this.m_page=0;
	this.m_id=0;
	this.m_x=0;
	this.m_y=0;
	this.m_width=0;
	this.m_height=0;
	this.m_advance=0;
	this.m_xoff=0;
	this.m_yoff=0;
}
c_Glyph.m_new=function(t_page,t_id,t_x,t_y,t_width,t_height,t_advance){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<89>";
	dbg_object(this).m_page=t_page;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<90>";
	dbg_object(this).m_id=t_id;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<91>";
	dbg_object(this).m_x=t_x;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<92>";
	dbg_object(this).m_y=t_y;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<93>";
	dbg_object(this).m_width=t_width;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<94>";
	dbg_object(this).m_height=t_height;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<95>";
	dbg_object(this).m_advance=t_advance;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<96>";
	dbg_object(this).m_xoff=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<97>";
	dbg_object(this).m_yoff=0;
	pop_err();
	return this;
}
c_Glyph.m_new2=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<76>";
	pop_err();
	return this;
}
function c_Map(){
	Object.call(this);
	this.m_root=null;
}
c_Map.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map.prototype.p_RotateLeft=function(t_node){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_RotateRight=function(t_node){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map.prototype.p_InsertFixup=function(t_node){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft(t_node);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight(t_node);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map.prototype.p_Add=function(t_key,t_value){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<61>";
	var t_node=this.m_root;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<62>";
	var t_parent=null;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<62>";
	var t_cmp=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<64>";
	while((t_node)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<65>";
		t_parent=t_node;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<66>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<67>";
		if(t_cmp>0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<68>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<69>";
			if(t_cmp<0){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<70>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<72>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<76>";
	t_node=c_Node.m_new.call(new c_Node,t_key,t_value,-1,t_parent);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<78>";
	if((t_parent)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<79>";
		if(t_cmp>0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<80>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<82>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<84>";
		this.p_InsertFixup(t_node);
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<86>";
		this.m_root=t_node;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<88>";
	pop_err();
	return true;
}
c_Map.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<161>";
		if(t_cmp>0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map.prototype.p_Get=function(t_key){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<101>";
	var t_node=this.p_FindNode(t_key);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<102>";
	if((t_node)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<102>";
		pop_err();
		return dbg_object(t_node).m_value;
	}
	pop_err();
	return null;
}
function c_IntMap(){
	c_Map.call(this);
}
c_IntMap.prototype=extend_class(c_Map);
c_IntMap.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<534>";
	c_Map.m_new.call(this);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<534>";
	pop_err();
	return this;
}
c_IntMap.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Node(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node.m_new2=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
function bb_app_LoadString(t_path){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<220>";
	var t_=bb_app__game.LoadString(bb_data_FixDataPath(t_path));
	pop_err();
	return t_;
}
function bb_graphics_SetFont(t_font){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<924>";
	if(!((t_font)!=null)){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<925>";
		if(!((dbg_object(bb_graphics_context).m_defaultFont)!=null)){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<926>";
			dbg_object(bb_graphics_context).m_defaultFont=c_Font.m_Load("mojo_font.png",32,96,true);
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<928>";
		t_font=dbg_object(bb_graphics_context).m_defaultFont;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<930>";
	dbg_object(bb_graphics_context).m_font=t_font;
	pop_err();
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/audio.cxs<30>";
	bb_audio_device=t_dev;
	pop_err();
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHitPut=0;
	this.m__keyHitQueue=new_number_array(33);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__mouseZ=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<26>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<27>";
		dbg_array(this.m__joyStates,t_i)[dbg_index]=c_JoyState.m_new.call(new c_JoyState);
	}
	pop_err();
	return this;
}
c_InputDevice.prototype.p_PutKeyHit=function(t_key){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<262>";
	if(this.m__keyHitPut==this.m__keyHitQueue.length){
		pop_err();
		return;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<263>";
	dbg_array(this.m__keyHit,t_key)[dbg_index]+=1;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<264>";
	dbg_array(this.m__keyHitQueue,this.m__keyHitPut)[dbg_index]=t_key;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<265>";
	this.m__keyHitPut+=1;
	pop_err();
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<213>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<214>";
		var t_state=dbg_array(this.m__joyStates,t_i)[dbg_index];
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<215>";
		if(!BBGame.Game().PollJoystick(t_i,dbg_object(t_state).m_joyx,dbg_object(t_state).m_joyy,dbg_object(t_state).m_joyz,dbg_object(t_state).m_buttons)){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<215>";
			break;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<216>";
		for(var t_j=0;t_j<32;t_j=t_j+1){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<217>";
			var t_key=256+t_i*32+t_j;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<218>";
			if(dbg_array(dbg_object(t_state).m_buttons,t_j)[dbg_index]){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<219>";
				if(!dbg_array(this.m__keyDown,t_key)[dbg_index]){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<220>";
					dbg_array(this.m__keyDown,t_key)[dbg_index]=true;
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<221>";
					this.p_PutKeyHit(t_key);
				}
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<224>";
				dbg_array(this.m__keyDown,t_key)[dbg_index]=false;
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_EndUpdate=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<231>";
	for(var t_i=0;t_i<this.m__keyHitPut;t_i=t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<232>";
		dbg_array(this.m__keyHit,dbg_array(this.m__keyHitQueue,t_i)[dbg_index])[dbg_index]=0;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<234>";
	this.m__keyHitPut=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<235>";
	this.m__charGet=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<236>";
	this.m__charPut=0;
	pop_err();
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<134>";
	var t_1=t_event;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<135>";
	if(t_1==1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<136>";
		if(!dbg_array(this.m__keyDown,t_data)[dbg_index]){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<137>";
			dbg_array(this.m__keyDown,t_data)[dbg_index]=true;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<138>";
			this.p_PutKeyHit(t_data);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<139>";
			if(t_data==1){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<140>";
				dbg_array(this.m__keyDown,384)[dbg_index]=true;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<141>";
				this.p_PutKeyHit(384);
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<142>";
				if(t_data==384){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<143>";
					dbg_array(this.m__keyDown,1)[dbg_index]=true;
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<144>";
					this.p_PutKeyHit(1);
				}
			}
		}
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<147>";
		if(t_1==2){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<148>";
			if(dbg_array(this.m__keyDown,t_data)[dbg_index]){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<149>";
				dbg_array(this.m__keyDown,t_data)[dbg_index]=false;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<150>";
				if(t_data==1){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<151>";
					dbg_array(this.m__keyDown,384)[dbg_index]=false;
				}else{
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<152>";
					if(t_data==384){
						err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<153>";
						dbg_array(this.m__keyDown,1)[dbg_index]=false;
					}
				}
			}
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<156>";
			if(t_1==3){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<157>";
				if(this.m__charPut<this.m__charQueue.length){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<158>";
					dbg_array(this.m__charQueue,this.m__charPut)[dbg_index]=t_data;
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<159>";
					this.m__charPut+=1;
				}
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<165>";
	var t_2=t_event;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<166>";
	if(t_2==4){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<167>";
		this.p_KeyEvent(1,1+t_data);
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<168>";
		if(t_2==5){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<169>";
			this.p_KeyEvent(2,1+t_data);
			pop_err();
			return;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<171>";
			if(t_2==6){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<175>";
	this.m__mouseX=t_x;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<176>";
	this.m__mouseY=t_y;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<177>";
	this.m__mouseZ=t_z;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<178>";
	dbg_array(this.m__touchX,0)[dbg_index]=t_x;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<179>";
	dbg_array(this.m__touchY,0)[dbg_index]=t_y;
	pop_err();
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<183>";
	var t_3=t_event;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<184>";
	if(t_3==7){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<185>";
		this.p_KeyEvent(1,384+t_data);
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<186>";
		if(t_3==8){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<187>";
			this.p_KeyEvent(2,384+t_data);
			pop_err();
			return;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<189>";
			if(t_3==9){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<193>";
	dbg_array(this.m__touchX,t_data)[dbg_index]=t_x;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<194>";
	dbg_array(this.m__touchY,t_data)[dbg_index]=t_y;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<195>";
	if(t_data==0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<196>";
		this.m__mouseX=t_x;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<197>";
		this.m__mouseY=t_y;
	}
	pop_err();
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<202>";
	var t_4=t_event;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<203>";
	if(t_4==10){
	}else{
		pop_err();
		return;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<207>";
	this.m__accelX=t_x;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<208>";
	this.m__accelY=t_y;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<209>";
	this.m__accelZ=t_z;
	pop_err();
}
c_InputDevice.prototype.p_MouseX=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<69>";
	pop_err();
	return this.m__mouseX;
}
c_InputDevice.prototype.p_MouseY=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<73>";
	pop_err();
	return this.m__mouseY;
}
c_InputDevice.prototype.p_KeyHit=function(t_key){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<52>";
	if(t_key>0 && t_key<512){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<52>";
		pop_err();
		return dbg_array(this.m__keyHit,t_key)[dbg_index];
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<53>";
	pop_err();
	return 0;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/inputdevice.cxs<14>";
	pop_err();
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/input.cxs<22>";
	bb_input_device=t_dev;
	pop_err();
	return 0;
}
var bb_app__devWidth=0;
var bb_app__devHeight=0;
function bb_app_ValidateDeviceWindow(t_notifyApp){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<57>";
	var t_w=bb_app__game.GetDeviceWidth();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<58>";
	var t_h=bb_app__game.GetDeviceHeight();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<59>";
	if(t_w==bb_app__devWidth && t_h==bb_app__devHeight){
		pop_err();
		return;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<60>";
	bb_app__devWidth=t_w;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<61>";
	bb_app__devHeight=t_h;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<62>";
	if(t_notifyApp){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<62>";
		bb_app__app.p_OnResize();
	}
	pop_err();
}
function c_DisplayMode(){
	Object.call(this);
	this.m__width=0;
	this.m__height=0;
}
c_DisplayMode.m_new=function(t_width,t_height){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<192>";
	this.m__width=t_width;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<193>";
	this.m__height=t_height;
	pop_err();
	return this;
}
c_DisplayMode.m_new2=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<189>";
	pop_err();
	return this;
}
function c_Map2(){
	Object.call(this);
	this.m_root=null;
}
c_Map2.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<7>";
	pop_err();
	return this;
}
c_Map2.prototype.p_Compare=function(t_lhs,t_rhs){
}
c_Map2.prototype.p_FindNode=function(t_key){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<157>";
	var t_node=this.m_root;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<159>";
	while((t_node)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<160>";
		var t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<161>";
		if(t_cmp>0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<162>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<163>";
			if(t_cmp<0){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<164>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<166>";
				pop_err();
				return t_node;
			}
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<169>";
	pop_err();
	return t_node;
}
c_Map2.prototype.p_Contains=function(t_key){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<25>";
	var t_=this.p_FindNode(t_key)!=null;
	pop_err();
	return t_;
}
c_Map2.prototype.p_RotateLeft2=function(t_node){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<251>";
	var t_child=dbg_object(t_node).m_right;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<252>";
	dbg_object(t_node).m_right=dbg_object(t_child).m_left;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<253>";
	if((dbg_object(t_child).m_left)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<254>";
		dbg_object(dbg_object(t_child).m_left).m_parent=t_node;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<256>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<257>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<258>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<259>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<261>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<264>";
		this.m_root=t_child;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<266>";
	dbg_object(t_child).m_left=t_node;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<267>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_RotateRight2=function(t_node){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<271>";
	var t_child=dbg_object(t_node).m_left;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<272>";
	dbg_object(t_node).m_left=dbg_object(t_child).m_right;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<273>";
	if((dbg_object(t_child).m_right)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<274>";
		dbg_object(dbg_object(t_child).m_right).m_parent=t_node;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<276>";
	dbg_object(t_child).m_parent=dbg_object(t_node).m_parent;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<277>";
	if((dbg_object(t_node).m_parent)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<278>";
		if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<279>";
			dbg_object(dbg_object(t_node).m_parent).m_right=t_child;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<281>";
			dbg_object(dbg_object(t_node).m_parent).m_left=t_child;
		}
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<284>";
		this.m_root=t_child;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<286>";
	dbg_object(t_child).m_right=t_node;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<287>";
	dbg_object(t_node).m_parent=t_child;
	pop_err();
	return 0;
}
c_Map2.prototype.p_InsertFixup2=function(t_node){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<212>";
	while(((dbg_object(t_node).m_parent)!=null) && dbg_object(dbg_object(t_node).m_parent).m_color==-1 && ((dbg_object(dbg_object(t_node).m_parent).m_parent)!=null)){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<213>";
		if(dbg_object(t_node).m_parent==dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<214>";
			var t_uncle=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_right;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<215>";
			if(((t_uncle)!=null) && dbg_object(t_uncle).m_color==-1){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<216>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<217>";
				dbg_object(t_uncle).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<218>";
				dbg_object(dbg_object(t_uncle).m_parent).m_color=-1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<219>";
				t_node=dbg_object(t_uncle).m_parent;
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<221>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_right){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<222>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<223>";
					this.p_RotateLeft2(t_node);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<225>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<226>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<227>";
				this.p_RotateRight2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<230>";
			var t_uncle2=dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_left;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<231>";
			if(((t_uncle2)!=null) && dbg_object(t_uncle2).m_color==-1){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<232>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<233>";
				dbg_object(t_uncle2).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<234>";
				dbg_object(dbg_object(t_uncle2).m_parent).m_color=-1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<235>";
				t_node=dbg_object(t_uncle2).m_parent;
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<237>";
				if(t_node==dbg_object(dbg_object(t_node).m_parent).m_left){
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<238>";
					t_node=dbg_object(t_node).m_parent;
					err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<239>";
					this.p_RotateRight2(t_node);
				}
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<241>";
				dbg_object(dbg_object(t_node).m_parent).m_color=1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<242>";
				dbg_object(dbg_object(dbg_object(t_node).m_parent).m_parent).m_color=-1;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<243>";
				this.p_RotateLeft2(dbg_object(dbg_object(t_node).m_parent).m_parent);
			}
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<247>";
	dbg_object(this.m_root).m_color=1;
	pop_err();
	return 0;
}
c_Map2.prototype.p_Set=function(t_key,t_value){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<29>";
	var t_node=this.m_root;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<30>";
	var t_parent=null;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<30>";
	var t_cmp=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<32>";
	while((t_node)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<33>";
		t_parent=t_node;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<34>";
		t_cmp=this.p_Compare(t_key,dbg_object(t_node).m_key);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<35>";
		if(t_cmp>0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<36>";
			t_node=dbg_object(t_node).m_right;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<37>";
			if(t_cmp<0){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<38>";
				t_node=dbg_object(t_node).m_left;
			}else{
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<40>";
				dbg_object(t_node).m_value=t_value;
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<41>";
				pop_err();
				return false;
			}
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<45>";
	t_node=c_Node2.m_new.call(new c_Node2,t_key,t_value,-1,t_parent);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<47>";
	if((t_parent)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<48>";
		if(t_cmp>0){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<49>";
			dbg_object(t_parent).m_right=t_node;
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<51>";
			dbg_object(t_parent).m_left=t_node;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<53>";
		this.p_InsertFixup2(t_node);
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<55>";
		this.m_root=t_node;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<57>";
	pop_err();
	return true;
}
c_Map2.prototype.p_Insert=function(t_key,t_value){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<146>";
	var t_=this.p_Set(t_key,t_value);
	pop_err();
	return t_;
}
function c_IntMap2(){
	c_Map2.call(this);
}
c_IntMap2.prototype=extend_class(c_Map2);
c_IntMap2.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<534>";
	c_Map2.m_new.call(this);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<534>";
	pop_err();
	return this;
}
c_IntMap2.prototype.p_Compare=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<537>";
	var t_=t_lhs-t_rhs;
	pop_err();
	return t_;
}
function c_Stack(){
	Object.call(this);
	this.m_data=[];
	this.m_length=0;
}
c_Stack.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_Stack.m_new2=function(t_data){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<13>";
	dbg_object(this).m_data=t_data.slice(0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<14>";
	dbg_object(this).m_length=t_data.length;
	pop_err();
	return this;
}
c_Stack.prototype.p_Push=function(t_value){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<71>";
	if(this.m_length==this.m_data.length){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<72>";
		this.m_data=resize_object_array(this.m_data,this.m_length*2+10);
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<74>";
	dbg_array(this.m_data,this.m_length)[dbg_index]=t_value;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<75>";
	this.m_length+=1;
	pop_err();
}
c_Stack.prototype.p_Push2=function(t_values,t_offset,t_count){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<83>";
	for(var t_i=0;t_i<t_count;t_i=t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<84>";
		this.p_Push(dbg_array(t_values,t_offset+t_i)[dbg_index]);
	}
	pop_err();
}
c_Stack.prototype.p_Push3=function(t_values,t_offset){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<79>";
	this.p_Push2(t_values,t_offset,t_values.length-t_offset);
	pop_err();
}
c_Stack.prototype.p_ToArray=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<18>";
	var t_t=new_object_array(this.m_length);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<19>";
	for(var t_i=0;t_i<this.m_length;t_i=t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<20>";
		dbg_array(t_t,t_i)[dbg_index]=dbg_array(this.m_data,t_i)[dbg_index];
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/stack.cxs<22>";
	pop_err();
	return t_t;
}
function c_Node2(){
	Object.call(this);
	this.m_key=0;
	this.m_right=null;
	this.m_left=null;
	this.m_value=null;
	this.m_color=0;
	this.m_parent=null;
}
c_Node2.m_new=function(t_key,t_value,t_color,t_parent){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<364>";
	dbg_object(this).m_key=t_key;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<365>";
	dbg_object(this).m_value=t_value;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<366>";
	dbg_object(this).m_color=t_color;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<367>";
	dbg_object(this).m_parent=t_parent;
	pop_err();
	return this;
}
c_Node2.m_new2=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/map.cxs<361>";
	pop_err();
	return this;
}
var bb_app__displayModes=[];
var bb_app__desktopMode=null;
function bb_app_DeviceWidth(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<263>";
	pop_err();
	return bb_app__devWidth;
}
function bb_app_DeviceHeight(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<267>";
	pop_err();
	return bb_app__devHeight;
}
function bb_app_EnumDisplayModes(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<33>";
	var t_modes=bb_app__game.GetDisplayModes();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<34>";
	var t_mmap=c_IntMap2.m_new.call(new c_IntMap2);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<35>";
	var t_mstack=c_Stack.m_new.call(new c_Stack);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<36>";
	for(var t_i=0;t_i<t_modes.length;t_i=t_i+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<37>";
		var t_w=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<38>";
		var t_h=dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<39>";
		var t_size=t_w<<16|t_h;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<40>";
		if(t_mmap.p_Contains(t_size)){
		}else{
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<42>";
			var t_mode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).width,dbg_object(dbg_array(t_modes,t_i)[dbg_index]).height);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<43>";
			t_mmap.p_Insert(t_size,t_mode);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<44>";
			t_mstack.p_Push(t_mode);
		}
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<47>";
	bb_app__displayModes=t_mstack.p_ToArray();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<48>";
	var t_mode2=bb_app__game.GetDesktopMode();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<49>";
	if((t_mode2)!=null){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<50>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,dbg_object(t_mode2).width,dbg_object(t_mode2).height);
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<52>";
		bb_app__desktopMode=c_DisplayMode.m_new.call(new c_DisplayMode,bb_app_DeviceWidth(),bb_app_DeviceHeight());
	}
	pop_err();
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<606>";
	dbg_object(bb_graphics_context).m_ix=t_ix;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<607>";
	dbg_object(bb_graphics_context).m_iy=t_iy;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<608>";
	dbg_object(bb_graphics_context).m_jx=t_jx;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<609>";
	dbg_object(bb_graphics_context).m_jy=t_jy;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<610>";
	dbg_object(bb_graphics_context).m_tx=t_tx;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<611>";
	dbg_object(bb_graphics_context).m_ty=t_ty;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<612>";
	dbg_object(bb_graphics_context).m_tformed=((t_ix!=1.0 || t_iy!=0.0 || t_jx!=0.0 || t_jy!=1.0 || t_tx!=0.0 || t_ty!=0.0)?1:0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<613>";
	dbg_object(bb_graphics_context).m_matDirty=1;
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<602>";
	bb_graphics_SetMatrix(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<529>";
	dbg_object(bb_graphics_context).m_color_r=t_r;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<530>";
	dbg_object(bb_graphics_context).m_color_g=t_g;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<531>";
	dbg_object(bb_graphics_context).m_color_b=t_b;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<532>";
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_SetColor2(t_rgb){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<538>";
	dbg_object(bb_graphics_context).m_color_r=(t_rgb>>16&255);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<539>";
	dbg_object(bb_graphics_context).m_color_g=(t_rgb>>8&255);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<540>";
	dbg_object(bb_graphics_context).m_color_b=(t_rgb&255);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<541>";
	bb_graphics_renderDevice.SetColor(dbg_object(bb_graphics_context).m_color_r,dbg_object(bb_graphics_context).m_color_g,dbg_object(bb_graphics_context).m_color_b);
	pop_err();
	return 0;
}
function c_Color(){
	Object.call(this);
	this.m_r=0;
	this.m_g=0;
	this.m_b=0;
}
function bb_graphics_SetColor3(t_col){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<547>";
	dbg_object(bb_graphics_context).m_color_r=(dbg_object(t_col).m_r);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<548>";
	dbg_object(bb_graphics_context).m_color_g=(dbg_object(t_col).m_g);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<549>";
	dbg_object(bb_graphics_context).m_color_b=(dbg_object(t_col).m_b);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<550>";
	bb_graphics_renderDevice.SetColor(dbg_object(bb_graphics_context).m_color_r,dbg_object(bb_graphics_context).m_color_g,dbg_object(bb_graphics_context).m_color_b);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<551>";
	bb_graphics_renderDevice.SetAlpha(dbg_object(bb_graphics_context).m_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<565>";
	dbg_object(bb_graphics_context).m_alpha=t_alpha;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<566>";
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<574>";
	dbg_object(bb_graphics_context).m_blend=t_blend;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<575>";
	bb_graphics_renderDevice.SetBlend(t_blend);
	pop_err();
	return 0;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<583>";
	dbg_object(bb_graphics_context).m_scissor_x=t_x;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<584>";
	dbg_object(bb_graphics_context).m_scissor_y=t_y;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<585>";
	dbg_object(bb_graphics_context).m_scissor_width=t_width;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<586>";
	dbg_object(bb_graphics_context).m_scissor_height=t_height;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<587>";
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	pop_err();
	return 0;
}
function bb_graphics_BeginRender(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<492>";
	bb_graphics_renderDevice=bb_graphics_device;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<493>";
	dbg_object(bb_graphics_context).m_matrixSp=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<494>";
	bb_graphics_SetMatrix(1.0,0.0,0.0,1.0,0.0,0.0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<495>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<496>";
	bb_graphics_SetAlpha(1.0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<497>";
	bb_graphics_SetBlend(0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<498>";
	bb_graphics_SetScissor(0.0,0.0,(bb_app_DeviceWidth()),(bb_app_DeviceHeight()));
	pop_err();
	return 0;
}
function bb_graphics_EndRender(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<502>";
	bb_graphics_renderDevice=null;
	pop_err();
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
function bb_app_EndApp(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<259>";
	error("");
	pop_err();
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<224>";
	bb_app__updateRate=t_hertz;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<225>";
	bb_app__game.SetUpdateRate(t_hertz);
	pop_err();
}
function c_myObject(){
	Object.call(this);
	this.m_mainImage=null;
	this.m_x=.0;
	this.m_y=.0;
	this.m_visible=true;
	this.m_rotation=.0;
	this.m_vx=.0;
	this.m_vy=.0;
	this.m_alpha=1.0;
	this.m_scaleX=.45;
	this.m_scaleY=.45;
}
c_myObject.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<317>";
	pop_err();
	return this;
}
c_myObject.prototype.p_Draw=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<326>";
	if(!this.m_visible){
		pop_err();
		return;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<327>";
	bb_graphics_SetAlpha(this.m_alpha);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<328>";
	bb_graphics_DrawImage2(this.m_mainImage,this.m_x,this.m_y,this.m_rotation,this.m_scaleX,this.m_scaleY,0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<329>";
	bb_graphics_SetAlpha(1.0);
	pop_err();
}
function bb_app_Millisecs(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/app.cxs<233>";
	var t_=bb_app__game.Millisecs();
	pop_err();
	return t_;
}
var bb_random_Seed=0;
function bb_random_Rnd(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/random.cxs<37>";
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/random.cxs<38>";
	var t_=(bb_random_Seed>>8&16777215)/16777216.0;
	pop_err();
	return t_;
}
function bb_random_Rnd2(t_low,t_high){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/random.cxs<46>";
	var t_=bb_random_Rnd3(t_high-t_low)+t_low;
	pop_err();
	return t_;
}
function bb_random_Rnd3(t_range){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/cerberus/random.cxs<42>";
	var t_=bb_random_Rnd()*t_range;
	pop_err();
	return t_;
}
function c_unit(){
	c_myObject.call(this);
}
c_unit.prototype=extend_class(c_myObject);
c_unit.m_new=function(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<333>";
	c_myObject.m_new.call(this);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/cerber_git/parabolo hit/day2.cxs<333>";
	pop_err();
	return this;
}
var bb_day2_winPoint=0;
function bb_input_MouseX(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/input.cxs<58>";
	var t_=bb_input_device.p_MouseX();
	pop_err();
	return t_;
}
function bb_input_MouseY(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/input.cxs<62>";
	var t_=bb_input_device.p_MouseY();
	pop_err();
	return t_;
}
function bb_input_MouseHit(t_button){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/input.cxs<74>";
	var t_=bb_input_device.p_KeyHit(1+t_button);
	pop_err();
	return t_;
}
var bb_day2_lifeCount=0;
function bb_graphics_DebugRenderDevice(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<57>";
	if(!((bb_graphics_renderDevice)!=null)){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<57>";
		error("Rendering operations can only be performed inside OnRender");
	}
	pop_err();
	return 0;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<672>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<674>";
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_Cls2(t_col){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<680>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<682>";
	bb_graphics_renderDevice.Cls((dbg_object(t_col).m_r),(dbg_object(t_col).m_g),(dbg_object(t_col).m_b));
	pop_err();
	return 0;
}
function bb_graphics_Cls3(t_rgb){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<688>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<690>";
	var t_r=t_rgb>>16&255;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<691>";
	var t_g=t_rgb>>8&255;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<692>";
	var t_b=t_rgb&255;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<693>";
	bb_graphics_renderDevice.Cls((t_r),(t_g),(t_b));
	pop_err();
	return 0;
}
function bb_graphics_DrawImageRect(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_frame){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<874>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<875>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<875>";
		error("Invalid image frame");
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<876>";
	if(t_srcX<0 || t_srcY<0 || t_srcX+t_srcWidth>dbg_object(t_image).m_width || t_srcY+t_srcHeight>dbg_object(t_image).m_height){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<876>";
		error("Invalid image rectangle");
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<879>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<881>";
	bb_graphics_context.p_Validate();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<883>";
	bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,-dbg_object(t_image).m_tx+t_x,-dbg_object(t_image).m_ty+t_y,t_srcX+dbg_object(t_f).m_x,t_srcY+dbg_object(t_f).m_y,t_srcWidth,t_srcHeight);
	pop_err();
	return 0;
}
function bb_graphics_PushMatrix(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<627>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<628>";
	if(t_sp==dbg_object(bb_graphics_context).m_matrixStack.length){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<628>";
		dbg_object(bb_graphics_context).m_matrixStack=resize_number_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp*2);
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<629>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index]=dbg_object(bb_graphics_context).m_ix;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<630>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index]=dbg_object(bb_graphics_context).m_iy;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<631>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index]=dbg_object(bb_graphics_context).m_jx;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<632>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index]=dbg_object(bb_graphics_context).m_jy;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<633>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index]=dbg_object(bb_graphics_context).m_tx;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<634>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]=dbg_object(bb_graphics_context).m_ty;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<635>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp+6;
	pop_err();
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<649>";
	var t_ix2=t_ix*dbg_object(bb_graphics_context).m_ix+t_iy*dbg_object(bb_graphics_context).m_jx;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<650>";
	var t_iy2=t_ix*dbg_object(bb_graphics_context).m_iy+t_iy*dbg_object(bb_graphics_context).m_jy;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<651>";
	var t_jx2=t_jx*dbg_object(bb_graphics_context).m_ix+t_jy*dbg_object(bb_graphics_context).m_jx;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<652>";
	var t_jy2=t_jx*dbg_object(bb_graphics_context).m_iy+t_jy*dbg_object(bb_graphics_context).m_jy;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<653>";
	var t_tx2=t_tx*dbg_object(bb_graphics_context).m_ix+t_ty*dbg_object(bb_graphics_context).m_jx+dbg_object(bb_graphics_context).m_tx;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<654>";
	var t_ty2=t_tx*dbg_object(bb_graphics_context).m_iy+t_ty*dbg_object(bb_graphics_context).m_jy+dbg_object(bb_graphics_context).m_ty;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<655>";
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	pop_err();
	return 0;
}
function bb_graphics_Transform2(t_m){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<645>";
	bb_graphics_Transform(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<659>";
	bb_graphics_Transform(1.0,0.0,0.0,1.0,t_x,t_y);
	pop_err();
	return 0;
}
function bb_graphics_Rotate(t_angle){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<667>";
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<663>";
	bb_graphics_Transform(t_x,0.0,0.0,t_y,0.0,0.0);
	pop_err();
	return 0;
}
function bb_graphics_PopMatrix(){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<639>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp-6;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<640>";
	bb_graphics_SetMatrix(dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<641>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp;
	pop_err();
	return 0;
}
function bb_graphics_DrawImageRect2(t_image,t_x,t_y,t_srcX,t_srcY,t_srcWidth,t_srcHeight,t_rotation,t_scaleX,t_scaleY,t_frame){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<889>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<890>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<890>";
		error("Invalid image frame");
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<891>";
	if(t_srcX<0 || t_srcY<0 || t_srcX+t_srcWidth>dbg_object(t_image).m_width || t_srcY+t_srcHeight>dbg_object(t_image).m_height){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<891>";
		error("Invalid image rectangle");
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<894>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<896>";
	bb_graphics_PushMatrix();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<898>";
	bb_graphics_Translate(t_x,t_y);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<899>";
	bb_graphics_Rotate(t_rotation);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<900>";
	bb_graphics_Scale(t_scaleX,t_scaleY);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<901>";
	bb_graphics_Translate(-dbg_object(t_image).m_tx,-dbg_object(t_image).m_ty);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<903>";
	bb_graphics_context.p_Validate();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<905>";
	bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,0.0,0.0,t_srcX+dbg_object(t_f).m_x,t_srcY+dbg_object(t_f).m_y,t_srcWidth,t_srcHeight);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<907>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function bb_graphics_DrawText(t_text,t_x,t_y,t_xhandle,t_yhandle){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<951>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<953>";
	var t_char=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<954>";
	var t_tmpChar=null;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<955>";
	if(!((dbg_object(bb_graphics_context).m_font)!=null)){
		pop_err();
		return;
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<957>";
	t_x=(((t_x)-dbg_object(bb_graphics_context).m_font.p_TextWidth(t_text)*t_xhandle)|0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<958>";
	t_y=(((t_y)-dbg_object(bb_graphics_context).m_font.p_TextHeight(t_text)*t_yhandle)|0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<960>";
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<960>";
	var t_=t_text;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<960>";
	var t_2=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<960>";
	while(t_2<t_.length){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<960>";
		t_char=dbg_charCodeAt(t_,t_2);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<960>";
		t_2=t_2+1;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<961>";
		var t_tmpChar2=dbg_object(dbg_object(bb_graphics_context).m_font).m__charMap.p_Get(t_char);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<962>";
		if(!((t_tmpChar2)!=null)){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<962>";
			continue;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<963>";
		bb_graphics_DrawImageRect(dbg_array(dbg_object(dbg_object(bb_graphics_context).m_font).m__pages,dbg_object(t_tmpChar2).m_page)[dbg_index],(t_x+dbg_object(t_tmpChar2).m_xoff),(t_y+dbg_object(t_tmpChar2).m_yoff),dbg_object(t_tmpChar2).m_x,dbg_object(t_tmpChar2).m_y,dbg_object(t_tmpChar2).m_width,dbg_object(t_tmpChar2).m_height,0);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<964>";
		t_x+=dbg_object(t_tmpChar2).m_advance;
	}
	pop_err();
}
function bb_graphics_DrawText2(t_textLines,t_x,t_y,t_xhandle,t_yhandle){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<970>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<972>";
	var t_char=0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<973>";
	var t_tmpChar=null;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<974>";
	var t_currX=.0;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<975>";
	var t_text="";
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<977>";
	var t_linesCount=t_textLines.length;
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<979>";
	t_y=(((t_y)-dbg_object(bb_graphics_context).m_font.p_TextHeight("")*t_yhandle*(t_linesCount))|0);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<980>";
	t_currX=(t_x);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<982>";
	for(var t__y=1;t__y<=t_linesCount;t__y=t__y+1){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<983>";
		t_text=dbg_array(t_textLines,t__y-1)[dbg_index];
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<984>";
		t_x=(((t_x)-dbg_object(bb_graphics_context).m_font.p_TextWidth(t_text)*t_xhandle)|0);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<985>";
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<985>";
		var t_=t_text;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<985>";
		var t_2=0;
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<985>";
		while(t_2<t_.length){
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<985>";
			t_char=dbg_charCodeAt(t_,t_2);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<985>";
			t_2=t_2+1;
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<986>";
			var t_tmpChar2=dbg_object(dbg_object(bb_graphics_context).m_font).m__charMap.p_Get(t_char);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<987>";
			if(!((t_tmpChar2)!=null)){
				err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<987>";
				continue;
			}
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<988>";
			bb_graphics_DrawImageRect(dbg_array(dbg_object(dbg_object(bb_graphics_context).m_font).m__pages,dbg_object(t_tmpChar2).m_page)[dbg_index],(t_x+dbg_object(t_tmpChar2).m_xoff),(t_y+dbg_object(t_tmpChar2).m_yoff),dbg_object(t_tmpChar2).m_x,dbg_object(t_tmpChar2).m_y,dbg_object(t_tmpChar2).m_width,dbg_object(t_tmpChar2).m_height,0);
			err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<989>";
			t_x+=dbg_object(t_tmpChar2).m_advance;
		}
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<991>";
		t_y=(((t_y)+dbg_object(bb_graphics_context).m_font.p_TextHeight(t_text))|0);
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<992>";
		t_x=((t_currX)|0);
	}
	pop_err();
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<765>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<766>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<766>";
		error("Invalid image frame");
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<769>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<771>";
	bb_graphics_context.p_Validate();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<773>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<774>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty);
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<776>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	pop_err();
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	push_err();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<783>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<784>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<784>";
		error("Invalid image frame");
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<787>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<789>";
	bb_graphics_PushMatrix();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<791>";
	bb_graphics_Translate(t_x,t_y);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<792>";
	bb_graphics_Rotate(t_rotation);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<793>";
	bb_graphics_Scale(t_scaleX,t_scaleY);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<795>";
	bb_graphics_Translate(-dbg_object(t_image).m_tx,-dbg_object(t_image).m_ty);
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<797>";
	bb_graphics_context.p_Validate();
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<799>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<800>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,0.0,0.0);
	}else{
		err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<802>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,0.0,0.0,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	err_info="C:/Users/USER/Desktop/Computer-Science/Programming_Langage/cerberus-v2019-05-05/Cerberus/modules/mojo/graphics.cxs<805>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_app__devWidth=0;
	bb_app__devHeight=0;
	bb_app__displayModes=[];
	bb_app__desktopMode=null;
	bb_graphics_renderDevice=null;
	bb_app__updateRate=0;
	bb_random_Seed=1234;
	bb_day2_winPoint=0;
	bb_day2_lifeCount=5;
}
//${TRANSCODE_END}
