var matrixMath = function(){
	var _self = this;
	var VMath = new vectorMath();

	//矩阵的乘法
	_self.multiply = function (A,B) {
		var C = false;
		if(A[0].length == B.length && _self.judgeMatrix(A) && _self.judgeMatrix(B)){
			C = [];
			for (var i = 0; i < A.length; i++) {
				var item = [];
				for (var j = 0; j < B[0].length; j++) {
					var vectorA = A[i];
					var vectorB = _self.matrixCol(B,j);
					item.push(VMath.PBmultiply(vectorA,vectorB));
				};
				C.push(item);
			};
		}
		return C;
	}//end func

	//向量与矩阵的乘法
	_self.vectorMultiply = function (V,M) {
		var val = false;
		if(V.length == M.length && _self.judgeMatrix(M)){
			val = [];
			for (var i = 0; i < M[0].length; i++) {
				var item = _self.matrixCol(M,i);
				val.push(VMath.PBmultiply(V,item));
			};
		}
		return val;
	}//end func

	//求矩阵的逆
	_self.inverse = function (M){
		var val = false;
		var det = _self.det(M);
		if(det){
			val = [];
			var l = M.length;
			for (var i = 0; i < l; i++) {
				val.push([]);
			};
			for (var i = 0; i < l; i++) {
				for (var j = 0; j < l; j++) {
					val[j][i] = _self.cofactor(i,j,M) / det;
				};
			};
		}
		return val;
	}//end func

	//求矩阵的行列式
	_self.det = function (M) {
		var val = false;
		if(M.length == M[0].length && _self.judgeMatrix(M)){
			val = 0;
			// for (var i = 0; i < l; i++) {//对角线法求三阶矩阵的行列式
			// 	var add = 1;
			// 	var sub = 1;
			// 	for (var j = 0; j < M[0].length; j++) {
			// 		add = add * M[j][i+j >= l ? i+j-l : i+j];
			// 		sub = sub * M[j][i-j < 0 ? i-j+l : i-j];
			// 	};
			// 	val += add - sub;
			// };
			val = _contDet(M);
		}
		return val;
	}//end func

	//计算矩阵的行列式
	function _contDet (M) {
		var l = M.length;
		var val = 0;
		if(l == 2){
			return M[0][0] * M[1][1] - M[1][0] * M[0][1];
		}
		else{
			for (var i = 0; i < l; i++) {
				val += _self.cofactor(0,i,M) * M[0][i];
			};
		}
		return val;
	}//end func

	//求矩阵第l行，第r列的代数余子式
	_self.cofactor = function (l,r,M){
		var leng = M.length;
		var subM = [];
		for (var i = 0; i < leng; i++) {
			if(i == l) continue;
			var item = []
			subM.push(item);
			for (var j = 0; j < leng; j++) {
				if(j == r) continue;
				item.push(M[i][j]);
			};
		};
		return Math.pow(-1,l) * Math.pow(-1,r) * _contDet(subM);
	}//end func

	//求三维旋转变换矩阵（N为旋转轴的向量，angle为旋转角度）
	_self.ThreeDrotateMatrix = function (N,angle) {
		var val = false;
		if(N.length == 3){
			N = VMath.vectorUnit(N);
			val = [];
			angle = angle * Math.PI / 180;
			var Sin = Math.sin(angle);
			var Cos = Math.cos(angle);
			var sCos = 1 - Cos;
			for (var i = 0; i < 3; i++) {
				var item = [];
				for (var j = 0; j < 3; j++) {
					var x = N[j] * N[i] * sCos;
					if(i == j){
						item.push(N[i] * N[i] * sCos + Cos);
					}
					else if(i == 0 && j == 1){
						item.push(x + N[2] * Sin);
					}
					else if(i == 0 && j == 2){
						item.push(x - N[1] * Sin);
					}
					else if(i == 1 && j == 0){
						item.push(x - N[2] * Sin);
					}
					else if(i == 1 && j == 2){
						item.push(x + N[0] * Sin);
					}
					else if(i == 2 && j == 0){
						item.push(x + N[1] * Sin);
					}
					else if(i == 2 && j == 1){
						item.push(x - N[0] * Sin);
					}
				};
				val.push(item);
			};
		}
		return val;
	}//end func

	//求三维缩放变换矩阵（N为缩放方向的向量，k为缩放因子）
	_self.ThreeDzoomMatrix = function (N,k) {
		var val = false;
		if(N.length == 3){
			N = VMath.vectorUnit(N);
			val = [];
			var x = k - 1;
			for (var i = 0; i < 3; i++) {
				var item = [];
				for (var j = 0; j < 3; j++) {
					if(i == j){
						item.push(1 + x * N[i] * N[i]);
					}
					else{
						item.push(x * N[i] * N[j]);
					}
				};
				val.push(item);
			};
		}
		return val;
	}//end func

	//取出矩阵的第j列
	_self.matrixCol = function (M,j) {
		var V = [];
		for (var i = 0; i < M.length; i++) {
			V.push(M[i][j]);
		};
		return V;
	}//end func

	//判断是否是矩阵
	_self.judgeMatrix = function (M) {
		var val = true;
		for (var i = 0; i < M.length; i++) {
			if(M[i].length != M[0].length) val = false;
 		};
		return val;
	}//end func

	// 更清楚的显示矩阵
	_self.showMatrix = function (V) {
		var showResult = "";
		for (var i = 0; i < V.length; i++) {
			for (var j = 0; j < V[i].length; j++) {
				showResult += V[i][j] + " ";
			};
			showResult += "\n";
		};
		console.log(showResult);
		return showResult;
	}//end func
}//end func
 
var MMath = new matrixMath();

var result = MMath.ThreeDrotateMatrix([1,0,0],20);
// console.log(result);
MMath.showMatrix(result);
