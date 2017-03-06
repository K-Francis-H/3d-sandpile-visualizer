var VSHADER_SRC =
'attribute vec4 a_Position;\n' +
'attribute vec4 a_Color;\n'+
'attribute vec4 a_Normal;\n'+
'uniform mat4 u_Projection;\n' +
'uniform mat4 u_View;\n' +
'uniform mat4 u_Model;\n' +
'uniform vec4 u_Color;\n' +
'varying vec4 v_Color;\n' +
'void main(){\n' +
'   //gl_PointSize = 2.0;\n'+
'   gl_Position = u_Projection * u_View * u_Model * a_Position;\n' +
'   //vec3 normal = normalize(vec3( transpose(inv(u_Model)) * a_Normal));\n'+ //TODO lol this does not matter, we are rotating the camera not the object
'   vec3 lightDir = vec3(-0.5, -0.3, -1.0);\n'+
'   vec3 lightColor = vec3(0.9,0.9,0.9);\n'+
'   vec3 ambientColor = vec3(0.05,0.05,0.05);\n'+
'   float nDotL = max(dot(lightDir,vec3(a_Normal)),0.0);\n'+
'   vec3 diffuse = lightColor * vec3(u_Color) *  nDotL;\n'+ 
'   v_Color = vec4((diffuse+ambientColor),1);\n'+
'   //v_Color = dot(vec4(-1.0,1.0,0.0,1.0),a_Normal) * 0.8 * u_Color ;//u_Color;//vec4(1.0,1.0,1.0,1.0);\n' +
'   //v_Color = dot(vec4(1.0,0.0,0.0,1.0),a_Normal) * vec4(0.2,0.5,0.6,1.0) * u_Color ;\n'+
'   //v_Color = u_Color;\n'+ 
'}\n';


var FSHADER_SRC = 
'#ifdef GL_ES\n' +
'precision mediump float;\n' +
'#endif\n' +
'varying vec4 v_Color;\n' +
'void main(){\n' +
' gl_FragColor = v_Color;\n' +
'}\n';


window.onload = function(){
	var canvas = document.getElementById("canvas");
	canvas.onclick = function(){
	  if(canvas.mozRequestFullScreen){
		 canvas.mozRequestFullScreen();
	  }
	  else{
		 canvas.webkitRequestFullScreen();

	  }
	  	onCanvasChange();
	}
	function onCanvasChange(){
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		gl.viewport(0,0,canvas.width,canvas.height);
		cam.setShape(80, canvas.width/canvas.height, 0.125, 3000);
	}
	var gl = canvas.getContext("webgl2") || canvas.getContext("webgl2-experimental") || canvas.getContext("webgl"); //preserve drawing buffer so we may take pictures

	//TODO error checking
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LESS);
	gl.enable(gl.CULL_FACE);
	gl.cullFace(gl.BACK);
	gl.clearColor(0,0,0,1);

	var program = compileShaderProgram(gl, VSHADER_SRC, FSHADER_SRC);
	var uniforms = ['u_Model', 'u_View', 'u_Projection', 'u_Color'];
	var attribs = ['a_Position', 'a_Normal'];
	prepareProgramVariables(gl, program, uniforms, attribs);

	var eye = new Vector3/*(-25, 11*6, -25);*/(-25, -35, -25);
	var look = new Vector3/*(11*6,11*6,11*6);*/(0,0,0);
	var up = new Vector3(0,1,0);
	var cam =  new Camera(eye, look, up);
	cam.setShape(80, canvas.width/canvas.height, 0.125, 3000);

	var cube = new Cube2(new Vector3(0,0,0),
			     new Vector3(0,0,1),
			     new Vector3(0,1,0)				
			);

	

	gl.useProgram(program);
	gl.uniformMatrix4fv(program.u_Model, gl.FALSE, getIdentity4());
	gl.uniformMatrix4fv(program.u_View, gl.FALSE, cam.View);
	gl.uniformMatrix4fv(program.u_Projection, gl.FALSE, cam.Projection);
	//gl.uniform4f(program.u_Color, 1.0, 0.0, 0.0, 1.0);


	//cube.draw(gl, program);

	var sandpile = new Sandpile3D(11,11,11,24);
	sandpile.initDrawingBuffers(gl, program);
	sandpile.draw(gl, program);
	var loopCtl = setInterval(renderLoop, 1000/30);
	
	function renderLoop(){
		if(sandpile.update()){
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

				//NOTE uncomment the cam.roll OR cam.slide lines and the gl.uniform... lines in order to add rotation
				//cam.roll(1);

				//cam.slide(10,0,0);
				//cam.lookAt(new Vector3(11*6,11*6,11*6));

				//gl.uniformMatrix4fv(program.u_View, gl.FALSE, cam.View);
				//gl.uniformMatrix4fv(program.u_Projection, gl.FALSE, cam.Projection);

				sandpile.draw(gl, program);
			}else{
				clearInterval(loopCtl);
			}
	}



	//attach reset listener
	document.getElementById("reset-button").onclick = function(){
		clearInterval(loopCtl);
		let x = document.getElementById("x-dim").value;
		let y = document.getElementById("y-dim").value;
		let z = document.getElementById("z-dim").value;
		if(x === NaN || y === NaN || z === NaN){
			sandpile = new Sandpile3D(11,11,11,24);
		}
		else{
			sandpile = new Sandpile3D(x,y,z,24);
		}
		sandpile.initDrawingBuffers(gl, program);
		sandpile.draw(gl, program);
		loopCtl = setInterval(renderLoop, 1000/30);
	};

};
