var vectorMath =function () {
	var _self = this;

	// 计算两个向量叉乘的结果
	_self.fork = function (vectorA,vectorB) {
		var val = false;
		if(vectorA.length == 3 && vectorB.length == 3){
			val = [];
			val.push(vectorA[1]*vectorB[2] - vectorA[2]*vectorB[1]);
			val.push(vectorA[2]*vectorB[0] - vectorA[0]*vectorB[2]);
			val.push(vectorA[0]*vectorB[1] - vectorA[1]*vectorB[0]);
		}
		return val;
	}//end func.

	//向量的加法
	_self.Add = function (Va,Vb) {
		var val = false;
		if(Va.length == Vb.length){
			val = [];
			for (var i = 0; i < Va.length; i++) {
				val.push(Va[i] + Vb[i]);
			};
		}
		return val;
	}//end func

	//计算一个向量的单位向量
	_self.vectorUnit = function (V){
		var u = [];
		var m = _self.seek_mold(V);
		for (var i = 0; i < V.length; i++) {
			u.push(V[i]/m);
		};
		return u;
	}//end func

	// 计算V向量在N向量上的分量
	_self.component = function (V,N) {
		var val = false;
		if(V.length == N.length){
			val = {};
			var moldN = _self.seek_mold(N);
			var x = _self.PBmultiply(V,N) / (moldN * moldN);
			var parallel = [];
			var vertical = [];
			for (var i = 0; i < N.length; i++) {
				var item = N[i] * x
				parallel.push(item);
				vertical.push(V[i] - item);
			};
			val["parallel"] = parallel;
			val["vertical"] = vertical;
		}
		return val;
	}//end func

	//计算两个向量点乘的结果
	_self.PBmultiply = function (vectorA,vectorB) {
		var val = false;
		if(vectorA.length == vectorB.length){
			val = 0;
			for (var i = 0; i < vectorA.length; i++) {
				val += vectorA[i] * vectorB[i];
			};
		}
		return val;
	}//end func

	//计算两个向量的夹角
	_self.Angle = function (vectorA,vectorB){
		var val = false;
		if(vectorA.length == vectorB.length){
			val = 0;
			val = (Math.acos(_self.PBmultiply(vectorA,vectorB) / (_self.seek_mold(vectorA) * _self.seek_mold(vectorB))) / Math.PI ) * 180;
		}
		return val;
	}//end func

	//计算向量的模
	_self.seek_mold = function (vector) {
		var total = 0;
		for (var i = 0; i < vector.length; i++) {
			total += vector[i] * vector[i];
		};
		return Math.sqrt(total);
	}//end func

	//计算两个向量间的距离
	_self.distance = function(vectorA,vectorB) {
		var val = false;
		if(vectorA.length == vectorB.length){
			val = 0;
			for (var i = 0; i < vectorA.length; i++) {
				val += (vectorB[i] - vectorA[i]) * (vectorB[i] - vectorA[i]);
			};
			val = Math.sqrt(val);
		}
		return val;
	}//end func
}
