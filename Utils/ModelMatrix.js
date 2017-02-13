//ModelMatrix() -> identity
//ModelMatrix(floatArr, false) -> colMajor array loaded
//ModleMatrix(floatArr, true) -> rowMajor array converted to colMajor and loaded


function ModelMatrix(){

   this.R = new Matrix4(); //rotation matrix
   this.S = new Matrix4(); //scale matrix
   this.T = new Matrix4(); //translation matrix

   //rotation angles for R
   this.xAng = this.yAng = this.zAng = 0;
   //scales for S
   this.xScale = this.yScale = this.zScale = 0;

   //TODO make this full featured so we can rotate and move along correct axes
   //this.u 
   //this.v
   //this.n

}


