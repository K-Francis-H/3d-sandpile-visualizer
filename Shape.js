//alows for the orientation of shapes that can move
//the vectors are vital to this, if it doesnt move just use 
//a Matrix4
function Shape(pos, front, up){
   
   var xAng, yAng, zAng;
   var xScale, yScale, zScale;
   var position;
   var u, v, n;

   var R = new Matrix4();
   var T = new Matrix4();
   var S = new Matrix4();
   //var model = new Matrix4();
   //var matrixStack = [];

   xAng = yAng = zAng = 0;
   xScale = yScale = zScale = 1;

   if(arguments.length === 0){

      position = new Vector3(0,0,0);
      u = new Vector3(1,0,0);
      v = new Vector3(0,1,0);
      n = new Vector3(0,0,1);
   }
   else if(arguments.length === 3){
      position = new Vector3(pos.x, pos.y, pos.z); //careful this leaves us open to external manipulation because this is just a reference
      n = new Vector3(position.x - front.x, position.y - front.y, position.z - front.z);
      u = up.cross(n);
      v = n.cross(u);
   }else{
      //TODO error! panic
   }
   setR();
   setT();
   setS();

   function rotateX(){
      var cs = Math.cos(Math.PI * xAng/180);
      var sn = Math.sin(Math.PI * xAng/180);

      n.set3f( n.x, cs*n.y - sn*n.z, sn*n.y + cs*n.z );
      u.set3f( u.x, cs*u.y - sn*u.z, sn*u.y + cs*u.z );
      v.set3f( v.x, cs*v.y - sn*v.z, sn*v.y + cs*v.z );
   }

   function rotateY(){
      var cs = Math.cos(Math.PI * yAng/180);
      var sn = Math.sin(Math.PI * yAng/180);

      n.set3f( cs*n.x + sn*n.z, n.y, -sn*n.x + cs*n.z );
      u.set3f( cs*u.x + sn*u.z, u.y, -sn*u.x + cs*u.z );
      v.set3f( cs*v.x + sn*v.z, v.y, -sn*v.x + cs*v.z );
   }

   function rotateZ(){
      var cs = Math.cos(Math.PI * zAng/180);
      var sn = Math.sin(Math.PI * zAng/180);

      n.set3f( cs*n.x - sn*n.z, sn*n.x + cs*n.z, n.z );
      u.set3f( cs*u.x - sn*u.z, sn*u.x + cs*u.z, u.z );
      v.set3f( cs*v.x - sn*v.z, sn*v.x + cs*v.z, v.z );
   }

   function setT(){
      var t = new Float32Array(16);
      t[0] = 1; t[4] = 0; t[8] = 0;  t[12] = position.x;
      t[1] = 0; t[5] = 1; t[9] = 0;  t[13] = position.y;
      t[2] = 0; t[6] = 0; t[10] = 1; t[14] = position.z;
      t[3] = 0; t[7] = 0; t[11] = 0; t[15] = 1;	
      T.set(t, false);
   }

   function setS(){
      var s = new Float32Array(16);
      s[0] = xScale; s[4] = 0;      s[8] = 0;       s[12] = 0;
      s[1] = 0;      s[5] = yScale; s[9] = 0;       s[13] = 0;
      s[2] = 0;      s[6] = 0;      s[10] = zScale; s[14] = 0;
      s[3] = 0;      s[7] = 0;      s[11] = 0;      s[15] = 1;
		
      S.set(s, false);
   }

   function setR(){
      var m = new Float32Array(16);
      var csx = Math.cos(Math.PI * xAng/180);
      var snx = Math.sin(Math.PI * xAng/180);
      var csy = Math.cos(Math.PI * yAng/180);
      var sny = Math.sin(Math.PI * yAng/180);
      var csz = Math.cos(Math.PI * zAng/180);
      var snz = Math.sin(Math.PI * zAng/180);

      m[0] = (csy*csz);              m[4] = (-csy*snz);             m[8] = sny;        m[12] = 0;//position.x();
      m[1] = (snx*sny*csz+csx*snz);  m[5] = (-snx*sny*snz+csx*csz); m[9] = (-snx*csy); m[13] = 0;//position.y();
      m[2] = (-csx*sny*csz+snx*snz); m[6] = (csx*sny*snz+snx*csz);  m[10] = (csx*csy); m[14] = 0;//position.z();
      m[3] = 0;                      m[7] = 0;                      m[11] = 0;         m[15] = 1;

      R.set(m, false);
   }

   this.independentRotate = function(xa, ya, za){
      //console.log("entered rotate: xAng= "+xAng);
      if(xa !== 0){
         xAng = (xAng + xa);//%360;
         //rotateX();
      }
      if(ya !== 0){
         yAng = (yAng + ya);//%360;
         //rotateY();
      }
      if(za !== 0){
         zAng = (zAng + za);//%360;
         //rotateZ(); we don't change our vector directions
      }

      setR();
   }

   this.rotate = function(xa, ya, za){
      //console.log("entered rotate: xAng= "+xAng);
      if(xa !== 0){
         xAng = (xAng + xa);//%360;
         rotateX();
      }
      if(ya !== 0){
         yAng = (yAng + ya);//%360;
         rotateY();
      }
      if(za !== 0){
         zAng = (zAng + za);//%360;
         rotateZ();
      }

      setR();
   }

   this.scale = function(xs, ys, zs){
      xScale = xs;
      yScale = ys;
      zScale = zs;
      setS();
   }

   this.translate = function(delU, delV, delN){
      position.set3f( position.x + delU*u.x + delV*v.x + delN*n.x,
                      position.y + delU*u.y + delV*v.y + delN*n.y,
                      position.z + delU*u.z + delV*v.z + delN*n.z);
      setT();
   }

   this.getModel = function(){
      return T.multiplyMatrix4(R.multiplyMatrix4(S)); // = S * R * T
   }

   this.getPosition = function(){
      return position;
   }

   //CRUFTY only returns x scale (assummes we have uniform scale)
   this.getScale = function(){
      return xScale;
   }

   this.setPos = function(pos){ /*Vector3*/
      position.x = pos.x;
      position.y = pos.y;
      position.z = pos.z;
      setT();
   }
   
   this.getR = function(){
      return R;
   };

   this.getS = function(){
      return S;
   };
}
