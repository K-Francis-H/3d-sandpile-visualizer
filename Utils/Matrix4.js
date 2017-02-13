//ModelMatrix() -> identity
//ModelMatrix(floatArr, false) -> colMajor array loaded
//ModleMatrix(floatArr, true) -> rowMajor array converted to colMajor and loaded

function Matrix4(floatArr, transpose){



   if(floatArr == undefined) //set to identity
      this.values = new Float32Array([
         1, 0, 0, 0,
         0, 1, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1]);
    else //take given value
      this.values = floatArr;
   
   var transpose = (transpose == undefined) ? false : transpose;
   if(transpose) //in row major -> transpose array
      transpose();

}

Matrix4.prototype.set = function(floatArr, transpose){
      if(floatArr == undefined) //set to identity
      this.values = new Float32Array([
         1, 0, 0, 0,
         0, 1, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1]);
    else //take given value
      this.values = floatArr;
   
   var transpose = (transpose == undefined) ? false : transpose;
   if(transpose) //in row major -> transpose array
      transpose();
}

Matrix4.prototype.addMatrix4 = function(mat){
   var b = mat.getFloat32Array();
   for(var i=0; i < Matrix4.LENGTH; i++)
      this.values[i] += b[i];
}

Matrix4.prototype.addScalar = function(scalar){
   for(var i=0; i < Matrix4.LENGTH; i++)
      this.values[i] += scalar;
}

Matrix4.prototype.subtractMatrix4 = function(mat){
   var b = mat.getFloat32Array();
   for(var i=0; i < Matrix4.LENGTH; i++)
      this.values[i] -= b[i];
}

Matrix4.prototype.multiplyMatrix4 = function(mat){
	   var result = new Float32Array(Matrix4.LENGTH);
	   var b = mat.getFloat32Array();
	   for(var i=0; i < Matrix4.SIZE; i++)
	      for(var j=0; j < Matrix4.SIZE; j++)
                 for(var k=0; k < Matrix4.SIZE; k++)
		     result[i*Matrix4.SIZE+j] += this.values[k*Matrix4.SIZE+j]*b[i*Matrix4.SIZE+k];

	   return new Matrix4(result, false);
}


Matrix4.prototype.transpose = function(){
   var tmp = new Float32Array(Matrix4.LENGTH);
   for(var i=0; i < Matrix4.ROWS; i++)
      for(var j=0; j < Matrix4.COLS; i++)
         tmp[i*Matrix4.SIZE+j] = this.values[j*Matrix4.SIZE+i];
   this.values = tmp;
}

Matrix4.prototype.getFloat32Array = function(){
   return this.values;
}

//unneccesary...
//Matrix4.identity = function(){
//   return new Matrix4(new Floa32Arra

Matrix4.multiplyVec3 = function(mat4, vec3){
   var outVector = [0,0,0,0];
   var v = [vec3.x, vec3.y, vec3.z, 0];
   var m = mat4.getFloat32Array();
   for(var i=0; i < Matrix4.ROWS; i++){
      for(var j=0; j < Matrix4.COLS; j++){
         outVector[i] += m[i*Matrix4.SIZE+j] * v[j];
      }
   }
   var v3 =  new Vector3(outVector[0], outVector[1], outVector[2]);
   //console.log(v3);
   return v3;
}

Matrix4.rotationMatrix = function(xAng, yAng, zAng){
   var csx = Math.cos(Math.PI * xAng/180);
   var snx = Math.sin(Math.PI * xAng/180);
   var csy = Math.cos(Math.PI * yAng/180);
   var sny = Math.sin(Math.PI * yAng/180);
   var csz = Math.cos(Math.PI * zAng/180);
   var snz = Math.sin(Math.PI * zAng/180);
   var a = new Float32Array(Matrix4.LENGTH);

   a[0] = csy*csz;              a[4] = -csy*snz;             a[8] = sny;      a[12] = 0;
   a[1] = snx*sny*csz+csx*snz;  a[5] = -snx*sny*snz+csx*csz; a[9] = -snx*csy; a[13] = 0;
   a[2] = -csx*sny*csz+snx*snz; a[6] = csx*sny*snz+snx*csz;  a[10] = csx*csy; a[14] = 0;
   a[3] = 0;                    a[7] = 0;                    a[11] = 0;       a[15] = 1;

   return new Matrix4(a, false);
}

Matrix4.translationMatrix = function(xOff, yOff, zOff){
   var a = new Float32Array(Matrix4.LENGTH);
   
   a[0] = 1; a[4] = 0; a[8] = 0;  a[12] = xOff;
   a[1] = 0; a[5] = 1; a[9] = 0;  a[13] = yOff;
   a[2] = 0; a[6] = 0; a[10] = 1; a[14] = zOff;
   a[3] = 0; a[7] = 0; a[11] = 0; a[15] = 1;
	   
   return new Matrix4(a, false);
}

Matrix4.scaleMatrix = function(xs, ys, zs){
   var a = new Float32Array(Matrix4.LENGTH);
	   
   a[0] = xs; a[4] = 0;  a[8] = 0;   a[12] = 0;
   a[1] = 0;  a[5] = ys; a[9] = 0;   a[13] = 0;
   a[2] = 0;  a[6] = 0;  a[10] = zs; a[14] = 0;
   a[3] = 0;  a[7] = 0;  a[11] = 0;  a[15] = 1;
	   
   return new Matrix4(a, false);
}

   Matrix4.LENGTH = 16;
   Matrix4.ROWS = Matrix4.COLS = Matrix4.SIZE = 4;
