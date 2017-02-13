//KFH-Utilities.js
function Float32Concat(first, second)
{
    var firstLength = first.length,
        result = new Float32Array(firstLength + second.length);

    result.set(first);
    result.set(second, firstLength);

    return result;
}
function getRandom(min, max, isInt){
   if( isInt == null || !isInt || isInt == undefined) 
      return Math.random() * (max - min) + min;
   else
      return Math.floor(Math.random() * (max - min+1) + min);
}

function prepareProgramVariables(gl, program, uniforms, attributes){
   for(var i=0; i < uniforms.length; i++){
      program[uniforms[i]] = gl.getUniformLocation(program, uniforms[i]);
      if(program[uniforms[i]] === null){
         console.log("failed to init "+uniforms[i]);
      }
   }
   for(var i=0; i < attributes.length; i++){
      program[attributes[i]] = gl.getAttribLocation(program, attributes[i]);
      if(program[attributes[i]] === -1){
         console.log("failed to init "+attributes[i]);
      }
   }
}

//always returns int
function getOddRandom(min, max){
   var num = Math.floor(Math.random() * (max - min+1) + min);
   if(num % 2 == 0){
      if(num == min)
         num++;
      else
         num--;
   }
   return num;
}

function getIdentity4(){
   return new Float32Array([
   1, 0, 0, 0,
   0, 1, 0, 0,
   0, 0, 1, 0,
   0, 0, 0, 1]);
}

function modelMatrixFromPos(pos){
   return new Float32Array([
   1, 0, 0, pos.x,
   0, 1, 0, pos.y,
   0, 0, 1, pos.z,
   0, 0, 0, 1]);
}

//assumes power of 2 texture because there is no mip-mapping done here
function createTexture(gl, imagePath){
   var texture = gl.createTexture();
   var img = new Image();
   var loaded = false;
   img.onload = function(){
      //set unpacking mode
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, gl.TRUE);
      //bind texture
      gl.bindTexture(gl.TEXTURE_2D, texture);
      //send image data
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      //params
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      //unbind
      gl.bindTexture(gl.TEXTURE_2D, null);
   }
   img.src = imagePath;
   
   return texture;
}

function loadCubeMapTexture(gl, targetFace, texture, imgPath){
   var img = new Image();
   img.onload = function(){
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
      gl.texImage2D(targetFace, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
   }
   img.src = imgPath;
}

//TODO add error checking
function compileShaderProgram(gl, vSource, fSource){
   var program = gl.createProgram();

   var vShader = gl.createShader(gl.VERTEX_SHADER);
   gl.shaderSource(vShader, vSource);
   gl.compileShader(vShader);
   if(!gl.getShaderParameter(vShader, gl.COMPILE_STATUS))
      console.log("compilation of vertex shader failed: "+gl.getShaderInfoLog(vShader));

   var fShader = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(fShader, fSource);
   gl.compileShader(fShader);
   if(!gl.getShaderParameter(fShader, gl.COMPILE_STATUS))
      console.log("compilation of fragment shader failed: "+gl.getShaderInfoLog(fShader));

   //link program
   gl.attachShader(program, vShader);
   gl.attachShader(program, fShader);
   gl.linkProgram(program);

   if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
       alert("Unable to link program, check console for details.");
   }

   return program;
}

