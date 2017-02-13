//Vector3.js

function Vector3(x, y, z){
   this.x = x;
   this.y = y;
   this.z = z;
   //for colors
   this.r = x;
   this.g = y;
   this.b = z;
   
   //methods
   this.set3f = set3f;
   this.setv = setv;
   this.flip = flip;
   this.setDiff = setDiff;
   this.normalize = normalize;
   this.distance = distance;
   this.cross = cross;
   this.dot = dot;
}
//implement methods here

function set3f(x, y, z){
   this.x = x;
   this.y = y;
   this.z = z;
   //for colors
   this.r = x;
   this.g = y;
   this.b = z;
}

function setv(vec){
   this.x = vec.x;
   this.y = vec.y;
   this.z = vec.z;
   //for colors
   this.r = vec.x;
   this.g = vec.y;
   this.b = vec.z;
}

function flip(){
   this.x = -this.x;
   this.y = -this.y;
   this.z = -this.z;
   //for colors
   this.r = -this.r;
   this.g = -this.g;
   this.b = -this.b;
}

function setDiff(a, b){
   this.x = a.x - b.x;
   this.y = a.y - b.y;
   this.z = a.z - b.z;
   //for colors
   this.r = this.x;
   this.g = this.y;
   this.b = this.z;
}

function normalize(){
   var x2 = this.x*this.x;
   var y2 = this.y*this.y;
   var z2 = this.z*this.z;
   var magnitude = Math.sqrt(x2+y2+z2);
   this.x = this.x/magnitude;
   this.y = this.y/magnitude;
   this.z = this.z/magnitude;
   this.r = this.x;
   this.g = this.y;
   this.b = this.z;
}

function cross(vec){
   return new Vector3((this.y*vec.z-this.z*vec.y),(-this.x*vec.z+this.z*vec.x),(this.x*vec.y-this.y*vec.x));
}

function dot(vec){
   return (this.x*vec.x + this.y*vec.y + this.z*vec.z);
}

function distance(vec){
   return Math.sqrt( Math.pow((this.x - vec.x), 2) 
                   + Math.pow((this.y - vec.y), 2) 
                   + Math.pow((this.z - vec.z), 2) );

}

