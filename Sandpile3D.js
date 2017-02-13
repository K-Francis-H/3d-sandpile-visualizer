function Sandpile3D(l,w,h, startHgt){
	if(l === undefined || w === undefined || h === undefined){
		l = w = h = 20;
	}

	var TOPPLE_HGT;
	//3D
	if(l > 1 && w > 1 && h > 1){TOPPLE_HGT = 6;}
	//2D
	if((l === 1 && w !== 1 && h !== 1) ||
	   (l !== 1 && w === 1 && h !== 1) ||
	   (l !== 1 && w !== 1 && h === 1)){
		TOPPLE_HGT = 4;
	}
	//1D
	if((l === 1 && w === 1 && h !== 1) ||
	   (l !== 1 && w === 1 && h === 1) ||
	   (l === 1 && w !== 1 && h === 1)){
		TOPPLE_HGT = 2;
	}

	//const TOPPLE_HGT = 6;
	const START_HGT = startHgt || 7;

	const MAX_HGT = 12; //also max scale factor
	var cube = new Cube2(new Vector3(0,0,0), new Vector3(0,0,-1), new Vector3(0,1,0));

	var vbo = null;
	var nbo = null;
	var ibo = null; 

	//setup 3d array
	var sandpile = [];
	for(var i=0; i < l; i++){
		sandpile[i] = [];
		for(var j=0; j < w; j++){
			sandpile[i][j] = [];
			for(var k=0; k < h; k++){
				sandpile[i][j][k] = START_HGT;
			}
		}
	}

	//TODO maybe create array of cubes?

	//TODO slow cpu side reduction, see if you can use textre to move it to gpu
	this.update = function(){
		var needsUpdate = false;
		for(var i=0; i < l; i++){
			for(var j=0; j < w; j++){
				for(var k=0; k < h; k++){
					if(sandpile[i][j][k] >= TOPPLE_HGT){ //do the check here to avoid excess function calls
						needsUpdate = true;
						sandpile[i][j][k] -= TOPPLE_HGT;
						//inlined for speed
						if(i > 0){sandpile[i-1][j][k]++;}
						if(i < l-1){sandpile[i+1][j][k]++;}
						if(j > 0){sandpile[i][j-1][k]++;}
						if(j < w-1){sandpile[i][j+1][k]++;}
						if(k > 0){sandpile[i][j][k-1]++;}
						if(k < h-1){sandpile[i][j][k+1]++;}
					}
				}
			}
		}
		return needsUpdate;
	};

	//TODO alternatively add up all adjacent topples affecting this one as well as if it topples prior then record val and put into 2nd buffer
	//this should reduce weird evaluation artifacts, but requires more funciton calls
	var topple = function(x, y, z){
		sandpile[x][y][z] -= TOPPLE_HGT;

		if(x > 0){sandpile[x-1][y][z]++;}
		if(x < l-1){sandpile[x+1][y][z]++;}
		if(y > 0){sandpile[x][y-1][z]++;}
		if(y < w-1){sandpile[x][y+1][z]++;}
		if(z > 0){sandpile[x][y][z-1]++;}
		if(z < h-1){sandpile[x][y][z+1]++;}
	}

	var getColor = function(value){
		switch(value){
			default: return new Vector3(0.5,0.5,0.5);
			case 0: return new Vector3(0,0,0);
			case 1: return new Vector3(0,0,1);
			case 2: return new Vector3(0,1,0);
			case 3: return new Vector3(0,1,1);
			case 4: return new Vector3(1,0,0);
			case 5: return new Vector3(1,0,1);
			case 6: return new Vector3(1,1,0);
			case 7: return new Vector3(1,1,1);
			case 8: return new Vector3(0,0,0.5);
			case 9: return new Vector3(0,0.5,0);
			case 10: return new Vector3(0,0.5,0.5);
			case 11: return new Vector3(0.5,0,0);
			case 12: return new Vector3(0.5,0,0.5);
			case 13: return new Vector3(0.5,0.5,0);
			case 14: return new Vector3(0.5,0.5,0.5);
		}
	}

	//called once before the onset of drawing, should help speed stuff up
	this.initDrawingBuffers = function(gl, program){
		//init vbo, ibo, nbo

		if(vbo === null)
			vbo = gl.createBuffer();
		if(ibo === null);
			ibo = gl.createBuffer();
		if(nbo === null)
			nbo = gl.createBuffer();

		//console.log(cube.getVertices());
		//console.log(cube.getIndices());


		gl.bindBuffer(gl.ARRAY_BUFFER, nbo);
		gl.bufferData(gl.ARRAY_BUFFER, cube.getNormals(), gl.STATIC_DRAW);
		gl.vertexAttribPointer(program.a_Normal, 3, gl.FLOAT, gl.FALSE, 0, 0);
		gl.enableVertexAttribArray(program.a_Normal);

		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, cube.getVertices(), gl.STATIC_DRAW);
		gl.vertexAttribPointer(program.a_Position, 3, gl.FLOAT, gl.FALSE, 0, 0);
		gl.enableVertexAttribArray(program.a_Position);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cube.getIndices(), gl.STATIC_DRAW);
	};

	this.draw = function(gl, program){
		//TODO the fun part

		gl.useProgram(program);



		//so I can dynamically generate cubes with a scale factor or have a cube on hand and pass different model matrices
		//recentered to the correct offset with a scale factor for the cube to be rendered
		for(var i=0; i < l; i++){
			for(var j=0; j < w; j++){
				for(var k=0; k < h; k++){
					cube.getOrientation().setPos(new Vector3(i*MAX_HGT, j*MAX_HGT, k*MAX_HGT) );
					//TODO you should clamp this to only go up to MAX_HGT
					var scaleFactor = sandpile[i][j][k] <= MAX_HGT ? sandpile[i][j][k] : MAX_HGT; 
					cube.scale(scaleFactor, scaleFactor, scaleFactor);
					//cube.rotate(1,1,1);

					gl.uniformMatrix4fv(program.u_Model, gl.FALSE, cube.getOrientation().getModel().getFloat32Array() );
					
					var color = getColor(sandpile[i][j][k]);
					gl.uniform4f(program.u_Color,  color.r, color.g, color.b, 1.0);
					//cube.draw(gl, program);
					gl.drawElements(gl.TRIANGLES, cube.getIndices().length, gl.UNSIGNED_BYTE, 0);
				}
			}
		}
	}
}
