//Cube.js
function Cube(x, y, z, flag, scale){
   this.pos = new Vector3(x, y, z); //origin of draw function => replaces model matrix
   var WIREFRAME = 1;
   var TRIANGLE = 0;
   var TEXTURE = 3;
   this.mode = flag;
   this.scale = (scale != null ? scale : 1);
   var s = this.scale/2;
   var p = this.pos; //temp for generating vertices
   if(flag === WIREFRAME){
      this.vertices = new Float32Array([
      //bottom face
      p.x-s, p.y-s, p.z+s,  p.x+s, p.y-s, p.z+s,
      p.x+s, p.y-s, p.z+s,  p.x+s, p.y-s, p.z-s,
      p.x+s, p.y-s, p.z-s,  p.x-s, p.y-s, p.z-s,
      p.x-s, p.y-s, p.z-s,  p.x-s, p.y-s, p.z+s,
      //top face
      p.x-s, p.y+s, p.z+s,  p.x+s, p.y+s, p.z+s,
      p.x+s, p.y+s, p.z+s,  p.x+s, p.y+s, p.z-s,
      p.x+s, p.y+s, p.z-s,  p.x-s, p.y+s, p.z-s,
      p.x-s, p.y+s, p.z-s,  p.x-s, p.y+s, p.z+s,
      //connecting lines
      p.x-s, p.y-s, p.z+s,  p.x-s, p.y+s, p.z+s,
      p.x-s, p.y-s, p.z-s,  p.x-s, p.y+s, p.z-s,
      p.x+s, p.y-s, p.z-s,  p.x+s, p.y+s, p.z-s,
      p.x+s, p.y-s, p.z+s,  p.x+s, p.y+s, p.z+s
      ]);   
   }
   else if(flag === TRIANGLE){
      this.vertices = new Float32Array([
      //bottom face
      p.x-s, p.y-s, p.z-s, p.x+s, p.y-s, p.z-s, p.x-s, p.y-s, p.z+s,
      p.x+s, p.y-s, p.z-s, p.x-s, p.y-s, p.z+s, p.x+s, p.y-s, p.z+s,
      //top face
      p.x-s, p.y+s, p.z-s, p.x+s, p.y+s, p.z-s, p.x-s, p.y+s, p.z+s,
      p.x+s, p.y+s, p.z-s, p.x-s, p.y+s, p.z+s, p.x+s, p.y+s, p.z+s,
      //side face (positive z)
      p.x-s, p.y+s, p.z+s, p.x+s, p.y+s, p.z+s, p.x-s, p.y-s, p.z+s,
      p.x+s, p.y+s, p.z+s, p.x-s, p.y-s, p.z+s, p.x+s, p.y-s, p.z+s,
      //side face (negative z)
      p.x-s, p.y+s, p.z-s, p.x+s, p.y+s, p.z-s, p.x-s, p.y-s, p.z-s,
      p.x+s, p.y+s, p.z-s, p.x-s, p.y-s, p.z-s, p.x+s, p.y-s, p.z-s,
      //side face (positive x)
      p.x+s, p.y+s, p.z+s, p.x+s, p.y+s, p.z-s, p.x+s, p.y-s, p.z+s,
      p.x+s, p.y+s, p.z-s, p.x+s, p.y-s, p.z+s, p.x+s, p.y-s, p.z-s,
      //side face(negative x)
      p.x-s, p.y+s, p.z+s, p.x-s, p.y+s, p.z-s, p.x-s, p.y-s, p.z+s,
      p.x-s, p.y+s, p.z-s, p.x-s, p.y-s, p.z+s, p.x-s, p.y-s, p.z-s]);
   }
   else{//TEXTURE
     /* this.vertices = new Float32Array([
      p.x+s, p.y+s, p.z+s, p.x-s, p.y+s, p.z+s, p.x-s, p.y-s, p.z+s, //v0, v1, v2
      p.x+s, p.y+s, p.z+s, p.x-s, p.y-s, p.z+s, p.x+s, p.y-s, p.z+s, //v0, v2, v3
      p.x+s, p.y+s, p.z+s, p.x+s, p.y-s, p.z+s, p.x+s, p.y-s, p.z-s, //v0, v3, v4
      p. */
      this.faces = new Array(6);
      this.faces[0] = new Float32Array([//front posZ
      p.x-s, p.y-s, p.z+s, 0.0, 0.0, 
      p.x+s, p.y-s, p.z+s, 1.0, 0.0, 
      p.x-s, p.y+s, p.z+s, 0.0, 1.0,
      p.x+s, p.y+s, p.z+s, 1.0, 1.0]);
      this.faces[1] = new Float32Array([//right posX
      p.x+s, p.y-s, p.z+s, 0.0, 0.0, 
      p.x+s, p.y-s, p.z-s, 1.0, 0.0, 
      p.x+s, p.y+s, p.z+s, 0.0, 1.0,
      p.x+s, p.y+s, p.z-s, 1.0, 1.0]);
      this.faces[2] = new Float32Array([//back negZ
      p.x+s, p.y-s, p.z-s, 0.0, 0.0, 
      p.x-s, p.y-s, p.z-s, 1.0, 0.0, 
      p.x+s, p.y+s, p.z-s, 0.0, 1.0,
      p.x-s, p.y+s, p.z-s, 1.0, 1.0]);
      this.faces[3] = new Float32Array([//left negX
      p.x-s, p.y-s, p.z-s, 0.0, 0.0, 
      p.x-s, p.y-s, p.z+s, 1.0, 0.0, 
      p.x-s, p.y+s, p.z-s, 0.0, 1.0,
      p.x-s, p.y+s, p.z+s, 1.0, 1.0]);     
     /* this.vertices = new Float32Array([
      //bottom face
      p.x-s, p.y-s, p.z-s, p.x+s, p.y-s, p.z-s, p.x-s, p.y-s, p.z+s,
      p.x+s, p.y-s, p.z-s, p.x-s, p.y-s, p.z+s, p.x+s, p.y-s, p.z+s,
 //tex coords
      //top face
      p.x-s, p.y+s, p.z-s, p.x+s, p.y+s, p.z-s, p.x-s, p.y+s, p.z+s,
      p.x+s, p.y+s, p.z-s, p.x-s, p.y+s, p.z+s, p.x+s, p.y+s, p.z+s,
 //tex coords
      //side face (positive z)
      p.x-s, p.y+s, p.z+s, p.x+s, p.y+s, p.z+s, p.x-s, p.y-s, p.z+s,
      p.x+s, p.y+s, p.z+s, p.x-s, p.y-s, p.z+s, p.x+s, p.y-s, p.z+s,
 //tex coords
      //side face (negative z)
      p.x-s, p.y+s, p.z-s, p.x+s, p.y+s, p.z-s, p.x-s, p.y-s, p.z-s,
      p.x+s, p.y+s, p.z-s, p.x-s, p.y-s, p.z-s, p.x+s, p.y-s, p.z-s,
 //tex coords
      //side face (positive x)
      p.x+s, p.y+s, p.z+s, p.x+s, p.y+s, p.z-s, p.x+s, p.y-s, p.z+s,
      p.x+s, p.y+s, p.z-s, p.x+s, p.y-s, p.z+s, p.x+s, p.y-s, p.z-s,
 //tex coords
      //side face(negative x)
      p.x-s, p.y+s, p.z+s, p.x-s, p.y+s, p.z-s, p.x-s, p.y-s, p.z+s,
      p.x-s, p.y+s, p.z-s, p.x-s, p.y-s, p.z+s, p.x-s, p.y-s, p.z-s
]); //tex coords
      this.texCoords = new Float32Array([
      0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0,//bottom
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0,//top
      1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0,//pos z
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0,//neg z
      1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,//pos x
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0]);//neg x
   }*/
      
     
   //DO NOT USE FOR STATIC OBJECTS
   //ELSE WE NEED A MODEL MATRIX FOR EACH STATIC CUBE
   /*this.vertices = new Float32Array([
   //bottom face
   -0.5, -0.5,  0.5,   0.5, -0.5,  0.5,
    0.5, -0.5,  0.5,   0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,  -0.5, -0.5, -0.5,
   -0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,
   //top face
   -0.5, 0.5,  0.5,   0.5, 0.5,  0.5,
    0.5, 0.5,  0.5,   0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,  -0.5, 0.5, -0.5,
   -0.5, 0.5, -0.5,  -0.5, 0.5,  0.5,  
   //connecting lines
   -0.5, -0.5,  0.5,  -0.5, 0.5,  0.5,
    0.5, -0.5,  0.5,   0.5, 0.5,  0.5, 
    0.5, -0.5, -0.5,   0.5, 0.5, -0.5,
   -0.5, -0.5, -0.5,  -0.5, 0.5, -0.5
    ]);*/
   
     
   //methods
   this.setScale = setScale;
   //this.getCollisionPlanes = getCollisionPlanes;
}

function setScale(scale){
   this.scale = scale;
   //overwrite buffer with new array
}

//alternatively verts may be combined fro fast array drawing
this.draw = function(gl, program){
   //set uniforms before calling this function
   if(this.mode === WIREFRAME){
      //TODO
   }
   else if(this.mode === TRIANGLE){
      //TODO
   }
   else{//mode === TEXTURE
      //TODO
   }
}
}
//gl - webgl context

   
