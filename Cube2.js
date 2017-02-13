function Cube2(pos, front, up){
   //Cube2.prototype.vbo = null;
   //Cube2.prototype.ibo = null;
   //Cube2.prototype.nbo = null;
   //Cube2.prototype.isInit = false;

   var vbo = null, ibo = null, nbo = null;
   //console.log(pos);
   var orientation = new Shape(pos, front, up);
   //console.log(orientation.getPosition());
//console.log(orientation.getModel());

  /* var verts = new Float32Array([
   //bottom square
   0.5, -0.5,  0.5, //v0
   0.5, -0.5, -0.5, //v1      v6____v5
  -0.5, -0.5, -0.5, //v2      /|   /| 
  -0.5, -0.5,  0.5, //v3   v7/_|__/4|
   //top square              |v2  | |
   0.5,  0.5,  0.5, //v4     |/ --|-/v1
   0.5,  0.5, -0.5, //v5     -----|/
  -0.5,  0.5, -0.5, //v6    v3    v0
  -0.5,  0.5,  0.5, //v7
   ]);

   //following the elements below
   var normals = new Float32Array([
   1,0,0,  1,0,0,  1,0,0, //0,1,5 right face
   1,0,0,  1,0,0,  1,0,0, //5,4,0 right face
   0,0,-1, 0,0,-1, 0,0,-1, //1,2,6 back face
   0,0,-1, 0,0,-1, 0,0,-1, //6,5,1 back face
   -1,0,0, -1,0,0, -1,0,0, //2,3,7 left face
   -1,0,0, -1,0,0, -1,0,0, //7,6,2 left face
   0,0,1,   0,0,1,  0,0,1, //3,0,4 front face
   0,0,1,   0,0,1,  0,0,1, //4,7,3 front face
   0,-1,0,  0,-1,0, 0,-1,0, //0,3,2 bottom face
   0,-1,0,  0,-1,0, 0,-1,0, //2,1,0 bottom face
   0,1,0,   0,1,0,  0,1,0,   //7,4,5 top face
   0,1,0,   0,1,0,  0,1,0    //5,6,7 top face 
   ]);

   var normals = new Float32Array([
    1, 0, 0,  1,0,0,  1,0,0, 1,0,0, //right face 0,1,5,4
    0, 0, -1,  0,0,-1, 0,0,-1, 0,0,-1, //back face 1,2,6,5
    -1,0,0 -1,0,0 -1,0,0 -1,0,0,      //left face 2,3,7,6
    0,0,1, 0,0,1, 0,0,1, 0,0,1,       //front face 3,0,4,7
    0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,   //bottom face 0,3,2,1
    0,1,0, 0,1,0, 0,1,0, 0,1,0        //top face 7,4,5,6
   ]);

   var elements = new Uint8Array([
   0,1,5, 5,4,0, //right face
   1,2,6, 6,5,1, //back face
   2,3,7, 7,6,2, //left face
   3,0,4, 4,7,3, //front face
   0,3,2, 2,1,0, //bottom face
   7,4,5, 5,6,7 //top face
   ]);*/

  //TODO NOTE Above did not work because #verts MUST === #normals

  //TODO this is not oriented correctly

  var vertices = new Float32Array([
     0.5, 0.5, 0.5,  -0.5, 0.5, 0.5,  -0.5,-0.5, 0.5,   0.5,-0.5, 0.5, // v0-v1-v2-v3 front
     0.5, 0.5, 0.5,   0.5,-0.5, 0.5,   0.5,-0.5,-0.5,   0.5, 0.5,-0.5, // v0-v3-v4-v5 right
     0.5, 0.5, 0.5,   0.5, 0.5,-0.5,  -0.5, 0.5,-0.5,  -0.5, 0.5, 0.5, // v0-v5-v6-v1 up
    -0.5, 0.5, 0.5,  -0.5, 0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5,-0.5, 0.5, // v1-v6-v7-v2 left
    -0.5,-0.5,-0.5,   0.5,-0.5,-0.5,   0.5,-0.5, 0.5,  -0.5,-0.5, 0.5, // v7-v4-v3-v2 down
     0.5,-0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5, 0.5,-0.5,   0.5, 0.5,-0.5  // v4-v7-v6-v5 back
  ]);

  /*var vertices = new Float32Array([
	
  ]);*/

  var vertices2 = new Float32Array([
     -1,0,0, 0,0,-0.5, 0,0.5,0,
     -1,0,0, 0,0.5,0, 0,0,0.5,
     -1,0,0, 0,0,0.5, 0,-0.5,0,
     -1,0,0, 0,-0.5,0, 0,0,-0.5
  ]);

  var normals = new Float32Array([
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
  ]);

  // Indices of the vertices
  var indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
 ]);



   this.draw = function(gl, program){
      gl.useProgram(program);

      gl.uniformMatrix4fv(program.u_Model, gl.FALSE, orientation.getModel().getFloat32Array() );
      
      /*if(!Cube2.prototype.isInit){
         Cube2.prototype.vbo = gl.createBuffer();
         Cube2.prototype.nbo = gl.createBuffer();
         Cube2.prototype.ibo = gl.createBuffer();
         Cube2.prototype.isInit = true;
      }*/
      if(vbo === null)
         vbo = gl.createBuffer();
      if(ibo === null);
         ibo = gl.createBuffer();
      if(nbo === null)
         nbo = gl.createBuffer();
      

      //TODO maybe normals arent getting through because of indices...
      gl.bindBuffer(gl.ARRAY_BUFFER, nbo);
      gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
      gl.vertexAttribPointer(program.a_Normal, 3, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(program.a_Normal);

      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.vertexAttribPointer(program.a_Position, 3, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(program.a_Position);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);


      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
      //gl.drawArrays(gl.TRIANGLES, 0, vertices.length/3);

      //ss.draw(gl,program);
  };

  this.independentRotate = function(xAng, yAng, zAng){
     orientation.independentRotate(xAng, yAng, zAng);
  };

  this.rotate = function(xAng, yAng, zAng){
     orientation.rotate(xAng, yAng, zAng);
  };

  this.slide = function(delX, delY, delZ){
     orientation.translate(delX, delY, delZ);
  };

  this.scale = function(xs, ys, zs){
     orientation.scale(xs, ys, zs);
  };

  this.getPosition = function(){
     return orientation.getPosition();
  };

  this.getSize = function(){
     return orientation.getScale();
  };

  this.setPos = function(pos){
     orientation.setPos(pos);
  };

  this.getOrientation = function(){
     return orientation;
  };

  this.getNormals = function(){
	return normals;
  };

  this.getIndices = function(){
	return indices;
  };

  this.getVertices = function(){
	return vertices;
  };
}
