//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=false;

//Start us up!
//
window.onload=function( e ){

	if( RESIZEABLE_CANVAS ){
		window.onresize=function( e ){
			var canvas=document.getElementById( "GameCanvas" );

			//This vs window.innerWidth, which apparently doesn't account for scrollbar?
			var width=document.body.clientWidth;
			
			//This vs document.body.clientHeight, which does weird things - document seems to 'grow'...perhaps canvas resize pushing page down?
			var height=window.innerHeight;			

			canvas.width=width;
			canvas.height=height;
		}
		window.onresize( null );
	}
	
	var canvas=document.getElementById( "GameCanvas" );

	GameMain( canvas );
}

//${METADATA_BEGIN}
var META_DATA="[background.png];type=image/png;width=128;height=128;\n[boss.mp3];type=audio/mpeg;\n[box.png];type=image/png;width=48;height=48;\n[clouds.png];type=image/png;width=256;height=256;\n[enemies.png];type=image/png;width=128;height=128;\n[enemy-bee.png];type=image/png;width=384;height=320;\n[enemy-boss1.png];type=image/png;width=640;height=512;\n[explosion.mp3];type=audio/mpeg;\n[explosion.png];type=image/png;width=256;height=256;\n[fader.png];type=image/png;width=256;height=256;\n[font.png];type=image/png;width=512;height=512;\n[fontsmall.png];type=image/png;width=512;height=512;\n[foreground.png];type=image/png;width=256;height=256;\n[intro.mp3];type=audio/mpeg;\n[lives.png];type=image/png;width=32;height=32;\n[mojo_font.png];type=image/png;width=448;height=52;\n[music.mp3];type=audio/mpeg;\n[paradox.mp3];type=audio/mpeg;\n[player.png];type=image/png;width=384;height=512;\n[powerup.mp3];type=audio/mpeg;\n[powerup.png];type=image/png;width=32;height=32;\n[projectile.png];type=image/png;width=128;height=128;\n[shoot.mp3];type=audio/mpeg;\n[sky.png];type=image/png;width=2560;height=960;\n";

//${METADATA_END}
function getMetaData( path,key ){	
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

function loadString( path ){
	if( path=="" ) return "";
//${TEXTFILES_BEGIN}
		return "";

//${TEXTFILES_END}
}

//This is generally redefined by mojo.
//
function GameMain( canvas ){
	bb_Init();
	bb_Main();
}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var err_info="";
var err_stack=[];

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	var str="";
	push_err();
	err_stack.reverse();
	for( var i=0;i<err_stack.length;++i ){
		str+=err_stack[i]+"\n";
	}
	err_stack.reverse();
	pop_err();
	return str;
}

function print( str ){
	if( window.console!=undefined ){
		window.console.log( str );
	}
}

function error( err ){
	throw err;
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_array( arr,index ){
	if( index>=0 && index<arr.length ) return arr;
	error( "Array index out of range" );
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
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=false;
   return res;
}

function resize_number_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=0;
   return res;
}

function resize_string_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]='';
   return res;
}

function resize_array_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=[];
   return res;
}

function resize_object_array( arr,len ){
   var res=Array( len );
   var n=Math.min( arr.length,len );
   for( var i=0;i<n;++i ) res[i]=arr[i];
   for( var j=n;j<len;++j ) res[j]=null;
   return res;
}

function string_join( sep,bits ){
	if( bits.length==0 ) return '';
	var str=bits[0];
	for( var i=1;i<bits.length;++i ) str+=sep+bits[i];
	return str;
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_starts_with( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_ends_with( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}



// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

var dead=0;

var KEY_LMB=1;
var KEY_RMB=2;
var KEY_MMB=3;
var KEY_TOUCH0=0x180;

function die( ex ){
	dead=1;
	alert( ex+"\n"+stackTrace() );
	throw ex;
}

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
	case 8:
	case 9:
	case 13:
	case 27:
	case 32:
		return key;
	case 33:
	case 34:
	case 35:
	case 36:
	case 37:
	case 38:
	case 39:
	case 40:
	case 45:
		return key | 0x10000;
	case 46:
		return 127;
	}
	return 0;
}

function GameMain( canvas ){

	_app=null;
	_canvas=canvas;

	try{
		bb_Init();
		bb_Main();
	}catch( ex ){
		die( ex );
	}
	
	if( !_app ) return;
	
	var theApp=_app;

	_app=null;
	_canvas=null;
	
	canvas.onkeydown=function( e ){
		theApp.input.OnKeyDown( e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) theApp.input.PutChar( chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<124) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		theApp.input.OnKeyUp( e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			theApp.input.PutChar( e.charCode );
		}else if( e.which ){
			theApp.input.PutChar( e.which );
		}
	}
	
	canvas.onmousedown=function( e ){
		theApp.input.OnKeyDown( KEY_LMB );
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		theApp.input.OnKeyUp( KEY_LMB );
		eatEvent( e );
	}
	
	canvas.onmouseout=function( e ){
		theApp.input.OnKeyUp( KEY_LMB );
		eatEvent( e );
	}

	canvas.onmousemove=function( e ){
		var x=e.clientX+document.body.scrollLeft;
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		theApp.input.OnMouseMove( x,y );
		eatEvent( e );
	}
/*
	canvas.onfocus=function( e ){
		theApp.InvokeOnResume();
	}
	
	canvas.onblur=function( e ){
		theApp.InvokeOnSuspend();
	}
*/		
	canvas.focus();

	theApp.InvokeOnCreate();
	theApp.InvokeOnRender();
}

//***** gxtkApp class *****

function gxtkApp(){

	_app=this;
	
	this.graphics=new gxtkGraphics( this,_canvas );
	this.input=new gxtkInput( this );
	this.audio=new gxtkAudio( this );

	this.loading=0;
	this.maxloading=0;

	this.updateRate=0;
	this.intervalObj=this.SetUpdateTimer( 100.0 );
	
	this.startMillis=(new Date).getTime();
	
	this.suspended=false;
}

gxtkApp.prototype.SetUpdateTimer=function( millis ){
	var theApp=this;
	function timerFired(){ 
		theApp.UpdateTimerFired(); 
	}
	return setInterval( timerFired,millis );
}

gxtkApp.prototype.UpdateTimerFired=function(){
	this.InvokeOnUpdate();
	this.InvokeOnRender();
}

gxtkApp.prototype.IncLoading=function(){

	++this.loading;

	if( this.loading>this.maxloading ) this.maxloading=this.loading;

	if( this.loading!=1 ) return;

	if( this.updateRate ){
		clearInterval( this.intervalObj );
		this.intervalObj=this.SetUpdateTimer( 100.0 );
	}
}

gxtkApp.prototype.DecLoading=function(){

	--this.loading;

	if( this.loading!=0 ) return;

	this.maxloading=0;

	if( this.updateRate ){
		clearInterval( this.intervalObj );
		this.intervalObj=this.SetUpdateTimer( 1000.0/this.updateRate );
	}
}

gxtkApp.prototype.GetMetaData=function( path,key ){
	return getMetaData( path,key );
}

gxtkApp.prototype.InvokeOnCreate=function(){
	if( dead ) return;
	
	try{
		this.OnCreate();
	}catch( ex ){
		die( ex );
	}
}

gxtkApp.prototype.InvokeOnUpdate=function(){
	if( dead || this.suspended ) return;
	
	try{
		this.input.BeginUpdate();
		if( this.updateRate && !this.loading ){
			this.OnUpdate();
		}
		this.input.EndUpdate();
	}catch( ex ){
		die( ex );
	}
}

gxtkApp.prototype.InvokeOnSuspend=function(){
	if( dead || this.suspended ) return;
	
	try{
		this.suspended=true;
		this.OnSuspend();
	}catch( ex ){
		die( ex );
	}
}

gxtkApp.prototype.InvokeOnResume=function(){
	if( dead || !this.suspended ) return;
	
	try{
		this.OnResume();
		this.suspended=false;
	}catch( ex ){
		die( ex );
	}
}

gxtkApp.prototype.InvokeOnRender=function(){
	if( dead || this.suspended ) return;
	
	try{
		this.graphics.BeginRender();
		if( this.loading ){
			this.OnLoading();
		}else{
			this.OnRender();
		}
		this.graphics.EndRender();
	}catch( ex ){
		die( ex );
	}
}

//***** GXTK API *****

gxtkApp.prototype.GraphicsDevice=function(){
	return this.graphics;
}

gxtkApp.prototype.InputDevice=function(){
	return this.input;
}

gxtkApp.prototype.AudioDevice=function(){
	return this.audio;
}

gxtkApp.prototype.AppTitle=function(){
	return document.URL;
}

gxtkApp.prototype.LoadState=function(){
	var state=localStorage.getItem( "gxtkapp@"+document.URL );
	if( state ) return state;
	return "";
}

gxtkApp.prototype.SaveState=function( state ){
	localStorage.setItem( "gxtkapp@"+document.URL,state );
}

gxtkApp.prototype.LoadString=function( path ){
	return loadString( path );
}

gxtkApp.prototype.SetUpdateRate=function( hertz ){

	this.updateRate=hertz;

	if( this.loading ) return;

	clearInterval( this.intervalObj );

	if( this.updateRate ){
		this.intervalObj=this.SetUpdateTimer( 1000.0/this.updateRate );
	}else{
		this.intervalObj=this.SetUpdateTimer( 100.0 );
	}
}

gxtkApp.prototype.MilliSecs=function(){
	return ((new Date).getTime()-this.startMillis)|0;
}

gxtkApp.prototype.Loading=function(){
	return this.loading;
}

gxtkApp.prototype.OnCreate=function(){
}

gxtkApp.prototype.OnUpdate=function(){
}

gxtkApp.prototype.OnSuspend=function(){
}

gxtkApp.prototype.OnResume=function(){
}

gxtkApp.prototype.OnRender=function(){
}

gxtkApp.prototype.OnLoading=function(){
}

//***** gxtkGraphics class *****

function gxtkGraphics( app,canvas ){
	this.app=app;
	this.canvas=canvas;
	this.gc=canvas.getContext( '2d' );
	this.color="rgb(255,255,255)"
	this.alpha=1.0;
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
	this.gc.save();
}

gxtkGraphics.prototype.EndRender=function(){
	this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.canvas.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.canvas.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var surface=new gxtkSurface( this );
	surface.Load( path );
	return surface;
}

gxtkGraphics.prototype.DestroySurface=function( surface ){
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
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
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width && h!=this.canvas.height);
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

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;			//Safari Kludge!
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
  	this.gc.beginPath();
  	this.gc.moveTo( x1,y1 );
  	this.gc.lineTo( x2,y2 );
  	this.gc.stroke();
  	this.gc.closePath();
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;			//Safari Kludge!
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

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( surface.loaded ) this.gc.drawImage( surface.image,x,y );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;	//Safari Kludge!
	//
	if( surface.loaded ) this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
}

//***** gxtkSurface class *****

function gxtkSurface( graphics ){
	this.graphics=graphics;
	this.swidth=0;
	this.sheight=0;
	this.image=null;
	this.loaded=0;
}

gxtkSurface.prototype.Load=function( path ){

	var ty=this.graphics.app.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return;

	this.swidth=parseInt( this.graphics.app.GetMetaData( path,"width" ) );
	this.sheight=parseInt( this.graphics.app.GetMetaData( path,"height" ) );

	this.image=new Image();
	
	var surface=this;
	this.image.onload=function(){
		//executes in scope of HTML Image
		surface.loaded=1;
		surface.graphics.app.DecLoading();
	};

	this.graphics.app.IncLoading();

	this.image.src="data/"+path;
}

//***** GXTK API *****

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.loaded;
}

//***** Class gxtkInput *****

function gxtkInput( app ){
	this.app=app;
	this.keyStates=new Array( 512 );
	this.charQueue=new Array( 32 );
	this.charPut=0;
	this.charGet=0;
	this.mouseX=0;
	this.mouseY=0;
	this.joyX=0;
	this.joyY=0;
	this.joyZ=0;
	this.accelX=0;
	this.accelY=0;
	this.accelZ=0;
	for( var i=0;i<512;++i ){
		this.keyStates[i]=0;
	}
}

gxtkInput.prototype.BeginUpdate=function(){
}

gxtkInput.prototype.EndUpdate=function(){
	for( var i=0;i<512;++i ){
		this.keyStates[i]&=0x100;
	}
	this.charGet=0;
	this.charPut=0;
}

gxtkInput.prototype.OnKeyDown=function( key ){
	if( (this.keyStates[key]&0x100)==0 ){
		this.keyStates[key]|=0x100;
		++this.keyStates[key];	
	}
}

gxtkInput.prototype.OnKeyUp=function( key ){
	this.keyStates[key]&=0xff;
}

gxtkInput.prototype.PutChar=function( char ){
	if( this.charPut-this.charGet<32 ){
		this.charQueue[this.charPut & 31]=char;
		this.charPut+=1;
	}
}

gxtkInput.prototype.OnMouseMove=function( x,y ){
	this.mouseX=x;
	this.mouseY=y;
}

//***** GXTK API *****

gxtkInput.prototype.KeyDown=function( key ){
	if( key>0 && key<512 ){
		if( key==KEY_TOUCH0 ) key=KEY_LMB;
		return this.keyStates[key] >> 8;
	}
	return 0;
}

gxtkInput.prototype.KeyHit=function( key ){
	if( key>0 && key<512 ){
		if( key==KEY_TOUCH0 ) key=KEY_LMB;
		return this.keyStates[key] & 0xff;
	}
	return 0;
}

gxtkInput.prototype.GetChar=function(){
	if( this.charPut!=this.charGet ){
		var char=this.charQueue[this.charGet & 31];
		this.charGet+=1;
		return char;
	}
	return 0;
}

gxtkInput.prototype.MouseX=function(){
	return this.mouseX;
}

gxtkInput.prototype.MouseY=function(){
	return this.mouseY;
}

gxtkInput.prototype.JoyX=function( index ){
	return this.joyX;
}

gxtkInput.prototype.JoyY=function( index ){
	return this.joyY;
}

gxtkInput.prototype.JoyZ=function( index ){
	return this.joyZ;
}

gxtkInput.prototype.TouchX=function( index ){
	return this.mouseX;
}

gxtkInput.prototype.TouchY=function( index ){
	return this.mouseY;
}

gxtkInput.prototype.AccelX=function(){
	return 0;
}

gxtkInput.prototype.AccelY=function(){
	return 0;
}

gxtkInput.prototype.AccelZ=function(){
	return 0;
}


//***** gxtkChannel class *****
function gxtkChannel(){
	this.audio=null;
	this.sample=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
}

//***** gxtkAudio class *****
function gxtkAudio( app ){
	this.app=app;
	this.okay=typeof(Audio)!="undefined";
	this.nextchan=0;
	this.channels=new Array(32);
	for( var i=0;i<32;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.LoadSample=function( path ){
	if( !this.okay ) return new gxtkSample( null );
	
	var audio=new Audio( "data/"+path );
	return new gxtkSample( audio );
}

gxtkAudio.prototype.DestroySample=function( sample ){
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;
	
	var chan=this.channels[channel];
	
	if( chan.sample==sample && chan.audio ){	//&& !chan.audio.paused ){
		chan.audio.loop=(flags&1)!=0;
		chan.audio.volume=chan.volume;
		try{
			chan.audio.currentTime=0;
		}catch(ex){
		}
		chan.audio.play();
		return;
	}

	if( chan.audio ) chan.audio.pause();
	
	var audio=sample.AllocAudio();
	
	if( audio ){
		for( var i=0;i<32;++i ){
			if( this.channels[i].audio==audio ){
				this.channels[i].audio=null;
				break;
			}
		}
		audio.loop=(flags&1)!=0;
		audio.volume=chan.volume;
		audio.play();
	}
	
	chan.audio=audio;
	chan.sample=sample;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	if( chan.audio ) chan.audio.pause();
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.audio && !chan.audio.paused && !chan.audio.ended ) return 1;
	return 0;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.audio ) chan.audio.volume=volume;
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

//***** gxtkSample class *****

function gxtkSample( audio ){
	this.audio=audio;
	this.insts=new Array( 8 );
}

gxtkSample.prototype.AllocAudio=function(){
	for( var i=0;i<8;++i ){
		var audio=this.insts[i];
		if( audio ){
			//Ok, this is ugly but seems to work best...no idea how/why!
			if( audio.paused ){
				if( audio.currentTime==0 ) return audio;
				audio.currentTime=0;
			}else if( audio.ended ){
				audio.pause();
			}
		}else{
			audio=new Audio( this.audio.src );
			this.insts[i]=audio;
			return audio;
		}
	}
	return null;
}
function bb_app_App(){
	Object.call(this);
}
function bb_app_App_new(){
	bb_app_device=bb_app_AppDevice_new.call(new bb_app_AppDevice,this);
	return this;
}
bb_app_App.prototype.bbOnCreate=function(){
	return 0;
}
bb_app_App.prototype.bbOnUpdate=function(){
	return 0;
}
bb_app_App.prototype.bbOnSuspend=function(){
	return 0;
}
bb_app_App.prototype.bbOnResume=function(){
	return 0;
}
bb_app_App.prototype.bbOnRender=function(){
	return 0;
}
bb_app_App.prototype.bbOnLoading=function(){
	return 0;
}
function bb_witchblaster_WitchBlaster(){
	bb_app_App.call(this);
	this.bbImgWitch=null;
	this.bbImgSky=null;
	this.bbImgForeground=null;
	this.bbImgBackground=null;
	this.bbImgCloud=null;
	this.bbImgProjectile=null;
	this.bbImgEnemy=null;
	this.bbImgEnemyBee=null;
	this.bbImgEnemyBossBee=null;
	this.bbImgExplosion=null;
	this.bbImgPowerup=null;
	this.bbImgLives=null;
	this.bbImgFader=null;
	this.bbImgBox=null;
	this.bbSndIntro=null;
	this.bbSndMusic=null;
	this.bbSndBoss=null;
	this.bbSndPowerup=null;
	this.bbSndExplosion=null;
	this.bbSndShoot=null;
	this.bbSndParadox=null;
	this.bbFont=null;
	this.bbFontSmall=null;
	this.bbNumOfClouds=10;
	this.bbClouds=bb_list_List_new.call(new bb_list_List);
	this.bbUpdateRate=60;
	this.bbChannelMusic=1;
	this.bbGameState=0;
	this.bbLevelTimer=0;
	this.bbPause=0;
	this.bbCurrentLevel=0;
	this.bbCurrentLives=0;
	this.bbCurrentScore=0;
	this.bbGameObjects=bb_list_List_new.call(new bb_list_List);
	this.bbGhosts=bb_list_List_new.call(new bb_list_List);
	this.bbSpawners=bb_list_List_new.call(new bb_list_List);
	this.bbOldMouseX=0;
	this.bbOldMouseY=0;
	this.bbChannelExplosion=2;
	this.bbEnemyTimer=120;
	this.bbLevelState=0;
	this.bbLevelFader=0;
	this.bbGhostPhase=0;
	this.bbChannelShoot=3;
	this.bbChannelParadox=4;
	this.bbGhostTimer=0;
	this.bbChannelPowerup=5;
	this.bbPosForeground=0;
	this.bbPosBackground=0;
}
bb_witchblaster_WitchBlaster.prototype=extend_class(bb_app_App);
function bb_witchblaster_WitchBlaster_new(){
	bb_app_App_new.call(this);
	return this;
}
bb_witchblaster_WitchBlaster.prototype.bbOnCreate=function(){
	this.bbImgWitch=bb_graphics_LoadImage2("player.png",128,128,12,1);
	this.bbImgSky=bb_graphics_LoadImage2("sky.png",640,480,8,bb_graphics_Image_DefaultFlags);
	this.bbImgForeground=bb_graphics_LoadImage2("foreground.png",128,128,4,bb_graphics_Image_DefaultFlags);
	this.bbImgBackground=bb_graphics_LoadImage("background.png",1,bb_graphics_Image_DefaultFlags);
	this.bbImgCloud=bb_graphics_LoadImage2("clouds.png",128,128,4,1);
	this.bbImgProjectile=bb_graphics_LoadImage2("projectile.png",64,64,4,1);
	this.bbImgEnemy=bb_graphics_LoadImage2("enemies.png",32,32,16,1);
	this.bbImgEnemyBee=bb_graphics_LoadImage2("enemy-bee.png",64,64,30,1);
	this.bbImgEnemyBossBee=bb_graphics_LoadImage2("enemy-boss1.png",128,128,20,1);
	this.bbImgExplosion=bb_graphics_LoadImage2("explosion.png",64,64,16,1);
	this.bbImgPowerup=bb_graphics_LoadImage("powerup.png",1,1);
	this.bbImgLives=bb_graphics_LoadImage("lives.png",1,bb_graphics_Image_DefaultFlags);
	this.bbImgFader=bb_graphics_LoadImage("fader.png",1,1);
	this.bbImgBox=bb_graphics_LoadImage("box.png",1,bb_graphics_Image_DefaultFlags);
	this.bbSndIntro=bb_audio_LoadSound("intro.mp3");
	this.bbSndMusic=bb_audio_LoadSound("music.mp3");
	this.bbSndBoss=bb_audio_LoadSound("boss.mp3");
	this.bbSndPowerup=bb_audio_LoadSound("powerup.mp3");
	this.bbSndExplosion=bb_audio_LoadSound("explosion.mp3");
	this.bbSndShoot=bb_audio_LoadSound("shoot.mp3");
	this.bbSndParadox=bb_audio_LoadSound("paradox.mp3");
	this.bbFont=bb_font_TFont_new.call(new bb_font_TFont,"font.png",32);
	this.bbFontSmall=bb_font_TFont_new.call(new bb_font_TFont,"fontsmall.png",16);
	for(var bba=0;bba<this.bbNumOfClouds-1;bba=bba+1){
		var bbcloud=bb_witchblaster_Cloud_new.call(new bb_witchblaster_Cloud);
		bbcloud.bbX=((bb_random_Rnd()*640.000000)|0);
		bbcloud.bbReset();
		this.bbClouds.bbAddLast(bbcloud);
	}
	bb_random_Seed=(((bb_app_Millisecs())+bb_input_MouseX()+bb_input_MouseY())|0);
	bb_app_SetUpdateRate(this.bbUpdateRate);
	return 0;
}
bb_witchblaster_WitchBlaster.prototype.bbTestSpace=function(){
	if(((bb_input_KeyHit(32))!=0) || ((bb_input_KeyHit(90))!=0)){
		return 1;
	}
	if((bb_input_TouchHit(0))!=0){
		return 1;
	}
	return 0;
}
bb_witchblaster_WitchBlaster.prototype.bbNewLevel=function(){
	this.bbGameObjects.bbClear();
	this.bbGhosts.bbClear();
	this.bbSpawners.bbClear();
	bb_cgameobject_GameObject_new.call(new bb_cgameobject_GameObject,0,0,0,0,0);
	this.bbEnemyTimer=300;
	this.bbLevelTimer=0;
	this.bbLevelState=0;
	this.bbLevelFader=30;
	this.bbGhostPhase=0;
	if((bb_input_KeyHit(32))!=0){
	}
	if((bb_input_KeyHit(27))!=0){
	}
	return 0;
}
bb_witchblaster_WitchBlaster.prototype.bbOnUpdate=function(){
	if(bb_audio_ChannelState(this.bbChannelMusic)==0){
		if(this.bbGameState!=1){
			bb_audio_PlaySound(this.bbSndIntro,this.bbChannelMusic,0);
		}else{
			if(this.bbLevelTimer>3600){
				bb_audio_PlaySound(this.bbSndBoss,this.bbChannelMusic,0);
			}else{
				bb_audio_PlaySound(this.bbSndMusic,this.bbChannelMusic,0);
			}
		}
	}
	if((bb_input_KeyHit(19))!=0){
		this.bbPause=this.bbPause+1;
		if(this.bbPause>1){
			this.bbPause=0;
		}
	}
	if(this.bbPause==1){
		return 0;
	}
	var bb=this.bbGameState;
	if(bb==0){
		if((this.bbTestSpace())!=0){
			this.bbGameState=1;
			this.bbCurrentLevel=0;
			this.bbCurrentLives=3;
			this.bbCurrentScore=0;
			this.bbNewLevel();
			bb_audio_StopChannel(this.bbChannelMusic);
		}
	}else{
		if(bb==3){
			if((this.bbTestSpace())!=0){
				this.bbGameState=0;
			}
		}else{
			if(bb==4){
				if((this.bbTestSpace())!=0){
					this.bbGameState=0;
				}
			}
		}
	}
	var bbspeedmultiplyer=1;
	if(this.bbLevelState==1){
		bbspeedmultiplyer=2;
	}
	if(this.bbGameState==0){
		bbspeedmultiplyer=3;
	}
	var bb2=this.bbClouds.bbObjectEnumerator();
	while(bb2.bbHasNext()){
		var bbcloud=object_downcast((bb2.bbNextObject()),bb_witchblaster_Cloud);
		bbcloud.bbX=bbcloud.bbX-8*bbspeedmultiplyer;
		if(bbcloud.bbX<-128){
			bbcloud.bbReset();
		}
	}
	if(this.bbGameState!=1){
		return 0;
	}
	if((bb_input_KeyHit(27))!=0){
		this.bbLevelState=3;
	}
	if((bb_input_KeyHit(49))!=0){
		this.bbLevelTimer=3600;
	}
	if((bb_input_KeyHit(50))!=0){
		this.bbLevelState=2;
	}
	var bbWitch=bb_cgameobject_GameObject_GetWitch();
	if(bbWitch==null){
		this.bbCurrentLives=this.bbCurrentLives-1;
		if(this.bbCurrentLives==0){
			this.bbLevelState=3;
		}
		bb_cgameobject_GameObject_new.call(new bb_cgameobject_GameObject,0,0,0,0,0);
	}
	this.bbLevelTimer=this.bbLevelTimer+1;
	if(this.bbLevelTimer>3600){
		if(this.bbLevelState==0){
			this.bbLevelState=1;
			bb_audio_StopChannel(this.bbChannelMusic);
			bb_cgameobject_GameObject_new.call(new bb_cgameobject_GameObject,5,0,0,this.bbCurrentLevel,0);
			if(bbWitch!=null){
				bbWitch.bbMood=6;
				bbWitch.bbMoodTime=150;
			}
		}
	}
	this.bbEnemyTimer=this.bbEnemyTimer-1;
	if(this.bbEnemyTimer<0 && this.bbLevelState==0){
		this.bbEnemyTimer=(5-this.bbCurrentLevel)*60;
		var bbspawner=bb_cspawner_Spawner_new.call(new bb_cspawner_Spawner);
		this.bbSpawners.bbAddLast(bbspawner);
	}
	var bb3=this.bbGameObjects.bbObjectEnumerator();
	while(bb3.bbHasNext()){
		var bbgameobject=object_downcast((bb3.bbNextObject()),bb_cgameobject_GameObject);
		bbgameobject.bbHandle();
	}
	var bbOut=bb_list_List_new.call(new bb_list_List);
	var bb4=this.bbGameObjects.bbObjectEnumerator();
	while(bb4.bbHasNext()){
		var bbgameobject2=object_downcast((bb4.bbNextObject()),bb_cgameobject_GameObject);
		if(bbgameobject2.bbKill==0){
			bbOut.bbAddLast(bbgameobject2);
		}else{
			if(bbgameobject2.bbSpawner!=null){
				bbgameobject2.bbSpawner.bbTotalCount=bbgameobject2.bbSpawner.bbTotalCount-1;
			}
		}
	}
	this.bbGameObjects=bbOut;
	var bbSpawnOut=bb_list_List_new.call(new bb_list_List);
	var bb5=this.bbSpawners.bbObjectEnumerator();
	while(bb5.bbHasNext()){
		var bbspawner2=object_downcast((bb5.bbNextObject()),bb_cspawner_Spawner);
		bbspawner2.bbHandle();
		if(bbspawner2.bbTotalCount>0){
			bbSpawnOut.bbAddLast(bbspawner2);
		}
	}
	this.bbSpawners=bbSpawnOut;
	this.bbPosForeground=this.bbPosForeground-4*bbspeedmultiplyer;
	this.bbPosBackground=this.bbPosBackground-2*bbspeedmultiplyer;
	if(this.bbPosForeground<-128){
		this.bbPosForeground=this.bbPosForeground+128;
	}
	if(this.bbPosBackground<-128){
		this.bbPosBackground=this.bbPosBackground+128;
	}
	if(this.bbLevelFader<0){
		this.bbLevelFader=0;
	}
	if(this.bbLevelState==0){
		this.bbLevelFader=this.bbLevelFader-1;
	}else{
		if(this.bbLevelState>1){
			this.bbLevelFader=this.bbLevelFader+1;
			if(this.bbLevelFader>30){
				bb_audio_StopChannel(this.bbChannelMusic);
				if(this.bbLevelState==2){
					this.bbNewLevel();
					this.bbCurrentLevel=this.bbCurrentLevel+1;
					this.bbCurrentLives=this.bbCurrentLives+1;
					if(this.bbCurrentLevel>3){
						this.bbGameState=4;
					}
				}else{
					this.bbGameState=this.bbLevelState;
				}
			}
		}
	}
	return 0;
}
bb_witchblaster_WitchBlaster.prototype.bbDrawClouds=function(){
	bb_graphics_SetBlend(1);
	var bb=this.bbClouds.bbObjectEnumerator();
	while(bb.bbHasNext()){
		var bbcloud=object_downcast((bb.bbNextObject()),bb_witchblaster_Cloud);
		bb_graphics_DrawImage2(this.bbImgCloud,(bbcloud.bbX),(bbcloud.bbY),0.000000,1.000000,1.000000,bbcloud.bbFrame);
	}
	bb_graphics_SetBlend(0);
	return 0;
}
bb_witchblaster_WitchBlaster.prototype.bbOnRender=function(){
	var bb=this.bbGameState;
	if(bb==0){
		bb_graphics_DrawImage2(this.bbImgSky,0.000000,0.000000,0.000000,1.000000,1.000000,1);
		this.bbFont.bbDraw(320,16,"WitchBlaster",1);
		var bbanimframe=0;
		if(bb_app_Millisecs() % 500<250){
			bbanimframe=1;
		}
		bb_graphics_DrawImage2(this.bbImgWitch,320.000000,240.000000,0.000000,1.000000,1.000000,bbanimframe);
		var bbfaceframe=4;
		if(bb_app_Millisecs() % 2000<1800){
			bbfaceframe=3;
		}
		bb_graphics_DrawImage2(this.bbImgWitch,320.000000,240.000000,0.000000,1.000000,1.000000,bbfaceframe);
		this.bbFontSmall.bbDraw(16,400,"Erik Hogan.",0);
		this.bbFontSmall.bbDraw(16,416,"Anthony Lau.",0);
		this.bbFontSmall.bbDraw(16,432,"Damian and Josh from Thinkt.",0);
		this.bbFontSmall.bbDraw(16,448,"Stephen Knightly.",0);
		this.bbFontSmall.bbDraw(16,464,"Click or Press Z to Play.",0);
		this.bbDrawClouds();
	}else{
		if(bb==3){
			bb_graphics_DrawImage2(this.bbImgSky,0.000000,0.000000,0.000000,1.000000,1.000000,2);
			this.bbFont.bbDraw(320,16,"Game Over",1);
			this.bbFont.bbDraw(320,432,"Final score: "+String(this.bbCurrentScore),1);
			bb_graphics_DrawImage2(this.bbImgWitch,320.000000,240.000000,0.000000,1.000000,1.000000,2);
		}else{
			if(bb==4){
				bb_graphics_DrawImage2(this.bbImgSky,0.000000,0.000000,0.000000,1.000000,1.000000,3);
				this.bbFont.bbDraw(320,16,"Congratulations, you win!",1);
				this.bbFont.bbDraw(320,432,"Final score: "+String(this.bbCurrentScore),1);
				bb_graphics_DrawImage2(this.bbImgWitch,320.000000,240.000000,0.000000,1.000000,1.000000,0);
				bb_graphics_DrawImage2(this.bbImgWitch,320.000000,240.000000,0.000000,1.000000,1.000000,5);
			}
		}
	}
	if(this.bbGameState!=1){
		return 0;
	}
	var bbenemyrotate=-90;
	if(this.bbCurrentLevel==3){
		bbenemyrotate=0;
	}
	bb_graphics_DrawImage(this.bbImgSky,0.000000,0.000000,this.bbCurrentLevel+4);
	for(var bba=0;bba<6;bba=bba+1){
		bb_graphics_DrawImage(this.bbImgBackground,(bba*128+this.bbPosBackground),352.000000,0);
	}
	for(var bbb=0;bbb<6;bbb=bbb+1){
		bb_graphics_DrawImage2(this.bbImgForeground,(bbb*128+this.bbPosForeground),352.000000,0.000000,1.000000,1.000000,this.bbCurrentLevel);
	}
	for(var bbc=0;bbc<this.bbCurrentLives;bbc=bbc+1){
		bb_graphics_DrawImage(this.bbImgLives,(608-32*bbc),0.000000,0);
	}
	this.bbFontSmall.bbDraw(624,32,String(this.bbCurrentScore),2);
	bb_graphics_SetAlpha(.5);
	for(var bba2=0;bba2<=2;bba2=bba2+1){
		bb_graphics_DrawImage(this.bbImgBox,0.000000,(336+bba2*48),0);
	}
	bb_graphics_SetAlpha(1.000000);
	bb_graphics_SetBlend(1);
	this.bbFontSmall.bbDraw(4,340,"Z",0);
	this.bbFontSmall.bbDraw(4,388,"X",0);
	bb_graphics_DrawImage2(this.bbImgProjectile,28.000000,368.000000,90.000000,1.000000,1.000000,0);
	bb_graphics_DrawImage2(this.bbImgProjectile,28.000000,352.000000,90.000000,1.000000,1.000000,0);
	bb_graphics_DrawImage2(this.bbImgEnemy,24.000000,408.000000,(bbenemyrotate),1.000000,1.000000,this.bbCurrentLevel*4);
	if(this.bbGhostPhase==0){
		bb_graphics_DrawImage(this.bbImgLives,8.000000,440.000000,0);
		this.bbFontSmall.bbDraw(4,436,"C",0);
	}
	var bb2=this.bbGameObjects.bbObjectEnumerator();
	while(bb2.bbHasNext()){
		var bbgameobject=object_downcast((bb2.bbNextObject()),bb_cgameobject_GameObject);
		if(((bbgameobject.bbVisible)!=0) && bbgameobject.bbType!=0){
			if(bbgameobject.bbType==2 && bbgameobject.bbSubType==0 || bbgameobject.bbType==5 && bbgameobject.bbSubType==0){
				bbgameobject.bbDraw(1);
			}else{
				var bbRotationAmount=0.000000;
				if(bbgameobject.bbNoRotate==0){
					bbRotationAmount=bbgameobject.bbRotation;
				}
				bb_graphics_SetBlend(bbgameobject.bbAdditive);
				bb_graphics_DrawImage2(bbgameobject.bbSprite,((bbgameobject.bbX)|0),((bbgameobject.bbY)|0),-bbRotationAmount,bbgameobject.bbXScale,bbgameobject.bbYScale,bbgameobject.bbFrame);
			}
		}
	}
	var bbghost=object_downcast((this.bbGhosts.bbFirst()),bb_tghost_TGhost);
	if(bbghost!=null){
		bb_graphics_SetBlend(1);
		bb_graphics_DrawImage(bbghost.bbSprite,bbghost.bbX,bbghost.bbY,11);
		bb_graphics_SetBlend(0);
	}
	var bbWitch=bb_cgameobject_GameObject_GetWitch();
	if(bbWitch!=null){
		if(bbWitch.bbTimer>60 || bbWitch.bbTimer % 10>5){
			var bbenemyframe=0;
			if(bbWitch.bbTimer % 40>=10){
				bbenemyframe=1;
			}
			if(bbWitch.bbTimer % 40>=20){
				bbenemyframe=2;
			}
			if(bbWitch.bbTimer % 40>=30){
				bbenemyframe=3;
			}
			bb_graphics_SetBlend(0);
			bb_graphics_SetAlpha(1.000000);
			bb_graphics_SetAlpha((60-bbWitch.bbTransform)/60.0);
			if(bbWitch.bbHealth>0){
				bb_graphics_DrawImage2(this.bbImgWitch,((bbWitch.bbX)|0),((bbWitch.bbY)|0),0.000000,1.000000,1.000000,bbWitch.bbFrame);
				if(bbWitch.bbFrame<7){
					var bbMoodFrame=0;
					if(bbWitch.bbMoodTime>0){
						bbMoodFrame=bbWitch.bbMood;
					}else{
						if(bbWitch.bbTimer % 100>90){
							bbMoodFrame=1;
						}
					}
					bb_graphics_DrawImage2(this.bbImgWitch,((bbWitch.bbX)|0),((bbWitch.bbY)|0),0.000000,1.000000,1.000000,bbMoodFrame+3);
				}
			}else{
				bb_graphics_DrawImage2(this.bbImgWitch,((bbWitch.bbX)|0),((bbWitch.bbY)|0),0.000000,1.000000,1.000000,2);
			}
			bb_graphics_SetAlpha(1.000000-(60-bbWitch.bbTransform)/60.0);
			if(this.bbCurrentLevel==0){
				bbWitch.bbType=5;
				bbWitch.bbDraw(-1);
				bbWitch.bbType=0;
			}else{
				bb_graphics_DrawImage2(this.bbImgEnemy,((bbWitch.bbX)|0),((bbWitch.bbY)|0),(bbenemyrotate),4.000000,4.000000,this.bbCurrentLevel*4+bbenemyframe);
			}
			bb_graphics_SetAlpha(1.000000);
		}
	}
	this.bbDrawClouds();
	if(this.bbLevelFader>1){
		var bbScaleImage=((this.bbLevelFader/2)|0);
		bb_graphics_DrawImage2(this.bbImgFader,320.000000,240.000000,0.000000,bbScaleImage,bbScaleImage,0);
	}
	return 0;
}
function bb_app_AppDevice(){
	gxtkApp.call(this);
	this.bbapp=null;
}
bb_app_AppDevice.prototype=extend_class(gxtkApp);
function bb_app_AppDevice_new(bbapp){
	this.bbapp=bbapp;
	bb_graphics_SetGraphicsContext(bb_graphics_GraphicsContext_new.call(new bb_graphics_GraphicsContext,this.GraphicsDevice()));
	bb_input_SetInputDevice(this.InputDevice());
	bb_audio_SetAudioDevice(this.AudioDevice());
	return this;
}
function bb_app_AppDevice_new2(){
	return this;
}
bb_app_AppDevice.prototype.OnCreate=function(){
	return this.bbapp.bbOnCreate();
}
bb_app_AppDevice.prototype.OnUpdate=function(){
	return this.bbapp.bbOnUpdate();
}
bb_app_AppDevice.prototype.OnSuspend=function(){
	return this.bbapp.bbOnSuspend();
}
bb_app_AppDevice.prototype.OnResume=function(){
	return this.bbapp.bbOnResume();
}
bb_app_AppDevice.prototype.OnRender=function(){
	bb_graphics_BeginRender();
	var bbr=this.bbapp.bbOnRender();
	bb_graphics_EndRender();
	return bbr;
}
bb_app_AppDevice.prototype.OnLoading=function(){
	bb_graphics_BeginRender();
	var bbr=this.bbapp.bbOnLoading();
	bb_graphics_EndRender();
	return bbr;
}
function bb_graphics_GraphicsContext(){
	Object.call(this);
	this.bbdevice=null;
	this.bbmatrixSp=0;
	this.bbix=1.000000;
	this.bbiy=0;
	this.bbjx=0;
	this.bbjy=1.000000;
	this.bbtx=0;
	this.bbty=0;
	this.bbtformed=0;
	this.bbmatDirty=0;
	this.bbcolor_r=0;
	this.bbcolor_g=0;
	this.bbcolor_b=0;
	this.bbalpha=0;
	this.bbblend=0;
	this.bbscissor_x=0;
	this.bbscissor_y=0;
	this.bbscissor_width=0;
	this.bbscissor_height=0;
	this.bbmatrixStack=new_number_array(192);
}
function bb_graphics_GraphicsContext_new(bbdevice){
	this.bbdevice=bbdevice;
	return this;
}
function bb_graphics_GraphicsContext_new2(){
	return this;
}
var bb_graphics_context;
function bb_graphics_SetGraphicsContext(bbgc){
	bb_graphics_context=bbgc;
	return 0;
}
var bb_input_device;
function bb_input_SetInputDevice(bbdev){
	bb_input_device=bbdev;
	return 0;
}
var bb_audio_device;
function bb_audio_SetAudioDevice(bbdev){
	bb_audio_device=bbdev;
	return 0;
}
var bb_app_device;
var bb_witchblaster_gameapp;
function bb_Main(){
	bb_witchblaster_gameapp=bb_witchblaster_WitchBlaster_new.call(new bb_witchblaster_WitchBlaster);
	return 0;
}
function bb_graphics_SetMatrix(bbix,bbiy,bbjx,bbjy,bbtx,bbty){
	bb_graphics_context.bbix=bbix;
	bb_graphics_context.bbiy=bbiy;
	bb_graphics_context.bbjx=bbjx;
	bb_graphics_context.bbjy=bbjy;
	bb_graphics_context.bbtx=bbtx;
	bb_graphics_context.bbty=bbty;
	bb_graphics_context.bbtformed=((bbix!=1.000000 || bbiy!=0.000000 || bbjx!=0.000000 || bbjy!=1.000000 || bbtx!=0.000000 || bbty!=0.000000)?1:0);
	bb_graphics_context.bbmatDirty=1;
	return 0;
}
function bb_graphics_SetMatrix2(bbm){
	bb_graphics_SetMatrix(bbm[0],bbm[1],bbm[2],bbm[3],bbm[4],bbm[5]);
	return 0;
}
function bb_graphics_SetColor(bbr,bbg,bbb){
	bb_graphics_context.bbcolor_r=bbr;
	bb_graphics_context.bbcolor_g=bbg;
	bb_graphics_context.bbcolor_b=bbb;
	bb_graphics_context.bbdevice.SetColor(bbr,bbg,bbb);
	return 0;
}
function bb_graphics_SetAlpha(bbalpha){
	bb_graphics_context.bbalpha=bbalpha;
	bb_graphics_context.bbdevice.SetAlpha(bbalpha);
	return 0;
}
function bb_graphics_SetBlend(bbblend){
	bb_graphics_context.bbblend=bbblend;
	bb_graphics_context.bbdevice.SetBlend(bbblend);
	return 0;
}
function bb_graphics_DeviceWidth(){
	return bb_graphics_context.bbdevice.Width();
}
function bb_graphics_DeviceHeight(){
	return bb_graphics_context.bbdevice.Height();
}
function bb_graphics_SetScissor(bbx,bby,bbwidth,bbheight){
	bb_graphics_context.bbscissor_x=bbx;
	bb_graphics_context.bbscissor_y=bby;
	bb_graphics_context.bbscissor_width=bbwidth;
	bb_graphics_context.bbscissor_height=bbheight;
	bb_graphics_context.bbdevice.SetScissor(((bbx)|0),((bby)|0),((bbwidth)|0),((bbheight)|0));
	return 0;
}
function bb_graphics_BeginRender(){
	bb_graphics_context.bbmatrixSp=0;
	bb_graphics_SetMatrix(1.000000,0.000000,0.000000,1.000000,0.000000,0.000000);
	bb_graphics_SetColor(255.000000,255.000000,255.000000);
	bb_graphics_SetAlpha(1.000000);
	bb_graphics_SetBlend(0);
	bb_graphics_SetScissor(0.000000,0.000000,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	return 0;
}
function bb_graphics_EndRender(){
	return 0;
}
function bb_resource_Resource(){
	Object.call(this);
	this.bbnode=null;
	this.bbrefs=1;
}
function bb_resource_Resource_new(){
	return this;
}
bb_resource_Resource.prototype.bbRegister=function(bbtype){
	var bblist=object_downcast((bb_resource_resources.bbValueForKey(bb_boxes_StringObject_new3.call(new bb_boxes_StringObject,bbtype))),bb_list_List);
	if(!((bblist)!=null)){
		bblist=bb_list_List_new.call(new bb_list_List);
		bb_resource_resources.bbInsert((bb_boxes_StringObject_new3.call(new bb_boxes_StringObject,bbtype)),bblist);
	}
	this.bbnode=bblist.bbAddLast(this);
	return 0;
}
bb_resource_Resource.prototype.bbRetain=function(){
	this.bbrefs+=1;
	return 0;
}
function bb_graphics_Image(){
	bb_resource_Resource.call(this);
	this.bbsurface=null;
	this.bbwidth=0;
	this.bbheight=0;
	this.bbflags=0;
	this.bbframes=[];
	this.bbtx=0;
	this.bbty=0;
	this.bbsource=null;
}
bb_graphics_Image.prototype=extend_class(bb_resource_Resource);
var bb_graphics_Image_DefaultFlags;
bb_graphics_Image.prototype.bbSetHandle=function(bbtx,bbty){
	this.bbtx=bbtx;
	this.bbty=bbty;
	this.bbflags=this.bbflags&-2;
	return 0;
}
function bb_graphics_Image_new(bbpath,bbnframes,bbiflags){
	bb_resource_Resource_new.call(this);
	this.bbsurface=bb_graphics_context.bbdevice.LoadSurface(bbpath);
	if(!((this.bbsurface)!=null)){
		error("Failed to load image "+bbpath);
	}
	this.bbRegister("mojo.graphics.Image");
	this.bbwidth=((this.bbsurface.Width()/bbnframes)|0);
	this.bbheight=this.bbsurface.Height();
	this.bbflags=bbiflags;
	this.bbframes=new_object_array(bbnframes);
	for(var bbi=0;bbi<bbnframes;bbi=bbi+1){
		this.bbframes[bbi]=bb_graphics_Frame_new.call(new bb_graphics_Frame,bbi*this.bbwidth,0);
	}
	if(bbnframes==1){
		this.bbflags|=65536;
	}
	if((this.bbflags&1)!=0){
		this.bbSetHandle((this.bbwidth)/2.0,(this.bbheight)/2.0);
	}
	return this;
}
function bb_graphics_Image_new2(bbx,bby,bbiwidth,bbiheight,bbnframes,bbiflags,bbsource){
	bb_resource_Resource_new.call(this);
	this.bbRegister("mojo.graphics.Image");
	bbsource.bbRetain();
	this.bbsource=bbsource;
	this.bbsurface=bbsource.bbsurface;
	this.bbwidth=bbiwidth;
	this.bbheight=bbiheight;
	this.bbflags=bbiflags;
	this.bbframes=new_object_array(bbnframes);
	var bbix=bbx+bbsource.bbframes[0].bbx;
	var bbiy=bby+bbsource.bbframes[0].bby;
	for(var bbi=0;bbi<bbnframes;bbi=bbi+1){
		if(bbix+this.bbwidth>bbsource.bbwidth){
			bbix=bbsource.bbframes[0].bbx;
			bbiy+=this.bbheight;
		}
		this.bbframes[bbi]=bb_graphics_Frame_new.call(new bb_graphics_Frame,bbix,bbiy);
		bbix+=this.bbwidth;
	}
	if(bbnframes==1 && bbx==0 && bby==0 && this.bbwidth==this.bbsurface.Width() && this.bbheight==this.bbsurface.Height()){
		this.bbflags|=65536;
	}
	if((this.bbflags&1)!=0){
		this.bbSetHandle((this.bbwidth)/2.0,(this.bbheight)/2.0);
	}
	return this;
}
function bb_graphics_Image_new3(){
	bb_resource_Resource_new.call(this);
	return this;
}
bb_graphics_Image.prototype.bbGrabImage=function(bbx,bby,bbwidth,bbheight,bbframes,bbflags){
	if(this.bbframes.length!=1){
		return null;
	}
	return bb_graphics_Image_new2.call(new bb_graphics_Image,bbx,bby,bbwidth,bbheight,bbframes,bbflags,this);
}
bb_graphics_Image.prototype.bbWidth=function(){
	return this.bbwidth;
}
function bb_list_List(){
	Object.call(this);
	this.bb_head=bb_list_Node_new.call(new bb_list_Node);
}
function bb_list_List_new(){
	return this;
}
bb_list_List.prototype.bbAddLast=function(bbdata){
	return bb_list_Node_new2.call(new bb_list_Node,this.bb_head,this.bb_head.bb_pred,bbdata);
}
bb_list_List.prototype.bbClear=function(){
	this.bb_head=bb_list_Node_new.call(new bb_list_Node);
	return 0;
}
bb_list_List.prototype.bbObjectEnumerator=function(){
	return bb_list_Enumerator_new.call(new bb_list_Enumerator,this);
}
bb_list_List.prototype.bbLast=function(){
	return this.bb_head.bb_pred.bb_data;
}
bb_list_List.prototype.bbFirst=function(){
	return this.bb_head.bb_succ.bb_data;
}
bb_list_List.prototype.bbRemoveFirst=function(){
	var bbdata=this.bb_head.bb_succ.bb_data;
	this.bb_head.bb_succ.bbRemove();
	return bbdata;
}
function bb_boxes_StringObject(){
	Object.call(this);
	this.bbvalue="";
}
function bb_boxes_StringObject_new(bbvalue){
	this.bbvalue=String(bbvalue);
	return this;
}
function bb_boxes_StringObject_new2(bbvalue){
	this.bbvalue=String(bbvalue);
	return this;
}
function bb_boxes_StringObject_new3(bbvalue){
	this.bbvalue=bbvalue;
	return this;
}
function bb_boxes_StringObject_new4(){
	return this;
}
function bb_map_Map(){
	Object.call(this);
	this.bbroot=null;
}
function bb_map_Map_new(){
	return this;
}
bb_map_Map.prototype.bbCompare=function(bblhs,bbrhs){
	return 0;
}
bb_map_Map.prototype.bbFindNode=function(bbkey){
	var bbnode=this.bbroot;
	while((bbnode)!=null){
		var bbcmp=this.bbCompare((bbkey),(bbnode.bbkey));
		if(bbcmp>0){
			bbnode=bbnode.bbright;
		}else{
			if(bbcmp<0){
				bbnode=bbnode.bbleft;
			}else{
				return bbnode;
			}
		}
	}
	return bbnode;
}
bb_map_Map.prototype.bbGet=function(bbkey){
	var bbnode=this.bbFindNode(bbkey);
	if((bbnode)!=null){
		return bbnode.bbvalue;
	}
	return null;
}
bb_map_Map.prototype.bbValueForKey=function(bbkey){
	return this.bbGet(bbkey);
}
bb_map_Map.prototype.bbRotateLeft=function(bbnode){
	var bbchild=bbnode.bbright;
	bbnode.bbright=bbchild.bbleft;
	if((bbchild.bbleft)!=null){
		bbchild.bbleft.bbparent=bbnode;
	}
	bbchild.bbparent=bbnode.bbparent;
	if((bbnode.bbparent)!=null){
		if(bbnode==bbnode.bbparent.bbleft){
			bbnode.bbparent.bbleft=bbchild;
		}else{
			bbnode.bbparent.bbright=bbchild;
		}
	}else{
		this.bbroot=bbchild;
	}
	bbchild.bbleft=bbnode;
	bbnode.bbparent=bbchild;
	return 0;
}
bb_map_Map.prototype.bbRotateRight=function(bbnode){
	var bbchild=bbnode.bbleft;
	bbnode.bbleft=bbchild.bbright;
	if((bbchild.bbright)!=null){
		bbchild.bbright.bbparent=bbnode;
	}
	bbchild.bbparent=bbnode.bbparent;
	if((bbnode.bbparent)!=null){
		if(bbnode==bbnode.bbparent.bbright){
			bbnode.bbparent.bbright=bbchild;
		}else{
			bbnode.bbparent.bbleft=bbchild;
		}
	}else{
		this.bbroot=bbchild;
	}
	bbchild.bbright=bbnode;
	bbnode.bbparent=bbchild;
	return 0;
}
bb_map_Map.prototype.bbInsertFixup=function(bbnode){
	while(((bbnode.bbparent)!=null) && bbnode.bbparent.bbcolor==-1 && ((bbnode.bbparent.bbparent)!=null)){
		if(bbnode.bbparent==bbnode.bbparent.bbparent.bbleft){
			var bbuncle=bbnode.bbparent.bbparent.bbright;
			if(((bbuncle)!=null) && bbuncle.bbcolor==-1){
				bbnode.bbparent.bbcolor=1;
				bbuncle.bbcolor=1;
				bbuncle.bbparent.bbcolor=-1;
				bbnode=bbuncle.bbparent;
			}else{
				if(bbnode==bbnode.bbparent.bbright){
					bbnode=bbnode.bbparent;
					this.bbRotateLeft(bbnode);
				}
				bbnode.bbparent.bbcolor=1;
				bbnode.bbparent.bbparent.bbcolor=-1;
				this.bbRotateRight(bbnode.bbparent.bbparent);
			}
		}else{
			var bbuncle2=bbnode.bbparent.bbparent.bbleft;
			if(((bbuncle2)!=null) && bbuncle2.bbcolor==-1){
				bbnode.bbparent.bbcolor=1;
				bbuncle2.bbcolor=1;
				bbuncle2.bbparent.bbcolor=-1;
				bbnode=bbuncle2.bbparent;
			}else{
				if(bbnode==bbnode.bbparent.bbleft){
					bbnode=bbnode.bbparent;
					this.bbRotateRight(bbnode);
				}
				bbnode.bbparent.bbcolor=1;
				bbnode.bbparent.bbparent.bbcolor=-1;
				this.bbRotateLeft(bbnode.bbparent.bbparent);
			}
		}
	}
	this.bbroot.bbcolor=1;
	return 0;
}
bb_map_Map.prototype.bbSet=function(bbkey,bbvalue){
	var bbnode=this.bbroot;
	var bbparent=null;
	var bbcmp=0;
	while((bbnode)!=null){
		bbparent=bbnode;
		bbcmp=this.bbCompare((bbkey),(bbnode.bbkey));
		if(bbcmp>0){
			bbnode=bbnode.bbright;
		}else{
			if(bbcmp<0){
				bbnode=bbnode.bbleft;
			}else{
				bbnode.bbvalue=bbvalue;
				return 0;
			}
		}
	}
	bbnode=bb_map_Node_new.call(new bb_map_Node,bbkey,bbvalue,-1,bbparent);
	if(!((bbparent)!=null)){
		this.bbroot=bbnode;
		return 0;
	}
	if(bbcmp>0){
		bbparent.bbright=bbnode;
	}else{
		bbparent.bbleft=bbnode;
	}
	this.bbInsertFixup(bbnode);
	return 0;
}
bb_map_Map.prototype.bbInsert=function(bbkey,bbvalue){
	return this.bbSet(bbkey,bbvalue);
}
function bb_map_StringMap(){
	bb_map_Map.call(this);
}
bb_map_StringMap.prototype=extend_class(bb_map_Map);
function bb_map_StringMap_new(){
	bb_map_Map_new.call(this);
	return this;
}
bb_map_StringMap.prototype.bbCompare=function(bblhs,bbrhs){
	var bbl=object_downcast((bblhs),bb_boxes_StringObject).bbvalue;
	var bbr=object_downcast((bbrhs),bb_boxes_StringObject).bbvalue;
	if(bbl<bbr){
		return -1;
	}
	return ((bbl>bbr)?1:0);
}
var bb_resource_resources;
function bb_map_Node(){
	Object.call(this);
	this.bbkey=null;
	this.bbright=null;
	this.bbleft=null;
	this.bbvalue=null;
	this.bbcolor=0;
	this.bbparent=null;
}
function bb_map_Node_new(bbkey,bbvalue,bbcolor,bbparent){
	this.bbkey=bbkey;
	this.bbvalue=bbvalue;
	this.bbcolor=bbcolor;
	this.bbparent=bbparent;
	return this;
}
function bb_map_Node_new2(){
	return this;
}
function bb_list_Node(){
	Object.call(this);
	this.bb_succ=null;
	this.bb_pred=null;
	this.bb_data=null;
}
function bb_list_Node_new(){
	this.bb_succ=this;
	this.bb_pred=this;
	return this;
}
function bb_list_Node_new2(bbsucc,bbpred,bbdata){
	this.bb_succ=bbsucc;
	this.bb_pred=bbpred;
	this.bb_succ.bb_pred=this;
	this.bb_pred.bb_succ=this;
	this.bb_data=bbdata;
	return this;
}
bb_list_Node.prototype.bbRemove=function(){
	this.bb_succ.bb_pred=this.bb_pred;
	this.bb_pred.bb_succ=this.bb_succ;
	return 0;
}
function bb_graphics_Frame(){
	Object.call(this);
	this.bbx=0;
	this.bby=0;
}
function bb_graphics_Frame_new(bbx,bby){
	this.bbx=bbx;
	this.bby=bby;
	return this;
}
function bb_graphics_Frame_new2(){
	return this;
}
function bb_graphics_LoadImage(bbpath,bbframeCount,bbflags){
	return bb_graphics_Image_new.call(new bb_graphics_Image,bbpath,bbframeCount,bbflags);
}
function bb_graphics_LoadImage2(bbpath,bbframeWidth,bbframeHeight,bbframeCount,bbflags){
	var bbatlas=bb_graphics_Image_new.call(new bb_graphics_Image,bbpath,1,0);
	if((bbatlas)!=null){
		return bbatlas.bbGrabImage(0,0,bbframeWidth,bbframeHeight,bbframeCount,bbflags);
	}
	return null;
}
function bb_audio_Sound(){
	bb_resource_Resource.call(this);
	this.bbsample=null;
}
bb_audio_Sound.prototype=extend_class(bb_resource_Resource);
function bb_audio_Sound_new(bbsample){
	bb_resource_Resource_new.call(this);
	this.bbsample=bbsample;
	if((bbsample)!=null){
		this.bbRegister("mojo.audio.Sound");
	}
	return this;
}
function bb_audio_Sound_new2(){
	bb_resource_Resource_new.call(this);
	return this;
}
function bb_audio_LoadSound(bbpath){
	var bbsample=bb_audio_device.LoadSample(bbpath);
	return bb_audio_Sound_new.call(new bb_audio_Sound,bbsample);
}
function bb_font_TFont(){
	Object.call(this);
	this.bbFontImage=null;
	this.bbWidth=0;
}
function bb_font_TFont_new(bbPath,bbSize){
	this.bbFontImage=bb_graphics_LoadImage2(bbPath,bbSize,bbSize,256,bb_graphics_Image_DefaultFlags);
	this.bbWidth=(((this.bbFontImage.bbWidth())*.75)|0);
	return this;
}
function bb_font_TFont_new2(){
	return this;
}
bb_font_TFont.prototype.bbDraw=function(bbX,bbY,bbText,bbAlignment){
	var bbTotalWidth=this.bbWidth*bbText.length;
	bbX=(((bbX)-(bbTotalWidth*bbAlignment)*0.5)|0);
	for(var bbi=0;bbi<bbText.length;bbi=bbi+1){
		var bbchar=bbText.charCodeAt(bbi);
		if(bbchar>32 && bbchar<288){
			bb_graphics_DrawImage(this.bbFontImage,(bbX+this.bbWidth*bbi),(bbY),bbchar-33);
		}
	}
	return 0;
}
function bb_witchblaster_Cloud(){
	Object.call(this);
	this.bbX=0;
	this.bbY=0;
	this.bbFrame=0;
}
function bb_witchblaster_Cloud_new(){
	return this;
}
bb_witchblaster_Cloud.prototype.bbReset=function(){
	this.bbX=((640.000000+bb_random_Rnd()*640.000000)|0);
	this.bbY=((48.000000+bb_random_Rnd()*384.000000)|0);
	this.bbFrame=((bb_random_Rnd()*4.000000)|0);
	return 0;
}
var bb_random_Seed;
function bb_random_Rnd(){
	bb_random_Seed=bb_random_Seed*1664525+1013904223|0;
	return (((bb_random_Seed/4)|0)&1073741823)/1073741824.0000;
}
function bb_random_Rnd2(bblow,bbhigh){
	return bb_random_Rnd3(bbhigh-bblow)+bblow;
}
function bb_random_Rnd3(bbrange){
	return bb_random_Rnd()*bbrange;
}
function bb_app_Millisecs(){
	return bb_app_device.MilliSecs();
}
function bb_input_MouseX(){
	return bb_input_device.MouseX();
}
function bb_input_MouseY(){
	return bb_input_device.MouseY();
}
function bb_app_SetUpdateRate(bbhertz){
	return bb_app_device.SetUpdateRate(bbhertz);
}
function bb_audio_ChannelState(bbchannel){
	return bb_audio_device.ChannelState(bbchannel);
}
function bb_audio_PlaySound(bbsound,bbchannel,bbflags){
	if((bbsound.bbsample)!=null){
		bb_audio_device.PlaySample(bbsound.bbsample,bbchannel,bbflags);
	}
	return 0;
}
function bb_input_KeyHit(bbkey){
	return bb_input_device.KeyHit(bbkey);
}
function bb_input_TouchHit(bbindex){
	return bb_input_device.KeyHit(384+bbindex);
}
function bb_cgameobject_GameObject(){
	Object.call(this);
	this.bbType=0;
	this.bbX=0;
	this.bbY=0;
	this.bbSubType=0;
	this.bbSubType2=0;
	this.bbSprite=null;
	this.bbXTarget=0;
	this.bbYTarget=0;
	this.bbVisible=1;
	this.bbRotation=0;
	this.bbAdditive=0;
	this.bbFrame=0;
	this.bbMoveSpeed=0;
	this.bbNoRotate=0;
	this.bbShootTimer=0;
	this.bbXScale=1.000000;
	this.bbYScale=1.000000;
	this.bbHealth=1;
	this.bbXSpeed=0;
	this.bbYSpeed=0;
	this.bbMood=0;
	this.bbMoodTime=0;
	this.bbTimer=0;
	this.bbTransform=0;
	this.bbKill=0;
	this.bbTurnTimer=0;
	this.bbTurnDirection=1;
	this.bbFrameTimer=0;
	this.bbDieTimer=0;
	this.bbSpawner=null;
}
function bb_cgameobject_GameObject_new(bbType,bbX,bbY,bbSubType,bbSubType2){
	this.bbType=bbType;
	this.bbX=(bbX);
	this.bbY=(bbY);
	this.bbSubType=bbSubType;
	this.bbSubType2=bbSubType2;
	if(this.bbType==0){
		this.bbX=320.000000;
		this.bbY=240.000000;
		this.bbSprite=bb_witchblaster_gameapp.bbImgWitch;
		bb_witchblaster_gameapp.bbOldMouseX=((bb_input_TouchX(0))|0);
		bb_witchblaster_gameapp.bbOldMouseY=((bb_input_TouchY(0))|0);
		this.bbXTarget=320;
		this.bbYTarget=240;
		this.bbVisible=0;
	}
	if(this.bbType==1){
		this.bbSprite=bb_witchblaster_gameapp.bbImgProjectile;
		this.bbRotation=90.000000;
		this.bbAdditive=1;
	}
	if(this.bbType==2){
		this.bbSprite=bb_witchblaster_gameapp.bbImgEnemy;
		this.bbFrame=this.bbSubType*4;
		var bb=this.bbSubType;
		if(bb==0){
			this.bbMoveSpeed=3.000000;
		}else{
			if(bb==1){
				this.bbMoveSpeed=2.000000;
			}else{
				if(bb==2){
					this.bbMoveSpeed=1.000000;
				}else{
					if(bb==3){
						this.bbMoveSpeed=2.5;
						this.bbNoRotate=1;
					}
				}
			}
		}
		this.bbShootTimer=60+bb_witchblaster_Rand(60);
		if(this.bbSubType==3){
			this.bbNoRotate=1;
		}
	}
	if(this.bbType==3){
		if(bb_audio_ChannelState(bb_witchblaster_gameapp.bbChannelExplosion)==0){
			bb_audio_PlaySound(bb_witchblaster_gameapp.bbSndExplosion,bb_witchblaster_gameapp.bbChannelExplosion,0);
		}
		this.bbSprite=bb_witchblaster_gameapp.bbImgExplosion;
		this.bbAdditive=1;
	}
	if(this.bbType==4){
		this.bbSprite=bb_witchblaster_gameapp.bbImgPowerup;
		this.bbAdditive=1;
	}
	if(this.bbType==5){
		this.bbSprite=bb_witchblaster_gameapp.bbImgEnemy;
		this.bbFrame=this.bbSubType*4;
		this.bbXScale=4.000000;
		this.bbYScale=4.000000;
		this.bbHealth=50;
		if(this.bbSubType!=3){
			this.bbRotation=-90.000000;
		}
		this.bbY=240.000000;
		if(this.bbSubType==0){
			this.bbX=320.000000;
			this.bbY=240.000000;
			this.bbXSpeed=4.000000;
			this.bbYSpeed=4.000000;
		}else{
			this.bbX=544.000000;
			this.bbYSpeed=3.000000;
		}
	}
	bb_witchblaster_gameapp.bbGameObjects.bbAddLast(this);
	return this;
}
function bb_cgameobject_GameObject_new2(){
	return this;
}
function bb_cgameobject_GameObject_GetWitch(){
	var bb=bb_witchblaster_gameapp.bbGameObjects.bbObjectEnumerator();
	while(bb.bbHasNext()){
		var bbgameobject=object_downcast((bb.bbNextObject()),bb_cgameobject_GameObject);
		if(bbgameobject.bbType==0){
			return bbgameobject;
		}
	}
	return null;
}
var bb_cgameobject_GameObject_ShootOn;
var bb_cgameobject_GameObject_TransformOn;
bb_cgameobject_GameObject.prototype.bbFireProjectile=function(bbX,bbY,bbRotation,bbSubType,bbFireSpeed,bbPointX,bbPointY){
	var bbprojectile=bb_cgameobject_GameObject_new.call(new bb_cgameobject_GameObject,1,bbX,bbY,0,0);
	bbprojectile.bbRotation=(bbRotation);
	bbprojectile.bbFrame=bbSubType;
	bbprojectile.bbSubType=bbSubType;
	if(bbSubType>0){
		bbprojectile.bbNoRotate=1;
	}
	if(bbPointX>0){
		bbprojectile.bbRotation=bb_witchblaster_PointAt((bbX),(bbY),(bbPointX),(bbPointY));
	}
	bbprojectile.bbXSpeed=bb_witchblaster_XFactor(bbprojectile.bbRotation,bbFireSpeed);
	bbprojectile.bbYSpeed=-bb_witchblaster_YFactor(bbprojectile.bbRotation,bbFireSpeed);
	bb_witchblaster_gameapp.bbGameObjects.bbAddLast(bbprojectile);
	return 0;
}
bb_cgameobject_GameObject.prototype.bbWitchShoot=function(){
	var bbXO=24;
	var bbYO=10;
	if(this.bbHealth>0 && bb_audio_ChannelState(bb_witchblaster_gameapp.bbChannelShoot)==0){
		bb_audio_PlaySound(bb_witchblaster_gameapp.bbSndShoot,bb_witchblaster_gameapp.bbChannelShoot,0);
	}
	var bb=this.bbHealth;
	if(bb==1){
		this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO))|0),90,0,15.000000,0,0);
	}else{
		if(bb==2){
			this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)+8.000000)|0),90,0,15.000000,0,0);
			this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)-8.000000)|0),90,0,15.000000,0,0);
		}else{
			if(bb==3){
				this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)+8.000000)|0),45,0,15.000000,0,0);
				this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)-8.000000)|0),135,0,15.000000,0,0);
			}else{
				if(bb==4){
					this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO))|0),90,0,15.000000,0,0);
					this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)+8.000000)|0),45,0,15.000000,0,0);
					this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)-8.000000)|0),135,0,15.000000,0,0);
				}else{
					if(bb==5){
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO))|0),90,0,15.000000,0,0);
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO))|0),0,0,15.000000,0,0);
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO))|0),180,0,15.000000,0,0);
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)+8.000000)|0),45,0,15.000000,0,0);
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)-8.000000)|0),135,0,15.000000,0,0);
					}else{
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)+8.000000)|0),90,0,15.000000,0,0);
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)-8.000000)|0),90,0,15.000000,0,0);
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO))|0),0,0,15.000000,0,0);
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO))|0),180,0,15.000000,0,0);
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)+8.000000)|0),45,0,15.000000,0,0);
						this.bbFireProjectile(((this.bbX+(bbXO))|0),((this.bbY+(bbYO)-8.000000)|0),135,0,15.000000,0,0);
					}
				}
			}
		}
	}
	this.bbShootTimer=10;
	return 0;
}
bb_cgameobject_GameObject.prototype.bbWitchHurt=function(){
	if(this.bbTimer<60){
		return 0;
	}
	if(this.bbHealth>1){
		this.bbTimer=0;
		this.bbHealth=1;
		this.bbMoodTime=60;
		this.bbMood=3;
	}else{
		this.bbHealth=0;
	}
	return 0;
}
bb_cgameobject_GameObject.prototype.bbEnemyShoot=function(){
	var bbWitch=bb_cgameobject_GameObject_GetWitch();
	if(bbWitch==null){
		return 0;
	}
	if(bbWitch.bbTransform>30){
		return 0;
	}
	var bb=this.bbSubType;
	if(bb==1){
		this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),((this.bbRotation)|0),1,3.000000,0,0);
		this.bbShootTimer=90+bb_witchblaster_Rand(90);
	}else{
		if(bb==2){
			this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),bb_witchblaster_Rand(360),2,0.75,0,0);
			this.bbShootTimer=120+bb_witchblaster_Rand(120);
		}else{
			if(bb==3){
				var bb2=bb_witchblaster_gameapp.bbGameObjects.bbObjectEnumerator();
				while(bb2.bbHasNext()){
					var bbgameobject=object_downcast((bb2.bbNextObject()),bb_cgameobject_GameObject);
					if(bbgameobject.bbType==0){
						this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),0,3,2.000000,((bbgameobject.bbX)|0),((bbgameobject.bbY)|0));
					}
				}
				this.bbShootTimer=120+bb_witchblaster_Rand(120);
			}
		}
	}
	return 0;
}
bb_cgameobject_GameObject.prototype.bbEnemyHurt=function(){
	bb_cgameobject_GameObject_new.call(new bb_cgameobject_GameObject,3,((this.bbX)|0),((this.bbY)|0),0,0);
	this.bbHealth=this.bbHealth-1;
	if(this.bbHealth==0 && this.bbSubType==0 && this.bbSubType2==2){
		this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),0,1,2.000000,0,0);
		this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),90,1,2.000000,0,0);
		this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),180,1,2.000000,0,0);
		this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),270,1,2.000000,0,0);
	}
	return 0;
}
bb_cgameobject_GameObject.prototype.bbHandle=function(){
	this.bbTimer=this.bbTimer+1;
	this.bbShootTimer=this.bbShootTimer-1;
	if(this.bbType==0){
		this.bbMoodTime=this.bbMoodTime-1;
		this.bbFrame=0;
		if(this.bbTimer % 30<15){
			this.bbFrame=1;
		}
		if(this.bbShootTimer>=0 && this.bbMoodTime<=0){
			this.bbFrame=this.bbFrame+7;
		}
		if(this.bbHealth>0){
			if((bb_input_KeyDown(37))!=0){
				this.bbXTarget=((this.bbX-4.000000)|0);
			}
			if((bb_input_KeyDown(39))!=0){
				this.bbXTarget=((this.bbX+4.000000)|0);
			}
			if((bb_input_KeyDown(38))!=0){
				this.bbYTarget=((this.bbY-4.000000)|0);
			}
			if((bb_input_KeyDown(40))!=0){
				this.bbYTarget=((this.bbY+4.000000)|0);
			}
			if(((bb_input_TouchDown(0))!=0) && (bb_input_TouchX(0)>48.000000 || bb_input_TouchY(0)<336.000000)){
				this.bbXTarget=((bb_input_TouchX(0))|0);
				this.bbYTarget=((bb_input_TouchY(0))|0);
			}
			bb_witchblaster_gameapp.bbOldMouseX=((bb_input_TouchX(0))|0);
			bb_witchblaster_gameapp.bbOldMouseY=((bb_input_TouchY(0))|0);
			if(this.bbX>(this.bbXTarget-4) && this.bbX<(this.bbXTarget+4)){
				this.bbX=(this.bbXTarget);
			}
			if(this.bbY>(this.bbYTarget-4) && this.bbY<(this.bbYTarget+4)){
				this.bbY=(this.bbYTarget);
			}
			var bbxdir=0;
			var bbydir=0;
			var bbshoot=0;
			if(this.bbX<(this.bbXTarget)){
				bbxdir=1;
			}
			if(this.bbX>(this.bbXTarget)){
				bbxdir=-1;
			}
			if(this.bbY<(this.bbYTarget)){
				bbydir=1;
			}
			if(this.bbY>(this.bbYTarget)){
				bbydir=-1;
			}
			this.bbX=this.bbX+(bbxdir*4);
			this.bbY=this.bbY+(bbydir*4);
			var bbGhostHit=0;
			if(((bb_input_TouchHit(0))!=0) && bb_input_TouchX(0)<48.000000){
				if(bb_input_TouchY(0)>336.000000 && bb_input_TouchY(0)<384.000000){
					bb_cgameobject_GameObject_ShootOn=((!((bb_cgameobject_GameObject_ShootOn)!=0))?1:0);
				}
				if(bb_input_TouchY(0)>384.000000 && bb_input_TouchY(0)<432.000000){
					bb_cgameobject_GameObject_TransformOn=((!((bb_cgameobject_GameObject_TransformOn)!=0))?1:0);
				}
				if(bb_input_TouchY(0)>432.000000){
					bbGhostHit=1;
				}
			}
			if(this.bbTransform==0 && (((bb_input_KeyDown(90))!=0) || bb_cgameobject_GameObject_ShootOn==1)){
				bbshoot=1;
				if(this.bbShootTimer<=0){
					this.bbWitchShoot();
				}
			}
			if(((bb_input_KeyDown(88))!=0) || ((bb_cgameobject_GameObject_TransformOn)!=0)){
				this.bbTransform=this.bbTransform+1;
			}else{
				this.bbTransform=this.bbTransform-1;
			}
			this.bbTransform=bb_math_Clamp(this.bbTransform,0,60);
			var bb=bb_witchblaster_gameapp.bbGhostPhase;
			if(bb==0){
				if(((bb_input_KeyDown(67))!=0) || bbGhostHit==1){
					if(bb_audio_ChannelState(bb_witchblaster_gameapp.bbChannelParadox)==0){
						bb_audio_PlaySound(bb_witchblaster_gameapp.bbSndParadox,bb_witchblaster_gameapp.bbChannelParadox,0);
					}
					bb_witchblaster_gameapp.bbGhostPhase=1;
					bb_witchblaster_gameapp.bbGhostTimer=bb_witchblaster_gameapp.bbLevelTimer;
				}
			}else{
				if(bb==1){
					bb_tghost_TGhost_Update(((this.bbX)|0),((this.bbY)|0),bbxdir,bbydir,bbshoot,this.bbHealth);
					if(bb_witchblaster_gameapp.bbGhostTimer+300<bb_witchblaster_gameapp.bbLevelTimer){
						bb_witchblaster_gameapp.bbGhostPhase=2;
					}
				}else{
					if(bb==2){
						var bbstate=bb_tghost_TGhost_Use();
						if(bbstate==0){
							bb_witchblaster_gameapp.bbGhostPhase=3;
						}
					}
				}
			}
			this.bbX=bb_math_Clamp2(this.bbX,0.0,640.0);
			this.bbY=bb_math_Clamp2(this.bbY,0.0,480.0);
			var bb2=bb_witchblaster_gameapp.bbGameObjects.bbObjectEnumerator();
			while(bb2.bbHasNext()){
				var bbgameobject=object_downcast((bb2.bbNextObject()),bb_cgameobject_GameObject);
				if(bbgameobject.bbType==1 && bbgameobject.bbSubType>0){
					if(((bb_witchblaster_CollisionDetection(((this.bbX)|0),((this.bbY)|0),((bbgameobject.bbX)|0),((bbgameobject.bbY)|0),32))!=0)){
						this.bbWitchHurt();
						bbgameobject.bbKill=1;
					}
				}
			}
		}else{
			bb_cgameobject_GameObject_new.call(new bb_cgameobject_GameObject,3,((this.bbX)|0),((this.bbY)|0),0,0);
			this.bbY=this.bbY+6.000000;
			if(this.bbY>544.000000){
				this.bbKill=1;
				if(bb_witchblaster_gameapp.bbGhostPhase==1){
					bb_witchblaster_gameapp.bbGhostPhase=2;
				}
			}
		}
	}
	if(this.bbType==1){
		this.bbX=this.bbX+this.bbXSpeed;
		this.bbY=this.bbY+this.bbYSpeed;
		if(this.bbX>640.000000){
			this.bbKill=1;
		}
		if(this.bbX<0.000000){
			this.bbKill=1;
		}
		if(this.bbY>480.000000){
			this.bbKill=1;
		}
		if(this.bbY<0.000000){
			this.bbKill=1;
		}
	}
	if(this.bbType==2){
		if(this.bbHealth>0){
			this.bbX=this.bbX+bb_witchblaster_XFactor(this.bbRotation,this.bbMoveSpeed);
			this.bbY=this.bbY-bb_witchblaster_YFactor(this.bbRotation,this.bbMoveSpeed);
			if(this.bbTurnTimer>0.000000 && (this.bbTimer)>180.000000/this.bbMoveSpeed){
				this.bbRotation=this.bbRotation+this.bbMoveSpeed*.75*(this.bbTurnDirection);
				this.bbTurnTimer=this.bbTurnTimer-this.bbMoveSpeed*.75;
			}
			if(this.bbShootTimer<=0){
				this.bbEnemyShoot();
			}
			this.bbFrameTimer=this.bbFrameTimer+1;
			if(this.bbFrameTimer>5){
				this.bbFrameTimer=0;
				this.bbFrame=this.bbFrame+1;
				if(this.bbFrame>this.bbSubType*4+3){
					this.bbFrame=this.bbSubType*4;
				}
			}
			var bb3=bb_witchblaster_gameapp.bbGameObjects.bbObjectEnumerator();
			while(bb3.bbHasNext()){
				var bbgameobject2=object_downcast((bb3.bbNextObject()),bb_cgameobject_GameObject);
				if(bbgameobject2.bbType==0){
					if(((bb_witchblaster_CollisionDetection(((this.bbX)|0),((this.bbY)|0),((bbgameobject2.bbX)|0),((bbgameobject2.bbY)|0),64))!=0)){
						this.bbEnemyHurt();
						bbgameobject2.bbWitchHurt();
					}
				}
				if(bbgameobject2.bbType==1 && bbgameobject2.bbSubType==0 && this.bbHealth>0){
					if(((bb_witchblaster_CollisionDetection(((this.bbX)|0),((this.bbY)|0),((bbgameobject2.bbX)|0),((bbgameobject2.bbY)|0),32))!=0)){
						this.bbEnemyHurt();
						bbgameobject2.bbKill=1;
						bb_witchblaster_gameapp.bbCurrentScore=bb_witchblaster_gameapp.bbCurrentScore+100;
					}
				}
			}
		}else{
			this.bbVisible=1;
			this.bbDieTimer=this.bbDieTimer+1;
			if(this.bbDieTimer % 10>5){
				this.bbVisible=0;
			}
			if(this.bbDieTimer>30){
				if(this.bbSubType==0 && this.bbSubType2==1){
					this.bbDieTimer=0;
					this.bbHealth=1;
					this.bbSubType2=0;
				}else{
					this.bbKill=1;
					this.bbSpawner.bbKillCount=this.bbSpawner.bbKillCount+1;
					if(this.bbSpawner.bbKillCount==5){
						bb_cgameobject_GameObject_new.call(new bb_cgameobject_GameObject,4,((this.bbX)|0),((this.bbY)|0),0,0);
					}
				}
			}
		}
		if(this.bbX>704.000000){
			this.bbKill=1;
		}
		if(this.bbX<-64.000000){
			this.bbKill=1;
		}
		if(this.bbY>544.000000){
			this.bbKill=1;
		}
		if(this.bbY<-64.000000){
			this.bbKill=1;
		}
	}
	if(this.bbType==3){
		this.bbFrame=this.bbFrame+1;
		if(this.bbFrame>15){
			this.bbKill=1;
		}
	}
	if(this.bbType==4){
		this.bbX=this.bbX-4.000000;
		var bb4=bb_witchblaster_gameapp.bbGameObjects.bbObjectEnumerator();
		while(bb4.bbHasNext()){
			var bbgameobject3=object_downcast((bb4.bbNextObject()),bb_cgameobject_GameObject);
			if(bbgameobject3.bbType==0 && this.bbKill==0){
				if(((bb_witchblaster_CollisionDetection(((this.bbX)|0),((this.bbY)|0),((bbgameobject3.bbX)|0),((bbgameobject3.bbY)|0),32))!=0)){
					bb_witchblaster_gameapp.bbCurrentScore=bb_witchblaster_gameapp.bbCurrentScore+200;
					this.bbKill=1;
					bbgameobject3.bbHealth=bbgameobject3.bbHealth+1;
					bbgameobject3.bbMoodTime=60;
					bbgameobject3.bbMood=2;
					if(bb_audio_ChannelState(bb_witchblaster_gameapp.bbChannelPowerup)==0){
						bb_audio_PlaySound(bb_witchblaster_gameapp.bbSndPowerup,bb_witchblaster_gameapp.bbChannelPowerup,0);
					}
				}
			}
		}
		if(this.bbX<-64.000000){
			this.bbKill=1;
		}
	}
	if(this.bbType==5){
		this.bbFrameTimer=this.bbFrameTimer+1;
		if(this.bbFrameTimer>5){
			this.bbFrameTimer=0;
			this.bbFrame=this.bbFrame+1;
			if(this.bbFrame>this.bbSubType*4+3){
				this.bbFrame=this.bbSubType*4;
			}
		}
		this.bbVisible=1;
		if(this.bbTimer<300){
			if(bb_app_Millisecs() % 200<100){
				this.bbVisible=0;
			}
			return 0;
		}
		if(this.bbHealth<0){
			var bbWitch=bb_cgameobject_GameObject_GetWitch();
			if(bbWitch!=null){
				bbWitch.bbMood=7;
				bbWitch.bbMoodTime=60;
			}
			this.bbHealth=this.bbHealth-1;
			bb_cgameobject_GameObject_new.call(new bb_cgameobject_GameObject,3,((this.bbX-64.000000+bb_random_Rnd()*128.000000)|0),((this.bbY-64.000000+bb_random_Rnd()*128.000000)|0),0,0);
			if(this.bbHealth<-180){
				bb_witchblaster_gameapp.bbLevelState=2;
			}
			return 0;
		}
		this.bbX=this.bbX+this.bbXSpeed;
		this.bbY=this.bbY+this.bbYSpeed;
		if(this.bbX<0.000000 && this.bbXSpeed<0.000000){
			this.bbXSpeed=this.bbXSpeed*-1.000000;
		}
		if(this.bbX>640.000000 && this.bbXSpeed>0.000000){
			this.bbXSpeed=this.bbXSpeed*-1.000000;
		}
		if(this.bbY<0.000000 && this.bbYSpeed<0.000000){
			this.bbYSpeed=this.bbYSpeed*-1.000000;
		}
		if(this.bbY>480.000000 && this.bbYSpeed>0.000000){
			this.bbYSpeed=this.bbYSpeed*-1.000000;
		}
		var bb5=bb_witchblaster_gameapp.bbGameObjects.bbObjectEnumerator();
		while(bb5.bbHasNext()){
			var bbgameobject4=object_downcast((bb5.bbNextObject()),bb_cgameobject_GameObject);
			if(bbgameobject4.bbType==0){
				if(((bb_witchblaster_CollisionDetection(((this.bbX)|0),((this.bbY)|0),((bbgameobject4.bbX)|0),((bbgameobject4.bbY)|0),64))!=0)){
					bbgameobject4.bbWitchHurt();
				}
			}
			if(bbgameobject4.bbType==1 && bbgameobject4.bbSubType==0 && bbgameobject4.bbKill==0){
				if(((bb_witchblaster_CollisionDetection(((this.bbX)|0),((this.bbY)|0),((bbgameobject4.bbX)|0),((bbgameobject4.bbY)|0),64))!=0)){
					bbgameobject4.bbKill=1;
					this.bbHealth=this.bbHealth-1;
					bb_witchblaster_gameapp.bbCurrentScore=bb_witchblaster_gameapp.bbCurrentScore+100;
				}
			}
		}
		if(this.bbShootTimer<=0){
			this.bbShootTimer=20;
			if(this.bbSubType==1){
				this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),-30,this.bbSubType,2.000000,0,0);
				this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),-60,this.bbSubType,2.000000,0,0);
				this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),-120,this.bbSubType,2.000000,0,0);
				this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),-150,this.bbSubType,2.000000,0,0);
			}
			if(this.bbSubType==2){
				this.bbFireProjectile(((this.bbX)|0),((this.bbY-96.000000)|0),-90,this.bbSubType,2.000000,0,0);
				this.bbFireProjectile(((this.bbX)|0),((this.bbY+96.000000)|0),-90,this.bbSubType,2.000000,0,0);
			}
			if(this.bbSubType==3){
				if(this.bbTimer % 600>300){
					this.bbFireProjectile(((this.bbX)|0),((this.bbY-96.000000)|0),-90,this.bbSubType,2.000000,0,0);
					this.bbFireProjectile(((this.bbX)|0),((this.bbY+96.000000)|0),-90,this.bbSubType,2.000000,0,0);
				}else{
					this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),-30,this.bbSubType,2.000000,0,0);
					this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),-60,this.bbSubType,2.000000,0,0);
					this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),-120,this.bbSubType,2.000000,0,0);
					this.bbFireProjectile(((this.bbX)|0),((this.bbY)|0),-150,this.bbSubType,2.000000,0,0);
				}
			}
		}
	}
	return 0;
}
bb_cgameobject_GameObject.prototype.bbDraw=function(bbxscale){
	bb_graphics_SetBlend(0);
	if(this.bbType==2 && this.bbSubType==0){
		if(this.bbHealth==0){
			if(this.bbSubType2!=1){
				bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,5);
				return 0;
			}else{
				bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,4);
				bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,8);
				bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,12);
				bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,18);
				return 0;
			}
		}
		var bbwingframe=0;
		if(this.bbTimer % 40>10){
			bbwingframe=1;
		}
		if(this.bbTimer % 40>20){
			bbwingframe=2;
		}
		if(this.bbTimer % 40>30){
			bbwingframe=1;
		}
		var bbblinkframe=6;
		if(this.bbSubType2!=2){
			if(this.bbTimer % 60>50){
				bbblinkframe=7;
			}
		}else{
			bbblinkframe=10;
			if(this.bbTimer % 20>10){
				bbblinkframe=16;
			}
		}
		var bbmouthframe=12;
		var bbwitch=bb_cgameobject_GameObject_GetWitch();
		if(bbwitch!=null){
			if(((bb_witchblaster_CollisionDetection(((this.bbX)|0),((this.bbY)|0),((bbwitch.bbX)|0),((bbwitch.bbY)|0),128))!=0)){
				bbmouthframe=13;
			}
		}
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,3);
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,bbwingframe);
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,bbblinkframe);
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,bbmouthframe);
		if(this.bbSubType2==1){
			bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,21);
		}
		if(this.bbSubType2==2){
			bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,22);
		}
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBee,((this.bbX)|0),((this.bbY)|0),0.000000,1.000000,1.000000,18);
	}
	if(this.bbType==5 && this.bbSubType==0){
		if(this.bbHealth<=0){
			bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBossBee,((this.bbX)|0),((this.bbY)|0),4.000000,(bbxscale),1.000000,4);
			return 0;
		}
		var bbwingframe2=5;
		if(this.bbTimer % 40>10){
			bbwingframe2=6;
		}
		if(this.bbTimer % 40>20){
			bbwingframe2=7;
		}
		if(this.bbTimer % 40>30){
			bbwingframe2=6;
		}
		var bbblinkframe2=10;
		if(this.bbTimer % 60>50){
			bbblinkframe2=11;
		}
		var bblegframe=8;
		if(this.bbTimer % 20>10){
			bblegframe=9;
		}
		var bbmouthframe2=12;
		var bbwandframe=13;
		var bbwitch2=bb_cgameobject_GameObject_GetWitch();
		if(bbwitch2!=null){
			if(((bb_witchblaster_CollisionDetection(((this.bbX)|0),((this.bbY)|0),((bbwitch2.bbX)|0),((bbwitch2.bbY)|0),128))!=0)){
				bbwandframe=14;
				bbmouthframe2=17;
				bbblinkframe2=16;
			}
		}
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBossBee,((this.bbX)|0),((this.bbY)|0),0.000000,(bbxscale),1.000000,0);
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBossBee,((this.bbX)|0),((this.bbY)|0),0.000000,(bbxscale),1.000000,bbwingframe2);
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBossBee,((this.bbX)|0),((this.bbY)|0),0.000000,(bbxscale),1.000000,bbblinkframe2);
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBossBee,((this.bbX)|0),((this.bbY)|0),0.000000,(bbxscale),1.000000,12);
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBossBee,((this.bbX)|0),((this.bbY)|0),0.000000,(bbxscale),1.000000,bblegframe);
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBossBee,((this.bbX)|0),((this.bbY)|0),0.000000,(bbxscale),1.000000,bbwandframe);
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBossBee,((this.bbX)|0),((this.bbY)|0),0.000000,(bbxscale),1.000000,2);
		bb_graphics_DrawImage2(bb_witchblaster_gameapp.bbImgEnemyBossBee,((this.bbX)|0),((this.bbY)|0),0.000000,(bbxscale),1.000000,1);
	}
	return 0;
}
function bb_tghost_TGhost(){
	bb_cgameobject_GameObject.call(this);
	this.bbXDir=0;
	this.bbYDir=0;
	this.bbShoot=0;
}
bb_tghost_TGhost.prototype=extend_class(bb_cgameobject_GameObject);
function bb_tghost_TGhost_new(bbx,bby,bbxdir,bbydir,bbshoot,bbhealth){
	bb_cgameobject_GameObject_new2.call(this);
	this.bbX=(bbx);
	this.bbY=(bby);
	this.bbXDir=bbxdir;
	this.bbYDir=bbydir;
	this.bbShoot=bbshoot;
	this.bbHealth=bbhealth;
	this.bbSprite=bb_witchblaster_gameapp.bbImgWitch;
	this.bbAdditive=1;
	bb_witchblaster_gameapp.bbGhosts.bbAddLast(this);
	return this;
}
function bb_tghost_TGhost_new2(){
	bb_cgameobject_GameObject_new2.call(this);
	return this;
}
bb_tghost_TGhost.prototype.bbIsDifferent=function(bbxdir,bbydir,bbshoot,bbhealth){
	if(bbxdir!=this.bbXDir){
		return 1;
	}
	if(bbydir!=this.bbYDir){
		return 1;
	}
	if(bbshoot!=this.bbShoot){
		return 1;
	}
	if(bbhealth!=this.bbHealth){
		return 1;
	}
	return 0;
}
function bb_tghost_TGhost_Update(bbx,bby,bbxdir,bbydir,bbshoot,bbhealth){
	var bbghost=object_downcast((bb_witchblaster_gameapp.bbGhosts.bbLast()),bb_tghost_TGhost);
	if(bbghost==null){
		bb_tghost_TGhost_new.call(new bb_tghost_TGhost,bbx,bby,bbxdir,bbydir,bbshoot,bbhealth);
		return 0;
	}
	if((bbghost.bbIsDifferent(bbxdir,bbydir,bbshoot,bbhealth))!=0){
		bb_tghost_TGhost_new.call(new bb_tghost_TGhost,bbx,bby,bbxdir,bbydir,bbshoot,bbhealth);
		return 0;
	}
	bbghost.bbTimer=bbghost.bbTimer+1;
	return 0;
}
function bb_tghost_TGhost_Use(){
	var bbghost=object_downcast((bb_witchblaster_gameapp.bbGhosts.bbFirst()),bb_tghost_TGhost);
	if(bbghost==null){
		return 0;
	}
	bbghost.bbX=bbghost.bbX+(bbghost.bbXDir*4);
	bbghost.bbY=bbghost.bbY+(bbghost.bbYDir*4);
	bbghost.bbShootTimer=bbghost.bbShootTimer-1;
	if(bbghost.bbShootTimer<=0 && bbghost.bbShoot==1){
		bbghost.bbWitchShoot();
	}
	bbghost.bbTimer=bbghost.bbTimer-1;
	if(bbghost.bbTimer<=0){
		bb_witchblaster_gameapp.bbGhosts.bbRemoveFirst();
	}
	return 1;
}
function bb_cspawner_Spawner(){
	Object.call(this);
	this.bbDirection=0;
	this.bbX=0;
	this.bbY=0;
	this.bbTurnType=0;
	this.bbTurnAmount=0;
	this.bbEnemyType=0;
	this.bbEnemyType2=0;
	this.bbKillCount=0;
	this.bbTotalCount=5;
	this.bbTimer=0;
	this.bbCounter=5;
}
function bb_cspawner_Spawner_new(){
	this.bbDirection=bb_witchblaster_Rand(3);
	var bb=this.bbDirection;
	if(bb==0){
		this.bbX=64+bb_witchblaster_Rand(512);
		this.bbY=544;
	}else{
		if(bb==1){
			this.bbX=-64;
			this.bbY=64+bb_witchblaster_Rand(352);
		}else{
			if(bb==2){
				this.bbX=64+bb_witchblaster_Rand(512);
				this.bbY=-64;
			}else{
				if(bb==3){
					this.bbX=704;
					this.bbY=64+bb_witchblaster_Rand(352);
				}
			}
		}
	}
	this.bbTurnType=bb_witchblaster_Rand(1);
	this.bbTurnAmount=1+bb_witchblaster_Rand(3);
	this.bbEnemyType=bb_witchblaster_Rand(4);
	if(this.bbEnemyType>3){
		this.bbEnemyType=bb_witchblaster_gameapp.bbCurrentLevel;
	}
	this.bbEnemyType2=bb_witchblaster_Rand(3);
	if(this.bbEnemyType>2){
		this.bbEnemyType=0;
	}
	return this;
}
bb_cspawner_Spawner.prototype.bbSpawn=function(){
	this.bbCounter=this.bbCounter-1;
	var bbEnemy=bb_cgameobject_GameObject_new.call(new bb_cgameobject_GameObject,2,this.bbX,this.bbY,this.bbEnemyType,this.bbEnemyType2);
	this.bbTimer=((60.000000/bbEnemy.bbMoveSpeed)|0);
	var bb=this.bbDirection;
	if(bb==0){
		bbEnemy.bbRotation=0.000000;
		if(this.bbX>320){
			bbEnemy.bbTurnDirection=-1;
		}
	}else{
		if(bb==1){
			bbEnemy.bbRotation=90.000000;
			if(this.bbY>240){
				bbEnemy.bbTurnDirection=-1;
			}
		}else{
			if(bb==2){
				bbEnemy.bbRotation=180.000000;
				if(this.bbX<320){
					bbEnemy.bbTurnDirection=-1;
				}
			}else{
				if(bb==3){
					bbEnemy.bbRotation=270.000000;
					if(this.bbY<240){
						bbEnemy.bbTurnDirection=-1;
					}
				}
			}
		}
	}
	bbEnemy.bbSpawner=this;
	if(this.bbTurnType==0){
		if(this.bbDirection==0 || this.bbDirection==2){
			this.bbX=bb_math_Clamp(this.bbX-64+128*bb_witchblaster_Rand(1),64,576);
		}else{
			this.bbY=bb_math_Clamp(this.bbY-64+128*bb_witchblaster_Rand(1),64,416);
		}
	}else{
		bbEnemy.bbTurnTimer=(this.bbTurnAmount*90);
	}
	return 0;
}
bb_cspawner_Spawner.prototype.bbHandle=function(){
	this.bbTimer=this.bbTimer-1;
	if(this.bbTimer<=0 && this.bbCounter>0){
		this.bbSpawn();
	}
	return 0;
}
function bb_input_TouchX(bbindex){
	return bb_input_device.TouchX(bbindex);
}
function bb_input_TouchY(bbindex){
	return bb_input_device.TouchY(bbindex);
}
function bb_witchblaster_Rand(bbMax){
	return ((bb_random_Rnd()*(bbMax+1))|0);
}
function bb_audio_StopChannel(bbchannel){
	bb_audio_device.StopChannel(bbchannel);
	return 0;
}
function bb_list_Enumerator(){
	Object.call(this);
	this.bb_list=null;
	this.bb_curr=null;
}
function bb_list_Enumerator_new(bblist){
	this.bb_list=bblist;
	this.bb_curr=bblist.bb_head.bb_succ;
	return this;
}
function bb_list_Enumerator_new2(){
	return this;
}
bb_list_Enumerator.prototype.bbHasNext=function(){
	return this.bb_curr!=this.bb_list.bb_head;
}
bb_list_Enumerator.prototype.bbNextObject=function(){
	var bbdata=this.bb_curr.bb_data;
	this.bb_curr=this.bb_curr.bb_succ;
	return bbdata;
}
function bb_input_KeyDown(bbkey){
	return bb_input_device.KeyDown(bbkey);
}
function bb_input_TouchDown(bbindex){
	return bb_input_device.KeyDown(384+bbindex);
}
function bb_witchblaster_PointAt(bbX1,bbY1,bbX2,bbY2){
	return (Math.atan2(bbX2-bbX1,bbY1-bbY2)*57.2957795);
}
function bb_witchblaster_XFactor(bbRadians,bbAmount){
	return Math.sin((bbRadians)*0.0174532925)*bbAmount;
}
function bb_witchblaster_YFactor(bbRadians,bbAmount){
	return Math.cos((bbRadians)*0.0174532925)*bbAmount;
}
function bb_math_Clamp(bbn,bbmin,bbmax){
	if(bbn<bbmin){
		return bbmin;
	}
	if(bbn>bbmax){
		return bbmax;
	}
	return bbn;
}
function bb_math_Clamp2(bbn,bbmin,bbmax){
	if(bbn<bbmin){
		return bbmin;
	}
	if(bbn>bbmax){
		return bbmax;
	}
	return bbn;
}
function bb_witchblaster_CollisionDetection(bbX1,bbY1,bbX2,bbY2,bbRange){
	if(bbX1>bbX2+bbRange){
		return 0;
	}
	if(bbX1<bbX2-bbRange){
		return 0;
	}
	if(bbY1>bbY2+bbRange){
		return 0;
	}
	if(bbY1<bbY2-bbRange){
		return 0;
	}
	return 1;
}
function bb_graphics_PushMatrix(){
	var bbsp=bb_graphics_context.bbmatrixSp;
	bb_graphics_context.bbmatrixStack[bbsp+0]=bb_graphics_context.bbix;
	bb_graphics_context.bbmatrixStack[bbsp+1]=bb_graphics_context.bbiy;
	bb_graphics_context.bbmatrixStack[bbsp+2]=bb_graphics_context.bbjx;
	bb_graphics_context.bbmatrixStack[bbsp+3]=bb_graphics_context.bbjy;
	bb_graphics_context.bbmatrixStack[bbsp+4]=bb_graphics_context.bbtx;
	bb_graphics_context.bbmatrixStack[bbsp+5]=bb_graphics_context.bbty;
	bb_graphics_context.bbmatrixSp=bbsp+6;
	return 0;
}
function bb_graphics_Transform(bbix,bbiy,bbjx,bbjy,bbtx,bbty){
	var bbix2=bbix*bb_graphics_context.bbix+bbiy*bb_graphics_context.bbjx;
	var bbiy2=bbix*bb_graphics_context.bbiy+bbiy*bb_graphics_context.bbjy;
	var bbjx2=bbjx*bb_graphics_context.bbix+bbjy*bb_graphics_context.bbjx;
	var bbjy2=bbjx*bb_graphics_context.bbiy+bbjy*bb_graphics_context.bbjy;
	var bbtx2=bbtx*bb_graphics_context.bbix+bbty*bb_graphics_context.bbjx+bb_graphics_context.bbtx;
	var bbty2=bbtx*bb_graphics_context.bbiy+bbty*bb_graphics_context.bbjy+bb_graphics_context.bbty;
	bb_graphics_SetMatrix(bbix2,bbiy2,bbjx2,bbjy2,bbtx2,bbty2);
	return 0;
}
function bb_graphics_Transform2(bbcoords){
	var bbout=new_number_array(bbcoords.length);
	for(var bbi=0;bbi<bbcoords.length-1;bbi=bbi+2){
		var bbx=bbcoords[bbi];
		var bby=bbcoords[bbi+1];
		bbout[bbi]=bbx*bb_graphics_context.bbix+bby*bb_graphics_context.bbjx+bb_graphics_context.bbtx;
		bbout[bbi+1]=bbx*bb_graphics_context.bbiy+bby*bb_graphics_context.bbjy+bb_graphics_context.bbty;
	}
	return bbout;
}
function bb_graphics_Translate(bbx,bby){
	bb_graphics_Transform(1.000000,0.000000,0.000000,1.000000,bbx,bby);
	return 0;
}
function bb_graphics_ValidateMatrix(){
	if((bb_graphics_context.bbmatDirty)!=0){
		bb_graphics_context.bbdevice.SetMatrix(bb_graphics_context.bbix,bb_graphics_context.bbiy,bb_graphics_context.bbjx,bb_graphics_context.bbjy,bb_graphics_context.bbtx,bb_graphics_context.bbty);
		bb_graphics_context.bbmatDirty=0;
	}
	return 0;
}
function bb_graphics_PopMatrix(){
	var bbsp=bb_graphics_context.bbmatrixSp-6;
	bb_graphics_SetMatrix(bb_graphics_context.bbmatrixStack[bbsp+0],bb_graphics_context.bbmatrixStack[bbsp+1],bb_graphics_context.bbmatrixStack[bbsp+2],bb_graphics_context.bbmatrixStack[bbsp+3],bb_graphics_context.bbmatrixStack[bbsp+4],bb_graphics_context.bbmatrixStack[bbsp+5]);
	bb_graphics_context.bbmatrixSp=bbsp;
	return 0;
}
function bb_graphics_DrawImage(bbimage,bbx,bby,bbframe){
	var bbf=bbimage.bbframes[bbframe];
	if((bb_graphics_context.bbtformed)!=0){
		bb_graphics_PushMatrix();
		bb_graphics_Translate(bbx-bbimage.bbtx,bby-bbimage.bbty);
		bb_graphics_ValidateMatrix();
		if((bbimage.bbflags&65536)!=0){
			bb_graphics_context.bbdevice.DrawSurface(bbimage.bbsurface,0.000000,0.000000);
		}else{
			bb_graphics_context.bbdevice.DrawSurface2(bbimage.bbsurface,0.000000,0.000000,bbf.bbx,bbf.bby,bbimage.bbwidth,bbimage.bbheight);
		}
		bb_graphics_PopMatrix();
	}else{
		bb_graphics_ValidateMatrix();
		if((bbimage.bbflags&65536)!=0){
			bb_graphics_context.bbdevice.DrawSurface(bbimage.bbsurface,bbx-bbimage.bbtx,bby-bbimage.bbty);
		}else{
			bb_graphics_context.bbdevice.DrawSurface2(bbimage.bbsurface,bbx-bbimage.bbtx,bby-bbimage.bbty,bbf.bbx,bbf.bby,bbimage.bbwidth,bbimage.bbheight);
		}
	}
	return 0;
}
function bb_graphics_Rotate(bbangle){
	bb_graphics_Transform(Math.cos((bbangle)*0.0174532925),-Math.sin((bbangle)*0.0174532925),Math.sin((bbangle)*0.0174532925),Math.cos((bbangle)*0.0174532925),0.000000,0.000000);
	return 0;
}
function bb_graphics_Scale(bbx,bby){
	bb_graphics_Transform(bbx,0.000000,0.000000,bby,0.000000,0.000000);
	return 0;
}
function bb_graphics_DrawImage2(bbimage,bbx,bby,bbrotation,bbscaleX,bbscaleY,bbframe){
	var bbf=bbimage.bbframes[bbframe];
	bb_graphics_PushMatrix();
	bb_graphics_Translate(bbx,bby);
	bb_graphics_Rotate(bbrotation);
	bb_graphics_Scale(bbscaleX,bbscaleY);
	bb_graphics_Translate(-bbimage.bbtx,-bbimage.bbty);
	bb_graphics_ValidateMatrix();
	if((bbimage.bbflags&65536)!=0){
		bb_graphics_context.bbdevice.DrawSurface(bbimage.bbsurface,0.000000,0.000000);
	}else{
		bb_graphics_context.bbdevice.DrawSurface2(bbimage.bbsurface,0.000000,0.000000,bbf.bbx,bbf.bby,bbimage.bbwidth,bbimage.bbheight);
	}
	bb_graphics_PopMatrix();
	return 0;
}
function bb_Init(){
	bb_graphics_context=null;
	bb_input_device=null;
	bb_audio_device=null;
	bb_app_device=null;
	bb_witchblaster_gameapp=null;
	bb_graphics_Image_DefaultFlags=0;
	bb_resource_resources=bb_map_StringMap_new.call(new bb_map_StringMap);
	bb_random_Seed=1234;
	bb_cgameobject_GameObject_ShootOn=0;
	bb_cgameobject_GameObject_TransformOn=0;
}
//${TRANSCODE_END}

//This overrides print in 'std.lang/lang.js'
//
function print( str ){

	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
	}
	
	if( window.console!=undefined ){
		window.console.log( str );
	}
}
