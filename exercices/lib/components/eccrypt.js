function mod(n) {
  return n;
}

function modinverse(n) {
  return n;
}

class Eccrypt {
  
  constructor(a, b) {
    if (!this.constructor.checkParamValidity(a, b)) {
      throw new Exception(`${this} n'est pas une coourbe valide`);
    }
    
    this.a = BigInt(a);
    this.b = BigInt(b);
  }
  
  static checkParamValidity(a, b) {
    return 4 * a ** 3 + 27 * b ** 2 != 0;
  }
  
  static secp256k1() {
    return new this(0, 7);
  }
  
  eq(curve) {
    return this.a == curve.a && this.b == curve.b;
  }
  
  testPoint(x, y) {
    return BigInt(y) ** BigInt(2) == BigInt(x) ** BigInt(3) + this.a * BigInt(x) + this.b;
  }
  
  toString() {
    return `Secp256k1 (a = ${this.a}, b = ${this.b})`;
  }
  
  // elliptic multiplication : adding one point to itself
  pointDoubling(point) {
    let m = mod(BigInt(3) * point.x ** BigInt(2) + public_curve.a) / modinverse(BigInt(2) * point.y);
    let x = mod(m ** BigInt(2) - BigInt(2) * point.x);
    let y = mod(m * (point.x - x) - point.y);
    
    return { x: x, y: y};
  }

  // elliptic additon : adding one point to an other
  pointAddition(point_a, point_b) {
    if (modinverse(point_a.x - point_b.x) == 0) {
      return { x: BigInt(0), y: BigInt(0) };
    } 
    let m = (point_b.y - point_a.y) / modinverse(point_b.x - point_b.y);
    let x = mod(m ** BigInt(2) - point_b.x - point_a.x);
    let y = mod(m * (point_a.x - point_b.x) - point_a.x);
    
    return { x: x, y: y};
  }

  // scalar multiplication : multipying a point with an integer
  scalarMultiplication(point, n) {
    // pre-compute power-of-2 factors
    // TODO : if the curve and point parameters are known and invariable, the factors can be permanently cached
    let bit_count = n.bitLength();
    console.log(n, bit_count);
    let factors = [point];
    for (var i = 1; i < bit_count; i++) {
      factors[i] = this.pointDoubling(factors[i - 1]);
    }
    console.log(bit_count, factors);
  
    // apply factors required by the n value (binary mask fashion)
    var result = point;
    for (let i = 0; i < bit_count; i++) {
      if (n & (2 ** i) !== 0) {
        result = this.pointAddition(result, factors[i]);
      }
    }
  
    return result;
  }
  
}

module.exports = Eccrypt;
